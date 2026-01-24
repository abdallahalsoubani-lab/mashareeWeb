/**
 * Project Details Page - Complete Version
 * Based on provided screenshots
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import RiyalSymbol from '@/components/ui/RiyalSymbol';
import {
  MapPin,
  TrendingUp,
  Calendar,
  DollarSign,
  ChevronRight,
  Building2,
  Users,
  Shield,
  FileText,
  Download,
  ChevronDown,
  Clock,
  Percent,
  Home,
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  type: string;
  description: string;
  location: string;
  image: string;
  images: string[];
  badges: string[];
  fundedAmount: number;
  targetAmount: number;
  expectedReturn: number;
  durationMonths: number;
  minimumAmount: number;
  unitPrice: number;
  riskLevel: string;
  category: string;
  fundManager: string;
  distributor: string;
  supervisor: string;
  distributionPolicy: string;
  status: string;
  latitude: number;
  longitude: number;
  boardMembers: any;
  attachments: any;
}

const toArabicNumeral = (num: string | number) => {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).replace(/\d/g, (digit) => arabicNumerals[parseInt(digit)]);
};

export default function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [projectId, setProjectId] = useState<string>('');

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setProjectId(resolvedParams.id);
    };
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!projectId) return;
    
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/projects/${projectId}`);
        const data = await response.json();

        if (data.success) {
          setProject(data.project);
          setInvestmentAmount(data.project.minimumAmount.toString());
        } else {
          setError(data.error || 'فشل تحميل المشروع');
        }
      } catch (err) {
        setError('فشل الاتصال بالخادم');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA').format(amount);
  };

  const calculateReturns = () => {
    if (!project || !investmentAmount) return { total: 0, monthly: 0 };
    const amount = parseFloat(investmentAmount);
    const totalReturn = (amount * project.expectedReturn * project.durationMonths) / (12 * 100);
    const monthlyReturn = totalReturn / project.durationMonths;
    return { total: totalReturn, monthly: monthlyReturn };
  };

  const returns = calculateReturns();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4b94c] mx-auto mb-4" />
          <span className="text-[#b0a090]">جاري التحميل...</span>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 font-semibold mb-4">{error || 'فشل تحميل المشروع'}</p>
          <Link href="/projects" className="text-[#d4b94c] hover:text-[#f5f0e8] font-semibold">
            العودة إلى الصناديق
          </Link>
        </div>
      </div>
    );
  }

  const progress = (project.fundedAmount / project.targetAmount) * 100;
  const allImages = [project.image, ...(project.images || [])];

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Top Navigation */}
      <div className="bg-white border-b border-slate-200 px-4 md:px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/projects" className="hover:text-slate-900 flex items-center gap-1">
              الصناديق الاستثمارية
            </Link>
            <ChevronRight size={16} />
            <span className="text-slate-900 font-semibold line-clamp-1">{project.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card with Badges */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              {/* Type Badge */}
              <div className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-semibold mb-4">
                {project.type}
              </div>

              {/* Badges */}
              {project.badges && project.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#c9a227]/10 text-[#c9a227] rounded-full text-xs font-bold border border-[#c9a227]/30"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">
                {project.title}
              </h1>

              <p className="text-slate-600 text-base md:text-lg mb-4 leading-relaxed">
                {project.description || 'وصف المشروع سيتم إضافته قريباً'}
              </p>

              <div className="flex items-center gap-2 text-slate-700">
                <MapPin className="text-[#c9a227]" size={20} />
                <span className="font-semibold">{project.location}</span>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {/* Main Image */}
              <div className="relative h-96 bg-slate-200">
                <img
                  src={allImages[selectedImage]}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {allImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {allImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          selectedImage === idx ? 'bg-white w-8' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail Strip */}
              {allImages.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === idx ? 'border-[#c9a227]' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* التفاصيل - Details Section */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">التفاصيل</h2>

              {/* Fund Structure */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">هيكل الصندوق</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-slate-600 text-sm mb-1">حجم الصندوق المستهدف</p>
                  <p className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    {formatCurrency(project.targetAmount)} <RiyalSymbol size={16} />
                  </p>
                  </div>
                  <div>
                    <p className="text-slate-600 text-sm mb-1">تغطية عملاء منصة أصيل</p>
                    <p className="text-lg font-bold text-slate-900">
                      {Math.round(progress)}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Parties */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">الأطراف ذات العلاقة</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-slate-600 text-sm mb-2">مدير الصندوق</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building2 size={16} className="text-blue-600" />
                      </div>
                      <p className="font-semibold text-slate-900">{project.fundManager || 'غير محدد'}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-slate-600 text-sm mb-2">موزع الوحدات</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building2 size={16} className="text-blue-600" />
                      </div>
                      <p className="font-semibold text-slate-900">{project.distributor || 'غير محدد'}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-slate-600 text-sm mb-2">الرقابة</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Shield size={16} className="text-blue-600" />
                      </div>
                      <p className="font-semibold text-slate-900">{project.supervisor}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Map */}
              {project.latitude && project.longitude && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">الموقع</h3>
                  <div className="aspect-video bg-slate-200 rounded-lg overflow-hidden">
                    <iframe
                      src={`https://maps.google.com/maps?q=${project.latitude},${project.longitude}&hl=ar&z=14&output=embed`}
                      className="w-full h-full border-0"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-slate-600 text-sm mt-2 flex items-center gap-2">
                    <MapPin size={16} className="text-[#c9a227]" />
                    {project.location}
                  </p>
                </div>
              )}

              {/* Board Members */}
              {project.boardMembers && typeof project.boardMembers === 'object' && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">أعضاء مجلس الإدارة</h3>
                  <div className="space-y-4">
                    {Object.entries(project.boardMembers).map(([key, member]: [string, any], idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Users size={24} className="text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{member.name}</p>
                          <p className="text-slate-600 text-sm">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Attachments / Documents */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">المرفقات</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <FileText className="text-blue-600" size={24} />
                      <div>
                        <p className="font-semibold text-slate-900">شروط وأحكام صندوق تنمية الفرص.pdf</p>
                        <p className="text-slate-600 text-xs">PDF • 2.5 MB</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                      عرض الملف
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <FileText className="text-blue-600" size={24} />
                      <div>
                        <p className="font-semibold text-slate-900">صندوق تنمية الفرص - الملخص التنفيذي.pdf</p>
                        <p className="text-slate-600 text-xs">PDF • 1.8 MB</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                      عرض الملف
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Investment Calculator Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              {/* Type Badge */}
              <div className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-semibold mb-4">
                صندوق ملكية خاصة
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-6">{project.title}</h2>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600 text-sm">نسبة التغطية</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Amounts */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-slate-600 text-sm mb-1">نقطة أصيل</p>
                  <p className="text-lg font-bold text-slate-900">
                    {formatCurrency(project.fundedAmount)}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 text-sm mb-1">مدير الصندوق</p>
                  <p className="text-lg font-bold text-slate-900">
                    {formatCurrency(project.targetAmount - project.fundedAmount)}
                  </p>
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-slate-200">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-slate-600 text-xs mb-1">سعر الوحدة</p>
                  <p className="text-lg font-bold text-blue-600 flex items-center gap-2">
                    {formatCurrency(project.unitPrice || project.minimumAmount)} <RiyalSymbol size={16} />
                  </p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-slate-600 text-xs mb-1">مدة الفرصة</p>
                  <p className="text-lg font-bold text-slate-900">
                    {project.durationMonths} شهر
                  </p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-slate-600 text-xs mb-1">نصائح العائد للمستثمار</p>
                  <p className="text-lg font-bold text-slate-900">
                    {project.expectedReturn}%
                  </p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-slate-600 text-xs mb-1">الحد الأدنى للاستثمار</p>
                  <p className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    {formatCurrency(project.minimumAmount)} <RiyalSymbol size={16} />
                  </p>
                </div>
              </div>

              {/* Distribution Policy */}
              <div className="mb-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <span className="text-slate-600 text-sm">حالة الصندوق</span>
                  <span className="font-bold text-blue-600">{project.status === 'completed' ? 'مكتمل' : 'نشط'}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg mt-2">
                  <span className="text-slate-600 text-sm">سياسة التوزيع</span>
                  <span className="font-bold text-slate-900">{project.distributionPolicy}</span>
                </div>
              </div>

              {/* Calculator Section */}
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <h3 className="text-lg font-bold text-slate-900 mb-4">الحاسبة</h3>

                <div className="mb-4">
                  <label className="block text-slate-700 text-sm font-semibold mb-2">
                    العائد المتوقع على الاستثمار في الصندوق
                  </label>
                </div>

                {/* Input */}
                <div className="mb-4">
                  <label className="block text-slate-600 text-sm mb-2">مبلغ الاستثمار</label>
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    min={project.minimumAmount}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-slate-900"
                    placeholder={formatCurrency(project.minimumAmount)}
                  />
                </div>

                {/* Results */}
                {investmentAmount && parseFloat(investmentAmount) >= project.minimumAmount && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">مبلغ الاستثمار</span>
                      <span className="font-bold text-slate-900 flex items-center gap-1">
                        {formatCurrency(parseFloat(investmentAmount))} <RiyalSymbol size={14} />
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">العوائد</span>
                      <span className="font-bold text-slate-900 flex items-center gap-1">
                        {formatCurrency(returns.total)} <RiyalSymbol size={14} />
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">المدة</span>
                      <span className="font-bold text-slate-900">{project.durationMonths} شهر</span>
                    </div>
                    <div className="h-px bg-slate-200 my-3" />
                    <div className="flex justify-between">
                      <span className="text-slate-900 font-semibold">المبلغ الإجمالي</span>
                      <span className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                        {formatCurrency(parseFloat(investmentAmount) + returns.total)} <RiyalSymbol size={20} />
                      </span>
                    </div>
                  </div>
                )}

                {/* Amount Slider */}
                <div className="mt-6">
                  <label className="block text-slate-600 text-sm mb-2">مبلغ الإستثمار</label>
                  <input
                    type="range"
                    min={project.minimumAmount}
                    max={project.targetAmount > 1000000 ? 1000000 : project.targetAmount}
                    step={project.minimumAmount}
                    value={investmentAmount || project.minimumAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              </div>

              {/* Investment Button */}
              <button
                disabled={
                  project.status === 'completed' ||
                  !investmentAmount ||
                  parseFloat(investmentAmount) < project.minimumAmount
                }
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  project.status === 'completed' || !investmentAmount || parseFloat(investmentAmount) < project.minimumAmount
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                }`}
              >
                {project.status === 'completed' ? 'تم تحقيق الصندوق' : 'استثمر الآن'}
              </button>
            </div>

            {/* Chart/Stats Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">مخطط هيكل الصندوق</h3>
              <div className="flex items-center justify-center py-8">
                <div className="relative w-48 h-48">
                  {/* Donut Chart */}
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="32"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="32"
                      strokeDasharray={`${(progress / 100) * 502.65} 502.65`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-4xl font-bold text-blue-600">{Math.round(progress)}%</p>
                    <p className="text-slate-600 text-sm">تغطية عملاء منصة أصيل</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
