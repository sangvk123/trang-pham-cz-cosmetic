import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1', slug: 'rom-and-juicy-lasting-tint',
    name: { vi: 'Son rom&nd Juicy Lasting Tint', cs: 'rom&nd Juicy Lasting Tint', en: 'rom&nd Juicy Lasting Tint' },
    description: { vi: 'Son tint mỏng nhẹ, lên màu chuẩn, giữ màu lâu', cs: 'Lehký tint s dlouhotrvající barvou', en: 'Lightweight long-lasting lip tint' },
    price: 259, images: ['/images/products/romand-tint.jpg'], category: 'makeup', subcategory: 'lips', brand: "rom&nd",
    rating: 4.9, reviewCount: 312, inStock: true, isNew: true, isBestSeller: true,
  },
  {
    id: '2', slug: 'beauty-of-joseon-sunscreen',
    name: { vi: 'Kem chống nắng Beauty of Joseon Relief Sun', cs: 'Beauty of Joseon Relief Sun SPF50+', en: 'Beauty of Joseon Relief Sun SPF50+' },
    description: { vi: 'Kem chống nắng nhẹ, không bóng nhờn, bảo vệ da', cs: 'Lehký opalovací krém bez mastného efektu', en: 'Lightweight non-greasy sunscreen' },
    price: 389, originalPrice: 449, images: ['/images/products/boj-sunscreen.jpg'], category: 'skincare', subcategory: 'sunscreen', brand: 'Beauty of Joseon',
    rating: 4.8, reviewCount: 256, inStock: true, isBestSeller: true, isOnSale: true,
  },
  {
    id: '3', slug: 'anua-heartleaf-toner',
    name: { vi: 'Toner Anua Heartleaf 77% Soothing', cs: 'Anua Heartleaf 77% zklidňující toner', en: 'Anua Heartleaf 77% Soothing Toner' },
    description: { vi: 'Toner làm dịu da, cấp ẩm, phù hợp da nhạy cảm', cs: 'Zklidňující toner pro citlivou pleť', en: 'Soothing toner for sensitive skin' },
    price: 459, images: ['/images/products/anua-toner.jpg'], category: 'skincare', subcategory: 'toner', brand: 'Anua',
    rating: 4.7, reviewCount: 189, inStock: true, isNew: true,
  },
  {
    id: '4', slug: 'clio-kill-cover-foundation',
    name: { vi: 'Cushion CLIO Kill Cover Fixer', cs: 'CLIO Kill Cover Fixer Cushion', en: 'CLIO Kill Cover Fixer Cushion' },
    description: { vi: 'Cushion che phủ cao, kiềm dầu, lâu trôi', cs: 'Cushion s vysokým krytím a matným finišem', en: 'High coverage matte finish cushion' },
    price: 549, originalPrice: 649, images: ['/images/products/clio-cushion.jpg'], category: 'makeup', subcategory: 'face', brand: 'CLIO',
    rating: 4.6, reviewCount: 198, inStock: true, isBestSeller: true, isOnSale: true,
  },
  {
    id: '5', slug: 'torriden-dive-in-serum',
    name: { vi: 'Serum Torriden DIVE-IN Low Molecular', cs: 'Torriden DIVE-IN hyaluronic sérum', en: 'Torriden DIVE-IN Hyaluronic Acid Serum' },
    description: { vi: 'Serum cấp ẩm sâu với Hyaluronic Acid', cs: 'Hloubkově hydratační sérum', en: 'Deep hydration serum with hyaluronic acid' },
    price: 419, images: ['/images/products/torriden-serum.jpg'], category: 'skincare', subcategory: 'serum', brand: 'Torriden',
    rating: 4.8, reviewCount: 234, inStock: true, isBestSeller: true, isNew: true,
  },
  {
    id: '6', slug: 'peripera-ink-airy-velvet',
    name: { vi: 'Son Peripera Ink Airy Velvet', cs: 'Peripera Ink Airy Velvet rtěnka', en: 'Peripera Ink Airy Velvet Lip Tint' },
    description: { vi: 'Son kem lì nhẹ, màu đẹp tự nhiên', cs: 'Lehká matná rtěnka s přirozeným finišem', en: 'Lightweight matte lip tint with natural finish' },
    price: 219, images: ['/images/products/peripera-velvet.jpg'], category: 'makeup', subcategory: 'lips', brand: 'Peripera',
    rating: 4.7, reviewCount: 278, inStock: true, isBestSeller: true,
  },
  {
    id: '7', slug: 'cosrx-snail-mucin-essence',
    name: { vi: 'Tinh chất COSRX Snail Mucin 96%', cs: 'COSRX Snail Mucin 96% esence', en: 'COSRX Advanced Snail 96 Mucin Essence' },
    description: { vi: 'Tinh chất ốc sên phục hồi và cấp ẩm da', cs: 'Hlemýžďová esence pro obnovu a hydrataci pleti', en: 'Snail mucin essence for repair and hydration' },
    price: 489, originalPrice: 559, images: ['/images/products/cosrx-snail.jpg'], category: 'skincare', subcategory: 'serum', brand: 'COSRX',
    rating: 4.9, reviewCount: 445, inStock: true, isBestSeller: true, isOnSale: true,
  },
  {
    id: '8', slug: 'tirtir-mask-fit-cushion',
    name: { vi: 'Cushion TIRTIR Mask Fit Red', cs: 'TIRTIR Mask Fit Red Cushion', en: 'TIRTIR Mask Fit Red Cushion' },
    description: { vi: 'Cushion viral che phủ tốt, da mịn mượt', cs: 'Virální cushion s vysokým krytím', en: 'Viral high-coverage cushion for flawless skin' },
    price: 579, images: ['/images/products/tirtir-cushion.jpg'], category: 'makeup', subcategory: 'face', brand: 'TIRTIR',
    rating: 4.5, reviewCount: 167, inStock: true, isNew: true, isBestSeller: true,
  },
  {
    id: '9', slug: 'innisfree-green-tea-seed-serum',
    name: { vi: 'Serum Innisfree Green Tea Seed', cs: 'Innisfree Green Tea Seed sérum', en: 'Innisfree Green Tea Seed Serum' },
    description: { vi: 'Serum trà xanh cấp ẩm và chống oxy hóa', cs: 'Hydratační sérum se zeleným čajem', en: 'Green tea hydrating and antioxidant serum' },
    price: 399, originalPrice: 479, images: ['/images/products/innisfree-serum.jpg'], category: 'skincare', subcategory: 'serum', brand: 'Innisfree',
    rating: 4.6, reviewCount: 321, inStock: true, isOnSale: true,
  },
  {
    id: '10', slug: 'etude-fixing-tint',
    name: { vi: 'Son Etude Fixing Tint', cs: 'Etude Fixing Tint', en: 'Etude Fixing Tint' },
    description: { vi: 'Son tint lì bền màu, không khô môi', cs: 'Dlouhotrvající matný tint', en: 'Long-lasting matte tint that doesn\'t dry lips' },
    price: 239, images: ['/images/products/etude-tint.jpg'], category: 'makeup', subcategory: 'lips', brand: 'ETUDE',
    rating: 4.7, reviewCount: 198, inStock: true, isNew: true,
  },
  {
    id: '11', slug: 'laneige-water-sleeping-mask',
    name: { vi: 'Mặt nạ ngủ Laneige Water Sleeping Mask', cs: 'Laneige Water Sleeping Mask', en: 'Laneige Water Sleeping Mask' },
    description: { vi: 'Mặt nạ ngủ cấp ẩm sâu qua đêm', cs: 'Noční hydratační maska', en: 'Overnight deep hydration sleeping mask' },
    price: 529, images: ['/images/products/laneige-mask.jpg'], category: 'skincare', subcategory: 'mask', brand: 'Laneige',
    rating: 4.8, reviewCount: 287, inStock: true, isBestSeller: true,
  },
  {
    id: '12', slug: 'unleashia-glitter-gel',
    name: { vi: 'Nhũ mắt Unleashia Glitter Gel', cs: 'Unleashia Get Loose Glitter Gel', en: 'Unleashia Get Loose Glitter Gel' },
    description: { vi: 'Gel nhũ mắt lung linh, dễ sử dụng', cs: 'Třpytivý gel na oči', en: 'Sparkling eye glitter gel, easy to apply' },
    price: 299, images: ['/images/products/unleashia-glitter.jpg'], category: 'makeup', subcategory: 'eyes', brand: 'Unleashia',
    rating: 4.5, reviewCount: 156, inStock: true, isNew: true,
  },
];

export const brands = [
  "rom&nd", "CLIO", "Peripera", "TIRTIR", "ETUDE", "Innisfree",
  "Laneige", "COSRX", "Anua", "Torriden", "Beauty of Joseon",
  "Unleashia", "Missha", "Some By Mi", "Sulwhasoo",
];
