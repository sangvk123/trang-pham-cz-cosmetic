import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-bold text-charcoal mb-4 font-[family-name:var(--font-playfair)]">404</h1>
      <p className="text-lg text-text-secondary mb-2">Page Not Found</p>
      <p className="text-sm text-text-muted mb-8">The page you are looking for does not exist or has been removed.</p>
      <Link
        href="/"
        className="inline-flex bg-charcoal text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-charcoal-light transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
