/**
 * Project Card Component
 * Displays a single project/fund in list/grid view
 */

import Link from 'next/link';
import RiyalSymbol from '@/components/ui/RiyalSymbol';
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
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Link href={`/projects/${id}`}>
      <div className="h-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-[#c9a227]/30 rounded-2xl hover:shadow-2xl hover:shadow-[#c9a227]/30 transition-all duration-500 cursor-pointer group overflow-hidden backdrop-blur-sm hover:border-[#c9a227] hover:-translate-y-2 hover:scale-[1.02]">
        {/* Image Container */}
        <div className="relative h-48 bg-[#2a2a2a] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Status Badge */}
          {status === 'completed' && (
            <div className="absolute top-3 right-3 bg-green-900/80 text-green-200 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
              اكتمل العرض
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title & Type */}
          <div className="mb-3">
            <p className="text-xs text-[#b0a090] mb-1">{type}</p>
            <h3 className="text-lg font-bold text-[#f5f0e8] line-clamp-2">
              {title}
            </h3>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-[#b0a090] text-sm mb-4">
            <MapPin size={16} className="text-[#d4b94c] flex-shrink-0" />
            <span>{location}</span>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-[#b0a090]">نسبة التغطية</span>
              <span className="text-sm font-semibold text-[#f5f0e8]">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#c9a227] to-[#d4b94c] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Funded Amount */}
          <div className="mb-4 pb-4 border-b border-[#c9a227]/20">
            <p className="text-xs text-[#b0a090] mb-1">المبلغ المجموع</p>
            <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4b94c] to-[#c9a227] flex items-center gap-2">
              {formatCurrency(fundedAmount)} <RiyalSymbol size={16} />
            </p>
          </div>

          {/* Grid of Info */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Expected Return */}
            <div>
              <p className="text-xs text-[#b0a090] mb-1">العائد المتوقع</p>
              <p className="text-sm font-semibold text-[#f5f0e8]">
                {expectedReturn}%
              </p>
            </div>

            {/* Duration */}
            <div>
              <p className="text-xs text-[#b0a090] mb-1">مدة الفرصة</p>
              <p className="text-sm font-semibold text-[#f5f0e8]">
                {durationMonths} شهر
              </p>
            </div>

            {/* Distribution */}
            <div className="col-span-2">
              <p className="text-xs text-[#b0a090] mb-1">سياسة التوزيع</p>
              <p className="text-sm font-semibold text-[#f5f0e8]">
                {distributionPolicy}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full py-3 px-4 bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-[#1a1a1a] rounded-xl hover:shadow-xl hover:shadow-[#c9a227]/60 transition-all font-bold text-sm relative overflow-hidden group-hover:scale-105">
            <span className="relative z-10">تفاصيل الفرصة</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#d4b94c] to-[#c9a227] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </Link>
  );
}
