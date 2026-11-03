'use client';

// Product page: gallery + buy panel. One state (colour key + size) drives
// the URL (?color=), the gallery, the panel and the sticky bar.
// Spec: /workspace design/pdp/SPEC.md.

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Colourway, ProductGroup } from '@/config/product-groups';
import { useCart } from '@/components/lootix/v2/CartContext';
import Gallery from './Gallery';
import type { SizeChart } from '@/config/size-charts';
import { Accordions, ShippingBox, openSizeChart } from './ProductInfo';
import StickyBar from './StickyBar';
import Heart from '@/components/store/Heart';
import { payLaterLine } from '@/config/pay-later';

type Props = { group: ProductGroup; comingSoon: readonly string[]; chart: SizeChart };

export default function ProductView({ group, comingSoon, chart }: Props) {
  const { add } = useCart();
  const [key, setKey] = useState(group.defaultColour);
  const [size, setSize] = useState<string | null>(null);
  const [needSize, setNeedSize] = useState(false);
  const [added, setAdded] = useState(false);
  const [announce, setAnnounce] = useState('');
  const sizesRef = useRef<HTMLDivElement>(null);
  const addedTimer = useRef<ReturnType<typeof setTimeout>>();

  const cw = group.colourways.find((c) => c.key === key) ?? group.colourways[0];
  const sized = group.sizes !== null;
  const blocked = (c: Colourway) => !c.available || comingSoon.includes(c.slug);
  const sizeOk = (c: Colourway, s: string) => !blocked(c) && (c.variants.find((v) => v.size === s)?.available ?? false);

  // ?color= on load and on back/forward. Read from window (not
  // useSearchParams) so the page still prerenders in full.
  useEffect(() => {
    const read = () => {
      const k = new URLSearchParams(window.location.search).get('color');
      if (k && group.colourways.some((c) => c.key === k)) setKey(k);
      else setKey(group.defaultColour);
    };
    read();
    window.addEventListener('popstate', read);
    return () => window.removeEventListener('popstate', read);
  }, [group]);

  const pickColour = useCallback(
    (k: string) => {
      setKey(k);
      const next = group.colourways.find((c) => c.key === k);
      // Keep the size when the new colour has it in stock.
      if (size && next && !sizeOk(next, size)) setSize(null);
      const u = new URL(window.location.href);
      if (k === group.defaultColour) u.searchParams.delete('color');
      else u.searchParams.set('color', k);
      window.history.replaceState(window.history.state, '', u.toString());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [group, size],
  );

  const pickSize = (s: string) => {
    setSize(s);
    setNeedSize(false);
  };

  const addToCart = useCallback((): boolean => {
    if (blocked(cw)) return false;
    if (sized && (!size || !sizeOk(cw, size))) {
      setNeedSize(true);
      setAnnounce('Pick a size');
      sizesRef.current?.querySelector<HTMLButtonElement>('button[aria-disabled="false"]')?.focus();
      return false;
    }
    add({ slug: cw.slug, name: cw.name, price: cw.priceValue, img: cw.images[0]?.url ?? '', size: sized && size ? size : undefined });
    setAdded(true);
    setAnnounce(`Added ${group.title}, ${cw.swatchLabel}${sized && size ? `, ${size}` : ''} to cart`);
    clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setAdded(false), 2000);
    return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cw, size, sized, add, group.title]);

  const stockLine = blocked(cw)
    ? 'Sold out in this color'
    : size && !sizeOk(cw, size)
      ? `${size} sold out in this color`
      : 'In stock. Printed to order.';

  const buttonLabel = blocked(cw) ? 'Sold out in this color' : added ? 'Added \u2713' : `Add to cart \u00b7 ${cw.price}`;

  return (
    <section className="pdp-grid">
      <Gallery key={cw.key} title={group.title} colour={cw.swatchLabel} images={cw.images} />

      <div className="pdp-panel flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <span className="v2-eyebrow">{group.category} · Launch Collection</span>
            <Heart handle={group.handle} color={cw.key} title={group.title} />
          </div>
          <h1 className="m-0 uppercase text-parchment" style={{ fontSize: 'clamp(26px,3.2vw,36px)', fontWeight: 900, letterSpacing: '-0.01em', lineHeight: 1.05 }}>
            {group.title}
          </h1>
          <span className="font-plex text-brass-lit" style={{ fontSize: 20, fontWeight: 600 }}>{cw.price}</span>
        </div>

        {/* COLOR */}
        <div className="flex flex-col gap-3">
          <span className="font-plex uppercase text-stone" style={{ fontSize: 11, letterSpacing: '0.1em' }}>
            Color: <span className="text-parchment">{cw.swatchLabel}</span>
          </span>
          <Swatches group={group} value={cw.key} blocked={blocked} onPick={pickColour} />
        </div>

        {/* SIZE */}
        {sized ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span id="pdp-size-label" className="font-plex uppercase text-stone" style={{ fontSize: 11, letterSpacing: '0.1em' }}>
                Size{size ? <>: <span className="text-parchment">{size}</span></> : null}
              </span>
              <button type="button" className="pdp-link" onClick={openSizeChart}>Size chart</button>
            </div>
            <Sizes
              refEl={sizesRef}
              sizes={cw.sizes ?? group.sizes ?? []}
              value={size}
              ok={(s) => sizeOk(cw, s)}
              onPick={pickSize}
              error={needSize}
            />
            {needSize ? <span className="font-plex text-brass-lit" style={{ fontSize: 12 }}>Pick a size</span> : null}
          </div>
        ) : (
          <span className="font-plex uppercase text-stone" style={{ fontSize: 11, letterSpacing: '0.1em' }}>
            Size: <span className="text-parchment">One size, adjustable</span>
          </span>
        )}

        <span className="font-plex text-sand" style={{ fontSize: 13 }}>{stockLine}</span>

        <button
          id="pdp-add"
          type="button"
          className="btn-brass w-full"
          onClick={addToCart}
          aria-disabled={blocked(cw)}
          disabled={blocked(cw)}
          style={{ height: 52, opacity: blocked(cw) ? 0.5 : 1, cursor: blocked(cw) ? 'not-allowed' : 'pointer' }}
        >
          {buttonLabel}
        </button>
        {payLaterLine(cw.priceValue) ? (
          <span className="font-plex text-sand" style={{ fontSize: 13 }}>{payLaterLine(cw.priceValue)}</span>
        ) : null}
        <p className="sr-only" role="status" aria-live="polite">{announce}</p>

        <ShippingBox />
        <Accordions group={group} chart={chart} />
      </div>
      <StickyBar
        title={group.title}
        detail={`${cw.swatchLabel}${sized && size ? ` \u00b7 ${size}` : ''} \u00b7 ${cw.price}`}
        label={blocked(cw) ? 'Sold out' : added ? 'Added \u2713' : 'Add to cart'}
        disabled={blocked(cw)}
        onAdd={addToCart}
      />
    </section>
  );
}

/** Roving-tabindex radiogroup helper: arrows move focus + select. */
function onArrows(e: React.KeyboardEvent<HTMLDivElement>, count: number, at: number, go: (i: number) => void) {
  const k = e.key;
  if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(k)) return;
  e.preventDefault();
  const i = k === 'Home' ? 0 : k === 'End' ? count - 1 : (at + (k === 'ArrowRight' || k === 'ArrowDown' ? 1 : -1) + count) % count;
  go(i);
  (e.currentTarget.children[i] as HTMLElement | undefined)?.focus();
}

function Swatches({ group, value, blocked, onPick }: { group: ProductGroup; value: string; blocked: (c: Colourway) => boolean; onPick: (k: string) => void }) {
  const at = Math.max(0, group.colourways.findIndex((c) => c.key === value));
  return (
    <div
      role="radiogroup"
      aria-label="Color"
      className="pdp-swatches"
      onKeyDown={(e) => onArrows(e, group.colourways.length, at, (i) => onPick(group.colourways[i].key))}
    >
      {group.colourways.map((c) => {
        const on = c.key === value;
        const out = blocked(c);
        return (
          <button
            key={c.key}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={out ? `${c.swatchLabel}, sold out` : c.swatchLabel}
            title={c.swatchLabel}
            tabIndex={on ? 0 : -1}
            onClick={() => onPick(c.key)}
            className="pdp-swatch"
            data-on={on || undefined}
            data-out={out || undefined}
          >
            <span style={{ background: c.hex }} />
          </button>
        );
      })}
    </div>
  );
}

function Sizes({ refEl, sizes, value, ok, onPick, error }: { refEl: React.RefObject<HTMLDivElement>; sizes: readonly string[]; value: string | null; ok: (s: string) => boolean; onPick: (s: string) => void; error: boolean }) {
  const at = Math.max(0, sizes.indexOf(value ?? ''));
  return (
    <div
      ref={refEl}
      role="radiogroup"
      aria-labelledby="pdp-size-label"
      aria-invalid={error || undefined}
      className="pdp-sizes"
      data-error={error || undefined}
      onKeyDown={(e) => onArrows(e, sizes.length, at, (i) => ok(sizes[i]) && onPick(sizes[i]))}
    >
      {sizes.map((s, i) => {
        const on = s === value;
        const can = ok(s);
        return (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={on}
            aria-disabled={!can}
            aria-label={can ? s : `${s}, sold out in this color`}
            tabIndex={on || (!value && i === 0) ? 0 : -1}
            onClick={() => can && onPick(s)}
            className="pdp-size"
            data-on={on || undefined}
            data-out={!can || undefined}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}
