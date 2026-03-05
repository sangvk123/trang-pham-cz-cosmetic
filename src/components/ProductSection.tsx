'use client';

import Link from 'next/link';
import { useLocale } from '@/lib/LocaleContext';
import { t } from '@/lib/i18n';
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductSectionProps {
  titleKey: string;
  products: Product[];
  viewAllLink?: string;
}

export default function ProductSection({ titleKey, products, viewAllLink }: ProductSectionProps) {
  const { locale } = useLocale();

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold">{t(titleKey, locale)}</h2>
        {viewAllLink && (
          <Link href={viewAllLink} className="text-primary text-sm font-medium hover:underline">
            {t('viewAll', locale)} →
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
