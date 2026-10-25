import 'server-only';
import { type Agreement, isMissingAgreementColumn, withoutAgreementColumns } from '@/config/agreement';
import { promises as fs } from 'fs';
import path from 'path';
import { ENTRY_GRANTS } from './lootix';
import { GIVEAWAY, isEntryWindowOpen } from './site';
import { MAIL_IN_ENTRIES } from '@/config/giveaway';

// ─────────────────────────────────────────────────────────────
// Raffle data layer. Uses Supabase REST when SUPABASE_URL +
// SUPABASE_SERVICE_ROLE_KEY are set; otherwise a local-file dev
// fallback so the public flow works before Supabase is provisioned.
//
// The local fallback is for PUBLIC, non-PII paths only (subscribers and
// order entries). Mail-in entries and winner records hold personal data and
// must never be written to data/*.jsonl — those actions refuse outright when
// Supabase isn't configured.
// ─────────────────────────────────────────────────────────────

const SB_URL = process.env.SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const usingSupabase = () => Boolean(SB_URL && SB_KEY);

const DATA_DIR = path.join(process.cwd(), 'data');
const FILES = {
  subscribers: path.join(DATA_DIR, 'subscribers.jsonl'),
  entries: path.join(DATA_DIR, 'entries.jsonl'),
};

export const NO_DB =
  'Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY — personal data is never written to local files.';

// ── Email normalization ──
/**
 * One canonical form per human: trimmed and lowercased, with the "+tag"
 * subaddress dropped from the local part.
 *
 * +tag stripping applies to EVERY domain, not just Gmail: outlook, iCloud,
 * Fastmail and most others deliver me+1@x and me+2@x to the same inbox, so
 * leaving them distinct would let one person farm the sign-up grant over and
 * over. Dot stripping stays Gmail-only, because only Gmail ignores dots —
 * a.b@outlook.com and ab@outlook.com really are different mailboxes.
 */
export function normalizeEmail(raw: string): string {
  const addr = (raw || '').trim().toLowerCase();
  const at = addr.lastIndexOf('@');
  if (at <= 0) return addr;
  const local = addr.slice(0, at);
  const domain = addr.slice(at + 1);

  let stripped = local.split('+')[0];
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    stripped = stripped.replace(/\./g, '');
  }
  // Only use the stripped form if something is left of it. "+tag@example.com"
  // would otherwise collapse to "@example.com" and make every such address
  // share one dedupe key.
  return stripped ? `${stripped}@${domain}` : `${local}@${domain}`;
}

// ── Supabase REST helpers ──
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

// ── Dev-file helpers (public, non-PII paths only) ──
async function readJsonl<T>(file: string): Promise<T[]> {
  try {
    const txt = await fs.readFile(file, 'utf8');
    return txt.split('\n').filter(Boolean).map((l) => JSON.parse(l) as T);
  } catch {
    return [];
  }
}
async function appendJsonl(file: string, record: unknown) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.appendFile(file, JSON.stringify(record) + '\n', 'utf8');
}

// ── The entry ledger row ──
export type EntryRow = {
  id?: string;
  giveaway_id: string;
  email: string | null;
  normalized_email: string | null;
  entrant_name: string | null;
  /** How many times this row counts in the draw. Voided rows count 0. */
  entries: number;
  source: 'subscribe' | 'order' | 'mail-in';
  order_ref: string | null;
  meta: Record<string, unknown> | null;
  voided_at: string | null;
  void_reason?: string | null;
  /** Agreement record (Legal, 2026-10-24). Optional until the migration runs. */
  agreed_at?: string | null;
  agreement_version?: string | null;
  agreement_box?: string | null;
  created_at: string;
};

const SUBSCRIBE_SOURCE = 'subscribe' as const;

/**
 * Insert an entry row. If the agreement columns are not in the database yet
 * (migration 20261024_agreement.sql not run), retry once without them - the
 * agreement is still kept in meta.agreement - so an entry is never lost.
 */
async function postEntry(pathname: string, headers: Record<string, string>, row: EntryRow): Promise<Response> {
  const res = await sbFetch(pathname, { method: 'POST', headers, body: JSON.stringify(row) });
  if (res.ok || !row.agreed_at) return res;
  const text = await res.clone().text().catch(() => '');
  if (!isMissingAgreementColumn(res.status, text)) return res;
  console.warn('[entries] agreement columns missing - stored in meta only (run 20261024_agreement.sql)');
  return sbFetch(pathname, { method: 'POST', headers, body: JSON.stringify(withoutAgreementColumns(row)) });
}

/** Saves the subscriber. Returns true only when the row was newly created. */
async function upsertSubscriber(email: string, normalized: string, origin: string): Promise<boolean> {
  const now = new Date().toISOString();
  if (usingSupabase()) {
    const res = await sbFetch('subscribers?on_conflict=normalized_email', {
      method: 'POST',
      headers: { Prefer: 'resolution=ignore-duplicates,return=representation' },
      body: JSON.stringify({ email, normalized_email: normalized, source: origin, created_at: now }),
    });
    if (!res.ok) throw new Error(`subscriber upsert failed (${res.status})`);
    return ((await res.json().catch(() => [])) as unknown[]).length > 0;
  }
  const subs = await readJsonl<{ normalized_email?: string; email: string }>(FILES.subscribers);
  if (subs.some((s) => (s.normalized_email ?? s.email) === normalized)) return false;
  await appendJsonl(FILES.subscribers, { email, normalized_email: normalized, source: origin, created_at: now });
  return true;
}

export type SubscribeResult = {
  ok: true;
  /** Entries actually created now (0 when the window is shut or already credited). */
  granted: number;
  /** False when the giveaway hasn't started / has closed — "Join the list" only. */
  entered: boolean;
  /** True when this email already used its one sign-up entry. */
  alreadyCredited: boolean;
  /** True only on the very first time we saw this email. */
  subscriberCreated: boolean;
};

/**
 * Save a subscriber, and credit the one-per-email sign-up entry if — and only
 * if — the entry window is open.
 *
 * The mailing list save ALWAYS happens. The entry does not: outside the window
 * there is no giveaway to enter, so the caller must not say "you're entered".
 */
export async function grantSubscription(
  email: string,
  origin: string,
  agreement?: Agreement | null,
): Promise<SubscribeResult> {
  const addr = (email || '').trim().toLowerCase();
  const normalized = normalizeEmail(addr);
  const grant = ENTRY_GRANTS[SUBSCRIBE_SOURCE];
  const now = new Date().toISOString();

  const subscriberCreated = await upsertSubscriber(addr, normalized, origin);

  if (!isEntryWindowOpen()) {
    return { ok: true, granted: 0, entered: false, alreadyCredited: false, subscriberCreated };
  }

  const row: EntryRow = {
    giveaway_id: GIVEAWAY.id,
    email: addr,
    normalized_email: normalized,
    entrant_name: null,
    entries: grant,
    source: SUBSCRIBE_SOURCE,
    order_ref: null,
    meta: agreement ? { origin, agreement } : { origin },
    voided_at: null,
    created_at: now,
    ...(agreement ?? {}),
  };

  if (usingSupabase()) {
    // Cheap pre-check; the partial unique index on
    // (giveaway_id, normalized_email) where source='subscribe' is the real
    // guarantee, so a 409 here means "already credited", not an error.
    // &voided_at=is.null matches the index predicate exactly, so a voided
    // sign-up row doesn't make us report "already credited" for a grant the
    // database would actually allow.
    const existing = await sbFetch(
      `entries?select=id&giveaway_id=eq.${encodeURIComponent(GIVEAWAY.id)}` +
        `&normalized_email=eq.${encodeURIComponent(normalized)}&source=eq.${SUBSCRIBE_SOURCE}` +
        '&voided_at=is.null&limit=1',
    );
    const rows = existing.ok ? await existing.json() : [];
    if (rows.length) {
      return { ok: true, granted: 0, entered: true, alreadyCredited: true, subscriberCreated };
    }

    const res = await postEntry('entries', { Prefer: 'return=minimal' }, row);
    if (res.status === 409) {
      return { ok: true, granted: 0, entered: true, alreadyCredited: true, subscriberCreated };
    }
    if (!res.ok) throw new Error(`entries insert failed (${res.status})`);
    return { ok: true, granted: grant, entered: true, alreadyCredited: false, subscriberCreated };
  }

  const ents = await readJsonl<EntryRow>(FILES.entries);
  const already = ents.some(
    (e) => e.source === SUBSCRIBE_SOURCE && e.normalized_email === normalized && e.giveaway_id === GIVEAWAY.id,
  );
  if (already) return { ok: true, granted: 0, entered: true, alreadyCredited: true, subscriberCreated };
  await appendJsonl(FILES.entries, row);
  return { ok: true, granted: grant, entered: true, alreadyCredited: false, subscriberCreated };
}

/**
 * Grant an order's entries. `orderRef` is the Stripe checkout session id and
 * carries a UNIQUE constraint, so a Stripe retry of the same event inserts
 * nothing the second time instead of double-granting.
 */
export async function grantOrderEntries(
  email: string,
  entries: number,
  orderRef: string,
  meta?: Record<string, unknown>,
  agreement?: Agreement | null,
): Promise<{ ok: boolean; granted: number; duplicate?: boolean }> {
  const addr = (email || '').trim().toLowerCase();
  const normalized = normalizeEmail(addr);
  const now = new Date().toISOString();
  if (!addr || !orderRef || entries <= 0) return { ok: false, granted: 0 };

  const row: EntryRow = {
    giveaway_id: GIVEAWAY.id,
    email: addr,
    normalized_email: normalized,
    entrant_name: null,
    entries,
    source: 'order',
    order_ref: orderRef,
    meta: agreement ? { ...(meta ?? {}), agreement } : meta ?? null,
    voided_at: null,
    created_at: now,
    ...(agreement ?? {}),
  };

  if (usingSupabase()) {
    await upsertSubscriber(addr, normalized, 'order');
    // on_conflict=order_ref + ignore-duplicates → Stripe retries are no-ops.
    const res = await postEntry('entries?on_conflict=order_ref', { Prefer: 'resolution=ignore-duplicates,return=representation' }, row);
    if (!res.ok) throw new Error(`order entries insert failed (${res.status})`);
    const inserted = (await res.json().catch(() => [])) as unknown[];
    if (!inserted.length) return { ok: true, granted: 0, duplicate: true };
    return { ok: true, granted: entries };
  }

  await upsertSubscriber(addr, normalized, 'order');
  const ents = await readJsonl<EntryRow>(FILES.entries);
  if (ents.some((e) => e.order_ref === orderRef)) return { ok: true, granted: 0, duplicate: true };
  await appendJsonl(FILES.entries, row);
  return { ok: true, granted: entries };
}

/**
 * Void every entry row for an order (refund / chargeback). Rows are kept and
 * stamped with voided_at — never deleted — so the ledger stays auditable.
 * A size exchange is not a refund and so never reaches here.
 */
export async function voidOrderEntries(
  orderRef: string | null,
  paymentIntent: string | null,
  reason: string,
): Promise<{ ok: boolean; voided: number }> {
  if (!orderRef && !paymentIntent) return { ok: false, voided: 0 };
  const now = new Date().toISOString();

  if (!usingSupabase()) {
    // Dev fallback: rewrite the ledger file with the matching rows stamped.
    const ents = await readJsonl<EntryRow>(FILES.entries);
    let voided = 0;
    const next = ents.map((e) => {
      const hit =
        (orderRef && e.order_ref === orderRef) ||
        (paymentIntent && (e.meta as { payment_intent?: string } | null)?.payment_intent === paymentIntent);
      if (hit && !e.voided_at) {
        voided += 1;
        return { ...e, voided_at: now, meta: { ...(e.meta ?? {}), void_reason: reason } };
      }
      return e;
    });
    if (voided) {
      await fs.mkdir(DATA_DIR, { recursive: true });
      await fs.writeFile(FILES.entries, next.map((r) => JSON.stringify(r)).join('\n') + '\n', 'utf8');
    }
    return { ok: true, voided };
  }

  const filters: string[] = [];
  if (orderRef) filters.push(`order_ref=eq.${encodeURIComponent(orderRef)}`);
  if (paymentIntent) filters.push(`meta->>payment_intent=eq.${encodeURIComponent(paymentIntent)}`);

  let voided = 0;
  for (const filter of filters) {
    const res = await sbFetch(`entries?${filter}&voided_at=is.null`, {
      method: 'PATCH',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify({ voided_at: now, void_reason: reason }),
    });
    if (!res.ok) throw new Error(`void failed (${res.status})`);
    voided += ((await res.json().catch(() => [])) as unknown[]).length;
  }
  return { ok: true, voided };
}

/**
 * Un-void an order's entries — used when a dispute closes in our favour.
 *
 * Scoped to `void_reason=eq.chargeback` on purpose: winning a dispute must not
 * resurrect entries that were voided for a different reason (a genuine refund,
 * or a failed payment).
 */
export async function unvoidOrderEntries(
  orderRef: string | null,
  paymentIntent: string | null,
): Promise<{ ok: boolean; restored: number }> {
  if (!orderRef && !paymentIntent) return { ok: false, restored: 0 };
  if (!usingSupabase()) return { ok: false, restored: 0 };

  const filters: string[] = [];
  if (orderRef) filters.push(`order_ref=eq.${encodeURIComponent(orderRef)}`);
  if (paymentIntent) filters.push(`meta->>payment_intent=eq.${encodeURIComponent(paymentIntent)}`);

  let restored = 0;
  for (const filter of filters) {
    const res = await sbFetch(`entries?${filter}&void_reason=eq.chargeback`, {
      method: 'PATCH',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify({ voided_at: null, void_reason: null }),
    });
    if (!res.ok) throw new Error(`unvoid failed (${res.status})`);
    restored += ((await res.json().catch(() => [])) as unknown[]).length;
  }
  return { ok: true, restored };
}

// ── Mail-in entries (PII — Supabase only) ──
export type MailInInput = {
  fullName: string;
  email?: string;
  mailingAddress: string;
  postmarkDate: string; // YYYY-MM-DD
  receivedDate: string; // YYYY-MM-DD
};

export type MailInRecord = MailInInput & { id: string; entries: number; created_at: string };

export async function logMailInEntry(
  input: MailInInput,
): Promise<{ ok: true; entries: number; eligible: boolean } | { error: string }> {
  if (!usingSupabase()) return { error: NO_DB };

  const fullName = (input.fullName || '').trim();
  const mailingAddress = (input.mailingAddress || '').trim();
  if (!fullName) return { error: 'Full name is required.' };
  if (!mailingAddress) return { error: 'Mailing address is required.' };
  if (!input.postmarkDate) return { error: 'Postmark date is required.' };
  if (!input.receivedDate) return { error: 'Received date is required.' };

  const addr = (input.email || '').trim().toLowerCase();
  const normalized = addr ? normalizeEmail(addr) : null;
  const now = new Date().toISOString();

  // A card is only eligible if its POSTMARK falls inside the entry window.
  // Outside it (including the "dates not set yet" state) the card is still
  // recorded — the admin asked to log it and the paper trail matters — but it
  // is stamped voided so it is worth 0 and can never be drawn. This is the
  // one admin path that could otherwise mint live entries while the giveaway
  // is not running.
  const postmarkMs = Date.parse(`${input.postmarkDate}T12:00:00-04:00`);
  const eligible = !Number.isNaN(postmarkMs) && isEntryWindowOpen(postmarkMs);

  const row: EntryRow = {
    giveaway_id: GIVEAWAY.id,
    email: addr || null,
    normalized_email: normalized,
    entrant_name: fullName,
    entries: eligible ? MAIL_IN_ENTRIES : 0,
    source: 'mail-in',
    order_ref: null,
    meta: {
      mailing_address: mailingAddress,
      postmark_date: input.postmarkDate,
      received_date: input.receivedDate,
      outside_window: !eligible,
    },
    voided_at: eligible ? null : now,
    void_reason: eligible ? null : 'postmark outside the entry window',
    created_at: now,
  };

  const res = await sbFetch('entries', {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify(row),
  });
  if (!res.ok) return { error: `Could not save the card (${res.status}).` };
  return { ok: true, entries: row.entries, eligible };
}

export async function listMailInEntries(): Promise<MailInRecord[]> {
  if (!usingSupabase()) return [];
  const res = await sbFetch(
    'entries?select=id,email,entrant_name,entries,meta,created_at,voided_at&source=eq.mail-in&order=created_at.desc',
  );
  if (!res.ok) return [];
  const rows = (await res.json()) as (EntryRow & { id: string })[];
  return rows.map((r) => {
    const meta = (r.meta ?? {}) as Record<string, string>;
    return {
      id: r.id,
      fullName: r.entrant_name ?? '',
      email: r.email ?? '',
      mailingAddress: meta.mailing_address ?? '',
      postmarkDate: meta.postmark_date ?? '',
      receivedDate: meta.received_date ?? '',
      entries: r.voided_at ? 0 : r.entries,
      created_at: r.created_at,
    };
  });
}

// ── The ledger, voided rows excluded ──
const PAGE = 1000;

/**
 * Fetch the whole live ledger, paging through PostgREST.
 *
 * Supabase caps rows per response (1000 by default). A single unbounded GET
 * would silently return only the first page, and then getStats, the CSV
 * ranges and the weighted draw would all be computed over a truncated
 * ledger — every row past the cap could never be drawn, with nothing
 * reporting it. So: page until we have them all, and verify the count against
 * Content-Range, throwing rather than drawing from a partial ledger.
 */
async function liveEntryRows(): Promise<(EntryRow & { id: string })[]> {
  if (usingSupabase()) {
    const base =
      'entries?select=id,email,normalized_email,entrant_name,entries,source,order_ref,created_at' +
      `&giveaway_id=eq.${encodeURIComponent(GIVEAWAY.id)}&voided_at=is.null&order=created_at.asc,id.asc`;

    const all: (EntryRow & { id: string })[] = [];
    let total: number | null = null;

    for (let offset = 0; ; offset += PAGE) {
      const res = await sbFetch(base, {
        headers: { Range: `${offset}-${offset + PAGE - 1}`, Prefer: 'count=exact' },
      });
      if (!res.ok) throw new Error(`entry ledger read failed (${res.status})`);

      const page = (await res.json()) as (EntryRow & { id: string })[];
      all.push(...page);

      // "0-999/1234" → 1234
      const cr = res.headers.get('content-range');
      if (cr && cr.includes('/')) {
        const parsed = parseInt(cr.split('/')[1], 10);
        if (!Number.isNaN(parsed)) total = parsed;
      }

      if (page.length < PAGE) break;
      if (total !== null && all.length >= total) break;
      // Safety stop: never spin forever on an unexpected header.
      if (offset > 1_000_000) break;
    }

    if (total !== null && all.length !== total) {
      throw new Error(`entry ledger incomplete: read ${all.length} of ${total} rows`);
    }
    return all;
  }
  const rows = await readJsonl<EntryRow & { id?: string }>(FILES.entries);
  return rows
    .filter((r) => !r.voided_at && r.giveaway_id === GIVEAWAY.id)
    .map((r, i) => ({ ...r, id: r.id ?? `local-${i}` }))
    .sort((a, b) => a.created_at.localeCompare(b.created_at));
}

/** One line per entry row — what the CSV and the weighted draw both read. */
export type LedgerEntry = {
  entry_id: string;
  entrant: string;
  name: string;
  email: string;
  entry_method: 'subscribe' | 'order' | 'mail-in';
  entries: number;
  entry_date: string;
  order_ref: string;
};

export async function getLedger(): Promise<LedgerEntry[]> {
  const rows = await liveEntryRows();
  return rows
    .filter((r) => (r.entries ?? 0) > 0)
    .map((r) => ({
      entry_id: r.id,
      // A mail-in card with no email is still its own entrant.
      entrant: r.normalized_email || `card:${r.id}`,
      name: r.entrant_name ?? '',
      email: r.email ?? '',
      entry_method: r.source,
      entries: r.entries,
      entry_date: r.created_at,
      order_ref: r.order_ref ?? '',
    }));
}

export type EntrantTotals = { entrant: string; email: string; name: string; entries: number };

/** Aggregate entries per entrant. Weighted by `entries`; voided rows excluded. */
export async function getEntrantTotals(): Promise<EntrantTotals[]> {
  const ledger = await getLedger();
  const map = new Map<string, EntrantTotals>();
  for (const e of ledger) {
    const cur = map.get(e.entrant);
    if (cur) {
      cur.entries += e.entries;
      if (!cur.name && e.name) cur.name = e.name;
      if (!cur.email && e.email) cur.email = e.email;
    } else {
      map.set(e.entrant, { entrant: e.entrant, email: e.email, name: e.name, entries: e.entries });
    }
  }
  return [...map.values()].sort((a, b) => b.entries - a.entries);
}

export async function getStats() {
  const totals = await getEntrantTotals();
  const mailIn = await listMailInEntries();
  let subscriberCount = totals.length;
  if (usingSupabase()) {
    const res = await sbFetch('subscribers?select=id', { headers: { Prefer: 'count=exact' } });
    const cr = res.headers.get('content-range'); // e.g. "0-24/57"
    if (cr && cr.includes('/')) subscriberCount = parseInt(cr.split('/')[1], 10) || subscriberCount;
  } else {
    subscriberCount = (await readJsonl(FILES.subscribers)).length;
  }
  return {
    subscriberCount,
    entrantCount: totals.length,
    totalEntries: totals.reduce((s, t) => s + t.entries, 0),
    mailInCount: mailIn.length,
  };
}

/**
 * Map a RANDOM.ORG integer (1 … totalEntries) onto the weighted ledger: a row
 * worth 129 entries occupies 129 consecutive numbers, so the odds match the
 * entry counts exactly. Ordering is deterministic (created_at, id) so the same
 * number always resolves to the same entry.
 */
export async function pickWeightedEntry(
  randomNumber: number,
): Promise<{ entry: LedgerEntry; totalEntries: number } | { error: string }> {
  const ledger = await getLedger();
  const totalEntries = ledger.reduce((s, e) => s + e.entries, 0);
  if (totalEntries <= 0) return { error: 'No entries yet — nothing to draw.' };
  if (!Number.isInteger(randomNumber) || randomNumber < 1 || randomNumber > totalEntries) {
    return { error: `The RANDOM.ORG number must be a whole number from 1 to ${totalEntries}.` };
  }
  let cursor = 0;
  for (const e of ledger) {
    cursor += e.entries;
    if (randomNumber <= cursor) return { entry: e, totalEntries };
  }
  return { error: 'Could not resolve that number to an entry.' };
}

// ── Winner records (PII — Supabase only) ──
export const WINNER_STATUSES = ['notified', 'docs_sent', 'docs_returned', 'paid', 'forfeited'] as const;
export type WinnerStatus = (typeof WINNER_STATUSES)[number];

export const W9_STATUSES = ['not_needed', 'requested', 'received'] as const;
export type W9Status = (typeof W9_STATUSES)[number];

/**
 * One winner = one record. Alternates are their own records with
 * alternate_rank 2, 3, …
 *
 * NEVER add SSN, tax ID, date of birth, or W-9 contents here. w9_status is a
 * status only; the W-9 itself is handled outside this app.
 */
export type Draw = {
  id?: string;
  giveaway_id: string;
  prize: string;

  // identity + payout
  full_name: string;
  email: string;
  phone: string | null;
  mailing_address: string;
  shipping_address: string | null;
  paypal_email: string | null;
  paypal_transaction_id: string | null;
  tracking_number: string | null;
  hoodie_size: string | null;
  tee_size: string | null;

  // the draw itself
  drawn_at: string;
  draw_date: string;
  draw_verification_url: string | null;
  random_number: number | null;
  method: string;
  total_entries: number;
  entrant_count: number;
  note: string | null;

  // the winning entry
  entry_id: string | null;
  entry_method: string | null;
  entry_date: string | null;

  // notification ladder
  alternate_rank: number;
  notification_date: string | null;
  attempt_number: number;
  response_deadline: string | null;

  // status + timestamps
  status: WinnerStatus;
  notified_at: string | null;
  docs_sent_at: string | null;
  docs_returned_at: string | null;
  paid_at: string | null;
  forfeited_at: string | null;
  w9_status: W9Status;

  created_at: string;
};

export type RecordWinnerInput = {
  fullName: string;
  email: string;
  phone?: string;
  mailingAddress: string;
  shippingAddress?: string;
  paypalEmail?: string;
  hoodieSize?: string;
  teeSize?: string;
  drawVerificationUrl?: string;
  randomNumber?: number;
  /** entry_id the admin saw when they resolved the number, if any. */
  expectedEntryId?: string;
  alternateRank?: number;
  notificationDate?: string;
  attemptNumber?: number;
  w9Status?: W9Status;
  status?: WinnerStatus;
  note?: string;
};

const DAY_MS = 86400000;

/**
 * Record the winner of a RANDOM.ORG draw.
 *
 * The admin runs the draw on RANDOM.ORG over 1 … total entries; we map that
 * number back onto the weighted ledger here, so the recorded winner provably
 * matches the published verification URL.
 */
export async function recordWinner(
  prize: string,
  input: RecordWinnerInput,
): Promise<Draw | { error: string }> {
  if (!usingSupabase()) return { error: NO_DB };

  const fullName = (input.fullName || '').trim();
  const email = (input.email || '').trim().toLowerCase();
  const mailingAddress = (input.mailingAddress || '').trim();
  if (!fullName) return { error: "Enter the winner's full name." };
  if (!email) return { error: "Enter the winner's email." };
  if (!mailingAddress) return { error: 'Enter the mailing address.' };

  const totals = await getEntrantTotals();
  const totalEntries = totals.reduce((s, t) => s + t.entries, 0);
  if (!totals.length || totalEntries <= 0) return { error: 'No entries yet — nothing to record.' };

  // Resolve the winning entry: by RANDOM.ORG number when given, else by email.
  let entry: LedgerEntry | null = null;
  if (typeof input.randomNumber === 'number') {
    const picked = await pickWeightedEntry(input.randomNumber);
    if ('error' in picked) return { error: picked.error };
    entry = picked.entry;

    // The number is authoritative. If the entry it landed on has an email,
    // the identity being recorded must match it — otherwise a typo (or a
    // stale preview) would file one person's name and payout details against
    // someone else's winning entry, and the public page, the winner email
    // and the paperwork would all name the wrong person.
    if (entry.email && normalizeEmail(email) !== entry.entrant) {
      return {
        error:
          `Number ${input.randomNumber} belongs to ${entry.email}, not "${email}". ` +
          'Re-resolve the number and record the entrant it actually landed on, or clear the number to record by email instead.',
      };
    }

    // The expected entry id from the admin's preview, if supplied: guards
    // against the ledger shifting (a refund voiding rows) between the preview
    // and the save, which would silently re-point the same number.
    if (input.expectedEntryId && input.expectedEntryId !== entry.entry_id) {
      return {
        error:
          'The entry list changed since you resolved that number (an order was probably refunded). ' +
          'Re-download the CSV, re-run the draw, and record the new result.',
      };
    }
  } else {
    const ledger = await getLedger();
    entry = ledger.find((e) => e.entrant === normalizeEmail(email)) ?? null;
    if (!entry) {
      return { error: `"${email}" is not in the entrant list. The winner must be a verified entrant.` };
    }
  }

  const now = new Date();
  const notificationDate = input.notificationDate || now.toISOString().slice(0, 10);
  const responseDeadline = new Date(Date.parse(`${notificationDate}T00:00:00Z`) + 7 * DAY_MS)
    .toISOString()
    .slice(0, 10);
  const status: WinnerStatus = input.status ?? 'notified';

  const record: Draw = {
    giveaway_id: GIVEAWAY.id,
    prize,
    full_name: fullName,
    email,
    phone: input.phone?.trim() || null,
    mailing_address: mailingAddress,
    shipping_address: input.shippingAddress?.trim() || null,
    paypal_email: input.paypalEmail?.trim().toLowerCase() || null,
    paypal_transaction_id: null,
    tracking_number: null,
    hoodie_size: input.hoodieSize?.trim() || null,
    tee_size: input.teeSize?.trim() || null,
    drawn_at: now.toISOString(),
    draw_date: now.toISOString().slice(0, 10),
    draw_verification_url: input.drawVerificationUrl?.trim() || null,
    random_number: typeof input.randomNumber === 'number' ? input.randomNumber : null,
    method: 'random.org-weighted',
    total_entries: totalEntries,
    entrant_count: totals.length,
    note: input.note?.trim() || null,
    entry_id: entry.entry_id,
    entry_method: entry.entry_method,
    entry_date: entry.entry_date,
    alternate_rank: input.alternateRank && input.alternateRank > 0 ? Math.floor(input.alternateRank) : 1,
    notification_date: notificationDate,
    attempt_number: Math.min(3, Math.max(1, Math.floor(input.attemptNumber ?? 1))),
    response_deadline: responseDeadline,
    status,
    notified_at: status === 'notified' ? now.toISOString() : null,
    docs_sent_at: null,
    docs_returned_at: null,
    paid_at: null,
    forfeited_at: null,
    w9_status: input.w9Status ?? 'not_needed',
    created_at: now.toISOString(),
  };

  const res = await sbFetch('draws', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(record),
  });
  if (res.status === 409) {
    return {
      error:
        record.alternate_rank === 1
          ? 'A winner is already recorded for this giveaway. Record an alternate (rank 2+), or clear the existing record first.'
          : `Alternate #${record.alternate_rank} is already recorded for this giveaway. Use the next rank.`,
    };
  }
  if (!res.ok) return { error: `Could not save the winner record (${res.status}).` };
  const rows = (await res.json().catch(() => [])) as Draw[];
  return rows[0] ?? record;
}

/**
 * Latest winner record — ADMIN view. This is whatever was recorded most
 * recently, including a record still at 'notified' and including alternates.
 * Do not render this publicly; use getPublicWinner.
 */
export async function getLatestWinner(): Promise<Draw | null> {
  if (!usingSupabase()) return null;
  try {
    const res = await sbFetch('draws?select=*&order=created_at.desc&limit=1');
    if (!res.ok) return null;
    const rows = (await res.json()) as Draw[];
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

/**
 * The winner the PUBLIC site may name — only once they are actually paid.
 *
 * Per the Official Rules a potential winner is verified before being declared
 * a winner, so a record sitting at 'notified' / 'docs_sent' is not announced,
 * and an alternate recorded while the primary is still inside their response
 * window never flips the public page.
 */
export async function getPublicWinner(): Promise<Draw | null> {
  if (!usingSupabase()) return null;
  try {
    const res = await sbFetch('draws?select=*&status=eq.paid&order=paid_at.desc,created_at.desc&limit=1');
    if (!res.ok) return null;
    const rows = (await res.json()) as Draw[];
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function listDraws(): Promise<Draw[]> {
  if (!usingSupabase()) return [];
  const res = await sbFetch('draws?select=*&order=created_at.desc');
  return res.ok ? await res.json() : [];
}

/**
 * Every merge field the winner paperwork drafts expect, in one object, so the
 * docs fill in without retyping. Admin-only — this is personal data.
 *
 * No SSN / tax ID / date of birth / W-9 contents, by design.
 */
export function winnerMergeFields(d: Draw) {
  return {
    winner_full_name: d.full_name,
    winner_email: d.email,
    winner_phone: d.phone ?? '',
    mailing_address: d.mailing_address,
    shipping_address: d.shipping_address || d.mailing_address,
    paypal_email: d.paypal_email ?? '',
    paypal_transaction_id: d.paypal_transaction_id ?? '',
    tracking_number: d.tracking_number ?? '',
    hoodie_size: d.hoodie_size ?? '',
    tee_size: d.tee_size ?? '',
    prize: d.prize,
    entry_id: d.entry_id ?? '',
    entry_method: d.entry_method ?? '',
    entry_date: d.entry_date ?? '',
    draw_date: d.draw_date,
    drawn_at: d.drawn_at,
    draw_verification_url: d.draw_verification_url ?? '',
    total_entries: d.total_entries,
    alternate_rank: d.alternate_rank,
    notification_date: d.notification_date ?? '',
    attempt_number: d.attempt_number,
    response_deadline: d.response_deadline ?? '',
    status: d.status,
    w9_status: d.w9_status,
  };
}

/** Patch the claim-progress fields on a winner record. */
export async function updateWinner(
  id: string,
  patch: Partial<
    Pick<
      Draw,
      | 'status'
      | 'w9_status'
      | 'paypal_transaction_id'
      | 'tracking_number'
      | 'hoodie_size'
      | 'tee_size'
      | 'attempt_number'
      | 'note'
    >
  >,
): Promise<{ ok: true } | { error: string }> {
  if (!usingSupabase()) return { error: NO_DB };
  const now = new Date().toISOString();
  const stamps: Record<string, string> = {
    notified: 'notified_at',
    docs_sent: 'docs_sent_at',
    docs_returned: 'docs_returned_at',
    paid: 'paid_at',
    forfeited: 'forfeited_at',
  };
  const body: Record<string, unknown> = { ...patch };
  if (patch.status && stamps[patch.status]) body[stamps[patch.status]] = now;

  const res = await sbFetch(`draws?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify(body),
  });
  if (!res.ok) return { error: `Could not update the record (${res.status}).` };
  return { ok: true };
}

/**
 * Read-only: how many live (non-voided) order entries were recorded for one
 * Stripe Checkout session. Used by /order/success so the page only claims
 * entries the webhook actually wrote. Returns null if unknown (bad id,
 * storage unavailable, any error) so callers fall back to a neutral message.
 */
export async function getOrderEntryCount(orderRef: string): Promise<number | null> {
  if (!/^cs_(test|live)_[A-Za-z0-9]{1,200}$/.test(orderRef)) return null;
  try {
    if (usingSupabase()) {
      const res = await sbFetch(
        `entries?select=entries&order_ref=eq.${encodeURIComponent(orderRef)}&source=eq.order&voided_at=is.null`,
        { cache: 'no-store' },
      );
      if (!res.ok) return null;
      const rows = (await res.json()) as { entries: number }[];
      return rows.reduce((n, r) => n + (Number(r.entries) || 0), 0);
    }
    const rows = await readJsonl<EntryRow>(FILES.entries);
    return rows
      .filter((r) => r.order_ref === orderRef && r.source === 'order' && !r.voided_at)
      .reduce((n, r) => n + (Number(r.entries) || 0), 0);
  } catch {
    return null;
  }
}
