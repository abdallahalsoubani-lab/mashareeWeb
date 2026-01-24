/**
 * Admin Stats Card Component
 * Displays key metrics on admin dashboard
 */

import { ReactNode } from 'react';

type ColorType = 'blue' | 'green' | 'purple' | 'orange';

const colorClasses: Record<ColorType, string> = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500',
};

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: ColorType;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'blue',
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-slate-500 text-sm mb-2">{title}</p>
          <p className="text-4xl font-bold text-slate-900 mb-2">{value}</p>
          {subtitle && (
            <p className="text-slate-400 text-sm mb-3">{subtitle}</p>
          )}
          {trend && (
            <p
              className={`text-sm font-medium ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% من الشهر الماضي
            </p>
          )}
        </div>
        <div
          className={`w-14 h-14 ${colorClasses[color]} rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
