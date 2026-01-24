/**
 * Admin Projects Table Component
 * Displays projects with CRUD actions
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Edit, Trash2, Eye } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  type: string;
  location: string;
  image: string;
  targetAmount: number;
  fundedAmount: number;
  status: string;
  isActive: boolean;
}

interface ProjectsTableProps {
  projects: Project[];
  onDelete?: (id: string) => void;
}

export function ProjectsTable({ projects, onDelete }: ProjectsTableProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setDeleting(id);
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        onDelete?.(id);
        router.refresh();
      } else {
        alert(data.error || 'فشل حذف المشروع');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('حدث خطأ في حذف المشروع');
    } finally {
      setDeleting(null);
      setDeleteConfirm(null);
    }
  };

  const getStatusBadge = (status: string, isActive: boolean) => {
    if (!isActive) {
      return { text: 'معطل', color: 'bg-slate-100 text-slate-600' };
    }

    switch (status) {
      case 'active':
        return { text: 'نشط', color: 'bg-green-100 text-green-700' };
      case 'completed':
        return { text: 'مكتمل', color: 'bg-blue-100 text-blue-700' };
      case 'cancelled':
        return { text: 'ملغي', color: 'bg-red-100 text-red-700' };
      default:
        return { text: status, color: 'bg-slate-100 text-slate-600' };
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">#</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                المشروع
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                النوع
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                الموقع
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                المستهدف
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                المجمع
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                الإنجاز
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                الحالة
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {projects.map((project, index) => {
              const progress = Math.round(
                (project.fundedAmount / project.targetAmount) * 100
              );
              const status = getStatusBadge(project.status, project.isActive);

              return (
                <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <span className="font-medium text-slate-900">
                        {project.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {project.type}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {project.location}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                    {formatCurrency(project.targetAmount)}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                    {formatCurrency(project.fundedAmount)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-600 w-10">
                        {progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}
                    >
                      {status.text}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                        title="تعديل"
                      >
                        <Edit size={18} />
                      </Link>
                      <Link
                        href={`/projects/${project.id}`}
                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                        title="عرض"
                        target="_blank"
                      >
                        <Eye size={18} />
                      </Link>
                      <div className="relative group">
                        <button
                          onClick={() => setDeleteConfirm(project.id)}
                          disabled={deleting === project.id}
                          className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors disabled:opacity-50"
                          title="حذف"
                        >
                          <Trash2 size={18} />
                        </button>

                        {deleteConfirm === project.id && (
                          <div className="absolute left-0 top-full mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-10 whitespace-nowrap">
                            <p className="px-3 py-2 text-sm text-slate-700">
                              هل أنت متأكد؟
                            </p>
                            <div className="flex gap-2 px-3 pb-2">
                              <button
                                onClick={() =>
                                  handleDelete(project.id)
                                }
                                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                              >
                                حذف
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="px-3 py-1 bg-slate-200 text-slate-700 text-sm rounded hover:bg-slate-300"
                              >
                                إلغاء
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {projects.length === 0 && (
        <div className="p-12 text-center text-slate-500">
          <p>لا توجد مشاريع</p>
        </div>
      )}
    </div>
  );
}
