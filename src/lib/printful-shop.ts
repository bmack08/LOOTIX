// Server-side only. Reads the Lootix Printful store for the /shop page and the
// home-page featured row. PRINTFUL_API and PRINTFUL_STORE_ID are plain
// (non-NEXT_PUBLIC) env vars, so Next never ships them to the browser — import
// this module only from server components / route handlers, never from a
// 'use client' file. Nothing here logs the key or raw API responses.

const API = 'https://api.printful.com';

/**
 * The store also holds a few older test products ("Dad hat", "placeholder shirt 1", …).
 * Only the Lootix Mark / Wordmark drop products are shown on the site.
 */
const DROP_PRODUCT = /^Lootix (Mark|Wordmark) /;

const INK_ORDER = ['Black', 'White', 'Bone', 'Blood Red', 'Loot Gold'];

export type ShopCategory = 'Hoodies' | 'Tees';

export type ShopItem = {
  id: number;
  name: string;
  /** e.g. "Men's · 7 colors" */
  sub: string;
  /** Formatted retail price ("$85"), or null when no retail price is set in Printful. */
  price: string | null;
  img: string | null;
  category: ShopCategory;
  womens: boolean;
};

type PfListItem = { id: number; name: string; is_ignored?: boolean };
type PfFile = { type: string; preview_url?: string | null; thumbnail_url?: string | null };
type PfVariant = { retail_price: string | null; color?: string | null; files?: PfFile[] };

function headers(): Record<string, string> | null {
  const key = process.env.PRINTFUL_API;
  const store = process.env.PRINTFUL_STORE_ID;
  if (!key || !store) return null;
  return { Authorization: `Bearer ${key}`, 'X-PF-Store-Id': store };
}

async function pf<T>(path: string, h: Record<string, string>): Promise<T | null> {
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetch(`${API}${path}`, { headers: h, next: { revalidate: 900 } });
    if (res.status === 429 && attempt === 0) {
      const wait = Math.min(Number(res.headers.get('retry-after')) || 5, 20);
      await new Promise((r) => setTimeout(r, wait * 1000));
      continue;
    }
    if (!res.ok) return null;
    const json = (await res.json()) as { result: T };
    return json.result;
  }
  return null;
}

function formatPrice(variants: PfVariant[]): string | null {
  const prices = variants.map((v) => Number(v.retail_price)).filter((n) => Number.isFinite(n) && n > 0);
  if (!prices.length) return null;
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const fmt = (n: number) => `$${Number.isInteger(n) ? n : n.toFixed(2)}`;
  return min === max ? fmt(min) : `${fmt(min)}–${fmt(max)}`;
}

function inkRank(name: string): number {
  const ink = name.split(' - ')[1]?.replace(/ ink$/, '') ?? '';
  const i = INK_ORDER.indexOf(ink);
  return i === -1 ? INK_ORDER.length : i;
}

/** The Lootix drop products from the Printful store, or [] if the store is not configured/reachable. */
export async function getShopItems(): Promise<ShopItem[]> {
  const h = headers();
  if (!h) return [];

  const list = await pf<PfListItem[]>('/store/products?limit=100', h);
  if (!list) return [];
  const drop = list.filter((p) => DROP_PRODUCT.test(p.name) && !p.is_ignored);

  const items: ShopItem[] = [];
  // Small batches keep us well under Printful's request rate limit.
  for (let i = 0; i < drop.length; i += 6) {
    const batch = await Promise.all(
      drop.slice(i, i + 6).map(async (p) => {
        const d = await pf<{ sync_variants: PfVariant[] }>(`/store/products/${p.id}`, h);
        if (!d) return null;
        const variants = d.sync_variants ?? [];
        const preview = variants
          .flatMap((v) => v.files ?? [])
          .find((f) => f.type === 'preview' && (f.preview_url || f.thumbnail_url));
        const colors = new Set(variants.map((v) => v.color).filter(Boolean)).size;
        const womens = /Women's/.test(p.name);
        const item: ShopItem = {
          id: p.id,
          name: p.name.replace(' - ', ' — ').replace(/ ink$/, ' ink'),
          sub: `${womens ? "Women's" : "Men's"}${colors ? ` · ${colors} color${colors === 1 ? '' : 's'}` : ''}`,
          price: formatPrice(variants),
          img: preview?.preview_url ?? preview?.thumbnail_url ?? null,
          category: /Hoodie/.test(p.name) ? 'Hoodies' : 'Tees',
          womens,
        };
        return item;
      }),
    );
    for (const b of batch) if (b) items.push(b);
  }

  const mark = (n: string) => (/^Lootix Mark /.test(n) ? 0 : 1);
  return items.sort(
    (a, b) =>
      Number(a.womens) - Number(b.womens) ||
      (a.category === b.category ? 0 : a.category === 'Hoodies' ? -1 : 1) ||
      mark(a.name) - mark(b.name) ||
      inkRank(a.name.replace(' — ', ' - ')) - inkRank(b.name.replace(' — ', ' - ')),
  );
}
