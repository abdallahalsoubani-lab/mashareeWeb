import Link from 'next/link';

export default function NotFound() {
  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center p-8 max-w-md">
        <div className="mb-6">
          <h1 className="text-8xl font-bold text-blue-600 mb-2">404</h1>
          <div className="text-6xl mb-4">🔍</div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">الصفحة غير موجودة</h2>
        <p className="text-slate-600 mb-8">
          عذراً، الصفحة التي تبحث عنها غير موجودة. قد تكون قد تم حذفها أو نقل عنوانها.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors inline-block"
          >
            العودة للرئيسية
          </Link>
          <Link
            href="/projects"
            className="px-6 py-3 bg-slate-200 text-slate-900 rounded-xl font-medium hover:bg-slate-300 transition-colors inline-block"
          >
            المشاريع
          </Link>
        </div>
      </div>
    </div>
  );
}
