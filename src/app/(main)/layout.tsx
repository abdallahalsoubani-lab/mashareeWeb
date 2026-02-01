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
  { label: 'الحاسبة الاستثمارية', href: '/calculator', icon: PieChart },
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
      <div className="min-h-screen bg-mesh flex items-center justify-center">
        <div className="text-center animate-fade-in-scale">
          <div className="relative mx-auto mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500/20 border-t-primary-500" />
            <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-xl animate-pulse" />
          </div>
          <p className="text-text-secondary text-lg font-medium">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const isActive = (href: string) => {
    const p = pathname ?? '';
    return p === href || p.startsWith(href + '/');
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-mesh dashboard font-tajawal flex"
    >
      {/* Desktop Sidebar - يبدأ تحت الـ navbar */}
      <aside className="hidden lg:flex fixed right-0 top-16 h-[calc(100vh-4rem)] w-64 z-40 flex-col glass border-l border-primary/20 shadow-2xl">
        {/* Logo */}
        <Link
          href="/projects"
          className="p-6 flex items-center justify-center gap-3 border-b border-primary/20 hover:bg-primary/5 transition-all group"
        >
          <div className="w-16 h-16 flex-shrink-0 shadow-glow-sm group-hover:shadow-glow-md transition-all">
            <img src="/logo-icon.png" alt="صخر" className="w-full h-full object-contain" />
          </div>
        </Link>

        {/* User Info */}
        <div className="px-4 py-6 border-b border-primary/20">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-background-tertiary border border-primary/10 hover:border-primary/30 transition-all group cursor-pointer">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-glow-gold transition-all">
              <User className="text-background" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">
                {user.name}
              </p>
              <p className="text-secondary text-xs truncate">
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
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group relative ${
                  active
                    ? 'bg-primary text-background font-semibold shadow-glow-gold'
                    : 'text-secondary hover:text-white hover:bg-primary/10 border border-transparent hover:border-primary/20'
                }`}
              >
                <span className="relative z-10">
                  <Icon size={20} />
                </span>
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="p-4 space-y-2 border-t border-primary/20">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group relative ${
                  active
                    ? 'bg-primary text-background font-semibold shadow-glow-gold'
                    : 'text-secondary hover:text-white hover:bg-primary/10 border border-transparent hover:border-primary/20'
                }`}
              >
                <span className="relative z-10">
                  <Icon size={20} />
                </span>
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}

          {/* Download App */}
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:text-text-primary hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20"
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
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
            >
              <LogOut size={20} />
              <span>تسجيل الخروج</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile Header - تحت الـ navbar الرئيسي */}
      <header className="lg:hidden fixed top-16 right-0 left-0 z-50 glass border-b border-primary/20 px-4 py-4 flex items-center justify-between backdrop-blur-xl shadow-lg">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl hover:bg-primary/10 text-text-primary transition-all border border-primary/10"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <Link href="/projects" className="text-primary font-bold text-lg">
          مشاريع
        </Link>
        <div className="w-10" />
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm pt-32 animate-fade-in-scale"
          onClick={() => setMobileMenuOpen(false)}
        >
          <aside
            className="absolute right-0 top-32 bottom-0 w-64 glass border-l border-primary/20 dashboard-sidebar flex flex-col overflow-y-auto shadow-2xl animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            {/* User Info */}
            <div className="px-4 py-6 border-b border-primary/20">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-background-tertiary border border-primary/10">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-glow-gold">
                  <User className="text-background" size={20} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {user.name}
                  </p>
                  <p className="text-secondary text-xs">
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
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${
                      active
                        ? 'bg-primary text-background font-semibold shadow-glow-gold'
                        : 'text-secondary hover:text-white hover:bg-primary/10 border border-transparent hover:border-primary/20'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 space-y-2 border-t border-primary/20">
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:text-text-primary hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20"
              >
                <Download size={20} />
                <span>تحميل التطبيق</span>
              </a>

              <form action="/api/auth/logout" method="POST" className="w-full">
                <button
                  type="submit"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
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
      <main className="flex-1 lg:mr-64 pt-32 lg:pt-16 bg-mesh">
        {/* Top Bar - Desktop Only */}
        <header className="hidden lg:block glass border-b border-primary/20 px-8 py-4 sticky top-16 z-30 backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-sm text-text-muted hover:text-text-primary hover:bg-primary/10 rounded-xl transition-all border border-primary/10 hover:border-primary/30 font-medium">
                EN
              </button>
              <button className="p-2.5 rounded-xl hover:bg-primary/10 relative text-text-muted hover:text-text-primary transition-all border border-primary/10 hover:border-primary/30 group">
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent-pink rounded-full animate-pulse shadow-glow-sm" />
                <span className="text-lg group-hover:scale-110 transition-transform inline-block">🔔</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="w-full pt-6 lg:pt-8">{children}</div>
      </main>
    </div>
  );
}
