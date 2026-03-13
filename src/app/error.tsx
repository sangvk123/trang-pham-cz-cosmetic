'use client';

import { FiAlertTriangle } from 'react-icons/fi';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <div className="w-16 h-16 bg-sale-bg rounded-full flex items-center justify-center mx-auto mb-4">
        <FiAlertTriangle size={28} className="text-sale" />
      </div>
      <h1 className="text-2xl font-bold text-charcoal mb-2">Something went wrong</h1>
      <p className="text-text-muted mb-6">An unexpected error occurred.</p>
      <button
        onClick={reset}
        className="bg-charcoal text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-charcoal-light transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
