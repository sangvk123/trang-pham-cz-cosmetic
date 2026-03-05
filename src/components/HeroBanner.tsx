'use client';

import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useLocale } from '@/lib/LocaleContext';

const banners = [
  {
    id: '1',
    gradient: 'from-primary to-teal-600',
    title: { vi: 'Sale thang 3 - Giam den 50%', cs: 'Breznovvy vyprodej - Slevy az 50%', en: 'March Sale - Up to 50% Off' },
    subtitle: { vi: 'Uu dai lon cho tat ca san pham cham soc da', cs: 'Velke slevy na vsechny produkty pece o plet', en: 'Big discounts on all skincare products' },
    cta: { vi: 'Mua ngay', cs: 'Nakupte ted', en: 'Shop Now' },
  },
  {
    id: '2',
    gradient: 'from-rose-500 to-pink-600',
    title: { vi: 'Bo suu tap Makeup moi', cs: 'Nova kolekce make-upu', en: 'New Makeup Collection' },
    subtitle: { vi: 'Nhung xu huong trang diem hot nhat 2024', cs: 'Nejzadanejsi trendy v make-upu 2024', en: 'Hottest makeup trends 2024' },
    cta: { vi: 'Kham pha ngay', cs: 'Objevte', en: 'Discover' },
  },
  {
    id: '3',
    gradient: 'from-amber-500 to-orange-600',
    title: { vi: 'Freeship tu 499K', cs: 'Doprava zdarma od 499 CZK', en: 'Free Shipping from 499K' },
    subtitle: { vi: '100% chinh hang - Doi tra de dang', cs: '100% originalni - Snadne vraceni', en: '100% Authentic - Easy Returns' },
    cta: { vi: 'Tim hieu them', cs: 'Vice info', en: 'Learn More' },
  },
];

export default function HeroBanner() {
  const { locale } = useLocale();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + banners.length) % banners.length);
  const next = () => setCurrent((c) => (c + 1) % banners.length);

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className={`min-w-full bg-gradient-to-r ${banner.gradient} text-white px-8 md:px-16 py-16 md:py-24 flex items-center`}
          >
            <div className="max-w-lg">
              <h2 className="text-2xl md:text-4xl font-bold mb-3 leading-tight">
                {banner.title[locale]}
              </h2>
              <p className="text-sm md:text-lg opacity-90 mb-6">
                {banner.subtitle[locale]}
              </p>
              <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors shadow-lg">
                {banner.cta[locale]}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/50 transition-colors"
      >
        <FiChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/50 transition-colors"
      >
        <FiChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current ? 'bg-white w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
