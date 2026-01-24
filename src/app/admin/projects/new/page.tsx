/**
 * Create New Project Page
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'صندوق عقاري',
    category: 'سكني',
    location: '',
    description: '',
    image: 'https://via.placeholder.com/400x300',
    targetAmount: 1000000,
    minimumAmount: 1000,
    expectedReturn: 15,
    durationMonths: 12,
    riskLevel: 'متوسطة',
    status: 'active',
    isActive: true,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/admin/projects');
      } else {
        alert(data.error || 'فشل إضافة المشروع');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      alert('حدث خطأ في إضافة المشروع');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">إضافة مشروع جديد</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 max-w-2xl">
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              عنوان المشروع *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
              placeholder="مثال: صندوق الرياض السكني"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">النوع *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
            >
              <option>صندوق عقاري</option>
              <option>صكوك</option>
              <option>تمويل جماعي</option>
              <option>مساهمة عقارية</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">الموقع *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
              placeholder="الرياض - حي العليا"
            />
          </div>

          {/* Target Amount */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              المبلغ المستهدف (ريال) *
            </label>
            <input
              type="number"
              name="targetAmount"
              value={formData.targetAmount}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Expected Return */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              العائد المتوقع (%) *
            </label>
            <input
              type="number"
              name="expectedReturn"
              value={formData.expectedReturn}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Active Toggle */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="w-5 h-5 rounded border-slate-300 text-blue-600"
              />
              <span className="text-slate-700">نشط</span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'جاري الحفظ...' : 'إضافة المشروع'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
            >
              إلغاء
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
