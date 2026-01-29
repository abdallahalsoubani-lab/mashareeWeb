/**
 * Admin Investments API Route
 * GET /api/admin/investments - List all investments
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getFullCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await getFullCurrentUser();

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'غير مصرح' },
        { status: 401 }
      );
    }

    const investments = await prisma.investment.findMany({
      include: {
        User: { select: { name: true, email: true } },
        Project: { select: { title: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    // Transform data to match frontend expectations
    const transformedInvestments = investments.map((inv: any) => ({
      id: inv.id,
      amount: inv.amount,
      status: inv.status,
      returns: inv.returns,
      createdAt: inv.createdAt,
      user: { name: inv.User.name, email: inv.User.email },
      project: { title: inv.Project.title },
    }));

    return NextResponse.json({
      success: true,
      investments: transformedInvestments,
    });
  } catch (error) {
    console.error('Error fetching investments:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ في جلب الاستثمارات' },
      { status: 500 }
    );
  }
}
