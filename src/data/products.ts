import { Product } from '@/types';
import productsJson from './products.json';

export const products: Product[] = productsJson as Product[];

// Extract unique brands from actual product data
export const brands: string[] = [...new Set(products.map(p => p.brand).filter(Boolean))].slice(0, 20);
