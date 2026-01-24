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
      <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4b94c] to-[#c9a227]">
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
      جديد: 'bg-green-500/20 text-green-300 border border-green-500/50',
      مميز: 'bg-orange-500/20 text-orange-300 border border-orange-500/50',
      حصري: 'bg-purple-500/20 text-purple-300 border border-purple-500/50',
      'عوائد دورية': 'bg-blue-500/20 text-blue-300 border border-blue-500/50',
      'متوافق مع الشريعة': 'bg-[#c9a227]/20 text-[#d4b94c] border border-[#c9a227]/50',
    };
    return styles[badgeType] || 'bg-[#c9a227]/20 text-[#d4b94c] border border-[#c9a227]/50';
  };

  return (
    <Link href={`/projects/${project.id}`}>
      <div
        className="group rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
        style={{
          background: 'rgba(92, 77, 58, 0.15)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Image Container */}
        <div className="relative h-48 md:h-56 overflow-hidden rounded-t-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 right-4 flex gap-2 flex-wrap">
            {project.badges?.map((badge: string, index: number) => (
              <span
                key={index}
                className={`text-xs font-bold px-2 py-1 rounded-full ${getBadgeStyle(badge)}`}
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Type Badge */}
          <div className="absolute bottom-4 right-4 bg-[#1a1a1a]/90 px-3 py-1 rounded-full">
            <p className="text-[#d4b94c] text-xs font-bold">{project.type}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          <h3 className="text-lg md:text-xl font-bold text-[#f5f0e8] mb-2 text-right line-clamp-2">
            {project.title}
          </h3>

          <div className="flex items-center justify-end gap-2 mb-4 text-[#b0a090]">
            <MapPin size={16} />
            <span className="text-sm">{project.location}</span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-[#8b7355]/30">
            <div className="text-right">
              <p className="text-[#b0a090] text-xs mb-1">العائد المتوقع</p>
              <p className="text-[#d4b94c] font-bold text-sm">{project.expectedReturn}٪</p>
            </div>
            <div className="text-right">
              <p className="text-[#b0a090] text-xs mb-1">مدة الاستثمار</p>
              <p className="text-[#d4b94c] font-bold text-sm">{project.durationMonths} شهر</p>
            </div>
            <div className="text-right">
              <p className="text-[#b0a090] text-xs mb-1">الحد الأدنى</p>
              <p className="text-[#d4b94c] font-bold text-sm">{toArabicNumeral(project.minimumAmount)} <RiyalSymbol size={14} /></p>
            </div>
            <div className="text-right">
              <p className="text-[#b0a090] text-xs mb-1">المخاطر</p>
              <p className="text-[#d4b94c] font-bold text-sm">{project.riskLevel}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#b0a090] text-xs">النسبة المكتملة</span>
              <span className="text-[#d4b94c] font-bold text-xs">{toArabicNumeral(Math.round(progress))}٪</span>
            </div>
            <div className="w-full h-2 bg-[#5c4d3a] rounded-full overflow-hidden border border-[#8b7355]/50">
              <div
                className="h-full bg-gradient-to-r from-[#c9a227] to-[#d4b94c] rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[#b0a090] text-xs mt-2 text-right">
              {new Intl.NumberFormat('ar-SA').format(project.fundedAmount)} من {new Intl.NumberFormat('ar-SA').format(project.targetAmount)} <RiyalSymbol size={12} />
            </p>
          </div>

          {/* CTA Button */}
          <button className="w-full py-2 rounded-lg bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-[#1a1a1a] font-bold text-sm hover:shadow-lg hover:shadow-[#c9a227]/50 hover:scale-105 transition-all duration-300">
            تفاصيل الفرصة
          </button>
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
    <main dir="rtl" className="bg-[#1a1a1a] text-[#f5f0e8] overflow-hidden font-tajawal">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsBar />

      {/* Investment Opportunities Section */}
      <section className="py-16 md:py-32 px-4 md:px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 noise-overlay"
          style={{
            background: 'linear-gradient(180deg, #1a1a1a 0%, #5c4d3a 50%, #1a1a1a 100%)',
          }}
        />

        <div className="absolute top-20 right-0 w-96 h-96 bg-[#c9a227]/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#d4b94c]/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-[#d4b94c] text-sm md:text-base font-bold tracking-widest mb-4 uppercase">
              استثمر بثقة
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-[#f5f0e8] mb-4">
              الفرص الاستثمارية المتاحة
            </h2>
            <p className="text-[#b0a090] max-w-2xl mx-auto text-base md:text-lg">
              اختر من بين مجموعة متنوعة من الفرص الاستثمارية المدروسة بعناية والمتوافقة مع الشريعة الإسلامية
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16">
            {['الكل', 'صندوق عقاري', 'صكوك', 'تمويل جماعي', 'مساهمة عقارية'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-[#1a1a1a] shadow-lg shadow-[#c9a227]/50'
                    : 'border border-[#c9a227]/50 text-[#d4b94c] hover:border-[#c9a227] hover:bg-[#c9a227]/10'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4b94c] mx-auto" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
                {projects
                  .filter((project: any) => activeFilter === 'الكل' || project.type === activeFilter)
                  .slice(0, 6)
                  .map((project: any) => (
                    <InvestmentOpportunityCard key={project.id} project={project} />
                  ))}
              </div>

              <div className="flex justify-center">
                <Link href="/projects">
                  <button className="px-8 md:px-12 py-3 md:py-4 rounded-xl border-2 border-[#c9a227] text-[#d4b94c] font-bold text-base md:text-lg hover:bg-[#c9a227]/10 hover:shadow-lg hover:shadow-[#c9a227]/50 transition-all duration-300 flex items-center gap-3">
                    <span>عرض جميع الفرص</span>
                    <ArrowLeft size={20} />
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-32 px-4 md:px-6 bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a227]/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d4b94c]/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-[#d4b94c] text-sm md:text-base font-bold tracking-widest mb-4 uppercase">
              حلول استثمارية متكاملة
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-[#f5f0e8] mb-4">
              خدماتنا المالية
            </h2>
            <p className="text-[#b0a090] max-w-2xl mx-auto text-base md:text-lg">
              نقدم لك مجموعة شاملة من الخدمات الاستثمارية المتوافقة مع الشريعة الإسلامية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className="group rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 115, 85, 0.2) 0%, rgba(92, 77, 58, 0.15) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(201, 162, 39, 0.2)',
                  }}
                >
                  <div className="p-8 md:p-6 flex flex-col h-full">
                    <div className="mb-6 p-4 rounded-full bg-gradient-to-br from-[#c9a227]/20 to-[#d4b94c]/20 w-fit">
                      <IconComponent className="text-[#d4b94c]" size={32} />
                    </div>
                    <h3 className="text-2xl md:text-xl font-bold text-[#f5f0e8] mb-3">
                      {service.title}
                    </h3>
                    <p className="text-[#b0a090] text-sm md:text-base mb-6 flex-grow">
                      {service.description}
                    </p>
                    <div className="mb-8 space-y-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle size={18} className="text-[#d4b94c] mt-0.5 flex-shrink-0" />
                          <span className="text-[#b0a090] text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <button className="w-full py-3 rounded-lg bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-[#1a1a1a] font-bold hover:shadow-lg hover:shadow-[#c9a227]/50 transition-all duration-300">
                      {service.buttonText}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-32 px-4 md:px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 noise-overlay"
          style={{
            background: 'linear-gradient(180deg, #2a2a2a 0%, #5c4d3a 50%, #2a2a2a 100%)',
          }}
        />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#d4b94c] text-sm md:text-base font-bold tracking-widest mb-4 uppercase">
              مميزاتنا التنافسية
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-[#f5f0e8] mb-4">
              لماذا تختار مشاريع؟
            </h2>
            <p className="text-[#b0a090] max-w-2xl mx-auto text-base md:text-lg">
              جمعنا لك أفضل المميزات من منصات الاستثمار الرائدة في مكان واحد
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="rounded-xl p-6 transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'rgba(92, 77, 58, 0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(201, 162, 39, 0.15)',
                  }}
                >
                  <div className="mb-4 p-2 rounded-lg bg-gradient-to-br from-[#c9a227]/20 to-[#d4b94c]/20 w-fit">
                    <IconComponent className="text-[#d4b94c]" size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-[#f5f0e8] mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-[#b0a090] text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-32 px-4 md:px-6 bg-[#1a1a1a] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#d4b94c] text-sm md:text-base font-bold tracking-widest mb-4 uppercase">
              خطوات بسيطة
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-[#f5f0e8] mb-4">
              كيف تبدأ الاستثمار؟
            </h2>
            <p className="text-[#b0a090] max-w-2xl mx-auto text-base md:text-lg">
              ٤ خطوات سهلة تفصلك عن تحقيق أهدافك المالية
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-20 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent -z-10" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: '١', title: 'أنشئ حسابك', description: 'سجل في أقل من دقيقة عبر النفاذ الوطني الموحد', icon: UserPlus },
                { number: '٢', title: 'اشحن محفظتك', description: 'أضف رصيد عبر التحويل البنكي أو Apple Pay أو مدى', icon: WalletIcon },
                { number: '٣', title: 'اختر فرصتك', description: 'تصفح الفرص واختر ما يناسب أهدافك ومستوى المخاطرة', icon: Search },
                { number: '٤', title: 'احصد الأرباح', description: 'تابع استثمارك واستلم أرباحك بشكل دوري في محفظتك', icon: TrendingUp },
              ].map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <div key={idx} className="flex flex-col items-center text-center">
                    <div className="mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-[#c9a227] to-[#d4b94c] flex items-center justify-center">
                      <span className="text-[#1a1a1a] text-4xl font-black">
                        {step.number}
                      </span>
                    </div>
                    <div className="mb-4 p-3 rounded-full bg-[#5c4d3a]/50">
                      <StepIcon className="text-[#d4b94c]" size={28} />
                    </div>
                    <h4 className="text-xl font-bold text-[#f5f0e8] mb-2">
                      {step.title}
                    </h4>
                    <p className="text-[#b0a090] text-sm">
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
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#b0a090] text-lg md:text-xl font-medium">
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
                className="rounded-2xl p-6 md:p-8 flex flex-col items-center text-center hover:border-[#c9a227]/60 transition-all duration-300"
                style={{
                  background: 'rgba(92, 77, 58, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(201, 162, 39, 0.2)',
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

      {/* Testimonials Section */}
      <section className="py-16 md:py-32 px-4 md:px-6 bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a227]/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#d4b94c] text-sm md:text-base font-bold tracking-widest mb-4 uppercase">
              قصص نجاح
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-[#f5f0e8] mb-4">
              ماذا يقول مستثمرونا؟
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2"
                style={{
                  background: 'rgba(92, 77, 58, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(201, 162, 39, 0.15)',
                }}
              >
                <Quote className="text-[#c9a227] mb-4" size={32} />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={18} className="text-[#d4b94c] fill-current" />
                  ))}
                </div>
                <p className="text-[#f5f0e8] mb-6 text-right leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center justify-end gap-3">
                  <div>
                    <p className="text-[#f5f0e8] font-bold text-sm">{testimonial.name}</p>
                    <p className="text-[#b0a090] text-xs">{testimonial.title}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a227] to-[#d4b94c] flex items-center justify-center">
                    <span className="text-[#1a1a1a] font-bold text-sm">{testimonial.initials}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 md:py-32 px-4 md:px-6 relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(201, 162, 39, 0.9) 0%, rgba(212, 185, 76, 0.85) 100%)',
          }}
        />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-4">
            ابدأ رحلتك الاستثمارية اليوم
          </h2>
          <p className="text-lg md:text-xl text-[#1a1a1a]/90 mb-10">
            انضم إلى أكثر من ٤٥,٠٠٠ مستثمر يثقون بنا
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <button className="px-8 py-4 rounded-lg bg-[#1a1a1a] text-[#d4b94c] font-bold hover:bg-[#0a0a0a] transition-all duration-300">
                إنشاء حساب مجاني
              </button>
            </Link>
            <button className="px-8 py-4 rounded-lg border-2 border-[#1a1a1a] text-[#1a1a1a] font-bold hover:bg-[#1a1a1a]/10 transition-all duration-300">
              تحدث مع مستشار
            </button>
          </div>

          <p className="text-sm text-[#1a1a1a]/70 mt-6">
            التسجيل مجاني ولا يتطلب أي التزام
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] border-t border-[#8b7355]/30 py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4b94c] to-[#c9a227] flex items-center justify-center">
                  <Building2 size={20} className="text-[#1a1a1a]" />
                </div>
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4b94c] to-[#c9a227]">
                  مشاريع
                </span>
              </div>
              <p className="text-[#b0a090] text-sm leading-relaxed mb-6">
                منصة الاستثمار العقاري الرائدة في المملكة العربية السعودية.
              </p>
            </div>

            <div>
              <h4 className="text-[#f5f0e8] font-bold mb-6">روابط سريعة</h4>
              <ul className="space-y-3">
                {['الرئيسية', 'المشاريع', 'من نحن', 'تواصل معنا'].map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-[#b0a090] hover:text-[#d4b94c] transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[#f5f0e8] font-bold mb-6">الدعم</h4>
              <ul className="space-y-3">
                {['مركز المساعدة', 'الأسئلة الشائعة', 'الشروط والأحكام', 'سياسة الخصوصية'].map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-[#b0a090] hover:text-[#d4b94c] transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[#f5f0e8] font-bold mb-6">تواصل معنا</h4>
              <div className="space-y-4 text-sm text-[#b0a090]">
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-[#d4b94c] flex-shrink-0" />
                  <p>٩٢٠٠١٢٣٤٥</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-[#d4b94c] flex-shrink-0" />
                  <p>info@masharee.sa</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#8b7355]/30 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-[#b0a090] text-sm">
                © ٢٠٢٦ مشاريع. جميع الحقوق محفوظة
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-[#b0a090] text-xs">
                <span className="px-3 py-1 rounded-full bg-[#5c4d3a]/50 border border-[#8b7355]/50">
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
          className="fixed bottom-8 left-8 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a227] to-[#d4b94c] text-[#1a1a1a] flex items-center justify-center hover:shadow-lg hover:shadow-[#c9a227]/50 transition-all duration-300 hover:scale-110"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </main>
  );
}
