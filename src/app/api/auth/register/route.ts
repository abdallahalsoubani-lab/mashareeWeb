/**
 * Register API Route
 * POST /api/auth/register
 */

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { ZodError } from 'zod';
import { prisma } from '@/lib/db';
import { signToken, setAuthCookie } from '@/lib/auth';
import { registerSchema } from '@/lib/validations/auth';

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();

    // Validate input
    const validated = registerSchema.parse(body);

    // Check if email already exists
    const existingEmail = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (existingEmail) {
      return NextResponse.json(
        {
          success: false,
          error: 'البريد الإلكتروني مسجل مسبقاً',
        },
        { status: 400 }
      );
    }

    // Check if phone already exists (if provided)
    if (validated.phone) {
      const existingPhone = await prisma.user.findUnique({
        where: { phone: validated.phone },
      });

      if (existingPhone) {
        return NextResponse.json(
          {
            success: false,
            error: 'رقم الجوال مسجل مسبقاً',
          },
          { status: 400 }
        );
      }
    }

    // Hash password
    const passwordHash = await bcrypt.hash(validated.password, 12);

    // Create user with wallet
    const user = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        phone: validated.phone || null,
        passwordHash,
        Wallet: {
          create: {
            balance: 0,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });

    // Generate JWT token
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Set authentication cookie
    await setAuthCookie(token);

    return NextResponse.json(
      {
        success: true,
        message: 'تم إنشاء الحساب بنجاح',
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register error:', error);

    // Handle validation errors
    if (error instanceof ZodError) {
      const message = error.issues[0]?.message || 'بيانات غير صالحة';
      return NextResponse.json(
        {
          success: false,
          error: message,
        },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        error: 'حدث خطأ في إنشاء الحساب',
      },
      { status: 500 }
    );
  }
}
