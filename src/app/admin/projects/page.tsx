/**
 * Admin Projects Management Page
 * List and manage all projects
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search } from 'lucide-react';
import { ProjectsTable } from '@/components/admin/ProjectsTable';

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

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (searchQuery) params.set('search', searchQuery);
        if (selectedStatus !== 'all') params.set('status', selectedStatus);
        if (selectedCategory !== 'all') params.set('category', selectedCategory);
        params.set('page', page.toString());
        params.set('limit', '10');

        const response = await fetch(`/api/admin/projects?${params}`);
        const data = await response.json();

        if (data.success) {
          setProjects(data.projects);
          setTotal(data.total);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchProjects();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedStatus, selectedCategory, page]);

  const handleDelete = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">إدارة المشاريع</h1>
          <p className="text-slate-600 mt-1">
            عدد المشاريع: <span className="font-bold">{total}</span>
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus size={20} />
          إضافة مشروع جديد
        </Link>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Search */}
        <div className="relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="ابحث عن مشروع..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none bg-white text-slate-900"
          />
        </div>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => {
            setSelectedStatus(e.target.value);
            setPage(1);
          }}
          className="px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none bg-white text-slate-900"
        >
          <option value="all">جميع الحالات</option>
          <option value="active">نشط</option>
          <option value="completed">مكتمل</option>
          <option value="cancelled">ملغي</option>
        </select>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setPage(1);
          }}
          className="px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none bg-white text-slate-900"
        >
          <option value="all">جميع الفئات</option>
          <option value="residential">سكني</option>
          <option value="commercial">تجاري</option>
          <option value="industrial">صناعي</option>
          <option value="hotel">فندقي</option>
        </select>
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

      {/* Table */}
      {!loading && (
        <>
          <ProjectsTable projects={projects} onDelete={handleDelete} />

          {/* Pagination */}
          {total > 10 && (
            <div className="mt-8 flex items-center justify-between">
              <p className="text-slate-600">
                عرض {(page - 1) * 10 + 1} إلى {Math.min(page * 10, total)} من {total}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  السابق
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page * 10 >= total}
                  className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  التالي
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
