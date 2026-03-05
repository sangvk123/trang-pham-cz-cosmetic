import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1', slug: 'rom-and-juicy-lasting-tint',
    name: { vi: 'Son rom&nd Juicy Lasting Tint', cs: 'rom&nd Juicy Lasting Tint', en: 'rom&nd Juicy Lasting Tint' },
    description: { vi: 'Son tint mong nhe, len mau chuan, giu mau lau', cs: 'Lehky tint s dlouhotrvajici barvou', en: 'Lightweight long-lasting lip tint' },
    price: 259, images: [], category: 'makeup', subcategory: 'lips', brand: "rom&nd",
    rating: 4.9, reviewCount: 312, inStock: true, isNew: true, isBestSeller: true,
  },
  {
    id: '2', slug: 'beauty-of-joseon-sunscreen',
    name: { vi: 'Kem chong nang Beauty of Joseon Relief Sun', cs: 'Beauty of Joseon Relief Sun SPF50+', en: 'Beauty of Joseon Relief Sun SPF50+' },
    description: { vi: 'Kem chong nang nhe, khong bong nhon, bao ve da', cs: 'Lehky opalovaci krem bez mastneho efektu', en: 'Lightweight non-greasy sunscreen' },
    price: 389, originalPrice: 449, images: [], category: 'skincare', subcategory: 'sunscreen', brand: 'Beauty of Joseon',
    rating: 4.8, reviewCount: 256, inStock: true, isBestSeller: true, isOnSale: true,
  },
  {
    id: '3', slug: 'anua-heartleaf-toner',
    name: { vi: 'Toner Anua Heartleaf 77% Soothing', cs: 'Anua Heartleaf 77% zklidnujici toner', en: 'Anua Heartleaf 77% Soothing Toner' },
    description: { vi: 'Toner lam diu da, cap am, phu hop da nhay cam', cs: 'Zklidnujici toner pro citlivou plet', en: 'Soothing toner for sensitive skin' },
    price: 459, images: [], category: 'skincare', subcategory: 'toner', brand: 'Anua',
    rating: 4.7, reviewCount: 189, inStock: true, isNew: true,
  },
  {
    id: '4', slug: 'clio-kill-cover-foundation',
    name: { vi: 'Cushion CLIO Kill Cover Fixer', cs: 'CLIO Kill Cover Fixer Cushion', en: 'CLIO Kill Cover Fixer Cushion' },
    description: { vi: 'Cushion che phu cao, kiem dau, lau troi', cs: 'Cushion s vysokym kryti a matnym finisem', en: 'High coverage matte finish cushion' },
    price: 549, originalPrice: 649, images: [], category: 'makeup', subcategory: 'face', brand: 'CLIO',
    rating: 4.6, reviewCount: 198, inStock: true, isBestSeller: true, isOnSale: true,
  },
  {
    id: '5', slug: 'torriden-dive-in-serum',
    name: { vi: 'Serum Torriden DIVE-IN Low Molecular', cs: 'Torriden DIVE-IN hyaluronic serum', en: 'Torriden DIVE-IN Hyaluronic Acid Serum' },
    description: { vi: 'Serum cap am sau voi Hyaluronic Acid', cs: 'Hloubkove hydratacni serum', en: 'Deep hydration serum with hyaluronic acid' },
    price: 419, images: [], category: 'skincare', subcategory: 'serum', brand: 'Torriden',
    rating: 4.8, reviewCount: 234, inStock: true, isBestSeller: true, isNew: true,
  },
  {
    id: '6', slug: 'peripera-ink-airy-velvet',
    name: { vi: 'Son Peripera Ink Airy Velvet', cs: 'Peripera Ink Airy Velvet rtenka', en: 'Peripera Ink Airy Velvet Lip Tint' },
    description: { vi: 'Son kem li nhe, mau dep tu nhien', cs: 'Lehka matna rtenka s prirozenim finisem', en: 'Lightweight matte lip tint with natural finish' },
    price: 219, images: [], category: 'makeup', subcategory: 'lips', brand: 'Peripera',
    rating: 4.7, reviewCount: 278, inStock: true, isBestSeller: true,
  },
  {
    id: '7', slug: 'cosrx-snail-mucin-essence',
    name: { vi: 'Tinh chat COSRX Snail Mucin 96%', cs: 'COSRX Snail Mucin 96% esence', en: 'COSRX Advanced Snail 96 Mucin Essence' },
    description: { vi: 'Tinh chat oc sen phuc hoi va cap am da', cs: 'Slimaci esence pro obnovu a hydrataci pleti', en: 'Snail mucin essence for repair and hydration' },
    price: 489, originalPrice: 559, images: [], category: 'skincare', subcategory: 'serum', brand: 'COSRX',
    rating: 4.9, reviewCount: 445, inStock: true, isBestSeller: true, isOnSale: true,
  },
  {
    id: '8', slug: 'tirtir-mask-fit-cushion',
    name: { vi: 'Cushion TIRTIR Mask Fit Red', cs: 'TIRTIR Mask Fit Red Cushion', en: 'TIRTIR Mask Fit Red Cushion' },
    description: { vi: 'Cushion viral che phu tot, da min muot', cs: 'Viralni cushion s vysokym kryti', en: 'Viral high-coverage cushion for flawless skin' },
    price: 579, images: [], category: 'makeup', subcategory: 'face', brand: 'TIRTIR',
    rating: 4.5, reviewCount: 167, inStock: true, isNew: true, isBestSeller: true,
  },
  {
    id: '9', slug: 'innisfree-green-tea-seed-serum',
    name: { vi: 'Serum Innisfree Green Tea Seed', cs: 'Innisfree Green Tea Seed serum', en: 'Innisfree Green Tea Seed Serum' },
    description: { vi: 'Serum tra xanh cap am va chong oxy hoa', cs: 'Hydratacni serum se zelenym cajem', en: 'Green tea hydrating and antioxidant serum' },
    price: 399, originalPrice: 479, images: [], category: 'skincare', subcategory: 'serum', brand: 'Innisfree',
    rating: 4.6, reviewCount: 321, inStock: true, isOnSale: true,
  },
  {
    id: '10', slug: 'etude-fixing-tint',
    name: { vi: 'Son Etude Fixing Tint', cs: 'Etude Fixing Tint', en: 'Etude Fixing Tint' },
    description: { vi: 'Son tint li ben mau, khong kho moi', cs: 'Dlouhotrvajici matny tint', en: 'Long-lasting matte tint that doesnt dry lips' },
    price: 239, images: [], category: 'makeup', subcategory: 'lips', brand: 'ETUDE',
    rating: 4.7, reviewCount: 198, inStock: true, isNew: true,
  },
  {
    id: '11', slug: 'laneige-water-sleeping-mask',
    name: { vi: 'Mat na ngu Laneige Water Sleeping Mask', cs: 'Laneige Water Sleeping Mask', en: 'Laneige Water Sleeping Mask' },
    description: { vi: 'Mat na ngu cap am sau qua dem', cs: 'Nocni hydratacni maska', en: 'Overnight deep hydration sleeping mask' },
    price: 529, images: [], category: 'skincare', subcategory: 'mask', brand: 'Laneige',
    rating: 4.8, reviewCount: 287, inStock: true, isBestSeller: true,
  },
  {
    id: '12', slug: 'unleashia-glitter-gel',
    name: { vi: 'Nhu mat Unleashia Glitter Gel', cs: 'Unleashia Get Loose Glitter Gel', en: 'Unleashia Get Loose Glitter Gel' },
    description: { vi: 'Gel nhu mat lung linh, de su dung', cs: 'Trpytivy gel na oci', en: 'Sparkling eye glitter gel, easy to apply' },
    price: 299, images: [], category: 'makeup', subcategory: 'eyes', brand: 'Unleashia',
    rating: 4.5, reviewCount: 156, inStock: true, isNew: true,
  },
];

export const brands = [
  "rom&nd", "CLIO", "Peripera", "TIRTIR", "ETUDE", "Innisfree",
  "Laneige", "COSRX", "Anua", "Torriden", "Beauty of Joseon",
  "Unleashia", "Missha", "Some By Mi", "Sulwhasoo",
];
