import 'server-only';
import { createHmac, timingSafeEqual } from 'crypto';
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

/** Fixed payload — the secret is the key, so the token proves knowledge of it. */
const TOKEN_PAYLOAD = 'lootix-admin|v1';

function secret(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  return pw && pw.length > 0 ? pw : null;
}

/** False when ADMIN_PASSWORD is unset — the admin area stays shut. */
export function adminConfigured(): boolean {
  return secret() !== null;
}

function eq(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export function checkPassword(pw: string): boolean {
  const s = secret();
  if (!s) return false; // unset password → refuse login
  if (typeof pw !== 'string' || pw.length === 0) return false;
  return eq(pw, s);
}

/**
 * The cookie value: an HMAC of a fixed payload keyed by the password. Stealing
 * the cookie doesn't reveal the password, and rotating ADMIN_PASSWORD
 * invalidates every existing session.
 */
export function cookieValue(): string {
  const s = secret();
  if (!s) return '';
  return createHmac('sha256', s).update(TOKEN_PAYLOAD).digest('base64url');
}

export async function isAuthed(): Promise<boolean> {
  if (!adminConfigured()) return false;
  const store = await cookies();
  const got = store.get(ADMIN_COOKIE)?.value;
  if (!got) return false;
  return eq(got, cookieValue());
}
