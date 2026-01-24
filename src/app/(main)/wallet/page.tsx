/**
 * Wallet / Financial Page
 * Shows user's account balance and transaction history
 */

'use client';

import { useState, useEffect } from 'react';
import {
  Eye,
  EyeOff,
  ArrowDownRight,
  ArrowUpRight,
  Plus,
  Minus,
  TrendingUp,
  Calendar,
} from 'lucide-react';
import { EmptyState } from '@/components/dashboard/EmptyState';

interface Transaction {
  id: string;
  type: string;
  amount: number;
  status: string;
  description: string;
  date: string;
  reference?: string;
}

interface WalletData {
  balance: number;
  totalDeposits: number;
  totalWithdrawals: number;
  totalInvested: number;
}

const TransactionTypeConfig: Record<
  string,
  { icon: React.ReactNode; color: string; label: string; bgColor: string }
> = {
  DEPOSIT: {
    icon: <ArrowDownRight size={20} />,
    color: 'text-green-600',
    label: 'إيداع',
    bgColor: 'bg-green-50',
  },
  WITHDRAW: {
    icon: <ArrowUpRight size={20} />,
    color: 'text-red-600',
    label: 'سحب',
    bgColor: 'bg-red-50',
  },
  INVEST: {
    icon: <TrendingUp size={20} />,
    color: 'text-blue-600',
    label: 'استثمار',
    bgColor: 'bg-blue-50',
  },
  RETURN: {
    icon: <Plus size={20} />,
    color: 'text-purple-600',
    label: 'عوائد',
    bgColor: 'bg-purple-50',
  },
  DIVIDEND: {
    icon: <Plus size={20} />,
    color: 'text-indigo-600',
    label: 'توزيعات',
    bgColor: 'bg-indigo-50',
  },
};

export default function WalletPage() {
  const [showBalance, setShowBalance] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [wallet, setWallet] = useState<WalletData>({
    balance: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    totalInvested: 0,
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/wallet');
        const data = await response.json();

        if (data.success) {
          setWallet(data.wallet);
          setTransactions(data.transactions);
        }
      } catch (error) {
        console.error('Error fetching wallet:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filteredTransactions =
    activeTab === 'all'
      ? transactions
      : transactions.filter((t) => t.type === activeTab);

  const getTransactionConfig = (type: string) => {
    return TransactionTypeConfig[type] || TransactionTypeConfig.DEPOSIT;
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          محفظتي المالية
        </h1>
        <p className="text-slate-600">الرصيد والمعاملات المالية</p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white mb-8 dashboard-card shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-blue-100 mb-2 text-sm">الرصيد الحالي</p>
            <div className="flex items-center gap-4">
              {showBalance ? (
                <p className="text-5xl font-bold">{formatCurrency(wallet.balance)}</p>
              ) : (
                <p className="text-5xl font-bold tracking-widest">●●●●●●●●</p>
              )}
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                {showBalance ? <Eye size={24} /> : <EyeOff size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4">
          <button className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
            <Plus size={20} />
            إيداع
          </button>
          <button className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
            <Minus size={20} />
            سحب
          </button>
          <button className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
            <TrendingUp size={20} />
            إحسان
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="dashboard-card p-6 rounded-2xl">
          <p className="text-slate-600 text-sm mb-2">إجمالي الإيداعات</p>
          <p className="text-2xl font-bold text-slate-900">
            {formatCurrency(wallet.totalDeposits)}
          </p>
        </div>
        <div className="dashboard-card p-6 rounded-2xl">
          <p className="text-slate-600 text-sm mb-2">إجمالي السحوبات</p>
          <p className="text-2xl font-bold text-red-600">
            {formatCurrency(wallet.totalWithdrawals)}
          </p>
        </div>
        <div className="dashboard-card p-6 rounded-2xl">
          <p className="text-slate-600 text-sm mb-2">الاستثمارات</p>
          <p className="text-2xl font-bold text-blue-600">
            {formatCurrency(wallet.totalInvested)}
          </p>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6">معاملاتي</h2>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            الكل
          </button>
          {['DEPOSIT', 'WITHDRAW', 'INVEST', 'RETURN', 'DIVIDEND'].map(
            (type) => (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-colors ${
                  activeTab === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {TransactionTypeConfig[type]?.label || type}
              </button>
            )
          )}
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
        {!loading && filteredTransactions.length === 0 && (
          <EmptyState
            icon="💼"
            title="لا توجد معاملات"
            description="جميع معاملاتك المالية ستظهر هنا"
          />
        )}

        {/* Transactions List */}
        {!loading && filteredTransactions.length > 0 && (
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => {
              const config = getTransactionConfig(transaction.type);
              const isPositive =
                transaction.type === 'DEPOSIT' ||
                transaction.type === 'RETURN' ||
                transaction.type === 'DIVIDEND';

              return (
                <div
                  key={transaction.id}
                  className={`${config.bgColor} rounded-2xl p-6 flex items-center justify-between`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full ${config.bgColor} border border-current flex items-center justify-center ${config.color}`}>
                      {config.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {transaction.description}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-sm text-slate-600">
                        <Calendar size={14} />
                        {transaction.date}
                        {transaction.reference && (
                          <>
                            <span>•</span>
                            <span>{transaction.reference}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-bold ${
                        isPositive
                          ? 'text-green-600'
                          : 'text-slate-900'
                      }`}
                    >
                      {isPositive ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      {transaction.status === 'COMPLETED'
                        ? 'مكتملة'
                        : 'قيد الانتظار'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
