/**
 * Logout API Route
 * POST /api/auth/logout
 */

import { NextResponse } from 'next/server';
import { removeAuthCookie } from '@/lib/auth';

export async function POST() {
  try {
    // Remove authentication cookie
    await removeAuthCookie();

    return NextResponse.json(
      {
        success: true,
        message: 'تم تسجيل الخروج بنجاح',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Logout error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'حدث خطأ في تسجيل الخروج',
      },
      { status: 500 }
    );
  }
}
