'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { toArabicNumeral } from '@/lib/utils';
import Button from '@/components/ui/Button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            'url(/hero-bg.jpg)',
        }}
      />

      {/* Modern Overlay with blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background-secondary/90 to-background/95 backdrop-blur-sm" />
      
      {/* Animated gradient mesh */}
      <div className="absolute inset-0 bg-mesh opacity-60" />

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
          <div className="hero-subtitle inline-flex items-center gap-2 mb-6 px-4 py-2 glass rounded-full border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-accent-teal animate-pulse" />
            <span className="text-sm text-text-secondary font-medium">منصة استثمارية مرخصة</span>
          </div>

          <h1 className="hero-title font-black mb-6 gradient-text">
            استثمر في<br/>مستقبلك العقاري
          </h1>

          <p className="hero-subtitle text-lg md:text-xl text-text-secondary mb-10 max-w-lg leading-relaxed">
            المنصة السعودية الأولى التي تجمع الصناديق العقارية والصكوك والتمويل الجماعي في مكان واحد.
            ابدأ استثمارك من {toArabicNumeral('1,000')} ريال فقط.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Link href="/register" className="flex-1 group">
              <button className="relative w-full px-8 py-4 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-glow-lg hover:scale-105">
                <span className="relative z-10">ابدأ الاستثمار الآن</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-teal via-primary-600 to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            </Link>
            <Link href="/projects" className="flex-1">
              <button className="w-full px-8 py-4 glass border-2 border-primary/40 text-text-primary font-bold rounded-xl hover:border-primary/60 hover:bg-primary/10 transition-all duration-300 hover:shadow-glow-sm">
                استكشف الفرص
              </button>
            </Link>
          </div>
        </div>

        {/* Right - Investment Card Placeholder */}
        <div className="hidden md:flex justify-center">
          <div className="w-full max-w-sm mx-auto">
            <div
              className="glass rounded-2xl overflow-hidden border border-primary/30 shadow-glow-md p-6 md:p-8"
              style={{
                background:
                  'rgba(92, 77, 58, 0.15) url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="text-center text-[#b0a090]">
                Investment Card Component
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
        <div className="flex flex-col items-center gap-2 glass px-4 py-3 rounded-full border border-primary/20">
          <span className="text-text-secondary text-sm font-medium">اسحب للأسفل</span>
          <div className="animate-shimmer">
            <ChevronDown size={24} className="text-primary-400" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
