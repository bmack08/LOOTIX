'use client';

import { useState } from 'react';
import type { GalleryImage } from '@/config/product-groups';

export default function Gallery({ title, colour, images }: { title: string; colour: string; images: readonly GalleryImage[] }) {
  const [i, setI] = useState(0);
  const img = images[i] ?? images[0];
  const view = (im: GalleryImage) => (im.kind === 'artwork' ? 'print artwork' : 'front');
  return (
    <div className="pdp-gallery">
      <div className="pdp-main">
        <img src={img.url} alt={`${title}, ${colour}, ${view(img)}`} fetchPriority="high" />
      </div>
      {images.length > 1 && (
        <div className="pdp-thumbs" role="group" aria-label="Images">
          {images.map((im, n) => (
            <button key={im.url} type="button" aria-pressed={n === i} aria-label={`Show ${view(im)}`} onClick={() => setI(n)} data-on={n === i || undefined}>
              <img src={im.url} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
