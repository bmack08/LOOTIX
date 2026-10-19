import { redirect } from 'next/navigation';

/**
 * Retired Printful-era collection page — see src/app/mens/page.tsx for why.
 * next.config.js already 301s /womens → /shop.
 */
export default function WomensPage() {
  redirect('/shop');
}
