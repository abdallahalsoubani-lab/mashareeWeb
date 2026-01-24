/**
 * Project Details Page
 * Shows detailed information about a specific investment project
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, TrendingUp, Calendar, DollarSign, ChevronRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  type: string;
  description: string;
  location: string;
  image: string;
  images: string[];
  fundedAmount: number;
  targetAmount: number;
  expectedReturn: number;
  durationMonths: number;
  minimumAmount: number;
  riskLevel: string;
  category: string;
  fundManager: string;
  distributor: string;
  supervisor: string;
  distributionPolicy: string;
  status: string;
}

export default function ProjectDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/projects/${params.id}`);
        const data = await response.json();

        if (data.success) {
          setProject(data.project);
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
  }, [params.id]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
    }).format(amount);
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

  if (error || !project) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 font-semibold mb-4">{error || 'فشل تحميل المشروع'}</p>
        <Link href="/projects" className="text-blue-600 hover:text-blue-700 font-semibold">
          العودة إلى الصناديق
        </Link>
      </div>
    );
  }

  const progress = (project.fundedAmount / project.targetAmount) * 100;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-600 mb-8">
        <Link href="/projects" className="hover:text-slate-900">
          الصناديق الاستثمارية
        </Link>
        <ChevronRight size={16} />
        <span className="text-slate-900 font-semibold">{project.title}</span>
      </div>

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-8 mb-4">
          <div>
            <p className="text-sm text-slate-500 mb-2">{project.type}</p>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              {project.title}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl">
              {project.description}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-slate-700 mb-6">
          <MapPin className="text-blue-600" size={20} />
          <span className="text-lg font-semibold">{project.location}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Image */}
          <div className="dashboard-card rounded-2xl overflow-hidden mb-8">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Key Information Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="dashboard-card p-6 rounded-2xl">
              <p className="text-slate-600 text-sm mb-2">العائد المتوقع</p>
              <p className="text-3xl font-bold text-blue-600">
                {project.expectedReturn}%
              </p>
            </div>

            <div className="dashboard-card p-6 rounded-2xl">
              <p className="text-slate-600 text-sm mb-2">مدة الفرصة</p>
              <p className="text-3xl font-bold text-slate-900">
                {project.durationMonths} شهر
              </p>
            </div>

            <div className="dashboard-card p-6 rounded-2xl">
              <p className="text-slate-600 text-sm mb-2">مستوى المخاطرة</p>
              <p className="text-xl font-bold text-slate-900">
                {project.riskLevel}
              </p>
            </div>

            <div className="dashboard-card p-6 rounded-2xl">
              <p className="text-slate-600 text-sm mb-2">سياسة التوزيع</p>
              <p className="text-xl font-bold text-slate-900">
                {project.distributionPolicy}
              </p>
            </div>
          </div>

          {/* Fund Manager Info */}
          <div className="dashboard-card p-8 rounded-2xl mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              الأطراف المسؤولة
            </h3>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-slate-600 text-sm mb-2">مدير الصندوق</p>
                <p className="font-bold text-slate-900">{project.fundManager}</p>
              </div>
              <div>
                <p className="text-slate-600 text-sm mb-2">موزع الوحدات</p>
                <p className="font-bold text-slate-900">{project.distributor}</p>
              </div>
              <div>
                <p className="text-slate-600 text-sm mb-2">الجهة الرقابية</p>
                <p className="font-bold text-slate-900">{project.supervisor}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Funding Progress Card */}
          <div className="dashboard-card p-8 rounded-2xl sticky top-24 mb-6">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-slate-600 font-semibold">
                  نسبة التغطية
                </span>
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

            {/* Amount */}
            <div className="mb-6 pb-6 border-b border-slate-100">
              <p className="text-slate-600 text-sm mb-2">المبلغ المجموع</p>
              <p className="text-2xl font-bold text-slate-900">
                {formatCurrency(project.fundedAmount)}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                من {formatCurrency(project.targetAmount)}
              </p>
            </div>

            {/* Minimum Amount */}
            <div className="mb-6 pb-6 border-b border-slate-100">
              <p className="text-slate-600 text-sm mb-2">الحد الأدنى للاستثمار</p>
              <p className="text-lg font-bold text-slate-900">
                {formatCurrency(project.minimumAmount)}
              </p>
            </div>

            {/* Investment Input */}
            <div className="mb-6">
              <label className="block text-slate-700 font-semibold mb-2">
                مبلغ الاستثمار
              </label>
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                placeholder="أدخل المبلغ"
                min={project.minimumAmount}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
              />
            </div>

            {/* Investment Button */}
            <button
              disabled={
                project.status === 'completed' || !investmentAmount
              }
              className={`w-full py-3 rounded-xl font-bold text-white transition-colors ${
                project.status === 'completed'
                  ? 'bg-slate-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {project.status === 'completed'
                ? 'اكتمل العرض'
                : 'استثمر الآن'}
            </button>

            {/* Status Badge */}
            {project.status === 'completed' && (
              <p className="text-center text-slate-600 text-sm mt-4">
                انتهت فترة الاستثمار في هذا الصندوق
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
