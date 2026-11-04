import { notFound } from 'next/navigation';

// /shop has no per-item routes (products live at /products/[handle]), so any
// /shop/<slug> is unknown and gets the site 404 inside the header and footer.
export default function ShopSlug(): never {
  notFound();
}
