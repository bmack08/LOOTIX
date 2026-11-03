import type { MetadataRoute } from 'next';
import { SITE_ORIGIN } from '@/config/giveaway';
import { PRODUCT_GROUPS } from '@/config/product-groups';

const PAGES = ['/', '/shop', '/giveaways', '/winners', '/about', '/faq', '/official-rules', '/shipping', '/returns', '/privacy', '/terms', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map((p) => ({ url: `${SITE_ORIGIN}${p === '/' ? '' : p}`, changeFrequency: 'weekly' as const, priority: p === '/' ? 1 : p === '/shop' ? 0.9 : 0.5 })),
    ...PRODUCT_GROUPS.map((g) => ({
      url: `${SITE_ORIGIN}/shop/${g.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      images: g.colourways.slice(0, 1).flatMap((c) => c.images.map((i) => i.url)),
    })),
  ];
}
