#!/bin/bash
#
# Update products from DanhMucSanPham.xlsx and push to GitHub
#
# Usage:
#   ./scripts/update-products.sh              # Import + build + push
#   ./scripts/update-products.sh --import     # Only import (no push)
#   ./scripts/update-products.sh --dry-run    # Import + build (no push)
#

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

echo "============================================"
echo "  Trang Pham Cosmetics - Product Update"
echo "============================================"
echo ""

# Step 1: Import Excel → JSON
echo "[1/4] Importing products from DanhMucSanPham.xlsx..."
node scripts/import-products.js
echo ""

if [ "$1" = "--import" ]; then
  echo "Done! (--import mode, skipping build and push)"
  exit 0
fi

# Step 2: Build
echo "[2/4] Building Next.js project..."
npm run build
echo ""

if [ "$1" = "--dry-run" ]; then
  echo "Done! (--dry-run mode, skipping push)"
  exit 0
fi

# Step 3: Git commit
echo "[3/4] Committing changes..."
git add src/data/products.json
git add public/images/products/ 2>/dev/null || true

# Check if there are changes to commit
if git diff --cached --quiet; then
  echo "No changes to commit. Products are up to date."
  exit 0
fi

TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
PRODUCT_COUNT=$(node -e 'const d=require("./src/data/products.json"); console.log(d.length)')
IN_STOCK=$(node -e 'const d=require("./src/data/products.json"); console.log(d.filter(p=>p.inStock).length)')

git commit -m "data: update product catalog ($PRODUCT_COUNT products, $IN_STOCK in stock) - $TIMESTAMP"
echo ""

# Step 4: Push
echo "[4/4] Pushing to GitHub..."
git push origin main
echo ""

echo "============================================"
echo "  Done! Products updated successfully."
echo "  $PRODUCT_COUNT products ($IN_STOCK in stock)"
echo "  Vercel will auto-deploy shortly."
echo "============================================"
