import { NextResponse } from 'next/server';
import { grantSubscription } from '@/lib/raffle';
import { sendWelcome } from '@/lib/email';
import { isEntryWindowOpen } from '@/lib/site';
import { makeAgreement } from '@/config/agreement';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Where on the site the signup came from. This is a UI origin label only —
 * it is NOT the stored entry source, so the public can never submit
 * source='mail-in' (mail-in entries are admin-only, via /api/admin/mail-in).
 */
const VALID_ORIGINS = new Set(['newsletter', 'giveaway-first-winner', 'enter-to-win']);

// ── Per-IP rate limit: 5 submissions / 10 min, in-process. ──
// Enough to stop a bot hammering one instance; the DB unique index is what
// actually guarantees one sign-up entry per email.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    // keep the map from growing without bound
    for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

/**
 * Best-effort client IP for the limiter.
 *
 * Deliberately NOT x-forwarded-for[0]: that end of the chain is whatever the
 * caller sent, so an attacker rotating `X-Forwarded-For: 1.2.3.<n>` would get
 * a fresh bucket every request. Prefer the platform-set headers, and fall back
 * to the LAST x-forwarded-for hop (the one appended closest to us).
 */
function clientIp(req: Request): string {
  const platform = req.headers.get('x-vercel-forwarded-for') || req.headers.get('x-real-ip');
  if (platform) return platform.trim();
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) {
    const hops = fwd.split(',').map((h) => h.trim()).filter(Boolean);
    if (hops.length) return hops[hops.length - 1];
  }
  return 'unknown';
}

export async function POST(req: Request) {
  let body: { email?: string; source?: string; website?: string; agreed?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 });
  }

  // Honeypot: a real person never fills a field they can't see. Answer 200 so
  // the bot can't tell it was caught, but save nothing.
  if (body.website) {
    return NextResponse.json({ ok: true, entered: false });
  }

  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ ok: false, error: 'Too many attempts. Try again later.' }, { status: 429 });
  }

  const email = (body.email || '').trim().toLowerCase();
  const origin = VALID_ORIGINS.has(body.source || '') ? body.source! : 'newsletter';

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email.' }, { status: 422 });
  }

  // The required Official Rules box (Legal, 2026-10-24). Exactly true.
  if (body.agreed !== true) {
    return NextResponse.json({ ok: false, error: 'Please agree to the Official Rules.' }, { status: 400 });
  }

  try {
    const result = await grantSubscription(email, origin, makeAgreement('signup'));
    // Email once: on a new entry grant, or on a brand-new list signup when
    // there is no giveaway to enter. Repeat submits send nothing.
    if (result.granted > 0 || result.subscriberCreated) {
      await sendWelcome(email, result.granted);
    }
    // Deliberately does NOT report `alreadyCredited`: that would let anyone
    // test whether a given address is already on the list. `entered` only
    // reflects whether the giveaway is running, which is public anyway.
    return NextResponse.json({
      ok: true,
      // The window is shut → this was a mailing-list signup, nothing more.
      entered: result.entered,
      windowOpen: isEntryWindowOpen(),
    });
  } catch (e) {
    console.error('subscribe failed', e);
    return NextResponse.json({ ok: false, error: 'Could not save. Try again.' }, { status: 502 });
  }
}
