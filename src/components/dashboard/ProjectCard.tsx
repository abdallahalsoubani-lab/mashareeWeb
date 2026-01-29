/**
 * Project Card Component
 * Displays a single project/fund in list/grid view
 */

'use client';

import Link from 'next/link';
import RiyalSymbol from '@/components/ui/RiyalSymbol';
import { MapPin, TrendingUp, Clock, Sparkles } from 'lucide-react';

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
      <div className="group relative h-full">
        {/* Enhanced Glow effect */}
        <div className="absolute -inset-1 bg-primary rounded-2xl opacity-0 group-hover:opacity-40 blur-2xl transition-all duration-700" />
        
        {/* Main card */}
        <div className="relative h-full bg-background-secondary rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer group-hover:-translate-y-3 group-hover:scale-[1.02] group-hover:shadow-glow-gold border-2 border-primary/30 group-hover:border-primary/70">
          {/* Image Container with overlay gradient */}
          <div className="relative h-52 overflow-hidden">
            {/* Image */}
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background-card via-background-card/50 to-transparent" />
            
            {/* Status Badge */}
            {status === 'completed' && (
              <div className="absolute top-4 right-4 bg-background-secondary px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border border-primary/30 text-primary flex items-center gap-1.5">
                <Sparkles size={12} />
                <span>اكتمل العرض</span>
              </div>
            )}
            
            {/* Type badge */}
            <div className="absolute top-4 left-4 bg-background-secondary px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border border-primary/30 text-secondary">
              {type}
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-4">
            {/* Title */}
            <div>
              <h3 className="text-lg font-bold text-white line-clamp-2 transition-all duration-300">
                {title}
              </h3>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-secondary text-sm">
              <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                <MapPin size={14} />
              </div>
              <span>{location}</span>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-secondary">نسبة التغطية</span>
                <span className="text-sm font-bold text-primary">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="relative w-full h-2.5 bg-background rounded-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-primary rounded-full transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-primary/10">
              {/* Funded Amount */}
              <div className="bg-background-tertiary rounded-xl p-3 border border-primary/10">
                <p className="text-xs text-secondary mb-1">المبلغ المجموع</p>
                <div className="flex items-center gap-1">
                  <p className="text-base font-bold text-white">
                    {formatCurrency(fundedAmount)}
                  </p>
                  <RiyalSymbol size={14} className="text-primary" />
                </div>
              </div>

              {/* Expected Return */}
              <div className="bg-background-tertiary rounded-xl p-3 border border-primary/10">
                <p className="text-xs text-secondary mb-1 flex items-center gap-1">
                  <TrendingUp size={12} className="text-primary" />
                  <span>العائد المتوقع</span>
                </p>
                <p className="text-base font-bold text-primary">
                  {expectedReturn}%
                </p>
              </div>
            </div>

            {/* Duration & Distribution */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between text-secondary">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-primary" />
                  <span className="text-xs">مدة الفرصة</span>
                </div>
                <span className="font-semibold">{durationMonths} شهر</span>
              </div>
              <div className="text-xs text-secondary">
                <span className="text-secondary">التوزيع:</span> {distributionPolicy}
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full relative py-3.5 px-4 rounded-xl font-bold text-sm overflow-hidden transition-all duration-300 group-hover:scale-[1.02] mt-4" style={{ backgroundColor: '#8F7F5E', color: '#0A0A0A', boxShadow: '0 0 35px rgba(143, 127, 94, 0.4)' }}>
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span>تفاصيل الفرصة</span>
                <TrendingUp size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
