import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import { ENTRY_GRANTS } from './lootix';

// ─────────────────────────────────────────────────────────────
// Raffle data layer. Uses Supabase REST when SUPABASE_URL +
// SUPABASE_SERVICE_ROLE_KEY are set; otherwise a local-file dev
// fallback so the whole flow works before Supabase is provisioned.
// ─────────────────────────────────────────────────────────────

const SB_URL = process.env.SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const usingSupabase = () => Boolean(SB_URL && SB_KEY);

const DATA_DIR = path.join(process.cwd(), 'data');
const FILES = {
  subscribers: path.join(DATA_DIR, 'subscribers.jsonl'),
  entries: path.join(DATA_DIR, 'entries.jsonl'),
  draws: path.join(DATA_DIR, 'draws.jsonl'),
};

// ── Supabase REST helpers ──
async function sbFetch(pathname: string, init: RequestInit = {}) {
  const res = await fetch(`${SB_URL}/rest/v1/${pathname}`, {
    ...init,
    headers: {
      apikey: SB_KEY!,
      Authorization: `Bearer ${SB_KEY!}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
    cache: 'no-store',
  });
  return res;
}

// ── Dev-file helpers ──
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

// ── Grant a subscription + its free entries (idempotent-ish on email) ──
export async function grantSubscription(email: string, source: string) {
  const grant = ENTRY_GRANTS[source] ?? 25;
  const now = new Date().toISOString();

  if (usingSupabase()) {
    // upsert subscriber
    await sbFetch('subscribers', {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify({ email, source, created_at: now }),
    });
    // only grant entries the first time we see this email for this source
    const existing = await sbFetch(
      `entries?select=id&email=eq.${encodeURIComponent(email)}&source=eq.${encodeURIComponent(source)}&limit=1`,
    );
    const rows = existing.ok ? await existing.json() : [];
    if (!rows.length) {
      await sbFetch('entries', {
        method: 'POST',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({ email, count: grant, source, created_at: now }),
      });
    }
    return { ok: true, granted: rows.length ? 0 : grant };
  }

  // dev fallback
  const subs = await readJsonl<{ email: string }>(FILES.subscribers);
  if (!subs.some((s) => s.email === email)) {
    await appendJsonl(FILES.subscribers, { email, source, created_at: now });
  }
  const ents = await readJsonl<{ email: string; source: string }>(FILES.entries);
  const already = ents.some((e) => e.email === email && e.source === source);
  if (!already) {
    await appendJsonl(FILES.entries, { email, count: grant, source, created_at: now });
  }
  return { ok: true, granted: already ? 0 : grant };
}

/**
 * Grant entries unconditionally (used for purchases — unlike signup, every
 * order earns its own entries, so no first-time-only guard here).
 * `meta` records the Stripe session id for auditability.
 */
export async function grantEntries(
  email: string,
  count: number,
  source: string,
  meta?: Record<string, unknown>,
) {
  const addr = email.trim().toLowerCase();
  const now = new Date().toISOString();
  if (!addr || count <= 0) return { ok: false };

  if (usingSupabase()) {
    // make sure they exist as a subscriber too
    await sbFetch('subscribers', {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify({ email: addr, source, created_at: now }),
    });
    await sbFetch('entries', {
      method: 'POST',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({ email: addr, count, source, meta: meta ?? null, created_at: now }),
    });
    return { ok: true, granted: count };
  }

  const subs = await readJsonl<{ email: string }>(FILES.subscribers);
  if (!subs.some((s) => s.email === addr)) {
    await appendJsonl(FILES.subscribers, { email: addr, source, created_at: now });
  }
  await appendJsonl(FILES.entries, { email: addr, count, source, meta: meta ?? null, created_at: now });
  return { ok: true, granted: count };
}

export type EntrantTotals = { email: string; entries: number };

// ── Aggregate entries per email ──
export async function getEntrantTotals(): Promise<EntrantTotals[]> {
  let rows: { email: string; count: number }[] = [];
  if (usingSupabase()) {
    const res = await sbFetch('entries?select=email,count');
    rows = res.ok ? await res.json() : [];
  } else {
    rows = await readJsonl<{ email: string; count: number }>(FILES.entries);
  }
  const map = new Map<string, number>();
  for (const r of rows) map.set(r.email, (map.get(r.email) ?? 0) + (r.count ?? 0));
  return [...map.entries()]
    .map(([email, entries]) => ({ email, entries }))
    .sort((a, b) => b.entries - a.entries);
}

export async function getStats() {
  const totals = await getEntrantTotals();
  let subscriberCount = totals.length;
  if (usingSupabase()) {
    const res = await sbFetch('subscribers?select=id', { headers: { Prefer: 'count=exact' } });
    const cr = res.headers.get('content-range'); // e.g. "0-24/57"
    if (cr && cr.includes('/')) subscriberCount = parseInt(cr.split('/')[1], 10) || subscriberCount;
  } else {
    subscriberCount = (await readJsonl(FILES.subscribers)).length;
  }
  const totalEntries = totals.reduce((s, t) => s + t.entries, 0);
  return { subscriberCount, entrantCount: totals.length, totalEntries };
}

export type Draw = {
  prize: string;
  winner_email: string;
  total_entries: number;
  entrant_count: number;
  created_at: string;
};

// ── Record a winner produced by an INDEPENDENT / third-party draw ──
// Per the Official Rules, the winner is selected by an unaffiliated party
// (or third-party random service). The admin records that result here; we
// verify the winner is a real entrant, then log it as the auditable draw.
export async function recordExternalDraw(
  prize: string,
  winnerEmail: string,
  method: string,
  note?: string,
): Promise<Draw | { error: string }> {
  const email = (winnerEmail || '').trim().toLowerCase();
  if (!email) return { error: 'Enter the winner email from your independent draw.' };

  const totals = await getEntrantTotals();
  const totalEntries = totals.reduce((s, t) => s + t.entries, 0);
  if (!totals.length || totalEntries <= 0) return { error: 'No entries yet — nothing to record.' };

  const match = totals.find((t) => t.email === email);
  if (!match) return { error: `"${email}" is not in the entrant list. The winner must be a verified entrant.` };

  const draw: Draw = {
    prize,
    winner_email: email,
    total_entries: totalEntries,
    entrant_count: totals.length,
    created_at: new Date().toISOString(),
  };
  const record = { ...draw, method: method || 'third-party', note: note || null };

  if (usingSupabase()) {
    await sbFetch('draws', {
      method: 'POST',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify(record),
    });
  } else {
    await appendJsonl(FILES.draws, record);
  }
  return draw;
}

// ── Latest winner (drives the site auto-unlock); null if none / on error ──
export async function getLatestWinner(): Promise<Draw | null> {
  try {
    if (usingSupabase()) {
      const res = await sbFetch('draws?select=*&order=created_at.desc&limit=1');
      if (!res.ok) return null;
      const rows = (await res.json()) as Draw[];
      return rows[0] ?? null;
    }
    const draws = await readJsonl<Draw>(FILES.draws);
    return draws.length ? draws[draws.length - 1] : null;
  } catch {
    return null;
  }
}

export async function listDraws(): Promise<Draw[]> {
  if (usingSupabase()) {
    const res = await sbFetch('draws?select=*&order=created_at.desc');
    return res.ok ? await res.json() : [];
  }
  const draws = await readJsonl<Draw>(FILES.draws);
  return draws.reverse();
}
