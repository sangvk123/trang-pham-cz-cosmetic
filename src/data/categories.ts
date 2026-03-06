import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'skincare', slug: 'skincare',
    name: { vi: 'Chăm sóc da', cs: 'Péče o pleť', en: 'Skincare' },
    subcategories: [
      { id: 'oil-cleanser', slug: 'oil-cleanser', name: { vi: 'Tẩy trang', cs: 'Olejové čištění', en: 'Oil Cleansers' } },
      { id: 'water-cleanser', slug: 'water-cleanser', name: { vi: 'Sữa rửa mặt', cs: 'Čisticí pěna', en: 'Water-based Cleansers' } },
      { id: 'toner', slug: 'toner', name: { vi: 'Toner', cs: 'Tonery', en: 'Toners' } },
      { id: 'toner-pad', slug: 'toner-pad', name: { vi: 'Toner Pad', cs: 'Toner Pad', en: 'Toner Pads' } },
      { id: 'serum', slug: 'serum', name: { vi: 'Serum & Tinh chất', cs: 'Séra & Esence', en: 'Serums & Essence' } },
      { id: 'moisturizer', slug: 'moisturizer', name: { vi: 'Kem dưỡng', cs: 'Krémy', en: 'Moisturisers' } },
      { id: 'sunscreen', slug: 'sunscreen', name: { vi: 'Chống nắng', cs: 'Opalovací krémy', en: 'Sunscreen' } },
      { id: 'eye-care', slug: 'eye-care', name: { vi: 'Kem mắt', cs: 'Oční krémy', en: 'Eye Cream' } },
      { id: 'mask', slug: 'mask', name: { vi: 'Mặt nạ', cs: 'Masky', en: 'Sheet Masks' } },
      { id: 'treatment', slug: 'treatment', name: { vi: 'Đặc trị', cs: 'Léčba', en: 'Spot Treatment' } },
      { id: 'lip-care', slug: 'lip-care', name: { vi: 'Dưỡng môi', cs: 'Péče o rty', en: 'Lip Care' } },
    ],
  },
  {
    id: 'makeup', slug: 'makeup',
    name: { vi: 'Trang điểm', cs: 'Make-up', en: 'Makeup' },
    subcategories: [
      { id: 'face', slug: 'face', name: { vi: 'Trang điểm mặt', cs: 'Tvář', en: 'Face' } },
      { id: 'lips', slug: 'lips', name: { vi: 'Son môi', cs: 'Rty', en: 'Lips' } },
      { id: 'eyes', slug: 'eyes', name: { vi: 'Mắt', cs: 'Oči', en: 'Eyes' } },
    ],
  },
  {
    id: 'bodycare', slug: 'body-care',
    name: { vi: 'Chăm sóc cơ thể', cs: 'Péče o tělo', en: 'Body & Hair' },
    subcategories: [
      { id: 'body', slug: 'body', name: { vi: 'Dưỡng thể', cs: 'Tělový krém', en: 'Bodycare' } },
      { id: 'haircare', slug: 'hair-care', name: { vi: 'Dưỡng tóc', cs: 'Péče o vlasy', en: 'Haircare' } },
      { id: 'fragrance', slug: 'fragrance', name: { vi: 'Nước hoa', cs: 'Parfémy', en: 'Fragrance' } },
    ],
  },
  {
    id: 'other', slug: 'other',
    name: { vi: 'Khác', cs: 'Ostatní', en: 'Other' },
    subcategories: [
      { id: 'supplements', slug: 'supplements', name: { vi: 'Thực phẩm chức năng', cs: 'Doplňky stravy', en: 'Supplements' } },
      { id: 'tools', slug: 'tools', name: { vi: 'Thiết bị làm đẹp', cs: 'Přístroje', en: 'Beauty Tools' } },
    ],
  },
];
