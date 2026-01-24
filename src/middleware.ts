/**
 * Middleware for Route Protection
 * Protects authenticated routes and manages redirects
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/wallet',
  '/investments',
  '/profile',
  '/projects',
];

// Admin routes that require admin role
const adminRoutes = ['/admin'];

// Auth routes where authenticated users should not go
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('masharee_token')?.value;
  const pathname = request.nextUrl.pathname;

  // Handle protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  // Handle admin routes (basic token check, role verification happens server-side)
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // Note: Role verification is done in API routes and page components
  }

  // Redirect authenticated users away from auth pages
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (token) {
      // Check if there's a redirect parameter
      const redirectUrl = request.nextUrl.searchParams.get('redirect');
      if (redirectUrl && redirectUrl.startsWith('/')) {
        return NextResponse.redirect(new URL(redirectUrl, request.url));
      }
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public|.*\\..*).*)'
  ],
};
