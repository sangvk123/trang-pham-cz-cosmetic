'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';
import { useLocale } from '@/lib/LocaleContext';
import { t } from '@/lib/i18n';
import { products, brands } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import FlashSaleBanner from '@/components/FlashSaleBanner';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const heroImages = [
  '/images/hero-banner.jpg',
  '/images/hero-banner-2.jpg',
  '/images/hero-banner-3.jpg',
];

export default function HomePage() {
  const { locale } = useLocale();

  // Show in-stock products first, then take top items
  const inStockProducts = products.filter((p) => p.inStock).slice(0, 8);
  const featuredProducts = products.slice(0, 8);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useScrollReveal();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Hero with slideshow */}
      <section className="relative overflow-hidden h-[70vh] min-h-[500px] max-h-[700px]">
        {heroImages.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={src}
              alt={`Banner ${i + 1}`}
              fill
              className="object-cover"
              style={{ transform: `translateY(${scrollY * 0.3}px)` }}
              priority={i === 0}
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/75 to-white/20" />

        <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
          <div className="max-w-lg" style={{ transform: `translateY(${scrollY * -0.1}px)` }}>
            <Image
              src="/images/ShopLogo.png"
              alt="Trang Pham Cosmetics"
              width={160}
              height={64}
              className="h-14 w-auto mb-6 animate-fadeIn"
            />
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-charcoal tracking-tight mb-4 italic leading-tight">
              {t('home.hero.title', locale)}
            </h1>
            <p className="text-base md:text-lg text-text-secondary max-w-md mb-8 animate-fadeIn" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              {t('home.hero.subtitle', locale)}
            </p>
            <Link
              href="/category/skincare"
              className="inline-flex items-center gap-2 bg-charcoal text-white px-8 py-3.5 rounded-full font-medium text-sm hover:bg-charcoal-light transition-all hover:gap-3 animate-fadeIn"
              style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
            >
              {t('home.shopNow', locale)} <FiArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-8 bg-charcoal' : 'w-2 bg-charcoal/30'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-5 sm:py-6 flex flex-col sm:flex-row sm:justify-around gap-3 sm:gap-4">
          {[
            { icon: FiTruck, vi: 'Miễn phí ship từ 1.500 CZK', cs: 'Doprava zdarma od 1.500 Kč', en: 'Free shipping over 1,500 CZK' },
            { icon: FiShield, vi: '100% chính hãng', cs: '100% originální', en: '100% Authentic' },
            { icon: FiRefreshCw, vi: '14 ngày đổi trả', cs: '14 dní na vrácení', en: '14-day returns' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 sm:flex-col sm:items-center sm:gap-2 sm:text-center">
              <item.icon size={20} className="text-sage-dark shrink-0" />
              <span className="text-sm sm:text-xs md:text-sm text-text-secondary">{item[locale]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Flash Sale Banner */}
      <FlashSaleBanner />

      {/* In Stock - Featured */}
      {inStockProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6 scroll-reveal">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-charcoal">
              {locale === 'vi' ? 'SẢN PHẨM CÒN HÀNG' : locale === 'cs' ? 'SKLADEM' : 'IN STOCK'}
            </h2>
            <Link href="/category/skincare" className="text-sm text-sage-darker font-medium hover:underline flex items-center gap-1">
              {t('home.viewAll', locale)} <FiArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 stagger-children">
            {inStockProducts.map((p, i) => (
              <div key={p.id} className="scroll-reveal" style={{ '--stagger-index': i } as React.CSSProperties}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Brand carousel */}
      <section className="bg-cream py-10 scroll-reveal-scale">
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

      {/* All Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6 scroll-reveal">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-charcoal">
            {locale === 'vi' ? 'TẤT CẢ SẢN PHẨM' : locale === 'cs' ? 'VŠECHNY PRODUKTY' : 'ALL PRODUCTS'}
          </h2>
          <Link href="/category/makeup" className="text-sm text-sage-darker font-medium hover:underline flex items-center gap-1">
            {t('home.viewAll', locale)} <FiArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 stagger-children">
          {featuredProducts.map((p, i) => (
            <div key={p.id} className="scroll-reveal" style={{ '--stagger-index': i } as React.CSSProperties}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sage-lightest scroll-reveal-scale">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-3 font-[family-name:var(--font-playfair)] italic">
            {locale === 'vi' ? 'K-Beauty chính hãng tại Séc' : locale === 'cs' ? 'Originální K-Beauty v Česku' : 'Authentic K-Beauty in Czech Republic'}
          </h2>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
            {locale === 'vi' ? 'Sản phẩm từ các thương hiệu Hàn Quốc uy tín' : locale === 'cs' ? 'Produkty od ověřených korejských značek' : 'Products from trusted Korean brands'}
          </p>
          <Link href="/category/skincare" className="inline-flex items-center gap-2 bg-sage text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-sage-dark transition-all hover:gap-3">
            {t('home.shopNow', locale)} <FiArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
