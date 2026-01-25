'use client';

import React from 'react';
import { TrendingUp, Users, Building2, Percent, PieChart } from 'lucide-react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const StatsBar: React.FC = () => {
  const stats = [
    {
      icon: TrendingUp,
      label: 'إجمالي التمويلات',
      target: 2500000000,
      suffix: '+',
      suffix2: 'مليار',
    },
    {
      icon: Users,
      label: 'المستثمرين النشطين',
      target: 45000,
      suffix: '+',
    },
    {
      icon: Building2,
      label: 'المشاريع المكتملة',
      target: 127,
      suffix: '',
    },
    {
      icon: Percent,
      label: 'نسبة تغطية الإصدارات',
      target: 100,
      suffix: '٪',
    },
    {
      icon: PieChart,
      label: 'متوسط العائد السنوي',
      target: 18,
      suffix: '٪+',
    },
  ];

  return (
    <section className="relative py-16 md:py-24 px-4 md:px-6 bg-mesh">
      <div className="max-w-7xl mx-auto">
        <div className="group relative animate-fade-in-scale">
          {/* Enhanced Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal rounded-3xl opacity-30 blur-2xl group-hover:opacity-50 transition-all duration-700" />
          
          <div className="relative glass rounded-3xl p-8 md:p-12 overflow-hidden border-2 border-primary/30 group-hover:border-primary/50 transition-all duration-300 shadow-glow-md">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent-purple/10 via-primary-500/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent-teal/10 via-primary-500/10 to-transparent rounded-full blur-3xl" />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-6 relative z-10">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex flex-col items-center text-center group/stat">
                    <div className="mb-4 p-3.5 rounded-xl glass border border-primary/20 group-hover/stat:border-primary/40 transition-all duration-300 group-hover/stat:shadow-glow-sm">
                      <Icon className="text-primary-400 group-hover/stat:text-accent-teal transition-colors" size={28} />
                    </div>
                    <p className="text-text-muted text-sm mb-3 font-medium">{stat.label}</p>
                    <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-accent-purple via-primary-400 to-accent-teal bg-clip-text text-transparent">
                      <AnimatedCounter
                        target={stat.target}
                        suffix={stat.suffix}
                      />
                    </div>
                    {stat.suffix2 && (
                      <span className="text-lg text-text-secondary mt-1 font-semibold">{stat.suffix2}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
