import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'مشاريع - منصة الاستثمار العقاري الأولى',
  description: 'منصة الاستثمار العقاري الرائدة في المملكة العربية السعودية. استثمر في صناديق عقارية وصكوك وتمويل جماعي مع عوائد تصل إلى 25٪',
  keywords: ['استثمار', 'عقارات', 'صناديق', 'صكوك', 'تمويل جماعي'],
  openGraph: {
    title: 'مشاريع - منصة الاستثمار العقاري',
    description: 'منصة الاستثمار العقاري الأولى في السعودية',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased bg-black text-[#f5f0e8]" style={{ fontFamily: "'Tajawal', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
