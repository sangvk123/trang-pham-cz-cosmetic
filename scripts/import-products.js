#!/usr/bin/env node

/**
 * Import products from DanhMucSanPham.xlsx -> src/data/products.json
 *
 * Col Excel:
 *   Nhom hang(3 Cap), Ma hang, Ten hang, Thuong hieu, Gia ban,
 *   Ton kho, Dang kinh doanh, Mo ta
 *
 * Logic:
 *   - Chi import san pham co "Dang kinh doanh" = 1
 *   - Ton kho > 0 -> inStock: true
 *   - Nhom hang -> map sang category/subcategory
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const EXCEL_PATH = path.resolve(__dirname, '../../DanhMucSanPham.xlsx');
const OUTPUT_PATH = path.resolve(__dirname, '../src/data/products.json');
const IMAGES_DIR = path.resolve(__dirname, '../public/images/products');

// Map nhom hang Excel -> category + subcategory
// Standardized names after xlsx cleanup
const CATEGORY_MAP = {
  // Skincare
  'Sữa Rửa Mặt':     { category: 'skincare', subcategory: 'cleanser' },
  'Tẩy Trang':        { category: 'skincare', subcategory: 'cleanser' },
  'Toner':            { category: 'skincare', subcategory: 'toner' },
  'Toner Pad':        { category: 'skincare', subcategory: 'toner-pad' },
  'Serum':            { category: 'skincare', subcategory: 'serum' },
  'Treatment':        { category: 'skincare', subcategory: 'treatment' },
  'Kem dưỡng':        { category: 'skincare', subcategory: 'moisturizer' },
  'Kem chống nắng':   { category: 'skincare', subcategory: 'sunscreen' },
  'Mask':             { category: 'skincare', subcategory: 'mask' },
  'Kem mắt':          { category: 'skincare', subcategory: 'eye-care' },

  // Makeup
  'Makeup':           { category: 'makeup', subcategory: 'face' },
  'Cushion':          { category: 'makeup', subcategory: 'face' },
  'Son':              { category: 'makeup', subcategory: 'lips' },
  'Dưỡng môi':        { category: 'makeup', subcategory: 'lip-care' },

  // Body Care
  'Kem body':         { category: 'bodycare', subcategory: 'body' },
  'Dưỡng Tóc':       { category: 'bodycare', subcategory: 'haircare' },
  'Nước hoa':         { category: 'bodycare', subcategory: 'fragrance' },

  // Other
  'TPCN':             { category: 'other', subcategory: 'supplements' },
  'Thiết bị làm đẹp': { category: 'other', subcategory: 'tools' },
  'Khác':             { category: 'other', subcategory: null },
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
  if (excelImages) {
    const urls = excelImages.split(',').map(u => u.trim()).filter(Boolean);
    if (urls.length > 0) return urls;
  }
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

  for (const row of rows) {
    if (row['Đang kinh doanh'] !== 1) continue;

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

    let slug = slugify(tenHang);
    if (usedSlugs.has(slug)) {
      slug = slug + '-' + maHang.toLowerCase();
    }
    usedSlugs.add(slug);

    const catMap = CATEGORY_MAP[nhomHang] || { category: 'other', subcategory: null };
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

  products.sort((a, b) => {
    if (a.inStock !== b.inStock) return a.inStock ? -1 : 1;
    return a.group.localeCompare(b.group);
  });

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(products, null, 2), 'utf-8');

  const inStockCount = products.filter(p => p.inStock).length;
  const withImages = products.filter(p => p.images.length > 0).length;
  const catStats = {};
  products.forEach(p => { catStats[p.category] = (catStats[p.category] || 0) + 1; });
  console.log(`\nDone! Exported ${products.length} products to products.json`);
  console.log(`  In stock: ${inStockCount}`);
  console.log(`  Out of stock: ${products.length - inStockCount}`);
  console.log(`  With images: ${withImages}`);
  console.log(`  Categories:`, catStats);
}

main();
