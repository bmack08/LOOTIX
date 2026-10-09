// ─────────────────────────────────────────────────────────────
// LOOTIX v2 — "Earn it. Wear it. Loot it."
// Content config mirroring the GetLootix Website Evaluation designs.
// ─────────────────────────────────────────────────────────────

export const TICKER = [
  '◆ Every order earns 1 entry',
  'Drop 1 · Live now',
  '◆ Win $250 + free merch bundle',
  'No purchase necessary',
  '◆ Winner drawn live & independent',
  'Ships worldwide',
];

export const NAV = [
  { label: 'Shop', href: '/shop' },
  { label: 'Giveaways', href: '/giveaways', live: true },
  { label: 'Winners', href: '/winners' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
];

/** Live giveaway — drives countdown + progress everywhere. */
export const GIVEAWAY = {
  /** Draw close datetime (local ET). */
  drawDateISO: '2026-08-01T20:00:00',
  entriesClaimed: 312,
  entriesGoal: 1000,
};

export const STATS = [
  { value: '$250', label: 'Launch grand prize' },
  { value: '1', label: 'Entry per order · no purchase necessary' },
  { value: 'FREE', label: 'Mail-in entry method · equal odds' },
  { value: 'LIVE', label: 'Independent recorded draw' },
];

export type Product = {
  /** stable id used by cart + Stripe checkout */
  slug: string;
  name: string;
  sub: string;
  /** display string, e.g. "$78" */
  price: string;
  /** numeric dollars — the ONLY price Stripe charges from (server-side) */
  priceValue: number;
  edition: string;
  img: string;
};
// NOTE: products deliberately carry NO per-item entry count. One completed
// order earns exactly ENTRIES_PER_ORDER (see src/lib/sweepstakes.ts), no
// matter what or how much is in the cart.

/** Drop 1 — real brand photography. */
export const PRODUCTS: Product[] = [
  { slug: 'guild-hoodie-black', name: 'Guild Hoodie — Black', sub: 'Heavyweight · Back print', price: '$78', priceValue: 78, edition: 'ED. 500', img: '/brand/v2/model-back.png' },
  { slug: 'summon-hoodie', name: 'Summon Hoodie', sub: 'Heavyweight · Chest logo', price: '$74', priceValue: 74, edition: 'ED. 500', img: '/brand/v2/model-front.png' },
  { slug: 'lootix-x1-shadow', name: 'Lootix X1 — Shadow', sub: 'Limited sneaker · Numbered', price: '$140', priceValue: 140, edition: 'ED. 250', img: '/brand/v2/box-sneakers.png' },
  { slug: 'welcome-looter-kit', name: 'Welcome Looter Kit', sub: 'Tee + patch + guild card', price: '$48', priceValue: 48, edition: 'ED. 500', img: '/brand/v2/unboxing.png' },
];

/** Shop grid — Drop 1. `soldPct` renders the claimed bar when present. */
export type ShopProduct = Product & { category: string; soldPct?: string };

export const SHOP_CATEGORIES = ['All', 'Hoodies', 'Tees', 'Footwear', 'Quick Entries'] as const;

export const SHOP_PRODUCTS: ShopProduct[] = [
  { slug: 'guild-hoodie-black', name: 'Guild Hoodie — Black', sub: 'Heavyweight · Back print', price: '$78', priceValue: 78, edition: 'ED. 500', img: '/brand/v2/model-back.png', category: 'Hoodies', soldPct: '62%' },
  { slug: 'summon-hoodie', name: 'Summon Hoodie', sub: 'Heavyweight · Chest logo', price: '$74', priceValue: 74, edition: 'ED. 500', img: '/brand/v2/model-front.png', category: 'Hoodies', soldPct: '48%' },
  { slug: 'lootix-x1-shadow', name: 'Lootix X1 — Shadow', sub: 'Limited sneaker · Numbered', price: '$140', priceValue: 140, edition: 'ED. 250', img: '/brand/v2/box-sneakers.png', category: 'Footwear', soldPct: '81%' },
  { slug: 'welcome-looter-kit', name: 'Welcome Looter Kit', sub: 'Tee + patch + guild card', price: '$48', priceValue: 48, edition: 'ED. 500', img: '/brand/v2/unboxing.png', category: 'Tees' },
  { slug: 'lord-of-flame-tee', name: 'Lord of Flame Tee', sub: 'Heavyweight tee · Back print', price: '$42', priceValue: 42, edition: 'ED. 500', img: '/brand/v2/wrap.png', category: 'Tees' },
  { slug: 'nat-20-tee', name: 'Nat 20 Tee', sub: 'Regular fit · Front print', price: '$38', priceValue: 38, edition: 'ED. 500', img: '/brand/v2/tags.png', category: 'Tees' },
  { slug: 'hoard-dragon-tee', name: 'Hoard Dragon Tee', sub: 'Heavyweight · Camo', price: '$44', priceValue: 44, edition: 'ED. 500', img: '/brand/v2/wrap.png', category: 'Tees' },
  { slug: 'guild-sticker-pack', name: 'Guild Sticker Pack', sub: 'Quick entries · 6 stickers', price: '$8', priceValue: 8, edition: 'OPEN', img: '/brand/v2/tags.png', category: 'Quick Entries' },
];

export const QUICKIES = [
  { name: 'Guild Sticker Pack', price: '$8' },
  { name: 'Crest Patch', price: '$12' },
  { name: 'Looter Beanie', price: '$28' },
  { name: 'Snap Cap', price: '$32' },
];

// Bundles are merch value plays only — they do NOT buy extra entries.
export const PACKS = [
  { name: 'Starter Pack', sub: '1 tee · ships free over $75', price: '$35', popular: false, cta: 'Grab Starter' },
  { name: 'Hero Bundle', sub: 'Hoodie + tee · free shipping', price: '$75', popular: true, cta: 'Grab Hero' },
  { name: 'Legend Vault', sub: 'Full fit + accessories · best value', price: '$150', popular: false, cta: 'Grab Legend' },
];

/** Future vaults — unlock only after the current one pays out. No fake countdowns. */
export const UPCOMING = [
  { tag: 'Vault 002', name: '$1,000 Cash Drop', status: 'Unlocks next', desc: 'Opens after the Launch Vault winner is drawn and paid. Every Drop 002 order will enter.' },
  { tag: 'Vault 003', name: 'Battlestation PC', status: 'Locked', desc: 'A full custom build. Unlocks once the guild passes 1,000 members.' },
  { tag: 'Vault 004', name: 'Tokyo Trip for 2', status: 'Locked', desc: 'Flights + hotel. The endgame vault — unlocks at 100 verified winners paid.' },
];

export const HOW_STEPS = [
  { n: '01', title: 'Shop the drop', body: 'Cop limited fantasy-streetwear from the current drop. Every piece is numbered — never mass produced.' },
  { n: '02', title: 'Get your entry', body: 'Every completed order earns one entry into the live giveaway — one per order, however much you buy. Prefer not to buy? Mail in a card for a free entry with the same odds.' },
  { n: '03', title: 'Win the loot', body: 'An independent third party draws the winner live on stream. Paid fast, announced publicly, verified always.' },
];

export const PROOF = [
  { icon: '⚖', title: 'Independent draw', body: 'A third-party administrator runs the random draw — never us.' },
  { icon: '◉', title: 'Recorded live', body: 'Every draw streams live and stays archived on our channels.' },
  { icon: '◆', title: 'Winners published', body: 'Every winner is named on the Winners page and socials, with payout proof.' },
  { icon: '✉', title: 'Free entry, equal odds', body: 'One mail-in card in the Official Rules carries exactly the same odds as one order.' },
];

export const COMPANY = {
  legalName: 'Lootix LLC',
  location: 'Maryland, USA',
  email: 'hello@getlootix.com',
  socials: {
    instagram: 'https://instagram.com/getlootix',
    tiktok: 'https://tiktok.com/@getlootix',
    discord: 'https://discord.gg/lootix',
  },
};

export const FOOTER_COLS = [
  {
    title: 'Shop',
    links: [
      { label: 'Drop 1', href: '/shop' },
      { label: 'Shop All', href: '/shop' },
      { label: 'Quick Entries', href: '/shop' },
      { label: 'Accessories', href: '/shop' },
    ],
  },
  {
    title: 'Giveaways',
    links: [
      { label: 'Current Giveaway', href: '/giveaways' },
      { label: 'How It Works', href: '/about' },
      { label: 'Winners', href: '/winners' },
      { label: 'Official Rules', href: '/official-rules' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Shipping & Returns', href: '/faq' },
      { label: 'Contact', href: '/faq' },
      { label: 'Privacy & Terms', href: '/official-rules' },
    ],
  },
];
