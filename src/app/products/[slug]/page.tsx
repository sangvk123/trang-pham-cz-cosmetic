'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { FiShoppingCart, FiStar, FiMinus, FiPlus, FiHeart, FiShare2 } from 'react-icons/fi';
import { useLocale } from '@/lib/LocaleContext';
import { useCart } from '@/lib/CartContext';
import { t } from '@/lib/i18n';
import { products } from '@/data/products';
import { formatPrice, getDiscountPercent } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { locale } = useLocale();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">404</h1>
        <p className="text-text-muted">
          {locale === 'vi' ? 'San pham khong ton tai' : locale === 'cs' ? 'Produkt nenalezen' : 'Product not found'}
        </p>
      </div>
    );
  }

  const discount = product.originalPrice
    ? getDiscountPercent(product.price, product.originalPrice)
    : 0;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 6);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-text-secondary mb-6">
        <a href="/" className="hover:text-primary">{t('nav.home', locale)}</a>
        <span className="mx-2">/</span>
        <a href={`/category/${product.category}`} className="hover:text-primary capitalize">{product.category}</a>
        <span className="mx-2">/</span>
        <span className="text-text-primary">{product.name[locale]}</span>
      </nav>

      {/* Product detail */}
      <div className="bg-white rounded-lg border border-border p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-text-muted">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-primary-light flex items-center justify-center">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#2d9f7f" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
              <p className="text-sm">{product.brand}</p>
              <p className="text-xs mt-1">Product Image</p>
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-sm text-text-muted uppercase tracking-wide mb-1">{product.brand}</p>
            <h1 className="text-xl md:text-2xl font-bold mb-3">{product.name[locale]}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? 'fill-star text-star' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-sm text-text-secondary">
                {product.rating} ({product.reviewCount} {locale === 'vi' ? 'danh gia' : locale === 'cs' ? 'hodnoceni' : 'reviews'})
              </span>
              <span className="text-sm text-text-muted">|</span>
              <span className="text-sm text-text-secondary">
                {t('product.sold', locale)}: {product.soldCount.toLocaleString()}
              </span>
            </div>

            {/* Price */}
            <div className="bg-primary-light rounded-lg p-4 mb-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-sale">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-text-muted line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="bg-sale text-white text-sm font-bold px-2 py-0.5 rounded">
                      -{discount}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-text-secondary mb-6 leading-relaxed">
              {product.description[locale]}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium">
                {locale === 'vi' ? 'So luong:' : locale === 'cs' ? 'Mnozstvi:' : 'Quantity:'}
              </span>
              <div className="flex items-center border border-border rounded-lg">
                <button
                  className="px-3 py-2 hover:bg-gray-50"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <FiMinus size={14} />
                </button>
                <span className="px-4 py-2 border-x border-border text-sm font-medium min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  className="px-3 py-2 hover:bg-gray-50"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <FiPlus size={14} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
              >
                <FiShoppingCart size={18} />
                {t('product.addToCart', locale)}
              </button>
              <button className="p-3 border border-border rounded-lg hover:bg-gray-50 transition-colors">
                <FiHeart size={20} />
              </button>
              <button className="p-3 border border-border rounded-lg hover:bg-gray-50 transition-colors">
                <FiShare2 size={20} />
              </button>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex gap-2 mt-4">
                {product.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-text-secondary px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4">
            {locale === 'vi' ? 'San pham lien quan' : locale === 'cs' ? 'Souvisejici produkty' : 'Related Products'}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
