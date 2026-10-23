import 'server-only';
import { createHash, createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

// ─────────────────────────────────────────────────────────────
// Password gate for /admin.
//
// The password is read ONLY from process.env.ADMIN_PASSWORD. There is no
// fallback: if it isn't set, login is refused outright rather than letting a
// known default through. The password itself is never written to the cookie,
// never logged, and never returned to the client.
// ─────────────────────────────────────────────────────────────

export const ADMIN_COOKIE = 'lootix_admin';

/** Session lifetime. The expiry is inside the signed token, not just maxAge. */
export const SESSION_MS = 12 * 60 * 60 * 1000;

function secret(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  return pw && pw.length > 0 ? pw : null;
}

/** False when ADMIN_PASSWORD is unset — the admin area stays shut. */
export function adminConfigured(): boolean {
  return secret() !== null;
}

/**
 * Constant-time compare that doesn't leak length.
 *
 * timingSafeEqual throws on differing lengths, and returning early on a length
 * mismatch would make the secret's length observable. Hashing both sides first
 * gives two fixed-size digests, so the comparison is always over 32 bytes.
 */
function eq(a: string, b: string): boolean {
  const ha = createHash('sha256').update(a, 'utf8').digest();
  const hb = createHash('sha256').update(b, 'utf8').digest();
  return timingSafeEqual(ha, hb);
}

export function checkPassword(pw: string): boolean {
  const s = secret();
  if (!s) return false; // unset password → refuse login
  if (typeof pw !== 'string' || pw.length === 0) return false;
  return eq(pw, s);
}

function sign(payload: string, s: string): string {
  return createHmac('sha256', s).update(payload).digest('base64url');
}

/**
 * The cookie value: `v2|<expiry-ms>|<hmac>`, where the HMAC is keyed by the
 * password. Stealing the cookie doesn't reveal the password, rotating
 * ADMIN_PASSWORD invalidates every existing session, and because the expiry is
 * signed, a replayed cookie stops working on time even though maxAge is only a
 * client-side hint.
 */
export function cookieValue(now: number = Date.now()): string {
  const s = secret();
  if (!s) return '';
  const exp = String(now + SESSION_MS);
  return `v2|${exp}|${sign(`lootix-admin|v2|${exp}`, s)}`;
}

export async function isAuthed(): Promise<boolean> {
  const s = secret();
  if (!s) return false;
  const store = await cookies();
  const got = store.get(ADMIN_COOKIE)?.value;
  if (!got) return false;

  const parts = got.split('|');
  if (parts.length !== 3 || parts[0] !== 'v2') return false;
  const [, exp, mac] = parts;

  // Expiry must be a sane number and still in the future.
  if (!/^\d+$/.test(exp)) return false;
  if (Number(exp) <= Date.now()) return false;

  // Only then is the signature worth checking.
  return eq(mac, sign(`lootix-admin|v2|${exp}`, s));
}
