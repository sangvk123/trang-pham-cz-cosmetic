import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'deals',
    slug: 'deal-sieu-re',
    name: { vi: 'Deal sieu re', cs: 'Super slevy', en: 'Super Deals' },
  },
  {
    id: 'combo',
    slug: 'combo',
    name: { vi: 'Combo', cs: 'Combo', en: 'Combo' },
  },
  {
    id: 'makeup',
    slug: 'makeup',
    name: { vi: 'Trang diem', cs: 'Make-up', en: 'Makeup' },
    subcategories: [
      {
        id: 'lip',
        slug: 'son-moi',
        name: { vi: 'Son moi', cs: 'Rtenky', en: 'Lipstick' },
      },
      {
        id: 'eye',
        slug: 'trang-diem-mat',
        name: { vi: 'Trang diem mat', cs: 'Oci', en: 'Eye Makeup' },
      },
      {
        id: 'face',
        slug: 'trang-diem-mat-guong',
        name: { vi: 'Trang diem guong mat', cs: 'Oblicej', en: 'Face Makeup' },
      },
      {
        id: 'foundation',
        slug: 'kem-nen',
        name: { vi: 'Kem nen / Cushion', cs: 'Make-up / Cushion', en: 'Foundation / Cushion' },
      },
    ],
  },
  {
    id: 'skincare',
    slug: 'skincare',
    name: { vi: 'Cham soc da', cs: 'Pece o plet', en: 'Skincare' },
    subcategories: [
      {
        id: 'cleanser',
        slug: 'lam-sach',
        name: { vi: 'Lam sach da', cs: 'Cisteni', en: 'Cleansers' },
      },
      {
        id: 'moisturizer',
        slug: 'duong-am',
        name: { vi: 'Duong am', cs: 'Hydratace', en: 'Moisturizers' },
      },
      {
        id: 'serum',
        slug: 'serum',
        name: { vi: 'Serum / Tinh chat', cs: 'Sera', en: 'Serums' },
      },
      {
        id: 'sunscreen',
        slug: 'chong-nang',
        name: { vi: 'Kem chong nang', cs: 'Opalovaci kremy', en: 'Sunscreen' },
      },
      {
        id: 'mask',
        slug: 'mat-na',
        name: { vi: 'Mat na', cs: 'Masky', en: 'Face Masks' },
      },
    ],
  },
  {
    id: 'bodycare',
    slug: 'body-care',
    name: { vi: 'Cham soc co the', cs: 'Pece o telo', en: 'Body Care' },
    subcategories: [
      {
        id: 'shower',
        slug: 'sua-tam',
        name: { vi: 'Sua tam', cs: 'Sprchove gely', en: 'Body Wash' },
      },
      {
        id: 'bodylotion',
        slug: 'duong-the',
        name: { vi: 'Duong the', cs: 'Telova mleka', en: 'Body Lotion' },
      },
      {
        id: 'deodorant',
        slug: 'khu-mui',
        name: { vi: 'Lan khu mui', cs: 'Deodoranty', en: 'Deodorant' },
      },
    ],
  },
  {
    id: 'haircare',
    slug: 'hair-care',
    name: { vi: 'Cham soc toc', cs: 'Pece o vlasy', en: 'Hair Care' },
    subcategories: [
      {
        id: 'shampoo',
        slug: 'dau-goi',
        name: { vi: 'Dau goi', cs: 'Sampony', en: 'Shampoo' },
      },
      {
        id: 'conditioner',
        slug: 'dau-xa',
        name: { vi: 'Dau xa', cs: 'Kondicionery', en: 'Conditioner' },
      },
      {
        id: 'hairmask',
        slug: 'u-toc',
        name: { vi: 'U toc', cs: 'Masky na vlasy', en: 'Hair Mask' },
      },
    ],
  },
  {
    id: 'supplements',
    slug: 'supplements',
    name: { vi: 'Thuc pham chuc nang', cs: 'Doplnky stravy', en: 'Supplements' },
  },
  {
    id: 'tools',
    slug: 'beauty-tools',
    name: { vi: 'Dung cu lam dep', cs: 'Kosmeticke nastroje', en: 'Beauty Tools' },
  },
];
