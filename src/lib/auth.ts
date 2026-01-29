/**
 * Authentication Utilities
 * JWT token management and cookie handling
 */

import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from './db';

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = 'masharee_token';

/** Use secure cookies only when explicitly using HTTPS (e.g. production behind SSL). */
const USE_SECURE_COOKIE = process.env.USE_HTTPS === 'true';

// JWT Payload Interface
export interface JWTPayload {
  userId: string;
  email: string;
  role: 'ADMIN' | 'INVESTOR';
}

// Safe User Interface (without password)
export interface SafeUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: 'ADMIN' | 'INVESTOR';
  avatar: string | null;
  isVerified: boolean;
  createdAt: Date;
}

// ========== TOKEN MANAGEMENT ==========

/**
 * Sign JWT token
 */
export function signToken(payload: JWTPayload): string {
  if (!JWT_SECRET || JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET is not set or too short (min 32 chars). Add it to .env on the server.');
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    if (!JWT_SECRET || JWT_SECRET.length < 32) return null;
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

// ========== COOKIE MANAGEMENT ==========

const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: USE_SECURE_COOKIE,
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: '/',
};

/**
 * Set authentication cookie (via next/headers). Use setAuthCookieOnResponse in Route Handlers when returning JSON.
 */
export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, AUTH_COOKIE_OPTIONS);
}

/**
 * Set auth cookie on a NextResponse. Use this in login API so the cookie is on the same response.
 */
export function setAuthCookieOnResponse(res: NextResponse, token: string): void {
  res.cookies.set(COOKIE_NAME, token, AUTH_COOKIE_OPTIONS);
}

/**
 * Get authentication cookie
 */
export async function getAuthCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

/**
 * Remove authentication cookie
 */
export async function removeAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// ========== USER AUTHENTICATION ==========

/**
 * Get current user from JWT token
 */
export async function getCurrentUser(): Promise<JWTPayload | null> {
  const token = await getAuthCookie();
  if (!token) return null;
  return verifyToken(token);
}

/**
 * Get full current user data from database
 */
export async function getFullCurrentUser(): Promise<SafeUser | null> {
  const payload = await getCurrentUser();
  if (!payload) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        avatar: true,
        isVerified: true,
        createdAt: true,
      },
    });

    return user;
  } catch (error) {
    console.error('Failed to fetch full user:', error);
    return null;
  }
}

// ========== AUTHORIZATION HELPERS ==========

/**
 * Require admin access
 */
export async function requireAdmin(): Promise<JWTPayload> {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') {
    throw new Error('Unauthorized: Admin access required');
  }
  return user;
}

/**
 * Require authentication
 */
export async function requireAuth(): Promise<JWTPayload> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized: Please login');
  }
  return user;
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user;
}

/**
 * Check if user is admin
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === 'ADMIN';
}
