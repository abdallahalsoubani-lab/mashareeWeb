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
        <div className="absolute -inset-1 bg-gradient-to-r from-accent-purple via-primary-400 to-accent-teal rounded-2xl opacity-0 group-hover:opacity-60 blur-2xl transition-all duration-700 animate-glow" />
        <div className="absolute -inset-0.5 bg-gradient-to-br from-accent-purple/50 to-primary-500/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* Main card */}
        <div className="relative h-full glass rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer group-hover:-translate-y-3 group-hover:scale-[1.02] group-hover:shadow-glow-lg border-2 border-primary/30 group-hover:border-primary/70 group-hover:bg-background-card/80">
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
              <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border border-accent-green/30 text-accent-green flex items-center gap-1.5">
                <Sparkles size={12} />
                <span>اكتمل العرض</span>
              </div>
            )}
            
            {/* Type badge */}
            <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border border-primary/30 text-text-secondary">
              {type}
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-4">
            {/* Title */}
            <div>
              <h3 className="text-lg font-bold text-text-primary line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent-purple group-hover:to-primary-400 transition-all duration-300">
                {title}
              </h3>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <div className="p-1.5 rounded-lg bg-primary-500/10 text-primary-400">
                <MapPin size={14} />
              </div>
              <span>{location}</span>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-text-muted">نسبة التغطية</span>
                <span className="text-sm font-bold text-primary-400">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="relative w-full h-2.5 bg-background-tertiary rounded-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal rounded-full transition-all duration-700 shimmer"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-primary/10">
              {/* Funded Amount */}
              <div className="glass rounded-xl p-3 border border-primary/10">
                <p className="text-xs text-text-muted mb-1">المبلغ المجموع</p>
                <div className="flex items-center gap-1">
                  <p className="text-base font-bold text-text-primary">
                    {formatCurrency(fundedAmount)}
                  </p>
                  <RiyalSymbol size={14} className="text-primary-400" />
                </div>
              </div>

              {/* Expected Return */}
              <div className="glass rounded-xl p-3 border border-accent-teal/10">
                <p className="text-xs text-text-muted mb-1 flex items-center gap-1">
                  <TrendingUp size={12} className="text-accent-teal" />
                  <span>العائد المتوقع</span>
                </p>
                <p className="text-base font-bold text-accent-teal">
                  {expectedReturn}%
                </p>
              </div>
            </div>

            {/* Duration & Distribution */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between text-text-secondary">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-primary-400" />
                  <span className="text-xs">مدة الفرصة</span>
                </div>
                <span className="font-semibold">{durationMonths} شهر</span>
              </div>
              <div className="text-xs text-text-muted">
                <span className="text-text-secondary">التوزيع:</span> {distributionPolicy}
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full relative py-3.5 px-4 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal text-white rounded-xl font-bold text-sm overflow-hidden transition-all duration-300 group-hover:shadow-glow-md group-hover:scale-[1.02] mt-4">
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span>تفاصيل الفرصة</span>
                <TrendingUp size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent-teal via-primary-600 to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
