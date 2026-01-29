'use client';

import { useState } from 'react';
import RiyalSymbol from '@/components/ui/RiyalSymbol';
import { Calculator, TrendingUp, DollarSign, Calendar } from 'lucide-react';

export default function CalculatorPage() {
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [returnRate, setReturnRate] = useState(18);
  const [duration, setDuration] = useState(12);

  const calculateReturns = () => {
    const totalReturn = (investmentAmount * returnRate * duration) / (12 * 100);
    const totalAmount = investmentAmount + totalReturn;
    const monthlyReturn = totalReturn / duration;

    return {
      totalReturn,
      totalAmount,
      monthlyReturn,
    };
  };

  const results = calculateReturns();

  return (
    <div className="min-h-screen bg-mesh pb-16">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12 pt-8 animate-fade-in-up">
          <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6 group">
            <div className="absolute -inset-2 bg-primary rounded-2xl opacity-40 blur-xl group-hover:opacity-60 transition-all duration-500" />
            <div className="relative p-4 bg-primary rounded-2xl shadow-glow-gold">
              <Calculator className="w-8 h-8 text-background" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 gradient-text">
            الحاسبة الاستثمارية
          </h1>
          <p className="text-text-muted text-lg">
            احسب العائد المتوقع من استثمارك بدقة وسهولة
          </p>
        </div>

          <div className="grid md:grid-cols-2 gap-8">
          {/* Calculator Inputs */}
          <div className="group relative animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -inset-0.5 bg-primary rounded-3xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500" />
            <div className="relative bg-background-secondary rounded-3xl p-8 border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary">
                  <DollarSign className="text-background" size={20} />
                </div>
                <span>بيانات الاستثمار</span>
              </h2>

              {/* Investment Amount */}
              <div className="mb-8">
                <label className="block text-text-secondary text-sm mb-3 font-medium">
                  مبلغ الاستثمار (ريال)
                </label>
                <input
                  type="range"
                  min="1000"
                  max="1000000"
                  step="1000"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full h-2.5 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to left, rgb(143, 127, 94) 0%, rgb(143, 127, 94) ${((investmentAmount - 1000) / 999000) * 100}%, rgb(26, 26, 26) ${((investmentAmount - 1000) / 999000) * 100}%, rgb(26, 26, 26) 100%)`
                  }}
                />
                <div className="mt-4 text-center bg-background-tertiary p-4 rounded-xl border border-primary/20">
                  <span className="text-3xl font-bold text-white flex items-center justify-center gap-2">
                    {investmentAmount.toLocaleString('ar-SA')}
                    <RiyalSymbol size={24} className="text-primary" />
                  </span>
                </div>
              </div>

              {/* Return Rate */}
              <div className="mb-8">
                <label className="block text-text-secondary text-sm mb-3 font-medium">
                  نسبة العائد السنوي (%)
                </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="0.5"
                  value={returnRate}
                  onChange={(e) => setReturnRate(Number(e.target.value))}
                  className="w-full h-2.5 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to left, rgb(143, 127, 94) 0%, rgb(143, 127, 94) ${((returnRate - 5) / 45) * 100}%, rgb(26, 26, 26) ${((returnRate - 5) / 45) * 100}%, rgb(26, 26, 26) 100%)`
                  }}
                />
                <div className="mt-4 text-center bg-background-tertiary p-4 rounded-xl border border-primary/20">
                  <span className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
                    {returnRate}%
                  </span>
                </div>
              </div>

              {/* Duration */}
              <div className="mb-6">
                <label className="block text-text-secondary text-sm mb-3 font-medium">
                  المدة (شهر)
                </label>
                <input
                  type="range"
                  min="1"
                  max="72"
                  step="1"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full h-2.5 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to left, rgb(143, 127, 94) 0%, rgb(143, 127, 94) ${((duration - 1) / 71) * 100}%, rgb(26, 26, 26) ${((duration - 1) / 71) * 100}%, rgb(26, 26, 26) 100%)`
                  }}
                />
                <div className="mt-4 text-center bg-background-tertiary p-4 rounded-xl border border-primary/20">
                  <span className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
                    {duration} شهر
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6 animate-fade-in-scale" style={{ animationDelay: '0.3s' }}>
            {/* Total Return Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-primary rounded-3xl opacity-20 blur-2xl group-hover:opacity-35 transition-all duration-700" />
              <div className="relative bg-background-secondary rounded-3xl p-8 border-2 border-primary/30 group-hover:border-primary/50 transition-all duration-300 shadow-glow-gold">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-xl bg-background-tertiary border border-primary/30">
                    <TrendingUp className="text-primary" size={28} />
                  </div>
                  <div className="flex-1">
                    <p className="text-secondary text-sm mb-2 font-medium">العوائد المتوقعة</p>
                    <p className="text-3xl md:text-4xl font-bold text-primary flex items-center gap-2">
                      {results.totalReturn.toLocaleString('ar-SA', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                      <RiyalSymbol size={28} />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Amount Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-primary rounded-3xl opacity-20 blur-2xl group-hover:opacity-35 transition-all duration-700" />
              <div className="relative bg-background-secondary rounded-3xl p-8 border-2 border-primary/30 group-hover:border-primary/50 transition-all duration-300 shadow-glow-gold">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-xl bg-background-tertiary border border-primary/30">
                    <DollarSign className="text-secondary" size={28} />
                  </div>
                  <div className="flex-1">
                    <p className="text-secondary text-sm mb-2 font-medium">المبلغ الإجمالي</p>
                    <p className="text-3xl md:text-4xl font-bold text-white flex items-center gap-2">
                      {results.totalAmount.toLocaleString('ar-SA', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                      <RiyalSymbol size={28} className="text-primary-400" />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Return Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-primary rounded-3xl opacity-20 blur-2xl group-hover:opacity-35 transition-all duration-700" />
              <div className="relative bg-background-secondary rounded-3xl p-8 border-2 border-primary/30 group-hover:border-primary/50 transition-all duration-300 shadow-glow-gold">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-xl bg-background-tertiary border border-primary/30">
                    <Calendar className="text-secondary" size={28} />
                  </div>
                  <div className="flex-1">
                    <p className="text-secondary text-sm mb-2 font-medium">العائد الشهري</p>
                    <p className="text-3xl md:text-4xl font-bold text-white flex items-center gap-2">
                      {results.monthlyReturn.toLocaleString('ar-SA', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                      <RiyalSymbol size={28} />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="bg-background-tertiary border border-primary/10 rounded-xl p-5 backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 mt-0.5">
                  <span className="text-primary">ℹ️</span>
                </div>
                <p className="text-text-muted text-sm leading-relaxed">
                  <span className="font-semibold text-secondary">ملاحظة:</span> هذه الحاسبة توفر تقديرات تقريبية. العوائد الفعلية قد تختلف بناءً على أداء المشروع والعوامل الاقتصادية.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
