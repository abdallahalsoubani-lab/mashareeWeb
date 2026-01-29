/**
 * Investments API Route
 * GET /api/investments - Fetch user's investments
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
      projectTitle: inv.project.title,
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
