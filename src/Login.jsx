import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export default function Login({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: loginForm.email,
        password: loginForm.password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setSuccess('✅ تم تسجيل الدخول بنجاح!');

        setTimeout(() => {
          onLoginSuccess(response.data.user);
        }, 1000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'خطأ في تسجيل الدخول. يرجى التحقق من البيانات.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        username: registerForm.username,
        email: registerForm.email,
        password: registerForm.password,
        firstName: registerForm.firstName,
        lastName: registerForm.lastName,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setSuccess('✅ تم إنشاء الحساب بنجاح! يتم إعادة التوجيه...');

        setTimeout(() => {
          onLoginSuccess(response.data.user);
        }, 1000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'خطأ في إنشاء الحساب. يرجى المحاولة مجدداً.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#c9a227] to-[#d4b94c] rounded-2xl mb-4">
            <span className="text-2xl font-bold text-white">أصيل</span>
          </div>
          <h1 className="text-3xl font-bold text-[#f5f0e8] mb-2">الصناديق الاستثمارية</h1>
          <p className="text-[#b0a090]">منصة الاستثمار العقاري الموثوقة</p>
        </div>

        {/* Cards Container */}
        <div className="bg-[#1a1a1a] border border-[#8b7355]/30 rounded-3xl p-8 shadow-2xl">
          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => {
                setIsLogin(true);
                setError('');
                setSuccess('');
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-bold transition-all ${
                isLogin
                  ? 'bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-white'
                  : 'bg-[#2a2a2a] text-[#b0a090] hover:bg-[#3a3a3a]'
              }`}
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError('');
                setSuccess('');
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-bold transition-all ${
                !isLogin
                  ? 'bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-white'
                  : 'bg-[#2a2a2a] text-[#b0a090] hover:bg-[#3a3a3a]'
              }`}
            >
              إنشاء حساب
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle size={20} className="text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-6">
              <p className="text-green-300 text-sm text-center">{success}</p>
            </div>
          )}

          {/* Login Form */}
          {isLogin && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[#b0a090] text-sm font-semibold mb-2">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail size={18} className="absolute right-4 top-3.5 text-[#8b7355]" />
                  <input
                    type="email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    placeholder="your@email.com"
                    className="w-full bg-[#2a2a2a] border border-[#8b7355]/30 rounded-lg py-3 pr-12 pl-4 text-[#f5f0e8] placeholder-[#8b7355] focus:outline-none focus:border-[#c9a227]"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#b0a090] text-sm font-semibold mb-2">كلمة المرور</label>
                <div className="relative">
                  <Lock size={18} className="absolute right-4 top-3.5 text-[#8b7355]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    placeholder="••••••••"
                    className="w-full bg-[#2a2a2a] border border-[#8b7355]/30 rounded-lg py-3 pr-12 pl-12 text-[#f5f0e8] placeholder-[#8b7355] focus:outline-none focus:border-[#c9a227]"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-4 top-3.5 text-[#8b7355] hover:text-[#c9a227]"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && <Loader size={18} className="animate-spin" />}
                {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
              </button>
            </form>
          )}

          {/* Register Form */}
          {!isLogin && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#b0a090] text-sm font-semibold mb-2">الاسم الأول</label>
                  <input
                    type="text"
                    name="firstName"
                    value={registerForm.firstName}
                    onChange={handleRegisterChange}
                    placeholder="محمد"
                    className="w-full bg-[#2a2a2a] border border-[#8b7355]/30 rounded-lg py-3 px-4 text-[#f5f0e8] placeholder-[#8b7355] focus:outline-none focus:border-[#c9a227]"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-[#b0a090] text-sm font-semibold mb-2">الاسم الأخير</label>
                  <input
                    type="text"
                    name="lastName"
                    value={registerForm.lastName}
                    onChange={handleRegisterChange}
                    placeholder="أحمد"
                    className="w-full bg-[#2a2a2a] border border-[#8b7355]/30 rounded-lg py-3 px-4 text-[#f5f0e8] placeholder-[#8b7355] focus:outline-none focus:border-[#c9a227]"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#b0a090] text-sm font-semibold mb-2">اسم المستخدم</label>
                <input
                  type="text"
                  name="username"
                  value={registerForm.username}
                  onChange={handleRegisterChange}
                  placeholder="username"
                  className="w-full bg-[#2a2a2a] border border-[#8b7355]/30 rounded-lg py-3 px-4 text-[#f5f0e8] placeholder-[#8b7355] focus:outline-none focus:border-[#c9a227]"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-[#b0a090] text-sm font-semibold mb-2">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail size={18} className="absolute right-4 top-3.5 text-[#8b7355]" />
                  <input
                    type="email"
                    name="email"
                    value={registerForm.email}
                    onChange={handleRegisterChange}
                    placeholder="your@email.com"
                    className="w-full bg-[#2a2a2a] border border-[#8b7355]/30 rounded-lg py-3 pr-12 pl-4 text-[#f5f0e8] placeholder-[#8b7355] focus:outline-none focus:border-[#c9a227]"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#b0a090] text-sm font-semibold mb-2">كلمة المرور</label>
                <div className="relative">
                  <Lock size={18} className="absolute right-4 top-3.5 text-[#8b7355]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                    placeholder="••••••••"
                    className="w-full bg-[#2a2a2a] border border-[#8b7355]/30 rounded-lg py-3 pr-12 pl-12 text-[#f5f0e8] placeholder-[#8b7355] focus:outline-none focus:border-[#c9a227]"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-4 top-3.5 text-[#8b7355] hover:text-[#c9a227]"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && <Loader size={18} className="animate-spin" />}
                {loading ? 'جاري الإنشاء...' : 'إنشاء حساب'}
              </button>
            </form>
          )}

          {/* Test Credentials Info */}
          <div className="mt-6 p-4 bg-[#2a2a2a] rounded-lg border border-[#8b7355]/30">
            <p className="text-[#b0a090] text-xs text-center">
              💡 للاختبار، استخدم بيانات اعتماد admin (ستنشأ تلقائياً)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
