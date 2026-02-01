/**
 * Investments API Route
 * GET /api/investments - Fetch user's investments
 * POST /api/investments - Create new investment
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getFullCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await getFullCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'غير مصرح' },
        { status: 401 }
      );
    }

    const investments = await prisma.investment.findMany({
      where: { userId: user.id },
      include: {
        Project: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Calculate summary
    const summary = {
      totalInvested: investments.reduce((sum: number, inv: any) => sum + inv.amount, 0),
      totalFunds: investments.length,
      totalReturns: investments.reduce((sum: number, inv: any) => sum + inv.returns, 0),
      totalDividends: 0, // This would come from transaction history
    };

    const formattedInvestments = investments.map((inv: any) => ({
      id: inv.id,
      projectTitle: inv.Project?.title || 'مشروع محذوف',
      amount: inv.amount,
      returns: inv.returns,
      status: inv.status,
      date: inv.createdAt.toLocaleDateString('ar-SA'),
      units: inv.units,
    }));

    return NextResponse.json({
      success: true,
      investments: formattedInvestments,
      summary,
    });
  } catch (error) {
    console.error('Error fetching investments:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ في جلب الاستثمارات' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getFullCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'غير مصرح' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { projectId, amount } = body;

    // Validation
    if (!projectId || !amount || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'بيانات غير صحيحة' },
        { status: 400 }
      );
    }

    // Get project details
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'المشروع غير موجود' },
        { status: 404 }
      );
    }

    // Check minimum amount
    if (amount < project.minimumAmount) {
      return NextResponse.json(
        { success: false, error: `الحد الأدنى للاستثمار هو ${project.minimumAmount} ريال` },
        { status: 400 }
      );
    }

    // Check if project is still active
    if (project.status === 'completed') {
      return NextResponse.json(
        { success: false, error: 'المشروع مكتمل ولا يقبل استثمارات جديدة' },
        { status: 400 }
      );
    }

    // Calculate units
    const unitPrice = project.unitPrice || project.minimumAmount;
    const units = Math.floor(amount / unitPrice);
    
    // Calculate expected returns
    const expectedReturns = (amount * project.expectedReturn * project.durationMonths) / (12 * 100);

    // Create investment
    const investment = await prisma.investment.create({
      data: {
        userId: user.id,
        projectId: projectId,
        amount: amount,
        units: units,
        returns: expectedReturns,
        status: 'ACTIVE',
      },
    });

    // Update project funded amount
    await prisma.project.update({
      where: { id: projectId },
      data: {
        fundedAmount: {
          increment: amount,
        },
      },
    });

    return NextResponse.json({
      success: true,
      investment: {
        id: investment.id,
        amount: investment.amount,
        units: investment.units,
        expectedReturns: investment.returns,
      },
      message: 'تم إضافة الاستثمار بنجاح',
    });
  } catch (error) {
    console.error('Error creating investment:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ في إضافة الاستثمار' },
      { status: 500 }
    );
  }
}
