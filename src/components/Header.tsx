'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiChevronDown, FiPhone, FiMail } from 'react-icons/fi';
import Logo from './Logo';
import { useLocale } from '@/lib/LocaleContext';
import { useCart } from '@/lib/CartContext';
import { t, localeFlags, localeNames } from '@/lib/i18n';
import { categories } from '@/data/categories';
import { storeInfo } from '@/data/store';
import { formatPrice } from '@/lib/utils';
import { Locale } from '@/types';

export default function Header() {
  const { locale, setLocale } = useLocale();
  const { totalItems, totalPrice } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-primary text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <FiPhone size={12} />
              {storeInfo.phone[0]}
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <FiMail size={12} />
              {storeInfo.email}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">{t('home.authentic', locale)}</span>
            <span className="mx-1">|</span>
            <span>{t('home.freeShipping', locale)}</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Logo />
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t('search.placeholder', locale)}
                className="w-full border border-border rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition-colors">
                <FiSearch size={16} />
              </button>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Mobile search */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <FiSearch size={20} />
            </button>

            {/* Language switcher */}
            <div className="relative" ref={langRef}>
              <button
                className="flex items-center gap-1 px-2 py-1.5 text-sm hover:bg-gray-100 rounded-lg"
                onClick={() => setLangDropdown(!langDropdown)}
              >
                <span>{localeFlags[locale]}</span>
                <FiChevronDown size={14} />
              </button>
              {langDropdown && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-border rounded-lg shadow-lg py-1 min-w-[140px] animate-slideDown z-50">
                  {(Object.keys(localeNames) as Locale[]).map((loc) => (
                    <button
                      key={loc}
                      className={`w-full px-3 py-2 text-left text-sm hover:bg-primary-light flex items-center gap-2 ${locale === loc ? 'bg-primary-light text-primary font-medium' : ''}`}
                      onClick={() => {
                        setLocale(loc);
                        setLangDropdown(false);
                      }}
                    >
                      <span>{localeFlags[loc]}</span>
                      {localeNames[loc]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Account */}
            <Link href="#" className="hidden sm:flex items-center gap-1 px-2 py-1.5 text-sm hover:bg-gray-100 rounded-lg">
              <FiUser size={20} />
              <span className="hidden lg:inline">{t('account.login', locale)}</span>
            </Link>

            {/* Cart */}
            <Link href="#" className="relative flex items-center gap-1 px-2 py-1.5 text-sm hover:bg-gray-100 rounded-lg">
              <FiShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              <span className="hidden lg:inline ml-1">
                {totalItems > 0 ? formatPrice(totalPrice) : t('cart.title', locale)}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="md:hidden bg-white border-b border-border px-4 py-2 animate-slideDown">
          <div className="relative">
            <input
              type="text"
              placeholder={t('search.placeholder', locale)}
              className="w-full border border-border rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-primary"
              autoFocus
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary text-white p-1.5 rounded-full">
              <FiSearch size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Desktop navigation */}
      <nav className="hidden lg:block bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-0">
            <li>
              <Link href="/" className="block px-3 py-3 text-sm font-medium hover:text-primary transition-colors">
                {t('nav.home', locale)}
              </Link>
            </li>
            <li>
              <Link href="/category/deals" className="block px-3 py-3 text-sm font-bold text-secondary hover:text-secondary/80 transition-colors">
                {t('nav.deals', locale)}
              </Link>
            </li>
            {categories.filter(c => !['deals', 'combo'].includes(c.id)).map((cat) => (
              <li
                key={cat.id}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(cat.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={`/category/${cat.slug}`}
                  className="flex items-center gap-1 px-3 py-3 text-sm font-medium hover:text-primary transition-colors"
                >
                  {cat.name[locale]}
                  {cat.subcategories && <FiChevronDown size={12} />}
                </Link>
                {cat.subcategories && activeDropdown === cat.id && (
                  <div className="absolute left-0 top-full bg-white border border-border rounded-b-lg shadow-lg py-2 min-w-[200px] animate-slideDown z-40">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/category/${cat.slug}/${sub.slug}`}
                        className="block px-4 py-2 text-sm hover:bg-primary-light hover:text-primary transition-colors"
                      >
                        {sub.name[locale]}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
            <li>
              <Link href="/blog" className="block px-3 py-3 text-sm font-medium hover:text-primary transition-colors">
                {t('nav.blog', locale)}
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[104px] z-40">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileMenuOpen(false)} />
          <nav className="relative bg-white w-72 h-full overflow-y-auto shadow-xl animate-slideDown">
            <div className="py-2">
              <Link
                href="/"
                className="block px-4 py-3 text-sm font-medium hover:bg-primary-light"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.home', locale)}
              </Link>
              <Link
                href="/category/deals"
                className="block px-4 py-3 text-sm font-bold text-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.deals', locale)}
              </Link>
              {categories.filter(c => c.id !== 'deals').map((cat) => (
                <div key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="block px-4 py-3 text-sm font-medium hover:bg-primary-light"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {cat.name[locale]}
                  </Link>
                  {cat.subcategories && (
                    <div className="bg-gray-50">
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/category/${cat.slug}/${sub.slug}`}
                          className="block px-8 py-2 text-sm text-text-secondary hover:bg-primary-light hover:text-primary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {sub.name[locale]}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/blog"
                className="block px-4 py-3 text-sm font-medium hover:bg-primary-light"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <div className="border-t border-border mt-2 pt-2 px-4">
                <Link href="#" className="flex items-center gap-2 py-3 text-sm">
                  <FiUser size={18} />
                  {t('account.login', locale)} / {t('account.register', locale)}
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
