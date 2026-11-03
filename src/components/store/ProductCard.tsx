'use client';

import Link from 'next/link';
import type { Card } from '@/config/collections';
import Heart from './Heart';

/** Grid card: image, name, "From $X", up to 3 colour dots + "+N". No size buttons. */
export default function ProductCard({ card, colour, priority = false }: { card: Card; colour?: string; priority?: boolean }) {
  const cw = card.colours.find((c) => c.key === colour) ?? card.colours.find((c) => c.key === card.defaultColour) ?? card.colours[0];
  const href = cw && cw.key !== card.defaultColour ? `/products/${card.handle}?color=${cw.key}` : `/products/${card.handle}`;
  const dots = card.colours.slice(0, 3);
  const more = card.colours.length - dots.length;
  return (
    <div className="store-card">
      <Link href={href} className="store-card-link">
        <div className="store-card-img">
          <img src={cw?.img || card.img} alt={`${card.title}, ${cw?.label ?? ''}, front`} loading={priority ? 'eager' : 'lazy'} />
        </div>
        <div className="store-card-body">
          <span className="store-card-name">{card.title}</span>
          <span className="font-plex text-brass-lit" style={{ fontSize: 14, fontWeight: 600 }}>From {card.price}</span>
          <span className="store-dots" aria-label={`${card.colours.length} colors`}>
            {dots.map((d) => (
              <span key={d.key} style={{ background: d.hex }} title={d.label} aria-hidden />
            ))}
            {more > 0 ? <span className="font-plex text-stone" aria-hidden>+{more}</span> : null}
          </span>
        </div>
      </Link>
      <Heart handle={card.handle} color={cw?.key ?? card.defaultColour} title={card.title} className="store-card-heart" />
    </div>
  );
}
