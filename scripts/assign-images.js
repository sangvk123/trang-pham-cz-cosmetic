const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../src/data/products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Category image pools
const imagePool = {
  skincare: [
    '/images/products/categories/skincare-1.jpg',
    '/images/products/categories/skincare-2.jpg',
    '/images/products/categories/skincare-3.jpg',
    '/images/products/categories/skincare-4.jpg',
  ],
  makeup: [
    '/images/products/categories/makeup-1.jpg',
    '/images/products/categories/makeup-2.jpg',
    '/images/products/categories/makeup-3.jpg',
    '/images/products/categories/makeup-4.jpg',
  ],
  haircare: [
    '/images/products/categories/haircare-1.jpg',
    '/images/products/categories/haircare-2.jpg',
  ],
  bodycare: [
    '/images/products/categories/bodycare-1.jpg',
    '/images/products/categories/bodycare-2.jpg',
  ],
  other: [
    '/images/products/categories/other-1.jpg',
    '/images/products/categories/other-2.jpg',
  ],
};

let assigned = 0;
products.forEach((p, i) => {
  // Skip products that already have real images
  if (p.images && p.images.length > 0) return;

  const pool = imagePool[p.category] || imagePool.other;
  // Distribute images evenly using index
  p.images = [pool[i % pool.length]];
  assigned++;
});

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
console.log(`Assigned images to ${assigned} products out of ${products.length}`);

// Stats
const cats = {};
products.forEach(p => {
  cats[p.category] = (cats[p.category] || 0) + 1;
});
console.log('By category:', cats);
