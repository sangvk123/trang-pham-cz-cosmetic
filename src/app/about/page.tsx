'use client';

import Image from 'next/image';
import { FiShield, FiStar, FiDollarSign, FiHeart } from 'react-icons/fi';
import { useLocale } from '@/lib/LocaleContext';
import { t } from '@/lib/i18n';

const values = [
  { icon: FiShield, titleKey: 'about.value1.title', textKey: 'about.value1.text' },
  { icon: FiStar, titleKey: 'about.value2.title', textKey: 'about.value2.text' },
  { icon: FiDollarSign, titleKey: 'about.value3.title', textKey: 'about.value3.text' },
  { icon: FiHeart, titleKey: 'about.value4.title', textKey: 'about.value4.text' },
];

export default function AboutPage() {
  const { locale } = useLocale();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-text-muted mb-6">
        <a href="/" className="hover:text-sage-darker">{t('nav.home', locale)}</a>
        <span className="mx-2">/</span>
        <span className="text-charcoal font-medium">{t('about.title', locale)}</span>
      </nav>

      {/* Hero */}
      <div className="text-center mb-12">
        <Image src="/images/ShopLogo.png" alt="Trang Pham Cosmetics" width={160} height={64} className="h-14 w-auto mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-charcoal mb-3 font-[family-name:var(--font-playfair)] italic">{t('about.title', locale)}</h1>
      </div>

      {/* Story */}
      <div className="max-w-3xl mx-auto mb-14">
        <h2 className="text-xl font-bold text-charcoal mb-4">{t('about.story.title', locale)}</h2>
        <p className="text-text-secondary leading-relaxed mb-4">{t('about.story.p1', locale)}</p>
        <p className="text-text-secondary leading-relaxed">{t('about.story.p2', locale)}</p>
      </div>

      {/* Mission */}
      <div className="bg-sage-lightest rounded-2xl p-8 text-center max-w-3xl mx-auto mb-14">
        <h2 className="text-xl font-bold text-charcoal mb-3">{t('about.mission.title', locale)}</h2>
        <p className="text-text-secondary leading-relaxed text-lg italic">{t('about.mission.text', locale)}</p>
      </div>

      {/* Values */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-charcoal mb-8 text-center">{t('about.values', locale)}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((v, i) => (
            <div key={i} className="bg-cream rounded-xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-sage-light rounded-full flex items-center justify-center shrink-0">
                <v.icon size={22} className="text-sage-darker" />
              </div>
              <div>
                <h3 className="font-semibold text-charcoal mb-1">{t(v.titleKey, locale)}</h3>
                <p className="text-sm text-text-secondary">{t(v.textKey, locale)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
