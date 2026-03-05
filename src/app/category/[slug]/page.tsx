'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from '@/lib/LocaleContext';
import { t } from '@/lib/i18n';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { locale } = useLocale();
  const [sortBy, setSortBy] = useState('popular');

  const category = categories.find((c) => c.slug === slug || c.subcategories?.some((s) => s.slug === slug));
  const sub = category?.subcategories?.find((s) => s.slug === slug);
  const displayName = sub?.name[locale] || category?.name[locale] || slug;

  let filtered = category
    ? products.filter((p) => p.category === category.id || (sub && p.subcategory === sub.id))
    : slug === 'bestsellers' ? products.filter((p) => p.isBestSeller)
    : slug === 'new' ? products.filter((p) => p.isNew)
    : slug === 'sale' ? products.filter((p) => p.isOnSale)
    : products;

  const title = slug === 'bestsellers' ? t('nav.bestsellers', locale)
    : slug === 'new' ? t('nav.new', locale)
    : slug === 'sale' ? t('nav.sale', locale)
    : displayName;

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'newest') return 0;
    return b.rating - a.rating;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="text-sm text-text-muted mb-6">
        <Link href="/" className="hover:text-sage-darker">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-charcoal font-medium">{title}</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-charcoal tracking-tight">{title}</h1>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-sm border border-border rounded-full px-4 py-2 focus:outline-none focus:border-sage-dark bg-white"
        >
          <option value="popular">{t('category.popular', locale)}</option>
          <option value="newest">{t('category.newest', locale)}</option>
          <option value="price-asc">{t('category.priceLow', locale)}</option>
          <option value="price-desc">{t('category.priceHigh', locale)}</option>
        </select>
      </div>

      {/* Subcategory pills */}
      {category?.subcategories && (
        <div className="flex flex-wrap gap-2 mb-8">
          <Link href={`/category/${category.slug}`} className={`text-xs px-4 py-2 rounded-full border transition-colors ${!sub ? 'bg-charcoal text-white border-charcoal' : 'border-border hover:border-sage-dark'}`}>
            {locale === 'vi' ? 'Tat ca' : locale === 'cs' ? 'Vse' : 'All'}
          </Link>
          {category.subcategories.map((s) => (
            <Link key={s.id} href={`/category/${s.slug}`} className={`text-xs px-4 py-2 rounded-full border transition-colors ${sub?.id === s.id ? 'bg-charcoal text-white border-charcoal' : 'border-border hover:border-sage-dark'}`}>
              {s.name[locale]}
            </Link>
          ))}
        </div>
      )}

      {sorted.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {sorted.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="py-20 text-center text-text-muted">{t('category.noProducts', locale)}</div>
      )}
    </div>
  );
}
