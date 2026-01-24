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
        user: { select: { name: true, email: true } },
        project: { select: { title: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return NextResponse.json({
      success: true,
      investments,
    });
  } catch (error) {
    console.error('Error fetching investments:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ في جلب الاستثمارات' },
      { status: 500 }
    );
  }
}
