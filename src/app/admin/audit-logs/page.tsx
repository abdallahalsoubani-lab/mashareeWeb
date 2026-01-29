/**
 * Admin Audit Logs Page
 * Track all admin operations
 */

'use client';

import { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';

interface AuditLog {
  id: string;
  User: { email: string };
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  entity: string;
  entityId: string;
  createdAt: string;
  metadata?: Record<string, any>;
}

const actionColors: Record<string, string> = {
  CREATE: 'bg-green-100 text-green-700',
  UPDATE: 'bg-yellow-100 text-yellow-700',
  DELETE: 'bg-red-100 text-red-700',
};

const actionLabels: Record<string, string> = {
  CREATE: 'إنشاء',
  UPDATE: 'تحديث',
  DELETE: 'حذف',
};

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedEntity, setSelectedEntity] = useState('all');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (selectedAction !== 'all') params.set('action', selectedAction);
        if (selectedEntity !== 'all') params.set('entity', selectedEntity);

        const response = await fetch(`/api/admin/audit-logs?${params}`);
        const data = await response.json();

        if (data.success) {
          setLogs(data.logs);
        }
      } catch (error) {
        console.error('Error fetching logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [selectedAction, selectedEntity]);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">سجل العمليات</h1>
        <p className="text-slate-600 mt-1">
          إجمالي العمليات: <span className="font-bold">{logs.length}</span>
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <select
          value={selectedAction}
          onChange={(e) => setSelectedAction(e.target.value)}
          className="px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none bg-white text-slate-900"
        >
          <option value="all">جميع العمليات</option>
          <option value="CREATE">إنشاء</option>
          <option value="UPDATE">تحديث</option>
          <option value="DELETE">حذف</option>
        </select>

        <select
          value={selectedEntity}
          onChange={(e) => setSelectedEntity(e.target.value)}
          className="px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none bg-white text-slate-900"
        >
          <option value="all">جميع الكيانات</option>
          <option value="User">مستخدم</option>
          <option value="Project">مشروع</option>
          <option value="Investment">استثمار</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">#</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">المسؤول</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">العملية</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">الكيان</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">التاريخ والوقت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log, index) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-500">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-slate-900">{log.User.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        actionColors[log.action] || 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {actionLabels[log.action] || log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div>
                      <p className="text-slate-900">{log.entity}</p>
                      <p className="text-slate-500 text-xs">{log.entityId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(log.createdAt).toLocaleString('ar-SA')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {logs.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            {loading ? 'جاري التحميل...' : 'لا توجد سجلات'}
          </div>
        )}
      </div>
    </div>
  );
}
