/**
 * Dashboard Layout
 * Main layout for authenticated users with sidebar navigation
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  PieChart,
  Wallet,
  User,
  Menu,
  X,
  Download,
  LogOut,
  ChevronDown,
} from 'lucide-react';
interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size: number }>;
}

const mainNavItems: SidebarItem[] = [
  { label: 'الصناديق الاستثمارية', href: '/projects', icon: Home },
  { label: 'استثماراتي', href: '/investments', icon: PieChart },
  { label: 'محفظتي المالية', href: '/wallet', icon: Wallet },
];

const bottomNavItems: SidebarItem[] = [
  { label: 'الملف الشخصي', href: '/profile', icon: User },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();

        if (data.success) {
          setUser(data.user);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-slate-50 dashboard font-tajawal flex"
    >
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed right-0 top-0 h-full w-64 z-40 flex-col dashboard-sidebar">
        {/* Logo */}
        <Link
          href="/projects"
          className="p-6 flex items-center justify-center gap-3 border-b border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-blue-600 font-bold text-lg">م</span>
          </div>
          <span className="text-white font-bold text-lg">مشاريع</span>
        </Link>

        {/* User Info */}
        <div className="px-4 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="text-white" size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">
                {user.name}
              </p>
              <p className="text-white/60 text-xs truncate">
                {user.role === 'ADMIN' ? 'مدير' : 'مستثمر'}
              </p>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  active
                    ? 'bg-white text-blue-600 font-semibold'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="p-4 space-y-2 border-t border-white/10">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  active
                    ? 'bg-white text-blue-600 font-semibold'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Download App */}
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 transition-all"
          >
            <Download size={20} />
            <span>تحميل التطبيق</span>
          </a>

          {/* Logout */}
          <form
            action="/api/auth/logout"
            method="POST"
            className="w-full"
          >
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 transition-all"
            >
              <LogOut size={20} />
              <span>تسجيل الخروج</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 right-0 left-0 z-50 bg-white border-b border-slate-200 px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-900"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <Link href="/projects" className="text-blue-600 font-bold text-lg">
          مشاريع
        </Link>
        <div className="w-10" />
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        >
          <aside
            className="absolute right-0 top-16 bottom-0 w-64 bg-gradient-to-b from-blue-600 via-blue-700 to-blue-900 dashboard-sidebar flex flex-col overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* User Info */}
            <div className="px-4 py-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {user.name}
                  </p>
                  <p className="text-white/60 text-xs">
                    {user.role === 'ADMIN' ? 'مدير' : 'مستثمر'}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {[...mainNavItems, ...bottomNavItems].map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      active
                        ? 'bg-white text-blue-600 font-semibold'
                        : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 space-y-2 border-t border-white/10">
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 transition-all"
              >
                <Download size={20} />
                <span>تحميل التطبيق</span>
              </a>

              <form action="/api/auth/logout" method="POST" className="w-full">
                <button
                  type="submit"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 transition-all"
                >
                  <LogOut size={20} />
                  <span>تسجيل الخروج</span>
                </button>
              </form>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:mr-64 pt-20 lg:pt-0">
        {/* Top Bar - Desktop Only */}
        <header className="hidden lg:block bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                EN
              </button>
              <button className="p-2 rounded-lg hover:bg-slate-100 relative text-slate-700">
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                🔔
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
