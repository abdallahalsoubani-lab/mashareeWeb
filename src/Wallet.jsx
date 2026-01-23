import React, { useState } from 'react';
import {
  ArrowLeft,
  RefreshCw,
  Plus,
  TrendingDown,
  Wallet as WalletIcon,
  TrendingUp,
  ArrowUpRight,
  CheckCircle,
  Clock,
} from 'lucide-react';

// Helper function to convert English numerals to Arabic numerals
const toArabicNumeral = (num) => {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).replace(/\d/g, (digit) => arabicNumerals[digit]);
};

export default function Wallet({ onBack }) {
  const totalBalance = 124500.00;
  const availableToInvest = 24500;
  const totalInvested = 100000;

  const transactions = [
    {
      id: 1,
      type: 'topup',
      icon: Plus,
      description: 'شحن عبر Apple Pay',
      date: 'اليوم، ١٠:٢٣ صباحاً',
      amount: 5000,
      status: 'completed',
      color: 'bg-gray-200',
      iconColor: 'text-gray-600',
    },
    {
      id: 2,
      type: 'investment',
      icon: TrendingUp,
      description: 'استثمار: مركز الرياض اللوجستي',
      date: 'أمس، ٤:١٥ مساءً',
      amount: -25000,
      status: 'completed',
      color: 'bg-[#5c4d3a]',
      iconColor: 'text-[#d4b94c]',
    },
    {
      id: 3,
      type: 'dividend',
      icon: WalletIcon,
      description: 'دفعة أرباح (الربع الرابع)',
      date: '١٥ يناير ٢٠٢٦',
      amount: 1250,
      status: 'completed',
      color: 'bg-[#c9a227]/20',
      iconColor: 'text-[#d4b94c]',
    },
    {
      id: 4,
      type: 'withdrawal',
      icon: ArrowUpRight,
      description: 'سحب إلى بنك ساب',
      date: '١٠ يناير ٢٠٢٦',
      amount: -10000,
      status: 'processing',
      color: 'bg-[#5c4d3a]',
      iconColor: 'text-[#d4b94c]',
    },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#1a1a1a] text-[#f5f0e8] font-['Tajawal']">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');
      `}</style>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-12 h-12 rounded-full bg-[#5c4d3a] border border-[#8b7355]/50 flex items-center justify-center text-[#d4b94c] hover:bg-[#8b7355]/50 hover:border-[#c9a227] transition-all duration-300"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-3xl md:text-4xl font-bold text-[#f5f0e8]">المحفظة</h1>
          </div>
          <button className="w-12 h-12 rounded-full bg-[#5c4d3a] border border-[#8b7355]/50 flex items-center justify-center text-[#b0a090] hover:bg-[#8b7355]/50 hover:border-[#c9a227] hover:text-[#d4b94c] transition-all duration-300">
            <RefreshCw size={20} />
          </button>
        </div>

        {/* Total Balance Card */}
        <div 
          className="rounded-2xl shadow-2xl p-6 md:p-8 mb-6 border border-[#c9a227]/30 overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(92, 77, 58, 0.3) 100%)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a227]/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#d4b94c]/5 rounded-full blur-3xl -z-10" />

          <div className="relative z-10">
            <p className="text-[#b0a090] text-sm mb-4">الرصيد الإجمالي</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#f5f0e8] mb-8">
              {toArabicNumeral(totalBalance.toFixed(2).replace('.', ','))} ر.س
            </h2>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-[#1a1a1a] font-bold text-base md:text-lg hover:shadow-lg hover:shadow-[#c9a227]/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                <Plus size={20} />
                <span>شحن</span>
              </button>
              <button 
                className="flex-1 py-4 rounded-xl font-bold text-base md:text-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 border border-[#8b7355]/50"
                style={{
                  background: 'rgba(92, 77, 58, 0.3)',
                  color: '#f5f0e8',
                }}
              >
                <TrendingDown size={20} />
                <span>سحب</span>
              </button>
            </div>
          </div>
        </div>

        {/* Investment Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Available to Invest */}
          <div 
            className="rounded-xl p-6 border border-[#8b7355]/30 transition-all duration-300 hover:border-[#c9a227]/50 hover:shadow-lg"
            style={{
              background: 'rgba(92, 77, 58, 0.15)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <p className="text-[#b0a090] text-sm mb-2">متاح للاستثمار</p>
            <p className="text-[#f5f0e8] text-2xl md:text-3xl font-bold">
              {toArabicNumeral(availableToInvest)} ر.س
            </p>
          </div>

          {/* Total Invested */}
          <div 
            className="rounded-xl p-6 border border-[#8b7355]/30 transition-all duration-300 hover:border-[#c9a227]/50 hover:shadow-lg"
            style={{
              background: 'rgba(92, 77, 58, 0.15)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <p className="text-[#b0a090] text-sm mb-2">إجمالي المستثمر</p>
            <p className="text-[#f5f0e8] text-2xl md:text-3xl font-bold">
              {toArabicNumeral(totalInvested)} ر.س
            </p>
          </div>
        </div>

        {/* Recent Transactions Section */}
        <div className="mt-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f5f0e8] mb-6">المعاملات الأخيرة</h2>

          <div 
            className="rounded-2xl shadow-xl border border-[#8b7355]/30 overflow-hidden"
            style={{
              background: 'rgba(92, 77, 58, 0.15)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {transactions.map((transaction, index) => {
              const IconComponent = transaction.icon;
              const isPositive = transaction.amount > 0;
              
              return (
                <div key={transaction.id}>
                  <div className="p-4 md:p-6 hover:bg-[#5c4d3a]/20 transition-colors duration-300">
                    <div className="flex items-center justify-between gap-4">
                      {/* Left: Icon and Details */}
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${transaction.color} border border-[#8b7355]/30`}>
                          <IconComponent size={20} className={transaction.iconColor} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="text-[#f5f0e8] font-medium text-base md:text-lg mb-1 truncate">
                            {transaction.description}
                          </p>
                          <div className="flex items-center gap-3 flex-wrap">
                            <p className="text-[#b0a090] text-sm">{transaction.date}</p>
                            <span 
                              className={`text-xs font-medium px-2 py-1 rounded-full ${
                                transaction.status === 'completed' 
                                  ? 'bg-[#5c4d3a]/50 text-[#b0a090] border border-[#8b7355]/30' 
                                  : 'bg-[#c9a227]/20 text-[#d4b94c] border border-[#c9a227]/50'
                              }`}
                            >
                              {transaction.status === 'completed' ? (
                                <span className="flex items-center gap-1">
                                  <CheckCircle size={12} />
                                  مكتمل
                                </span>
                              ) : (
                                <span className="flex items-center gap-1">
                                  <Clock size={12} />
                                  قيد المعالجة
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Amount */}
                      <div className="flex-shrink-0">
                        <p 
                          className={`text-lg md:text-xl font-bold ${
                            isPositive 
                              ? 'text-[#d4b94c]' 
                              : 'text-[#f5f0e8]'
                          }`}
                        >
                          {isPositive ? '+' : ''}{toArabicNumeral(Math.abs(transaction.amount))} ر.س
                        </p>
                      </div>
                    </div>
                  </div>
                  {index < transactions.length - 1 && (
                    <div className="h-px bg-[#8b7355]/30 mx-4 md:mx-6" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
