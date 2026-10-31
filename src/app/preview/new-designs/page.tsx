import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Designs Preview | Lootix',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

const HAIR = '1px solid rgba(198,161,91,0.16)';
const PRICE = 'Price TBD (placeholder)';

type Piece = { name: string; note: string; front: string; back: string };

const FIRST_DROP: Piece[] = [
  { name: 'Ten Tips Cropped Hoodie', note: 'B+C 7502 Black. Back lists 10 tips in LootixScript.', front: '/preview/v6/02-ten-tips_front.webp', back: '/preview/v6/02-ten-tips_back.webp' },
  { name: 'See No Evil', note: 'LS16001 Black (wash shown as preview only). Patch art front, three-eye art back.', front: '/preview/v6/04-see-no-evil_front.webp', back: '/preview/v6/04-see-no-evil_back.webp' },
];

const V6_LINE: Piece[] = [
  { name: 'Static Shrine Classic', note: 'LS16001 Black. Acid green + white, halftone sigil back.', front: '/preview/v6/01-static-shrine-classic_front.webp', back: '/preview/v6/01-static-shrine-classic_back.webp' },
  { name: 'Critical Hit Athletic', note: 'LS16001 Sandshell. Maroon/gold/bone with teal accent, sticker patches.', front: '/preview/v6/03-critical-hit-athletic_front.webp', back: '/preview/v6/03-critical-hit-athletic_back.webp' },
];

const RXN: Piece[] = [
  { name: 'Loot Goblin', note: 'Concept. Vintage-wash black.', front: '/preview/rxn/01-loot-goblin_front.webp', back: '/preview/rxn/01-loot-goblin_back.webp' },
  { name: 'Final Boss Energy', note: 'Concept. Vintage-wash black.', front: '/preview/rxn/02-final-boss-energy_front.webp', back: '/preview/rxn/02-final-boss-energy_back.webp' },
  { name: 'Respawn', note: 'Concept. Vintage-wash black.', front: '/preview/rxn/03-respawn_front.webp', back: '/preview/rxn/03-respawn_back.webp' },
  { name: 'Blessed by RNG', note: 'Concept. Vintage-wash black.', front: '/preview/rxn/04-blessed-by-rng_front.webp', back: '/preview/rxn/04-blessed-by-rng_back.webp' },
  { name: 'Night Market Mimic', note: 'Concept. Vintage-wash black.', front: '/preview/rxn/05-night-market-mimic_front.webp', back: '/preview/rxn/05-night-market-mimic_back.webp' },
];

function Card({ p, primary }: { p: Piece; primary?: boolean }) {
  return (
    <div style={{ border: HAIR, background: '#0F0C08' }} className="flex flex-col">
      <div className="grid grid-cols-2" style={{ background: '#fff' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.back} alt={`${p.name} back mockup`} loading="lazy" style={{ width: '100%', height: 'auto', display: 'block' }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.front} alt={`${p.name} front mockup`} loading="lazy" style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>
      <div className="flex flex-col gap-2" style={{ padding: 20 }}>
        {primary && <span className="v2-eyebrow">Primary</span>}
        <h3 className="m-0 uppercase text-parchment" style={{ fontSize: 20, fontWeight: 800 }}>{p.name}</h3>
        <p className="m-0 text-sand font-plex" style={{ fontSize: 13, lineHeight: 1.6 }}>{p.note}</p>
        <p className="m-0 text-brass font-plex" style={{ fontSize: 14, fontWeight: 600 }}>{PRICE}</p>
      </div>
    </div>
  );
}

function Section({ eyebrow, title, items, primary, cols }: { eyebrow: string; title: string; items: Piece[]; primary?: boolean; cols: string }) {
  return (
    <section style={{ padding: '56px 24px', borderBottom: HAIR }}>
      <span className="v2-eyebrow">{eyebrow}</span>
      <h2 className="uppercase text-parchment" style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 900, margin: '8px 0 28px' }}>{title}</h2>
      <div className={`grid gap-5 grid-cols-1 ${cols}`}>
        {items.map((p) => <Card key={p.name} p={p} primary={primary} />)}
      </div>
    </section>
  );
}

export default function NewDesignsPreviewPage() {
  return (
    <main>
      <div className="font-plex text-center" style={{ background: '#C6A15B', color: '#130F09', padding: '10px 16px', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Preview, not for sale. Mockups only; prices and availability TBD.
      </div>
      <section style={{ padding: '64px 24px 24px', borderBottom: HAIR }}>
        <span className="v2-eyebrow">Internal preview</span>
        <h1 className="m-0 uppercase text-parchment" style={{ fontSize: 'clamp(38px,5.4vw,58px)', fontWeight: 900, lineHeight: 1.02 }}>
          New <span className="text-brass">designs</span>
        </h1>
        <p className="text-sand font-plex" style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 620 }}>
          Composites on garment templates, not Printful renders. Nothing here is in the shop.
        </p>
      </section>
      <Section eyebrow="Drop 01" title="First drop" items={FIRST_DROP} primary cols="md:grid-cols-2" />
      <Section eyebrow="Lootix Streetwear" title="v6 line" items={V6_LINE} cols="md:grid-cols-2" />
      <Section eyebrow="Concepts" title="Represent x Nikifilini concepts" items={RXN} cols="md:grid-cols-2 lg:grid-cols-3" />
    </main>
  );
}
