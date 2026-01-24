/**
 * Admin Stats API Route
 * GET /api/admin/stats - Fetch dashboard statistics
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getFullCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getFullCurrentUser();

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'غير مصرح' },
        { status: 401 }
      );
    }

    const [
      totalUsers,
      newUsersThisMonth,
      activeProjects,
      completedProjects,
      totalInvestments,
      investmentsSum,
      recentUsers,
      recentInvestments,
      totalFunded,
    ] = await Promise.all([
      // Total users
      prisma.user.count(),

      // New users this month
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),

      // Active projects
      prisma.project.count({
        where: { isActive: true, status: 'active' },
      }),

      // Completed projects
      prisma.project.count({ where: { status: 'completed' } }),

      // Total investments count
      prisma.investment.count(),

      // Total investments sum
      prisma.investment.aggregate({
        _sum: { amount: true },
      }),

      // Recent users (last 5)
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          role: true,
        },
      }),

      // Recent investments (last 5)
      prisma.investment.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true, email: true } },
          project: { select: { title: true } },
        },
      }),

      // Total funded amount
      prisma.project.aggregate({
        _sum: { fundedAmount: true },
      }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        users: {
          total: totalUsers,
          newThisMonth: newUsersThisMonth,
        },
        projects: {
          active: activeProjects,
          completed: completedProjects,
        },
        investments: {
          count: totalInvestments,
          total: investmentsSum._sum.amount || 0,
        },
        totalFunded: totalFunded._sum.fundedAmount || 0,
      },
      recentActivity: {
        users: recentUsers,
        investments: recentInvestments,
      },
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ في جلب الإحصائيات' },
      { status: 500 }
    );
  }
}
