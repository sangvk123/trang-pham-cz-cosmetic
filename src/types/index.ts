export type Locale = 'vi' | 'cs' | 'en';

export interface Product {
  id: string;
  slug: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  price: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  category: string;
  subcategory?: string;
  brand: string;
  rating: number;
  reviewCount: number;
  soldCount: number;
  inStock: boolean;
  tags: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: Record<Locale, string>;
  icon?: string;
  image?: string;
  subcategories?: Category[];
}

export interface Banner {
  id: string;
  image: string;
  title: Record<Locale, string>;
  subtitle?: Record<Locale, string>;
  link: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface StoreInfo {
  name: string;
  phone: string[];
  email: string;
  address: Record<Locale, string>;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    zalo?: string;
  };
}
