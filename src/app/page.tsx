'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';
import { useLocale } from '@/lib/LocaleContext';
import { t } from '@/lib/i18n';
import { products, brands } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const { locale } = useLocale();
  const newProducts = products.filter((p) => p.isNew);
  const bestSellers = products.filter((p) => p.isBestSeller);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-sage-lightest">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
          <Image src="/images/ShopLogo.png" alt="Trang Pham Cosmetics" width={200} height={80} className="h-20 w-auto mb-6 opacity-80" />
          <h1 className="text-3xl md:text-5xl font-bold text-charcoal tracking-tight mb-3">
            {t('home.hero.title', locale)}
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-lg mb-8">
            {t('home.hero.subtitle', locale)}
          </p>
          <Link href="/products" className="inline-flex items-center gap-2 bg-charcoal text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-charcoal-light transition-colors">
            {t('home.shopNow', locale)} <FiArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-3 gap-4">
          {[
            { icon: FiTruck, vi: 'Mien phi ship tu 1.500 CZK', cs: 'Doprava zdarma od 1.500 Kc', en: 'Free shipping over 1,500 CZK' },
            { icon: FiShield, vi: '100% chinh hang', cs: '100% originalni', en: '100% Authentic' },
            { icon: FiRefreshCw, vi: '14 ngay doi tra', cs: '14 dni na vraceni', en: '14-day returns' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
              <item.icon size={20} className="text-sage-dark shrink-0" />
              <span className="text-xs md:text-sm text-text-secondary">{item[locale]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-charcoal">{t('home.newArrivals', locale)}</h2>
          <Link href="/category/new" className="text-sm text-sage-darker font-medium hover:underline flex items-center gap-1">
            {t('home.viewAll', locale)} <FiArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {newProducts.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Brand carousel */}
      <section className="bg-cream py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-charcoal text-center mb-8">{t('home.ourBrands', locale)}</h2>
          <div className="overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...brands, ...brands].map((brand, i) => (
                <div key={i} className="inline-flex items-center justify-center min-w-[140px] h-12 mx-4 px-4 bg-white rounded-full border border-border-light">
                  <span className="text-sm font-medium text-charcoal-light">{brand}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-charcoal">{t('home.bestSellers', locale)}</h2>
          <Link href="/category/bestsellers" className="text-sm text-sage-darker font-medium hover:underline flex items-center gap-1">
            {t('home.viewAll', locale)} <FiArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sage-lightest">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-3">
            {locale === 'vi' ? 'K-Beauty chinh hang tai Sec' : locale === 'cs' ? 'Originalni K-Beauty v Cesku' : 'Authentic K-Beauty in Czech Republic'}
          </h2>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
            {locale === 'vi' ? 'San pham tu cac thuong hieu Han Quoc uy tin' : locale === 'cs' ? 'Produkty od overenich korejskych znacek' : 'Products from trusted Korean brands'}
          </p>
          <Link href="/products" className="inline-flex items-center gap-2 bg-sage text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-sage-dark transition-colors">
            {t('home.shopNow', locale)} <FiArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
