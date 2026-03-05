'use client';

import { useState, useEffect } from 'react';
import { FiClock } from 'react-icons/fi';
import { useLocale } from '@/lib/LocaleContext';
import { t } from '@/lib/i18n';
import { products } from '@/data/products';
import ProductCard from './ProductCard';

export default function DailyDeals() {
  const { locale } = useLocale();
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProducts = products.filter((p) => p.isOnSale).slice(0, 6);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl md:text-2xl font-bold">{t('home.dailyDeals', locale)}</h2>
          <div className="flex items-center gap-1 bg-sale text-white px-3 py-1 rounded-full text-sm font-mono font-bold">
            <FiClock size={14} />
            <span>{pad(timeLeft.hours)}</span>:
            <span>{pad(timeLeft.minutes)}</span>:
            <span>{pad(timeLeft.seconds)}</span>
          </div>
        </div>
        <a href="/category/deals" className="text-primary text-sm font-medium hover:underline">
          {t('viewAll', locale)} →
        </a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {dealProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
