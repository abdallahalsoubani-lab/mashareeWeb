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
    <div className="min-h-screen bg-mesh pb-16">
      <div className="w-full px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header with animation */}
        <div className="mb-10 pt-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 glass rounded-full border-2 border-primary/60 shadow-card">
            <div className="w-2 h-2 rounded-full bg-accent-teal animate-pulse" />
            <span className="text-sm text-text-secondary">فرص استثمارية مميزة</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 gradient-text">
            الصناديق الاستثمارية
          </h1>
          <p className="text-text-muted text-lg max-w-2xl">
            استكشف فرص الاستثمار المتاحة وابدأ رحلتك نحو تحقيق أهدافك المالية
          </p>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
          {/* Search Box */}
          <div className="md:col-span-2 relative group">
            <Search
              className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-400 group-focus-within:text-accent-purple transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="ابحث عن صندوق استثماري..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-4 glass rounded-xl border-2 border-primary/60 focus:border-primary focus:shadow-input-focus outline-none transition-all text-text-primary placeholder-text-dimmed shadow-input"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-4 glass rounded-xl border-2 border-primary/60 focus:border-primary focus:shadow-input-focus outline-none text-text-primary font-semibold cursor-pointer transition-all hover:border-primary shadow-input"
          >
            <option value="all" className="bg-background-secondary">جميع الفئات</option>
            <option value="residential" className="bg-background-secondary">سكني</option>
            <option value="commercial" className="bg-background-secondary">تجاري</option>
            <option value="industrial" className="bg-background-secondary">صناعي</option>
            <option value="hotel" className="bg-background-secondary">فندقي</option>
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-4 glass rounded-xl border-2 border-primary/60 focus:border-primary focus:shadow-input-focus outline-none text-text-primary font-semibold cursor-pointer transition-all hover:border-primary shadow-input"
          >
            <option value="all" className="bg-background-secondary">جميع الأنواع</option>
            <option value="fund" className="bg-background-secondary">صندوق عقاري</option>
            <option value="sukuk" className="bg-background-secondary">صكوك</option>
            <option value="crowdfunding" className="bg-background-secondary">تمويل جماعي</option>
          </select>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20 animate-fade-in-scale">
            <div className="inline-flex flex-col items-center gap-4">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500/20 border-t-primary-500" />
                <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-xl animate-pulse" />
              </div>
              <span className="text-text-secondary font-medium">جاري تحميل المشاريع الاستثمارية...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="glass border border-red-500/30 rounded-2xl p-8 text-center backdrop-blur-sm animate-fade-in-scale">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
              <span className="text-3xl">⚠️</span>
            </div>
            <p className="text-red-400 font-semibold mb-2 text-lg">حدث خطأ</p>
            <p className="text-red-300/80">{error}</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <>
            {projects.length === 0 ? (
              <div className="animate-fade-in-scale">
                <EmptyState
                  icon="📊"
                  title="لا توجد مشاريع متاحة"
                  description="جاري إضافة مشاريع جديدة. يرجى العودة لاحقاً"
                />
              </div>
            ) : (
              <>
                {/* Results count with badge */}
                <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
                  <div className="glass px-4 py-2 rounded-full border border-primary/20 flex items-center gap-2">
                    <span className="text-text-muted text-sm">عدد النتائج:</span>
                    <span className="font-bold text-lg bg-gradient-to-r from-accent-purple to-primary-400 bg-clip-text text-transparent">
                      {projects.length}
                    </span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                </div>

                {/* Projects Grid with stagger animation */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {projects.map((project, index) => (
                    <div key={project.id} className="stagger-item">
                      <ProjectCard {...project} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
