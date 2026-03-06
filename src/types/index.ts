export type Locale = 'vi' | 'cs' | 'en';

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  subcategory?: string | null;
  brand: string;
  stock: number;
  inStock: boolean;
  group: string;
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
