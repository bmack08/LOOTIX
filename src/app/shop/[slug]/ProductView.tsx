'use client';

// Groundwork product page: colourway + size picker, gallery, price, add to
// cart. Layout is intentionally plain v2 styling until the design specs land.

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { ProductGroup } from '@/config/product-groups';
import { SHOP_PRODUCTS } from '@/lib/site';
import AddToCart from '@/components/lootix/v2/AddToCart';
import { GIVEAWAY_ENABLED } from '@/config/flags';
import {
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_DELIVERY_BUSINESS_DAYS,
  SHIPPING_HOODIE_CENTS,
  SHIPPING_TEES_CENTS,
} from '@/config/shipping';

const HAIR = '1px solid rgba(198,161,91,0.16)';
const usd = (cents: number) => `$${(cents / 100).toFixed(2)}`;

export default function ProductView({ group }: { group: ProductGroup }) {
  const [cwSlug, setCwSlug] = useState(group.colourways[0].slug);
  const [imgIdx, setImgIdx] = useState(0);

  // Preselect ?c=<colourway slug> (old URLs, cart lines). Read after mount,
  // not with useSearchParams, so the page still prerenders in full.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('c');
    if (requested && group.colourways.some((c) => c.slug === requested)) setCwSlug(requested);
  }, [group.colourways]);

  const cw = group.colourways.find((c) => c.slug === cwSlug) ?? group.colourways[0];
  const product = useMemo(() => SHOP_PRODUCTS.find((p) => p.slug === cw.slug), [cw.slug]);
  const image = cw.images[Math.min(imgIdx, cw.images.length - 1)];

  function pick(slug: string) {
    setCwSlug(slug);
    setImgIdx(0);
    const u = new URL(window.location.href);
    if (slug === group.colourways[0].slug) u.searchParams.delete('c');
    else u.searchParams.set('c', slug);
    window.history.replaceState(null, '', u.toString());
  }

  // Inks offered, so the swatch list can be read "ink on colour".
  const hasInk = group.colourways.some((c) => c.ink);

  return (
    <section className="grid gap-10 grid-cols-1 lg:grid-cols-2" style={{ padding: 24, borderBottom: HAIR }}>
      {/* GALLERY */}
      <div className="flex flex-col gap-3">
        <div className="v2-card overflow-hidden" style={{ aspectRatio: '1/1', background: '#17130C' }}>
          <img
            src={image.url}
            alt={`${cw.name}${image.kind === 'artwork' ? ' \u2014 print artwork' : ''}`}
            className="w-full h-full"
            style={{ objectFit: image.kind === 'artwork' ? 'contain' : 'cover', padding: image.kind === 'artwork' ? 32 : 0 }}
          />
        </div>
        {cw.images.length > 1 && (
          <div className="flex gap-2" role="group" aria-label="Gallery">
            {cw.images.map((im, i) => (
              <button
                key={im.url}
                type="button"
                onClick={() => setImgIdx(i)}
                aria-pressed={i === imgIdx}
                aria-label={im.kind === 'artwork' ? 'Print artwork' : 'Product mockup'}
                className="overflow-hidden"
                style={{ width: 80, height: 80, background: '#17130C', borderRadius: 2, border: `1px solid ${i === imgIdx ? '#C6A15B' : 'rgba(198,161,91,0.25)'}`, cursor: 'pointer', padding: 0 }}
              >
                <img src={im.url} alt="" className="w-full h-full" style={{ objectFit: im.kind === 'artwork' ? 'contain' : 'cover' }} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* DETAILS */}
      <div className="flex flex-col gap-5" style={{ maxWidth: 560 }}>
        <div className="flex flex-col gap-2">
          <span className="v2-eyebrow">{group.category} · Launch Collection</span>
          <h1 className="m-0 uppercase text-parchment" style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 900, letterSpacing: '-0.01em' }}>{group.title}</h1>
          <span className="font-plex text-brass-lit" style={{ fontSize: 20, fontWeight: 600 }}>{cw.price}</span>
          <span className="uppercase text-stone" style={{ fontSize: 12, letterSpacing: '0.06em' }}>{group.sub}</span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-plex uppercase text-stone" style={{ fontSize: 11, letterSpacing: '0.1em' }}>
            {hasInk ? 'Ink / colour' : 'Colour'}: <span className="text-sand">{cw.label}</span>
          </span>
          <div className="flex gap-2 flex-wrap" role="radiogroup" aria-label="Colourway">
            {group.colourways.map((c) => {
              const active = c.slug === cw.slug;
              return (
                <button
                  key={c.slug}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  title={c.label}
                  onClick={() => pick(c.slug)}
                  className="overflow-hidden"
                  style={{ width: 56, height: 56, background: '#17130C', borderRadius: 2, border: `1px solid ${active ? '#C6A15B' : 'rgba(198,161,91,0.25)'}`, cursor: 'pointer', padding: 0 }}
                >
                  <img src={c.images[0].url} alt={c.label} className="w-full h-full" style={{ objectFit: 'cover' }} />
                </button>
              );
            })}
          </div>
        </div>

        {product ? <AddToCart key={cw.slug} product={product} full /> : null}

        <div className="flex flex-col gap-2 font-plex text-stone" style={{ borderTop: HAIR, paddingTop: 18, fontSize: 12, lineHeight: 1.7, letterSpacing: '0.04em' }}>
          <span className="uppercase text-sand" style={{ letterSpacing: '0.1em' }}>Shipping &amp; returns</span>
          <span>
            Ships to U.S. addresses only. Free shipping on orders of ${FREE_SHIPPING_THRESHOLD}+; otherwise flat-rate {usd(SHIPPING_HOODIE_CENTS)} with a hoodie
            or {usd(SHIPPING_TEES_CENTS)} without. Made to order: arrives in about {SHIPPING_DELIVERY_BUSINESS_DAYS.min}&ndash;{SHIPPING_DELIVERY_BUSINESS_DAYS.max} business days.
          </span>
          <span>
            Size or colour exchanges within 30 days of delivery for an equal-value item. See{' '}
            <Link href="/returns" className="text-brass hover:text-brass-lit transition-colors">Returns</Link> and{' '}
            <Link href="/shipping" className="text-brass hover:text-brass-lit transition-colors">Shipping</Link>.
          </span>
          {/* Shown only while the giveaway is on (NEXT_PUBLIC_GIVEAWAY_ENABLED). */}
          {GIVEAWAY_ENABLED && <span>A size exchange keeps your giveaway entries; a refund voids them.</span>}
          {/* Pay-later (Klarna / Afterpay) line: not shown. Add it only once one is enabled in Stripe. */}
        </div>
      </div>
    </section>
  );
}
