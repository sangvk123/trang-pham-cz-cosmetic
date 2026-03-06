'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import { useLocale } from '@/lib/LocaleContext';
import { useCart } from '@/lib/CartContext';
import { formatPrice } from '@/lib/utils';

const texts = {
  title: { vi: 'Giỏ hàng', cs: 'Košík', en: 'Shopping Cart' },
  empty: { vi: 'Giỏ hàng trống', cs: 'Košík je prázdný', en: 'Your cart is empty' },
  emptyDesc: {
    vi: 'Hãy khám phá các sản phẩm và thêm vào giỏ hàng!',
    cs: 'Prozkoumejte naše produkty a přidejte je do košíku!',
    en: 'Explore our products and add them to your cart!',
  },
  continueShopping: { vi: 'Tiếp tục mua sắm', cs: 'Pokračovat v nákupu', en: 'Continue Shopping' },
  product: { vi: 'Sản phẩm', cs: 'Produkt', en: 'Product' },
  price: { vi: 'Giá', cs: 'Cena', en: 'Price' },
  quantity: { vi: 'Số lượng', cs: 'Množství', en: 'Quantity' },
  total: { vi: 'Tổng', cs: 'Celkem', en: 'Total' },
  subtotal: { vi: 'Tạm tính', cs: 'Mezisoučet', en: 'Subtotal' },
  shipping: { vi: 'Phí vận chuyển', cs: 'Doprava', en: 'Shipping' },
  freeShipping: { vi: 'Miễn phí', cs: 'Zdarma', en: 'Free' },
  shippingNote: {
    vi: 'Miễn phí ship cho đơn từ 1.500 CZK',
    cs: 'Doprava zdarma nad 1.500 Kč',
    en: 'Free shipping over 1,500 CZK',
  },
  remove: { vi: 'Xóa', cs: 'Odstranit', en: 'Remove' },
  items: { vi: 'sản phẩm', cs: 'položek', en: 'items' },
  contactOrder: {
    vi: 'Liên hệ đặt hàng qua Facebook / Zalo',
    cs: 'Kontaktujte nás pro objednávku přes Facebook / Zalo',
    en: 'Contact us to order via Facebook / Zalo',
  },
};

const FREE_SHIPPING_THRESHOLD = 1500;

export default function CartPage() {
  const { locale } = useLocale();
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  const shippingFree = totalPrice >= FREE_SHIPPING_THRESHOLD;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-sage-lightest flex items-center justify-center">
          <FiShoppingBag size={32} className="text-sage-dark" />
        </div>
        <h1 className="text-2xl font-bold text-charcoal mb-2">{texts.empty[locale]}</h1>
        <p className="text-text-muted mb-8">{texts.emptyDesc[locale]}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-charcoal text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-charcoal-light transition-colors"
        >
          <FiArrowLeft size={16} />
          {texts.continueShopping[locale]}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-charcoal mb-2">{texts.title[locale]}</h1>
      <p className="text-sm text-text-muted mb-8">{totalItems} {texts.items[locale]}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 bg-white border border-border rounded-xl p-4">
              {/* Image */}
              <Link href={`/products/${product.slug}`} className="shrink-0">
                <div className="w-24 h-24 bg-sage-lightest rounded-lg overflow-hidden relative">
                  {product.images.length > 0 ? (
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="96px" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-lg font-bold text-sage-darker">{(product.brand || product.name).charAt(0)}</span>
                    </div>
                  )}
                </div>
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link href={`/products/${product.slug}`} className="text-sm font-medium text-charcoal hover:text-sage-darker line-clamp-2">
                  {product.name}
                </Link>
                {product.brand && (
                  <p className="text-xs text-text-muted mt-0.5">{product.brand}</p>
                )}
                <p className="text-sm font-bold text-charcoal mt-2">{formatPrice(product.price)}</p>

                {/* Quantity + Remove */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-border rounded-full overflow-hidden">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-sage-lightest transition-colors"
                    >
                      <FiMinus size={12} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium border-x border-border">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-sage-lightest transition-colors"
                    >
                      <FiPlus size={12} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-text-muted hover:text-sale transition-colors p-1"
                    title={texts.remove[locale]}
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Line total (desktop) */}
              <div className="hidden sm:flex items-start">
                <span className="text-sm font-bold text-charcoal whitespace-nowrap">
                  {formatPrice(product.price * quantity)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-sage-lightest rounded-xl p-6 sticky top-32">
            <h2 className="text-lg font-bold text-charcoal mb-4">{texts.total[locale]}</h2>

            <div className="space-y-3 text-sm border-b border-border pb-4 mb-4">
              <div className="flex justify-between">
                <span className="text-text-secondary">{texts.subtotal[locale]}</span>
                <span className="font-medium text-charcoal">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">{texts.shipping[locale]}</span>
                <span className={`font-medium ${shippingFree ? 'text-sage-darker' : 'text-charcoal'}`}>
                  {shippingFree ? texts.freeShipping[locale] : '—'}
                </span>
              </div>
              {!shippingFree && (
                <p className="text-xs text-text-muted">{texts.shippingNote[locale]}</p>
              )}
            </div>

            <div className="flex justify-between text-lg font-bold text-charcoal mb-6">
              <span>{texts.total[locale]}</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <p className="text-sm text-center text-text-secondary bg-white rounded-lg p-4">
              {texts.contactOrder[locale]}
            </p>

            <Link
              href="/"
              className="mt-4 flex items-center justify-center gap-2 border border-border py-2.5 rounded-full text-sm text-text-secondary hover:bg-white transition-colors"
            >
              <FiArrowLeft size={14} />
              {texts.continueShopping[locale]}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
