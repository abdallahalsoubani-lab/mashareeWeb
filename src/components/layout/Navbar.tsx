'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, TrendingUp, Wallet, User, LogIn, LogOut, Bell } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navLinks = [
    { href: '/projects', label: 'المشاريع', icon: TrendingUp },
    ...(user ? [
      { href: '/investments', label: 'استثماراتي', icon: Wallet },
      { href: '/notifications', label: 'الإشعارات', icon: Bell },
      { href: '/profile', label: 'الملف الشخصي', icon: User },
    ] : []),
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background-secondary/95 backdrop-blur-md border-b-2 border-primary/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo with enhanced glow */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-2 bg-primary rounded-xl opacity-0 group-hover:opacity-40 blur-xl transition-all duration-500" />
              <div className="relative w-12 h-12">
                <img 
                  src="/logo-icon.png" 
                  alt="صخر" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </Link>

          {/* Desktop Navigation with enhanced styling */}
          <div className="hidden md:flex items-center gap-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative group flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-background shadow-glow-gold'
                      : 'text-secondary hover:text-white hover:bg-primary/10 border border-transparent hover:border-primary/30'
                  }`}
                >
                  <Icon className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons with enhanced design */}
          <div className="flex items-center gap-3">
            {loading ? (
              <div className="w-28 h-11 glass rounded-xl animate-pulse border border-primary/20" />
            ) : user ? (
              <>
                <Link
                  href="/wallet"
                  className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-background border border-primary/20 hover:border-primary text-secondary hover:text-primary rounded-xl font-semibold transition-all duration-300"
                >
                  <Wallet className="w-5 h-5" />
                  <span>المحفظة</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-5 py-2.5 bg-background border-2 border-primary/30 text-primary hover:border-primary hover:bg-primary/10 rounded-xl font-semibold transition-all duration-300"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden md:inline">تسجيل خروج</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="px-5 py-2.5 text-secondary hover:text-white transition-colors hidden md:block font-semibold"
                >
                  إنشاء حساب
                </Link>
                <Link
                  href="/login"
                  className="group relative flex items-center gap-2 px-6 py-2.5 font-bold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: '#8F7F5E', color: '#0A0A0A' }}
                >
                  <LogIn className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">تسجيل دخول</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation with enhanced design */}
      <div className="md:hidden border-t-2 border-primary/30 bg-background-secondary/95 backdrop-blur-md">
        <div className="flex justify-around py-3 px-2">
          {navLinks.slice(0, 4).map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex flex-col items-center gap-1.5 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'text-primary'
                    : 'text-secondary hover:text-white'
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-primary/10 rounded-xl border border-primary/30" />
                )}
                <Icon className={`w-6 h-6 relative z-10`} />
                <span className={`text-xs font-semibold relative z-10`}>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
