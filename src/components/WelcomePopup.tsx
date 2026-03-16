'use client';

import { useState, useEffect } from 'react';
import { FiX, FiGift } from 'react-icons/fi';
import { useLocale } from '@/lib/LocaleContext';
import { useToast } from '@/lib/ToastContext';

const POPUP_KEY = 'trangpham-welcome-popup';
const PROMO_CODE = 'WELCOME10';

const text = {
  vi: {
    badge: 'Ưu đãi đặc biệt',
    title: 'Giảm 10% đơn hàng đầu tiên!',
    desc: 'Đăng ký nhận tin để nhận mã giảm giá và cập nhật sản phẩm mới.',
    placeholder: 'Nhập email của bạn',
    cta: 'Nhận mã giảm giá',
    noThanks: 'Để sau',
    successTitle: 'Mã giảm giá của bạn:',
    successDesc: 'Sử dụng mã này khi đặt hàng để được giảm 10%.',
    copied: 'Đã sao chép!',
    copy: 'Sao chép mã',
    startShopping: 'Bắt đầu mua sắm',
  },
  cs: {
    badge: 'Speciální nabídka',
    title: '10% sleva na první objednávku!',
    desc: 'Přihlaste se k odběru novinek a získejte slevový kód.',
    placeholder: 'Zadejte svůj e-mail',
    cta: 'Získat slevu',
    noThanks: 'Ne, děkuji',
    successTitle: 'Váš slevový kód:',
    successDesc: 'Použijte tento kód při objednávce pro 10% slevu.',
    copied: 'Zkopírováno!',
    copy: 'Kopírovat kód',
    startShopping: 'Začít nakupovat',
  },
  en: {
    badge: 'Special Offer',
    title: '10% OFF your first order!',
    desc: 'Subscribe to our newsletter and get a discount code plus new product updates.',
    placeholder: 'Enter your email',
    cta: 'Get Discount',
    noThanks: 'No, thanks',
    successTitle: 'Your discount code:',
    successDesc: 'Use this code at checkout for 10% off.',
    copied: 'Copied!',
    copy: 'Copy Code',
    startShopping: 'Start Shopping',
  },
};

export default function WelcomePopup() {
  const { locale } = useLocale();
  const { showToast } = useToast();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(POPUP_KEY);
      if (!stored) {
        const timer = setTimeout(() => setVisible(true), 3000);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    try {
      localStorage.setItem(POPUP_KEY, 'dismissed');
    } catch {
      // ignore
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast(
        locale === 'vi' ? 'Vui lòng nhập email hợp lệ' :
        locale === 'cs' ? 'Zadejte platný e-mail' :
        'Please enter a valid email', 'error'
      );
      return;
    }
    setSubmitted(true);
    try {
      localStorage.setItem(POPUP_KEY, 'subscribed');
    } catch {
      // ignore
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(PROMO_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!visible) return null;

  const tx = text[locale] || text.en;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-slideUp">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-2 hover:bg-sage-lightest rounded-full transition-colors"
        >
          <FiX size={20} />
        </button>

        {/* Top gradient bar */}
        <div className="h-1.5 bg-gradient-to-r from-sage via-sage-dark to-sage-darker" />

        <div className="p-6 sm:p-8">
          {!submitted ? (
            <>
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 bg-sage-lightest text-sage-darker text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                <FiGift size={14} />
                {tx.badge}
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-charcoal mb-2 font-[family-name:var(--font-playfair)] italic">
                {tx.title}
              </h2>
              <p className="text-sm text-text-secondary mb-6 leading-relaxed">{tx.desc}</p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={tx.placeholder}
                  className="w-full border border-border rounded-full px-4 py-3 text-sm focus:outline-none focus:border-sage-dark focus:ring-1 focus:ring-sage-dark transition-all"
                />
                <button
                  type="submit"
                  className="w-full bg-charcoal text-white py-3 rounded-full font-medium text-sm hover:bg-charcoal-light active:bg-charcoal-light transition-colors"
                >
                  {tx.cta}
                </button>
              </form>

              <button
                onClick={handleClose}
                className="w-full text-center text-xs text-text-muted mt-3 py-2 hover:text-text-secondary transition-colors"
              >
                {tx.noThanks}
              </button>
            </>
          ) : (
            /* Success state */
            <div className="text-center py-2">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sage-lightest flex items-center justify-center">
                <FiGift size={28} className="text-sage-darker" />
              </div>
              <h3 className="text-lg font-bold text-charcoal mb-1">{tx.successTitle}</h3>

              {/* Promo code box */}
              <div className="bg-sage-lightest rounded-xl p-4 my-4">
                <p className="text-2xl font-bold text-sage-darker tracking-widest mb-2">{PROMO_CODE}</p>
                <button
                  onClick={handleCopy}
                  className="text-xs font-medium text-sage-darker underline hover:no-underline"
                >
                  {copied ? tx.copied : tx.copy}
                </button>
              </div>

              <p className="text-sm text-text-secondary mb-5">{tx.successDesc}</p>

              <button
                onClick={handleClose}
                className="w-full bg-charcoal text-white py-3 rounded-full font-medium text-sm hover:bg-charcoal-light transition-colors"
              >
                {tx.startShopping}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
