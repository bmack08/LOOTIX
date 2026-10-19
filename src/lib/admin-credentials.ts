import { createHmac, timingSafeEqual } from 'crypto';

/**
 * Pure admin credential logic. Takes the password as an argument instead of
 * reading process.env, so it can be unit-tested without a Next request
 * context — see src/lib/admin-credentials.test.ts. The env-reading wrapper is
 * src/lib/admin.ts.
 *
 * There is deliberately NO default password anywhere in this file. A fallback
 * value ships the same credential to every deployment, and anyone who has read
 * the source knows it. With the secret absent, every check here returns false,
 * so the admin fails closed rather than falling back to something guessable.
 */

const SESSION_LABEL = 'lootix-admin-session-v1';

/** False when the password is missing or blank, so callers can fail closed. */
export function isConfigured(secret: string | undefined): boolean {
  return typeof secret === 'string' && secret.length > 0;
}

/**
 * Constant-time compare that tolerates differing lengths.
 *
 * timingSafeEqual throws when its inputs differ in length, and returning early
 * on that would leak the length through timing, so both sides are hashed to a
 * fixed 32 bytes first and the digests are compared.
 */
function safeEqual(a: string, b: string): boolean {
  const left = createHmac('sha256', 'lootix-cmp').update(Buffer.from(a, 'utf8')).digest();
  const right = createHmac('sha256', 'lootix-cmp').update(Buffer.from(b, 'utf8')).digest();
  return timingSafeEqual(left, right);
}

export function verifyPassword(secret: string | undefined, presented: string): boolean {
  if (!isConfigured(secret)) return false;
  if (typeof presented !== 'string' || presented.length === 0) return false;
  return safeEqual(presented, secret as string);
}

/**
 * The session cookie value — an HMAC keyed by the password, NOT the password.
 *
 * Storing the password itself in the cookie (the previous behaviour) means the
 * credential travels in every request and shows up verbatim in anything that
 * captures cookies: proxy logs, error reporters, a browser profile. A derived
 * token is useless outside this app, and rotating the password still
 * invalidates every existing session because the key changed.
 */
export function sessionToken(secret: string | undefined): string {
  if (!isConfigured(secret)) return '';
  return createHmac('sha256', secret as string).update(SESSION_LABEL).digest('hex');
}

export function verifySessionToken(secret: string | undefined, presented: string | undefined): boolean {
  if (!isConfigured(secret)) return false;
  if (typeof presented !== 'string' || presented.length === 0) return false;
  return safeEqual(presented, sessionToken(secret));
}
