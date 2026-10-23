// ─────────────────────────────────────────────────────────────
// LOOTIX v2 — "Earn it. Wear it. Loot it."
// Content config mirroring the GetLootix Website Evaluation designs.
// ─────────────────────────────────────────────────────────────

import { COMPANY_ADDRESS } from '@/config/legal';

export const TICKER = [
  // Order matters: the prize line is followed by the free-entry line, and the
  // purchase cue ("1 entry per $1") is kept off the prize line (Legal swap list,
  // caution 2). The ticker loops, so it also never sits right before the prize.
  '\u25c6 Win $250 + custom Lootix hoodie & tee',
  // Legal's short line (ODDS_SHORT in config/giveaway.ts; spelled out because that
  // file imports this one).
  'No purchase necessary to enter or win. Every entry has an equal chance; purchases earn more entries; free entries are available.',
  'Drop 1',
  '◆ 1 entry per $1 spent',
  'Ships to the US only',
  '◆ Winner drawn at random on RANDOM.ORG',
];

/** PRE-START ticker (dates not both set): no prize, no entry cue, no "win". Legal ruling 5. */
export const TICKER_PRE_START = [
  '\u25c6 Lootix Launch Giveaway \u2014 dates coming soon',
  'Drop 1',
  '\u25c6 Join the list',
  'Ships to the US only',
];

/** `live` marks the tab that gets the LIVE badge — only while entries are open. */
export const NAV: { label: string; href: string; live?: boolean }[] = [
  { label: 'Shop', href: '/shop' },
  { label: 'Giveaways', href: '/giveaways', live: true },
  { label: 'Winners', href: '/winners' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
];

/**
 * The live giveaway. THE single source for every giveaway date.
 *
 * Dates are stored as Eastern-time ISO strings WITH the offset, so the close
 * is pinned to the Eastern time of day no matter where the server or the
 * visitor is:
 *   EDT → '-04:00'   ·   EST (after Nov 1) → '-05:00'
 *
 * The close time the public copy PRINTS is GIVEAWAY_CLOSE_TIME_LABEL in
 * src/config/giveaway.ts. Do not import it here — config/giveaway.ts imports
 * this file, so the dependency only goes one way.
 *
 * The entry window is `startISO` → `endDateISO`. The draw is a separate date
 * and never moves the window: `drawDateISO` is display text only.
 *
 * All are `null` until the owner sets the real dates. While the start or the
 * end is null the site shows no countdown and no "ends/closed" state, says
 * "Join the list" instead of "enter to win", and creates no entry rows.
 */
export const GIVEAWAY: {
  id: string;
  startISO: string | null;
  endDateISO: string | null;
  drawDateISO: string | null;
} = {
  id: 'launch-vault',
  /** Entry window opens (12:00 AM ET on the start date). */
  startISO: null,
  /**
   * Entry window closes — the close instant behind
   * GIVEAWAY_CLOSE_TIME_LABEL (src/config/giveaway.ts), and the end date
   * stated in the Official Rules. `null` until the owner sets it. This is the
   * ONLY field the entry window reads; it never falls back to the draw date.
   */
  endDateISO: null,
  /**
   * The draw date. Used only for draw-date text ("drawn on ..."), never for
   * the entry window — the draw happens on or after the close, not with it.
   */
  drawDateISO: null,
};

/** True only when start + end are set and `now` is inside [start, end). */
export function isEntryWindowOpen(now: Date | number = Date.now()): boolean {
  if (!GIVEAWAY.startISO || !GIVEAWAY.endDateISO) return false;
  const t = typeof now === 'number' ? now : now.getTime();
  const start = Date.parse(GIVEAWAY.startISO);
  const close = Date.parse(GIVEAWAY.endDateISO);
  if (Number.isNaN(start) || Number.isNaN(close)) return false;
  return t >= start && t < close;
}

/** True once the entry-window dates exist — gates every countdown / "ends" state. */
export const GIVEAWAY_DATES_SET = Boolean(GIVEAWAY.startISO && GIVEAWAY.endDateISO);

/** LIVE stats (entries open). Legal ruling 5: per-dollar card says "One entry per $1 spent" and the page adds the short line as a caption. */
export const STATS = [
  { value: '$250', label: 'Cash in the launch grand prize' },
  { value: '1 : $1', label: 'One entry per $1 spent' },
  { value: 'FREE', label: 'Entry by mail · free entries available' },
  { value: 'RANDOM.ORG', label: 'Random draw, screen-recorded' },
];

/** PRE-START stats: no prize amount, no per-dollar cue. The "Dates TBA" card is Legal's wording; the others are neutral. */
export const STATS_PRE_START = [
  { value: 'Drop 1', label: 'Limited, numbered gear' },
  { value: 'Dates TBA', label: 'Join the list to hear first' },
  { value: 'US only', label: 'Ships to the US only' },
  { value: 'RANDOM.ORG', label: 'Random draw, screen-recorded' },
];

export type Product = {
  /** stable id used by cart + Stripe checkout */
  slug: string;
  name: string;
  sub: string;
  /** display string, e.g. "$85" */
  price: string;
  /** numeric dollars — the ONLY price Stripe charges from (server-side) */
  priceValue: number;
  edition: string;
  img: string;
};

/**
 * Drop 1 — real brand photography.
 *
 * No per-product entry counts: entries are earned per dollar of the order
 * subtotal (see ENTRIES_PER_DOLLAR in src/config/giveaway.ts) and are
 * computed server-side from the Stripe session, never from this file.
 */
export const PRODUCTS: Product[] = [
  { slug: 'guild-hoodie-black', name: 'Guild Hoodie — Black', sub: 'Heavyweight · Back print', price: '$85', priceValue: 85, edition: 'ED. 500', img: '/brand/v2/model-back.png' },
  { slug: 'summon-hoodie', name: 'Summon Hoodie', sub: 'Heavyweight · Chest logo', price: '$85', priceValue: 85, edition: 'ED. 500', img: '/brand/v2/model-front.png' },
  { slug: 'lootix-x1-shadow', name: 'Lootix X1 — Shadow', sub: 'Limited sneaker · Numbered', price: '$140', priceValue: 140, edition: 'ED. 250', img: '/brand/v2/box-sneakers.png' },
  { slug: 'welcome-looter-kit', name: 'Welcome Looter Kit', sub: 'Tee + patch + guild card', price: '$48', priceValue: 48, edition: 'ED. 500', img: '/brand/v2/unboxing.png' },
];

/** Shop grid — Drop 1. */
export type ShopProduct = Product & { category: string };

export const SHOP_CATEGORIES = ['All', 'Hoodies', 'Tees', 'Footwear', 'Accessories'] as const;

export const SHOP_PRODUCTS: ShopProduct[] = [
  { slug: 'guild-hoodie-black', name: 'Guild Hoodie — Black', sub: 'Heavyweight · Back print', price: '$85', priceValue: 85, edition: 'ED. 500', img: '/brand/v2/model-back.png', category: 'Hoodies' },
  { slug: 'summon-hoodie', name: 'Summon Hoodie', sub: 'Heavyweight · Chest logo', price: '$85', priceValue: 85, edition: 'ED. 500', img: '/brand/v2/model-front.png', category: 'Hoodies' },
  { slug: 'lootix-x1-shadow', name: 'Lootix X1 — Shadow', sub: 'Limited sneaker · Numbered', price: '$140', priceValue: 140, edition: 'ED. 250', img: '/brand/v2/box-sneakers.png', category: 'Footwear' },
  { slug: 'welcome-looter-kit', name: 'Welcome Looter Kit', sub: 'Tee + patch + guild card', price: '$48', priceValue: 48, edition: 'ED. 500', img: '/brand/v2/unboxing.png', category: 'Tees' },
  { slug: 'lord-of-flame-tee', name: 'Lord of Flame Tee', sub: 'Heavyweight tee · Back print', price: '$45', priceValue: 45, edition: 'ED. 500', img: '/brand/v2/wrap.png', category: 'Tees' },
  { slug: 'nat-20-tee', name: 'Nat 20 Tee', sub: 'Regular fit · Front print', price: '$45', priceValue: 45, edition: 'ED. 500', img: '/brand/v2/tags.png', category: 'Tees' },
  { slug: 'hoard-dragon-tee', name: 'Hoard Dragon Tee', sub: 'Heavyweight · Camo', price: '$45', priceValue: 45, edition: 'ED. 500', img: '/brand/v2/wrap.png', category: 'Tees' },
  { slug: 'guild-sticker-pack', name: 'Guild Sticker Pack', sub: '6 die-cut stickers', price: '$8', priceValue: 8, edition: 'OPEN', img: '/brand/v2/tags.png', category: 'Accessories' },
];

export const QUICKIES = [
  { name: 'Guild Sticker Pack', price: '$8' },
  { name: 'Crest Patch', price: '$12' },
  { name: 'Looter Beanie', price: '$28' },
  { name: 'Snap Cap', price: '$32' },
];

export const PACKS = [
  { name: 'Starter Pack', sub: '1 tee', price: '$45', popular: false, cta: 'Grab Starter' },
  { name: 'Hero Bundle', sub: 'Hoodie + tee', price: '$130', popular: true, cta: 'Grab Hero' },
  { name: 'Legend Vault', sub: 'Full fit + accessories · ships free over $100', price: '$150', popular: false, cta: 'Grab Legend' },
];

/** Coming-later teasers are hidden (hidden: true) until a giveaway has its own Official Rules. Countdowns use GIVEAWAY.endDateISO only. */
export const UPCOMING = [
  { tag: 'Vault 002', name: '$1,000 Cash Drop', status: 'Unlocks next', desc: 'Opens after the Lootix Launch Giveaway winner is drawn and paid. Every Drop 002 order will enter.', hidden: true },
  { tag: 'Vault 003', name: 'Battlestation PC', status: 'Locked', desc: 'A full custom build. Unlocks once the guild passes 1,000 members.', hidden: true },
  { tag: 'Vault 004', name: 'Tokyo Trip for 2', status: 'Locked', desc: 'Flights + hotel. The endgame vault — unlocks at 100 verified winners paid.', hidden: true },
].filter((u) => !u.hidden); // entries flagged hidden: true are not shown; delete the flag to show them again

export const HOW_STEPS = [
  { n: '01', title: 'Shop the drop', body: 'Cop limited fantasy-streetwear from the current drop. Every piece is numbered — never mass produced.' },
  { n: '02', title: 'Earn 1 entry per $1', body: 'Every dollar of your order subtotal is one entry. $129.99 earns 129 entries. No purchase necessary — free entry is available by mail.' },
  { n: '03', title: 'Win the loot', body: 'The winner is selected at random using RANDOM.ORG. The draw is screen-recorded and posted. The winner is listed by first name, last initial and state.' },
];

/** PRE-START steps: no "earn entries" / "win" language until entries open. */
export const HOW_STEPS_PRE_START = [
  HOW_STEPS[0],
  { n: '02', title: 'Join the list', body: 'Sign up to hear first when the dates for the Lootix Launch Giveaway are set.' },
  { n: '03', title: 'Watch the draw', body: 'When a giveaway runs, the winner is selected at random using RANDOM.ORG. The draw is screen-recorded and posted. The winner is listed by first name, last initial and state.' },
];

// NOTE: the "25 entries per card" below mirrors MAIL_IN_ENTRIES in
// src/config/giveaway.ts. It is spelled out here because config/giveaway.ts
// imports THIS file (for GIVEAWAY), so importing back would be circular —
// if MAIL_IN_ENTRIES changes, change this string too. The same goes for the
// odds sentences in the "Free entry by mail" card: they copy ODDS_LONG in
// config/giveaway.ts (Legal's long form), so keep the two identical.
export const PROOF = [
  { icon: '⚖', title: 'RANDOM.ORG draw', body: 'The winner is selected at random using RANDOM.ORG from all eligible entries.' },
  { icon: '◉', title: 'Screen-recorded', body: 'Every draw is screen-recorded and the recording is posted, with the RANDOM.ORG result link.' },
  { icon: '◆', title: 'Winners published', body: 'Winners are listed on the Winners page by first name, last initial and state.' },
  { icon: '✉', title: 'Free entry by mail', body: 'The free mail-in method in the Official Rules is worth 25 entries per card. No purchase necessary to enter or win. Every entry has an equal chance of being selected. Your chance of winning depends on the total number of entries received. Purchases earn more entries. Free entries are available (no purchase necessary).' },
];

/** PRE-START proof cards: the entries / odds card waits until entries open. */
export const PROOF_PRE_START = PROOF.filter((p) => p.title !== 'Free entry by mail');

export const COMPANY = {
  legalName: 'Lootix LLC',
  location: 'Maryland, USA',
  address: COMPANY_ADDRESS,
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
      { label: 'Accessories', href: '/shop' },
      { label: 'Cart', href: '/cart' },
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
      { label: 'Shipping', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];
