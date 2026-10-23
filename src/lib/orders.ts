// ─────────────────────────────────────────────────────────────
// Orders — one row per PAID Stripe checkout session.
//
// SERVER-SIDE ONLY. This module reads SUPABASE_SERVICE_ROLE_KEY, so it must
// never be imported from a client component or any browser bundle. The
// `server-only` package is not installed in this project (it is not in
// package.json and not in node_modules), so this comment is the guard —
// keep every import of this file inside a route handler, a server component
// or another server module.
//
// The table is created by supabase/migrations/20261023_orders.sql (RLS on,
// no policies → service_role only). Nothing here runs a migration.
//
// Shape of the contract:
//   * insertOrderIfNew is idempotent on stripe_session_id, so a Stripe
//     webhook retry re-reads the same row instead of creating a second one.
//   * printful_external_id is the SHORT order number (shortOrderNumber) —
//     never the Stripe session id, because Printful shows the external id to
//     people. It is left for the Printful step to fill in; a row that never
//     reaches Printful simply keeps it null.
//   * status_detail is a short reason code for the owner. Never a secret,
//     never a token, never the buyer's address.
//   * NO function here throws. Every one returns a result object or
//     `{ error }` with a short, non-PII message, so a webhook can decide
//     what to do instead of handing Stripe a 500 and being retried forever.
//
// This file must NOT import src/utils/printful.ts — printful.ts imports this
// one (for updateOrder + shortOrderNumber), and the cycle would be circular.
// ─────────────────────────────────────────────────────────────

import { createHash } from 'node:crypto';

// ── The row ──

/** One purchased line. `variant_id` is the Printful SYNC variant id. */
export type OrderItem = {
  slug: string;
  name: string;
  size: string;
  qty: number;
  variant_id: number | null;
};

/**
 * new           → stored; no Printful draft attempted yet
 * needs_variant → a line has no Printful sync variant mapped
 * draft_created → a DRAFT order exists in Printful, awaiting the owner
 * error         → something failed; see status_detail
 */
export const ORDER_STATUSES = ['new', 'needs_variant', 'draft_created', 'error'] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

/** Mirrors the `orders` table, column for column. */
export type OrderRow = {
  id: string;

  // Stripe
  stripe_session_id: string;
  stripe_payment_intent: string | null;

  // buyer
  email: string | null;
  name: string | null;
  phone: string | null;

  // shipping address, as Stripe collected it
  ship_line1: string | null;
  ship_line2: string | null;
  ship_city: string | null;
  ship_state: string | null;
  ship_postal_code: string | null;
  ship_country: string | null;

  // what was bought
  items: OrderItem[];

  // money, in cents, exactly as Stripe reported it
  amount_subtotal: number | null;
  amount_total: number | null;
  currency: string | null;

  // fulfilment state
  status: OrderStatus;
  status_detail: string | null;

  // Printful
  printful_order_id: string | null;
  printful_external_id: string | null;

  created_at: string;
  updated_at: string;
};

/** What a caller supplies on insert — the database fills in the rest. */
export type NewOrder = Omit<OrderRow, 'id' | 'created_at' | 'updated_at'>;

/** The columns a later step is allowed to patch. */
export type OrderPatch = Partial<
  Pick<
    OrderRow,
    'status' | 'status_detail' | 'printful_order_id' | 'printful_external_id' | 'stripe_payment_intent' | 'items'
  >
>;

// ── The short order number ──

/** Longest status_detail we will store. Keeps the owner's list readable. */
const DETAIL_MAX = 300;

/**
 * The owner- and Printful-facing order number: `LX` + the first 10 hex
 * characters of sha256(stripe_session_id), uppercased. 12 characters, well
 * under Printful's 32-character external_id limit.
 *
 * Derived from the session id but never containing it: Printful treats
 * external_id as a user-visible reference, and a Stripe session id is a
 * credential-shaped string that has no business being printed on a packing
 * slip. Deterministic, so the same session always maps to the same number and
 * a retry can look the order up instead of creating a second one.
 */
export function shortOrderNumber(stripeSessionId: string): string {
  const hex = createHash('sha256').update(String(stripeSessionId ?? ''), 'utf8').digest('hex');
  return `LX${hex.slice(0, 10).toUpperCase()}`;
}

// ── Supabase REST (service_role) ──
//
// Same pattern as sbFetch in src/lib/raffle.ts, kept private here so the
// orders layer does not change anything about the entries layer. The key is
// only ever put in a header — never logged, never returned.

const SB_URL = process.env.SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const NO_ORDERS_DB =
  'Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY — orders are never written to local files.';

/** True when this module can reach the orders table. */
export function ordersDbConfigured(): boolean {
  return Boolean(SB_URL && SB_KEY);
}

async function sbFetch(pathname: string, init: RequestInit = {}) {
  return fetch(`${SB_URL}/rest/v1/${pathname}`, {
    ...init,
    headers: {
      apikey: SB_KEY!,
      Authorization: `Bearer ${SB_KEY!}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
    cache: 'no-store',
  });
}

// ── Helpers ──

function isStatus(value: unknown): value is OrderStatus {
  return typeof value === 'string' && (ORDER_STATUSES as readonly string[]).includes(value);
}

/** Trim a reason code down to something safe to store and show. */
function shortDetail(detail: string | null | undefined): string | null {
  if (typeof detail !== 'string') return null;
  const text = detail.trim();
  if (!text) return null;
  return text.length > DETAIL_MAX ? text.slice(0, DETAIL_MAX) : text;
}

/** jsonb comes back as whatever is in the column; make `items` safe to map. */
function normalizeRow(raw: OrderRow): OrderRow {
  return {
    ...raw,
    items: Array.isArray(raw?.items) ? raw.items : [],
    status: isStatus(raw?.status) ? raw.status : 'new',
  };
}

// ── Reads and writes ──

/**
 * Store a paid session, exactly once.
 *
 * POST … on_conflict=stripe_session_id with resolution=ignore-duplicates: the
 * first call inserts and gets the row back, a Stripe retry inserts nothing and
 * gets an empty array, in which case we read the row that is already there.
 * Either way the caller ends up holding the stored order.
 *
 * `created` is false on a retry, so the caller can tell "I just stored this"
 * from "this was already handled".
 */
export async function insertOrderIfNew(
  row: NewOrder,
): Promise<{ order: OrderRow; created: boolean } | { error: string }> {
  if (!ordersDbConfigured()) return { error: NO_ORDERS_DB };

  const sessionId = (row?.stripe_session_id || '').trim();
  if (!sessionId) return { error: 'missing stripe_session_id' };

  const body: NewOrder = {
    ...row,
    stripe_session_id: sessionId,
    items: Array.isArray(row.items) ? row.items : [],
    status: isStatus(row.status) ? row.status : 'new',
    status_detail: shortDetail(row.status_detail),
  };

  try {
    const res = await sbFetch('orders?on_conflict=stripe_session_id', {
      method: 'POST',
      headers: { Prefer: 'resolution=ignore-duplicates,return=representation' },
      body: JSON.stringify(body),
    });
    if (!res.ok) return { error: `order insert failed (${res.status})` };

    const inserted = (await res.json().catch(() => [])) as OrderRow[];
    if (Array.isArray(inserted) && inserted[0]) {
      return { order: normalizeRow(inserted[0]), created: true };
    }

    // Ignored as a duplicate → the row exists; hand back the stored one.
    const existing = await getOrderBySession(sessionId);
    if ('error' in existing) return existing;
    if (!existing.order) return { error: 'order insert was ignored but no stored row was found' };
    return { order: existing.order, created: false };
  } catch {
    return { error: 'order insert failed (request error)' };
  }
}

/** The order for a Stripe session, or `{ order: null }` when there is none. */
export async function getOrderBySession(
  stripeSessionId: string,
): Promise<{ order: OrderRow | null } | { error: string }> {
  if (!ordersDbConfigured()) return { error: NO_ORDERS_DB };

  const sessionId = (stripeSessionId || '').trim();
  if (!sessionId) return { error: 'missing stripe_session_id' };

  try {
    const res = await sbFetch(
      `orders?select=*&stripe_session_id=eq.${encodeURIComponent(sessionId)}&limit=1`,
    );
    if (!res.ok) return { error: `order read failed (${res.status})` };
    const rows = (await res.json().catch(() => [])) as OrderRow[];
    const row = Array.isArray(rows) ? rows[0] : undefined;
    return { order: row ? normalizeRow(row) : null };
  } catch {
    return { error: 'order read failed (request error)' };
  }
}

/**
 * Patch an order, stamping updated_at (the table has a default but no
 * trigger, matching the other migrations in this repo).
 *
 * An empty patch is a no-op that still reports success, so a caller does not
 * have to special-case "nothing to change".
 */
export async function updateOrder(
  stripeSessionId: string,
  patch: OrderPatch,
): Promise<{ order: OrderRow | null } | { error: string }> {
  if (!ordersDbConfigured()) return { error: NO_ORDERS_DB };

  const sessionId = (stripeSessionId || '').trim();
  if (!sessionId) return { error: 'missing stripe_session_id' };

  const body: Record<string, unknown> = {};
  if ('status' in patch) {
    if (!isStatus(patch.status)) return { error: 'unknown order status' };
    body.status = patch.status;
  }
  if ('status_detail' in patch) body.status_detail = shortDetail(patch.status_detail);
  if ('printful_order_id' in patch) body.printful_order_id = patch.printful_order_id ?? null;
  if ('printful_external_id' in patch) body.printful_external_id = patch.printful_external_id ?? null;
  if ('stripe_payment_intent' in patch) body.stripe_payment_intent = patch.stripe_payment_intent ?? null;
  if ('items' in patch) body.items = Array.isArray(patch.items) ? patch.items : [];

  if (!Object.keys(body).length) return { order: null };
  body.updated_at = new Date().toISOString();

  try {
    const res = await sbFetch(`orders?stripe_session_id=eq.${encodeURIComponent(sessionId)}`, {
      method: 'PATCH',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify(body),
    });
    if (!res.ok) return { error: `order update failed (${res.status})` };
    const rows = (await res.json().catch(() => [])) as OrderRow[];
    const row = Array.isArray(rows) ? rows[0] : undefined;
    return { order: row ? normalizeRow(row) : null };
  } catch {
    return { error: 'order update failed (request error)' };
  }
}

/** The owner's list: newest first. */
export async function listOrders(limit = 200): Promise<{ orders: OrderRow[] } | { error: string }> {
  if (!ordersDbConfigured()) return { error: NO_ORDERS_DB };

  const capped = Number.isFinite(limit) ? Math.min(1000, Math.max(1, Math.floor(limit))) : 200;

  try {
    const res = await sbFetch(`orders?select=*&order=created_at.desc&limit=${capped}`);
    if (!res.ok) return { error: `order list failed (${res.status})` };
    const rows = (await res.json().catch(() => [])) as OrderRow[];
    return { orders: Array.isArray(rows) ? rows.map(normalizeRow) : [] };
  } catch {
    return { error: 'order list failed (request error)' };
  }
}
