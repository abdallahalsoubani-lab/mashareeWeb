/**
 * Projects/Funds List Page
 * Shows all available investment opportunities
 */

'use client';

import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { EmptyState } from '@/components/dashboard/EmptyState';

interface Project {
  id: string;
  title: string;
  type: string;
  location: string;
  image: string;
  fundedAmount: number;
  targetAmount: number;
  expectedReturn: number;
  durationMonths: number;
  distributionPolicy: string;
  status: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (searchQuery) params.set('search', searchQuery);
        if (selectedCategory !== 'all') params.set('category', selectedCategory);
        if (selectedType !== 'all') params.set('type', selectedType);

        const response = await fetch(`/api/projects?${params.toString()}`);
        const data = await response.json();

        if (data.success) {
          setProjects(data.projects);
          setError(null);
        } else {
          setError(data.error || 'حدث خطأ في تحميل المشاريع');
        }
      } catch (err) {
        setError('فشل الاتصال بالخادم');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchProjects();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, selectedCategory, selectedType]);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          الصناديق الاستثمارية
        </h1>
        <p className="text-slate-600">استكشف فرص الاستثمار المتاحة وابدأ رحلتك</p>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Search Box */}
        <div className="md:col-span-2 relative">
          <Search
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            type="text"
            placeholder="ابحث عن صندوق..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-12 py-3 border border-slate-200 rounded-xl focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors bg-white text-slate-900 placeholder-slate-400"
          />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 border border-slate-200 rounded-xl focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none bg-white text-slate-900"
        >
          <option value="all">جميع الفئات</option>
          <option value="residential">سكني</option>
          <option value="commercial">تجاري</option>
          <option value="industrial">صناعي</option>
          <option value="hotel">فندقي</option>
        </select>

        {/* Type Filter */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-3 border border-slate-200 rounded-xl focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none bg-white text-slate-900"
        >
          <option value="all">جميع الأنواع</option>
          <option value="fund">صندوق عقاري</option>
          <option value="sukuk">صكوك</option>
          <option value="crowdfunding">تمويل جماعي</option>
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            <span className="text-slate-600">جاري تحميل المشاريع...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-700 font-semibold mb-2">حدث خطأ</p>
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Projects Grid */}
      {!loading && !error && (
        <>
          {projects.length === 0 ? (
            <EmptyState
              icon="📊"
              title="لا توجد مشاريع متاحة"
              description="جاري إضافة مشاريع جديدة. يرجى العودة لاحقاً"
            />
          ) : (
            <>
              <p className="text-slate-600 mb-6">
                عدد النتائج: <span className="font-semibold">{projects.length}</span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
