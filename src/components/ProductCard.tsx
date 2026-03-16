'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiShoppingBag } from 'react-icons/fi';
import { Product } from '@/types';
import { useLocale } from '@/lib/LocaleContext';
import { useCart } from '@/lib/CartContext';
import { useToast } from '@/lib/ToastContext';
import { t } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';

export default function ProductCard({ product }: { product: Product }) {
  const { locale } = useLocale();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const hasImage = product.images.length > 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    showToast(t('toast.addedToCart', locale));
  };

  return (
    <div className="group">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-square rounded-lg overflow-hidden bg-sage-lightest mb-3">
        {hasImage ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center p-4">
              <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-sage-light flex items-center justify-center text-sage-darker text-lg font-bold">
                {(product.brand || product.name).charAt(0)}
              </div>
              <span className="text-xs text-text-muted">{product.brand || product.group}</span>
            </div>
          </div>
        )}
        {/* Stock badge */}
        {!product.inStock && (
          <div className="absolute top-2 left-2">
            <span className="bg-charcoal/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
              {locale === 'vi' ? 'Liên hệ' : locale === 'cs' ? 'Kontakt' : 'Contact'}
            </span>
          </div>
        )}
        {/* Quick add overlay - desktop only */}
        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
          <button
            onClick={handleAddToCart}
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
          {product.brand && <p className="text-xs text-text-muted mb-0.5">{product.brand}</p>}
          <h3 className="text-sm font-medium leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-sage-darker transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
          {/* Mobile add-to-cart button */}
          <button
            onClick={handleAddToCart}
            className="sm:hidden w-9 h-9 bg-charcoal text-white rounded-full flex items-center justify-center active:bg-charcoal-light transition-colors shrink-0"
            aria-label={t('product.addToCart', locale)}
          >
            <FiShoppingBag size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
