'use client';

import { useParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
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
  const [sidebarOpen, setSidebarOpen] = useState<string | null>(null);

  // Product counts per category/subcategory
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of products) {
      counts[p.category] = (counts[p.category] || 0) + 1;
      if (p.subcategory) {
        counts[p.subcategory] = (counts[p.subcategory] || 0) + 1;
      }
    }
    return counts;
  }, []);

  // Find current category/subcategory
  const category = categories.find((c) => c.slug === slug || c.subcategories?.some((s) => s.slug === slug));
  const sub = category?.subcategories?.find((s) => s.slug === slug);
  const displayName = sub?.name[locale] || category?.name[locale] || slug;

  // Filter products
  const filtered = category
    ? sub
      ? products.filter((p) => p.subcategory === sub.id)
      : products.filter((p) => p.category === category.id)
    : slug === 'instock' ? products.filter((p) => p.inStock)
    : products;

  const title = slug === 'instock'
    ? (locale === 'vi' ? 'Còn hàng' : locale === 'cs' ? 'Skladem' : 'In Stock')
    : displayName;

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (a.inStock !== b.inStock) return a.inStock ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-text-muted mb-6 scroll-reveal">
        <Link href="/" className="hover:text-sage-darker transition-colors duration-200">Home</Link>
        {category && (
          <>
            <span className="mx-2">/</span>
            <Link href={`/category/${category.slug}`} className={sub ? 'hover:text-sage-darker transition-colors duration-200' : 'text-charcoal font-medium'}>
              {category.name[locale]}
            </Link>
          </>
        )}
        {sub && (
          <>
            <span className="mx-2">/</span>
            <span className="text-charcoal font-medium">{sub.name[locale]}</span>
          </>
        )}
        {slug === 'instock' && (
          <>
            <span className="mx-2">/</span>
            <span className="text-charcoal font-medium">{title}</span>
          </>
        )}
      </nav>

      <div className="flex gap-8">
        {/* Left sidebar - desktop */}
        <aside className="hidden lg:block w-[240px] shrink-0">
          <div className="sticky top-[120px]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-4">
              {locale === 'vi' ? 'Danh mục' : locale === 'cs' ? 'Kategorie' : 'Categories'}
            </h3>
            <nav className="space-y-0.5">
              {categories.map((cat) => {
                const isActive = category?.id === cat.id;
                const isExpanded = isActive || sidebarOpen === cat.id;

                return (
                  <div key={cat.id}>
                    <div className="flex items-center">
                      <Link
                        href={`/category/${cat.slug}`}
                        className={`flex-1 py-2.5 text-sm transition-all duration-200 ${
                          isActive && !sub ? 'text-sage-darker font-semibold' : 'text-text-secondary hover:text-charcoal'
                        }`}
                      >
                        {cat.name[locale]}
                        <span className="text-xs text-text-muted ml-1">({productCounts[cat.id] || 0})</span>
                      </Link>
                      {cat.subcategories && (
                        <button
                          onClick={() => setSidebarOpen(isExpanded ? null : cat.id)}
                          className="p-1 text-text-muted hover:text-charcoal transition-colors duration-200"
                        >
                          <FiChevronDown
                            size={14}
                            className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                            style={{ transitionTimingFunction: 'cubic-bezier(.6, 0, .4, 1)' }}
                          />
                        </button>
                      )}
                    </div>
                    {cat.subcategories && (
                      <div
                        className="overflow-hidden transition-all duration-400"
                        style={{
                          maxHeight: isExpanded ? `${cat.subcategories.length * 36 + 8}px` : '0px',
                          opacity: isExpanded ? 1 : 0,
                          transitionTimingFunction: 'cubic-bezier(.3, 1, .3, 1)',
                        }}
                      >
                        <div className="pl-3 pb-2 space-y-0.5">
                          {cat.subcategories.map((s) => {
                            const isSubActive = sub?.id === s.id;
                            return (
                              <Link
                                key={s.id}
                                href={`/category/${s.slug}`}
                                className={`flex items-center gap-1.5 py-1.5 text-sm transition-all duration-200 ${
                                  isSubActive
                                    ? 'text-sage-darker font-medium pl-1'
                                    : 'text-text-muted hover:text-sage-darker hover:pl-1'
                                }`}
                              >
                                <FiChevronRight size={10} className={isSubActive ? 'text-sage-darker' : 'text-border'} />
                                {s.name[locale]}
                                <span className="text-xs text-text-muted ml-auto">{productCounts[s.id] || 0}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="border-t border-border-light pt-2 mt-2">
                <Link
                  href="/category/instock"
                  className={`block py-2.5 text-sm transition-all duration-200 ${
                    slug === 'instock' ? 'text-sage-darker font-semibold' : 'text-text-secondary hover:text-charcoal'
                  }`}
                >
                  {t('nav.bestsellers', locale)}
                </Link>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-8 scroll-reveal">
            <div>
              <h1 className="text-2xl font-bold text-charcoal tracking-tight">{title}</h1>
              <p className="text-sm text-text-muted mt-1">
                {filtered.length} {locale === 'vi' ? 'sản phẩm' : locale === 'cs' ? 'produktů' : 'products'}
              </p>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-border rounded-full px-4 py-2 focus:outline-none focus:border-sage-dark bg-white transition-colors duration-200"
            >
              <option value="popular">{t('category.popular', locale)}</option>
              <option value="price-asc">{t('category.priceLow', locale)}</option>
              <option value="price-desc">{t('category.priceHigh', locale)}</option>
            </select>
          </div>

          {/* Subcategory pills - mobile only or when showing parent category */}
          {category?.subcategories && !sub && (
            <div className="flex flex-wrap gap-2 mb-8 scroll-reveal">
              <Link
                href={`/category/${category.slug}`}
                className="text-xs px-4 py-2 rounded-full border bg-charcoal text-white border-charcoal transition-all duration-200"
              >
                {locale === 'vi' ? 'Tất cả' : locale === 'cs' ? 'Vše' : 'All'}
              </Link>
              {category.subcategories.map((s) => (
                <Link
                  key={s.id}
                  href={`/category/${s.slug}`}
                  className="text-xs px-4 py-2 rounded-full border border-border hover:border-sage-dark hover:text-sage-darker transition-all duration-200"
                >
                  {s.name[locale]} ({productCounts[s.id] || 0})
                </Link>
              ))}
            </div>
          )}

          {sorted.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 stagger-children">
              {sorted.map((p, i) => (
                <div key={p.id} className="scroll-reveal" style={{ '--stagger-index': i } as React.CSSProperties}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-text-muted">{t('category.noProducts', locale)}</div>
          )}
        </div>
      </div>
    </div>
  );
}
