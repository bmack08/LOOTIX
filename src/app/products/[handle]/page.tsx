import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCT_GROUPS, getProductGroup, type ProductGroup } from '@/config/product-groups';
import { SITE_ORIGIN } from '@/config/giveaway';
import { SHOP_PRODUCTS } from '@/lib/site';
import { isComingSoon } from '@/config/sizes';
import { sizeChartFor } from '@/config/size-charts';
import ProductView from './ProductView';
import ProductCard from '@/components/store/ProductCard';
import { toCard } from '@/config/collections';
import { relatedProducts } from '@/config/product-groups';

// Unknown handles are a real 404 (not-found.tsx), not a redirect.
export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCT_GROUPS.map((g) => ({ handle: g.handle }));
}

type Params = { params: Promise<{ handle: string }> };

const CATEGORY_HREF: Record<string, string> = { Hoodies: '/collections/hoodies', Tees: '/collections/tees', Hats: '/collections/hats' };

function describe(g: ProductGroup): string {
  const colours = [...new Set(g.colourways.map((c) => c.colour))];
  return `${g.title}, ${g.price}. ${g.fitNote} Available in ${colours.length} colors. Ships to the US only.`.replace(/\s+/g, ' ');
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { handle } = await params;
  const g = getProductGroup(handle);
  if (!g) return {};
  const description = describe(g);
  const cw = g.colourways.find((c) => c.key === g.defaultColour)!;
  const img = cw.images[0]?.url;
  const url = `${SITE_ORIGIN}/products/${g.handle}`;
  return {
    title: { absolute: `${g.title} \u2013 Lootix` },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: `${g.title} \u2013 Lootix`,
      description,
      siteName: 'Lootix',
      images: img ? [{ url: img, width: 1000, height: 1000, alt: `${g.title}, ${cw.swatchLabel}` }] : undefined,
    },
    twitter: { card: 'summary_large_image', title: `${g.title} \u2013 Lootix`, description, images: img ? [img] : undefined },
  };
}

export default async function ProductPage({ params }: Params) {
  const { handle } = await params;
  const g = getProductGroup(handle);
  if (!g) notFound();

  const comingSoon = SHOP_PRODUCTS.filter((p) => isComingSoon(p)).map((p) => p.slug);
  // Rows never show anything sold out (or coming soon) in every colour.
  const buyable = (p: ProductGroup) => p.colourways.some((c) => c.available && !comingSoon.includes(c.slug));
  const notBuyable = PRODUCT_GROUPS.filter((p) => !buyable(p)).map((p) => p.handle);
  const styleWith = g.styleWith.map((h) => getProductGroup(h)).filter((p): p is ProductGroup => !!p && buyable(p)).slice(0, 4);
  const alsoLike = relatedProducts(g.handle, 4, notBuyable);
  const url = `${SITE_ORIGIN}/products/${g.handle}`;
  const categoryHref = CATEGORY_HREF[g.category] ?? '/shop';
  // Product JSON-LD, one Offer per colour x size. No reviews / ratings.
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE_ORIGIN}/shop` },
        { '@type': 'ListItem', position: 3, name: g.category, item: `${SITE_ORIGIN}${categoryHref}` },
        { '@type': 'ListItem', position: 4, name: g.title, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: g.title,
      description: describe(g),
      url,
      sku: g.handle,
      brand: { '@type': 'Brand', name: 'Lootix' },
      image: g.colourways.find((c) => c.key === g.defaultColour)!.images.map((i) => i.url),
      offers: g.colourways.flatMap((c) =>
        c.variants.map((v) => ({
          '@type': 'Offer',
          sku: `${c.slug}-${v.size}`,
          name: `${g.title} \u2013 ${c.swatchLabel}${g.sizes ? ` \u2013 ${v.size}` : ''}`,
          price: c.priceValue.toFixed(2),
          priceCurrency: 'USD',
          availability: v.available && !comingSoon.includes(c.slug) ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          url: c.key === g.defaultColour ? url : `${url}?color=${c.key}`,
          shippingDetails: { '@type': 'OfferShippingDetails', shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'US' } },
        })),
      ),
    },
  ];

  return (
    <div className="text-parchment pdp-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <nav aria-label="Breadcrumb" className="pdp-crumbs font-plex uppercase text-stone">
        <ol>
          <li><Link href="/">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/shop">Shop</Link></li>
          <li aria-hidden>/</li>
          <li><Link href={categoryHref}>{g.category}</Link></li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-sand">{g.title}</li>
        </ol>
      </nav>
      <ProductView group={g} comingSoon={comingSoon} chart={sizeChartFor(g.blankId, g.sizes)} />
      {styleWith.length > 0 && (
        <section className="pdp-row" aria-labelledby="pdp-style-with">
          <h2 id="pdp-style-with">Style with</h2>
          <div className="pdp-row-grid">{styleWith.map((p) => <ProductCard key={p.handle} card={toCard(p)} />)}</div>
        </section>
      )}
      {alsoLike.length >= 2 && (
        <section className="pdp-row" aria-labelledby="pdp-also-like">
          <h2 id="pdp-also-like">You may also like</h2>
          <div className="pdp-row-grid">{alsoLike.map((p) => <ProductCard key={p.handle} card={toCard(p)} />)}</div>
        </section>
      )}
    </div>
  );
}
