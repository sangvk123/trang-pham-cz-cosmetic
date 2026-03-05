export type Locale = 'vi' | 'cs' | 'en';

export interface Product {
  id: string;
  slug: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: Record<Locale, string>;
  subcategories?: Category[];
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
  };
}
