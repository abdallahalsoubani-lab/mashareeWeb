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
      <div className="text-center py-12">
        <div className="inline-flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          <span className="text-slate-600">جاري التحميل...</span>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">فشل تحميل الملف الشخصي</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">الملف الشخصي</h1>
        <p className="text-slate-600">معلوماتك الشخصية والاتصال</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="dashboard-card p-8 rounded-2xl text-center">
          {/* Avatar */}
          <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="text-blue-600" size={48} />
            )}
          </div>

          {/* User Info */}
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {profile.name}
          </h2>
          <p className="text-slate-600 mb-4">{profile.email}</p>

          {/* Badges */}
          <div className="flex justify-center gap-2 mb-6">
            {profile.isVerified && (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                موثق
              </span>
            )}
            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
              {profile.role === 'ADMIN' ? 'مدير' : 'مستثمر'}
            </span>
          </div>

          {/* Join Date */}
          <p className="text-sm text-slate-600">
            انضم منذ{' '}
            {new Date(profile.createdAt).toLocaleDateString('ar-SA')}
          </p>
        </div>

        {/* Profile Info and Edit */}
        <div className="lg:col-span-2">
          <div className="dashboard-card p-8 rounded-2xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900">
                المعلومات الشخصية
              </h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-700"
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
                  <label className="block text-slate-700 font-semibold mb-2">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                  />
                </div>

                {/* Email (Read-only) */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-600 cursor-not-allowed"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                  >
                    حفظ التغييرات
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            ) : (
              // View Mode
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <p className="text-sm text-slate-600 mb-1">الاسم الكامل</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {profile.name}
                  </p>
                </div>

                {/* Email */}
                <div>
                  <p className="text-sm text-slate-600 mb-1">البريد الإلكتروني</p>
                  <p className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <Mail size={18} className="text-blue-600" />
                    {profile.email}
                  </p>
                </div>

                {/* Phone */}
                {profile.phone && (
                  <div>
                    <p className="text-sm text-slate-600 mb-1">رقم الهاتف</p>
                    <p className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                      <Phone size={18} className="text-blue-600" />
                      {profile.phone}
                    </p>
                  </div>
                )}

                {/* Account Type */}
                <div>
                  <p className="text-sm text-slate-600 mb-1">نوع الحساب</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {profile.role === 'ADMIN' ? 'حساب إداري' : 'حساب مستثمر'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
