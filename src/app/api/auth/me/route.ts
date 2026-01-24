/**
 * Current User API Route
 * GET /api/auth/me
 */

import { NextResponse } from 'next/server';
import { getFullCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    // Get current user
    const user = await getFullCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'غير مصرح - يرجى تسجيل الدخول',
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Me error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'حدث خطأ في الحصول على بيانات المستخدم',
      },
      { status: 500 }
    );
  }
}
