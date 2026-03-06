'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiSearch, FiShoppingBag, FiUser, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { useLocale } from '@/lib/LocaleContext';
import { useCart } from '@/lib/CartContext';
import { t, localeFlags, localeNames } from '@/lib/i18n';
import { categories } from '@/data/categories';
import { formatPrice } from '@/lib/utils';
import { Locale } from '@/types';

export default function Header() {
  const { locale, setLocale } = useLocale();
  const { totalItems, totalPrice } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [megaMenu, setMegaMenu] = useState<string | null>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement bar */}
      <div className="bg-sage text-white text-xs tracking-wide">
        <div className="max-w-7xl mx-auto px-4 py-2 text-center font-medium">
          {t('announcement', locale)}
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Mobile menu */}
          <button className="lg:hidden p-1" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image src="/images/ShopLogo.png" alt="Trang Pham Cosmetics" width={140} height={56} className="h-12 w-auto" priority />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {[
              { key: 'nav.products', slug: '#', id: 'products', hasMega: true },
              { key: 'nav.bestsellers', slug: '/category/instock' },
            ].map((item) => (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => item.hasMega ? setMegaMenu('products') : setMegaMenu(null)}
                onMouseLeave={() => setMegaMenu(null)}
              >
                <Link
                  href={item.slug}
                  className="px-3 py-2 text-sm font-medium text-charcoal hover:text-sage-darker transition-colors tracking-wide uppercase"
                >
                  {t(item.key, locale)}
                </Link>
                {item.hasMega && megaMenu === 'products' && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50">
                    <div className="bg-white border border-border rounded-lg shadow-xl p-6 min-w-[500px] animate-slideDown">
                      <div className="grid grid-cols-2 gap-6">
                        {categories.map((cat) => (
                          <div key={cat.id}>
                            <Link href={`/category/${cat.slug}`} className="text-sm font-semibold text-charcoal hover:text-sage-darker uppercase tracking-wide">
                              {cat.name[locale]}
                            </Link>
                            {cat.subcategories && (
                              <ul className="mt-2 space-y-1.5">
                                {cat.subcategories.map((sub) => (
                                  <li key={sub.id}>
                                    <Link href={`/category/${sub.slug}`} className="text-sm text-text-secondary hover:text-sage-darker transition-colors">
                                      {sub.name[locale]}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-1">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:bg-sage-lightest rounded-full transition-colors">
              <FiSearch size={18} />
            </button>

            {/* Language */}
            <div className="relative" ref={langRef}>
              <button onClick={() => setLangOpen(!langOpen)} className="p-2 hover:bg-sage-lightest rounded-full transition-colors text-sm">
                {localeFlags[locale]}
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-border rounded-lg shadow-lg py-1 min-w-[130px] animate-slideDown z-50">
                  {(Object.keys(localeNames) as Locale[]).map((loc) => (
                    <button
                      key={loc}
                      className={`w-full px-3 py-2 text-left text-sm hover:bg-sage-lightest flex items-center gap-2 ${locale === loc ? 'bg-sage-lightest font-medium' : ''}`}
                      onClick={() => { setLocale(loc); setLangOpen(false); }}
                    >
                      {localeFlags[loc]} {localeNames[loc]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/account" className="hidden sm:block p-2 hover:bg-sage-lightest rounded-full transition-colors">
              <FiUser size={18} />
            </Link>

            <Link href="/cart" className="relative p-2 hover:bg-sage-lightest rounded-full transition-colors">
              <FiShoppingBag size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-sage-darker text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center leading-none">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div className="bg-white border-b border-border px-4 py-3 animate-slideDown">
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder={t('search.placeholder', locale)}
              className="w-full border border-border rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:border-sage-dark focus:ring-1 focus:ring-sage-dark"
              autoFocus
            />
            <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-sage text-white p-2 rounded-full hover:bg-sage-dark transition-colors">
              <FiSearch size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[96px] z-40">
          <div className="absolute inset-0 bg-black/20" onClick={() => setMobileOpen(false)} />
          <nav className="relative bg-white w-72 h-full overflow-y-auto shadow-xl">
            <div className="py-3">
              {categories.map((cat) => (
                <div key={cat.id}>
                  <Link href={`/category/${cat.slug}`} className="block px-5 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-sage-lightest" onClick={() => setMobileOpen(false)}>
                    {cat.name[locale]}
                  </Link>
                  {cat.subcategories && (
                    <div className="bg-cream">
                      {cat.subcategories.map((sub) => (
                        <Link key={sub.id} href={`/category/${sub.slug}`} className="block px-8 py-2 text-sm text-text-secondary hover:text-sage-darker" onClick={() => setMobileOpen(false)}>
                          {sub.name[locale]}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="border-t border-border mt-2 pt-2">
                <Link href="/category/instock" className="block px-5 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-sage-lightest" onClick={() => setMobileOpen(false)}>
                  {t('nav.bestsellers', locale)}
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
