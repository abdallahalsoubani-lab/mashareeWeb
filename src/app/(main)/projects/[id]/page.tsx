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
  PieChart,
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
      <div className="min-h-screen bg-mesh flex items-center justify-center">
        <div className="text-center animate-fade-in-scale">
          <div className="relative mx-auto mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500/20 border-t-primary-500" />
            <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-xl animate-pulse" />
          </div>
          <p className="text-text-secondary text-lg font-medium">جاري تحميل تفاصيل المشروع...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-mesh flex items-center justify-center">
        <div className="text-center glass p-8 rounded-3xl border border-primary/30 max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
            <span className="text-3xl">⚠️</span>
          </div>
          <p className="text-red-400 font-semibold mb-6 text-lg">{error || 'فشل تحميل المشروع'}</p>
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal text-white font-bold rounded-xl hover:shadow-glow-md transition-all hover:scale-105"
          >
            العودة إلى الصناديق
          </Link>
        </div>
      </div>
    );
  }

  const progress = (project.fundedAmount / project.targetAmount) * 100;
  const allImages = [project.image, ...(project.images || [])];

  return (
    <div className="min-h-screen bg-mesh pb-16">
      {/* Top Navigation with glass effect */}
      <div className="glass border-b-2 border-primary/30 px-4 md:px-6 py-4 sticky top-16 z-20 shadow-lg animate-fade-in-up">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm">
            <Link 
              href="/projects" 
              className="text-text-muted hover:text-primary-400 flex items-center gap-1 font-semibold transition-colors"
            >
              الصناديق الاستثمارية
            </Link>
            <ChevronRight size={16} className="text-text-dimmed" />
            <span className="text-text-primary font-bold line-clamp-1">{project.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card with Badges */}
            <div className="group relative animate-fade-in-scale">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
              <div className="relative glass rounded-2xl p-6 md:p-8 border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                {/* Type Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-bold mb-4 border border-accent-green/30 text-accent-green">
                  <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                  {project.type}
                </div>

                {/* Badges */}
                {project.badges && project.badges.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 glass rounded-full text-xs font-bold border border-primary/30 text-primary-400"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}

                <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-accent-purple via-primary-400 to-accent-teal bg-clip-text text-transparent mb-4">
                  {project.title}
                </h1>

                <p className="text-text-secondary text-base md:text-lg mb-4 leading-relaxed">
                  {project.description || 'وصف المشروع سيتم إضافته قريباً'}
                </p>

                <div className="flex items-center gap-2 text-text-primary">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <MapPin className="text-primary-400" size={20} />
                  </div>
                  <span className="font-semibold">{project.location}</span>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="group relative animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
              <div className="relative glass rounded-2xl overflow-hidden border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                {/* Main Image */}
                <div className="relative h-96 bg-background-tertiary overflow-hidden">
                  <img
                    src={allImages[selectedImage]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                  {allImages.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 glass px-3 py-2 rounded-full border border-primary/20">
                      {allImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImage(idx)}
                          className={`h-2 rounded-full transition-all ${
                            selectedImage === idx 
                              ? 'bg-gradient-to-r from-accent-purple to-primary-500 w-8' 
                              : 'bg-text-dimmed/50 w-2 hover:bg-text-dimmed'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Thumbnail Strip */}
                {allImages.length > 1 && (
                  <div className="flex gap-3 p-4 overflow-x-auto">
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                          selectedImage === idx 
                            ? 'border-primary-500 shadow-glow-sm' 
                            : 'border-primary/20 hover:border-primary/40'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        {selectedImage === idx && (
                          <div className="absolute inset-0 bg-primary-500/20 border-2 border-primary-500" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* التفاصيل - Details Section */}
            <div className="group relative animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
              <div className="relative glass rounded-2xl p-6 md:p-8 border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-accent-purple to-primary-500">
                    <FileText className="text-white" size={24} />
                  </div>
                  <span>التفاصيل</span>
                </h2>

              {/* Fund Structure */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-text-primary mb-4">هيكل الصندوق</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="glass p-4 rounded-xl border border-primary/10">
                    <p className="text-text-muted text-sm mb-2">حجم الصندوق المستهدف</p>
                    <p className="text-xl font-bold text-text-primary flex items-center gap-2">
                      {formatCurrency(project.targetAmount)} <RiyalSymbol size={18} className="text-primary-400" />
                    </p>
                  </div>
                  <div className="glass p-4 rounded-xl border border-primary/10">
                    <p className="text-text-muted text-sm mb-2">تغطية عملاء منصة مشاريع</p>
                    <p className="text-xl font-bold bg-gradient-to-r from-accent-purple to-primary-400 bg-clip-text text-transparent">
                      {Math.round(progress)}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Parties */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-text-primary mb-4">الأطراف ذات العلاقة</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="glass p-4 rounded-xl border border-primary/10 hover:border-primary/30 transition-all">
                    <p className="text-text-muted text-sm mb-3">مدير الصندوق</p>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-accent-purple/20 to-primary-500/20 border border-primary/20">
                        <Building2 size={18} className="text-primary-400" />
                      </div>
                      <p className="font-bold text-text-primary">{project.fundManager || 'غير محدد'}</p>
                    </div>
                  </div>

                  <div className="glass p-4 rounded-xl border border-primary/10 hover:border-primary/30 transition-all">
                    <p className="text-text-muted text-sm mb-3">موزع الوحدات</p>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-accent-purple/20 to-primary-500/20 border border-primary/20">
                        <Building2 size={18} className="text-accent-teal" />
                      </div>
                      <p className="font-bold text-text-primary">{project.distributor || 'غير محدد'}</p>
                    </div>
                  </div>

                  <div className="glass p-4 rounded-xl border border-primary/10 hover:border-primary/30 transition-all">
                    <p className="text-text-muted text-sm mb-3">الرقابة</p>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-accent-purple/20 to-primary-500/20 border border-primary/20">
                        <Shield size={18} className="text-accent-green" />
                      </div>
                      <p className="font-bold text-text-primary">{project.supervisor}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Map */}
              {project.latitude && project.longitude && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-text-primary mb-4">الموقع</h3>
                  <div className="aspect-video bg-background-tertiary rounded-xl overflow-hidden border border-primary/20">
                    <iframe
                      src={`https://maps.google.com/maps?q=${project.latitude},${project.longitude}&hl=ar&z=14&output=embed`}
                      className="w-full h-full border-0"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-text-secondary text-sm mt-3 flex items-center gap-2 glass p-3 rounded-lg border border-primary/10 w-fit">
                    <MapPin size={16} className="text-primary-400" />
                    {project.location}
                  </p>
                </div>
              )}

              {/* Board Members */}
              {project.boardMembers && typeof project.boardMembers === 'object' && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-text-primary mb-4">أعضاء مجلس الإدارة</h3>
                  <div className="space-y-3">
                    {Object.entries(project.boardMembers).map(([key, member]: [string, any], idx) => (
                      <div key={idx} className="flex items-center gap-4 glass p-4 rounded-xl border border-primary/10 hover:border-primary/30 transition-all">
                        <div className="w-12 h-12 bg-gradient-to-br from-accent-purple to-primary-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-glow-sm">
                          <Users size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-text-primary">{member.name}</p>
                          <p className="text-text-muted text-sm">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Attachments / Documents */}
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-4">المرفقات</h3>
                <div className="space-y-3">
                  <div className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-purple to-primary-500 rounded-xl opacity-0 group-hover:opacity-10 blur transition-all duration-300" />
                    <div className="relative flex items-center justify-between p-4 glass rounded-xl border border-primary/10 hover:border-primary/30 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                          <FileText className="text-primary-400" size={20} />
                        </div>
                        <div>
                          <p className="font-semibold text-text-primary">شروط وأحكام صندوق تنمية الفرص.pdf</p>
                          <p className="text-text-muted text-xs">PDF • 2.5 MB</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 glass border border-primary/20 hover:border-primary/40 text-primary-400 hover:text-primary-300 text-sm font-bold rounded-lg transition-all hover:shadow-glow-sm">
                        عرض الملف
                      </button>
                    </div>
                  </div>

                  <div className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-purple to-primary-500 rounded-xl opacity-0 group-hover:opacity-10 blur transition-all duration-300" />
                    <div className="relative flex items-center justify-between p-4 glass rounded-xl border border-primary/10 hover:border-primary/30 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                          <FileText className="text-primary-400" size={20} />
                        </div>
                        <div>
                          <p className="font-semibold text-text-primary">صندوق تنمية الفرص - الملخص التنفيذي.pdf</p>
                          <p className="text-text-muted text-xs">PDF • 1.8 MB</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 glass border border-primary/20 hover:border-primary/40 text-primary-400 hover:text-primary-300 text-sm font-bold rounded-lg transition-all hover:shadow-glow-sm">
                        عرض الملف
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Chart/Stats Card - Moved to top */}
            <div className="group relative animate-fade-in-scale" style={{ animationDelay: '0.3s' }}>
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal rounded-2xl opacity-30 blur-2xl group-hover:opacity-50 transition-all duration-700" />
              <div className="relative glass rounded-2xl p-6 border-2 border-primary/30 group-hover:border-primary/50 transition-all duration-300 shadow-glow-sm">
                <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-accent-purple to-primary-500 shadow-glow-md">
                    <PieChart size={20} className="text-white" />
                  </div>
                  <span>مخطط هيكل الصندوق</span>
                </h3>
                
                <div className="flex items-center justify-center py-8">
                  <div className="relative w-56 h-56">
                    {/* Enhanced Donut Chart with multiple layers */}
                    <svg className="w-full h-full -rotate-90">
                      {/* Background shadow circle */}
                      <circle
                        cx="112"
                        cy="112"
                        r="90"
                        fill="none"
                        stroke="rgba(10, 14, 26, 0.8)"
                        strokeWidth="36"
                      />
                      {/* Main progress circle with gradient */}
                      <circle
                        cx="112"
                        cy="112"
                        r="90"
                        fill="none"
                        stroke="url(#chartGradient)"
                        strokeWidth="36"
                        strokeDasharray={`${(progress / 100) * 565.49} 565.49`}
                        strokeLinecap="round"
                        style={{
                          filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))',
                          transition: 'all 1s ease-in-out'
                        }}
                      />
                      {/* Inner glow effect */}
                      <circle
                        cx="112"
                        cy="112"
                        r="90"
                        fill="none"
                        stroke="url(#chartGradient2)"
                        strokeWidth="4"
                        strokeDasharray={`${(progress / 100) * 565.49} 565.49`}
                        strokeLinecap="round"
                        opacity="0.6"
                      />
                      <defs>
                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="50%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                        <linearGradient id="chartGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="50%" stopColor="#60a5fa" />
                          <stop offset="100%" stopColor="#22d3ee" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Center content with enhanced styling */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-accent-purple/20 via-primary-500/20 to-accent-teal/20 rounded-full blur-xl" />
                        <p className="relative text-5xl font-black bg-gradient-to-r from-accent-purple via-primary-400 to-accent-teal bg-clip-text text-transparent mb-2">
                          {Math.round(progress)}%
                        </p>
                      </div>
                      <p className="text-text-muted text-sm font-medium text-center px-4 max-w-[120px]">
                        تغطية عملاء منصة مشاريع
                      </p>
                    </div>
                  </div>
                </div>

                {/* Legend/Stats below chart */}
                <div className="mt-6 pt-6 border-t border-primary/20 grid grid-cols-2 gap-4">
                  <div className="glass p-3 rounded-xl border border-primary/10">
                    <p className="text-text-muted text-xs mb-1">المبلغ المجموع</p>
                    <p className="text-sm font-bold text-accent-purple flex items-center gap-1">
                      {formatCurrency(project.fundedAmount)} <RiyalSymbol size={12} />
                    </p>
                  </div>
                  <div className="glass p-3 rounded-xl border border-primary/10">
                    <p className="text-text-muted text-xs mb-1">المبلغ المستهدف</p>
                    <p className="text-sm font-bold text-accent-teal flex items-center gap-1">
                      {formatCurrency(project.targetAmount)} <RiyalSymbol size={12} />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Calculator Card */}
            <div className="group relative animate-fade-in-scale" style={{ animationDelay: '0.4s' }}>
              <div className="absolute -inset-1 bg-gradient-to-br from-accent-purple via-primary-500 to-accent-teal rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700" />
              <div className="relative glass rounded-2xl p-6 border-2 border-primary/30 group-hover:border-primary/50 transition-all duration-300 shadow-glow-sm">
                {/* Type Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-bold mb-4 border border-accent-green/30 text-accent-green">
                  <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                  صندوق ملكية خاصة
                </div>

                <h2 className="text-2xl font-bold bg-gradient-to-r from-accent-purple via-primary-400 to-accent-teal bg-clip-text text-transparent mb-6">
                  {project.title}
                </h2>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-text-muted text-sm font-medium">نسبة التغطية</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-accent-purple to-primary-500 bg-clip-text text-transparent">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="relative w-full h-3 bg-background-tertiary rounded-full overflow-hidden">
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal rounded-full transition-all duration-700 shimmer"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

              {/* Amounts */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass p-4 rounded-xl border border-primary/10">
                  <p className="text-text-muted text-xs mb-2">نقطة مشاريع</p>
                  <p className="text-lg font-bold text-text-primary">
                    {formatCurrency(project.fundedAmount)}
                  </p>
                </div>
                <div className="glass p-4 rounded-xl border border-primary/10">
                  <p className="text-text-muted text-xs mb-2">مدير الصندوق</p>
                  <p className="text-lg font-bold text-text-primary">
                    {formatCurrency(project.targetAmount - project.fundedAmount)}
                  </p>
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6 pb-6 border-b border-primary/20">
                <div className="text-center p-4 glass rounded-xl border border-accent-teal/20 hover:border-accent-teal/40 transition-all">
                  <p className="text-text-muted text-xs mb-2">سعر الوحدة</p>
                  <p className="text-lg font-bold text-accent-teal flex items-center justify-center gap-1">
                    {formatCurrency(project.unitPrice || project.minimumAmount)} <RiyalSymbol size={16} />
                  </p>
                </div>
                <div className="text-center p-4 glass rounded-xl border border-primary/20 hover:border-primary/40 transition-all">
                  <p className="text-text-muted text-xs mb-2">مدة الفرصة</p>
                  <p className="text-lg font-bold text-text-primary flex items-center justify-center gap-1">
                    <Clock size={16} className="text-primary-400" />
                    {project.durationMonths} شهر
                  </p>
                </div>
                <div className="text-center p-4 glass rounded-xl border border-accent-green/20 hover:border-accent-green/40 transition-all">
                  <p className="text-text-muted text-xs mb-2">نصائح العائد للمستثمار</p>
                  <p className="text-lg font-bold text-accent-green flex items-center justify-center gap-1">
                    <TrendingUp size={16} />
                    {project.expectedReturn}%
                  </p>
                </div>
                <div className="text-center p-4 glass rounded-xl border border-accent-purple/20 hover:border-accent-purple/40 transition-all">
                  <p className="text-text-muted text-xs mb-2">الحد الأدنى للاستثمار</p>
                  <p className="text-lg font-bold text-accent-purple flex items-center justify-center gap-1">
                    {formatCurrency(project.minimumAmount)} <RiyalSymbol size={14} />
                  </p>
                </div>
              </div>

              {/* Distribution Policy */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center justify-between p-4 glass rounded-xl border border-primary/10">
                  <span className="text-text-muted text-sm font-medium">حالة الصندوق</span>
                  <span className={`font-bold px-3 py-1 rounded-lg ${
                    project.status === 'completed' 
                      ? 'bg-accent-green/10 text-accent-green' 
                      : 'bg-primary/10 text-primary-400'
                  }`}>
                    {project.status === 'completed' ? 'مكتمل' : 'نشط'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 glass rounded-xl border border-primary/10">
                  <span className="text-text-muted text-sm font-medium">سياسة التوزيع</span>
                  <span className="font-bold text-text-primary">{project.distributionPolicy}</span>
                </div>
              </div>

              {/* Calculator Section */}
              <div className="mb-6 p-5 glass rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-accent-purple/5">
                <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-accent-purple to-primary-500">
                    <TrendingUp className="text-white" size={18} />
                  </div>
                  <span>الحاسبة</span>
                </h3>

                <div className="mb-4">
                  <label className="block text-slate-700 text-sm font-semibold mb-2">
                    العائد المتوقع على الاستثمار في الصندوق
                  </label>
                </div>

                {/* Input */}
                <div className="mb-4">
                  <label className="block text-text-secondary text-sm mb-2 font-medium">مبلغ الاستثمار</label>
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    min={project.minimumAmount}
                    className="w-full px-4 py-3.5 glass border-2 border-primary/20 rounded-xl focus:border-primary-500 focus:shadow-glow-sm outline-none text-text-primary font-semibold transition-all"
                    placeholder={formatCurrency(project.minimumAmount)}
                  />
                </div>

                {/* Results */}
                {investmentAmount && parseFloat(investmentAmount) >= project.minimumAmount && (
                  <div className="space-y-3 mt-4">
                    <div className="flex justify-between items-center p-3 glass rounded-lg border border-primary/10">
                      <span className="text-text-muted text-sm">مبلغ الاستثمار</span>
                      <span className="font-bold text-text-primary flex items-center gap-1">
                        {formatCurrency(parseFloat(investmentAmount))} <RiyalSymbol size={14} className="text-primary-400" />
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 glass rounded-lg border border-accent-green/10">
                      <span className="text-text-muted text-sm">العوائد</span>
                      <span className="font-bold text-accent-green flex items-center gap-1">
                        {formatCurrency(returns.total)} <RiyalSymbol size={14} />
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 glass rounded-lg border border-primary/10">
                      <span className="text-text-muted text-sm">المدة</span>
                      <span className="font-bold text-text-primary">{project.durationMonths} شهر</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent my-3" />
                    <div className="flex justify-between items-center p-4 glass rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent-purple/10">
                      <span className="text-text-primary font-bold">المبلغ الإجمالي</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-accent-purple to-primary-500 bg-clip-text text-transparent flex items-center gap-2">
                        {formatCurrency(parseFloat(investmentAmount) + returns.total)} <RiyalSymbol size={20} className="text-primary-400" />
                      </span>
                    </div>
                  </div>
                )}

                {/* Amount Slider */}
                <div className="mt-6">
                  <label className="block text-text-secondary text-sm mb-2 font-medium">مبلغ الإستثمار</label>
                  <input
                    type="range"
                    min={project.minimumAmount}
                    max={project.targetAmount > 1000000 ? 1000000 : project.targetAmount}
                    step={project.minimumAmount}
                    value={investmentAmount || project.minimumAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    className="w-full h-2.5 bg-background-tertiary rounded-full appearance-none cursor-pointer accent-primary-500"
                    style={{
                      background: `linear-gradient(to right, rgb(139, 92, 246) 0%, rgb(59, 130, 246) ${((parseFloat(investmentAmount) - project.minimumAmount) / (1000000 - project.minimumAmount)) * 100}%, rgb(37, 43, 59) ${((parseFloat(investmentAmount) - project.minimumAmount) / (1000000 - project.minimumAmount)) * 100}%, rgb(37, 43, 59) 100%)`
                    }}
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
                className={`group relative w-full py-4 rounded-xl font-bold text-lg transition-all overflow-hidden ${
                  project.status === 'completed' || !investmentAmount || parseFloat(investmentAmount) < project.minimumAmount
                    ? 'glass border border-primary/10 text-text-dimmed cursor-not-allowed'
                    : 'bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal text-white hover:shadow-glow-lg hover:scale-105'
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {project.status === 'completed' ? 'تم تحقيق الصندوق' : (
                    <>
                      <TrendingUp size={20} />
                      <span>استثمر الآن</span>
                    </>
                  )}
                </span>
                {!(project.status === 'completed' || !investmentAmount || parseFloat(investmentAmount) < project.minimumAmount) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-teal via-primary-600 to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
