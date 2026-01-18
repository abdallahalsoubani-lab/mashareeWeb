import React, { useState, useEffect, useRef } from 'react';
import {
  Building2,
  Users,
  TrendingUp,
  Shield,
  Clock,
  MapPin,
  Percent,
  ChevronDown,
  Menu,
  X,
  BadgeCheck,
  Landmark,
  Wallet,
  PieChart,
  ArrowUpRight,
} from 'lucide-react';

// Helper function to convert English numerals to Arabic numerals
const toArabicNumeral = (num) => {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).replace(/\d/g, (digit) => arabicNumerals[digit]);
};

// Helper function to format currency in Arabic
const formatArabicCurrency = (num) => {
  const formatted = num.toLocaleString('ar-SA');
  return formatted;
};

// Animated Counter Component
const AnimatedCounter = ({ target, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let current = 0;
    const increment = target / 50;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isVisible, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4b94c] to-[#c9a227]">
        {prefix}
        {toArabicNumeral(count)}
        {suffix}
      </div>
    </div>
  );
};

// Investment Card Component
const InvestmentCard = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => setProgress(78), 500);
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto md:mx-0">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <div className="float-animation">
        <div
          className="relative rounded-2xl overflow-hidden border border-[#c9a227]/30 shadow-2xl"
          style={{
            background:
              'rgba(255, 255, 255, 0.05) url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="p-6 md:p-8">
            {/* Header with Badges */}
            <div className="flex gap-2 mb-4 justify-end">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-[#1a1a1a]">
                جديد
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#c9a227]/20 text-[#d4b94c] border border-[#c9a227]/50">
                صندوق عقاري
              </span>
            </div>

            {/* Title and Location */}
            <h3 className="text-2xl md:text-3xl font-bold text-[#f5f0e8] mb-2 text-right">
              برج الواحة السكني
            </h3>
            <div className="flex items-center justify-end gap-2 mb-6 text-[#b0a090]">
              <MapPin size={18} />
              <span className="text-sm md:text-base">الرياض - حي الملقا</span>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[#b0a090] text-sm">التمويل المجموع</span>
                <span className="text-[#d4b94c] font-bold text-sm">٧٨٪</span>
              </div>
              <div className="w-full h-3 bg-[#5c4d3a] rounded-full overflow-hidden border border-[#8b7355]">
                <div
                  className="h-full bg-gradient-to-r from-[#c9a227] to-[#d4b94c] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Amount */}
            <div className="text-right mb-6 p-4 rounded-lg bg-[#5c4d3a]/30 border border-[#8b7355]/50">
              <p className="text-[#b0a090] text-sm mb-2">المبلغ المجموع</p>
              <p className="text-[#d4b94c] text-xl font-bold">
                {toArabicNumeral('11.7')} م من {toArabicNumeral('15')} م ريال
              </p>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-[#8b7355]/50">
              <div className="text-center">
                <p className="text-[#b0a090] text-xs mb-2">العائد المتوقع</p>
                <p className="text-[#d4b94c] font-bold text-lg">٢٢٪</p>
              </div>
              <div className="text-center">
                <p className="text-[#b0a090] text-xs mb-2">المدة</p>
                <p className="text-[#d4b94c] font-bold text-lg">٣ سنوات</p>
              </div>
              <div className="text-center">
                <p className="text-[#b0a090] text-xs mb-2">الحد الأدنى</p>
                <p className="text-[#d4b94c] font-bold text-lg">١,٠٠٠ ر.س</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-[#c9a227]">
                <span className="flex items-center gap-1 text-sm">
                  <Clock size={16} />
                  متبقي ١٢ يوم
                </span>
              </div>
              <button className="w-full py-3 rounded-lg bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-[#1a1a1a] font-bold hover:shadow-lg hover:shadow-[#c9a227]/50 transition-all duration-300 hover:scale-105">
                استثمر الآن
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Masharee Component
export default function Masharee() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'الرئيسية', href: '#' },
    { label: 'الفرص الاستثمارية', href: '#' },
    { label: 'الصناديق العقارية', href: '#' },
    { label: 'الصكوك', href: '#' },
    { label: 'التمويل', href: '#' },
    { label: 'المحفظة', href: '#' },
    { label: 'من نحن', href: '#' },
  ];

  return (
    <div dir="rtl" className="bg-[#1a1a1a] text-[#f5f0e8] overflow-hidden font-['Tajawal']">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');

        body {
          font-family: 'Tajawal', sans-serif;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        @keyframes shimmer {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }

        .gold-gradient {
          background: linear-gradient(135deg, #d4b94c 0%, #c9a227 50%, #9a7b1c 100%);
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(201, 162, 39, 0.2);
        }

        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='2' /%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* Header */}
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#1a1a1a]/95 backdrop-blur-md border-b border-[#c9a227]/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#d4b94c] to-[#c9a227] flex items-center justify-center">
              <Building2 size={24} className="text-[#1a1a1a]" />
            </div>
            <span className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4b94c] to-[#c9a227]">
              مشاريع
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-[#b0a090] hover:text-[#d4b94c] transition-colors duration-300 text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Language Toggle */}
            <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#5c4d3a]/50 transition-colors duration-300 text-sm text-[#b0a090] hover:text-[#d4b94c]">
              <span>العربية</span>
              <ChevronDown size={16} />
            </button>

            {/* Sign In */}
            <button className="hidden sm:block px-4 py-2 rounded-lg border border-[#c9a227] text-[#d4b94c] hover:bg-[#c9a227]/10 transition-all duration-300 text-sm font-medium">
              تسجيل دخول
            </button>

            {/* Sign Up */}
            <button className="hidden sm:block px-4 py-2 rounded-lg bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-[#1a1a1a] hover:shadow-lg hover:shadow-[#c9a227]/50 transition-all duration-300 font-bold text-sm">
              إنشاء حساب
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[#5c4d3a]/50 transition-colors"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="lg:hidden bg-[#1a1a1a]/95 backdrop-blur-md border-t border-[#c9a227]/20 py-4">
            <div className="max-w-7xl mx-auto px-4 space-y-3 flex flex-col items-end">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-[#b0a090] hover:text-[#d4b94c] transition-colors duration-300 text-sm font-medium"
                >
                  {item.label}
                </a>
              ))}
              <div className="w-full border-t border-[#8b7355]/30 my-3" />
              <button className="w-full px-4 py-2 rounded-lg border border-[#c9a227] text-[#d4b94c] hover:bg-[#c9a227]/10 transition-all duration-300 text-sm font-medium">
                تسجيل دخول
              </button>
              <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-[#1a1a1a] hover:shadow-lg hover:shadow-[#c9a227]/50 transition-all duration-300 font-bold text-sm">
                إنشاء حساب
              </button>
            </div>
          </nav>
        )}
      </header>

      {/* Hero Section */}
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
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
              <button className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-[#1a1a1a] font-bold text-lg hover:shadow-2xl hover:shadow-[#c9a227]/50 hover:scale-105 transition-all duration-300">
                ابدأ الاستثمار الآن
              </button>
              <button className="flex-1 py-4 rounded-xl border-2 border-[#c9a227] text-[#d4b94c] font-bold text-lg hover:bg-[#c9a227]/10 hover:shadow-lg transition-all duration-300">
                استكشف الفرص
              </button>
            </div>
          </div>

          {/* Right - Investment Card */}
          <div className="hidden md:flex justify-center">
            <InvestmentCard />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[#b0a090] text-sm">اسحب للأسفل</span>
            <div className="shimmer">
              <ChevronDown size={24} className="text-[#c9a227]" />
            </div>
          </div>
        </div>

        {/* Mobile Investment Card */}
        <div className="md:hidden absolute bottom-4 left-4 right-4">
          <InvestmentCard />
        </div>
      </section>

      {/* Stats Bar - Floating Glass Morphism */}
      <section className="relative py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className="glass-effect rounded-3xl p-8 md:p-12 relative overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, rgba(139, 115, 85, 0.1) 0%, rgba(92, 77, 58, 0.15) 100%)',
              backdropFilter: 'blur(20px)',
              borderImage: 'linear-gradient(135deg, #c9a227, #d4b94c) 1',
            }}
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a227]/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d4b94c]/5 rounded-full blur-3xl -z-10" />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative z-10">
              {/* Stat 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-gradient-to-br from-[#c9a227]/20 to-[#d4b94c]/20">
                  <TrendingUp className="text-[#d4b94c]" size={24} />
                </div>
                <p className="text-[#b0a090] text-sm mb-2">إجمالي التمويلات</p>
                <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4b94c] to-[#c9a227]">
                  <AnimatedCounter target={2500000000} suffix="+" prefix="" />
                  <span className="text-lg text-[#b0a090]">مليار+</span>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-gradient-to-br from-[#c9a227]/20 to-[#d4b94c]/20">
                  <Users className="text-[#d4b94c]" size={24} />
                </div>
                <p className="text-[#b0a090] text-sm mb-2">المستثمرين النشطين</p>
                <div className="text-2xl md:text-3xl font-bold">
                  <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4b94c] to-[#c9a227]">
                    <AnimatedCounter target={45000} suffix="+" />
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-gradient-to-br from-[#c9a227]/20 to-[#d4b94c]/20">
                  <Building2 className="text-[#d4b94c]" size={24} />
                </div>
                <p className="text-[#b0a090] text-sm mb-2">المشاريع المكتملة</p>
                <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4b94c] to-[#c9a227]">
                  <AnimatedCounter target={127} />
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-gradient-to-br from-[#c9a227]/20 to-[#d4b94c]/20">
                  <Percent className="text-[#d4b94c]" size={24} />
                </div>
                <p className="text-[#b0a090] text-sm mb-2">نسبة تغطية الإصدارات</p>
                <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4b94c] to-[#c9a227]">
                  <AnimatedCounter target={100} suffix="٪" />
                </div>
              </div>

              {/* Stat 5 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-gradient-to-br from-[#c9a227]/20 to-[#d4b94c]/20">
                  <PieChart className="text-[#d4b94c]" size={24} />
                </div>
                <p className="text-[#b0a090] text-sm mb-2">متوسط العائد السنوي</p>
                <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4b94c] to-[#c9a227]">
                  <AnimatedCounter target={18} suffix="٪+" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#b0a090] text-lg md:text-xl font-medium">
              مرخصة ومعتمدة من
            </p>
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: Landmark,
                label: 'هيئة السوق المالية',
              },
              {
                icon: Building2,
                label: 'البنك المركزي السعودي',
              },
              {
                icon: BadgeCheck,
                label: 'الهيئة العامة للعقار',
              },
              {
                icon: Shield,
                label: 'متوافق مع الشريعة الإسلامية',
              },
            ].map((badge, index) => (
              <div
                key={index}
                className="glass-effect rounded-2xl p-6 md:p-8 flex flex-col items-center text-center hover:border-[#c9a227]/60 transition-all duration-300"
                style={{
                  background:
                    'rgba(92, 77, 58, 0.1)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="mb-4 p-3 rounded-full bg-gradient-to-br from-[#c9a227]/20 to-[#d4b94c]/20">
                  <badge.icon className="text-[#d4b94c]" size={28} />
                </div>
                <p className="text-[#f5f0e8] font-semibold text-sm md:text-base">
                  {badge.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#8b7355]/30 bg-[#1a1a1a] py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4b94c] to-[#c9a227] flex items-center justify-center">
                  <Building2 size={20} className="text-[#1a1a1a]" />
                </div>
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4b94c] to-[#c9a227]">
                  مشاريع
                </span>
              </div>
              <p className="text-[#b0a090] text-sm leading-relaxed">
                منصة استثمارية موثوقة وآمنة للاستثمار العقاري والصناديق الإسلامية
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-[#f5f0e8] font-bold mb-4">الروابط السريعة</h4>
              <ul className="space-y-2">
                {['الرئيسية', 'الفرص', 'المحفظة', 'الدعم'].map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-[#b0a090] hover:text-[#d4b94c] transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[#f5f0e8] font-bold mb-4">اتصل بنا</h4>
              <ul className="space-y-2 text-[#b0a090] text-sm">
                <li>البريد: info@masharee.sa</li>
                <li>الهاتف: +966 11 1234 5678</li>
                <li>الموقع: الرياض - المملكة العربية السعودية</li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#8b7355]/30 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[#b0a090] text-sm">
                جميع الحقوق محفوظة © ٢٠٢٦ منصة مشاريع
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-[#b0a090] hover:text-[#d4b94c] transition-colors">
                  سياسة الخصوصية
                </a>
                <a href="#" className="text-[#b0a090] hover:text-[#d4b94c] transition-colors">
                  شروط الخدمة
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
