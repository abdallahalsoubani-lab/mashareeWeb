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
  const redirect = searchParams?.get('redirect') || '/';

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
    <div className="group relative animate-fade-in-scale">
      <div className="absolute -inset-1 bg-primary rounded-3xl opacity-20 blur-2xl" />
      <div className="relative bg-background-secondary rounded-3xl border-2 border-primary/30 backdrop-blur-xl p-8 shadow-glow-gold">
        {/* Header */}
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20">
              <div className="absolute -inset-2 bg-primary rounded-2xl opacity-40 blur-xl" />
              <img src="/logo-icon.png" alt="صخر" className="relative w-full h-full object-contain" />
            </div>
          </div>
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-background-tertiary rounded-full border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-secondary font-medium">تسجيل الدخول</span>
          </div>
          <h1 className="text-4xl font-black gradient-text mb-2">أهلاً بعودتك</h1>
          <p className="text-text-muted text-sm">سجل دخولك للوصول إلى حسابك</p>
        </div>

      {/* Quick Login Buttons */}
      <div className="mb-6">
        <p className="text-text-muted text-sm text-center mb-3 font-medium">تسجيل دخول سريع (للتجربة)</p>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => quickLogin('admin')}
            className={`relative p-5 rounded-xl border-2 transition-all overflow-hidden ${
              selectedUserType === 'admin'
                ? 'border-primary bg-primary/10'
                : 'border-primary/30 hover:border-primary/50 bg-background-tertiary'
            }`}
          >
            <div className="text-center relative z-10">
              <div className="text-3xl mb-2">👨‍💼</div>
              <p className="text-white font-bold text-sm mb-1">مسؤول</p>
              <p className="text-secondary text-xs">Admin</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => quickLogin('user')}
            className={`relative p-5 rounded-xl border-2 transition-all overflow-hidden ${
              selectedUserType === 'user'
                ? 'border-primary bg-primary/10'
                : 'border-primary/30 hover:border-primary/50 bg-background-tertiary'
            }`}
          >
            <div className="text-center relative z-10">
              <div className="text-3xl mb-2">👤</div>
              <p className="text-white font-bold text-sm mb-1">مستخدم</p>
              <p className="text-secondary text-xs">User</p>
            </div>
          </button>
        </div>
        <p className="text-text-muted text-xs text-center mt-3">
          اضغط على أحد الخيارين ليتم ملء البيانات تلقائياً
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 rounded-xl glass border border-accent-pink/30 flex items-start gap-3 bg-accent-pink/5">
          <AlertCircle size={20} className="text-accent-pink flex-shrink-0 mt-0.5" />
          <p className="text-accent-pink text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-4 rounded-xl glass border border-accent-green/30 flex items-start gap-3 bg-accent-green/5">
          <div className="w-5 h-5 rounded-full bg-accent-green flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs">✓</span>
          </div>
          <p className="text-accent-green text-sm font-medium">{success}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-text-secondary text-sm font-bold mb-2">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@masharee.sa"
            required
            disabled={isLoading}
            className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-text-secondary text-sm font-bold mb-2">
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
              className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary-400 transition-colors"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading}
              className="w-4 h-4 rounded accent-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span className="text-text-muted text-sm group-hover:text-text-primary transition-colors">تذكرني</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-primary-400 hover:text-accent-teal text-sm font-semibold transition-colors"
          >
            نسيت كلمة المرور؟
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading || !email || !password}
          className="group relative w-full py-4 mt-6 rounded-xl font-bold overflow-hidden transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{ backgroundColor: '#8F7F5E', color: '#0A0A0A', boxShadow: '0 0 35px rgba(143, 127, 94, 0.4)' }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                جاري تسجيل الدخول...
              </>
            ) : (
              'تسجيل الدخول'
            )}
          </span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gradient-to-l from-primary/30 to-transparent" />
          <span className="text-text-muted text-xs font-medium">أو</span>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
        </div>

        {/* SSO Button */}
        <button
          type="button"
          disabled={isLoading}
          className="w-full py-4 rounded-xl glass border-2 border-primary/30 text-text-primary font-bold hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          الدخول عبر النفاذ الوطني
        </button>
      </form>

      {/* Sign Up Link */}
      <div className="mt-6 text-center border-t border-primary/20 pt-6">
        <p className="text-text-muted text-sm">
          ليس لديك حساب؟{' '}
          <Link
            href="/register"
            className="text-primary-400 font-bold hover:text-accent-teal transition-colors"
          >
            إنشاء حساب جديد
          </Link>
        </p>
      </div>
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
