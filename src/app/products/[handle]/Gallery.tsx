'use client';

// PDP gallery. One scroll-snap track drives every layout: swipe on mobile
// (dots + "1 / N"), thumbnails + arrow keys on desktop, and a zoom dialog.
// A broken image falls back to the Lootix mark at 20%.

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import type { GalleryImage } from '@/config/product-groups';

const LOGO = '/brand/lootix-main-logo.svg';

function Img({ im, alt, eager }: { im: GalleryImage; alt: string; eager?: boolean }) {
  const [broken, setBroken] = useState(false);
  if (broken) return <img src={LOGO} alt={alt} className="pdp-fallback" />;
  return (
    <img
      src={im.url}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
      onError={() => setBroken(true)}
    />
  );
}

export default function Gallery({ title, colour, images }: { title: string; colour: string; images: readonly GalleryImage[] }) {
  const [i, setI] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  const n = images.length;
  const view = (im: GalleryImage) => (im.kind === 'artwork' ? 'print artwork, flat' : `${im.placement} view`);
  const alt = (im: GalleryImage) => `${title}, ${colour}, ${view(im)}`;

  const go = useCallback((k: number, focus = false) => {
    const next = (k + n) % n;
    setI(next);
    const t = track.current;
    const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    // >=1024 the slides are stacked and the page scrolls past them (buy panel stays sticky).
    if (t && matchMedia('(min-width: 1024px)').matches) (t.children[next] as HTMLElement | undefined)?.scrollIntoView({ behavior, block: 'start' });
    else if (t) t.scrollTo({ left: next * t.clientWidth, behavior });
    if (focus) thumbs.current[next]?.focus();
  }, [n]);

  useEffect(() => {
    const t = track.current;
    if (!t) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setI(Math.round(t.scrollLeft / Math.max(1, t.clientWidth))));
    };
    t.addEventListener('scroll', onScroll, { passive: true });
    return () => { t.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  const arrows = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); go(i + 1, true); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(i - 1, true); }
  };
  const zoomKeys = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
  };
  const img = images[i] ?? images[0];

  return (
    <div className="pdp-gallery">
      <div className="pdp-stage">
        <div className="pdp-track" ref={track} aria-roledescription="carousel" aria-label={`${title} images`}>
          {images.map((im, k) => (
            <button
              key={im.url}
              type="button"
              className="pdp-slide"
              aria-label={`Zoom image ${k + 1} of ${n}: ${view(im)}`}
              tabIndex={k === i ? 0 : -1}
              onClick={() => { setI(k); dialog.current?.showModal(); }}
            >
              <Img im={im} alt={alt(im)} eager={k === 0} />
            </button>
          ))}
        </div>
        {n > 1 && (
          <>
            <span className="pdp-count" aria-hidden="true">{i + 1} / {n}</span>
            <button type="button" className="pdp-arrow pdp-arrow-prev" onClick={() => go(i - 1)} aria-label="Previous image">&lsaquo;</button>
            <button type="button" className="pdp-arrow pdp-arrow-next" onClick={() => go(i + 1)} aria-label="Next image">&rsaquo;</button>
            <div className="pdp-dots" aria-hidden="true">
              {images.map((im, k) => <span key={im.url} data-on={k === i || undefined} />)}
            </div>
          </>
        )}
      </div>
      {n > 1 && (
        <div className="pdp-thumbs" role="tablist" aria-label="Choose image" onKeyDown={arrows}>
          {images.map((im, k) => (
            <button
              key={im.url}
              ref={(el) => { thumbs.current[k] = el; }}
              type="button"
              role="tab"
              aria-selected={k === i}
              tabIndex={k === i ? 0 : -1}
              aria-label={`Show ${view(im)}`}
              onClick={() => go(k)}
              data-on={k === i || undefined}
            >
              <img src={im.url} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
      <dialog ref={dialog} className="pdp-zoom" aria-label={`${title} zoom`} onKeyDown={zoomKeys} onClick={(e) => { if (e.target === dialog.current) dialog.current.close(); }}>
        <img src={img.url} alt={alt(img)} />
        <div className="pdp-zoom-bar">
          {n > 1 && <button type="button" onClick={() => go(i - 1)} aria-label="Previous image">&larr;</button>}
          {n > 1 && <span>{i + 1} / {n}</span>}
          {n > 1 && <button type="button" onClick={() => go(i + 1)} aria-label="Next image">&rarr;</button>}
          <button type="button" onClick={() => dialog.current?.close()} aria-label="Close zoom" autoFocus>Close</button>
        </div>
      </dialog>
    </div>
  );
}
