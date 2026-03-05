import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'makeup', slug: 'makeup',
    name: { vi: 'Trang diem', cs: 'Make-up', en: 'Makeup' },
    subcategories: [
      { id: 'face', slug: 'face', name: { vi: 'Trang diem mat', cs: 'Tvar', en: 'Face' } },
      { id: 'eyes', slug: 'eyes', name: { vi: 'Mat', cs: 'Oci', en: 'Eyes' } },
      { id: 'lips', slug: 'lips', name: { vi: 'Moi', cs: 'Rty', en: 'Lips' } },
      { id: 'brows', slug: 'brows', name: { vi: 'Long may', cs: 'Oboci', en: 'Brows' } },
      { id: 'tools', slug: 'tools', name: { vi: 'Dung cu', cs: 'Doplnky', en: 'Tools' } },
    ],
  },
  {
    id: 'skincare', slug: 'skincare',
    name: { vi: 'Cham soc da', cs: 'Skincare', en: 'Skincare' },
    subcategories: [
      { id: 'cleanser', slug: 'cleanser', name: { vi: 'Tay trang & Rua mat', cs: 'Cisteni', en: 'Cleansers' } },
      { id: 'toner', slug: 'toner', name: { vi: 'Toner', cs: 'Tonery', en: 'Toners' } },
      { id: 'serum', slug: 'serum', name: { vi: 'Serum & Tinh chat', cs: 'Sera', en: 'Serums' } },
      { id: 'moisturizer', slug: 'moisturizer', name: { vi: 'Kem duong', cs: 'Kremy', en: 'Moisturizers' } },
      { id: 'sunscreen', slug: 'sunscreen', name: { vi: 'Chong nang', cs: 'SPF', en: 'Sunscreen' } },
      { id: 'mask', slug: 'mask', name: { vi: 'Mat na', cs: 'Masky', en: 'Masks' } },
    ],
  },
  {
    id: 'bodycare', slug: 'body-care',
    name: { vi: 'Cham soc co the', cs: 'Pece o telo', en: 'Body Care' },
  },
  {
    id: 'haircare', slug: 'hair-care',
    name: { vi: 'Cham soc toc', cs: 'Pece o vlasy', en: 'Hair Care' },
  },
];
