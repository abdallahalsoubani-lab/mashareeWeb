'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center p-8 max-w-md">
        <div className="mb-6">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">⚠️</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">حدث خطأ!</h2>
        <p className="text-slate-600 mb-2">عذراً، حدث خطأ غير متوقع.</p>
        {error.message && (
          <p className="text-sm text-slate-500 mb-6 p-3 bg-slate-100 rounded-lg font-mono">
            {error.message}
          </p>
        )}
        <button
          onClick={reset}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          حاول مرة أخرى
        </button>
      </div>
    </div>
  );
}
