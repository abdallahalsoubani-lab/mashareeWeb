/**
 * Profile Page
 * User profile information and editing
 */

'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Edit2 } from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: string;
  createdAt: string;
  isVerified: boolean;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/user/profile');
        const data = await response.json();

        if (data.success) {
          setProfile(data.user);
          setFormData({
            name: data.user.name,
            phone: data.user.phone || '',
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setProfile(data.user);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-mesh flex items-center justify-center">
        <div className="text-center animate-fade-in-scale">
          <div className="relative mx-auto mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500/20 border-t-primary-500" />
            <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-xl animate-pulse" />
          </div>
          <p className="text-text-secondary text-lg font-medium">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-mesh flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-muted text-lg">فشل تحميل الملف الشخصي</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mesh pb-16">
      <div className="w-full px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 pt-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 glass rounded-full border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-accent-purple animate-pulse" />
            <span className="text-sm text-text-secondary">حسابك الشخصي</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 gradient-text">
            الملف الشخصي
          </h1>
          <p className="text-text-muted text-lg">معلوماتك الشخصية وبيانات الاتصال</p>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="relative group animate-fade-in-scale" style={{ animationDelay: '0.2s' }}>
          <div className="absolute -inset-1 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal rounded-3xl opacity-30 blur-2xl group-hover:opacity-50 transition-all duration-500" />
          <div className="relative glass p-8 rounded-3xl text-center border border-primary/20">
            {/* Avatar */}
            <div className="relative w-28 h-28 mx-auto mb-6">
              <div className="absolute -inset-2 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal rounded-full opacity-50 blur-xl animate-pulse" />
              <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-accent-purple to-primary-500 flex items-center justify-center shadow-glow-md">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="text-white" size={56} />
                )}
              </div>
            </div>

            {/* User Info */}
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              {profile.name}
            </h2>
            <p className="text-text-muted mb-6">{profile.email}</p>

            {/* Badges */}
            <div className="flex justify-center gap-2 mb-6">
              {profile.isVerified && (
                <span className="glass border border-accent-green/30 text-accent-green px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                  موثق
                </span>
              )}
              <span className="glass border border-primary/30 text-primary-400 px-3 py-1.5 rounded-full text-xs font-semibold">
                {profile.role === 'ADMIN' ? 'مدير' : 'مستثمر'}
              </span>
            </div>

            {/* Join Date */}
            <p className="text-sm text-text-muted">
              انضم منذ{' '}
              {new Date(profile.createdAt).toLocaleDateString('ar-SA')}
            </p>
          </div>
        </div>

        {/* Profile Info and Edit */}
        <div className="lg:col-span-2 animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
          <div className="glass p-8 rounded-3xl border border-primary/20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-text-primary">
                المعلومات الشخصية
              </h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-3 rounded-xl glass hover:bg-primary/10 transition-all border border-primary/10 hover:border-primary/30 text-primary-400 hover:shadow-glow-sm"
              >
                <Edit2 size={20} />
              </button>
            </div>

            {isEditing ? (
              // Edit Form
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
                className="space-y-6"
              >
                {/* Name */}
                <div>
                  <label className="block text-text-secondary font-semibold mb-2">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-4 glass border border-primary/20 rounded-xl focus:border-primary-400 focus:shadow-glow-sm outline-none text-text-primary transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-text-secondary font-semibold mb-2">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-4 glass border border-primary/20 rounded-xl focus:border-primary-400 focus:shadow-glow-sm outline-none text-text-primary transition-all"
                  />
                </div>

                {/* Email (Read-only) */}
                <div>
                  <label className="block text-text-secondary font-semibold mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full px-4 py-4 glass border border-primary/10 rounded-xl text-text-muted cursor-not-allowed"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 py-4 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal text-white rounded-xl font-bold hover:shadow-glow-md transition-all hover:scale-105"
                  >
                    حفظ التغييرات
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 py-4 glass text-text-muted hover:text-text-primary font-bold rounded-xl border border-primary/20 hover:border-primary/40 transition-all"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            ) : (
              // View Mode
              <div className="space-y-6">
                {/* Name */}
                <div className="glass p-5 rounded-2xl border border-primary/10">
                  <p className="text-sm text-text-muted mb-2 font-medium">الاسم الكامل</p>
                  <p className="text-lg font-bold text-text-primary">
                    {profile.name}
                  </p>
                </div>

                {/* Email */}
                <div className="glass p-5 rounded-2xl border border-primary/10">
                  <p className="text-sm text-text-muted mb-2 font-medium">البريد الإلكتروني</p>
                  <p className="text-lg font-bold text-text-primary flex items-center gap-2">
                    <Mail size={18} className="text-primary-400" />
                    {profile.email}
                  </p>
                </div>

                {/* Phone */}
                {profile.phone && (
                  <div className="glass p-5 rounded-2xl border border-primary/10">
                    <p className="text-sm text-text-muted mb-2 font-medium">رقم الهاتف</p>
                    <p className="text-lg font-bold text-text-primary flex items-center gap-2">
                      <Phone size={18} className="text-accent-teal" />
                      {profile.phone}
                    </p>
                  </div>
                )}

                {/* Account Type */}
                <div className="glass p-5 rounded-2xl border border-primary/10">
                  <p className="text-sm text-text-muted mb-2 font-medium">نوع الحساب</p>
                  <p className="text-lg font-bold bg-gradient-to-r from-accent-purple to-primary-400 bg-clip-text text-transparent">
                    {profile.role === 'ADMIN' ? 'حساب إداري' : 'حساب مستثمر'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
