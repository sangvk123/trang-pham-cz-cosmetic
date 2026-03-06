#!/usr/bin/env node

/**
 * Import products from DanhMucSanPham.xlsx → src/data/products.json
 *
 * Cột Excel:
 *   Nhóm hàng(3 Cấp), Mã hàng, Tên hàng, Thương hiệu, Giá bán,
 *   Tồn kho, Hình ảnh (url1,url2...), Đang kinh doanh, Mô tả
 *
 * Logic:
 *   - Chỉ import sản phẩm có "Đang kinh doanh" = 1
 *   - Ảnh: nếu có URL → dùng URL, nếu có file local /images/products/{MaHang}.jpg → dùng local
 *   - Tồn kho > 0 → inStock: true, ngược lại → false
 *   - Nhóm hàng → map sang category/subcategory
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const EXCEL_PATH = path.resolve(__dirname, '../../DanhMucSanPham.xlsx');
const OUTPUT_PATH = path.resolve(__dirname, '../src/data/products.json');
const IMAGES_DIR = path.resolve(__dirname, '../public/images/products');

// Map nhóm hàng Excel → category + subcategory
const CATEGORY_MAP = {
  'Son': { category: 'makeup', subcategory: 'lips' },
  'dưỡng môi': { category: 'makeup', subcategory: 'lips' },
  'Make up': { category: 'makeup', subcategory: 'face' },
  'Cushion': { category: 'makeup', subcategory: 'face' },
  'Serum': { category: 'skincare', subcategory: 'serum' },
  'Treatment': { category: 'skincare', subcategory: 'serum' },
  'kem duong': { category: 'skincare', subcategory: 'moisturizer' },
  'Kem mắt': { category: 'skincare', subcategory: 'moisturizer' },
  'Kem dưỡng mắt': { category: 'skincare', subcategory: 'moisturizer' },
  'Toner': { category: 'skincare', subcategory: 'toner' },
  'Toner Pad': { category: 'skincare', subcategory: 'toner' },
  'Lotion': { category: 'skincare', subcategory: 'moisturizer' },
  'kem chong nang': { category: 'skincare', subcategory: 'sunscreen' },
  'Mask': { category: 'skincare', subcategory: 'mask' },
  'Sữa Rửa Mặt': { category: 'skincare', subcategory: 'cleanser' },
  'Tẩy Trang': { category: 'skincare', subcategory: 'cleanser' },
  'Kem body': { category: 'bodycare', subcategory: null },
  'Body': { category: 'bodycare', subcategory: null },
  'Dưỡng Tóc': { category: 'haircare', subcategory: null },
  'Nước hoa': { category: 'other', subcategory: null },
  'TPCN': { category: 'other', subcategory: null },
  'Thiết bị làm đẹp': { category: 'other', subcategory: null },
  'Khác': { category: 'other', subcategory: null },
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

function getProductImage(maHang, excelImages) {
  // 1. Check if Excel has image URLs
  if (excelImages) {
    const urls = excelImages.split(',').map(u => u.trim()).filter(Boolean);
    if (urls.length > 0) return urls;
  }

  // 2. Check if local image file exists (try multiple extensions)
  const extensions = ['.jpg', '.jpeg', '.png', '.webp'];
  for (const ext of extensions) {
    const localPath = path.join(IMAGES_DIR, maHang + ext);
    if (fs.existsSync(localPath)) {
      return [`/images/products/${maHang}${ext}`];
    }
  }

  // 3. No image found → empty (UI will show default)
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

  for (const row of rows) {
    // Skip inactive products
    if (row['Đang kinh doanh'] !== 1) continue;

    // Skip non-product categories
    const nhomHang = row['Nhóm hàng(3 Cấp)'] || 'Khác';
    if (['Clothes', 'Quần áo', 'Hình thức lấy hàng'].includes(nhomHang)) continue;

    const maHang = row['Mã hàng'] || '';
    const tenHang = row['Tên hàng'] || '';
    const thuongHieu = row['Thương hiệu'] || '';
    const giaBan = Number(row['Giá bán']) || 0;
    const tonKho = Number(row['Tồn kho']) || 0;
    const moTa = row['Mô tả'] || '';
    const excelImages = row['Hình ảnh (url1,url2...)'] || null;

    if (!tenHang || giaBan <= 0) continue;

    // Generate unique slug
    let slug = slugify(tenHang);
    if (usedSlugs.has(slug)) {
      slug = slug + '-' + maHang.toLowerCase();
    }
    usedSlugs.add(slug);

    // Map category
    const catMap = CATEGORY_MAP[nhomHang] || { category: 'other', subcategory: null };

    // Get images
    const images = getProductImage(maHang, excelImages);

    products.push({
      id: maHang,
      slug,
      name: tenHang,
      brand: thuongHieu,
      price: giaBan,
      stock: tonKho,
      inStock: tonKho > 0,
      category: catMap.category,
      subcategory: catMap.subcategory,
      description: moTa,
      images,
      group: nhomHang,
    });
  }

  // Sort: in-stock first, then by group
  products.sort((a, b) => {
    if (a.inStock !== b.inStock) return a.inStock ? -1 : 1;
    return a.group.localeCompare(b.group);
  });

  // Write JSON
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(products, null, 2), 'utf-8');

  // Stats
  const inStockCount = products.filter(p => p.inStock).length;
  const withImages = products.filter(p => p.images.length > 0).length;
  console.log(`\nDone! Exported ${products.length} products to products.json`);
  console.log(`  In stock: ${inStockCount}`);
  console.log(`  Out of stock: ${products.length - inStockCount}`);
  console.log(`  With images: ${withImages}`);
  console.log(`  Categories: ${[...new Set(products.map(p => p.category))].join(', ')}`);
}

main();
