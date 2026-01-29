/**
 * Logout API Route
 * POST /api/auth/logout
 * GET /api/auth/logout (redirects to home)
 */

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
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

// Handle GET requests (when user visits /api/auth/logout directly)
export async function GET(request: NextRequest) {
  try {
    // Remove authentication cookie
    await removeAuthCookie();

    // Redirect to home page
    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error('Logout error:', error);
    
    // Redirect to home page even on error
    return NextResponse.redirect(new URL('/', request.url));
  }
}
