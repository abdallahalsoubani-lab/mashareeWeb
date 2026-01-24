/**
 * Login Page
 */

'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<'admin' | 'user'>('user');

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Quick login function
  const quickLogin = async (type: 'admin' | 'user') => {
    setSelectedUserType(type);
    if (type === 'admin') {
      setEmail('admin@masharee.sa');
      setPassword('Admin@123456');
    } else {
      setEmail('mohammed@test.com');
      setPassword('Investor@123');
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          rememberMe,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'فشل تسجيل الدخول');
        return;
      }

      setSuccess('تم تسجيل الدخول بنجاح! جاري التحويل...');

      // Redirect based on user role
      setTimeout(() => {
        if (data.user.role === 'ADMIN') {
          window.location.href = '/admin';
        } else {
          window.location.href = redirect === '/' ? '/projects' : redirect;
        }
      }, 1000);
    } catch (err) {
      setError('حدث خطأ في الاتصال');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#1a1a1a]/95 rounded-2xl border border-[#c9a227]/30 backdrop-blur-md p-8 shadow-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-[#f5f0e8] mb-2">تسجيل الدخول</h1>
        <p className="text-[#b0a090] text-sm">أهلاً بك في منصة مشاريع</p>
      </div>

      {/* Quick Login Buttons */}
      <div className="mb-6">
        <p className="text-[#b0a090] text-sm text-center mb-3">تسجيل دخول سريع (للتجربة)</p>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => quickLogin('admin')}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedUserType === 'admin'
                ? 'border-[#c9a227] bg-[#c9a227]/10'
                : 'border-[#c9a227]/30 hover:border-[#c9a227]/50'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">👨‍💼</div>
              <p className="text-[#f5f0e8] font-bold text-sm">مسؤول</p>
              <p className="text-[#b0a090] text-xs">Admin</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => quickLogin('user')}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedUserType === 'user'
                ? 'border-[#c9a227] bg-[#c9a227]/10'
                : 'border-[#c9a227]/30 hover:border-[#c9a227]/50'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">👤</div>
              <p className="text-[#f5f0e8] font-bold text-sm">مستخدم</p>
              <p className="text-[#b0a090] text-xs">User</p>
            </div>
          </button>
        </div>
        <p className="text-[#b0a090] text-xs text-center mt-2">
          اضغط على أحد الخيارين ليتم ملء البيانات تلقائياً
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 rounded-lg bg-red-500/20 border border-red-500/50 flex items-start gap-3">
          <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-4 rounded-lg bg-green-500/20 border border-green-500/50 flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs">✓</span>
          </div>
          <p className="text-green-300 text-sm">{success}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-[#d4b94c] text-sm font-bold mb-2">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@masharee.sa"
            required
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-lg bg-[#5c4d3a]/50 border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#b0a090]/50 focus:border-[#d4b94c] outline-none transition-colors text-right disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-[#d4b94c] text-sm font-bold mb-2">
            كلمة المرور
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg bg-[#5c4d3a]/50 border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#b0a090]/50 focus:border-[#d4b94c] outline-none transition-colors text-right disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-3 text-[#b0a090] hover:text-[#d4b94c] transition-colors"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading}
              className="w-4 h-4 rounded accent-[#c9a227] disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span className="text-[#b0a090] text-sm">تذكرني</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-[#d4b94c] hover:text-[#f5f0e8] text-sm font-medium transition-colors"
          >
            نسيت كلمة المرور؟
          </Link>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          disabled={isLoading || !email || !password}
          className="w-full py-3 mt-6"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={18} className="animate-spin" />
              جاري تسجيل الدخول...
            </span>
          ) : (
            'تسجيل الدخول'
          )}
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-[#8b7355]/30" />
          <span className="text-[#b0a090] text-xs">أو</span>
          <div className="flex-1 h-px bg-[#8b7355]/30" />
        </div>

        {/* SSO Button */}
        <button
          type="button"
          disabled={isLoading}
          className="w-full py-3 rounded-lg border-2 border-[#c9a227]/50 text-[#d4b94c] font-bold hover:bg-[#c9a227]/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          الدخول عبر النفاذ الوطني
        </button>
      </form>

      {/* Sign Up Link */}
      <div className="mt-6 text-center border-t border-[#8b7355]/30 pt-6">
        <p className="text-[#b0a090] text-sm">
          ليس لديك حساب؟{' '}
          <Link
            href="/register"
            className="text-[#d4b94c] font-bold hover:text-[#f5f0e8] transition-colors"
          >
            إنشاء حساب جديد
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}
