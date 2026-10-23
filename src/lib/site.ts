// ─────────────────────────────────────────────────────────────
// LOOTIX v2 — "Earn it. Wear it. Loot it."
// Content config mirroring the GetLootix Website Evaluation designs.
// ─────────────────────────────────────────────────────────────

import { MAIL_IN_ADDRESS } from '@/config/legal';

export const TICKER = [
  '◆ 1 entry per $1 spent',
  'Drop 1',
  '◆ Win $250 + custom Lootix hoodie & tee',
  'No purchase necessary · free entry by mail',
  '◆ Winner drawn at random on RANDOM.ORG',
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
 * The live giveaway. THE single source for both giveaway dates.
 *
 * Dates are stored as Eastern-time ISO strings WITH the offset, so the close
 * is pinned to 8 PM ET no matter where the server or the visitor is:
 *   EDT → '-04:00'   ·   EST (after Nov 1) → '-05:00'
 *
 * Both are `null` until the owner sets the real dates. While either is null
 * the site shows no countdown and no "ends/closed" state, says "Join the
 * list" instead of "enter to win", and creates no entry rows.
 */
export const GIVEAWAY: {
  id: string;
  startISO: string | null;
  drawDateISO: string | null;
} = {
  id: 'launch-vault',
  /** Entry window opens (12:00 AM ET on the start date). */
  startISO: null,
  /** Entry window closes — the 8:00 PM ET draw close. */
  drawDateISO: null,
};

/** True only when both dates are set and `now` is inside [start, close). */
export function isEntryWindowOpen(now: Date | number = Date.now()): boolean {
  if (!GIVEAWAY.startISO || !GIVEAWAY.drawDateISO) return false;
  const t = typeof now === 'number' ? now : now.getTime();
  const start = Date.parse(GIVEAWAY.startISO);
  const close = Date.parse(GIVEAWAY.drawDateISO);
  if (Number.isNaN(start) || Number.isNaN(close)) return false;
  return t >= start && t < close;
}

/** True once the dates exist at all — gates every countdown / "ends" state. */
export const GIVEAWAY_DATES_SET = Boolean(GIVEAWAY.startISO && GIVEAWAY.drawDateISO);

export const STATS = [
  { value: '$250', label: 'Cash in the launch grand prize' },
  { value: '1 : $1', label: 'One entry per dollar spent' },
  { value: 'FREE', label: 'Entry by mail · same odds per entry' },
  { value: 'RANDOM.ORG', label: 'Random draw, screen-recorded' },
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

/**
 * Drop 1 — real brand photography.
 *
 * No per-product entry counts: entries are earned per dollar of the order
 * subtotal (see ENTRIES_PER_DOLLAR in src/config/giveaway.ts) and are
 * computed server-side from the Stripe session, never from this file.
 */
export const PRODUCTS: Product[] = [
  { slug: 'guild-hoodie-black', name: 'Guild Hoodie — Black', sub: 'Heavyweight · Back print', price: '$78', priceValue: 78, edition: 'ED. 500', img: '/brand/v2/model-back.png' },
  { slug: 'summon-hoodie', name: 'Summon Hoodie', sub: 'Heavyweight · Chest logo', price: '$74', priceValue: 74, edition: 'ED. 500', img: '/brand/v2/model-front.png' },
  { slug: 'lootix-x1-shadow', name: 'Lootix X1 — Shadow', sub: 'Limited sneaker · Numbered', price: '$140', priceValue: 140, edition: 'ED. 250', img: '/brand/v2/box-sneakers.png' },
  { slug: 'welcome-looter-kit', name: 'Welcome Looter Kit', sub: 'Tee + patch + guild card', price: '$48', priceValue: 48, edition: 'ED. 500', img: '/brand/v2/unboxing.png' },
];

/** Shop grid — Drop 1. */
export type ShopProduct = Product & { category: string };

export const SHOP_CATEGORIES = ['All', 'Hoodies', 'Tees', 'Footwear', 'Accessories'] as const;

export const SHOP_PRODUCTS: ShopProduct[] = [
  { slug: 'guild-hoodie-black', name: 'Guild Hoodie — Black', sub: 'Heavyweight · Back print', price: '$78', priceValue: 78, edition: 'ED. 500', img: '/brand/v2/model-back.png', category: 'Hoodies' },
  { slug: 'summon-hoodie', name: 'Summon Hoodie', sub: 'Heavyweight · Chest logo', price: '$74', priceValue: 74, edition: 'ED. 500', img: '/brand/v2/model-front.png', category: 'Hoodies' },
  { slug: 'lootix-x1-shadow', name: 'Lootix X1 — Shadow', sub: 'Limited sneaker · Numbered', price: '$140', priceValue: 140, edition: 'ED. 250', img: '/brand/v2/box-sneakers.png', category: 'Footwear' },
  { slug: 'welcome-looter-kit', name: 'Welcome Looter Kit', sub: 'Tee + patch + guild card', price: '$48', priceValue: 48, edition: 'ED. 500', img: '/brand/v2/unboxing.png', category: 'Tees' },
  { slug: 'lord-of-flame-tee', name: 'Lord of Flame Tee', sub: 'Heavyweight tee · Back print', price: '$42', priceValue: 42, edition: 'ED. 500', img: '/brand/v2/wrap.png', category: 'Tees' },
  { slug: 'nat-20-tee', name: 'Nat 20 Tee', sub: 'Regular fit · Front print', price: '$38', priceValue: 38, edition: 'ED. 500', img: '/brand/v2/tags.png', category: 'Tees' },
  { slug: 'hoard-dragon-tee', name: 'Hoard Dragon Tee', sub: 'Heavyweight · Camo', price: '$44', priceValue: 44, edition: 'ED. 500', img: '/brand/v2/wrap.png', category: 'Tees' },
  { slug: 'guild-sticker-pack', name: 'Guild Sticker Pack', sub: '6 die-cut stickers', price: '$8', priceValue: 8, edition: 'OPEN', img: '/brand/v2/tags.png', category: 'Accessories' },
];

export const QUICKIES = [
  { name: 'Guild Sticker Pack', price: '$8' },
  { name: 'Crest Patch', price: '$12' },
  { name: 'Looter Beanie', price: '$28' },
  { name: 'Snap Cap', price: '$32' },
];

export const PACKS = [
  { name: 'Starter Pack', sub: '1 tee', price: '$35', popular: false, cta: 'Grab Starter' },
  { name: 'Hero Bundle', sub: 'Hoodie + tee', price: '$75', popular: true, cta: 'Grab Hero' },
  { name: 'Legend Vault', sub: 'Full fit + accessories · ships free over $100', price: '$150', popular: false, cta: 'Grab Legend' },
];

/** Future vaults — unlock only after the current one pays out. No fake countdowns. */
export const UPCOMING = [
  { tag: 'Vault 002', name: '$1,000 Cash Drop', status: 'Unlocks next', desc: 'Opens after the Launch Vault winner is drawn and paid. Every Drop 002 order will enter.' },
  { tag: 'Vault 003', name: 'Battlestation PC', status: 'Locked', desc: 'A full custom build. Unlocks once the guild passes 1,000 members.' },
  { tag: 'Vault 004', name: 'Tokyo Trip for 2', status: 'Locked', desc: 'Flights + hotel. The endgame vault — unlocks at 100 verified winners paid.' },
];

export const HOW_STEPS = [
  { n: '01', title: 'Shop the drop', body: 'Cop limited fantasy-streetwear from the current drop. Every piece is numbered — never mass produced.' },
  { n: '02', title: 'Earn 1 entry per $1', body: 'Every dollar of your order subtotal is one entry. $129.99 earns 129 entries. No purchase necessary — free entry is available by mail.' },
  { n: '03', title: 'Win the loot', body: 'The winner is selected at random using RANDOM.ORG. The draw is screen-recorded and posted, and the winner is named publicly.' },
];

// NOTE: the "25 entries per card" below mirrors MAIL_IN_ENTRIES in
// src/config/giveaway.ts. It is spelled out here because config/giveaway.ts
// imports THIS file (for GIVEAWAY), so importing back would be circular —
// if MAIL_IN_ENTRIES changes, change this string too.
export const PROOF = [
  { icon: '⚖', title: 'RANDOM.ORG draw', body: 'The winner is selected at random using RANDOM.ORG, weighted by entry count.' },
  { icon: '◉', title: 'Screen-recorded', body: 'Every draw is screen-recorded and the recording is posted, with the RANDOM.ORG result link.' },
  { icon: '◆', title: 'Winners published', body: 'Every winner is named on the Winners page and socials, with payout proof.' },
  { icon: '✉', title: 'Free entry by mail', body: 'The free mail-in method in the Official Rules is worth 25 entries per card, with the same odds per entry as a purchase entry — no purchase ever required.' },
];

export const COMPANY = {
  legalName: 'Lootix LLC',
  location: 'Maryland, USA',
  address: MAIL_IN_ADDRESS,
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
