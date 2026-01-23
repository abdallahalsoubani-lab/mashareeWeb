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
  Wallet as WalletIcon,
  PieChart,
  ArrowUpRight,
  ArrowLeft,
  FileText,
  Headphones,
  UserPlus,
  Search,
  CheckCircle,
  Zap,
  Star,
  Eye,
  EyeOff,
  ArrowUp,
  Phone,
  Mail,
  MapPinIcon,
  Quote,
  LogOut,
  Settings,
} from 'lucide-react';
import InvestmentDetail from './InvestmentDetail';
import Wallet from './Wallet';
import { api } from './api/client';

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

// Investment Opportunity Card Component
const InvestmentOpportunityCard = ({ opportunity, onInvestClick }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => setProgress(opportunity.progress), 300);
  }, [opportunity.progress]);

  // Badge color mapping
  const getBadgeStyle = (badgeType) => {
    const styles = {
      جديد: 'bg-green-500/20 text-green-300 border border-green-500/50',
      مميز: 'bg-orange-500/20 text-orange-300 border border-orange-500/50',
      حصري: 'bg-purple-500/20 text-purple-300 border border-purple-500/50',
      'عوائد دورية': 'bg-blue-500/20 text-blue-300 border border-blue-500/50',
      'متوافق مع الشريعة': 'bg-[#c9a227]/20 text-[#d4b94c] border border-[#c9a227]/50',
      'فندقي': 'bg-[#c9a227]/20 text-[#d4b94c] border border-[#c9a227]/50',
    };
    return styles[badgeType] || 'bg-[#c9a227]/20 text-[#d4b94c] border border-[#c9a227]/50';
  };

  return (
    <div
      className="group rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
      style={{
        background: 'rgba(92, 77, 58, 0.15)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Image Container */}
      <div className="relative h-48 md:h-56 overflow-hidden rounded-t-2xl">
        <img
          src={opportunity.image}
          alt={opportunity.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 right-4 flex gap-2 flex-wrap">
          {opportunity.badges.map((badge, index) => (
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
          <p className="text-[#d4b94c] text-xs font-bold">{opportunity.type}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-[#f5f0e8] mb-2 text-right line-clamp-2">
          {opportunity.title}
        </h3>

        {/* Location */}
        <div className="flex items-center justify-end gap-2 mb-4 text-[#b0a090]">
          <MapPin size={16} />
          <span className="text-sm">{opportunity.location}</span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-[#8b7355]/30">
          <div className="text-right">
            <p className="text-[#b0a090] text-xs mb-1">العائد المتوقع</p>
            <p className="text-[#d4b94c] font-bold text-sm">{opportunity.expectedReturn}٪</p>
          </div>
          <div className="text-right">
            <p className="text-[#b0a090] text-xs mb-1">مدة الاستثمار</p>
            <p className="text-[#d4b94c] font-bold text-sm">{opportunity.duration}</p>
          </div>
          <div className="text-right">
            <p className="text-[#b0a090] text-xs mb-1">الحد الأدنى</p>
            <p className="text-[#d4b94c] font-bold text-sm">{toArabicNumeral(opportunity.minimum)} ر.س</p>
          </div>
          <div className="text-right">
            <p className="text-[#b0a090] text-xs mb-1">المخاطر</p>
            <p className="text-[#d4b94c] font-bold text-sm">{opportunity.riskLevel}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#b0a090] text-xs">النسبة المكتملة</span>
            <span className="text-[#d4b94c] font-bold text-xs">{toArabicNumeral(progress)}٪</span>
          </div>
          <div className="w-full h-2 bg-[#5c4d3a] rounded-full overflow-hidden border border-[#8b7355]/50">
            <div
              className="h-full bg-gradient-to-r from-[#c9a227] to-[#d4b94c] rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[#b0a090] text-xs mt-2 text-right">
            {toArabicNumeral(opportunity.funded)} من {toArabicNumeral(opportunity.target)} ريال
          </p>
        </div>

        {/* Footer with Days Remaining */}
        <div className="flex items-center justify-between mb-4 text-[#c9a227]">
          <span className="flex items-center gap-1 text-xs">
            <Clock size={14} />
            {opportunity.daysRemaining}
          </span>
        </div>

        {/* CTA Button */}
        <button 
          onClick={() => onInvestClick && onInvestClick(opportunity)}
          className="w-full py-2 rounded-lg bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-[#1a1a1a] font-bold text-sm hover:shadow-lg hover:shadow-[#c9a227]/50 hover:scale-105 transition-all duration-300"
        >
          استثمر الآن
        </button>
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

// Services Data
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

// Why Choose Us Features
const features = [
  {
    id: 1,
    icon: Clock,
    title: 'موافقة خلال ٣ أيام',
    description: 'نقدم لك عرض تمويلي خلال ٣ أيام فقط من تقديم الطلب',
  },
  {
    id: 2,
    icon: WalletIcon,
    title: 'استثمر من ٥٠٠ ريال',
    description: 'ابدأ رحلتك الاستثمارية بمبلغ بسيط يناسب ميزانيتك',
  },
  {
    id: 3,
    icon: TrendingUp,
    title: 'عوائد تصل ٢٥٪',
    description: 'حقق عوائد استثنائية مع فرص مدروسة بعناية فائقة',
  },
  {
    id: 4,
    icon: Shield,
    title: '١٠٠٪ حلال',
    description: 'جميع استثماراتنا معتمدة من هيئة شرعية مستقلة',
  },
  {
    id: 5,
    icon: PieChart,
    title: 'كل استثماراتك في مكان واحد',
    description: 'تابع صناديقك وصكوكك وأسهمك من محفظة واحدة',
  },
  {
    id: 6,
    icon: ArrowUpRight,
    title: 'اسحب أرباحك في أي وقت',
    description: 'حرية كاملة في سحب أرباحك أو إعادة استثمارها',
  },
  {
    id: 7,
    icon: FileText,
    title: 'تحديثات دورية',
    description: 'احصل على تقارير مفصلة من مدراء الصناديق بشكل منتظم',
  },
  {
    id: 8,
    icon: Headphones,
    title: 'دعم على مدار الساعة',
    description: 'فريق دعم متخصص جاهز لمساعدتك في أي وقت',
  },
];

// Testimonials Data
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

// Partners Data
const partners = [
  { id: 1, name: 'هيئة السوق المالية' },
  { id: 2, name: 'البنك المركزي السعودي' },
  { id: 3, name: 'الهيئة العامة للعقار' },
  { id: 4, name: 'مركز الإيداع' },
  { id: 5, name: 'الامتثال الشرعي' },
];

// Payment Methods
const paymentMethods = [
  { id: 1, name: 'Apple Pay' },
  { id: 2, name: 'مدى' },
  { id: 3, name: 'فيزا' },
  { id: 4, name: 'ماستركارد' },
  { id: 5, name: 'تحويل بنكي' },
];

// Investment Opportunities Data
const investmentOpportunities = [
  {
    id: 1,
    type: 'صندوق عقاري',
    title: 'صندوق الرياض السكني الأول',
    location: 'الرياض - حي العليا',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    badges: ['جديد', 'متوافق مع الشريعة'],
    expectedReturn: 20,
    duration: '٣ سنوات',
    minimum: 1000,
    riskLevel: 'متوسطة',
    progress: 65,
    funded: '9750000',
    target: '15000000',
    daysRemaining: 'متبقي ١٨ يوم',
    category: 'صناعي',
  },
  {
    id: 2,
    type: 'صكوك',
    title: 'صكوك التعمير المتقدمة',
    location: 'جدة - الكورنيش',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    badges: ['مميز', 'متوافق مع الشريعة'],
    expectedReturn: 18,
    duration: '٥ سنوات',
    minimum: 5000,
    riskLevel: 'منخفضة',
    progress: 89,
    funded: '26700000',
    target: '30000000',
    daysRemaining: 'متبقي ٥ أيام',
    category: 'صكوك',
  },
  {
    id: 3,
    type: 'مساهمة عقارية',
    title: 'مساهمة فلل الدرعية',
    location: 'الرياض - الدرعية',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    badges: ['حصري'],
    expectedReturn: 25,
    duration: '٢ سنة',
    minimum: 10000,
    riskLevel: 'متوسطة',
    progress: 42,
    funded: '8400000',
    target: '20000000',
    daysRemaining: 'متبقي ٣٠ يوم',
    category: 'مساهمات عقارية',
  },
  {
    id: 4,
    type: 'تمويل جماعي',
    title: 'مجمع الأندلس التجاري',
    location: 'الدمام - الشاطئ الغربي',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80',
    badges: ['جديد'],
    expectedReturn: 15,
    duration: '١٨ شهر',
    minimum: 500,
    riskLevel: 'منخفضة',
    progress: 91,
    funded: '4550000',
    target: '5000000',
    daysRemaining: 'متبقي ٣ أيام',
    category: 'صناعي',
  },
  {
    id: 5,
    type: 'صندوق عقاري',
    title: 'صندوق المدينة المنورة',
    location: 'المدينة المنورة - طريق الملك عبدالله',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    badges: ['عوائد دورية'],
    expectedReturn: 17,
    duration: '٤ سنوات',
    minimum: 2000,
    riskLevel: 'منخفضة',
    progress: 55,
    funded: '11000000',
    target: '20000000',
    daysRemaining: 'متبقي ٢٥ يوم',
    category: 'صناعي',
  },
  {
    id: 6,
    type: 'صكوك',
    title: 'صكوك فندق البحر الأحمر',
    location: 'نيوم - منطقة تبوك',
    image: 'https://images.unsplash.com/photo-1464938050520-ef2571e6f5e8?w=800&q=80',
    badges: ['فندقي', 'متوافق مع الشريعة'],
    expectedReturn: 22,
    duration: '٦ سنوات',
    minimum: 10000,
    riskLevel: 'متوسطة-عالية',
    progress: 38,
    funded: '19000000',
    target: '50000000',
    daysRemaining: 'متبقي ٤٥ يوم',
    category: 'صكوك',
  },
];

// Main Masharee Component
export default function Masharee({ user, onLogout }) {
  // Projects State
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [apiError, setApiError] = useState('');

  // UI State
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [activeFilter, setActiveFilter] = useState('الكل');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Calculator State
  const [calcAmount, setCalcAmount] = useState(50000);
  const [calcDuration, setCalcDuration] = useState('٣ سنوات');
  const [calcType, setCalcType] = useState('صندوق عقاري');

  // Modal States
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  
  // Investment Detail State
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  
  // Wallet State
  const [showWallet, setShowWallet] = useState(false);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Register Form State
  const [registerName, setRegisterName] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Calculator returns mapping
  const returnRates = {
    'صندوق عقاري': 20,
    'صكوك': 18,
    'تمويل جماعي': 15,
  };

  // Calculate investment returns
  const calculateReturns = () => {
    const durationMap = { '١ سنة': 1, '٢ سنة': 2, '٣ سنوات': 3, '٥ سنوات': 5 };
    const rate = returnRates[calcType] || 18;
    const years = durationMap[calcDuration] || 3;
    const annualReturn = Math.floor((calcAmount * rate) / 100);
    const totalProfit = Math.floor(annualReturn * years);
    const finalValue = calcAmount + totalProfit;
    return { annualReturn, totalProfit, finalValue };
  };

  const { annualReturn, totalProfit, finalValue } = calculateReturns();

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoadingProjects(true);
        const response = await api.getProjects();
        setProjects(response.data);
        setApiError('');
      } catch (error) {
        console.error('Error fetching projects:', error);
        setApiError('خطأ في تحميل المشاريع');
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  // Scroll event handlers
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { label: 'الرئيسية', href: '#' },
    { label: 'الفرص الاستثمارية', href: '#' },
    { label: 'الصناديق العقارية', href: '#' },
    { label: 'الصكوك', href: '#' },
    // { label: 'التمويل', href: '#' },
    { label: 'المحفظة', href: '#' },
    { label: 'من نحن', href: '#' },
  ];

  // Handle Invest Now Click
  const handleInvestNow = (opportunity) => {
    setSelectedOpportunity(opportunity);
  };

  // Handle Wallet Click
  const handleWalletClick = () => {
    setShowWallet(true);
  };

  // If wallet is shown, show the wallet page
  if (showWallet) {
    return (
      <Wallet onBack={() => setShowWallet(false)} />
    );
  }

  // If an opportunity is selected, show the detail page
  if (selectedOpportunity) {
    return (
      <InvestmentDetail 
        opportunity={selectedOpportunity} 
        onBack={() => setSelectedOpportunity(null)}
      />
    );
  }

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
              <button
                key={index}
                onClick={item.label === 'المحفظة' ? handleWalletClick : undefined}
                href={item.href}
                className="text-[#b0a090] hover:text-[#d4b94c] transition-colors duration-300 text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Language Toggle */}
            <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#5c4d3a]/50 transition-colors duration-300 text-sm text-[#b0a090] hover:text-[#d4b94c]">
              <span>العربية</span>
              <ChevronDown size={16} />
            </button>

            {/* User Profile or Login/Register */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5c4d3a]/50 hover:bg-[#5c4d3a] transition-colors duration-300 text-sm text-[#b0a090] hover:text-[#d4b94c]"
                >
                  <UserPlus size={18} />
                  <span>{user.username || user.email}</span>
                  <ChevronDown size={16} />
                </button>

                {/* Profile Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-[#8b7355]/30 rounded-lg shadow-xl z-50">
                    <div className="p-4 border-b border-[#8b7355]/30">
                      <p className="text-[#d4b94c] font-semibold text-sm">{user.username || user.email}</p>
                      <p className="text-[#b0a090] text-xs mt-1">{user.role === 'admin' ? '👑 مسؤول' : '👤 مستثمر'}</p>
                    </div>
                    {user.isAdmin && (
                      <>
                        <button className="w-full text-right px-4 py-2 text-[#b0a090] hover:text-[#d4b94c] hover:bg-[#5c4d3a]/50 transition-colors flex items-center gap-2">
                          <Settings size={16} />
                          <span className="text-sm">إدارة المشاريع</span>
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => {
                        onLogout();
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-right px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors flex items-center gap-2 border-t border-[#8b7355]/30"
                    >
                      <LogOut size={16} />
                      <span className="text-sm">تسجيل الخروج</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Sign In */}
                <button onClick={() => setLoginModalOpen(true)} className="hidden sm:block px-4 py-2 rounded-lg border border-[#c9a227] text-[#d4b94c] hover:bg-[#c9a227]/10 transition-all duration-300 text-sm font-medium">
                  تسجيل دخول
                </button>

                {/* Sign Up */}
                <button onClick={() => setRegisterModalOpen(true)} className="hidden sm:block px-4 py-2 rounded-lg bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-[#1a1a1a] hover:shadow-lg hover:shadow-[#c9a227]/50 transition-all duration-300 font-bold text-sm">
                  إنشاء حساب
                </button>
              </>
            )}

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
                <button
                  key={index}
                  onClick={item.label === 'المحفظة' ? () => { handleWalletClick(); setMenuOpen(false); } : undefined}
                  href={item.href}
                  className="text-[#b0a090] hover:text-[#d4b94c] transition-colors duration-300 text-sm font-medium"
                >
                  {item.label}
                </button>
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

      {/* Investment Opportunities Section */}
      <section className="py-16 md:py-32 px-4 md:px-6 relative overflow-hidden">
        {/* Background Gradient */}
        <div
          className="absolute inset-0 -z-10 noise-overlay"
          style={{
            background: 'linear-gradient(180deg, #1a1a1a 0%, #5c4d3a 50%, #1a1a1a 100%)',
          }}
        />

        {/* Decorative Elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#c9a227]/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#d4b94c]/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
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
            {['الكل', 'صناديق عقارية', 'تجاري', 'صناعي', 'تمويل جماعي'].map((filter) => (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {investmentOpportunities
              .filter(
                (opp) =>
                  activeFilter === 'الكل' ||
                  opp.category === activeFilter
              )
              .map((opportunity) => (
                <div
                  key={opportunity.id}
                  className="animate-fade-in"
                  style={{
                    animation: 'fadeInUp 0.6s ease-out forwards',
                  }}
                >
                  <InvestmentOpportunityCard 
                    opportunity={opportunity} 
                    onInvestClick={handleInvestNow}
                  />
                </div>
              ))}
          </div>

          {/* View All Button */}
          <div className="flex justify-center">
            <button className="px-8 md:px-12 py-3 md:py-4 rounded-xl border-2 border-[#c9a227] text-[#d4b94c] font-bold text-base md:text-lg hover:bg-[#c9a227]/10 hover:shadow-lg hover:shadow-[#c9a227]/50 transition-all duration-300 flex items-center gap-3">
              <span>عرض جميع الفرص</span>
              <ArrowLeft size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-32 px-4 md:px-6 bg-[#1a1a1a] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a227]/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d4b94c]/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
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

          {/* Services Cards */}
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
                    {/* Icon */}
                    <div className="mb-6 p-4 rounded-full bg-gradient-to-br from-[#c9a227]/20 to-[#d4b94c]/20 w-fit">
                      <IconComponent className="text-[#d4b94c]" size={32} />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-xl font-bold text-[#f5f0e8] mb-3">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#b0a090] text-sm md:text-base mb-6 flex-grow">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="mb-8 space-y-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle size={18} className="text-[#d4b94c] mt-0.5 flex-shrink-0" />
                          <span className="text-[#b0a090] text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Button */}
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

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-32 px-4 md:px-6 relative overflow-hidden">
        {/* Background Gradient */}
        <div
          className="absolute inset-0 -z-10 noise-overlay"
          style={{
            background: 'linear-gradient(180deg, #2a2a2a 0%, #5c4d3a 50%, #2a2a2a 100%)',
          }}
        />

        {/* Decorative Elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#c9a227]/8 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#d4b94c]/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
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

          {/* Features Grid */}
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

      {/* How It Works Section */}
      <section className="py-16 md:py-32 px-4 md:px-6 bg-[#1a1a1a] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 -z-10 noise-overlay" style={{ background: 'linear-gradient(90deg, transparent, rgba(201, 162, 39, 0.05), transparent)' }} />

        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
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

          {/* Steps Timeline */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-20 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent -z-10" />

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  number: '١',
                  title: 'أنشئ حسابك',
                  description: 'سجل في أقل من دقيقة عبر النفاذ الوطني الموحد',
                  icon: UserPlus,
                },
                {
                  number: '٢',
                  title: 'اشحن محفظتك',
                  description: 'أضف رصيد عبر التحويل البنكي أو Apple Pay أو مدى',
                  icon: WalletIcon,
                },
                {
                  number: '٣',
                  title: 'اختر فرصتك',
                  description: 'تصفح الفرص واختر ما يناسب أهدافك ومستوى المخاطرة',
                  icon: Search,
                },
                {
                  number: '٤',
                  title: 'احصد الأرباح',
                  description: 'تابع استثمارك واستلم أرباحك بشكل دوري في محفظتك',
                  icon: TrendingUp,
                },
              ].map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <div key={idx} className="flex flex-col items-center text-center">
                    {/* Number Circle */}
                    <div className="mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-[#c9a227] to-[#d4b94c] flex items-center justify-center">
                      <span className="text-[#1a1a1a] text-4xl font-black">
                        {step.number}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="mb-4 p-3 rounded-full bg-[#5c4d3a]/50">
                      <StepIcon className="text-[#d4b94c]" size={28} />
                    </div>

                    {/* Title */}
                    <h4 className="text-xl font-bold text-[#f5f0e8] mb-2">
                      {step.title}
                    </h4>

                    {/* Description */}
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

      {/* Calculator Widget */}
      <section className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10" style={{ background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)' }} />

        <div className="max-w-4xl mx-auto">
          {/* Calculator Card */}
          <div
            className="rounded-3xl p-8 md:p-12 relative overflow-hidden border border-[#c9a227]/30"
            style={{
              background: 'rgba(92, 77, 58, 0.2)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Decorative Element */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#c9a227]/5 rounded-full blur-3xl -z-10" />

            {/* Header */}
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-black text-[#f5f0e8] mb-2">
                احسب عوائدك المتوقعة
              </h3>
              <p className="text-[#b0a090]">
                حسّن استثمارك باختيار المبلغ ومدة الاستثمار ونوع الفرصة
              </p>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Amount Slider */}
              <div>
                <label className="block text-[#d4b94c] font-bold mb-4">
                  مبلغ الاستثمار: {toArabicNumeral(Math.floor(calcAmount / 1000))} ألف ريال
                </label>
                <input
                  type="range"
                  min="1000"
                  max="1000000"
                  step="5000"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  className="w-full h-2 bg-[#5c4d3a] rounded-lg appearance-none cursor-pointer"
                  style={{
                    accentColor: '#c9a227',
                  }}
                />
                <div className="flex justify-between text-[#b0a090] text-xs mt-2">
                  <span>١ ألف</span>
                  <span>١ مليون</span>
                </div>
              </div>

              {/* Duration Dropdown */}
              <div>
                <label className="block text-[#d4b94c] font-bold mb-2">
                  مدة الاستثمار
                </label>
                <select
                  value={calcDuration}
                  onChange={(e) => setCalcDuration(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#5c4d3a] text-[#f5f0e8] border border-[#c9a227]/50 focus:border-[#d4b94c] outline-none text-right"
                >
                  <option>١ سنة</option>
                  <option>٢ سنة</option>
                  <option>٣ سنوات</option>
                  <option>٥ سنوات</option>
                </select>
              </div>

              {/* Type Dropdown */}
              <div>
                <label className="block text-[#d4b94c] font-bold mb-2">
                  نوع الاستثمار
                </label>
                <select
                  value={calcType}
                  onChange={(e) => setCalcType(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#5c4d3a] text-[#f5f0e8] border border-[#c9a227]/50 focus:border-[#d4b94c] outline-none text-right"
                >
                  <option>صندوق عقاري</option>
                  <option>صكوك</option>
                  <option>تمويل جماعي</option>
                </select>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 rounded-xl" style={{ background: 'rgba(201, 162, 39, 0.05)' }}>
              <div className="text-center">
                <p className="text-[#b0a090] text-sm mb-2">العائد السنوي المتوقع</p>
                <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4b94c] to-[#c9a227]">
                  {toArabicNumeral(Math.floor(annualReturn / 1000))} ألف ر.س
                </p>
              </div>
              <div className="text-center">
                <p className="text-[#b0a090] text-sm mb-2">إجمالي الأرباح</p>
                <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4b94c] to-[#c9a227]">
                  {toArabicNumeral(Math.floor(totalProfit / 1000))} ألف ر.س
                </p>
              </div>
              <div className="text-center">
                <p className="text-[#b0a090] text-sm mb-2">القيمة النهائية</p>
                <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4b94c] to-[#c9a227]">
                  {toArabicNumeral(Math.floor(finalValue / 1000))} ألف ر.س
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-[#1a1a1a] font-bold text-lg hover:shadow-2xl hover:shadow-[#c9a227]/50 hover:scale-105 transition-all duration-300">
              ابدأ الاستثمار الآن
            </button>
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

      {/* Testimonials Section */}
      <section className="py-16 md:py-32 px-4 md:px-6 bg-[#1a1a1a] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a227]/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d4b94c]/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-[#d4b94c] text-sm md:text-base font-bold tracking-widest mb-4 uppercase">
              قصص نجاح
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-[#f5f0e8] mb-4">
              ماذا يقول مستثمرونا؟
            </h2>
            <p className="text-[#b0a090] max-w-2xl mx-auto text-base md:text-lg">
              انضم إلى آلاف المستثمرين الذين حققوا أهدافهم المالية معنا
            </p>
          </div>

          {/* Testimonials Grid */}
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
                {/* Quote Icon */}
                <Quote className="text-[#c9a227] mb-4" size={32} />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={18} className="text-[#d4b94c] fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[#f5f0e8] mb-6 text-right leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
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

      {/* Statistics Banner */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-r from-[#c9a227] to-[#d4b94c] relative overflow-hidden">
        {/* Noise Pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
            {[
              { label: 'مستثمر سعيد', value: '١٢,٥٠٠+' },
              { label: 'نسبة رضا العملاء', value: '٩٨٪' },
              { label: 'مليار ريال استثمرت', value: '٢.٥+' },
              { label: 'مشروع مكتمل', value: '١٢٧' },
              { label: 'متوسط العائد السنوي', value: '٢٢٪' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-[#1a1a1a] font-bold text-lg md:text-2xl mb-2">
                  {stat.value}
                </p>
                <p className="text-[#1a1a1a]/80 text-sm md:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-black text-[#f5f0e8] mb-12 text-center">
            شركاؤنا ومعتمدونا
          </h3>

          {/* Partners Grid */}
          <div className="mb-16">
            <p className="text-[#b0a090] text-sm mb-6 text-center font-bold">
              التراخيص والمعتمديات
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="rounded-lg p-4 border border-[#c9a227]/50 text-center hover:border-[#c9a227] hover:bg-[#c9a227]/10 transition-all duration-300 cursor-pointer"
                >
                  <p className="text-[#b0a090] text-xs md:text-sm font-medium">
                    {partner.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="border-t border-[#8b7355]/30 pt-12">
            <p className="text-[#b0a090] text-sm mb-6 text-center font-bold">
              طرق الدفع المدعومة
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="rounded-lg p-4 border border-[#c9a227]/30 text-center hover:border-[#d4b94c] transition-all duration-300"
                >
                  <p className="text-[#d4b94c] text-xs md:text-sm font-medium">
                    {method.name}
                  </p>
                </div>
              ))}
            </div>
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
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(201, 162, 39, 0.9) 0%, rgba(212, 185, 76, 0.85) 100%)',
          }}
        />

        {/* Content */}
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-4">
            ابدأ رحلتك الاستثمارية اليوم
          </h2>
          <p className="text-lg md:text-xl text-[#1a1a1a]/90 mb-10">
            انضم إلى أكثر من ٤٥,٠٠٠ مستثمر يثقون بنا
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setRegisterModalOpen(true)} className="px-8 py-4 rounded-lg bg-[#1a1a1a] text-[#d4b94c] font-bold hover:bg-[#0a0a0a] transition-all duration-300">
              إنشاء حساب مجاني
            </button>
            <button className="px-8 py-4 rounded-lg border-2 border-[#1a1a1a] text-[#1a1a1a] font-bold hover:bg-[#1a1a1a]/10 transition-all duration-300">
              تحدث مع مستشار
            </button>
          </div>

          {/* Small text */}
          <p className="text-sm text-[#1a1a1a]/70 mt-6">
            التسجيل مجاني ولا يتطلب أي التزام
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] border-t border-[#8b7355]/30 py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
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
                منصة الاستثمار العقاري الرائدة في المملكة العربية السعودية. نجمع لك أفضل الفرص الاستثمارية المتوافقة مع الشريعة الإسلامية.
              </p>
              {/* Social Icons */}
              <div className="flex gap-3">
                {['Twitter', 'LinkedIn', 'Instagram', 'YouTube'].map((social, idx) => (
                  <div
                    key={idx}
                    className="w-10 h-10 rounded-lg bg-[#5c4d3a]/50 hover:bg-[#c9a227]/20 transition-colors cursor-pointer flex items-center justify-center"
                  >
                    <span className="text-[#d4b94c] text-xs font-bold">{social[0]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-[#f5f0e8] font-bold mb-6">روابط سريعة</h4>
              <ul className="space-y-3">
                {['الرئيسية', 'الفرص الاستثمارية', 'الصناديق العقارية', 'الصكوك', 'التمويل الجماعي', 'المحفظة'].map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-[#b0a090] hover:text-[#d4b94c] transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-[#f5f0e8] font-bold mb-6">الدعم</h4>
              <ul className="space-y-3">
                {['مركز المساعدة', 'الأسئلة الشائعة', 'تواصل معنا', 'الشكاوى والمقترحات', 'الشروط والأحكام', 'سياسة الخصوصية'].map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-[#b0a090] hover:text-[#d4b94c] transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[#f5f0e8] font-bold mb-6">تواصل معنا</h4>
              <div className="space-y-4 text-sm text-[#b0a090]">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#d4b94c] mt-0.5 flex-shrink-0" />
                  <p>الرياض، المملكة العربية السعودية<br/>طريق الملك فهد، برج المملكة</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-[#d4b94c] flex-shrink-0" />
                  <p>٩٢٠٠١٢٣٤٥</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-[#d4b94c] flex-shrink-0" />
                  <p>info@masharee.sa</p>
                </div>
              </div>
              <p className="text-xs text-[#b0a090] mt-4">
                ساعات العمل: الأحد - الخميس، ٩ص - ٦م
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#8b7355]/30 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-[#b0a090] text-sm">
                © ٢٠٢٦ مشاريع. جميع الحقوق محفوظة
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-[#b0a090] text-xs">
                <span className="px-3 py-1 rounded-full bg-[#5c4d3a]/50 border border-[#8b7355]/50">
                  مرخصة من هيئة السوق المالية
                </span>
                <span className="px-3 py-1 rounded-full bg-[#5c4d3a]/50 border border-[#8b7355]/50">
                  متوافق مع الشريعة الإسلامية
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {loginModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a]/95 rounded-2xl max-w-md w-full border border-[#c9a227]/30" style={{ backdropFilter: 'blur(10px)' }}>
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-[#8b7355]/30">
              <h2 className="text-2xl font-bold text-[#f5f0e8]">تسجيل الدخول</h2>
              <button onClick={() => setLoginModalOpen(false)} className="text-[#b0a090] hover:text-[#d4b94c] transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-[#d4b94c] text-sm font-bold mb-2">رقم الجوال أو البريد الإلكتروني</label>
                <input
                  type="text"
                  placeholder="example@masharee.sa"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#5c4d3a]/50 border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#b0a090]/50 focus:border-[#d4b94c] outline-none transition-colors text-right"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-[#d4b94c] text-sm font-bold mb-2">كلمة المرور</label>
                <div className="relative">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#5c4d3a]/50 border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#b0a090]/50 focus:border-[#d4b94c] outline-none transition-colors text-right"
                  />
                  <button
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute left-3 top-3 text-[#b0a090] hover:text-[#d4b94c]"
                  >
                    {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#c9a227]"
                />
                <span className="text-[#b0a090] text-sm">تذكرني</span>
              </label>

              {/* Forgot Password */}
              <div className="text-right">
                <a href="#" className="text-[#d4b94c] hover:text-[#f5f0e8] text-sm font-medium transition-colors">
                  نسيت كلمة المرور؟
                </a>
              </div>

              {/* Login Button */}
              <button className="w-full py-3 rounded-lg bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-[#1a1a1a] font-bold hover:shadow-lg hover:shadow-[#c9a227]/50 transition-all duration-300">
                تسجيل الدخول
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-[#8b7355]/30" />
                <span className="text-[#b0a090] text-xs">أو</span>
                <div className="flex-1 h-px bg-[#8b7355]/30" />
              </div>

              {/* SSO Button */}
              <button className="w-full py-3 rounded-lg border-2 border-[#c9a227]/50 text-[#d4b94c] font-bold hover:bg-[#c9a227]/10 transition-all duration-300">
                الدخول عبر النفاذ الوطني
              </button>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[#8b7355]/30 text-center">
              <span className="text-[#b0a090] text-sm">
                ليس لديك حساب؟{' '}
                <button
                  onClick={() => {
                    setLoginModalOpen(false);
                    setRegisterModalOpen(true);
                  }}
                  className="text-[#d4b94c] font-bold hover:text-[#f5f0e8] transition-colors"
                >
                  إنشاء حساب جديد
                </button>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {registerModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1a1a1a]/95 rounded-2xl max-w-md w-full border border-[#c9a227]/30 my-8" style={{ backdropFilter: 'blur(10px)' }}>
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-[#8b7355]/30">
              <h2 className="text-2xl font-bold text-[#f5f0e8]">إنشاء حساب جديد</h2>
              <button onClick={() => setRegisterModalOpen(false)} className="text-[#b0a090] hover:text-[#d4b94c] transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-[#d4b94c] text-sm font-bold mb-2">الاسم الكامل</label>
                <input
                  type="text"
                  placeholder="محمد أحمد علي"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#5c4d3a]/50 border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#b0a090]/50 focus:border-[#d4b94c] outline-none transition-colors text-right"
                />
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-[#d4b94c] text-sm font-bold mb-2">رقم الجوال</label>
                <input
                  type="tel"
                  placeholder="٠٥xxxxxxxxxx"
                  value={registerPhone}
                  onChange={(e) => setRegisterPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#5c4d3a]/50 border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#b0a090]/50 focus:border-[#d4b94c] outline-none transition-colors text-right"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-[#d4b94c] text-sm font-bold mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  placeholder="example@masharee.sa"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#5c4d3a]/50 border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#b0a090]/50 focus:border-[#d4b94c] outline-none transition-colors text-right"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-[#d4b94c] text-sm font-bold mb-2">كلمة المرور</label>
                <input
                  type={showRegisterPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#5c4d3a]/50 border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#b0a090]/50 focus:border-[#d4b94c] outline-none transition-colors text-right"
                />
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block text-[#d4b94c] text-sm font-bold mb-2">تأكيد كلمة المرور</label>
                <input
                  type={showRegisterPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#5c4d3a]/50 border border-[#c9a227]/30 text-[#f5f0e8] placeholder-[#b0a090]/50 focus:border-[#d4b94c] outline-none transition-colors text-right"
                />
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#c9a227] mt-1"
                />
                <span className="text-[#b0a090] text-xs leading-relaxed">
                  أوافق على الشروط والأحكام وسياسة الخصوصية
                </span>
              </label>

              {/* Register Button */}
              <button className="w-full py-3 rounded-lg bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-[#1a1a1a] font-bold hover:shadow-lg hover:shadow-[#c9a227]/50 transition-all duration-300">
                إنشاء حساب
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-[#8b7355]/30" />
                <span className="text-[#b0a090] text-xs">أو</span>
                <div className="flex-1 h-px bg-[#8b7355]/30" />
              </div>

              {/* SSO Button */}
              <button className="w-full py-3 rounded-lg border-2 border-[#c9a227]/50 text-[#d4b94c] font-bold hover:bg-[#c9a227]/10 transition-all duration-300">
                التسجيل عبر النفاذ الوطني
              </button>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[#8b7355]/30 text-center">
              <span className="text-[#b0a090] text-sm">
                لديك حساب بالفعل؟{' '}
                <button
                  onClick={() => {
                    setRegisterModalOpen(false);
                    setLoginModalOpen(true);
                  }}
                  className="text-[#d4b94c] font-bold hover:text-[#f5f0e8] transition-colors"
                >
                  تسجيل الدخول
                </button>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a227] to-[#d4b94c] text-[#1a1a1a] flex items-center justify-center hover:shadow-lg hover:shadow-[#c9a227]/50 transition-all duration-300 hover:scale-110"
          style={{
            animation: 'pulse 2s infinite',
          }}
        >
          <ArrowUp size={24} />
        </button>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(201, 162, 39, 0.7); }
          50% { box-shadow: 0 0 0 10px rgba(201, 162, 39, 0); }
        }
      `}</style>
    </div>
  );
}
