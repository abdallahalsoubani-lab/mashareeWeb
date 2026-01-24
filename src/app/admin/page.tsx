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
      <div className="text-center py-12">
        <div className="inline-flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          <span className="text-slate-600">جاري التحميل...</span>
        </div>
      </div>
    );
  }

  if (!stats || !recentActivity) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">فشل تحميل الإحصائيات</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">نظرة عامة</h1>
        <p className="text-slate-600 mt-2">ملخص أداء النظام والأنشطة الحديثة</p>
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
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">آخر التسجيلات</h3>
            <Link
              href="/admin/users"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
            >
              عرض الكل <ArrowRight size={16} />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentActivity.users.length === 0 ? (
              <div className="p-6 text-center text-slate-500">
                لا توجد تسجيلات حديثة
              </div>
            ) : (
              recentActivity.users.map((user) => (
                <div
                  key={user.id}
                  className="px-6 py-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-slate-900">{user.name}</p>
                      <p className="text-sm text-slate-500">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">
                        {new Date(user.createdAt).toLocaleDateString(
                          'ar-SA'
                        )}
                      </p>
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-slate-100 text-slate-700 mt-1">
                        {user.role === 'ADMIN' ? 'مسؤول' : 'مستثمر'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Investments */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">آخر الاستثمارات</h3>
            <Link
              href="/admin/investments"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
            >
              عرض الكل <ArrowRight size={16} />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentActivity.investments.length === 0 ? (
              <div className="p-6 text-center text-slate-500">
                لا توجد استثمارات حديثة
              </div>
            ) : (
              recentActivity.investments.map((inv: any) => (
                <div
                  key={inv.id}
                  className="px-6 py-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-slate-900">
                        {inv.user.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {inv.project.title}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900">
                        {formatCurrency(inv.amount)}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {new Date(inv.createdAt).toLocaleDateString(
                          'ar-SA'
                        )}
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
  );
}
