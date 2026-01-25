/**
 * Admin Dashboard Overview Page
 * Shows key statistics and recent activity
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, Building2, PieChart, Wallet, ArrowRight } from 'lucide-react';
import { StatsCard } from '@/components/admin/StatsCard';

interface Stats {
  users: { total: number; newThisMonth: number };
  projects: { active: number; completed: number };
  investments: { count: number; total: number };
  totalFunded: number;
}

interface RecentActivity {
  users: Array<{
    id: string;
    name: string;
    email: string;
    createdAt: string;
    role: string;
  }>;
  investments: Array<{
    id: string;
    user: { name: string; email: string };
    project: { title: string };
    amount: number;
    createdAt: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        const data = await response.json();

        if (data.success) {
          setStats(data.stats);
          setRecentActivity(data.recentActivity);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="text-center py-20 animate-fade-in-scale">
        <div className="inline-flex flex-col items-center gap-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500/20 border-t-primary-500" />
            <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-xl animate-pulse" />
          </div>
          <span className="text-text-secondary font-medium">جاري تحميل البيانات...</span>
        </div>
      </div>
    );
  }

  if (!stats || !recentActivity) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted">فشل تحميل الإحصائيات</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-10 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 glass rounded-full border border-primary/20">
          <div className="w-2 h-2 rounded-full bg-accent-purple animate-pulse" />
          <span className="text-sm text-text-secondary font-medium">لوحة التحكم الإدارية</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">نظرة عامة</h1>
        <p className="text-text-muted text-lg">ملخص أداء النظام والأنشطة الحديثة</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="إجمالي المستخدمين"
          value={stats.users.total}
          subtitle={`${stats.users.newThisMonth} جديد هذا الشهر`}
          icon={<Users size={24} />}
          color="blue"
        />

        <StatsCard
          title="المشاريع النشطة"
          value={stats.projects.active}
          subtitle={`${stats.projects.completed} مكتمل`}
          icon={<Building2 size={24} />}
          color="green"
        />

        <StatsCard
          title="إجمالي الاستثمارات"
          value={stats.investments.count}
          subtitle={formatCurrency(stats.investments.total)}
          icon={<PieChart size={24} />}
          color="purple"
        />

        <StatsCard
          title="المبالغ المجمعة"
          value={formatCurrency(stats.totalFunded)}
          icon={<Wallet size={24} />}
          color="orange"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Users */}
        <div className="group relative animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500" />
          <div className="relative glass rounded-2xl overflow-hidden border border-primary/20 group-hover:border-primary/30 transition-all duration-300">
            <div className="px-6 py-4 border-b border-primary/20 flex items-center justify-between">
              <h3 className="text-lg font-bold text-text-primary">آخر التسجيلات</h3>
              <Link
                href="/admin/users"
                className="text-primary-400 hover:text-accent-teal font-semibold text-sm flex items-center gap-1 transition-colors"
              >
                عرض الكل <ArrowRight size={16} />
              </Link>
            </div>

            <div className="divide-y divide-primary/10">
              {recentActivity.users.length === 0 ? (
                <div className="p-6 text-center text-text-muted">
                  لا توجد تسجيلات حديثة
                </div>
              ) : (
                recentActivity.users.map((user) => (
                  <div
                    key={user.id}
                    className="px-6 py-4 hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-text-primary">{user.name}</p>
                        <p className="text-sm text-text-muted">{user.email}</p>
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-text-muted">
                          {new Date(user.createdAt).toLocaleDateString('ar-SA')}
                        </p>
                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-lg mt-1 ${
                          user.role === 'ADMIN' 
                            ? 'bg-accent-purple/10 text-accent-purple border border-accent-purple/30' 
                            : 'bg-primary/10 text-primary-400 border border-primary/30'
                        }`}>
                          {user.role === 'ADMIN' ? 'مسؤول' : 'مستثمر'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Recent Investments */}
        <div className="group relative animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500" />
          <div className="relative glass rounded-2xl overflow-hidden border border-primary/20 group-hover:border-primary/30 transition-all duration-300">
            <div className="px-6 py-4 border-b border-primary/20 flex items-center justify-between">
              <h3 className="text-lg font-bold text-text-primary">آخر الاستثمارات</h3>
              <Link
                href="/admin/investments"
                className="text-primary-400 hover:text-accent-teal font-semibold text-sm flex items-center gap-1 transition-colors"
              >
                عرض الكل <ArrowRight size={16} />
              </Link>
            </div>

            <div className="divide-y divide-primary/10">
              {recentActivity.investments.length === 0 ? (
                <div className="p-6 text-center text-text-muted">
                  لا توجد استثمارات حديثة
                </div>
              ) : (
                recentActivity.investments.map((inv: any) => (
                  <div
                    key={inv.id}
                    className="px-6 py-4 hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-text-primary">
                          {inv.user.name}
                        </p>
                        <p className="text-sm text-text-muted">
                          {inv.project.title}
                        </p>
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-accent-teal">
                          {formatCurrency(inv.amount)}
                        </p>
                        <p className="text-xs text-text-muted mt-1">
                          {new Date(inv.createdAt).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
