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
    <section className="relative py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-3xl p-8 md:p-12 relative overflow-hidden border border-[#c9a227]/30"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 115, 85, 0.1) 0%, rgba(92, 77, 58, 0.15) 100%)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a227]/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d4b94c]/5 rounded-full blur-3xl -z-10" />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative z-10">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-gradient-to-br from-[#c9a227]/20 to-[#d4b94c]/20">
                    <Icon className="text-[#d4b94c]" size={24} />
                  </div>
                  <p className="text-[#b0a090] text-sm mb-2">{stat.label}</p>
                  <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4b94c] to-[#c9a227]">
                    <AnimatedCounter
                      target={stat.target}
                      suffix={stat.suffix}
                    />
                  </div>
                  {stat.suffix2 && (
                    <span className="text-lg text-[#b0a090] mt-1">{stat.suffix2}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
