'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from '@/lib/LocaleContext';

const COOKIE_KEY = 'trangpham-cookie-consent';

type CookiePrefs = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
};

export default function CookieConsent() {
  const { locale } = useLocale();
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState<CookiePrefs>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_KEY);
      if (!stored) {
        // Show banner after short delay for better UX
        const timer = setTimeout(() => setVisible(true), 1000);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

  const savePrefs = (p: CookiePrefs) => {
    try {
      localStorage.setItem(COOKIE_KEY, JSON.stringify(p));
    } catch {
      // ignore
    }
    setVisible(false);
  };

  const acceptAll = () => savePrefs({ essential: true, analytics: true, marketing: true });
  const acceptSelected = () => savePrefs(prefs);
  const rejectAll = () => savePrefs({ essential: true, analytics: false, marketing: false });

  if (!visible) return null;

  const text = {
    cs: {
      title: 'Soubory cookie',
      desc: 'Tento web používá cookies pro zajištění správného fungování a zlepšení vašeho zážitku.',
      essential: 'Nezbytné',
      essentialDesc: 'Nutné pro fungování webu (košík, přihlášení)',
      analytics: 'Analytické',
      analyticsDesc: 'Pomáhají nám pochopit, jak web používáte',
      marketing: 'Marketingové',
      marketingDesc: 'Slouží k zobrazení relevantní reklamy',
      acceptAll: 'Přijmout vše',
      acceptSelected: 'Přijmout vybrané',
      rejectAll: 'Pouze nezbytné',
      settings: 'Nastavení',
      moreInfo: 'Více informací',
    },
    vi: {
      title: 'Cookie',
      desc: 'Trang web sử dụng cookie để đảm bảo hoạt động đúng và cải thiện trải nghiệm của bạn.',
      essential: 'Cần thiết',
      essentialDesc: 'Cần cho hoạt động website (giỏ hàng, đăng nhập)',
      analytics: 'Phân tích',
      analyticsDesc: 'Giúp chúng tôi hiểu cách bạn sử dụng website',
      marketing: 'Marketing',
      marketingDesc: 'Hiển thị quảng cáo phù hợp',
      acceptAll: 'Chấp nhận tất cả',
      acceptSelected: 'Chấp nhận đã chọn',
      rejectAll: 'Chỉ cần thiết',
      settings: 'Cài đặt',
      moreInfo: 'Thêm thông tin',
    },
    en: {
      title: 'Cookies',
      desc: 'This website uses cookies to ensure proper functionality and improve your experience.',
      essential: 'Essential',
      essentialDesc: 'Required for website functionality (cart, login)',
      analytics: 'Analytics',
      analyticsDesc: 'Help us understand how you use the website',
      marketing: 'Marketing',
      marketingDesc: 'Used to show relevant advertisements',
      acceptAll: 'Accept All',
      acceptSelected: 'Accept Selected',
      rejectAll: 'Essential Only',
      settings: 'Settings',
      moreInfo: 'More info',
    },
  };

  const tx = text[locale] || text.en;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] p-4 animate-slideUp">
      <div className="max-w-2xl mx-auto bg-white border border-border rounded-2xl shadow-2xl p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-semibold text-charcoal text-sm">{tx.title}</h3>
        </div>

        <p className="text-xs text-text-secondary mb-4 leading-relaxed">
          {tx.desc}{' '}
          <Link href="/privacy" className="text-sage-darker underline hover:no-underline">
            {tx.moreInfo}
          </Link>
        </p>

        {/* Details toggle */}
        {showDetails && (
          <div className="space-y-2.5 mb-4">
            <label className="flex items-center gap-3 p-2.5 bg-sage-lightest rounded-lg cursor-not-allowed">
              <input type="checkbox" checked disabled className="accent-sage-darker w-4 h-4" />
              <div>
                <span className="text-sm font-medium text-charcoal">{tx.essential}</span>
                <p className="text-xs text-text-muted">{tx.essentialDesc}</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-2.5 bg-cream rounded-lg cursor-pointer hover:bg-sage-lightest transition-colors">
              <input
                type="checkbox"
                checked={prefs.analytics}
                onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))}
                className="accent-sage-darker w-4 h-4"
              />
              <div>
                <span className="text-sm font-medium text-charcoal">{tx.analytics}</span>
                <p className="text-xs text-text-muted">{tx.analyticsDesc}</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-2.5 bg-cream rounded-lg cursor-pointer hover:bg-sage-lightest transition-colors">
              <input
                type="checkbox"
                checked={prefs.marketing}
                onChange={(e) => setPrefs((p) => ({ ...p, marketing: e.target.checked }))}
                className="accent-sage-darker w-4 h-4"
              />
              <div>
                <span className="text-sm font-medium text-charcoal">{tx.marketing}</span>
                <p className="text-xs text-text-muted">{tx.marketingDesc}</p>
              </div>
            </label>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={acceptAll}
            className="flex-1 bg-charcoal text-white text-xs font-medium py-2.5 px-4 rounded-full hover:bg-charcoal-light transition-colors"
          >
            {tx.acceptAll}
          </button>
          {showDetails ? (
            <button
              onClick={acceptSelected}
              className="flex-1 border border-border text-charcoal text-xs font-medium py-2.5 px-4 rounded-full hover:bg-sage-lightest transition-colors"
            >
              {tx.acceptSelected}
            </button>
          ) : (
            <button
              onClick={() => setShowDetails(true)}
              className="flex-1 border border-border text-charcoal text-xs font-medium py-2.5 px-4 rounded-full hover:bg-sage-lightest transition-colors"
            >
              {tx.settings}
            </button>
          )}
          <button
            onClick={rejectAll}
            className="flex-1 text-text-muted text-xs font-medium py-2.5 px-4 rounded-full hover:bg-sage-lightest transition-colors"
          >
            {tx.rejectAll}
          </button>
        </div>
      </div>
    </div>
  );
}
