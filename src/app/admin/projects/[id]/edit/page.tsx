/**
 * Edit Project Page
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface FormData {
  title: string;
  type: string;
  category: string;
  location: string;
  description: string;
  image: string;
  targetAmount: number;
  minimumAmount: number;
  expectedReturn: number;
  durationMonths: number;
  riskLevel: string;
  status: string;
  isActive: boolean;
  isFeatured: boolean;
}

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = (params?.id ?? '') as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
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
    isFeatured: false,
  });

  // Fetch project data on mount
  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(`/api/admin/projects/${projectId}`);
        const data = await response.json();

        if (data.success && data.project) {
          setFormData({
            title: data.project.title,
            type: data.project.type,
            category: data.project.category,
            location: data.project.location,
            description: data.project.description || '',
            image: data.project.image,
            targetAmount: data.project.targetAmount,
            minimumAmount: data.project.minimumAmount,
            expectedReturn: data.project.expectedReturn,
            durationMonths: data.project.durationMonths,
            riskLevel: data.project.riskLevel,
            status: data.project.status,
            isActive: data.project.isActive,
            isFeatured: data.project.isFeatured || false,
          });
        } else {
          setError('فشل تحميل بيانات المشروع');
        }
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('حدث خطأ في تحميل المشروع');
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [projectId]);

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
      setSubmitting(true);
      setError(null);

      const response = await fetch(`/api/admin/projects/${projectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/admin/projects');
      } else {
        setError(data.error || 'فشل تحديث المشروع');
      }
    } catch (err) {
      console.error('Error updating project:', err);
      setError('حدث خطأ في تحديث المشروع');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-600">جاري تحميل المشروع...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">تعديل المشروع</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          {error}
        </div>
      )}

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
              className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all"
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
              className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all"
            >
              <option>صندوق عقاري</option>
              <option>صكوك</option>
              <option>تمويل جماعي</option>
              <option>مساهمة عقارية</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">الفئة *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all"
            >
              <option>سكني</option>
              <option>تجاري</option>
              <option>صناعي</option>
              <option>فندقي</option>
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
              className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all"
              placeholder="الرياض - حي العليا"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">الوصف</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all"
              placeholder="وصف تفصيلي للمشروع"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">رابط الصورة</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all"
              placeholder="https://example.com/image.jpg"
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
              className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all"
            />
          </div>

          {/* Minimum Amount */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              الحد الأدنى للاستثمار (ريال) *
            </label>
            <input
              type="number"
              name="minimumAmount"
              value={formData.minimumAmount}
              onChange={handleChange}
              className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all"
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
              step="0.1"
              className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              مدة المشروع (شهر) *
            </label>
            <input
              type="number"
              name="durationMonths"
              value={formData.durationMonths}
              onChange={handleChange}
              className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all"
            />
          </div>

          {/* Risk Level */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">مستوى المخاطرة *</label>
            <select
              name="riskLevel"
              value={formData.riskLevel}
              onChange={handleChange}
              className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all"
            >
              <option>منخفضة</option>
              <option>متوسطة</option>
              <option>متوسطة-عالية</option>
              <option>عالية</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">الحالة *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all"
            >
              <option value="active">نشط</option>
              <option value="completed">مكتمل</option>
              <option value="cancelled">ملغي</option>
            </select>
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

          {/* Featured Toggle */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-5 h-5 rounded border-slate-300 text-blue-600"
              />
              <span className="text-slate-700">عرض في الصفحة الرئيسية (مميز)</span>
            </label>
            <p className="text-xs text-slate-500 mt-1 mr-8">
              سيظهر هذا المشروع في بطاقة الاستثمار بالصفحة الرئيسية
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {submitting ? 'جاري التحديث...' : 'تحديث المشروع'}
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
