/**
 * Create New Project Page - Admin
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X, Plus } from 'lucide-react';

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'صندوق عقاري',
    category: 'سكني',
    location: '',
    description: '',
    image: '',
    images: [] as string[],
    badges: [] as string[],
    targetAmount: 1000000,
    minimumAmount: 1000,
    expectedReturn: 15,
    durationMonths: 12,
    riskLevel: 'متوسطة',
    unitPrice: 1000,
    fundManager: '',
    distributor: '',
    supervisor: 'هيئة السوق المالية',
    distributionPolicy: 'عند التصفية',
    status: 'active',
    isActive: true,
    latitude: null,
    longitude: null,
    boardMembers: [],
    attachments: [],
  });

  const [imageUrl, setImageUrl] = useState('');
  const [badgeInput, setBadgeInput] = useState('');

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    });
  };

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, imageUrl.trim()],
      });
      setImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleAddBadge = () => {
    if (badgeInput.trim() && !formData.badges.includes(badgeInput.trim())) {
      setFormData({
        ...formData,
        badges: [...formData.badges, badgeInput.trim()],
      });
      setBadgeInput('');
    }
  };

  const handleRemoveBadge = (badge: string) => {
    setFormData({
      ...formData,
      badges: formData.badges.filter((b) => b !== badge),
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
    <div className="min-h-screen bg-[#1a1a1a] pt-24 pb-16">
      <div className="w-full max-w-5xl mx-auto px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-[#d4b94c] to-[#f5f0e8] mb-2">
            إضافة مشروع جديد
          </h1>
          <p className="text-[#b0a090]">أضف فرصة استثمارية جديدة</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#1a1a1a]/50 border border-[#c9a227]/30 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
          <div className="space-y-6">
            {/* Basic Info Section */}
            <div>
              <h3 className="text-xl font-bold text-[#f5f0e8] mb-4 pb-2 border-b border-[#c9a227]/20">
                المعلومات الأساسية
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#d4b94c] text-sm font-bold mb-2">
                    عنوان المشروع *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#2a2a2a] border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#8b7355] focus:border-[#c9a227] outline-none"
                    placeholder="صندوق الرياض السكني الأول"
                  />
                </div>

                <div>
                  <label className="block text-[#d4b94c] text-sm font-bold mb-2">النوع *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#2a2a2a] border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#8b7355] focus:border-[#c9a227] outline-none"
                  >
                    <option>صندوق عقاري</option>
                    <option>صكوك</option>
                    <option>تمويل جماعي</option>
                    <option>مساهمة عقارية</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#d4b94c] text-sm font-bold mb-2">الفئة *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#2a2a2a] border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#8b7355] focus:border-[#c9a227] outline-none"
                  >
                    <option>سكني</option>
                    <option>تجاري</option>
                    <option>صناعي</option>
                    <option>فندقي</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#d4b94c] text-sm font-bold mb-2">الموقع *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#2a2a2a] border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#8b7355] focus:border-[#c9a227] outline-none"
                    placeholder="الرياض - حي العليا"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-[#d4b94c] text-sm font-bold mb-2">الوصف</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-[#2a2a2a] border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#8b7355] focus:border-[#c9a227] outline-none resize-none"
                  placeholder="وصف تفصيلي للمشروع..."
                />
              </div>
            </div>

            {/* Images Section */}
            <div>
              <h3 className="text-xl font-bold text-[#f5f0e8] mb-4 pb-2 border-b border-[#c9a227]/20">
                الصور
              </h3>

              <div className="mb-4">
                <label className="block text-[#d4b94c] text-sm font-bold mb-2">
                  الصورة الرئيسية *
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#2a2a2a] border border-[#c9a227]/30 text-[#f5f0e8] focus:border-[#c9a227] outline-none"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="block text-[#d4b94c] text-sm font-bold mb-2">
                  معرض الصور
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl bg-[#2a2a2a] border border-[#c9a227]/30 text-[#f5f0e8] focus:border-[#c9a227] outline-none"
                    placeholder="رابط الصورة"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="px-4 bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-[#1a1a1a] rounded-xl font-bold hover:shadow-lg transition-all"
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img src={img} alt="" className="w-20 h-20 rounded-lg object-cover border border-[#c9a227]/30" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} className="text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Financial Info */}
            <div>
              <h3 className="text-xl font-bold text-[#f5f0e8] mb-4 pb-2 border-b border-[#c9a227]/20">
                المعلومات المالية
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#d4b94c] text-sm font-bold mb-2">
                    المبلغ المستهدف (ريال) *
                  </label>
                  <input
                    type="number"
                    name="targetAmount"
                    value={formData.targetAmount}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#2a2a2a] border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#8b7355] focus:border-[#c9a227] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#d4b94c] text-sm font-bold mb-2">
                    الحد الأدنى (ريال) *
                  </label>
                  <input
                    type="number"
                    name="minimumAmount"
                    value={formData.minimumAmount}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#2a2a2a] border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#8b7355] focus:border-[#c9a227] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#d4b94c] text-sm font-bold mb-2">
                    العائد المتوقع (%) *
                  </label>
                  <input
                    type="number"
                    name="expectedReturn"
                    value={formData.expectedReturn}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#2a2a2a] border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#8b7355] focus:border-[#c9a227] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#d4b94c] text-sm font-bold mb-2">
                    المدة (شهر) *
                  </label>
                  <input
                    type="number"
                    name="durationMonths"
                    value={formData.durationMonths}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#2a2a2a] border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#8b7355] focus:border-[#c9a227] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#d4b94c] text-sm font-bold mb-2">
                    سعر الوحدة (ريال)
                  </label>
                  <input
                    type="number"
                    name="unitPrice"
                    value={formData.unitPrice}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#2a2a2a] border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#8b7355] focus:border-[#c9a227] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#d4b94c] text-sm font-bold mb-2">
                    مستوى المخاطر *
                  </label>
                  <select
                    name="riskLevel"
                    value={formData.riskLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#2a2a2a] border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#8b7355] focus:border-[#c9a227] outline-none"
                  >
                    <option>منخفضة</option>
                    <option>متوسطة</option>
                    <option>متوسطة-عالية</option>
                    <option>عالية</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Management Info */}
            <div>
              <h3 className="text-xl font-bold text-[#f5f0e8] mb-4 pb-2 border-b border-[#c9a227]/20">
                الجهات المسؤولة
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#d4b94c] text-sm font-bold mb-2">
                    مدير الصندوق
                  </label>
                  <input
                    type="text"
                    name="fundManager"
                    value={formData.fundManager}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#2a2a2a] border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#8b7355] focus:border-[#c9a227] outline-none"
                    placeholder="شركة الرياض المالية"
                  />
                </div>

                <div>
                  <label className="block text-[#d4b94c] text-sm font-bold mb-2">
                    موزع الوحدات
                  </label>
                  <input
                    type="text"
                    name="distributor"
                    value={formData.distributor}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#2a2a2a] border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#8b7355] focus:border-[#c9a227] outline-none"
                    placeholder="شركة الأهلي كابيتال"
                  />
                </div>

                <div>
                  <label className="block text-[#d4b94c] text-sm font-bold mb-2">
                    الجهة الرقابية
                  </label>
                  <input
                    type="text"
                    name="supervisor"
                    value={formData.supervisor}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#2a2a2a] border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#8b7355] focus:border-[#c9a227] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#d4b94c] text-sm font-bold mb-2">
                    سياسة التوزيع
                  </label>
                  <select
                    name="distributionPolicy"
                    value={formData.distributionPolicy}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#2a2a2a] border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#8b7355] focus:border-[#c9a227] outline-none"
                  >
                    <option>عند التصفية</option>
                    <option>سنوي</option>
                    <option>ربع سنوي</option>
                    <option>شهري</option>
                    <option>عند البيع</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div>
              <label className="block text-[#d4b94c] text-sm font-bold mb-2">
                الشارات (Badges)
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={badgeInput}
                  onChange={(e) => setBadgeInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddBadge())}
                  className="flex-1 px-4 py-3 rounded-xl bg-[#2a2a2a] border border-[#c9a227]/30 text-[#f5f0e8] focus:border-[#c9a227] outline-none"
                  placeholder="مثال: جديد، مميز، حصري"
                />
                <button
                  type="button"
                  onClick={handleAddBadge}
                  className="px-4 bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-[#1a1a1a] rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-[#c9a227]/20 text-[#d4b94c] rounded-full border border-[#c9a227]/30 text-sm"
                  >
                    {badge}
                    <button
                      type="button"
                      onClick={() => handleRemoveBadge(badge)}
                      className="hover:text-red-400"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-[#c9a227]/30 accent-[#c9a227]"
                />
                <span className="text-[#f5f0e8] font-bold">نشط</span>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6 border-t border-[#c9a227]/20">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-[#1a1a1a] rounded-xl font-bold hover:shadow-lg hover:shadow-[#c9a227]/50 disabled:opacity-50 transition-all"
              >
                {loading ? 'جاري الحفظ...' : 'إضافة المشروع'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-8 py-3 bg-[#2a2a2a] text-[#b0a090] rounded-xl font-bold hover:bg-[#3a3a3a] transition-all"
              >
                إلغاء
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
