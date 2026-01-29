/**
 * Admin Sidebar Component
 * Navigation for admin dashboard
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  Users,
  PieChart,
  FileText,
  LogOut,
  Shield,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

interface AdminSidebarProps {
  userEmail: string;
}

const menuItems = [
  {
    label: 'نظرة عامة',
    href: '/admin',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: 'المشاريع',
    href: '/admin/projects',
    icon: Building2,
  },
  {
    label: 'المستخدمين',
    href: '/admin/users',
    icon: Users,
  },
  {
    label: 'الاستثمارات',
    href: '/admin/investments',
    icon: PieChart,
  },
  {
    label: 'سجل العمليات',
    href: '/admin/audit-logs',
    icon: FileText,
  },
];

export function AdminSidebar({ userEmail }: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) => {
    const p = pathname ?? '';
    if (exact) {
      return p === href;
    }
    return p.startsWith(href);
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-primary/20">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-1 bg-primary rounded-xl blur-md opacity-40" />
            <div className="relative w-16 h-16 shadow-glow-gold">
              <img src="/logo-icon.png" alt="صخر" className="w-full h-full object-contain" />
            </div>
          </div>
          <div>
            <p className="font-bold text-lg text-white">لوحة التحكم</p>
            <p className="text-secondary text-xs">صخر Admin</p>
          </div>
        </div>
      </div>

      {/* Admin Info */}
      <div className="p-4 border-b border-primary/20">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-background-tertiary border border-primary/10 hover:border-primary/30 transition-all">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-glow-gold">
            <Shield className="text-background" size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-white truncate">
              {userEmail.split('@')[0]}
            </p>
            <p className="text-secondary text-xs">مسؤول النظام</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group relative ${
                active
                  ? 'bg-primary text-background font-semibold shadow-glow-gold'
                  : 'text-secondary hover:text-white hover:bg-primary/10 border border-transparent hover:border-primary/20'
              }`}
            >
              <Icon size={20} className="relative z-10" />
              <span className="font-medium relative z-10">{item.label}</span>
              {active && <ChevronRight size={18} className="ml-auto relative z-10" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-primary/20 space-y-2">
        <Link
          href="/projects"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:text-text-primary hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20"
        >
          <Building2 size={20} />
          <span className="font-medium">عرض الموقع</span>
        </Link>
        <form action="/api/auth/logout" method="POST" className="w-full">
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
          >
            <LogOut size={20} />
            <span className="font-medium">تسجيل الخروج</span>
          </button>
        </form>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed right-0 top-0 h-full w-64 glass border-l border-primary/20 shadow-2xl z-40 flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 right-0 left-0 z-50 glass border-b border-primary/20 px-4 py-3 flex items-center justify-between backdrop-blur-xl shadow-lg">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl hover:bg-primary/10 text-text-primary transition-all border border-primary/10"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary">
            <Shield size={18} className="text-background" />
          </div>
          <span className="font-bold text-primary">لوحة التحكم</span>
        </div>
        <div className="w-10" />
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm pt-16 animate-fade-in-scale"
          onClick={() => setMobileOpen(false)}
        >
          <aside className="absolute right-0 top-16 bottom-0 w-64 glass border-l border-primary/20 flex flex-col overflow-y-auto shadow-2xl animate-slide-in-right">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
