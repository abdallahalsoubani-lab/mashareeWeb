/**
 * Auth Layout
 * Layout for login and register pages
 */

import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 font-tajawal relative"
      style={{
        backgroundImage:
          'url(/hero-bg.jpg)',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#1a1a1a]/80 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
