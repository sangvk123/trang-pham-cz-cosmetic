'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { LocaleProvider } from '@/lib/LocaleContext';
import { CartProvider } from '@/lib/CartContext';
import { ToastProvider } from '@/lib/ToastContext';
import { WishlistProvider } from '@/lib/WishlistContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import BackToTop from '@/components/BackToTop';
import CookieConsent from '@/components/CookieConsent';
import WelcomePopup from '@/components/WelcomePopup';
import ChatBot from '@/components/ChatBot';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <LocaleProvider>
        <CartProvider>
        <ToastProvider>
        <WishlistProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingContact />
          <BackToTop />
          <CookieConsent />
          <WelcomePopup />
          <ChatBot />
        </div>
        </WishlistProvider>
        </ToastProvider>
        </CartProvider>
      </LocaleProvider>
    </SessionProvider>
  );
}
