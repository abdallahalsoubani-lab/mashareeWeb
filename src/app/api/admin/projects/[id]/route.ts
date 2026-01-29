/**
 * Admin Project Detail API Route
 * GET /api/admin/projects/[id] - Get project
 * PUT /api/admin/projects/[id] - Update project
 * DELETE /api/admin/projects/[id] - Delete project
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getFullCurrentUser } from '@/lib/auth';
import { createAuditLog } from '@/lib/audit';
import { z } from 'zod';

const projectUpdateSchema = z.object({
  title: z.string().min(3).optional(),
  type: z.string().optional(),
  category: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  targetAmount: z.number().optional(),
  minimumAmount: z.number().optional(),
  expectedReturn: z.number().optional(),
  durationMonths: z.number().optional(),
  riskLevel: z.string().optional(),
  badges: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  status: z.string().optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getFullCurrentUser();

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'غير مصرح' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'المشروع غير موجود' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      project,
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ في جلب المشروع' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getFullCurrentUser();

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'غير مصرح' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await req.json();
    const validated = projectUpdateSchema.parse(body);

    const project = await prisma.project.update({
      where: { id },
      data: validated,
    });

    // Log the action
    await createAuditLog({
      adminId: user.id,
      action: 'UPDATE',
      entity: 'Project',
      entityId: id,
      metadata: { title: project.title },
    });

    return NextResponse.json({
      success: true,
      project,
    });
  } catch (error) {
    console.error('Error updating project:', error);

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
      { success: false, error: 'حدث خطأ في تحديث المشروع' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getFullCurrentUser();

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'غير مصرح' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const project = await prisma.project.delete({
      where: { id },
    });

    // Log the action
    await createAuditLog({
      adminId: user.id,
      action: 'DELETE',
      entity: 'Project',
      entityId: id,
      metadata: { title: project.title },
    });

    return NextResponse.json({
      success: true,
      message: 'تم حذف المشروع بنجاح',
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ في حذف المشروع' },
      { status: 500 }
    );
  }
}
