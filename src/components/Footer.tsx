'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiFacebook, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { useLocale } from '@/lib/LocaleContext';
import { t } from '@/lib/i18n';
import { storeInfo } from '@/data/store';

export default function Footer() {
  const { locale } = useLocale();

  return (
    <footer className="bg-cream border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Image src="/images/ShopLogo.png" alt={storeInfo.name} width={120} height={48} className="h-12 w-auto mb-4" />
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-center gap-2">
                <FiPhone size={14} className="text-sage-dark shrink-0" />
                <a href={`tel:${storeInfo.phone[0]}`} className="hover:text-sage-darker transition-colors">{storeInfo.phone[0]}</a>
              </li>
              <li className="flex items-center gap-2">
                <FiMail size={14} className="text-sage-dark shrink-0" />
                <a href={`mailto:${storeInfo.email}`} className="hover:text-sage-darker transition-colors">{storeInfo.email}</a>
              </li>
              <li className="flex items-start gap-2">
                <FiMapPin size={14} className="text-sage-dark shrink-0 mt-0.5" />
                <span>{storeInfo.address[locale]}</span>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal mb-4">{t('footer.help', locale)}</h4>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li><Link href="/shipping" className="hover:text-sage-darker transition-colors">{t('footer.shipping', locale)}</Link></li>
              <li><Link href="/returns" className="hover:text-sage-darker transition-colors">{t('footer.returns', locale)}</Link></li>
              <li><Link href="/contact" className="hover:text-sage-darker transition-colors">{t('footer.contact', locale)}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal mb-4">{t('footer.about', locale)}</h4>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li><Link href="/about" className="hover:text-sage-darker transition-colors">{t('footer.about', locale)}</Link></li>
              <li><Link href="/privacy" className="hover:text-sage-darker transition-colors">{t('footer.privacy', locale)}</Link></li>
              <li><Link href="/terms" className="hover:text-sage-darker transition-colors">{t('footer.terms', locale)}</Link></li>
            </ul>
          </div>

          {/* Newsletter + Social */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal mb-4">{t('footer.newsletter', locale)}</h4>
            <div className="flex mb-5">
              <input type="email" placeholder="Email" className="flex-1 bg-white border border-border text-sm px-3 py-2 rounded-l-full focus:outline-none focus:border-sage-dark" />
              <button className="bg-sage text-white text-sm px-5 py-2 rounded-r-full hover:bg-sage-dark transition-colors font-medium">
                {t('footer.subscribe', locale)}
              </button>
            </div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal mb-3">{t('footer.followUs', locale)}</h4>
            <div className="flex gap-3">
              {storeInfo.socialMedia.facebook && (
                <a href={storeInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-sage-light rounded-full flex items-center justify-center hover:bg-sage transition-colors text-charcoal hover:text-white">
                  <FiFacebook size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-xs text-text-muted">
          &copy; 2024 {storeInfo.name}. {t('footer.rights', locale)}
        </div>
      </div>
    </footer>
  );
}
