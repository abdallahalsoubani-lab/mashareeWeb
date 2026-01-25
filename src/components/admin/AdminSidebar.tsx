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
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-primary/20">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-purple to-primary-500 rounded-xl blur-md opacity-50" />
            <div className="relative w-10 h-10 bg-gradient-to-br from-accent-purple to-primary-500 rounded-xl flex items-center justify-center shadow-glow-sm">
              <Shield size={20} className="text-white" />
            </div>
          </div>
          <div>
            <p className="font-bold text-lg text-text-primary">لوحة التحكم</p>
            <p className="text-text-muted text-xs">مشاريع Admin</p>
          </div>
        </div>
      </div>

      {/* Admin Info */}
      <div className="p-4 border-b border-primary/20">
        <div className="flex items-center gap-3 p-3 rounded-xl glass border border-primary/10 hover:border-primary/30 transition-all">
          <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-primary-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-glow-sm">
            <Shield className="text-white" size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-text-primary truncate">
              {userEmail.split('@')[0]}
            </p>
            <p className="text-text-muted text-xs">مسؤول النظام</p>
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
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group relative overflow-hidden ${
                active
                  ? 'bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal text-white font-semibold shadow-glow-sm'
                  : 'text-text-muted hover:text-text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20'
              }`}
            >
              {active && (
                <div className="absolute inset-0 bg-gradient-to-r from-accent-teal via-primary-600 to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
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
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-accent-purple to-primary-500">
            <Shield size={18} className="text-white" />
          </div>
          <span className="font-bold bg-gradient-to-r from-accent-purple to-primary-400 bg-clip-text text-transparent">لوحة التحكم</span>
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
