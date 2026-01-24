/**
 * Admin Investments Management Page
 */

'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface Investment {
  id: string;
  user: { name: string; email: string };
  project: { title: string };
  amount: number;
  units?: number;
  status: string;
  returns: number;
  createdAt: string;
}

export default function AdminInvestmentsPage() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (searchQuery) params.set('search', searchQuery);

        const response = await fetch(`/api/admin/investments?${params}`);
        const data = await response.json();

        if (data.success) {
          setInvestments(data.investments);
        }
      } catch (error) {
        console.error('Error fetching investments:', error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchInvestments();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">إدارة الاستثمارات</h1>
        <p className="text-slate-600 mt-1">
          عدد الاستثمارات: <span className="font-bold">{investments.length}</span>
        </p>
      </div>

      {/* Search */}
      <div className="mb-8 max-w-md relative">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="ابحث عن استثمار..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none bg-white text-slate-900"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">#</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">المستثمر</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">المشروع</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">المبلغ</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">الوحدات</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">العوائد</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">الحالة</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">التاريخ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {investments.map((inv, index) => (
                <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-500">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-900">{inv.user.name}</p>
                      <p className="text-sm text-slate-500">{inv.user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900">{inv.project.title}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {formatCurrency(inv.amount)}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{inv.units || '-'}</td>
                  <td className="px-6 py-4 text-sm font-medium text-green-600">
                    {formatCurrency(inv.returns)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      inv.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {inv.status === 'ACTIVE' ? 'نشط' : 'مكتمل'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(inv.createdAt).toLocaleDateString('ar-SA')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {investments.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            {loading ? 'جاري التحميل...' : 'لا توجد استثمارات'}
          </div>
        )}
      </div>
    </div>
  );
}
