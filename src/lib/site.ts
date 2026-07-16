// ─────────────────────────────────────────────────────────────
// LOOTIX v2 — "Earn it. Wear it. Loot it."
// Content config mirroring the GetLootix Website Evaluation designs.
// ─────────────────────────────────────────────────────────────

export const TICKER = [
  '◆ Every order earns entries',
  'Drop 001 · Live now',
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
  { value: '100+', label: 'Entries per item, printed on every card' },
  { value: 'FREE', label: 'Entry method · equal odds' },
  { value: 'LIVE', label: 'Independent recorded draw' },
];

export type Product = {
  name: string;
  sub: string;
  price: string;
  entries: number;
  edition: string;
  img: string;
};

/** Drop 001 — real brand photography. */
export const PRODUCTS: Product[] = [
  { name: 'Guild Hoodie — Black', sub: 'Heavyweight · Back print', price: '$78', entries: 150, edition: 'ED. 500', img: '/brand/v2/model-back.png' },
  { name: 'Summon Hoodie', sub: 'Heavyweight · Chest logo', price: '$74', entries: 150, edition: 'ED. 500', img: '/brand/v2/model-front.png' },
  { name: 'Lootix X1 — Shadow', sub: 'Limited sneaker · Numbered', price: '$140', entries: 300, edition: 'ED. 250', img: '/brand/v2/box-sneakers.png' },
  { name: 'Welcome Looter Kit', sub: 'Tee + patch + guild card', price: '$48', entries: 100, edition: 'ED. 500', img: '/brand/v2/unboxing.png' },
];

export const QUICKIES = [
  { name: 'Guild Sticker Pack', price: '$8', entries: 15 },
  { name: 'Crest Patch', price: '$12', entries: 25 },
  { name: 'Looter Beanie', price: '$28', entries: 50 },
  { name: 'Snap Cap', price: '$32', entries: 60 },
];

export const PACKS = [
  { name: 'Starter Pack', sub: '1 tee · ships free over $75', price: '$35', entries: 60, popular: false },
  { name: 'Hero Bundle', sub: 'Hoodie + tee · free shipping', price: '$75', entries: 150, popular: true },
  { name: 'Legend Vault', sub: 'Full fit + accessories · best odds', price: '$150', entries: 350, popular: false },
];

export const HOW_STEPS = [
  { n: '01', title: 'Shop the drop', body: 'Cop limited fantasy-streetwear from the current drop. Every piece is numbered — never mass produced.' },
  { n: '02', title: 'Stack entries', body: 'Every item carries a flat entry count, printed on the card. Your total shows at checkout and in your confirmation email.' },
  { n: '03', title: 'Win the loot', body: 'An independent third party draws the winner live on stream. Paid fast, announced publicly, verified always.' },
];

export const PROOF = [
  { icon: '⚖', title: 'Independent draw', body: 'A third-party administrator runs the random draw — never us.' },
  { icon: '◉', title: 'Recorded live', body: 'Every draw streams live and stays archived on our channels.' },
  { icon: '◆', title: 'Winners published', body: 'Every winner is named on the Winners page and socials, with payout proof.' },
  { icon: '✉', title: 'Free entry, equal odds', body: 'The mail-in method in the Official Rules carries the same odds as any order.' },
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
      { label: 'Drop 001', href: '/shop' },
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
