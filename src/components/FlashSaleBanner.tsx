'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { FiZap, FiArrowRight } from 'react-icons/fi';
import { useLocale } from '@/lib/LocaleContext';

// Configure sale end time - next Sunday 23:59:59
function getNextSaleEnd(): Date {
  const now = new Date();
  const end = new Date(now);
  const daysUntilSunday = (7 - now.getDay()) % 7 || 7;
  end.setDate(now.getDate() + daysUntilSunday);
  end.setHours(23, 59, 59, 0);
  return end;
}

const SALE_END = getNextSaleEnd();

const text = {
  vi: {
    badge: 'Flash Sale',
    title: 'Giảm đến 30% Skincare Hàn Quốc',
    desc: 'Ưu đãi có hạn — Nhanh tay kẻo hết!',
    cta: 'Xem ngay',
    days: 'ngày',
    hours: 'giờ',
    mins: 'phút',
    secs: 'giây',
  },
  cs: {
    badge: 'Flash Sale',
    title: 'Až 30% sleva na korejskou kosmetiku',
    desc: 'Časově omezená nabídka — Nečekejte!',
    cta: 'Zobrazit',
    days: 'dní',
    hours: 'hod',
    mins: 'min',
    secs: 'sek',
  },
  en: {
    badge: 'Flash Sale',
    title: 'Up to 30% OFF Korean Skincare',
    desc: 'Limited time offer — Don\'t miss out!',
    cta: 'Shop Now',
    days: 'days',
    hours: 'hrs',
    mins: 'min',
    secs: 'sec',
  },
};

function getTimeLeft(end: Date) {
  const diff = Math.max(0, end.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    mins: Math.floor((diff / (1000 * 60)) % 60),
    secs: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="bg-white/20 backdrop-blur-sm rounded-lg w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-1">
        <span className="text-lg sm:text-xl font-bold text-white">{String(value).padStart(2, '0')}</span>
      </div>
      <span className="text-[10px] sm:text-xs text-white/80 uppercase">{label}</span>
    </div>
  );
}

export default function FlashSaleBanner() {
  const { locale } = useLocale();
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(SALE_END));
  const [mounted, setMounted] = useState(false);

  const tick = useCallback(() => {
    setTimeLeft(getTimeLeft(SALE_END));
  }, []);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [tick]);

  if (!mounted) return null;

  const tx = text[locale] || text.en;
  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.mins === 0 && timeLeft.secs === 0;

  if (isExpired) return null;

  return (
    <section className="bg-gradient-to-r from-charcoal via-charcoal-light to-charcoal relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-sage/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-sage/10 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10 relative">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          {/* Left - Text */}
          <div className="flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 bg-sale text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
              <FiZap size={12} />
              {tx.badge}
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 font-[family-name:var(--font-playfair)] italic">
              {tx.title}
            </h2>
            <p className="text-sm text-white/70 mb-4 sm:mb-5">{tx.desc}</p>
            <Link
              href="/category/skincare"
              className="inline-flex items-center gap-2 bg-white text-charcoal px-6 py-2.5 rounded-full font-medium text-sm hover:bg-sage-lightest transition-colors hover:gap-3"
            >
              {tx.cta} <FiArrowRight size={14} />
            </Link>
          </div>

          {/* Right - Countdown */}
          <div className="flex gap-2 sm:gap-3">
            <CountdownUnit value={timeLeft.days} label={tx.days} />
            <div className="text-white/60 text-xl font-bold self-center mb-5">:</div>
            <CountdownUnit value={timeLeft.hours} label={tx.hours} />
            <div className="text-white/60 text-xl font-bold self-center mb-5">:</div>
            <CountdownUnit value={timeLeft.mins} label={tx.mins} />
            <div className="text-white/60 text-xl font-bold self-center mb-5">:</div>
            <CountdownUnit value={timeLeft.secs} label={tx.secs} />
          </div>
        </div>
      </div>
    </section>
  );
}
