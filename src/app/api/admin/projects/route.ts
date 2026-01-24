/**
 * Admin Projects API Route
 * GET /api/admin/projects - List all projects
 * POST /api/admin/projects - Create new project
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getFullCurrentUser } from '@/lib/auth';
import { createAuditLog } from '@/lib/audit';
import { z } from 'zod';

const projectSchema = z.object({
  title: z.string().min(3),
  type: z.string(),
  category: z.string(),
  location: z.string(),
  description: z.string().optional(),
  image: z.string(),
  targetAmount: z.number().min(1000),
  minimumAmount: z.number().min(100),
  unitPrice: z.number().optional(),
  expectedReturn: z.number().min(1).max(100),
  durationMonths: z.number().min(1),
  riskLevel: z.string(),
  distributionPolicy: z.string().optional(),
  fundManager: z.string().optional(),
  distributor: z.string().optional(),
  supervisor: z.string().optional(),
  badges: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
  status: z.string().optional(),
});

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
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (status && status !== 'all') {
      where.status = status;
    }

    if (category && category !== 'all') {
      where.category = category;
    }

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.project.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      projects,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ في جلب المشاريع' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getFullCurrentUser();

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'غير مصرح' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validated = projectSchema.parse(body);

    const project = await prisma.project.create({
      data: {
        ...validated,
        badges: validated.badges || [],
        images: [],
        isActive: validated.isActive !== false,
        status: validated.status || 'active',
        fundedAmount: 0,
      },
    });

    // Log the action
    await createAuditLog({
      adminId: user.id,
      action: 'CREATE',
      entity: 'Project',
      entityId: project.id,
      metadata: { title: project.title },
    });

    return NextResponse.json({
      success: true,
      project,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: error.issues[0]?.message || 'بيانات غير صالحة',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'حدث خطأ في إنشاء المشروع' },
      { status: 500 }
    );
  }
}
