'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiSearch, FiShoppingBag, FiUser, FiMenu, FiX, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { useLocale } from '@/lib/LocaleContext';
import { useCart } from '@/lib/CartContext';
import { t, localeFlags, localeNames } from '@/lib/i18n';
import { categories } from '@/data/categories';
import { Locale } from '@/types';

export default function Header() {
  const { locale, setLocale } = useLocale();
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [megaMenu, setMegaMenu] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const toggleMobileCategory = (id: string) => {
    setExpandedMobile(expandedMobile === id ? null : id);
  };

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
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 hover:bg-sage-lightest rounded-lg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <FiMenu size={22} />
          </button>

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image src="/images/ShopLogo.png" alt="Trang Pham Cosmetics" width={140} height={56} className="h-12 w-auto" priority />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="relative"
                onMouseEnter={() => setMegaMenu(cat.id)}
                onMouseLeave={() => setMegaMenu(null)}
              >
                <Link
                  href={`/category/${cat.slug}`}
                  className="px-3 py-2 text-sm font-medium text-charcoal hover:text-sage-darker transition-colors duration-300 tracking-wide uppercase flex items-center gap-1"
                >
                  {cat.name[locale]}
                  {cat.subcategories && <FiChevronDown size={12} className={`transition-transform duration-300 ${megaMenu === cat.id ? 'rotate-180' : ''}`} />}
                </Link>
                {cat.subcategories && megaMenu === cat.id && (
                  <div className="absolute left-0 top-full pt-2 z-50">
                    <div className="bg-white border border-border rounded-xl shadow-2xl py-3 min-w-[220px] mega-menu-enter">
                      <Link
                        href={`/category/${cat.slug}`}
                        className="block px-5 py-2 text-sm font-semibold text-charcoal hover:text-sage-darker hover:bg-sage-lightest transition-all duration-200"
                      >
                        {locale === 'vi' ? 'Tất cả' : locale === 'cs' ? 'Vše' : 'All'} {cat.name[locale]}
                      </Link>
                      <div className="border-t border-border-light my-1.5 mx-4" />
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/category/${sub.slug}`}
                          className="block px-5 py-2 text-sm text-text-secondary hover:text-sage-darker hover:bg-sage-lightest hover:pl-6 transition-all duration-200"
                        >
                          {sub.name[locale]}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/category/instock"
              className="px-3 py-2 text-sm font-medium text-sage-darker hover:text-sage-darker transition-colors duration-300 tracking-wide uppercase"
            >
              {t('nav.bestsellers', locale)}
            </Link>
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-1">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:bg-sage-lightest rounded-full transition-colors duration-200">
              <FiSearch size={18} />
            </button>

            {/* Language */}
            <div className="relative" ref={langRef}>
              <button onClick={() => setLangOpen(!langOpen)} className="p-2 hover:bg-sage-lightest rounded-full transition-colors duration-200 text-sm">
                {localeFlags[locale]}
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-border rounded-xl shadow-xl py-1 min-w-[130px] mega-menu-enter z-50">
                  {(Object.keys(localeNames) as Locale[]).map((loc) => (
                    <button
                      key={loc}
                      className={`w-full px-3 py-2 text-left text-sm hover:bg-sage-lightest flex items-center gap-2 transition-colors duration-200 ${locale === loc ? 'bg-sage-lightest font-medium' : ''}`}
                      onClick={() => { setLocale(loc); setLangOpen(false); }}
                    >
                      {localeFlags[loc]} {localeNames[loc]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/account" className="hidden sm:block p-2 hover:bg-sage-lightest rounded-full transition-colors duration-200">
              <FiUser size={18} />
            </Link>

            <Link href="/cart" className="relative p-2 hover:bg-sage-lightest rounded-full transition-colors duration-200">
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
        <div className="bg-white border-b border-border px-4 py-3 mega-menu-enter">
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder={t('search.placeholder', locale)}
              className="w-full border border-border rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:border-sage-dark focus:ring-1 focus:ring-sage-dark transition-all duration-300"
              autoFocus
            />
            <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-sage text-white p-2 rounded-full hover:bg-sage-dark transition-colors duration-200">
              <FiSearch size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile drawer overlay + sidebar */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-400 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ transitionTimingFunction: 'cubic-bezier(.3, 1, .3, 1)' }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={() => setMobileOpen(false)} />

        {/* Drawer */}
        <nav
          className={`absolute top-0 left-0 w-full h-full bg-white shadow-2xl overflow-y-auto transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
          style={{ transitionTimingFunction: 'cubic-bezier(.6, 0, .4, 1)' }}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-border">
            <Image src="/images/ShopLogo.png" alt="Trang Pham Cosmetics" width={120} height={48} className="h-11 w-auto" />
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 hover:bg-sage-lightest rounded-lg transition-colors duration-200"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Categories accordion */}
          <div className="py-3">
            {categories.map((cat) => (
              <div key={cat.id} className="border-b border-border-light last:border-0">
                <div className="flex items-center">
                  <Link
                    href={`/category/${cat.slug}`}
                    className="flex-1 px-6 py-4 text-base font-semibold text-charcoal uppercase tracking-wide hover:text-sage-darker transition-colors duration-200"
                    onClick={() => setMobileOpen(false)}
                  >
                    {cat.name[locale]}
                  </Link>
                  {cat.subcategories && (
                    <button
                      onClick={() => toggleMobileCategory(cat.id)}
                      className="px-6 py-4 text-text-muted hover:text-charcoal transition-colors duration-200"
                    >
                      <FiChevronDown
                        size={20}
                        className={`transition-transform duration-300 ${expandedMobile === cat.id ? 'rotate-180' : ''}`}
                        style={{ transitionTimingFunction: 'cubic-bezier(.6, 0, .4, 1)' }}
                      />
                    </button>
                  )}
                </div>
                {/* Subcategories accordion */}
                {cat.subcategories && (
                  <div
                    className="overflow-hidden transition-all duration-400"
                    style={{
                      maxHeight: expandedMobile === cat.id ? `${cat.subcategories.length * 52 + 16}px` : '0px',
                      opacity: expandedMobile === cat.id ? 1 : 0,
                      transitionTimingFunction: 'cubic-bezier(.3, 1, .3, 1)',
                    }}
                  >
                    <div className="bg-cream/60 py-2">
                      {cat.subcategories.map((sub, i) => (
                        <Link
                          key={sub.id}
                          href={`/category/${sub.slug}`}
                          className="flex items-center gap-3 px-10 py-3 text-[15px] text-text-secondary hover:text-sage-darker hover:bg-sage-lightest/50 transition-all duration-200"
                          onClick={() => setMobileOpen(false)}
                          style={{
                            transitionDelay: expandedMobile === cat.id ? `${i * 30}ms` : '0ms',
                          }}
                        >
                          <FiChevronRight size={12} className="text-sage-dark" />
                          {sub.name[locale]}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* In Stock link */}
            <div className="border-t border-border mt-2 pt-2">
              <Link
                href="/category/instock"
                className="block px-6 py-4 text-base font-semibold text-sage-darker uppercase tracking-wide hover:bg-sage-lightest transition-colors duration-200"
                onClick={() => setMobileOpen(false)}
              >
                {t('nav.bestsellers', locale)}
              </Link>
            </div>

            {/* Mobile account link */}
            <div className="border-t border-border mt-2 pt-2">
              <Link
                href="/account"
                className="flex items-center gap-3 px-6 py-4 text-base text-charcoal hover:bg-sage-lightest transition-colors duration-200"
                onClick={() => setMobileOpen(false)}
              >
                <FiUser size={20} />
                {t('account.login', locale)}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
