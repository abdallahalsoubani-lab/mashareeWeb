import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  MapPin,
  Eye,
  FileText,
  CheckCircle,
  Calendar,
  TrendingUp,
  Shield,
  Building2,
  ChevronRight,
  Minus,
  Plus,
} from 'lucide-react';

// Helper function to convert English numerals to Arabic numerals
const toArabicNumeral = (num) => {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).replace(/\d/g, (digit) => arabicNumerals[digit]);
};

export default function InvestmentDetail({ opportunity, onBack }) {
  // Investment calculator state
  const [investmentAmount, setInvestmentAmount] = useState(26000);
  const minInvestment = 2500;
  const maxInvestment = 1000000;

  // Calculate returns based on the image
  const totalReturnPercent = 43.30;
  const totalReturnAmount = (investmentAmount * totalReturnPercent) / 100;
  const finalValue = investmentAmount + totalReturnAmount;
  
  const annualIncomeRate = 8.66;
  const annualIncome = (investmentAmount * annualIncomeRate) / 100;
  const appreciation = totalReturnAmount;

  // Funding progress
  const funded = 28800000;
  const target = 40000000;
  const progressPercent = ((target - funded) / target) * 100;

  const handleInvestmentChange = (newAmount) => {
    if (newAmount >= minInvestment && newAmount <= maxInvestment) {
      setInvestmentAmount(newAmount);
    }
  };

  const documents = [
    { id: 1, name: 'مذكرة الصندوق (عربي)', icon: FileText },
    { id: 2, name: 'ملخص تنفيذي', icon: FileText },
    { id: 3, name: 'شهادة شرعية', icon: FileText },
    { id: 4, name: 'تقرير التقييم', icon: FileText },
  ];

  const timeline = [
    {
      id: 1,
      title: 'فترة جمع التمويل',
      date: 'نوفمبر ٢٠٢٥ - ديسمبر ٢٠٢٥',
      description: 'مرحلة جمع رأس المال الأولية.',
      status: 'completed',
    },
    {
      id: 2,
      title: 'اكتساب العقار',
      date: '١٥ يناير ٢٠٢٦',
      description: 'نقل الأصول وتسجيلها.',
      status: 'current',
    },
    {
      id: 3,
      title: 'أول دفعة أرباح',
      date: '٢٨ فبراير ٢٠٢٦',
      description: 'دفعة شهرية متوقعة.',
      status: 'upcoming',
    },
    {
      id: 4,
      title: 'استراتيجية الخروج',
      date: 'الربع الرابع ٢٠٣٠',
      description: 'بيع متوقع أو إعادة تمويل.',
      status: 'upcoming',
    },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#1a1a1a] text-[#f5f0e8] font-['Tajawal']">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');
        
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 8px;
          border-radius: 4px;
          outline: none;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #f5f0e8;
          border: 2px solid #d4b94c;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(212, 185, 76, 0.5);
        }

        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #f5f0e8;
          border: 2px solid #d4b94c;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(212, 185, 76, 0.5);
        }

        input[type="range"]::-webkit-slider-runnable-track {
          height: 8px;
          border-radius: 4px;
        }

        input[type="range"]::-moz-range-track {
          height: 8px;
          border-radius: 4px;
        }
      `}</style>
      
      {/* Header with Background Image */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80)',
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Navigation Bar */}
        <div className="relative z-10 flex items-center justify-between p-4 md:p-6">
          <button
            onClick={onBack}
            className="w-12 h-12 rounded-full bg-[#1a1a1a]/80 backdrop-blur-md border border-[#c9a227]/30 flex items-center justify-center text-[#d4b94c] hover:bg-[#1a1a1a]/90 hover:border-[#d4b94c] transition-all duration-300"
          >
            <ArrowLeft size={20} />
          </button>
          <button className="w-12 h-12 rounded-full bg-[#1a1a1a]/80 backdrop-blur-md border border-[#c9a227]/30 flex items-center justify-center text-[#d4b94c] hover:bg-[#1a1a1a]/90 hover:border-[#d4b94c] transition-all duration-300">
            <Share2 size={20} />
          </button>
        </div>

        {/* Live Funding Badge */}
        <div className="absolute top-20 right-4 md:right-6 z-10">
          <div className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 rounded-full shadow-lg border border-red-400/50">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-white text-xs font-bold">تمويل مباشر</span>
          </div>
        </div>

        {/* Property Title & Location */}
        <div className="absolute bottom-8 right-0 left-0 z-10 px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            مركز الرياض اللوجستي
          </h1>
          <div className="flex items-center gap-2 text-white/90">
            <MapPin size={18} />
            <span className="text-base md:text-lg">المنطقة الصناعية الثانية، الرياض، السعودية</span>
          </div>
        </div>
      </div>

      {/* Investment Metrics Card - Overlapping */}
      <div className="relative -mt-16 md:-mt-20 z-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div 
            className="rounded-2xl shadow-2xl p-6 md:p-8 border border-[#c9a227]/30"
            style={{
              background: 'rgba(92, 77, 58, 0.2)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Key Metrics Row */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 mb-8 pb-8 border-b border-[#8b7355]/30">
              <div className="text-right">
                <p className="text-[#b0a090] text-xs md:text-sm mb-2">العائد السنوي</p>
                <p className="text-[#d4b94c] text-xl md:text-2xl font-bold">٨.٦٦٪</p>
              </div>
              <div className="text-right">
                <p className="text-[#b0a090] text-xs md:text-sm mb-2">التوزيع</p>
                <p className="text-[#f5f0e8] text-xl md:text-2xl font-bold">شهري</p>
              </div>
              <div className="text-right">
                <p className="text-[#b0a090] text-xs md:text-sm mb-2">المدة</p>
                <p className="text-[#f5f0e8] text-xl md:text-2xl font-bold">٥ سنوات</p>
              </div>
            </div>

            {/* Funding Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[#f5f0e8] text-lg md:text-xl font-bold">تقدم التمويل</h3>
                <span className="bg-[#5c4d3a]/50 text-[#d4b94c] text-xs md:text-sm font-bold px-3 py-1 rounded-full border border-[#c9a227]/50">
                  متاح ٢٨٪
                </span>
              </div>
              <div className="w-full h-3 bg-[#5c4d3a] rounded-full overflow-hidden mb-3 border border-[#8b7355]/50">
                <div
                  className="h-full bg-gradient-to-r from-[#c9a227] to-[#d4b94c] rounded-full transition-all duration-1000"
                  style={{ width: `${100 - progressPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm text-[#b0a090]">
                <span>الممول: {(funded / 1000000).toFixed(1)} مليون ر.س</span>
                <span>الهدف: {target / 1000000} مليون ر.س</span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2 text-[#b0a090] text-sm">
                  <Eye size={16} />
                  <span>٢٤١ مستثمر شاهدوا هذا اليوم</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-5 bg-[#5c4d3a] rounded-full relative border border-[#8b7355]/50">
                    <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#f5f0e8] rounded-full transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Investment Calculator Section */}
        <div 
          className="rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-[#c9a227]/30"
          style={{
            background: 'rgba(92, 77, 58, 0.15)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#f5f0e8] mb-6">حاسبة الاستثمار</h2>
          
          {/* Main Result */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-2 flex-wrap">
              <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4b94c] to-[#c9a227]">
                {toArabicNumeral(finalValue)} ر.س
              </span>
              <div className="bg-[#c9a227]/20 text-[#d4b94c] px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold border border-[#c9a227]/50">
                <span>+٤٣.٣٠٪</span>
                <TrendingUp size={14} />
              </div>
            </div>
            
            {/* Breakdown */}
            <div className="grid grid-cols-2 gap-6 mt-6">
              <div className="text-right">
                <p className="text-[#b0a090] text-sm mb-1">الدخل السنوي</p>
                <p className="text-[#d4b94c] text-xl font-bold">{toArabicNumeral(annualIncome)} ر.س</p>
              </div>
              <div className="text-right">
                <p className="text-[#b0a090] text-sm mb-1">الزيادة في القيمة</p>
                <p className="text-[#d4b94c] text-xl font-bold">{toArabicNumeral(appreciation)} ر.س</p>
              </div>
            </div>
          </div>

          {/* Investment Amount Selector */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleInvestmentChange(investmentAmount - 1000)}
                className="w-12 h-12 rounded-full bg-[#5c4d3a] border border-[#8b7355]/50 flex items-center justify-center text-[#d4b94c] hover:bg-[#8b7355]/50 hover:border-[#c9a227] transition-all duration-300"
              >
                <Minus size={20} />
              </button>
              <div className="flex-1 mx-4">
                <div className="bg-[#5c4d3a]/50 rounded-xl px-6 py-4 text-center border border-[#8b7355]/50">
                  <span className="text-2xl md:text-3xl font-bold text-[#f5f0e8]">
                    {toArabicNumeral(investmentAmount)} ر.س
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleInvestmentChange(investmentAmount + 1000)}
                className="w-12 h-12 rounded-full bg-[#5c4d3a] border border-[#8b7355]/50 flex items-center justify-center text-[#d4b94c] hover:bg-[#8b7355]/50 hover:border-[#c9a227] transition-all duration-300"
              >
                <Plus size={20} />
              </button>
            </div>

            {/* Slider */}
            <input
              type="range"
              min={minInvestment}
              max={maxInvestment}
              step={1000}
              value={investmentAmount}
              onChange={(e) => handleInvestmentChange(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #d4b94c 0%, #c9a227 ${((investmentAmount - minInvestment) / (maxInvestment - minInvestment)) * 100}%, #5c4d3a ${((investmentAmount - minInvestment) / (maxInvestment - minInvestment)) * 100}%, #5c4d3a 100%)`,
              }}
            />
          </div>
        </div>

        {/* Investment Timeline */}
        <div 
          className="rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-[#c9a227]/30"
          style={{
            background: 'rgba(92, 77, 58, 0.15)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#f5f0e8] mb-6">الخطة الزمنية للاستثمار</h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute right-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#c9a227]/50 via-[#d4b94c]/50 to-[#5c4d3a]/50" />
            
            {/* Timeline Items */}
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={item.id} className="relative flex items-start gap-6">
                  {/* Icon */}
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    item.status === 'completed'
                      ? 'bg-gradient-to-br from-[#c9a227] to-[#d4b94c] shadow-lg shadow-[#c9a227]/30'
                      : item.status === 'current'
                      ? 'bg-gradient-to-br from-[#d4b94c] to-[#c9a227] shadow-lg shadow-[#d4b94c]/50 animate-pulse'
                      : 'bg-[#5c4d3a] border-2 border-[#8b7355]/50'
                  }`}>
                    {item.status === 'completed' && (
                      <CheckCircle size={24} className="text-[#1a1a1a]" />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-1 text-right">
                    <div className="flex items-start justify-between mb-1 flex-wrap gap-2">
                      <h3 className="text-lg md:text-xl font-bold text-[#f5f0e8]">{item.title}</h3>
                      {item.status === 'current' && (
                        <span className="bg-[#c9a227]/20 text-[#d4b94c] text-xs font-bold px-3 py-1 rounded-full border border-[#c9a227]/50">
                          الحالي
                        </span>
                      )}
                    </div>
                    <p className="text-[#d4b94c] text-sm md:text-base mb-1 font-medium">{item.date}</p>
                    <p className="text-[#b0a090] text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Due Diligence Section */}
        <div 
          className="rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-[#c9a227]/30"
          style={{
            background: 'rgba(92, 77, 58, 0.15)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#f5f0e8] mb-6">الامتثال والتراخيص</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* CMA Regulated Card */}
            <div 
              className="rounded-xl p-6 text-center border border-[#8b7355]/30 transition-all duration-300 hover:border-[#c9a227]/50 hover:shadow-lg"
              style={{
                background: 'rgba(92, 77, 58, 0.2)',
              }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#c9a227] to-[#d4b94c] flex items-center justify-center shadow-lg">
                  <Shield size={32} className="text-[#1a1a1a]" />
                </div>
              </div>
              <p className="text-[#f5f0e8] font-bold text-lg">مرخص من هيئة السوق المالية</p>
            </div>

            {/* Shariah Compliant Card */}
            <div 
              className="rounded-xl p-6 text-center border border-[#8b7355]/30 transition-all duration-300 hover:border-[#c9a227]/50 hover:shadow-lg"
              style={{
                background: 'rgba(92, 77, 58, 0.2)',
              }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4b94c] to-[#c9a227] flex items-center justify-center shadow-lg">
                  <span className="text-3xl">🌙⭐</span>
                </div>
              </div>
              <p className="text-[#f5f0e8] font-bold text-lg">متوافق مع الشريعة الإسلامية</p>
            </div>
          </div>
        </div>

        {/* Arch Capital Section */}
        <div 
          className="rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-[#c9a227]/30"
          style={{
            background: 'rgba(92, 77, 58, 0.15)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#c9a227] to-[#d4b94c] flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-[#1a1a1a] text-xl font-bold">AC</span>
            </div>
            <div className="text-right">
              <h3 className="text-xl md:text-2xl font-bold text-[#f5f0e8] mb-2">أرك كابيتال</h3>
              <p className="text-[#b0a090] text-sm md:text-base leading-relaxed">
                تأسست في عام ٢٠٢٠، شركة استثمارية مرخصة من هيئة السوق المالية متخصصة في الأصول اللوجستية الصناعية عبر منطقة الخليج.
              </p>
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div 
          className="rounded-2xl shadow-xl p-6 md:p-8 mb-24 md:mb-8 border border-[#c9a227]/30"
          style={{
            background: 'rgba(92, 77, 58, 0.15)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#f5f0e8] mb-6">المستندات</h2>
          
          <div className="space-y-0">
            {documents.map((doc, index) => {
              const IconComponent = doc.icon;
              return (
                <div key={doc.id}>
                  <button 
                    className="w-full flex items-center justify-between p-4 hover:bg-[#5c4d3a]/30 transition-all duration-300 rounded-lg group"
                  >
                    <ChevronRight size={20} className="text-[#b0a090] group-hover:text-[#d4b94c] group-hover:-translate-x-1 transition-all" />
                    <div className="flex items-center gap-4 flex-row-reverse">
                      <IconComponent size={20} className="text-[#b0a090] group-hover:text-[#d4b94c] transition-colors" />
                      <span className="text-[#f5f0e8] font-medium group-hover:text-[#d4b94c] transition-colors">{doc.name}</span>
                    </div>
                  </button>
                  {index < documents.length - 1 && (
                    <div className="h-px bg-[#8b7355]/30 mx-4" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div 
        className="fixed bottom-0 left-0 right-0 border-t border-[#8b7355]/30 shadow-2xl z-50"
        style={{
          background: 'rgba(26, 26, 26, 0.95)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <button className="bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-[#1a1a1a] px-8 md:px-12 py-4 rounded-xl font-bold text-base md:text-lg hover:shadow-lg hover:shadow-[#c9a227]/50 hover:scale-105 transition-all duration-300 flex-1 md:flex-initial">
              أضف إلى السلة
            </button>
            <div className="text-left">
              <p className="text-[#b0a090] text-xs uppercase mb-1">الحد الأدنى</p>
              <p className="text-[#d4b94c] text-xl font-bold">{toArabicNumeral(minInvestment)} ر.س</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
