'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { toArabicNumeral } from '@/lib/utils';
import Button from '@/components/ui/Button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80)',
        }}
      />

      {/* Diagonal Overlay Gradient */}
      <div
        className="absolute inset-0 noise-overlay"
        style={{
          background:
            'linear-gradient(135deg, rgba(92, 77, 58, 0.85) 0%, rgba(139, 115, 85, 0.6) 50%, rgba(26, 26, 26, 0.3) 100%)',
        }}
      />

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

          <h1 className="hero-title font-black mb-6 text-transparent bg-clip-text bg-gradient-to-l from-[#d4b94c] to-[#f5f0e8]">
            استثمر في مستقبلك العقاري
          </h1>

          <p className="hero-subtitle text-lg md:text-xl text-[#b0a090] mb-8 max-w-lg leading-relaxed">
            المنصة السعودية الأولى التي تجمع الصناديق العقارية والصكوك والتمويل الجماعي في مكان واحد.
            ابدأ استثمارك من {toArabicNumeral('1,000')} ريال فقط.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Link href="/register" className="flex-1">
              <Button size="lg" className="w-full">
                ابدأ الاستثمار الآن
              </Button>
            </Link>
            <Link href="/projects" className="flex-1">
              <Button variant="outline" size="lg" className="w-full">
                استكشف الفرص
              </Button>
            </Link>
          </div>
        </div>

        {/* Right - Investment Card Placeholder */}
        <div className="hidden md:flex justify-center">
          <div className="w-full max-w-sm mx-auto">
            <div
              className="rounded-2xl overflow-hidden border border-[#c9a227]/30 shadow-2xl p-6 md:p-8"
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
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[#b0a090] text-sm">اسحب للأسفل</span>
          <div className="animate-shimmer">
            <ChevronDown size={24} className="text-[#c9a227]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
