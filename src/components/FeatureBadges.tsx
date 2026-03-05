'use client';

import { FiTruck, FiShield, FiHeadphones, FiRefreshCw } from 'react-icons/fi';
import { useLocale } from '@/lib/LocaleContext';
import { t } from '@/lib/i18n';

const features = [
  { icon: FiTruck, key: 'home.freeShipping', color: 'text-primary' },
  { icon: FiShield, key: 'home.authentic', color: 'text-blue-500' },
  { icon: FiHeadphones, key: 'home.support', color: 'text-amber-500' },
  { icon: FiRefreshCw, key: 'home.returns', color: 'text-green-500' },
];

export default function FeatureBadges() {
  const { locale } = useLocale();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {features.map((feat) => (
        <div
          key={feat.key}
          className="bg-white rounded-lg border border-border p-4 flex items-center gap-3 hover:shadow-md transition-shadow"
        >
          <div className={`${feat.color} shrink-0`}>
            <feat.icon size={28} />
          </div>
          <span className="text-sm font-medium leading-tight">{t(feat.key, locale)}</span>
        </div>
      ))}
    </div>
  );
}
