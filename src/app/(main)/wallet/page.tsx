/**
 * Wallet / Financial Page
 * Shows user's account balance and transaction history
 */

'use client';

import { useState, useEffect } from 'react';
import RiyalSymbol from '@/components/ui/RiyalSymbol';
import {
  Eye,
  EyeOff,
  ArrowDownRight,
  ArrowUpRight,
  Plus,
  Minus,
  TrendingUp,
  Download,
  Upload,
  RefreshCw,
} from 'lucide-react';

interface Transaction {
  id: string;
  type: string;
  amount: number;
  status: string;
  description: string;
  createdAt: string;
  reference?: string;
}

interface WalletData {
  balance: number;
  totalDeposits: number;
  totalWithdrawals: number;
  totalInvested: number;
}

export default function WalletPage() {
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [wallet, setWallet] = useState<WalletData>({
    balance: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    totalInvested: 0,
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/wallet');
      const data = await response.json();

      if (data.success) {
        setWallet({
          balance: data.wallet.balance,
          totalDeposits: data.wallet.totalDeposits || 0,
          totalWithdrawals: data.wallet.totalWithdrawals || 0,
          totalInvested: data.wallet.totalInvested || 0,
        });
        setTransactions(data.transactions || []);
      }
    } catch (error) {
      console.error('Error fetching wallet:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA').format(amount);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'DEPOSIT':
        return { icon: <ArrowDownRight size={20} />, color: 'text-green-400', bg: 'bg-green-900/30' };
      case 'WITHDRAW':
        return { icon: <ArrowUpRight size={20} />, color: 'text-red-400', bg: 'bg-red-900/30' };
      case 'INVEST':
        return { icon: <TrendingUp size={20} />, color: 'text-primary-400', bg: 'bg-primary/10' };
      case 'RETURN':
      case 'DIVIDEND':
        return { icon: <Plus size={20} />, color: 'text-purple-400', bg: 'bg-purple-900/30' };
      default:
        return { icon: <RefreshCw size={20} />, color: 'text-[#b0a090]', bg: 'bg-[#2a2a2a]' };
    }
  };

  const getTransactionLabel = (type: string) => {
    const labels: Record<string, string> = {
      DEPOSIT: 'إيداع',
      WITHDRAW: 'سحب',
      INVEST: 'استثمار',
      RETURN: 'عوائد',
      DIVIDEND: 'توزيعات',
    };
    return labels[type] || type;
  };

  const filteredTransactions = transactions.filter(
    (tx) => activeTab === 'all' || tx.type === activeTab.toUpperCase()
  );

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500/20 border-t-primary-500" />
          <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mesh pb-16">
      <div className="w-full px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 pt-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 glass rounded-full border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-accent-teal animate-pulse" />
            <span className="text-sm text-text-secondary">إدارة أموالك</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 gradient-text">
            محفظتي المالية
          </h1>
          <p className="text-text-muted text-lg">إدارة رصيدك ومعاملاتك المالية بسهولة</p>
        </div>

        {/* Balance Card */}
        <div className="relative group animate-fade-in-scale" style={{ animationDelay: '0.2s' }}>
          <div className="absolute -inset-1 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal rounded-3xl opacity-30 blur-2xl group-hover:opacity-50 transition-all duration-500" />
          <div className="relative glass border border-primary/30 rounded-3xl p-8 mb-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent-purple/10 via-primary-500/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent-teal/10 via-primary-500/10 to-transparent rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-text-muted text-sm font-medium">الرصيد الحالي</h2>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-2.5 rounded-xl glass hover:bg-primary/10 transition-all border border-primary/10 hover:border-primary/30"
                >
                  {showBalance ? (
                    <Eye className="text-primary-400" size={20} />
                  ) : (
                    <EyeOff className="text-text-muted" size={20} />
                  )}
                </button>
              </div>

              <div className="mb-8">
                {showBalance ? (
                  <p className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-accent-purple via-primary-400 to-accent-teal bg-clip-text text-transparent flex items-center gap-3">
                    {formatCurrency(wallet.balance)} <RiyalSymbol size={40} className="text-primary-400" />
                  </p>
                ) : (
                  <p className="text-4xl md:text-6xl font-bold text-text-primary">
                    •••••••
                  </p>
                )}
              </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setShowDepositModal(true)}
              className="group/btn relative flex flex-col items-center gap-3 p-6 rounded-2xl glass border border-accent-green/30 hover:border-accent-green hover:shadow-glow-teal transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-green/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              <Download className="text-accent-green relative z-10" size={28} />
              <span className="text-accent-green text-sm font-bold relative z-10">إيداع</span>
            </button>

            <button
              onClick={() => setShowWithdrawModal(true)}
              className="group/btn relative flex flex-col items-center gap-3 p-6 rounded-2xl glass border border-accent-pink/30 hover:border-accent-pink hover:shadow-glow-md transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-pink/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              <Upload className="text-accent-pink relative z-10" size={28} />
              <span className="text-accent-pink text-sm font-bold relative z-10">سحب</span>
            </button>

            <button className="group/btn relative flex flex-col items-center gap-3 p-6 rounded-2xl glass border border-primary-400/30 hover:border-primary-400 hover:shadow-glow-md transition-all duration-300 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              <RefreshCw className="text-primary-400 relative z-10" size={28} />
              <span className="text-primary-400 text-sm font-bold relative z-10">تحويل</span>
            </button>
          </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-green to-accent-teal rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500" />
            <div className="relative glass rounded-2xl p-6 border border-accent-green/20 group-hover:border-accent-green/40 hover:shadow-glow-teal transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-accent-green/10 border border-accent-green/20">
                  <ArrowDownRight className="text-accent-green" size={20} />
                </div>
                <span className="text-text-muted text-sm font-medium">إجمالي الإيداعات</span>
              </div>
              <p className="text-2xl font-bold text-text-primary flex items-center gap-2">
                {formatCurrency(wallet.totalDeposits)} <RiyalSymbol size={20} className="text-accent-green" />
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-purple to-primary-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500" />
            <div className="relative glass rounded-2xl p-6 border border-primary/20 group-hover:border-primary/40 hover:shadow-glow-md transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                  <TrendingUp className="text-primary-400" size={20} />
                </div>
                <span className="text-text-muted text-sm font-medium">إجمالي الاستثمارات</span>
              </div>
              <p className="text-2xl font-bold text-text-primary flex items-center gap-2">
                {formatCurrency(wallet.totalInvested)} <RiyalSymbol size={20} className="text-primary-400" />
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-pink to-accent-orange rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500" />
            <div className="relative glass rounded-2xl p-6 border border-accent-pink/20 group-hover:border-accent-pink/40 hover:shadow-glow-md transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-accent-pink/10 border border-accent-pink/20">
                  <ArrowUpRight className="text-accent-pink" size={20} />
                </div>
                <span className="text-text-muted text-sm font-medium">إجمالي السحوبات</span>
              </div>
              <p className="text-2xl font-bold text-text-primary flex items-center gap-2">
                {formatCurrency(wallet.totalWithdrawals)} <RiyalSymbol size={20} className="text-accent-pink" />
              </p>
            </div>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="glass border border-primary/20 rounded-2xl p-6 md:p-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">المعاملات المالية</h2>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { value: 'all', label: 'الكل' },
              { value: 'deposit', label: 'إيداع' },
              { value: 'withdraw', label: 'سحب' },
              { value: 'invest', label: 'استثمار' },
              { value: 'return', label: 'عوائد' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`relative px-5 py-2.5 rounded-xl font-bold text-sm transition-all overflow-hidden ${
                  activeTab === tab.value
                    ? 'bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal text-white shadow-glow-sm'
                    : 'glass text-text-muted hover:text-text-primary border border-primary/20 hover:border-primary/40'
                }`}
              >
                <span className="relative z-10">{tab.label}</span>
                {activeTab === tab.value && (
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-teal via-primary-600 to-accent-purple opacity-0 hover:opacity-100 transition-opacity duration-500" />
                )}
              </button>
            ))}
          </div>

          {/* Transactions List */}
          <div className="space-y-3">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-16">
                <div className="relative w-20 h-20 glass rounded-3xl flex items-center justify-center mx-auto mb-6 border border-primary/20 animate-float">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/20 to-primary-500/20 rounded-3xl blur-xl" />
                  <TrendingUp className="text-text-muted relative z-10" size={40} />
                </div>
                <p className="text-text-muted text-lg">لا توجد معاملات</p>
              </div>
            ) : (
              filteredTransactions.map((transaction, index) => {
                const config = getTransactionIcon(transaction.type);
                return (
                  <div
                    key={transaction.id}
                    className="group relative stagger-item"
                    style={{ animationDelay: `${0.05 * index}s` }}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal rounded-xl opacity-0 group-hover:opacity-10 blur transition-all duration-300" />
                    <div className="relative flex items-center justify-between p-4 rounded-xl glass border border-primary/10 group-hover:border-primary/30 transition-all">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${config.bg} border ${config.color.replace('text-', 'border-')}/30`}>
                          {config.icon}
                        </div>
                        <div>
                          <p className="text-text-primary font-semibold">
                            {transaction.description || getTransactionLabel(transaction.type)}
                          </p>
                          <p className="text-text-muted text-xs mt-1">
                            {new Date(transaction.createdAt).toLocaleDateString('ar-SA')}
                          </p>
                        </div>
                      </div>

                      <div className="text-left">
                        <p className={`font-bold ${config.color} flex items-center gap-1 text-lg`}>
                          {transaction.type === 'WITHDRAW' || transaction.type === 'INVEST' ? '-' : '+'}
                          {formatCurrency(transaction.amount)} <RiyalSymbol size={16} />
                        </p>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-lg ${
                            transaction.status === 'COMPLETED'
                              ? 'text-accent-green bg-accent-green/10'
                              : transaction.status === 'PENDING'
                              ? 'text-accent-orange bg-accent-orange/10'
                              : 'text-accent-pink bg-accent-pink/10'
                          }`}
                        >
                          {transaction.status === 'COMPLETED' ? 'مكتمل' : transaction.status === 'PENDING' ? 'قيد الانتظار' : 'فشل'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Deposit Modal */}
        {showDepositModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in-scale">
            <div className="relative max-w-md w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-green to-accent-teal rounded-2xl opacity-50 blur-xl" />
              <div className="relative glass border border-accent-green/30 rounded-2xl p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-6 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-accent-green/10 border border-accent-green/30">
                    <Download className="text-accent-green" size={24} />
                  </div>
                  <span>إيداع رصيد</span>
                </h3>
                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-text-secondary text-sm mb-2 font-medium">المبلغ</label>
                    <input
                      type="number"
                      placeholder="1000"
                      className="w-full px-4 py-4 glass border border-primary/20 rounded-xl text-text-primary focus:border-accent-green focus:shadow-glow-teal outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 py-4 bg-gradient-to-r from-accent-green to-accent-teal text-white font-bold rounded-xl hover:shadow-glow-teal transition-all hover:scale-105">
                    إيداع
                  </button>
                  <button
                    onClick={() => setShowDepositModal(false)}
                    className="flex-1 py-4 glass text-text-muted hover:text-text-primary font-bold rounded-xl border border-primary/20 hover:border-primary/40 transition-all"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Withdraw Modal */}
        {showWithdrawModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in-scale">
            <div className="relative max-w-md w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-pink to-accent-orange rounded-2xl opacity-50 blur-xl" />
              <div className="relative glass border border-accent-pink/30 rounded-2xl p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-6 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-accent-pink/10 border border-accent-pink/30">
                    <Upload className="text-accent-pink" size={24} />
                  </div>
                  <span>سحب رصيد</span>
                </h3>
                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-text-secondary text-sm mb-2 font-medium">المبلغ</label>
                    <input
                      type="number"
                      placeholder="1000"
                      max={wallet.balance}
                      className="w-full px-4 py-4 glass border border-primary/20 rounded-xl text-text-primary focus:border-accent-pink focus:shadow-glow-md outline-none transition-all"
                    />
                    <p className="text-text-muted text-xs mt-2 flex items-center gap-1">
                      الرصيد المتاح: {formatCurrency(wallet.balance)} <RiyalSymbol size={12} className="text-primary-400" />
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 py-4 bg-gradient-to-r from-accent-pink to-accent-orange text-white font-bold rounded-xl hover:shadow-glow-md transition-all hover:scale-105">
                    سحب
                  </button>
                  <button
                    onClick={() => setShowWithdrawModal(false)}
                    className="flex-1 py-4 glass text-text-muted hover:text-text-primary font-bold rounded-xl border border-primary/20 hover:border-primary/40 transition-all"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
