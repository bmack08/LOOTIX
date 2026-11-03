import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCT_GROUPS, getProductGroup } from '@/config/product-groups';
import { SITE_ORIGIN } from '@/config/giveaway';
import ProductView from './ProductView';

const HAIR = '1px solid rgba(198,161,91,0.16)';

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCT_GROUPS.map((g) => ({ slug: g.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const g = getProductGroup(slug);
  if (!g) return {};
  const colours = [...new Set(g.colourways.map((c) => c.colour))];
  const description = `${g.title} \u2014 ${g.price}. ${g.sub}. Available in ${colours.join(', ')}. Ships to U.S. addresses only.`;
  const img = g.colourways[0]?.images[0]?.url;
  const url = `${SITE_ORIGIN}/shop/${g.slug}`;
  return {
    title: `${g.title} \u2014 LOOTIX`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: g.title,
      description,
      siteName: 'LOOTIX',
      images: img ? [{ url: img, width: 1000, height: 1000, alt: g.title }] : undefined,
    },
    twitter: { card: 'summary_large_image', title: g.title, description, images: img ? [img] : undefined },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const g = getProductGroup(slug);
  if (!g) notFound();

  const url = `${SITE_ORIGIN}/shop/${g.slug}`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Shop', item: `${SITE_ORIGIN}/shop` },
        { '@type': 'ListItem', position: 2, name: g.category, item: `${SITE_ORIGIN}/shop` },
        { '@type': 'ListItem', position: 3, name: g.title, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProductGroup',
      name: g.title,
      description: g.sub,
      url,
      brand: { '@type': 'Brand', name: 'LOOTIX' },
      productGroupID: g.slug,
      variesBy: ['https://schema.org/color', ...(g.sizes ? ['https://schema.org/size'] : [])],
      hasVariant: g.colourways.map((c) => ({
        '@type': 'Product',
        name: c.name,
        sku: c.slug,
        color: c.label,
        image: c.images.map((i) => i.url),
        offers: { '@type': 'Offer', price: c.priceValue.toFixed(2), priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: `${url}?c=${c.slug}` },
      })),
    },
  ];

  return (
    <div className="text-parchment">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <nav aria-label="Breadcrumb" className="font-plex uppercase text-stone" style={{ padding: '20px 24px', borderBottom: HAIR, fontSize: 11, letterSpacing: '0.1em' }}>
        <ol className="flex gap-2 flex-wrap m-0 p-0" style={{ listStyle: 'none' }}>
          <li><Link href="/shop" className="hover:text-brass-lit transition-colors">Shop</Link></li>
          <li aria-hidden>/</li>
          <li>{g.category}</li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-sand">{g.title}</li>
        </ol>
      </nav>
      <ProductView group={g} />
    </div>
  );
}
