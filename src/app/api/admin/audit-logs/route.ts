/**
 * Admin Audit Logs API Route
 * GET /api/admin/audit-logs - List all audit logs
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

    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    const entity = searchParams.get('entity');

    const where: any = {};

    if (action && action !== 'all') {
      where.action = action;
    }

    if (entity && entity !== 'all') {
      where.entity = entity;
    }

    const logs = await prisma.adminAuditLog.findMany({
      where,
      include: {
        admin: { select: { email: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return NextResponse.json({
      success: true,
      logs,
    });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ في جلب السجلات' },
      { status: 500 }
    );
  }
}
