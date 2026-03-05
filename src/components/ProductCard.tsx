'use client';

import Link from 'next/link';
import { FiShoppingBag } from 'react-icons/fi';
import { Product } from '@/types';
import { useLocale } from '@/lib/LocaleContext';
import { useCart } from '@/lib/CartContext';
import { t } from '@/lib/i18n';
import { formatPrice, getDiscountPercent } from '@/lib/utils';

export default function ProductCard({ product }: { product: Product }) {
  const { locale } = useLocale();
  const { addToCart } = useCart();

  const discount = product.originalPrice ? getDiscountPercent(product.price, product.originalPrice) : 0;

  return (
    <div className="group">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-square rounded-lg overflow-hidden bg-sage-lightest mb-3">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center p-4">
            <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-sage-light flex items-center justify-center text-sage-darker text-lg font-bold">
              {product.brand.charAt(0)}
            </div>
            <span className="text-xs text-text-muted">{product.brand}</span>
          </div>
        </div>
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-badge-new text-charcoal text-[10px] font-semibold px-2 py-0.5 rounded">
              {t('product.new', locale)}
            </span>
          )}
          {discount > 0 && (
            <span className="bg-charcoal text-white text-[10px] font-semibold px-2 py-0.5 rounded">
              -{discount}%
            </span>
          )}
        </div>
        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => { e.preventDefault(); addToCart(product); }}
            className="w-full bg-charcoal text-white text-xs font-medium py-2.5 rounded-full hover:bg-charcoal-light transition-colors flex items-center justify-center gap-1.5"
          >
            <FiShoppingBag size={13} />
            {t('product.addToCart', locale)}
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="px-0.5">
        <Link href={`/products/${product.slug}`} className="block">
          <p className="text-xs text-text-muted mb-0.5">{product.brand}</p>
          <h3 className="text-sm font-medium leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-sage-darker transition-colors">
            {product.name[locale]}
          </h3>
        </Link>
        <div className="mt-1.5 flex items-baseline gap-2">
          {product.originalPrice ? (
            <>
              <span className="text-xs text-text-muted line-through">{formatPrice(product.originalPrice)}</span>
              <span className="text-sm font-semibold text-sale">{formatPrice(product.price)}</span>
            </>
          ) : (
            <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
