import { NextResponse } from 'next/server';
import { adminConfigured, checkPassword, cookieValue, ADMIN_COOKIE, SESSION_MS } from '@/lib/admin';

export const runtime = 'nodejs';

// ── Login throttle: 5 failures per IP per 15 min, plus a global ceiling. ──
//
// LIMITATION: this Map is per server instance, so on serverless it is a speed
// bump, not a wall — concurrency and cold starts both reset it. It is here
// because an unthrottled login is an unlimited password oracle for the one
// shared secret guarding all entrant and winner PII. A real fix needs shared
// state (Vercel KV / Upstash) or Vercel Firewall rate limiting; that is a new
// dependency and needs Owner sign-off, so it is flagged, not installed.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_IP = 5;
const MAX_GLOBAL = 60;

const failures = new Map<string, number[]>();
let globalFailures: number[] = [];

function recent(times: number[], now: number): number[] {
  return times.filter((t) => now - t < WINDOW_MS);
}

function isLockedOut(ip: string): boolean {
  const now = Date.now();
  globalFailures = recent(globalFailures, now);
  if (globalFailures.length >= MAX_GLOBAL) return true;
  return recent(failures.get(ip) ?? [], now).length >= MAX_PER_IP;
}

function recordFailure(ip: string): void {
  const now = Date.now();
  failures.set(ip, [...recent(failures.get(ip) ?? [], now), now]);
  globalFailures = [...recent(globalFailures, now), now];
  if (failures.size > 5000) {
    for (const [k, v] of failures) if (recent(v, now).length === 0) failures.delete(k);
  }
}

/** Platform-set headers first; x-forwarded-for[0] is caller-controlled. */
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
  // No ADMIN_PASSWORD set → no admin login at all.
  if (!adminConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'Admin login is disabled: ADMIN_PASSWORD is not set on the server.' },
      { status: 503 },
    );
  }

  const ip = clientIp(req);
  if (isLockedOut(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many failed attempts. Try again later.' },
      { status: 429, headers: { 'Retry-After': String(WINDOW_MS / 1000) } },
    );
  }

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!checkPassword(body.password || '')) {
    recordFailure(ip);
    // Never echo the attempt, and never say why it failed.
    return NextResponse.json({ ok: false, error: 'Wrong password.' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  // Signed token with a signed expiry, not the password itself.
  res.cookies.set(ADMIN_COOKIE, cookieValue(), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_MS / 1000,
  });
  return res;
}

/** Logout — clears the session cookie. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
  });
  return res;
}
