import { redirect } from 'next/navigation';

/**
 * Retired Printful-era collection page.
 *
 * next.config.js already 301s /mens → /shop, so this never rendered. The page
 * body is gone for two reasons: it fetched the Printful catalogue at build
 * time, which made every build depend on a retired integration, and it
 * advertised "every dollar spent = N entries", which is no longer how entries
 * work — one order earns one entry.
 *
 * Kept as a redirect rather than deleted so the route cannot 404 if the
 * next.config rule is ever removed. The old implementation is in git history.
 */
export default function MensPage() {
  redirect('/shop');
}
