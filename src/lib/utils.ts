export function formatPrice(priceInCZK: number): string {
  return new Intl.NumberFormat('cs-CZ').format(priceInCZK) + ' Kc';
}

export function getDiscountPercent(price: number, originalPrice: number): number {
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
