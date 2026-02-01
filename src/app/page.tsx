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
      <div className="text-3xl md:text-4xl font-bold text-primary">
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
      جديد: 'bg-primary/10 text-primary border border-primary/30',
      مميز: 'bg-primary/10 text-primary border border-primary/30',
      حصري: 'bg-primary/10 text-primary border border-primary/30',
      'عوائد دورية': 'bg-primary/10 text-primary border border-primary/30',
      'متوافق مع الشريعة': 'bg-primary/10 text-primary border border-primary/30',
    };
    return styles[badgeType] || 'bg-primary-500/10 text-primary-400 border border-primary/30';
  };

  return (
    <Link href={`/projects/${project.id}`}>
      <div className="group relative h-full">
        {/* Enhanced Glow effect */}
        <div className="absolute -inset-1 bg-primary rounded-2xl opacity-0 group-hover:opacity-40 blur-2xl transition-all duration-700" />
        
        {/* Main card */}
        <div className="relative h-full bg-background-secondary rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer group-hover:-translate-y-3 group-hover:scale-[1.02] group-hover:shadow-card-hover border-2 border-primary/70 group-hover:border-primary shadow-card">
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
            <h3 className="text-lg font-bold text-white line-clamp-2 transition-all duration-300">
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
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-primary/20">
            <div className="bg-background-tertiary rounded-xl p-3 border-2 border-primary/60 shadow-input">
              <p className="text-xs text-text-muted mb-1">العائد المتوقع</p>
              <p className="text-base font-bold text-primary drop-shadow-lg">{project.expectedReturn}٪</p>
            </div>
            <div className="bg-background-tertiary rounded-xl p-3 border-2 border-primary/60 shadow-input">
              <p className="text-xs text-text-muted mb-1">مدة الاستثمار</p>
              <p className="text-base font-bold text-white drop-shadow-lg">{project.durationMonths} شهر</p>
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
              <div className="relative w-full h-2.5 bg-background-tertiary rounded-full overflow-hidden border-2 border-primary/50 shadow-input">
                <div
                  className="absolute inset-0 bg-primary rounded-full transition-all duration-1000 shadow-glow-sm"
                  style={{ width: `${progress}%` }}
                />
              </div>
            <p className="text-xs text-text-muted mt-2 flex items-center justify-end gap-1">
              {new Intl.NumberFormat('ar-SA').format(project.fundedAmount)} من {new Intl.NumberFormat('ar-SA').format(project.targetAmount)} <RiyalSymbol size={12} className="text-primary-400" />
            </p>
          </div>

          {/* CTA Button */}
          <button className="w-full relative py-3.5 px-4 rounded-xl font-bold text-sm overflow-hidden transition-all duration-300 group-hover:shadow-glow-gold group-hover:scale-[1.02] mt-4" style={{ backgroundColor: '#8F7F5E', color: '#0A0A0A' }}>
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>تفاصيل الفرصة</span>
              <TrendingUp size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
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
      description: 'استثمر في صناديق عقارية متنوعة بإدارة احترافية مرخصة، واحصل على عوائد دورية مع شفافية كاملة في جميع العمليات.',
      features: [
        'عوائد سنوية مجزية تصل إلى ٢٥٪',
        'إدارة من شركات معتمدة',
        'تقارير شفافة كل ربع سنة',
        'تنويع محفظتك وتقليل المخاطر',
      ],
      buttonText: 'تصفح الصناديق المتاحة',
    },
    {
      id: 2,
      icon: FileText,
      title: 'الصكوك الاستثمارية',
      description: 'أدوات تمويل إسلامية مضمونة تتيح لك المشاركة في مشاريع عقارية كبرى مع عوائد ثابتة ومجدولة.',
      features: [
        'تمويل مشاريع بقيمة تصل ٣٠ مليون ريال',
        'فترات استثمار مرنة حتى ١٠ سنوات',
        'عوائد ثابتة ومضمونة',
        'إمكانية الخروج المبكر بسهولة',
      ],
      buttonText: 'اطلع على الصكوك المتاحة',
    },
    {
      id: 3,
      icon: Users,
      title: 'التمويل الجماعي',
      description: 'انضم لآلاف المستثمرين في دعم مشاريع عقارية واعدة بمبالغ صغيرة، وكن شريكاً في النجاح.',
      features: [
        'ابدأ بـ ٥٠٠ ريال فقط',
        'مشاريع محددة ومدروسة بدقة',
        'تتبع استثمارك بشكل فوري',
        'سحب أرباحك متى شئت',
      ],
      buttonText: 'استثمر الآن',
    },
  ];

  const features = [
    { id: 1, icon: Clock, title: 'ابدأ بسرعة', description: 'افتح حسابك واستثمر في دقائق معدودة بدون تعقيدات' },
    { id: 2, icon: WalletIcon, title: 'استثمر من ٥٠٠ ريال', description: 'ابدأ باستثمارات صغيرة تناسب جميع الميزانيات' },
    { id: 3, icon: TrendingUp, title: 'عوائد مجزية تصل ٢٥٪', description: 'عوائد سنوية مرتفعة من مشاريع مدروسة بعناية' },
    { id: 4, icon: Shield, title: 'متوافق مع الشريعة', description: 'جميع المشاريع معتمدة من هيئة رقابة شرعية مستقلة' },
    { id: 5, icon: PieChart, title: 'محفظة استثمارية واحدة', description: 'أدر جميع استثماراتك من مكان واحد بكل سهولة' },
    { id: 6, icon: DollarSign, title: 'سيولة عالية', description: 'اسحب أرباحك أو أعد استثمارها متى شئت بكل مرونة' },
    { id: 7, icon: FileText, title: 'شفافية كاملة', description: 'تقارير تفصيلية دورية عن أداء استثماراتك' },
    { id: 8, icon: Headphones, title: 'دعم فني متميز', description: 'فريق متخصص جاهز لمساعدتك في أي استفسار' },
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
      quote: 'كرجل أعمال، كنت أبحث عن تمويل سريع لمشروعي. منصة صخر وفرت لي التمويل خلال أسبوع فقط! عملية سلسة ومهنية من البداية للنهاية.',
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
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-background-secondary rounded-full border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-secondary font-medium">فرص استثمارية مميزة</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              اكتشف فرصتك الاستثمارية
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto text-base md:text-lg">
              مشاريع عقارية متنوعة تم دراستها بعناية من قبل خبراء متخصصين، مع ضمان التوافق الكامل مع الشريعة الإسلامية
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
                    ? 'bg-primary text-background shadow-glow-gold'
                    : 'bg-background-secondary text-secondary hover:text-white border border-primary/20 hover:border-primary/40'
                }`}
              >
                <span className="relative z-10">{filter}</span>
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
                  <button className="group relative px-10 md:px-12 py-4 bg-background-secondary border-2 border-primary/40 text-white font-bold text-base md:text-lg rounded-xl hover:border-primary hover:bg-primary/10 transition-all duration-300 flex items-center gap-3">
                    <span className="relative z-10">عرض جميع الفرص</span>
                    <ArrowLeft size={20} className="relative z-10 group-hover:-translate-x-1 transition-transform" />
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
                <div className="absolute -inset-0.5 bg-primary rounded-2xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500" />
                <div className="relative glass rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-card-hover border-2 border-primary/70 group-hover:border-primary shadow-card">
                  <div className="p-8 flex flex-col h-full">
                  <div className="mb-6 p-4 rounded-xl glass border-2 border-primary/60 w-fit shadow-input">
                    <IconComponent className="text-primary-400 drop-shadow-lg" size={32} />
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
                          <CheckCircle size={18} className="text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-text-secondary text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <button className="group relative w-full py-3.5 rounded-xl font-bold overflow-hidden transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#8F7F5E', color: '#0A0A0A', boxShadow: '0 0 35px rgba(143, 127, 94, 0.4)' }}>
                      <span className="relative z-10">{service.buttonText}</span>
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
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-text-secondary font-medium">مميزاتنا التنافسية</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              لماذا تستثمر معنا؟
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto text-base md:text-lg">
              نوفر لك تجربة استثمارية متكاملة تجمع بين السهولة والأمان والشفافية
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
                  <div className="absolute -inset-0.5 bg-primary rounded-xl opacity-0 group-hover:opacity-10 blur transition-all duration-300" />
                  <div className="relative glass rounded-xl p-6 border-2 border-primary/70 group-hover:border-primary transition-all duration-300 hover:shadow-card shadow-input">
                    <div className="mb-4 p-2.5 rounded-xl glass border-2 border-primary/60 w-fit shadow-input">
                      <IconComponent className="text-primary-400 drop-shadow-lg" size={24} />
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
                      <div className="absolute -inset-2 bg-primary rounded-full blur-xl opacity-30" />
                      <div className="relative w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-glow-gold">
                        <span className="text-background text-4xl font-black">
                          {step.number}
                        </span>
                      </div>
                    </div>
                    <div className="mb-4 p-3.5 rounded-xl glass border-2 border-primary/60 shadow-input">
                      <StepIcon className="text-primary-400 drop-shadow-lg" size={28} />
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
                <div className="absolute -inset-0.5 bg-primary rounded-2xl opacity-0 group-hover:opacity-10 blur transition-all duration-300" />
                <div className="relative bg-background-secondary rounded-2xl p-6 md:p-8 flex flex-col items-center text-center border-2 border-primary/70 group-hover:border-primary transition-all duration-300 shadow-card hover:shadow-card-hover">
                  <div className="mb-4 p-3.5 rounded-xl bg-background-tertiary border-2 border-primary/60 shadow-input">
                    <badge.icon className="text-primary drop-shadow-lg" size={28} />
                  </div>
                  <p className="text-white font-semibold text-sm md:text-base">
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
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
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
                <div className="absolute -inset-0.5 bg-primary rounded-2xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500" />
                <div className="relative bg-background-secondary rounded-2xl p-8 border-2 border-primary/70 group-hover:border-primary transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover shadow-card">
                  <Quote className="text-primary mb-4" size={32} />
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} size={18} className="text-primary fill-current" />
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
                      <div className="absolute -inset-1 bg-primary rounded-full blur-md opacity-40" />
                      <div className="relative w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-glow-gold">
                        <span className="text-background font-bold text-sm">{testimonial.initials}</span>
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
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80)',
          }}
        />
        
        {/* Modern Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background-secondary/90 to-background/95" />

        <div className="max-w-3xl mx-auto text-center relative z-10 animate-fade-in-scale">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-2xl">
            ابدأ رحلتك الاستثمارية اليوم
          </h2>
          <p className="text-lg md:text-xl text-white mb-10 drop-shadow-lg font-semibold">
            انضم إلى أكثر من ٤٥,٠٠٠ مستثمر يثقون بنا
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <button className="group relative px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#8F7F5E', color: '#0A0A0A', boxShadow: '0 0 35px rgba(143, 127, 94, 0.4)' }}>
                <span className="relative z-10">إنشاء حساب مجاني</span>
              </button>
            </Link>
            <button className="px-8 py-4 rounded-xl border-2 border-primary text-white font-bold hover:bg-primary/10 transition-all duration-300">
              تحدث مع مستشار
            </button>
          </div>

          <p className="text-sm text-white/80 mt-6 font-medium">
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
                  <div className="absolute -inset-1 bg-primary rounded-xl blur-md opacity-40" />
                  <div className="relative w-16 h-16">
                    <img src="/logo-icon.png" alt="صخر" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
              <p className="text-text-muted text-sm leading-relaxed">
                منصة الاستثمار العقاري الرائدة في المملكة العربية السعودية.
              </p>
            </div>

            <div>
              <h4 className="text-text-primary font-bold mb-6">روابط سريعة</h4>
              <ul className="space-y-3">
                {['المشاريع', 'من نحن', 'تواصل معنا'].map((link, idx) => (
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
                © ٢٠٢٦ صخر. جميع الحقوق محفوظة
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
          <div className="absolute -inset-1 bg-primary rounded-full blur-md opacity-40 group-hover:opacity-60 transition-all duration-300" />
          <div className="relative w-14 h-14 rounded-full bg-primary text-background flex items-center justify-center hover:shadow-glow-gold transition-all duration-300 hover:scale-110">
            <ArrowUp size={24} />
          </div>
        </button>
      )}
    </main>
  );
}
