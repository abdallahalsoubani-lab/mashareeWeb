/**
 * Register Page
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function RegisterPage() {
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Password strength indicator
  const getPasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email.toLowerCase(),
          phone: formData.phone || undefined,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          agreeTerms: formData.agreeTerms,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'فشل إنشاء الحساب');
        return;
      }

      setSuccess('تم إنشاء الحساب بنجاح');

      // Redirect to dashboard
      setTimeout(() => {
        router.push('/');
      }, 500);
    } catch (err) {
      setError('حدث خطأ في الاتصال');
      console.error('Register error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.password === formData.confirmPassword &&
    formData.agreeTerms &&
    !isLoading;

  return (
    <div className="group relative animate-fade-in-scale max-h-[90vh] overflow-y-auto">
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
            <span className="text-sm text-secondary font-medium">حساب جديد</span>
          </div>
          <h1 className="text-4xl font-black gradient-text mb-2">انضم إلينا</h1>
          <p className="text-text-muted text-sm">ابدأ رحلتك الاستثمارية معنا اليوم</p>
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
            <CheckCircle2 size={20} className="text-accent-green flex-shrink-0 mt-0.5" />
            <p className="text-accent-green text-sm font-medium">{success}</p>
          </div>
        )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-text-secondary text-sm font-bold mb-2">
            الاسم الكامل
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="محمد أحمد علي"
            required
            disabled={isLoading}
            className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-text-secondary text-sm font-bold mb-2">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="example@masharee.sa"
            required
            disabled={isLoading}
            className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-text-secondary text-sm font-bold mb-2">
            رقم الجوال (اختياري)
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="0501234567"
            disabled={isLoading}
            className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-text-secondary text-sm font-bold">
              كلمة المرور
            </label>
            {formData.password && (
              <span className="text-xs text-[#b0a090]">
                قوة كلمة المرور:{' '}
                <span
                  className={
                    passwordStrength <= 1
                      ? 'text-red-400'
                      : passwordStrength === 2
                        ? 'text-yellow-400'
                        : passwordStrength === 3
                          ? 'text-blue-400'
                          : 'text-green-400'
                  }
                >
                  {passwordStrength <= 1
                    ? 'ضعيفة'
                    : passwordStrength === 2
                      ? 'متوسطة'
                      : passwordStrength === 3
                        ? 'قوية'
                        : 'قوية جداً'}
                </span>
              </span>
            )}
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
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
          <p className="text-text-muted text-xs mt-2">
            يجب أن تحتوي على حرف كبير وحرف صغير ورقم (8 أحرف على الأقل)
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-text-secondary text-sm font-bold mb-2">
            تأكيد كلمة المرور
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="••••••••"
              required
              disabled={isLoading}
              className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary-400 transition-colors"
              disabled={isLoading}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {formData.password &&
            formData.confirmPassword &&
            formData.password !== formData.confirmPassword && (
              <p className="text-red-400 text-xs mt-2">كلمات المرور غير متطابقة</p>
            )}
        </div>

        {/* Terms and Conditions */}
        <label className="flex items-start gap-2 cursor-pointer mt-6">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleInputChange}
            disabled={isLoading}
            className="w-4 h-4 rounded accent-primary-500 mt-1 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <span className="text-[#b0a090] text-xs leading-relaxed">
            أوافق على{' '}
            <Link
              href="/terms"
              className="text-primary-400 hover:text-accent-teal transition-colors"
            >
              الشروط والأحكام
            </Link>{' '}
            و
            <Link
              href="/privacy"
              className="text-primary-400 hover:text-accent-teal transition-colors"
            >
              سياسة الخصوصية
            </Link>
          </span>
        </label>

        {/* Register Button */}
        <button
          type="submit"
          disabled={!isFormValid}
          className="group relative w-full py-4 mt-6 rounded-xl font-bold overflow-hidden transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{ backgroundColor: '#8F7F5E', color: '#0A0A0A', boxShadow: '0 0 35px rgba(143, 127, 94, 0.4)' }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                جاري إنشاء الحساب...
              </>
            ) : (
              'إنشاء الحساب'
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
          التسجيل عبر النفاذ الوطني
        </button>
      </form>

      {/* Login Link */}
      <div className="mt-6 text-center border-t border-primary/20 pt-6">
        <p className="text-text-muted text-sm">
          هل لديك حساب بالفعل؟{' '}
          <Link
            href="/login"
            className="text-primary-400 font-bold hover:text-accent-teal transition-colors"
          >
            تسجيل الدخول
          </Link>
        </p>
      </div>
      </div>
    </div>
  );
}
