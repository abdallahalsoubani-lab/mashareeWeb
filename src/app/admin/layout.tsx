/**
 * Admin Layout
 * Protected layout for admin dashboard
 */

import { redirect } from 'next/navigation';
import { getFullCurrentUser } from '@/lib/auth';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'لوحة التحكم - مشاريع',
  description: 'لوحة تحكم الإدارة',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getFullCurrentUser();

  // Check authentication
  if (!user) {
    redirect('/login?redirect=/admin');
  }

  // Check admin role
  if (user.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-mesh font-tajawal lg:mr-64 pt-32 lg:pt-16"
    >
      <AdminSidebar userEmail={user.email} />

      <main className="min-h-screen">
        <div className="p-4 lg:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
