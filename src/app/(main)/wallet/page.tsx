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
        return { icon: <TrendingUp size={20} />, color: 'text-[#d4b94c]', bg: 'bg-[#c9a227]/30' };
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4b94c] mx-auto" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] pb-16">
      <div className="w-full px-4 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-[#d4b94c] to-[#f5f0e8] mb-2">
            محفظتي المالية
          </h1>
          <p className="text-[#b0a090]">إدارة رصيدك ومعاملاتك المالية</p>
        </div>

        {/* Balance Card */}
        <div className="relative bg-gradient-to-br from-[#c9a227]/20 to-[#d4b94c]/20 border border-[#c9a227]/30 rounded-3xl p-8 mb-8 backdrop-blur-sm overflow-hidden shadow-xl shadow-[#c9a227]/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4b94c]/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#c9a227]/10 rounded-full blur-3xl -z-10"></div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#b0a090] text-sm">الرصيد الحالي</h2>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 rounded-lg hover:bg-[#c9a227]/10 transition-colors"
            >
              {showBalance ? (
                <Eye className="text-[#d4b94c]" size={20} />
              ) : (
                <EyeOff className="text-[#b0a090]" size={20} />
              )}
            </button>
          </div>

          <div className="mb-6">
            {showBalance ? (
              <p className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4b94c] to-[#c9a227] flex items-center gap-2">
                {formatCurrency(wallet.balance)} <RiyalSymbol size={32} />
              </p>
            ) : (
              <p className="text-4xl md:text-5xl font-bold text-[#d4b94c]">
                •••••••
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-4 relative z-10">
            <button
              onClick={() => setShowDepositModal(true)}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-gradient-to-br from-green-900/40 to-green-800/30 border-2 border-green-500/40 hover:border-green-400/60 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 hover:scale-105"
            >
              <Download className="text-green-300" size={28} />
              <span className="text-green-200 text-sm font-bold">إيداع</span>
            </button>

            <button
              onClick={() => setShowWithdrawModal(true)}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-gradient-to-br from-red-900/40 to-red-800/30 border-2 border-red-500/40 hover:border-red-400/60 hover:shadow-xl hover:shadow-red-500/20 transition-all duration-300 hover:scale-105"
            >
              <Upload className="text-red-300" size={28} />
              <span className="text-red-200 text-sm font-bold">سحب</span>
            </button>

            <button className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-gradient-to-br from-[#c9a227]/30 to-[#d4b94c]/20 border-2 border-[#c9a227]/40 hover:border-[#c9a227]/60 hover:shadow-xl hover:shadow-[#c9a227]/30 transition-all duration-300 hover:scale-105">
              <RefreshCw className="text-[#d4b94c]" size={28} />
              <span className="text-[#d4b94c] text-sm font-bold">تحويل</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-[#c9a227]/30 rounded-2xl p-6 backdrop-blur-sm hover:border-[#c9a227]/50 hover:shadow-lg hover:shadow-[#c9a227]/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-green-900/30">
                <ArrowDownRight className="text-green-400" size={20} />
              </div>
              <span className="text-[#b0a090] text-sm">إجمالي الإيداعات</span>
            </div>
            <p className="text-2xl font-bold text-[#f5f0e8] flex items-center gap-2">
              {formatCurrency(wallet.totalDeposits)} <RiyalSymbol size={20} />
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-[#c9a227]/30 rounded-2xl p-6 backdrop-blur-sm hover:border-[#c9a227]/50 hover:shadow-lg hover:shadow-[#c9a227]/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#c9a227]/30 to-[#d4b94c]/20">
                <TrendingUp className="text-[#d4b94c]" size={20} />
              </div>
              <span className="text-[#b0a090] text-sm">إجمالي الاستثمارات</span>
            </div>
            <p className="text-2xl font-bold text-[#f5f0e8] flex items-center gap-2">
              {formatCurrency(wallet.totalInvested)} <RiyalSymbol size={20} />
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-[#c9a227]/30 rounded-2xl p-6 backdrop-blur-sm hover:border-[#c9a227]/50 hover:shadow-lg hover:shadow-[#c9a227]/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-red-900/40 to-red-800/30">
                <ArrowUpRight className="text-red-400" size={20} />
              </div>
              <span className="text-[#b0a090] text-sm">إجمالي السحوبات</span>
            </div>
            <p className="text-2xl font-bold text-[#f5f0e8] flex items-center gap-2">
              {formatCurrency(wallet.totalWithdrawals)} <RiyalSymbol size={20} />
            </p>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="bg-[#1a1a1a]/50 border border-[#c9a227]/30 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-[#f5f0e8] mb-6">المعاملات المالية</h2>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
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
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                  activeTab === tab.value
                    ? 'bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-[#1a1a1a]'
                    : 'bg-[#2a2a2a] text-[#b0a090] hover:bg-[#c9a227]/20 hover:text-[#f5f0e8]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Transactions List */}
          <div className="space-y-3">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#2a2a2a] rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-[#b0a090]" size={32} />
                </div>
                <p className="text-[#b0a090]">لا توجد معاملات</p>
              </div>
            ) : (
              filteredTransactions.map((transaction) => {
                const config = getTransactionIcon(transaction.type);
                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-[#2a2a2a]/50 border border-[#c9a227]/20 hover:border-[#c9a227]/40 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${config.bg}`}>
                        {config.icon}
                      </div>
                      <div>
                        <p className="text-[#f5f0e8] font-semibold">
                          {transaction.description || getTransactionLabel(transaction.type)}
                        </p>
                        <p className="text-[#b0a090] text-xs">
                          {new Date(transaction.createdAt).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                    </div>

                    <div className="text-left">
                      <p className={`font-bold ${config.color} flex items-center gap-1`}>
                        {transaction.type === 'WITHDRAW' || transaction.type === 'INVEST' ? '-' : '+'}
                        {formatCurrency(transaction.amount)} <RiyalSymbol size={14} />
                      </p>
                      <span
                        className={`text-xs ${
                          transaction.status === 'COMPLETED'
                            ? 'text-green-400'
                            : transaction.status === 'PENDING'
                            ? 'text-yellow-400'
                            : 'text-red-400'
                        }`}
                      >
                        {transaction.status === 'COMPLETED' ? 'مكتمل' : transaction.status === 'PENDING' ? 'قيد الانتظار' : 'فشل'}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Deposit Modal */}
        {showDepositModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1a1a1a]/95 border border-[#c9a227]/30 rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold text-[#f5f0e8] mb-6">إيداع رصيد</h3>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-[#b0a090] text-sm mb-2">المبلغ</label>
                  <input
                    type="number"
                    placeholder="1000"
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#c9a227]/30 rounded-lg text-[#f5f0e8] focus:border-[#c9a227] outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-[#1a1a1a] font-bold rounded-lg hover:shadow-lg transition-all">
                  إيداع
                </button>
                <button
                  onClick={() => setShowDepositModal(false)}
                  className="flex-1 py-3 bg-[#2a2a2a] text-[#b0a090] font-bold rounded-lg hover:bg-[#3a3a3a] transition-all"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Withdraw Modal */}
        {showWithdrawModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1a1a1a]/95 border border-[#c9a227]/30 rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold text-[#f5f0e8] mb-6">سحب رصيد</h3>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-[#b0a090] text-sm mb-2">المبلغ</label>
                  <input
                    type="number"
                    placeholder="1000"
                    max={wallet.balance}
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#c9a227]/30 rounded-lg text-[#f5f0e8] focus:border-[#c9a227] outline-none"
                  />
                  <p className="text-[#b0a090] text-xs mt-1 flex items-center gap-1">
                    الرصيد المتاح: {formatCurrency(wallet.balance)} <RiyalSymbol size={12} />
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-[#1a1a1a] font-bold rounded-lg hover:shadow-lg transition-all">
                  سحب
                </button>
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  className="flex-1 py-3 bg-[#2a2a2a] text-[#b0a090] font-bold rounded-lg hover:bg-[#3a3a3a] transition-all"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
