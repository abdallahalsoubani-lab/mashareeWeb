/**
 * Project Card Component
 * Displays a single project/fund in list/grid view
 */

import Link from 'next/link';
import { MapPin, TrendingUp } from 'lucide-react';

interface ProjectCardProps {
  id: string;
  title: string;
  type: string;
  location: string;
  image: string;
  fundedAmount: number;
  targetAmount: number;
  expectedReturn: number;
  durationMonths: number;
  distributionPolicy: string;
  status: string;
}

export function ProjectCard({
  id,
  title,
  type,
  location,
  image,
  fundedAmount,
  targetAmount,
  expectedReturn,
  durationMonths,
  distributionPolicy,
  status,
}: ProjectCardProps) {
  const progress = (fundedAmount / targetAmount) * 100;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Link href={`/projects/${id}`}>
      <div className="h-full dashboard-card hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden">
        {/* Image Container */}
        <div className="relative h-48 bg-slate-200 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Status Badge */}
          {status === 'completed' && (
            <div className="absolute top-3 right-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
              اكتمل العرض
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title & Type */}
          <div className="mb-3">
            <p className="text-xs text-slate-500 mb-1">{type}</p>
            <h3 className="text-lg font-bold text-slate-900 line-clamp-2">
              {title}
            </h3>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-slate-600 text-sm mb-4">
            <MapPin size={16} className="text-blue-600 flex-shrink-0" />
            <span>{location}</span>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-600">نسبة التغطية</span>
              <span className="text-sm font-semibold text-slate-900">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Funded Amount */}
          <div className="mb-4 pb-4 border-b border-slate-100">
            <p className="text-xs text-slate-600 mb-1">المبلغ المجموع</p>
            <p className="text-lg font-bold text-slate-900">
              {formatCurrency(fundedAmount)}
            </p>
          </div>

          {/* Grid of Info */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Expected Return */}
            <div>
              <p className="text-xs text-slate-600 mb-1">العائد المتوقع</p>
              <p className="text-sm font-semibold text-slate-900">
                {expectedReturn}%
              </p>
            </div>

            {/* Duration */}
            <div>
              <p className="text-xs text-slate-600 mb-1">مدة الفرصة</p>
              <p className="text-sm font-semibold text-slate-900">
                {durationMonths} شهر
              </p>
            </div>

            {/* Distribution */}
            <div className="col-span-2">
              <p className="text-xs text-slate-600 mb-1">سياسة التوزيع</p>
              <p className="text-sm font-semibold text-slate-900">
                {distributionPolicy}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm">
            تفاصيل الفرصة
          </button>
        </div>
      </div>
    </Link>
  );
}
