#!/usr/bin/env node

/**
 * Import products from DanhMucSanPham.xlsx -> src/data/products.json
 *
 * Excel columns (after restructure):
 *   A: Nhóm hàng(3 Cấp)  - MAKEUP, SKINCARE, BODYCARE, OTHER
 *   B: Tiểu mục           - Face, Eyes, Lips, Serum, Mask, etc.
 *   C: Mã hàng
 *   D: Tên hàng
 *   E: Thương hiệu
 *   F: Giá bán
 *   G: Giá vốn
 *   H: Tồn kho
 *   O: Mô tả
 *   Q: Phân loại màu      - "CR02 Boy:#E84B4B, PK01 Girl:#F5A0B0"
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const EXCEL_PATH = path.resolve(__dirname, '../../DanhMucSanPham.xlsx');
const OUTPUT_PATH = path.resolve(__dirname, '../src/data/products.json');
const IMAGES_DIR = path.resolve(__dirname, '../public/images/products');

// Map Nhóm hàng (uppercase) -> category id
const GROUP_MAP = {
  'MAKEUP': 'makeup',
  'SKINCARE': 'skincare',
  'BODYCARE': 'bodycare',
  'OTHER': 'other',
};

// Map Tiểu mục -> subcategory id
const SUB_MAP = {
  // Skincare
  'Tẩy Trang': 'oil-cleanser',
  'Sữa Rửa Mặt': 'water-cleanser',
  'Toner': 'toner',
  'Toner Pad': 'toner-pad',
  'Serum': 'serum',
  'Kem dưỡng': 'moisturizer',
  'Kem chống nắng': 'sunscreen',
  'Kem mắt': 'eye-care',
  'Mask': 'mask',
  'Treatment': 'treatment',
  'Dưỡng môi': 'lip-care',
  // Makeup
  'Face': 'face',
  'Lips': 'lips',
  'Eyes': 'eyes',
  // Body & Hair
  'Body': 'body',
  'Haircare': 'haircare',
  'Fragrance': 'fragrance',
  // Other
  'TPCN': 'supplements',
  'Thiết bị': 'tools',
};

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80);
}

/**
 * Parse color string: "CR02 Boy:#E84B4B, PK01 Girl:#F5A0B0"
 * Returns: [{ name: "CR02 Boy", hex: "#E84B4B" }, ...]
 */
function parseColors(colorStr) {
  if (!colorStr || typeof colorStr !== 'string') return [];

  const colors = [];
  const parts = colorStr.split(',').map(s => s.trim()).filter(Boolean);

  for (const part of parts) {
    const colonIdx = part.lastIndexOf(':');
    if (colonIdx === -1) continue;

    const name = part.substring(0, colonIdx).trim();
    const hex = part.substring(colonIdx + 1).trim();

    if (name && hex && /^#[0-9a-fA-F]{3,8}$/.test(hex)) {
      colors.push({ name, hex });
    }
  }

  return colors;
}

function getProductImage(maHang, excelImages) {
  if (excelImages) {
    const urls = excelImages.split(',').map(u => u.trim()).filter(Boolean);
    if (urls.length > 0) return urls;
  }
  if (!maHang) return [];
  const extensions = ['.jpg', '.jpeg', '.png', '.webp'];
  for (const ext of extensions) {
    const localPath = path.join(IMAGES_DIR, maHang + ext);
    if (fs.existsSync(localPath)) {
      return [`/images/products/${maHang}${ext}`];
    }
  }
  return [];
}

function main() {
  if (!fs.existsSync(EXCEL_PATH)) {
    console.error('ERROR: DanhMucSanPham.xlsx not found at:', EXCEL_PATH);
    process.exit(1);
  }

  const wb = XLSX.readFile(EXCEL_PATH);
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws);

  console.log(`Reading ${rows.length} rows from Excel...`);

  const products = [];
  const usedSlugs = new Set();
  let autoId = 1;

  for (const row of rows) {
    const nhomHang = (row['Nhóm hàng(3 Cấp)'] || '').trim().toUpperCase();
    const tieuMuc = (row['Tiểu mục'] || '').trim();
    const maHang = row['Mã hàng'] || '';
    const tenHang = (row['Tên hàng'] || '').trim();
    const thuongHieu = (row['Thương hiệu'] || '').trim();
    const giaBan = Number(row['Giá bán']) || 0;
    const tonKho = Number(row['Tồn kho']) || 0;
    const moTa = row['Mô tả'] || '';
    const colorStr = row['Phân loại màu'] || '';

    // Skip empty rows or rows without name/price
    if (!tenHang || giaBan <= 0) continue;
    // Skip non-product categories
    if (['CLOTHES', 'QUẦN ÁO'].includes(nhomHang)) continue;

    // Generate ID if missing
    const id = maHang || `SP${String(autoId++).padStart(4, '0')}`;

    let slug = slugify(tenHang);
    if (usedSlugs.has(slug)) {
      slug = slug + '-' + id.toLowerCase();
    }
    usedSlugs.add(slug);

    const category = GROUP_MAP[nhomHang] || 'other';
    const subcategory = SUB_MAP[tieuMuc] || null;
    const colors = parseColors(colorStr);
    const images = getProductImage(maHang);

    const product = {
      id,
      slug,
      name: tenHang,
      brand: thuongHieu,
      price: giaBan,
      stock: tonKho,
      inStock: tonKho > 0,
      category,
      subcategory,
      description: moTa,
      images,
      group: nhomHang,
    };

    // Only add colors if there are variants (>1 color)
    if (colors.length > 0) {
      product.colors = colors;
    }

    products.push(product);
  }

  products.sort((a, b) => {
    if (a.inStock !== b.inStock) return a.inStock ? -1 : 1;
    return (a.category + (a.subcategory || '')).localeCompare(b.category + (b.subcategory || ''));
  });

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(products, null, 2), 'utf-8');

  const inStockCount = products.filter(p => p.inStock).length;
  const withImages = products.filter(p => p.images.length > 0).length;
  const withColors = products.filter(p => p.colors && p.colors.length > 0).length;
  const catStats = {};
  const subStats = {};
  products.forEach(p => {
    catStats[p.category] = (catStats[p.category] || 0) + 1;
    if (p.subcategory) subStats[p.subcategory] = (subStats[p.subcategory] || 0) + 1;
  });

  console.log(`\nDone! Exported ${products.length} products to products.json`);
  console.log(`  In stock: ${inStockCount}`);
  console.log(`  Out of stock: ${products.length - inStockCount}`);
  console.log(`  With images: ${withImages}`);
  console.log(`  With colors: ${withColors}`);
  console.log(`  Categories:`, catStats);
  console.log(`  Subcategories:`, subStats);
}

main();
