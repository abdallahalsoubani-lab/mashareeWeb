'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { toArabicNumeral } from '@/lib/utils';
import Button from '@/components/ui/Button';
import FeaturedInvestmentCard from '@/components/cards/FeaturedInvestmentCard';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80)',
        }}
      />

      {/* Modern Overlay with blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/98 via-background-secondary/95 to-background/98 backdrop-blur-md" />
      
      {/* Animated gradient mesh */}
      <div className="absolute inset-0 bg-mesh opacity-80" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-20 grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Left Content */}
        <div className="flex flex-col items-end text-right">
          <style>{`
            .hero-title {
              font-size: clamp(2rem, 5vw, 4rem);
              line-height: 1.2;
              animation: fadeInUp 1s ease-out;
            }

            .hero-subtitle {
              animation: fadeInUp 1s ease-out 0.2s backwards;
            }

            .hero-buttons {
              animation: fadeInUp 1s ease-out 0.4s backwards;
            }
          `}</style>

          {/* Badge */}
          <div className="hero-subtitle inline-flex items-center gap-2 mb-6 px-4 py-2 bg-background-secondary rounded-full border-2 border-primary/60 shadow-card">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-secondary font-medium">مرخصة من هيئة السوق المالية</span>
          </div>

          <h1 className="hero-title font-black mb-6 text-white drop-shadow-2xl">
            استثمر في العقار<br/>بكل سهولة وأمان
          </h1>

          <p className="hero-subtitle text-lg md:text-xl text-secondary mb-10 max-w-lg leading-relaxed drop-shadow-lg">
            منصة سعودية متكاملة للاستثمار العقاري عبر الصناديق والصكوك والتمويل الجماعي.
            <br />
            <span className="font-bold text-primary">ابدأ من {toArabicNumeral('1,000')} ريال فقط</span> وحقق عوائد تصل إلى {toArabicNumeral('25')}٪ سنوياً.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Link href="/register" className="flex-1 group">
              <button className="relative w-full px-8 py-4 font-bold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#8F7F5E', color: '#0A0A0A', boxShadow: '0 0 35px rgba(143, 127, 94, 0.4)' }}>
                <span className="relative z-10">ابدأ الاستثمار الآن</span>
              </button>
            </Link>
            <Link href="/projects" className="flex-1">
              <button className="w-full px-8 py-4 bg-background-secondary border-2 border-primary/40 text-white font-bold rounded-xl hover:border-primary hover:bg-primary/10 transition-all duration-300">
                استكشف الفرص
              </button>
            </Link>
          </div>
        </div>

        {/* Right - Featured Investment Card */}
        <div className="hidden md:flex justify-center">
          <FeaturedInvestmentCard />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
        <div className="flex flex-col items-center gap-2 bg-background-secondary px-4 py-3 rounded-full border-2 border-primary/60 shadow-card">
          <span className="text-secondary text-sm font-medium">اسحب للأسفل</span>
          <div className="animate-shimmer">
            <ChevronDown size={24} className="text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
