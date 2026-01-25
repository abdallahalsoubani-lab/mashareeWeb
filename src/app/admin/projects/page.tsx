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
      <div className="mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fade-in-up">
        <div>
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 glass rounded-full border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-accent-purple animate-pulse" />
            <span className="text-sm text-text-secondary font-medium">إدارة المحتوى</span>
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-2">إدارة المشاريع</h1>
          <p className="text-text-muted">
            عدد المشاريع: <span className="font-bold text-primary-400">{total}</span>
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="group relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal text-white rounded-xl font-bold transition-all duration-300 hover:shadow-glow-md hover:scale-105 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Plus size={20} />
            إضافة مشروع جديد
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-accent-teal via-primary-600 to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
        {/* Search */}
        <div className="relative group">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-400 group-focus-within:text-accent-purple transition-colors" size={20} />
          <input
            type="text"
            placeholder="ابحث عن مشروع..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            className="w-full pl-4 pr-12 py-4 glass rounded-xl border border-primary/20 focus:border-primary-400 focus:shadow-glow-sm outline-none text-text-primary placeholder-text-dimmed transition-all"
          />
        </div>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => {
            setSelectedStatus(e.target.value);
            setPage(1);
          }}
          className="px-4 py-4 glass rounded-xl border border-primary/20 focus:border-primary-400 focus:shadow-glow-sm outline-none text-text-primary font-semibold cursor-pointer transition-all hover:border-primary/40"
        >
          <option value="all" className="bg-background-secondary">جميع الحالات</option>
          <option value="active" className="bg-background-secondary">نشط</option>
          <option value="completed" className="bg-background-secondary">مكتمل</option>
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
