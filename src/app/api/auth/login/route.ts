/**
 * Login API Route
 * POST /api/auth/login
 */

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { ZodError } from 'zod';
import { prisma } from '@/lib/db';
import { signToken, setAuthCookieOnResponse } from '@/lib/auth';
import { loginSchema } from '@/lib/validations/auth';

export async function POST(req: NextRequest) {
  try {
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
      console.error('[Login] JWT_SECRET is missing or too short. Set JWT_SECRET in .env (min 32 chars).');
      return NextResponse.json(
        { success: false, error: 'حدث خطأ في تسجيل الدخول' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const validated = loginSchema.parse(body);

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
        { success: false, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(
      validated.password,
      user.passwordHash
    );

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
        { status: 401 }
      );
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const { passwordHash, ...safeUser } = user;
    const res = NextResponse.json(
      {
        success: true,
        message: 'تم تسجيل الدخول بنجاح',
        user: safeUser,
      },
      { status: 200 }
    );
    setAuthCookieOnResponse(res, token);
    return res;
  } catch (error) {
    console.error('[Login] Error:', error);

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
