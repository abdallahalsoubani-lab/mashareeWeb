/**
 * My Investments Page
 * Shows user's investment portfolio
 */

'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Calendar, CheckCircle } from 'lucide-react';
import { EmptyState } from '@/components/dashboard/EmptyState';

interface Investment {
  id: string;
  projectTitle: string;
  amount: number;
  returns: number;
  status: string;
  date: string;
  units?: number;
}

interface SummaryCard {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

export default function InvestmentsPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>(
    'active'
  );
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [summary, setSummary] = useState({
    totalInvested: 0,
    totalFunds: 0,
    totalReturns: 0,
    totalDividends: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/investments');
        const data = await response.json();

        if (data.success) {
          setInvestments(data.investments);
          setSummary(data.summary);
        }
      } catch (error) {
        console.error('Error fetching investments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  const filteredInvestments = investments.filter((inv) => {
    if (activeTab === 'active') {
      return inv.status === 'ACTIVE';
    } else {
      return inv.status === 'COMPLETED';
    }
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const summaryCards: SummaryCard[] = [
    {
      label: 'إجمالي الاستثمار',
      value: formatCurrency(summary.totalInvested),
      icon: <TrendingUp className="text-white" size={24} />,
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'مجموع الصناديق',
      value: summary.totalFunds.toString(),
      icon: <TrendingUp className="text-white" size={24} />,
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      label: 'العائد',
      value: formatCurrency(summary.totalReturns),
      icon: <TrendingUp className="text-white" size={24} />,
      color: 'from-green-500 to-green-600',
    },
    {
      label: 'توزيعات الأرباح',
      value: formatCurrency(summary.totalDividends),
      icon: <TrendingUp className="text-white" size={24} />,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          استثماراتي
        </h1>
        <p className="text-slate-600">متابعة استثماراتك وعوائدك</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 text-white dashboard-card shadow-lg`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                {card.icon}
              </div>
            </div>
            <p className="text-white/80 text-sm mb-2">{card.label}</p>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
            activeTab === 'active'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          استثماراتي الحالية
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
            activeTab === 'completed'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          استثماراتي السابقة
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            <span className="text-slate-600">جاري التحميل...</span>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredInvestments.length === 0 && (
        <EmptyState
          icon="📦"
          title={
            activeTab === 'active'
              ? 'لا توجد لديك أي استثمارات حتى الآن'
              : 'لا توجد استثمارات سابقة'
          }
          description={
            activeTab === 'active'
              ? 'تطلع على الصناديق الاستثمارية وابدأ استثمارك الآن'
              : 'استثماراتك المكتملة ستظهر هنا'
          }
          action={
            activeTab === 'active'
              ? { label: 'استكشف الصناديق', href: '/projects' }
              : undefined
          }
        />
      )}

      {/* Investments List */}
      {!loading && filteredInvestments.length > 0 && (
        <div className="space-y-4">
          {filteredInvestments.map((investment) => (
            <div
              key={investment.id}
              className="dashboard-card p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {investment.projectTitle}
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {investment.date}
                    </span>
                    {investment.units && (
                      <span>{investment.units} وحدة</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-900">
                    {formatCurrency(investment.amount)}
                  </p>
                  <p className="text-sm text-green-600 font-semibold mt-1">
                    عائد: {formatCurrency(investment.returns)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm text-slate-600">
                    {investment.status === 'ACTIVE'
                      ? 'استثمار نشط'
                      : 'اكتمل'}
                  </span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  عرض التفاصيل
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
