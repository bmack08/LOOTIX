// ─────────────────────────────────────────────────────────────
// LOOTIX v2 — site content config ("Forged" design system)
// Single source of truth for nav, giveaway data, products, copy.
// ─────────────────────────────────────────────────────────────

export const ANNOUNCE = 'Launch Vault: $250 + full merch bundle';

export const NAV = [
  { label: 'Shop', href: '/shop' },
  { label: 'Giveaway', href: '/giveaway' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Winners', href: '/winners' },
  { label: 'FAQ', href: '/faq' },
];

/** Live giveaway — drives countdown + progress everywhere. */
export const GIVEAWAY = {
  prize: '$250 + full merch bundle',
  prizeShort: '$250 Cash',
  /** Draw close: Aug 15, 2026 8:00 PM ET (ET = UTC-4 in August/EDT). */
  closesAtISO: '2026-08-16T00:00:00.000Z',
  closesLabel: 'Aug 15, 2026 · 8:00 PM ET',
  entriesClaimed: 312,
  entriesGoal: 1000,
};

export const STATS = [
  { value: '$250', label: 'Launch grand prize' },
  { value: '60×', label: 'Entries per tee' },
  { value: 'Free', label: 'Entry always available' },
  { value: 'Live', label: 'Independent draw' },
];

/** Products — name, price, fixed entry count, category, tag. */
export type Product = {
  slug: string;
  name: string;
  price: number;
  entries: number;
  category: 'Tees' | 'Hoodies' | 'Quick loot' | 'Bundles';
  tag?: string;
  edition?: string;
  img?: string;
};

export const PRODUCTS: Product[] = [
  { slug: 'lord-of-flame-tee', name: 'Lord of Flame Tee', price: 42, entries: 60, category: 'Tees', tag: 'Best seller', edition: 'Limited run of 200', img: '/brand/products/lord-of-flame.png' },
  { slug: 'nat-20-tee', name: 'Nat 20 Tee', price: 38, entries: 60, category: 'Tees', img: '/brand/products/tees-2up.png' },
  { slug: 'hoard-dragon-tee', name: 'Hoard Dragon Tee', price: 44, entries: 60, category: 'Tees', img: '/brand/products/tees-2up.png' },
  { slug: 'emberwitch-hoodie', name: 'Emberwitch Hoodie', price: 75, entries: 150, category: 'Hoodies', tag: 'Most entries', img: '/brand/ref-fantasy-3.jpg' },
  { slug: 'guild-hoodie', name: 'Guild Heavyweight Hoodie', price: 78, entries: 150, category: 'Hoodies', img: '/brand/ref-fantasy-1.jpg' },
  { slug: 'legend-vault-bundle', name: 'Legend Vault Bundle', price: 150, entries: 350, category: 'Bundles', tag: 'Best odds', img: '/brand/ref-fantasy-2.jpg' },
  { slug: 'sticker-pack', name: 'Sigil Sticker Pack', price: 8, entries: 10, category: 'Quick loot', img: '/brand/site/wrap.png' },
  { slug: 'hang-tag-set', name: 'Hang Tag Keyring', price: 14, entries: 20, category: 'Quick loot', img: '/brand/site/tags.png' },
];

export const CATEGORIES = ['All', 'Tees', 'Hoodies', 'Bundles', 'Quick loot'] as const;

/** Entry packs shown on Home + Giveaway. */
export const ENTRY_PACKS = [
  { name: 'Starter Tee', desc: '1 tee · ships free over $75', price: 42, entries: 60, popular: false },
  { name: 'Hero Bundle', desc: 'Hoodie + tee · free shipping', price: 75, entries: 150, popular: true },
  { name: 'Legend Vault', desc: 'Full fit + accessories', price: 150, entries: 350, popular: false },
];

export const HOW_STEPS = [
  { n: '01', title: 'Shop the drop', body: 'Pick your gear from limited fantasy-streetwear runs. Every item shows exactly how many entries it earns.' },
  { n: '02', title: 'Earn entries', body: 'Entries are attached to the product, not the dollar. A tee earns 60, a hoodie 150, the Legend Vault 350, quick loot 10–45.' },
  { n: '03', title: 'Win the vault', body: 'The draw is recorded live and independently administered. Winner announced publicly and paid fast.' },
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
      { label: 'New drops', href: '/shop' },
      { label: 'Shop all', href: '/shop' },
      { label: 'Quick loot', href: '/shop' },
      { label: 'Featured tee', href: '/product/lord-of-flame-tee' },
    ],
  },
  {
    title: 'Giveaway',
    links: [
      { label: 'Current giveaway', href: '/giveaway' },
      { label: 'How it works', href: '/how-it-works' },
      { label: 'Winners', href: '/winners' },
      { label: 'Official rules', href: '/official-rules' },
      { label: 'Free entry method', href: '/official-rules' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Shipping & returns', href: '/shipping' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];
