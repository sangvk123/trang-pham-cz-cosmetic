'use client';

import Link from 'next/link';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiInstagram, FiMessageCircle } from 'react-icons/fi';
import Logo from './Logo';
import { useLocale } from '@/lib/LocaleContext';
import { t } from '@/lib/i18n';
import { storeInfo } from '@/data/store';

export default function Footer() {
  const { locale } = useLocale();

  return (
    <footer className="bg-gray-800 text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Store info */}
          <div>
            <div className="mb-4">
              <div className="text-xl font-bold text-primary mb-1">{storeInfo.name}</div>
              <p className="text-gray-400 text-sm">Save The Best For You!</p>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <FiMapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                {storeInfo.address[locale]}
              </li>
              {storeInfo.phone.map((phone, i) => (
                <li key={i} className="flex items-center gap-2">
                  <FiPhone size={14} className="shrink-0 text-primary" />
                  <a href={`tel:${phone}`} className="hover:text-primary transition-colors">{phone}</a>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <FiMail size={14} className="shrink-0 text-primary" />
                <a href={`mailto:${storeInfo.email}`} className="hover:text-primary transition-colors">{storeInfo.email}</a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">{t('footer.about', locale)}</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/about" className="hover:text-primary transition-colors">Trang Pham Cz Cosmetic</Link></li>
              <li><Link href="/brands" className="hover:text-primary transition-colors">{t('nav.brands', locale)}</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">{t('nav.blog', locale)}</Link></li>
              <li><Link href="/stores" className="hover:text-primary transition-colors">{locale === 'vi' ? 'He thong cua hang' : locale === 'cs' ? 'Nase prodejny' : 'Store Locations'}</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">{t('footer.policy', locale)}</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/shipping" className="hover:text-primary transition-colors">{t('footer.shipping', locale)}</Link></li>
              <li><Link href="/returns" className="hover:text-primary transition-colors">{t('footer.returnPolicy', locale)}</Link></li>
              <li><Link href="/payment" className="hover:text-primary transition-colors">{t('footer.payment', locale)}</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">{locale === 'vi' ? 'Chinh sach bao mat' : locale === 'cs' ? 'Zasady ochrany soukromi' : 'Privacy Policy'}</Link></li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">{t('footer.followUs', locale)}</h4>
            <div className="flex items-center gap-3 mb-6">
              {storeInfo.socialMedia.facebook && (
                <a href={storeInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <FiFacebook size={18} />
                </a>
              )}
              {storeInfo.socialMedia.instagram && (
                <a href={storeInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <FiInstagram size={18} />
                </a>
              )}
              {storeInfo.socialMedia.zalo && (
                <a href={storeInfo.socialMedia.zalo} target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <FiMessageCircle size={18} />
                </a>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-300 mb-2">
                {locale === 'vi' ? 'Dang ky nhan tin khuyen mai' : locale === 'cs' ? 'Prihlaste se k odberu novinek' : 'Subscribe to our newsletter'}
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email..."
                  className="flex-1 bg-gray-700 text-white text-sm px-3 py-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button className="bg-primary text-white text-sm px-4 py-2 rounded-r-lg hover:bg-primary-dark transition-colors font-medium">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
          <p>&copy; 2024 {storeInfo.name}. {t('footer.rights', locale)}</p>
          <p className="mt-1 sm:mt-0">Made with love in Czech Republic</p>
        </div>
      </div>
    </footer>
  );
}
