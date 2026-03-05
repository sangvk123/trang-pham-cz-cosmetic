'use client';

import { ReactNode } from 'react';
import { LocaleProvider } from '@/lib/LocaleContext';
import { CartProvider } from '@/lib/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </CartProvider>
    </LocaleProvider>
  );
}
