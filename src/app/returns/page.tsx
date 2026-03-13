'use client';

import { FiCalendar, FiCheckCircle, FiRefreshCw, FiCreditCard } from 'react-icons/fi';
import { useLocale } from '@/lib/LocaleContext';
import { t } from '@/lib/i18n';

const sections = [
  { icon: FiCalendar, titleKey: 'returns.period.title', textKey: 'returns.period.text' },
  { icon: FiCheckCircle, titleKey: 'returns.condition.title', textKey: 'returns.condition.text' },
  { icon: FiRefreshCw, titleKey: 'returns.process.title', textKey: 'returns.process.text' },
  { icon: FiCreditCard, titleKey: 'returns.refund.title', textKey: 'returns.refund.text' },
];

export default function ReturnsPage() {
  const { locale } = useLocale();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-text-muted mb-6">
        <a href="/" className="hover:text-sage-darker">{t('nav.home', locale)}</a>
        <span className="mx-2">/</span>
        <span className="text-charcoal font-medium">{t('returns.title', locale)}</span>
      </nav>

      <h1 className="text-3xl font-bold text-charcoal mb-8 text-center font-[family-name:var(--font-playfair)] italic">
        {t('returns.title', locale)}
      </h1>

      <div className="space-y-6">
        {sections.map((s, i) => (
          <div key={i} className="bg-cream rounded-xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 bg-sage-light rounded-full flex items-center justify-center shrink-0">
              <s.icon size={22} className="text-sage-darker" />
            </div>
            <div>
              <h2 className="font-semibold text-charcoal mb-2">{t(s.titleKey, locale)}</h2>
              <p className="text-sm text-text-secondary leading-relaxed">{t(s.textKey, locale)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
