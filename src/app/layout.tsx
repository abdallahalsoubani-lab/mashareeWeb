import type { Metadata } from 'next';
import './globals.css';

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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased bg-[#1a1a1a] text-[#f5f0e8]" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Tajawal', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
