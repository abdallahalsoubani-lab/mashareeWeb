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
    <div className="min-h-screen bg-[#1a1a1a] pb-16">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#c9a227] to-[#d4b94c] rounded-full mb-4">
            <Calculator className="w-8 h-8 text-[#1a1a1a]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-[#d4b94c] to-[#f5f0e8] mb-2">
            الحاسبة الاستثمارية
          </h1>
          <p className="text-[#b0a090]">
            احسب العائد المتوقع من استثمارك
          </p>
        </div>

          <div className="grid md:grid-cols-2 gap-8">
          {/* Calculator Inputs */}
          <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border-2 border-[#c9a227]/30 rounded-3xl p-8 backdrop-blur-sm shadow-xl">
            <h2 className="text-xl font-bold text-[#f5f0e8] mb-6">
              بيانات الاستثمار
            </h2>

            {/* Investment Amount */}
            <div className="mb-6">
              <label className="block text-[#b0a090] text-sm mb-2">
                مبلغ الاستثمار (ريال)
              </label>
              <input
                type="range"
                min="1000"
                max="1000000"
                step="1000"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                className="w-full h-2 bg-[#2a2a2a] rounded-lg appearance-none cursor-pointer accent-[#d4b94c]"
              />
                <div className="mt-2 text-center flex items-center justify-center gap-2">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4b94c] to-[#c9a227]">
                  {investmentAmount.toLocaleString('ar-SA')}
                </span>
                <RiyalSymbol size={20} />
              </div>
            </div>

            {/* Return Rate */}
            <div className="mb-6">
              <label className="block text-[#b0a090] text-sm mb-2">
                نسبة العائد السنوي (%)
              </label>
              <input
                type="range"
                min="5"
                max="50"
                step="0.5"
                value={returnRate}
                onChange={(e) => setReturnRate(Number(e.target.value))}
                className="w-full h-2 bg-[#2a2a2a] rounded-lg appearance-none cursor-pointer accent-[#d4b94c]"
              />
              <div className="mt-2 text-center">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4b94c] to-[#c9a227]">
                  {returnRate}%
                </span>
              </div>
            </div>

            {/* Duration */}
            <div className="mb-6">
              <label className="block text-[#b0a090] text-sm mb-2">
                المدة (شهر)
              </label>
              <input
                type="range"
                min="1"
                max="72"
                step="1"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-2 bg-[#2a2a2a] rounded-lg appearance-none cursor-pointer accent-[#d4b94c]"
              />
              <div className="mt-2 text-center">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4b94c] to-[#c9a227]">
                  {duration} شهر
                </span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="relative bg-gradient-to-br from-[#c9a227]/30 to-[#d4b94c]/20 border-2 border-[#c9a227]/40 rounded-3xl p-6 backdrop-blur-sm shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4b94c]/20 rounded-full blur-2xl -z-10"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#c9a227] to-[#d4b94c] rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#1a1a1a]" />
                </div>
                <div>
                  <p className="text-[#b0a090] text-sm">العوائد المتوقعة</p>
                  <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4b94c] to-[#c9a227] flex items-center gap-2">
                    {results.totalReturn.toLocaleString('ar-SA', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    <RiyalSymbol size={20} />
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border-2 border-[#c9a227]/30 rounded-3xl p-6 backdrop-blur-sm shadow-xl hover:border-[#c9a227]/50 hover:shadow-2xl hover:shadow-[#c9a227]/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#c9a227] to-[#d4b94c] rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-[#1a1a1a]" />
                </div>
                <div>
                  <p className="text-[#b0a090] text-sm">المبلغ الإجمالي</p>
                  <p className="text-2xl font-bold text-[#f5f0e8] flex items-center gap-2">
                    {results.totalAmount.toLocaleString('ar-SA', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    <RiyalSymbol size={20} />
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border-2 border-[#c9a227]/30 rounded-3xl p-6 backdrop-blur-sm shadow-xl hover:border-[#c9a227]/50 hover:shadow-2xl hover:shadow-[#c9a227]/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#c9a227] to-[#d4b94c] rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#1a1a1a]" />
                </div>
                <div>
                  <p className="text-[#b0a090] text-sm">العائد الشهري</p>
                  <p className="text-2xl font-bold text-[#f5f0e8] flex items-center gap-2">
                    {results.monthlyReturn.toLocaleString('ar-SA', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    <RiyalSymbol size={20} />
                  </p>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="bg-[#c9a227]/10 border border-[#c9a227]/30 rounded-xl p-4">
              <p className="text-[#b0a090] text-sm">
                ملاحظة: هذه الحاسبة توفر تقديرات تقريبية. العوائد الفعلية قد تختلف
                بناءً على أداء المشروع والعوامل الاقتصادية.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
