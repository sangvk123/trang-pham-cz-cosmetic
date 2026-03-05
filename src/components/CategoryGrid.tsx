'use client';

import Link from 'next/link';
import { useLocale } from '@/lib/LocaleContext';
import { categories } from '@/data/categories';

const categoryIcons: Record<string, string> = {
  deals: '🔥',
  combo: '🎁',
  makeup: '💄',
  skincare: '✨',
  bodycare: '🛁',
  haircare: '💆',
  supplements: '💊',
  tools: '🧰',
};

const categoryColors: Record<string, string> = {
  deals: 'from-red-400 to-rose-500',
  combo: 'from-purple-400 to-indigo-500',
  makeup: 'from-pink-400 to-rose-500',
  skincare: 'from-teal-400 to-cyan-500',
  bodycare: 'from-blue-400 to-indigo-500',
  haircare: 'from-amber-400 to-orange-500',
  supplements: 'from-green-400 to-emerald-500',
  tools: 'from-gray-400 to-slate-500',
};

export default function CategoryGrid() {
  const { locale } = useLocale();

  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/category/${cat.slug}`}
          className="group flex flex-col items-center gap-2 p-3 rounded-xl hover:shadow-md transition-all"
        >
          <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${categoryColors[cat.id] || 'from-gray-400 to-gray-500'} flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform`}>
            {categoryIcons[cat.id] || '🛍'}
          </div>
          <span className="text-xs font-medium text-center leading-tight">
            {cat.name[locale]}
          </span>
        </Link>
      ))}
    </div>
  );
}
