'use client';

import React, { useRef, useState, useEffect } from 'react';
import { TrendingUp, Users, Building2, Percent, PieChart } from 'lucide-react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const StatsBar: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // عامل التسريع
    // عكس الاتجاه: السحب من اليمين يملأ من الشمال
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Touch events للدعم على الأجهزة المحمولة
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <section className="relative py-16 md:py-24 px-4 md:px-6 bg-mesh">
      <div className="max-w-7xl mx-auto">
        <div className="group relative animate-fade-in-scale">
          {/* Enhanced Glow Effect */}
          <div className="absolute -inset-1 bg-primary rounded-3xl opacity-20 blur-2xl group-hover:opacity-35 transition-all duration-700" />
          
          <div className="relative bg-background-secondary rounded-3xl p-8 md:p-12 overflow-hidden border-2 border-primary/30 group-hover:border-primary/50 transition-all duration-300 shadow-glow-gold">

            {/* Stats Grid with Drag Support */}
            <div 
              ref={scrollRef}
              className={`grid grid-cols-1 md:flex md:overflow-x-auto md:gap-12 gap-8 relative z-10 md:scrollbar-hide ${isDragging ? 'cursor-grabbing' : 'md:cursor-grab'} select-none`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex flex-col items-center text-center group/stat md:min-w-[200px] lg:min-w-[180px] flex-shrink-0">
                    <div className="mb-4 p-3.5 rounded-xl bg-background-tertiary border border-primary/20 group-hover/stat:border-primary/40 transition-all duration-300 group-hover/stat:shadow-glow-gold">
                      <Icon className="text-primary transition-colors" size={28} />
                    </div>
                    <p className="text-secondary text-sm mb-3 font-medium">{stat.label}</p>
                    <div className="text-3xl md:text-4xl font-black text-primary">
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
