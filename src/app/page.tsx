'use client';

import HeroSection from '@/components/sections/HeroSection';
import StatsBar from '@/components/sections/StatsBar';

export default function Home() {
  return (
    <main dir="rtl" className="bg-[#1a1a1a] text-[#f5f0e8] overflow-hidden font-tajawal">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsBar />

      {/* Placeholder for additional sections */}
      <section className="py-16 md:py-32 px-4 md:px-6 bg-[#1a1a1a] text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-[#f5f0e8] mb-4">
            المزيد قريباً
          </h2>
          <p className="text-[#b0a090]">
            نحن في مراحل التطوير، سيتم إضافة المزيد من الأقسام والمميزات قريباً
          </p>
        </div>
      </section>
    </main>
  );
}
