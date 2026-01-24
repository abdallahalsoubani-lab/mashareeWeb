'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, TrendingUp, Wallet, User, LogIn, LogOut } from 'lucide-react';
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
    { href: '/', label: 'الرئيسية', icon: Building2 },
    { href: '/projects', label: 'المشاريع', icon: TrendingUp },
    ...(user ? [
      { href: '/investments', label: 'استثماراتي', icon: Wallet },
      { href: '/profile', label: 'الملف الشخصي', icon: User },
    ] : []),
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-[#c9a227]/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="w-8 h-8 text-[#d4b94c]" />
            <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-l from-[#d4b94c] to-[#f5f0e8]">
              مشاريع
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-[#1a1a1a] font-bold'
                      : 'text-[#b0a090] hover:text-[#f5f0e8] hover:bg-[#c9a227]/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2">
            {loading ? (
              <div className="w-24 h-10 bg-[#c9a227]/10 rounded-lg animate-pulse" />
            ) : user ? (
              <>
                <Link
                  href="/wallet"
                  className="hidden md:flex items-center gap-2 px-4 py-2 text-[#b0a090] hover:text-[#f5f0e8] transition-colors"
                >
                  <Wallet className="w-4 h-4" />
                  <span>المحفظة</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 border border-[#c9a227] text-[#d4b94c] hover:bg-[#c9a227]/10 rounded-lg transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden md:inline">تسجيل خروج</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="px-4 py-2 text-[#b0a090] hover:text-[#f5f0e8] transition-colors hidden md:block"
                >
                  إنشاء حساب
                </Link>
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-[#1a1a1a] font-bold rounded-lg hover:shadow-lg hover:shadow-[#c9a227]/50 transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  <span>تسجيل دخول</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-[#c9a227]/20 bg-[#1a1a1a]">
        <div className="flex justify-around py-2">
          {navLinks.slice(0, 4).map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'text-[#d4b94c]'
                    : 'text-[#b0a090] hover:text-[#f5f0e8]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
