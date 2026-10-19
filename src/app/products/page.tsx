import { redirect } from 'next/navigation';

/**
 * Retired Printful-era catalogue page — see src/app/mens/page.tsx for why.
 * next.config.js already 301s /products → /shop.
 */
export default function ProductsPage() {
  redirect('/shop');
}
