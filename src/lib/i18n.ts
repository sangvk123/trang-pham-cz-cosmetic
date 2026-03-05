import { Locale } from '@/types';

export const translations: Record<string, Record<Locale, string>> = {
  // Header
  'search.placeholder': {
    vi: 'Tim kiem san pham...',
    cs: 'Hledat produkty...',
    en: 'Search products...',
  },
  'cart.title': {
    vi: 'Gio hang',
    cs: 'Kosik',
    en: 'Cart',
  },
  'cart.empty': {
    vi: 'Gio hang trong',
    cs: 'Kosik je prazdny',
    en: 'Cart is empty',
  },
  'cart.total': {
    vi: 'Tong cong',
    cs: 'Celkem',
    en: 'Total',
  },
  'account.login': {
    vi: 'Dang nhap',
    cs: 'Prihlasit se',
    en: 'Login',
  },
  'account.register': {
    vi: 'Dang ky',
    cs: 'Registrace',
    en: 'Register',
  },
  // Navigation
  'nav.home': {
    vi: 'Trang chu',
    cs: 'Domov',
    en: 'Home',
  },
  'nav.deals': {
    vi: 'Deal sieu re',
    cs: 'Super slevy',
    en: 'Super Deals',
  },
  'nav.combo': {
    vi: 'Combo',
    cs: 'Combo',
    en: 'Combo',
  },
  'nav.makeup': {
    vi: 'Trang diem',
    cs: 'Make-up',
    en: 'Makeup',
  },
  'nav.skincare': {
    vi: 'Cham soc da',
    cs: 'Pece o plet',
    en: 'Skincare',
  },
  'nav.bodycare': {
    vi: 'Cham soc co the',
    cs: 'Pece o telo',
    en: 'Body Care',
  },
  'nav.haircare': {
    vi: 'Cham soc toc',
    cs: 'Pece o vlasy',
    en: 'Hair Care',
  },
  'nav.supplements': {
    vi: 'Thuc pham chuc nang',
    cs: 'Doplnky stravy',
    en: 'Supplements',
  },
  'nav.tools': {
    vi: 'Dung cu lam dep',
    cs: 'Kosmeticke nastroje',
    en: 'Beauty Tools',
  },
  'nav.brands': {
    vi: 'Thuong hieu',
    cs: 'Znacky',
    en: 'Brands',
  },
  'nav.blog': {
    vi: 'Blog',
    cs: 'Blog',
    en: 'Blog',
  },
  // Homepage
  'home.dailyDeals': {
    vi: 'Gia tot moi ngay',
    cs: 'Denni nabidky',
    en: 'Daily Deals',
  },
  'home.bestSellers': {
    vi: 'Ban chay nhat',
    cs: 'Nejprodavanejsi',
    en: 'Best Sellers',
  },
  'home.newArrivals': {
    vi: 'San pham moi',
    cs: 'Novinky',
    en: 'New Arrivals',
  },
  'home.monthlyPromo': {
    vi: 'Khuyen mai trong thang',
    cs: 'Mesicni akce',
    en: 'Monthly Promotions',
  },
  'home.freeShipping': {
    vi: 'Mien phi van chuyen tu 499K',
    cs: 'Doprava zdarma od 499 CZK',
    en: 'Free shipping from 499K',
  },
  'home.authentic': {
    vi: '100% chinh hang',
    cs: '100% originalni',
    en: '100% Authentic',
  },
  'home.support': {
    vi: 'Ho tro 24/7',
    cs: 'Podpora 24/7',
    en: '24/7 Support',
  },
  'home.returns': {
    vi: 'Doi tra de dang',
    cs: 'Snadne vraceni',
    en: 'Easy Returns',
  },
  // Product
  'product.addToCart': {
    vi: 'Them vao gio hang',
    cs: 'Pridat do kosiku',
    en: 'Add to Cart',
  },
  'product.sold': {
    vi: 'Da ban',
    cs: 'Prodano',
    en: 'Sold',
  },
  'product.outOfStock': {
    vi: 'Het hang',
    cs: 'Vyprodano',
    en: 'Out of Stock',
  },
  // Footer
  'footer.about': {
    vi: 'Ve chung toi',
    cs: 'O nas',
    en: 'About Us',
  },
  'footer.policy': {
    vi: 'Chinh sach',
    cs: 'Zasady',
    en: 'Policies',
  },
  'footer.shipping': {
    vi: 'Chinh sach van chuyen',
    cs: 'Zasady doruceni',
    en: 'Shipping Policy',
  },
  'footer.returnPolicy': {
    vi: 'Chinh sach doi tra',
    cs: 'Zasady vraceni',
    en: 'Return Policy',
  },
  'footer.payment': {
    vi: 'Phuong thuc thanh toan',
    cs: 'Zpusoby platby',
    en: 'Payment Methods',
  },
  'footer.contact': {
    vi: 'Lien he',
    cs: 'Kontakt',
    en: 'Contact',
  },
  'footer.followUs': {
    vi: 'Theo doi chung toi',
    cs: 'Sledujte nas',
    en: 'Follow Us',
  },
  'footer.rights': {
    vi: 'Tat ca quyen duoc bao luu.',
    cs: 'Vsechna prava vyhrazena.',
    en: 'All rights reserved.',
  },
  // Category
  'category.all': {
    vi: 'Tat ca san pham',
    cs: 'Vsechny produkty',
    en: 'All Products',
  },
  'category.filter': {
    vi: 'Bo loc',
    cs: 'Filtr',
    en: 'Filter',
  },
  'category.sort': {
    vi: 'Sap xep',
    cs: 'Razeni',
    en: 'Sort by',
  },
  'category.priceRange': {
    vi: 'Khoang gia',
    cs: 'Cenove rozpeti',
    en: 'Price Range',
  },
  'viewAll': {
    vi: 'Xem tat ca',
    cs: 'Zobrazit vse',
    en: 'View All',
  },
};

export function t(key: string, locale: Locale): string {
  return translations[key]?.[locale] || key;
}

export const localeNames: Record<Locale, string> = {
  vi: 'Tieng Viet',
  cs: 'Cestina',
  en: 'English',
};

export const localeFlags: Record<Locale, string> = {
  vi: '🇻🇳',
  cs: '🇨🇿',
  en: '🇬🇧',
};
