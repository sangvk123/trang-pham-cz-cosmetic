'use client';

import { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import { FaFacebook } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';
import { useLocale } from '@/lib/LocaleContext';
import { useToast } from '@/lib/ToastContext';
import { t } from '@/lib/i18n';
import { storeInfo } from '@/data/store';

export default function ContactPage() {
  const { locale } = useLocale();
  const { showToast } = useToast();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    showToast(t('contact.formSent', locale), 'success');
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-text-muted mb-6">
        <a href="/" className="hover:text-sage-darker">{t('nav.home', locale)}</a>
        <span className="mx-2">/</span>
        <span className="text-charcoal font-medium">{t('contact.title', locale)}</span>
      </nav>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-charcoal mb-2 font-[family-name:var(--font-playfair)] italic">{t('contact.title', locale)}</h1>
        <p className="text-text-secondary">{t('contact.subtitle', locale)}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-sage-lightest rounded-xl p-6 space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-sage-light rounded-full flex items-center justify-center shrink-0">
                <FiPhone size={18} className="text-sage-darker" />
              </div>
              <div>
                <h3 className="font-semibold text-charcoal text-sm mb-1">{t('contact.phone', locale)}</h3>
                <a href={`tel:${storeInfo.phone[0]}`} className="text-text-secondary text-sm hover:text-sage-darker transition-colors">
                  {storeInfo.phone[0]}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-sage-light rounded-full flex items-center justify-center shrink-0">
                <FiMail size={18} className="text-sage-darker" />
              </div>
              <div>
                <h3 className="font-semibold text-charcoal text-sm mb-1">{t('contact.email', locale)}</h3>
                <a href={`mailto:${storeInfo.email}`} className="text-text-secondary text-sm hover:text-sage-darker transition-colors">
                  {storeInfo.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-sage-light rounded-full flex items-center justify-center shrink-0">
                <FiMapPin size={18} className="text-sage-darker" />
              </div>
              <div>
                <h3 className="font-semibold text-charcoal text-sm mb-1">{t('contact.address', locale)}</h3>
                <p className="text-text-secondary text-sm">{storeInfo.address[locale]}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-sage-light rounded-full flex items-center justify-center shrink-0">
                <FiClock size={18} className="text-sage-darker" />
              </div>
              <div>
                <h3 className="font-semibold text-charcoal text-sm mb-1">{t('contact.hours', locale)}</h3>
                <p className="text-text-secondary text-sm">{t('contact.hoursValue', locale)}</p>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-charcoal text-sm mb-3">{t('contact.social', locale)}</h3>
            <div className="flex gap-3">
              {storeInfo.socialMedia.facebook && (
                <a
                  href={storeInfo.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-sage-light rounded-full flex items-center justify-center hover:bg-sage transition-colors text-charcoal hover:text-white"
                >
                  <FaFacebook size={18} />
                </a>
              )}
              <a
                href="https://zalo.me/0607715020"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-sage-light rounded-full flex items-center justify-center hover:bg-sage transition-colors text-charcoal hover:text-white"
              >
                <SiZalo size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-cream rounded-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">{t('contact.formName', locale)}</label>
              <input
                type="text"
                required
                className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-sage-dark focus:ring-1 focus:ring-sage-dark transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">{t('contact.formEmail', locale)}</label>
              <input
                type="email"
                required
                className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-sage-dark focus:ring-1 focus:ring-sage-dark transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">{t('contact.formMessage', locale)}</label>
              <textarea
                required
                rows={5}
                className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-sage-dark focus:ring-1 focus:ring-sage-dark transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-charcoal text-white py-3 rounded-full font-medium text-sm hover:bg-charcoal-light transition-colors"
            >
              {t('contact.formSend', locale)}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
