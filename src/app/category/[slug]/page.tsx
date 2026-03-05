'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { FiFilter, FiGrid, FiList } from 'react-icons/fi';
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
  const [showFilter, setShowFilter] = useState(false);

  const category = categories.find((c) => c.slug === slug);
  const categoryName = category?.name[locale] || slug;

  const filteredProducts = category
    ? products.filter((p) => p.category === category.id)
    : products;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'newest': return 0;
      default: return b.soldCount - a.soldCount;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-text-secondary mb-4">
        <a href="/" className="hover:text-primary">{t('nav.home', locale)}</a>
        <span className="mx-2">/</span>
        <span className="text-text-primary font-medium">{categoryName}</span>
      </nav>

      <div className="flex gap-6">
        {/* Sidebar filter - desktop */}
        <aside className={`${showFilter ? 'block' : 'hidden'} lg:block w-full lg:w-60 shrink-0`}>
          <div className="bg-white rounded-lg border border-border p-4 sticky top-40">
            <h3 className="font-semibold mb-3">{t('category.filter', locale)}</h3>

            {/* Subcategories */}
            {category?.subcategories && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">{categoryName}</h4>
                <ul className="space-y-1">
                  {category.subcategories.map((sub) => (
                    <li key={sub.id}>
                      <a
                        href={`/category/${slug}/${sub.slug}`}
                        className="text-sm text-text-secondary hover:text-primary block py-1"
                      >
                        {sub.name[locale]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Price range */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">{t('category.priceRange', locale)}</h4>
              <div className="space-y-1 text-sm">
                {['< 100K', '100K - 300K', '300K - 500K', '500K - 1M', '> 1M'].map((range) => (
                  <label key={range} className="flex items-center gap-2 cursor-pointer py-1">
                    <input type="checkbox" className="accent-primary" />
                    <span className="text-text-secondary">{range}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div>
              <h4 className="text-sm font-medium mb-2">{t('nav.brands', locale)}</h4>
              <div className="space-y-1 text-sm">
                {['Klairs', 'Innisfree', 'CeraVe', 'Anessa', 'Maybelline'].map((brand) => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer py-1">
                    <input type="checkbox" className="accent-primary" />
                    <span className="text-text-secondary">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between bg-white rounded-lg border border-border px-4 py-3 mb-4">
            <div className="flex items-center gap-2">
              <button
                className="lg:hidden flex items-center gap-1 text-sm px-3 py-1.5 border border-border rounded-lg hover:bg-gray-50"
                onClick={() => setShowFilter(!showFilter)}
              >
                <FiFilter size={14} />
                {t('category.filter', locale)}
              </button>
              <h1 className="text-lg font-semibold hidden sm:block">{categoryName}</h1>
              <span className="text-sm text-text-muted">({sortedProducts.length})</span>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-border rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary"
              >
                <option value="popular">{locale === 'vi' ? 'Pho bien' : locale === 'cs' ? 'Popularni' : 'Popular'}</option>
                <option value="newest">{locale === 'vi' ? 'Moi nhat' : locale === 'cs' ? 'Nejnovejsi' : 'Newest'}</option>
                <option value="price-asc">{locale === 'vi' ? 'Gia thap - cao' : locale === 'cs' ? 'Cena vzestupne' : 'Price: Low-High'}</option>
                <option value="price-desc">{locale === 'vi' ? 'Gia cao - thap' : locale === 'cs' ? 'Cena sestupne' : 'Price: High-Low'}</option>
                <option value="rating">{locale === 'vi' ? 'Danh gia cao' : locale === 'cs' ? 'Nejlepe hodnocene' : 'Top Rated'}</option>
              </select>
            </div>
          </div>

          {/* Product grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-border p-12 text-center">
              <p className="text-text-muted">
                {locale === 'vi' ? 'Khong co san pham nao' : locale === 'cs' ? 'Zadne produkty' : 'No products found'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
