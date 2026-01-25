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
  const [uploadingImage, setUploadingImage] = useState(false);

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isMainImage: boolean = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('حجم الصورة يجب أن يكون أقل من 5 ميجابايت');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('يرجى اختيار ملف صورة');
      return;
    }

    setUploadingImage(true);

    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        
        if (isMainImage) {
          setFormData({
            ...formData,
            image: base64String,
          });
        } else {
          setFormData({
            ...formData,
            images: [...formData.images, base64String],
          });
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('فشل تحميل الصورة');
    } finally {
      setUploadingImage(false);
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
    <div>
      <div className="mb-10 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 glass rounded-full border border-primary/20">
          <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          <span className="text-sm text-text-secondary font-medium">إضافة محتوى جديد</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">
          إضافة مشروع جديد
        </h1>
        <p className="text-text-muted text-lg">أضف فرصة استثمارية جديدة للمنصة</p>
      </div>

      <form onSubmit={handleSubmit} className="group relative animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
        <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500" />
        <div className="relative glass border border-primary/20 rounded-2xl p-6 md:p-8 group-hover:border-primary/30 transition-all duration-300">
          <div className="space-y-6">
            {/* Basic Info Section */}
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-4 pb-2 border-b border-primary/20">
                المعلومات الأساسية
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-text-secondary text-sm font-bold mb-2">
                    عنوان المشروع *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all"
                    placeholder="صندوق الرياض السكني الأول"
                  />
                </div>

                <div>
                  <label className="block text-text-secondary text-sm font-bold mb-2">النوع *</label>
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

                <div>
                  <label className="block text-text-secondary text-sm font-bold mb-2">الفئة *</label>
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

                <div>
                  <label className="block text-text-secondary text-sm font-bold mb-2">الموقع *</label>
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
              </div>

              <div className="mt-6">
                <label className="block text-text-secondary text-sm font-bold mb-2">الوصف</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all resize-none"
                  placeholder="وصف تفصيلي للمشروع..."
                />
              </div>
            </div>

            {/* Images Section */}
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-4 pb-2 border-b border-primary/20">
                الصور
              </h3>

              <div className="mb-4">
                <label className="block text-text-secondary text-sm font-bold mb-3">
                  الصورة الرئيسية *
                </label>
                
                {/* Image Preview */}
                {formData.image && (
                  <div className="mb-4 relative group">
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="w-full h-48 object-cover rounded-xl border-2 border-primary/30"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: '' })}
                      className="absolute top-2 right-2 p-2 bg-accent-pink rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-glow-md"
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}

                {/* Upload Options */}
                <div className="grid grid-cols-2 gap-3">
                  <label className="group relative cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, true)}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                    <div className="flex flex-col items-center gap-3 p-6 glass rounded-xl border-2 border-primary/30 hover:border-accent-teal hover:bg-accent-teal/5 transition-all">
                      <Upload className="text-accent-teal" size={28} />
                      <span className="text-text-primary font-semibold text-sm">
                        {uploadingImage ? 'جاري التحميل...' : 'رفع صورة'}
                      </span>
                    </div>
                  </label>

                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      name="image"
                      value={formData.image.startsWith('data:') ? '' : formData.image}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all text-sm"
                      placeholder="أو أدخل رابط الصورة"
                    />
                    <p className="text-text-muted text-xs">حجم الصورة: أقل من 5 ميجابايت</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-text-secondary text-sm font-bold mb-3">
                  معرض الصور
                </label>
                
                {/* Upload Button & URL Input */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <label className="group relative cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, false)}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                    <div className="flex flex-col items-center gap-2 p-4 glass rounded-xl border-2 border-primary/30 hover:border-accent-purple hover:bg-accent-purple/5 transition-all">
                      <Upload className="text-accent-purple" size={24} />
                      <span className="text-text-primary font-semibold text-sm">رفع صورة</span>
                    </div>
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all"
                      placeholder="أو رابط URL"
                    />
                    <button
                      type="button"
                      onClick={handleAddImage}
                      className="px-4 bg-gradient-to-r from-accent-purple to-primary-500 text-white rounded-xl font-bold hover:shadow-glow-sm transition-all hover:scale-105"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>

                {/* Images Grid */}
                <div className="grid grid-cols-4 gap-3">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img src={img} alt="" className="w-full aspect-square rounded-xl object-cover border-2 border-primary/30 group-hover:border-primary/50 transition-all" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute -top-2 -right-2 w-7 h-7 bg-accent-pink rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-glow-md hover:scale-110"
                      >
                        <X size={16} className="text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Financial Info */}
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-4 pb-2 border-b border-primary/20">
                المعلومات المالية
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-text-secondary text-sm font-bold mb-2">
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

                <div>
                  <label className="block text-text-secondary text-sm font-bold mb-2">
                    الحد الأدنى (ريال) *
                  </label>
                  <input
                    type="number"
                    name="minimumAmount"
                    value={formData.minimumAmount}
                    onChange={handleChange}
                    className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-text-secondary text-sm font-bold mb-2">
                    العائد المتوقع (%) *
                  </label>
                  <input
                    type="number"
                    name="expectedReturn"
                    value={formData.expectedReturn}
                    onChange={handleChange}
                    className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-text-secondary text-sm font-bold mb-2">
                    المدة (شهر) *
                  </label>
                  <input
                    type="number"
                    name="durationMonths"
                    value={formData.durationMonths}
                    onChange={handleChange}
                    className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-text-secondary text-sm font-bold mb-2">
                    سعر الوحدة (ريال)
                  </label>
                  <input
                    type="number"
                    name="unitPrice"
                    value={formData.unitPrice}
                    onChange={handleChange}
                    className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-text-secondary text-sm font-bold mb-2">
                    مستوى المخاطر *
                  </label>
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
              </div>
            </div>

            {/* Management Info */}
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-4 pb-2 border-b border-primary/20">
                الجهات المسؤولة
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-text-secondary text-sm font-bold mb-2">
                    مدير الصندوق
                  </label>
                  <input
                    type="text"
                    name="fundManager"
                    value={formData.fundManager}
                    onChange={handleChange}
                    className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all"
                    placeholder="شركة الرياض المالية"
                  />
                </div>

                <div>
                  <label className="block text-text-secondary text-sm font-bold mb-2">
                    موزع الوحدات
                  </label>
                  <input
                    type="text"
                    name="distributor"
                    value={formData.distributor}
                    onChange={handleChange}
                    className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all"
                    placeholder="شركة الأهلي كابيتال"
                  />
                </div>

                <div>
                  <label className="block text-text-secondary text-sm font-bold mb-2">
                    الجهة الرقابية
                  </label>
                  <input
                    type="text"
                    name="supervisor"
                    value={formData.supervisor}
                    onChange={handleChange}
                    className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-text-secondary text-sm font-bold mb-2">
                    سياسة التوزيع
                  </label>
                  <select
                    name="distributionPolicy"
                    value={formData.distributionPolicy}
                    onChange={handleChange}
                    className="w-full px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all"
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
              <label className="block text-text-secondary text-sm font-bold mb-2">
                الشارات (Badges)
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={badgeInput}
                  onChange={(e) => setBadgeInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddBadge())}
                  className="flex-1 px-4 py-4 rounded-xl glass border border-primary/20 text-text-primary placeholder-text-dimmed focus:border-primary-400 focus:shadow-glow-sm outline-none transition-all"
                  placeholder="مثال: جديد، مميز، حصري"
                />
                <button
                  type="button"
                  onClick={handleAddBadge}
                  className="px-4 bg-gradient-to-r from-accent-purple to-primary-500 text-white rounded-xl font-bold hover:shadow-glow-sm transition-all hover:scale-105"
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-3 py-1.5 glass border border-primary/30 text-primary-400 rounded-full text-sm font-semibold"
                  >
                    {badge}
                    <button
                      type="button"
                      onClick={() => handleRemoveBadge(badge)}
                      className="hover:text-accent-pink transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-primary/30 accent-primary-500"
                />
                <span className="text-text-primary font-bold group-hover:text-primary-400 transition-colors">نشط</span>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6 border-t border-primary/20">
              <button
                type="submit"
                disabled={loading}
                className="group relative px-8 py-4 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal text-white rounded-xl font-bold overflow-hidden transition-all duration-300 hover:shadow-glow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span className="relative z-10">
                  {loading ? 'جاري الحفظ...' : 'إضافة المشروع'}
                </span>
                {!loading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-teal via-primary-600 to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-8 py-4 glass border border-primary/20 text-text-muted hover:text-text-primary rounded-xl font-bold hover:border-primary/40 hover:bg-primary/10 transition-all"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
