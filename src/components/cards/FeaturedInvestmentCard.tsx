/**
 * Featured Investment Card Component
 * Displays a featured project in the hero section
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import RiyalSymbol from '@/components/ui/RiyalSymbol';
import { MapPin, TrendingUp, Clock, ArrowLeft } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  type: string;
  location: string;
  image: string;
  expectedReturn: number;
  durationMonths: number;
  targetAmount: number;
  fundedAmount: number;
  badges?: string[];
}

export default function FeaturedInvestmentCard() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchFeaturedProject = async () => {
      try {
        const response = await fetch('/api/projects?featured=true&limit=1');
        const data = await response.json();
        if (data.success && data.projects?.length > 0) {
          setProject(data.projects[0]);
          const progressPercent = (data.projects[0].fundedAmount / data.projects[0].targetAmount) * 100;
          setTimeout(() => setProgress(progressPercent), 300);
        }
      } catch (error) {
        console.error('Error fetching featured project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProject();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-sm mx-auto">
        <div className="glass rounded-2xl overflow-hidden border border-primary/30 shadow-glow-md p-8 animate-pulse">
          <div className="h-32 bg-background-tertiary rounded-xl mb-4" />
          <div className="h-4 bg-background-tertiary rounded w-3/4 mb-2" />
          <div className="h-3 bg-background-tertiary rounded w-1/2" />
        </div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  const getBadgeStyle = (badgeType: string) => {
    const styles: Record<string, string> = {
      جديد: 'bg-accent-green/10 text-accent-green border border-accent-green/30',
      مميز: 'bg-accent-orange/10 text-accent-orange border border-accent-orange/30',
      حصري: 'bg-accent-purple/10 text-accent-purple border border-accent-purple/30',
      'عوائد دورية': 'bg-primary-500/10 text-primary-400 border border-primary/30',
      'متوافق مع الشريعة': 'bg-accent-teal/10 text-accent-teal border border-accent-teal/30',
    };
    return styles[badgeType] || 'bg-primary-500/10 text-primary-400 border border-primary/30';
  };

  return (
    <div className="w-full max-w-sm mx-auto animate-slide-in-left">
      <div className="group relative">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-primary rounded-2xl opacity-30 blur-2xl group-hover:opacity-50 transition-all duration-700" />
        
        {/* Card */}
        <div className="relative bg-background-secondary rounded-2xl overflow-hidden border-2 border-primary/40 shadow-glow-gold transition-all duration-500 hover:scale-105">
          {/* Header with image */}
          <div className="relative h-40 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background-card via-background-card/60 to-transparent" />
            
            {/* Badges */}
            {project.badges && project.badges.length > 0 && (
              <div className="absolute top-3 right-3 flex gap-1.5 flex-wrap">
                {project.badges.slice(0, 2).map((badge, index) => (
                  <span
                    key={index}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md ${getBadgeStyle(badge)}`}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}

            {/* Type badge */}
            <div className="absolute top-3 left-3 bg-background-secondary px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border border-primary/30 text-secondary">
              {project.type}
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-4">
            {/* Title */}
            <div>
              <h3 className="text-lg font-bold text-text-primary line-clamp-2 mb-1">
                {project.title}
              </h3>
              <div className="flex items-center gap-1.5 text-text-muted text-sm">
                <MapPin size={14} className="text-primary-400" />
                <span>{project.location}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background-tertiary rounded-lg p-3 border border-primary/10">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp size={14} className="text-primary" />
                  <span className="text-xs text-text-muted">العائد</span>
                </div>
                <p className="text-lg font-bold text-primary">{project.expectedReturn}%</p>
              </div>
              <div className="bg-background-tertiary rounded-lg p-3 border border-primary/10">
                <div className="flex items-center gap-1.5 mb-1">
                  <Clock size={14} className="text-secondary" />
                  <span className="text-xs text-text-muted">المدة</span>
                </div>
                <p className="text-lg font-bold text-white">{project.durationMonths} شهر</p>
              </div>
            </div>

            {/* Progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-text-muted">نسبة التمويل</span>
                <span className="text-sm font-bold text-primary-400">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="relative w-full h-2 bg-background rounded-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-primary rounded-full transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-text-muted mt-2 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  {new Intl.NumberFormat('ar-SA').format(project.fundedAmount)}
                  <RiyalSymbol size={10} className="text-primary-400" />
                </span>
                <span>من {new Intl.NumberFormat('ar-SA').format(project.targetAmount)}</span>
              </p>
            </div>

            {/* CTA Button */}
            <Link href={`/projects/${project.id}`}>
              <button className="w-full group/btn relative py-3 px-4 rounded-xl font-bold text-sm overflow-hidden transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#8F7F5E', color: '#0A0A0A', boxShadow: '0 0 35px rgba(143, 127, 94, 0.4)' }}>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>استثمر الآن</span>
                  <ArrowLeft size={16} className="group-hover/btn:-translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
