import { redirect } from 'next/navigation';

/**
 * Retired Printful-era collection page — see src/app/mens/page.tsx for why.
 * next.config.js already 301s /new-drops → /shop.
 */
export default function NewDropsPage() {
  redirect('/shop');
}
