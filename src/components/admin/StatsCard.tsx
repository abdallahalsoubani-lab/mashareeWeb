/**
 * Admin Stats Card Component
 * Displays key metrics on admin dashboard
 */

import { ReactNode } from 'react';

type ColorType = 'blue' | 'green' | 'purple' | 'orange';

const colorClasses: Record<ColorType, { icon: string; border: string; bg: string; text: string }> = {
  blue: { 
    icon: 'text-primary-400', 
    border: 'border-primary/30', 
    bg: 'bg-primary/10',
    text: 'text-primary-400'
  },
  green: { 
    icon: 'text-accent-teal', 
    border: 'border-accent-teal/30', 
    bg: 'bg-accent-teal/10',
    text: 'text-accent-teal'
  },
  purple: { 
    icon: 'text-accent-purple', 
    border: 'border-accent-purple/30', 
    bg: 'bg-accent-purple/10',
    text: 'text-accent-purple'
  },
  orange: { 
    icon: 'text-accent-orange', 
    border: 'border-accent-orange/30', 
    bg: 'bg-accent-orange/10',
    text: 'text-accent-orange'
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
      <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
      <div className="relative glass rounded-2xl p-6 border border-primary/20 group-hover:border-primary/40 transition-all duration-300 hover:shadow-glow-sm">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-text-muted text-sm mb-2 font-medium">{title}</p>
            <p className={`text-4xl font-bold mb-2 ${colors.text}`}>{value}</p>
            {subtitle && (
              <p className="text-text-secondary text-sm mb-3">{subtitle}</p>
            )}
            {trend && (
              <p
                className={`text-sm font-medium ${
                  trend.isPositive ? 'text-accent-green' : 'text-accent-pink'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% من الشهر الماضي
              </p>
            )}
          </div>
          <div className={`p-3.5 rounded-xl glass border ${colors.border} ${colors.bg} flex-shrink-0`}>
            <div className={colors.icon}>
              {icon}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
