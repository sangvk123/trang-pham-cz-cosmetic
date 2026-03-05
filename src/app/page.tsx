'use client';

import HeroBanner from '@/components/HeroBanner';
import FeatureBadges from '@/components/FeatureBadges';
import CategoryGrid from '@/components/CategoryGrid';
import DailyDeals from '@/components/DailyDeals';
import ProductSection from '@/components/ProductSection';
import { products } from '@/data/products';

export default function HomePage() {
  const bestSellers = products.filter((p) => p.isBestSeller);
  const newArrivals = products.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 space-y-8">
      {/* Hero Banner Slider */}
      <HeroBanner />

      {/* Feature Badges */}
      <FeatureBadges />

      {/* Category Grid */}
      <section>
        <CategoryGrid />
      </section>

      {/* Daily Deals with countdown */}
      <DailyDeals />

      {/* Best Sellers */}
      <ProductSection
        titleKey="home.bestSellers"
        products={bestSellers}
        viewAllLink="/category/best-sellers"
      />

      {/* New Arrivals */}
      <ProductSection
        titleKey="home.newArrivals"
        products={newArrivals}
        viewAllLink="/category/new-arrivals"
      />

      {/* Monthly Promotions Banner */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 md:p-12 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Chuong trinh khuyen mai thang 3</h2>
        <p className="text-lg opacity-90 mb-4">Giam gia len den 50% cho tat ca san pham Skincare</p>
        <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
          Xem ngay
        </button>
      </section>
    </div>
  );
}
