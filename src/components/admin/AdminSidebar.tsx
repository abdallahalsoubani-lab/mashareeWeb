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
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield size={20} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-lg text-white">لوحة التحكم</p>
            <p className="text-slate-400 text-xs">مشاريع Admin</p>
          </div>
        </div>
      </div>

      {/* Admin Info */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
            <Shield className="text-blue-400" size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-white truncate">
              {userEmail.split('@')[0]}
            </p>
            <p className="text-slate-400 text-xs">مسؤول النظام</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                active
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
              {active && <ChevronRight size={18} className="ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-700 space-y-1">
        <Link
          href="/projects"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
        >
          <Building2 size={20} />
          <span>عرض الموقع</span>
        </Link>
        <form action="/api/auth/logout" method="POST" className="w-full">
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={20} />
            <span>تسجيل الخروج</span>
          </button>
        </form>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed right-0 top-0 h-full w-64 bg-slate-900 text-white z-40 flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 right-0 left-0 z-50 bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-700">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg hover:bg-slate-800"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="flex items-center gap-2">
          <Shield size={20} className="text-blue-400" />
          <span className="font-bold">لوحة التحكم</span>
        </div>
        <div className="w-10" />
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 pt-16"
          onClick={() => setMobileOpen(false)}
        >
          <aside className="absolute right-0 top-16 bottom-0 w-64 bg-slate-900 text-white flex flex-col overflow-y-auto">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
