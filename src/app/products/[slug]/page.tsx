'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiStar, FiMinus, FiPlus, FiHeart } from 'react-icons/fi';
import { useLocale } from '@/lib/LocaleContext';
import { useCart } from '@/lib/CartContext';
import { t } from '@/lib/i18n';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
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

  const category = categories.find((c) => c.id === product.category);

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-text-muted mb-6">
        <Link href="/" className="hover:text-sage-darker">Home</Link>
        <span className="mx-2">/</span>
        {category && (
          <>
            <Link href={`/category/${category.slug}`} className="hover:text-sage-darker">{category.name[locale]}</Link>
            <span className="mx-2">/</span>
          </>
        )}
        <span className="text-charcoal font-medium">{product.name[locale]}</span>
      </nav>

      {/* Product detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Image */}
        <div className="aspect-square bg-sage-lightest rounded-lg flex items-center justify-center">
          <div className="text-center text-text-muted">
            <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-sage-light flex items-center justify-center">
              <span className="text-2xl font-bold text-sage-darker">{product.brand.charAt(0)}</span>
            </div>
            <p className="text-sm font-medium">{product.brand}</p>
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-xs text-sage-darker uppercase tracking-wider mb-1 font-medium">{product.brand}</p>
          <h1 className="text-xl md:text-2xl font-bold text-charcoal mb-3">{product.name[locale]}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  size={14}
                  className={i < Math.floor(product.rating) ? 'fill-star text-star' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-sm text-text-secondary">
              {product.rating} ({product.reviewCount} {locale === 'vi' ? 'danh gia' : locale === 'cs' ? 'hodnoceni' : 'reviews'})
            </span>
          </div>

          {/* Price */}
          <div className="bg-sage-lightest rounded-lg p-4 mb-5">
            <div className="flex items-baseline gap-3">
              <span className={`text-2xl font-bold ${product.isOnSale ? 'text-sale' : 'text-charcoal'}`}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-text-muted line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="bg-sale text-white text-xs font-bold px-2 py-0.5 rounded">
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
            <span className="text-sm font-medium text-charcoal">
              {locale === 'vi' ? 'So luong:' : locale === 'cs' ? 'Mnozstvi:' : 'Quantity:'}
            </span>
            <div className="flex items-center border border-border rounded-full overflow-hidden">
              <button
                className="w-9 h-9 flex items-center justify-center hover:bg-sage-lightest transition-colors"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <FiMinus size={14} />
              </button>
              <span className="w-10 text-center text-sm font-medium border-x border-border">
                {quantity}
              </span>
              <button
                className="w-9 h-9 flex items-center justify-center hover:bg-sage-lightest transition-colors"
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
              className="flex-1 bg-charcoal text-white py-3 rounded-full font-medium text-sm hover:bg-charcoal-light transition-colors flex items-center justify-center gap-2"
            >
              <FiShoppingCart size={16} />
              {t('product.addToCart', locale)}
            </button>
            <button className="w-12 h-12 border border-border rounded-full flex items-center justify-center hover:bg-sage-lightest transition-colors">
              <FiHeart size={18} />
            </button>
          </div>

          {/* Stock status */}
          <p className={`text-xs mt-4 ${product.inStock ? 'text-sage-darker' : 'text-sale'}`}>
            {product.inStock
              ? (locale === 'vi' ? 'Con hang' : locale === 'cs' ? 'Skladem' : 'In Stock')
              : (locale === 'vi' ? 'Het hang' : locale === 'cs' ? 'Nedostupne' : 'Out of Stock')}
          </p>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-charcoal mb-6">
            {locale === 'vi' ? 'San pham lien quan' : locale === 'cs' ? 'Souvisejici produkty' : 'Related Products'}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
