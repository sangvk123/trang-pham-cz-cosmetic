import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'makeup', slug: 'makeup',
    name: { vi: 'Trang điểm', cs: 'Make-up', en: 'Makeup' },
    subcategories: [
      { id: 'face', slug: 'face', name: { vi: 'Trang điểm mặt', cs: 'Tvář', en: 'Face' } },
      { id: 'eyes', slug: 'eyes', name: { vi: 'Mắt', cs: 'Oči', en: 'Eyes' } },
      { id: 'lips', slug: 'lips', name: { vi: 'Môi', cs: 'Rty', en: 'Lips' } },
      { id: 'brows', slug: 'brows', name: { vi: 'Lông mày', cs: 'Obočí', en: 'Brows' } },
      { id: 'tools', slug: 'tools', name: { vi: 'Dụng cụ', cs: 'Doplňky', en: 'Tools' } },
    ],
  },
  {
    id: 'skincare', slug: 'skincare',
    name: { vi: 'Chăm sóc da', cs: 'Skincare', en: 'Skincare' },
    subcategories: [
      { id: 'cleanser', slug: 'cleanser', name: { vi: 'Tẩy trang & Rửa mặt', cs: 'Čištění', en: 'Cleansers' } },
      { id: 'toner', slug: 'toner', name: { vi: 'Toner', cs: 'Tonery', en: 'Toners' } },
      { id: 'serum', slug: 'serum', name: { vi: 'Serum & Tinh chất', cs: 'Séra', en: 'Serums' } },
      { id: 'moisturizer', slug: 'moisturizer', name: { vi: 'Kem dưỡng', cs: 'Krémy', en: 'Moisturizers' } },
      { id: 'sunscreen', slug: 'sunscreen', name: { vi: 'Chống nắng', cs: 'SPF', en: 'Sunscreen' } },
      { id: 'mask', slug: 'mask', name: { vi: 'Mặt nạ', cs: 'Masky', en: 'Masks' } },
    ],
  },
  {
    id: 'bodycare', slug: 'body-care',
    name: { vi: 'Chăm sóc cơ thể', cs: 'Péče o tělo', en: 'Body Care' },
  },
  {
    id: 'haircare', slug: 'hair-care',
    name: { vi: 'Chăm sóc tóc', cs: 'Péče o vlasy', en: 'Hair Care' },
  },
];
