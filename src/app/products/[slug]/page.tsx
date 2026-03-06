'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiShoppingCart, FiMinus, FiPlus, FiHeart } from 'react-icons/fi';
import { useLocale } from '@/lib/LocaleContext';
import { useCart } from '@/lib/CartContext';
import { t } from '@/lib/i18n';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { formatPrice } from '@/lib/utils';
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
          {locale === 'vi' ? 'Sản phẩm không tồn tại' : locale === 'cs' ? 'Produkt nenalezen' : 'Product not found'}
        </p>
      </div>
    );
  }

  const category = categories.find((c) => c.id === product.category);
  const hasImage = product.images.length > 0;

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
        <span className="text-charcoal font-medium">{product.name}</span>
      </nav>

      {/* Product detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Image */}
        <div className="aspect-square bg-sage-lightest rounded-lg overflow-hidden relative">
          {hasImage ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-text-muted">
                <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-sage-light flex items-center justify-center">
                  <span className="text-2xl font-bold text-sage-darker">{(product.brand || product.name).charAt(0)}</span>
                </div>
                <p className="text-sm font-medium">{product.brand || product.group}</p>
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {product.brand && (
            <p className="text-xs text-sage-darker uppercase tracking-wider mb-1 font-medium">{product.brand}</p>
          )}
          <h1 className="text-xl md:text-2xl font-bold text-charcoal mb-3">{product.name}</h1>

          {/* Group tag */}
          <p className="text-xs text-text-muted mb-4">{product.group}</p>

          {/* Price */}
          <div className="bg-sage-lightest rounded-lg p-4 mb-5">
            <span className="text-2xl font-bold text-charcoal">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-sm text-text-secondary mb-6 leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Stock status */}
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-6 ${
            product.inStock ? 'bg-badge-new text-sage-darker' : 'bg-sale-bg text-sale'
          }`}>
            <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-sage-darker' : 'bg-sale'}`} />
            {product.inStock
              ? (locale === 'vi' ? 'Còn hàng' : locale === 'cs' ? 'Skladem' : 'In Stock')
              : (locale === 'vi' ? 'Liên hệ' : locale === 'cs' ? 'Kontaktujte nás' : 'Contact Us')}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-charcoal">
              {locale === 'vi' ? 'Số lượng:' : locale === 'cs' ? 'Množství:' : 'Quantity:'}
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
              {product.inStock
                ? t('product.addToCart', locale)
                : (locale === 'vi' ? 'Liên hệ đặt hàng' : locale === 'cs' ? 'Kontaktujte nás' : 'Contact to Order')}
            </button>
            <button className="w-12 h-12 border border-border rounded-full flex items-center justify-center hover:bg-sage-lightest transition-colors">
              <FiHeart size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-charcoal mb-6">
            {locale === 'vi' ? 'Sản phẩm liên quan' : locale === 'cs' ? 'Související produkty' : 'Related Products'}
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
