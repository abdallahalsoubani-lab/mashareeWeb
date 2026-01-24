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
    <div className="bg-[#1a1a1a]/95 rounded-2xl border border-[#c9a227]/30 backdrop-blur-md p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-[#f5f0e8] mb-2">إنشاء حساب جديد</h1>
        <p className="text-[#b0a090] text-sm">ابدأ استثمارك معنا اليوم</p>
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
          <CheckCircle2 size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-green-300 text-sm">{success}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-[#d4b94c] text-sm font-bold mb-2">
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
            className="w-full px-4 py-3 rounded-lg bg-[#5c4d3a]/50 border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#b0a090]/50 focus:border-[#d4b94c] outline-none transition-colors text-right disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-[#d4b94c] text-sm font-bold mb-2">
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
            className="w-full px-4 py-3 rounded-lg bg-[#5c4d3a]/50 border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#b0a090]/50 focus:border-[#d4b94c] outline-none transition-colors text-right disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-[#d4b94c] text-sm font-bold mb-2">
            رقم الجوال (اختياري)
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="0501234567"
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-lg bg-[#5c4d3a]/50 border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#b0a090]/50 focus:border-[#d4b94c] outline-none transition-colors text-right disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-[#d4b94c] text-sm font-bold">
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
          <p className="text-[#b0a090] text-xs mt-2">
            يجب أن تحتوي على حرف كبير وحرف صغير ورقم (8 أحرف على الأقل)
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-[#d4b94c] text-sm font-bold mb-2">
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
              className="w-full px-4 py-3 rounded-lg bg-[#5c4d3a]/50 border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#b0a090]/50 focus:border-[#d4b94c] outline-none transition-colors text-right disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute left-3 top-3 text-[#b0a090] hover:text-[#d4b94c] transition-colors"
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
            className="w-4 h-4 rounded accent-[#c9a227] mt-1 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <span className="text-[#b0a090] text-xs leading-relaxed">
            أوافق على{' '}
            <Link
              href="/terms"
              className="text-[#d4b94c] hover:text-[#f5f0e8] transition-colors"
            >
              الشروط والأحكام
            </Link>{' '}
            و
            <Link
              href="/privacy"
              className="text-[#d4b94c] hover:text-[#f5f0e8] transition-colors"
            >
              سياسة الخصوصية
            </Link>
          </span>
        </label>

        {/* Register Button */}
        <Button
          type="submit"
          disabled={!isFormValid}
          className="w-full py-3 mt-6"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={18} className="animate-spin" />
              جاري إنشاء الحساب...
            </span>
          ) : (
            'إنشاء الحساب'
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
          التسجيل عبر النفاذ الوطني
        </button>
      </form>

      {/* Login Link */}
      <div className="mt-6 text-center border-t border-[#8b7355]/30 pt-6">
        <p className="text-[#b0a090] text-sm">
          هل لديك حساب بالفعل؟{' '}
          <Link
            href="/login"
            className="text-[#d4b94c] font-bold hover:text-[#f5f0e8] transition-colors"
          >
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}
