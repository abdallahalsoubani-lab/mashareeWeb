/**
 * Admin Stats Card Component
 * Displays key metrics on admin dashboard
 */

import { ReactNode } from 'react';

type ColorType = 'blue' | 'green' | 'purple' | 'orange';

const colorClasses: Record<ColorType, { icon: string; border: string; bg: string; text: string }> = {
  blue: { 
    icon: 'text-primary', 
    border: 'border-primary/30', 
    bg: 'bg-primary/10',
    text: 'text-primary'
  },
  green: { 
    icon: 'text-primary', 
    border: 'border-primary/30', 
    bg: 'bg-primary/10',
    text: 'text-primary'
  },
  purple: { 
    icon: 'text-secondary', 
    border: 'border-secondary/30', 
    bg: 'bg-secondary/10',
    text: 'text-secondary'
  },
  orange: { 
    icon: 'text-primary', 
    border: 'border-primary/30', 
    bg: 'bg-primary/10',
    text: 'text-primary'
  },
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
  const colors = colorClasses[color];
  
  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-primary rounded-2xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500" />
      <div className="relative bg-background-secondary rounded-2xl p-6 border-2 border-primary/70 group-hover:border-primary transition-all duration-300 hover:shadow-card shadow-input">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-secondary text-sm mb-2 font-medium">{title}</p>
            <p className={`text-4xl font-bold mb-2 ${colors.text}`}>{value}</p>
            {subtitle && (
              <p className="text-secondary text-sm mb-3">{subtitle}</p>
            )}
            {trend && (
              <p
                className={`text-sm font-medium ${
                  trend.isPositive ? 'text-primary' : 'text-secondary'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% من الشهر الماضي
              </p>
            )}
          </div>
          <div className={`p-3.5 rounded-xl bg-background-tertiary border-2 border-primary/60 ${colors.bg} flex-shrink-0 shadow-input`}>
            <div className={`${colors.icon} drop-shadow-lg`}>
              {icon}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
