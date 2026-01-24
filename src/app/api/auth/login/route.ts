/**
 * Login API Route
 * POST /api/auth/login
 */

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { ZodError } from 'zod';
import { prisma } from '@/lib/db';
import { signToken, setAuthCookie } from '@/lib/auth';
import { loginSchema } from '@/lib/validations/auth';

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();

    // Validate input
    const validated = loginSchema.parse(body);

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: validated.email },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        passwordHash: true,
        isVerified: true,
        avatar: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
        },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(
      validated.password,
      user.passwordHash
    );

    if (!isValidPassword) {
      return NextResponse.json(
        {
          success: false,
          error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
        },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Set authentication cookie
    await setAuthCookie(token);

    // Return user data without password
    const { passwordHash, ...safeUser } = user;

    return NextResponse.json(
      {
        success: true,
        message: 'تم تسجيل الدخول بنجاح',
        user: safeUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);

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
        error: 'حدث خطأ في تسجيل الدخول',
      },
      { status: 500 }
    );
  }
}
