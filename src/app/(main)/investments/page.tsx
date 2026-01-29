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
  color: 'primary' | 'purple' | 'teal' | 'cyan';
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
      icon: <TrendingUp className="text-primary-400" size={24} />,
      color: 'primary',
    },
    {
      label: 'مجموع الصناديق',
      value: summary.totalFunds.toString(),
      icon: <TrendingUp className="text-accent-purple" size={24} />,
      color: 'purple',
    },
    {
      label: 'العائد',
      value: formatCurrency(summary.totalReturns),
      icon: <TrendingUp className="text-accent-teal" size={24} />,
      color: 'teal',
    },
    {
      label: 'توزيعات الأرباح',
      value: formatCurrency(summary.totalDividends),
      icon: <TrendingUp className="text-accent-cyan" size={24} />,
      color: 'cyan',
    },
  ];

  return (
    <div className="min-h-screen bg-mesh pb-16">
      <div className="w-full px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 pt-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 glass rounded-full border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <span className="text-sm text-text-secondary">محفظتك الاستثمارية</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 gradient-text">
            استثماراتي
          </h1>
          <p className="text-text-muted text-lg">متابعة استثماراتك وعوائدك المالية</p>
        </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
        {summaryCards.map((card, index) => (
          <div
            key={card.label}
            className="group relative stagger-item"
            style={{ animationDelay: `${0.1 * (index + 1)}s` }}
          >
            <div className="absolute -inset-0.5 bg-primary rounded-2xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500" />
            <div className="relative bg-background-secondary rounded-2xl p-6 border border-primary/20 group-hover:border-primary/40 transition-all duration-300 hover:shadow-glow-gold">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3.5 rounded-xl glass border transition-all ${
                  card.color === 'primary' ? 'border-primary/30 bg-primary/10' :
                  card.color === 'purple' ? 'border-accent-purple/30 bg-accent-purple/10' :
                  card.color === 'teal' ? 'border-accent-teal/30 bg-accent-teal/10' :
                  'border-accent-cyan/30 bg-accent-cyan/10'
                }`}>
                  {card.icon}
                </div>
              </div>
              <p className="text-text-muted text-sm mb-2 font-medium">{card.label}</p>
              <p className="text-2xl md:text-3xl font-bold text-text-primary">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setActiveTab('active')}
          className={`relative px-8 py-3.5 font-bold rounded-xl transition-all ${
            activeTab === 'active'
              ? 'bg-primary text-background shadow-glow-gold'
              : 'bg-background-tertiary text-secondary hover:text-white border border-primary/20 hover:border-primary/40'
          }`}
        >
          <span className="relative z-10">استثماراتي الحالية</span>
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`relative px-8 py-3.5 font-bold rounded-xl transition-all ${
            activeTab === 'completed'
              ? 'bg-primary text-background shadow-glow-gold'
              : 'bg-background-tertiary text-secondary hover:text-white border border-primary/20 hover:border-primary/40'
          }`}
        >
          <span className="relative z-10">استثماراتي السابقة</span>
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-20 animate-fade-in-scale">
          <div className="inline-flex flex-col items-center gap-4">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500/20 border-t-primary-500" />
              <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-xl animate-pulse" />
            </div>
            <span className="text-text-secondary font-medium">جاري تحميل استثماراتك...</span>
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
          {filteredInvestments.map((investment, index) => (
            <div
              key={investment.id}
              className="group relative stagger-item"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="absolute -inset-0.5 bg-primary rounded-2xl opacity-0 group-hover:opacity-15 blur-lg transition-all duration-500" />
              <div className="relative bg-background-secondary rounded-2xl p-6 border border-primary/20 group-hover:border-primary/40 transition-all duration-300 group-hover:shadow-glow-gold">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white transition-all">
                      {investment.projectTitle}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-secondary">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-primary" />
                        {investment.date}
                      </span>
                      {investment.units && (
                        <span className="px-2 py-1 bg-primary/10 rounded-lg text-primary text-xs font-semibold">
                          {investment.units} وحدة
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-white">
                      {formatCurrency(investment.amount)}
                    </p>
                    <p className="text-sm text-primary font-bold mt-1 flex items-center gap-1">
                      <TrendingUp size={14} />
                      عائد: {formatCurrency(investment.returns)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${investment.status === 'ACTIVE' ? 'bg-primary' : 'bg-secondary'} animate-pulse`} />
                    <span className="text-sm text-secondary font-medium">
                      {investment.status === 'ACTIVE'
                        ? 'استثمار نشط'
                        : 'اكتمل'}
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-primary text-background rounded-lg font-semibold text-sm hover:shadow-glow-gold transition-all hover:scale-105">
                    عرض التفاصيل
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
