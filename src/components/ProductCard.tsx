'use client';

import Link from 'next/link';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import { Product } from '@/types';
import { useLocale } from '@/lib/LocaleContext';
import { useCart } from '@/lib/CartContext';
import { t } from '@/lib/i18n';
import { formatPrice, getDiscountPercent } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { locale } = useLocale();
  const { addToCart } = useCart();

  const discount = product.originalPrice
    ? getDiscountPercent(product.price, product.originalPrice)
    : 0;

  return (
    <div className="bg-white rounded-lg border border-border hover:shadow-lg transition-all duration-300 group overflow-hidden">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-100">
        <div className="w-full h-full flex items-center justify-center text-text-muted text-sm p-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-primary-light flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2d9f7f" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
            <span className="text-xs">{product.brand}</span>
          </div>
        </div>
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discount > 0 && (
            <span className="bg-sale text-white text-[10px] font-bold px-2 py-0.5 rounded">
              -{discount}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded">
              NEW
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded">
              HOT
            </span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-3">
        {/* Brand */}
        <p className="text-[11px] text-text-muted uppercase tracking-wide mb-1">{product.brand}</p>

        {/* Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-medium leading-snug line-clamp-2 min-h-[2.5rem] hover:text-primary transition-colors">
            {product.name[locale]}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1.5">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                size={12}
                className={i < Math.floor(product.rating) ? 'fill-star text-star' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-[11px] text-text-muted">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-base font-bold text-sale">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-text-muted line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Sold count + Progress bar */}
        <div className="mt-2">
          <div className="flex items-center justify-between text-[11px] text-text-muted mb-1">
            <span>{t('product.sold', locale)}: {product.soldCount.toLocaleString()}</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
              style={{ width: `${Math.min((product.soldCount / 5000) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Add to cart button */}
        <button
          onClick={() => addToCart(product)}
          className="mt-3 w-full bg-primary text-white text-sm py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <FiShoppingCart size={14} />
          {t('product.addToCart', locale)}
        </button>
      </div>
    </div>
  );
}
