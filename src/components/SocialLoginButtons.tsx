'use client';

import { signIn } from 'next-auth/react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { Locale } from '@/types';

const texts = {
  or: { vi: 'hoặc', cs: 'nebo', en: 'or' },
  google: { vi: 'Tiếp tục với Google', cs: 'Pokračovat s Google', en: 'Continue with Google' },
  facebook: { vi: 'Tiếp tục với Facebook', cs: 'Pokračovat s Facebook', en: 'Continue with Facebook' },
};

export default function SocialLoginButtons({ locale }: { locale: Locale }) {
  return (
    <>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-4 text-text-muted uppercase tracking-wider">{texts.or[locale]}</span>
        </div>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/account' })}
          className="w-full flex items-center justify-center gap-3 border border-border py-2.5 rounded-full text-sm font-medium text-charcoal hover:bg-sage-lightest transition-colors"
        >
          <FaGoogle size={16} className="text-[#4285F4]" />
          {texts.google[locale]}
        </button>

        <button
          type="button"
          onClick={() => signIn('facebook', { callbackUrl: '/account' })}
          className="w-full flex items-center justify-center gap-3 border border-border py-2.5 rounded-full text-sm font-medium text-charcoal hover:bg-sage-lightest transition-colors"
        >
          <FaFacebook size={16} className="text-[#1877F2]" />
          {texts.facebook[locale]}
        </button>
      </div>
    </>
  );
}
