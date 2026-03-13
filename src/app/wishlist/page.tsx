'use client';

import { useLocale } from '@/lib/LocaleContext';
import { useWishlist } from '@/lib/WishlistContext';
import { t } from '@/lib/i18n';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { FiHeart } from 'react-icons/fi';

export default function WishlistPage() {
  const { locale } = useLocale();
  const { wishlistIds } = useWishlist();

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-text-muted mb-6">
        <Link href="/" className="hover:text-sage-darker">{t('nav.home', locale)}</Link>
        <span className="mx-2">/</span>
        <span className="text-charcoal font-medium">{t('wishlist.title', locale)}</span>
      </nav>

      <h1 className="text-2xl font-bold text-charcoal mb-8">{t('wishlist.title', locale)} ({wishlistProducts.length})</h1>

      {wishlistProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {wishlistProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-sage-lightest rounded-full flex items-center justify-center mx-auto mb-4">
            <FiHeart size={24} className="text-text-muted" />
          </div>
          <p className="text-text-muted mb-4">{t('wishlist.empty', locale)}</p>
          <Link href="/category/skincare" className="inline-flex bg-charcoal text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-charcoal-light transition-colors">
            {t('home.shopNow', locale)}
          </Link>
        </div>
      )}
    </div>
  );
}
