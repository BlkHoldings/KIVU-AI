import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-32 text-center">
      <div className="text-8xl font-extrabold gradient-text mb-6">404</div>
      <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
      <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">
        Looks like this page doesn’t exist. Let’s get you back on track.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/members"
          className="px-8 py-3 bg-brand-surface hover:bg-gray-700 border border-brand-border text-white font-semibold rounded-lg transition-colors"
        >
          Browse Members
        </Link>
      </div>
    </main>
  );
}
