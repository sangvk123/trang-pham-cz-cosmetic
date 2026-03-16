'use client';

import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useLocale } from '@/lib/LocaleContext';
import { t } from '@/lib/i18n';

const faqs = [
  { q: 'faq.q1', a: 'faq.a1' },
  { q: 'faq.q2', a: 'faq.a2' },
  { q: 'faq.q3', a: 'faq.a3' },
  { q: 'faq.q4', a: 'faq.a4' },
  { q: 'faq.q5', a: 'faq.a5' },
  { q: 'faq.q6', a: 'faq.a6' },
];

export default function FAQPage() {
  const { locale } = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-text-muted mb-6">
        <a href="/" className="hover:text-sage-darker">{t('nav.home', locale)}</a>
        <span className="mx-2">/</span>
        <span className="text-charcoal font-medium">{t('faq.title', locale)}</span>
      </nav>

      <h1 className="text-3xl font-bold text-charcoal mb-8 text-center font-[family-name:var(--font-playfair)] italic">
        {t('faq.title', locale)}
      </h1>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-sage-lightest/50 transition-colors"
            >
              <span className="font-medium text-charcoal text-sm pr-4">{t(faq.q, locale)}</span>
              <FiChevronDown
                size={18}
                className={`text-text-muted shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className="overflow-hidden transition-all duration-300"
              style={{
                maxHeight: openIndex === i ? '500px' : '0px',
                opacity: openIndex === i ? 1 : 0,
              }}
            >
              <div className="px-5 pb-4 text-sm text-text-secondary leading-relaxed">
                {t(faq.a, locale)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
