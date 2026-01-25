'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/sections/HeroSection';
import StatsBar from '@/components/sections/StatsBar';
import RiyalSymbol from '@/components/ui/RiyalSymbol';
import {
  Building2,
  Users,
  TrendingUp,
  Shield,
  Clock,
  MapPin,
  Percent,
  ChevronDown,
  Landmark,
  FileText,
  Wallet as WalletIcon,
  PieChart,
  ArrowLeft,
  Headphones,
  UserPlus,
  Search,
  CheckCircle,
  DollarSign,
  Calendar,
  Star,
  Quote,
  Phone,
  Mail,
  ArrowUp,
} from 'lucide-react';

// Helper function to convert English numerals to Arabic numerals
const toArabicNumeral = (num: string | number) => {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).replace(/\d/g, (digit) => arabicNumerals[parseInt(digit)]);
};

// Animated Counter Component
const AnimatedCounter = ({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent-purple via-primary-400 to-accent-teal bg-clip-text text-transparent">
        {prefix}
        {toArabicNumeral(count)}
        {suffix}
      </div>
    </div>
  );
};

// Investment Opportunity Card Component
const InvestmentOpportunityCard = ({ project }: { project: any }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressPercent = (project.fundedAmount / project.targetAmount) * 100;
    setTimeout(() => setProgress(progressPercent), 300);
  }, [project]);

  const getBadgeStyle = (badgeType: string) => {
    const styles: Record<string, string> = {
      جديد: 'bg-accent-green/10 text-accent-green border border-accent-green/30',
      مميز: 'bg-accent-orange/10 text-accent-orange border border-accent-orange/30',
      حصري: 'bg-accent-purple/10 text-accent-purple border border-accent-purple/30',
      'عوائد دورية': 'bg-primary-500/10 text-primary-400 border border-primary/30',
      'متوافق مع الشريعة': 'bg-accent-teal/10 text-accent-teal border border-accent-teal/30',
    };
    return styles[badgeType] || 'bg-primary-500/10 text-primary-400 border border-primary/30';
  };

  return (
    <Link href={`/projects/${project.id}`}>
      <div className="group relative h-full">
        {/* Enhanced Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-accent-purple via-primary-400 to-accent-teal rounded-2xl opacity-0 group-hover:opacity-60 blur-2xl transition-all duration-700 animate-glow" />
        <div className="absolute -inset-0.5 bg-gradient-to-br from-accent-purple/50 to-primary-500/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* Main card */}
        <div className="relative h-full glass rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer group-hover:-translate-y-3 group-hover:scale-[1.02] group-hover:shadow-glow-lg border-2 border-primary/30 group-hover:border-primary/70 group-hover:bg-background-card/80">
        {/* Image Container with overlay gradient */}
        <div className="relative h-52 overflow-hidden">
          {/* Image */}
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background-card via-background-card/50 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-4 right-4 flex gap-2 flex-wrap">
            {project.badges?.map((badge: string, index: number) => (
              <span
                key={index}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-md ${getBadgeStyle(badge)}`}
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Type Badge */}
          <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border border-primary/30 text-text-secondary">
            {project.type}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Title */}
          <div>
            <h3 className="text-lg font-bold text-text-primary line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent-purple group-hover:to-primary-400 transition-all duration-300">
              {project.title}
            </h3>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-text-muted text-sm">
            <div className="p-1.5 rounded-lg bg-primary-500/10 text-primary-400">
              <MapPin size={14} />
            </div>
            <span>{project.location}</span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-primary/10">
            <div className="glass rounded-xl p-3 border border-accent-teal/10">
              <p className="text-xs text-text-muted mb-1">العائد المتوقع</p>
              <p className="text-base font-bold text-accent-teal">{project.expectedReturn}٪</p>
            </div>
            <div className="glass rounded-xl p-3 border border-primary/10">
              <p className="text-xs text-text-muted mb-1">مدة الاستثمار</p>
              <p className="text-base font-bold text-text-primary">{project.durationMonths} شهر</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-text-muted">نسبة التغطية</span>
              <span className="text-sm font-bold text-primary-400">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="relative w-full h-2.5 bg-background-tertiary rounded-full overflow-hidden">
              <div
                className="absolute inset-0 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal rounded-full transition-all duration-1000 shimmer"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-text-muted mt-2 flex items-center justify-end gap-1">
              {new Intl.NumberFormat('ar-SA').format(project.fundedAmount)} من {new Intl.NumberFormat('ar-SA').format(project.targetAmount)} <RiyalSymbol size={12} className="text-primary-400" />
            </p>
          </div>

          {/* CTA Button */}
          <button className="w-full relative py-3.5 px-4 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal text-white rounded-xl font-bold text-sm overflow-hidden transition-all duration-300 group-hover:shadow-glow-md group-hover:scale-[1.02] mt-4">
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>تفاصيل الفرصة</span>
              <TrendingUp size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-teal via-primary-600 to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </div>
        </div>
      </div>
    </Link>
  );
};

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('الكل');
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects?limit=6');
        const data = await response.json();
        if (data.success) {
          setProjects(data.projects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const services = [
    {
      id: 1,
      icon: Landmark,
      title: 'الصناديق العقارية',
      description: 'استثمر في صناديق عقارية متنوعة تديرها شركات مرخصة من هيئة السوق المالية، مع عوائد دورية وشفافية كاملة.',
      features: [
        'عوائد سنوية تصل إلى ٢٥٪',
        'إدارة احترافية معتمدة',
        'تقارير دورية شفافة',
        'تنويع المخاطر',
      ],
      buttonText: 'استكشف الصناديق',
    },
    {
      id: 2,
      icon: FileText,
      title: 'الصكوك الاستثمارية',
      description: 'أدوات دين متوافقة مع الشريعة الإسلامية تمكنك من تمويل المشاريع والحصول على عوائد مجزية.',
      features: [
        'تمويل يصل إلى ٣٠ مليون ريال',
        'مدة تصل إلى ١٠ سنوات',
        'جدول سداد مرن',
        'سداد مبكر بدون رسوم',
      ],
      buttonText: 'تعرف على الصكوك',
    },
    {
      id: 3,
      icon: Users,
      title: 'التمويل الجماعي',
      description: 'شارك مع آلاف المستثمرين في تمويل مشاريع واعدة بمبالغ تبدأ من ٥٠٠ ريال فقط.',
      features: [
        'حد أدنى ٥٠٠ ريال فقط',
        'مشاريع مدروسة بعناية',
        'متابعة لحظية للاستثمار',
        'سحب الأرباح في أي وقت',
      ],
      buttonText: 'ابدأ التمويل',
    },
  ];

  const features = [
    { id: 1, icon: Clock, title: 'موافقة خلال ٣ أيام', description: 'نقدم لك عرض تمويلي خلال ٣ أيام فقط من تقديم الطلب' },
    { id: 2, icon: WalletIcon, title: 'استثمر من ٥٠٠ ريال', description: 'ابدأ رحلتك الاستثمارية بمبلغ بسيط يناسب ميزانيتك' },
    { id: 3, icon: TrendingUp, title: 'عوائد تصل ٢٥٪', description: 'حقق عوائد استثنائية مع فرص مدروسة بعناية فائقة' },
    { id: 4, icon: Shield, title: '١٠٠٪ حلال', description: 'جميع استثماراتنا معتمدة من هيئة شرعية مستقلة' },
    { id: 5, icon: PieChart, title: 'كل استثماراتك في مكان واحد', description: 'تابع صناديقك وصكوكك وأسهمك من محفظة واحدة' },
    { id: 6, icon: DollarSign, title: 'اسحب أرباحك في أي وقت', description: 'حرية كاملة في سحب أرباحك أو إعادة استثمارها' },
    { id: 7, icon: FileText, title: 'تحديثات دورية', description: 'احصل على تقارير مفصلة من مدراء الصناديق بشكل منتظم' },
    { id: 8, icon: Headphones, title: 'دعم على مدار الساعة', description: 'فريق دعم متخصص جاهز لمساعدتك في أي وقت' },
  ];

  const testimonials = [
    {
      id: 1,
      rating: 5,
      quote: 'استثمرت في صندوق الرياض السكني قبل سنتين، وحصلت على عائد ٢٢٪. المنصة سهلة الاستخدام والتقارير واضحة وشفافة. أنصح الجميع بالتجربة.',
      name: 'محمد العتيبي',
      title: 'مستثمر منذ ٢٠٢٣',
      initials: 'م ع',
    },
    {
      id: 2,
      rating: 5,
      quote: 'أفضل منصة استثمار عقاري جربتها. الحد الأدنى المنخفض سمح لي بتنويع استثماراتي بين عدة صناديق. الدعم الفني ممتاز ويرد بسرعة.',
      name: 'سارة القحطاني',
      title: 'مستثمرة منذ ٢٠٢٢',
      initials: 'س ق',
    },
    {
      id: 3,
      rating: 5,
      quote: 'كرجل أعمال، كنت أبحث عن تمويل سريع لمشروعي. منصة مشاريع وفرت لي التمويل خلال أسبوع فقط! عملية سلسة ومهنية من البداية للنهاية.',
      name: 'عبدالله الشمري',
      title: 'صاحب مشروع ممول',
      initials: 'ع ش',
    },
  ];

  return (
    <main dir="rtl" className="bg-mesh text-text-primary overflow-hidden font-tajawal">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsBar />

      {/* Investment Opportunities Section */}
      <section className="py-16 md:py-32 px-4 md:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 glass rounded-full border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-accent-teal animate-pulse" />
              <span className="text-sm text-text-secondary font-medium">استثمر بثقة</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              الفرص الاستثمارية المتاحة
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto text-base md:text-lg">
              اختر من بين مجموعة متنوعة من الفرص الاستثمارية المدروسة بعناية والمتوافقة مع الشريعة الإسلامية
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 md:mb-16 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
            {['الكل', 'صندوق عقاري', 'صكوك', 'تمويل جماعي', 'مساهمة عقارية'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative px-6 md:px-8 py-2.5 md:py-3 rounded-xl font-bold text-sm md:text-base transition-all duration-300 overflow-hidden ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal text-white shadow-glow-md'
                    : 'glass text-text-muted hover:text-text-primary border border-primary/20 hover:border-primary/40'
                }`}
              >
                <span className="relative z-10">{filter}</span>
                {activeFilter === filter && (
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-teal via-primary-600 to-accent-purple opacity-0 hover:opacity-100 transition-opacity duration-500" />
                )}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="text-center py-20 animate-fade-in-scale">
              <div className="inline-flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500/20 border-t-primary-500" />
                  <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-xl animate-pulse" />
                </div>
                <span className="text-text-secondary font-medium">جاري تحميل الفرص الاستثمارية...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {projects
                  .filter((project: any) => activeFilter === 'الكل' || project.type === activeFilter)
                  .slice(0, 6)
                  .map((project: any, index: number) => (
                    <div key={project.id} className="stagger-item">
                      <InvestmentOpportunityCard project={project} />
                    </div>
                  ))}
              </div>

              <div className="flex justify-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <Link href="/projects">
                  <button className="group relative px-10 md:px-12 py-4 glass border-2 border-primary/40 text-text-primary font-bold text-base md:text-lg rounded-xl hover:border-primary/60 hover:shadow-glow-md transition-all duration-300 flex items-center gap-3 overflow-hidden">
                    <span className="relative z-10">عرض جميع الفرص</span>
                    <ArrowLeft size={20} className="relative z-10 group-hover:-translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/10 via-primary-500/10 to-accent-teal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-32 px-4 md:px-6 bg-mesh relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 glass rounded-full border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
              <span className="text-sm text-text-secondary font-medium">حلول استثمارية متكاملة</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              خدماتنا المالية
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto text-base md:text-lg">
              نقدم لك مجموعة شاملة من الخدمات الاستثمارية المتوافقة مع الشريعة الإسلامية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className="group relative stagger-item"
                  style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
                  <div className="relative glass rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-glow-md border border-primary/20 group-hover:border-primary/40">
                  <div className="p-8 flex flex-col h-full">
                    <div className="mb-6 p-4 rounded-xl glass border border-primary/20 w-fit">
                      <IconComponent className="text-primary-400" size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary mb-4">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary text-base mb-6 flex-grow leading-relaxed">
                      {service.description}
                    </p>
                    <div className="mb-8 space-y-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle size={18} className="text-accent-teal mt-0.5 flex-shrink-0" />
                          <span className="text-text-secondary text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <button className="group relative w-full py-3.5 rounded-xl bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal text-white font-bold overflow-hidden transition-all duration-300 hover:shadow-glow-md hover:scale-105">
                      <span className="relative z-10">{service.buttonText}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-accent-teal via-primary-600 to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </button>
                  </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-32 px-4 md:px-6 bg-mesh relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 glass rounded-full border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-accent-purple animate-pulse" />
              <span className="text-sm text-text-secondary font-medium">مميزاتنا التنافسية</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              لماذا تختار مشاريع؟
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto text-base md:text-lg">
              جمعنا لك أفضل المميزات من منصات الاستثمار الرائدة في مكان واحد
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="group relative stagger-item"
                  style={{ animationDelay: `${0.05 * (index + 1)}s` }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal rounded-xl opacity-0 group-hover:opacity-10 blur transition-all duration-300" />
                  <div className="relative glass rounded-xl p-6 border border-primary/10 group-hover:border-primary/30 transition-all duration-300 hover:shadow-glow-sm">
                    <div className="mb-4 p-2.5 rounded-xl glass border border-primary/20 w-fit">
                      <IconComponent className="text-primary-400" size={24} />
                    </div>
                    <h4 className="text-lg font-bold text-text-primary mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-32 px-4 md:px-6 bg-mesh relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 glass rounded-full border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
              <span className="text-sm text-text-secondary font-medium">خطوات بسيطة</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              كيف تبدأ الاستثمار؟
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto text-base md:text-lg">
              ٤ خطوات سهلة تفصلك عن تحقيق أهدافك المالية
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-20 right-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: '١', title: 'أنشئ حسابك', description: 'سجل في أقل من دقيقة عبر النفاذ الوطني الموحد', icon: UserPlus },
                { number: '٢', title: 'اشحن محفظتك', description: 'أضف رصيد عبر التحويل البنكي أو Apple Pay أو مدى', icon: WalletIcon },
                { number: '٣', title: 'اختر فرصتك', description: 'تصفح الفرص واختر ما يناسب أهدافك ومستوى المخاطرة', icon: Search },
                { number: '٤', title: 'احصد الأرباح', description: 'تابع استثمارك واستلم أرباحك بشكل دوري في محفظتك', icon: TrendingUp },
              ].map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <div key={idx} className="flex flex-col items-center text-center stagger-item" style={{ animationDelay: `${0.1 * (idx + 1)}s` }}>
                    <div className="relative mb-6">
                      <div className="absolute -inset-2 bg-gradient-to-r from-accent-purple to-primary-500 rounded-full blur-xl opacity-40" />
                      <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-accent-purple to-primary-500 flex items-center justify-center shadow-glow-md">
                        <span className="text-white text-4xl font-black">
                          {step.number}
                        </span>
                      </div>
                    </div>
                    <div className="mb-4 p-3.5 rounded-xl glass border border-primary/20">
                      <StepIcon className="text-primary-400" size={28} />
                    </div>
                    <h4 className="text-xl font-bold text-text-primary mb-2">
                      {step.title}
                    </h4>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-mesh">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <p className="text-text-secondary text-lg md:text-xl font-medium">
              مرخصة ومعتمدة من
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Landmark, label: 'هيئة السوق المالية' },
              { icon: Building2, label: 'البنك المركزي السعودي' },
              { icon: Building2, label: 'الهيئة العامة للعقار' },
              { icon: Shield, label: 'متوافق مع الشريعة الإسلامية' },
            ].map((badge, index) => (
              <div
                key={index}
                className="group relative stagger-item"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal rounded-2xl opacity-0 group-hover:opacity-10 blur transition-all duration-300" />
                <div className="relative glass rounded-2xl p-6 md:p-8 flex flex-col items-center text-center border border-primary/10 group-hover:border-primary/30 transition-all duration-300">
                  <div className="mb-4 p-3.5 rounded-xl glass border border-primary/20">
                    <badge.icon className="text-primary-400" size={28} />
                  </div>
                  <p className="text-text-primary font-semibold text-sm md:text-base">
                    {badge.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-32 px-4 md:px-6 bg-mesh relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 glass rounded-full border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-accent-pink animate-pulse" />
              <span className="text-sm text-text-secondary font-medium">قصص نجاح</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              ماذا يقول مستثمرونا؟
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="group relative stagger-item"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
                <div className="relative glass rounded-2xl p-8 border border-primary/10 group-hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-glow-sm">
                  <Quote className="text-primary-400 mb-4" size={32} />
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} size={18} className="text-accent-orange fill-current" />
                    ))}
                  </div>
                  <p className="text-text-secondary mb-6 text-right leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center justify-end gap-3">
                    <div>
                      <p className="text-text-primary font-bold text-sm">{testimonial.name}</p>
                      <p className="text-text-muted text-xs">{testimonial.title}</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-br from-accent-purple to-primary-500 rounded-full blur-md opacity-50" />
                      <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-accent-purple to-primary-500 flex items-center justify-center shadow-glow-sm">
                        <span className="text-white font-bold text-sm">{testimonial.initials}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-4 md:px-6 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
        }}
        />
        
        {/* Enhanced Overlay with better contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/98 via-background-secondary/95 to-background-tertiary/98" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/40 via-primary-500/30 to-accent-teal/40" />

        <div className="max-w-3xl mx-auto text-center relative z-10 animate-fade-in-scale">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            ابدأ رحلتك الاستثمارية اليوم
          </h2>
          <p className="text-lg md:text-xl text-white mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            انضم إلى أكثر من ٤٥,٠٠٠ مستثمر يثقون بنا
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <button className="group relative px-8 py-4 rounded-xl bg-white text-primary-600 font-bold hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105">
                <span className="relative z-10">إنشاء حساب مجاني</span>
              </button>
            </Link>
            <button className="px-8 py-4 rounded-xl border-2 border-white text-white font-bold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              تحدث مع مستشار
            </button>
          </div>

          <p className="text-sm text-white mt-6 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            التسجيل مجاني ولا يتطلب أي التزام
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass border-t-2 border-primary/30 py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent-purple to-primary-500 rounded-xl blur-md opacity-50" />
                  <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-primary-500 flex items-center justify-center">
                    <Building2 size={20} className="text-white" />
                  </div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-accent-purple to-primary-400 bg-clip-text text-transparent">
                  مشاريع
                </span>
              </div>
              <p className="text-text-muted text-sm leading-relaxed">
                منصة الاستثمار العقاري الرائدة في المملكة العربية السعودية.
              </p>
            </div>

            <div>
              <h4 className="text-text-primary font-bold mb-6">روابط سريعة</h4>
              <ul className="space-y-3">
                {['الرئيسية', 'المشاريع', 'من نحن', 'تواصل معنا'].map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-text-muted hover:text-primary-400 transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-text-primary font-bold mb-6">الدعم</h4>
              <ul className="space-y-3">
                {['مركز المساعدة', 'الأسئلة الشائعة', 'الشروط والأحكام', 'سياسة الخصوصية'].map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-text-muted hover:text-primary-400 transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-text-primary font-bold mb-6">تواصل معنا</h4>
              <div className="space-y-4 text-sm text-text-muted">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20">
                    <Phone size={16} className="text-primary-400" />
                  </div>
                  <p>٩٢٠٠١٢٣٤٥</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20">
                    <Mail size={16} className="text-primary-400" />
                  </div>
                  <p>info@masharee.sa</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-primary/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-text-muted text-sm">
                © ٢٠٢٦ مشاريع. جميع الحقوق محفوظة
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-4 py-2 glass rounded-full border border-primary/20 text-primary-400 text-xs font-semibold">
                  مرخصة من هيئة السوق المالية
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="group fixed bottom-8 left-8 z-40 animate-fade-in-scale"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-accent-purple to-primary-500 rounded-full blur-md opacity-50 group-hover:opacity-70 transition-all duration-300" />
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-accent-purple to-primary-500 text-white flex items-center justify-center hover:shadow-glow-md transition-all duration-300 hover:scale-110">
            <ArrowUp size={24} />
          </div>
        </button>
      )}
    </main>
  );
}
