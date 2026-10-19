import 'server-only';
import { cookies } from 'next/headers';
import {
  isConfigured,
  verifyPassword,
  sessionToken,
  verifySessionToken,
} from './admin-credentials';

// Password gate for the /admin dashboard.
//
// ADMIN_PASSWORD is REQUIRED — there is no default. See
// src/lib/admin-credentials.ts for the logic and the reasoning; this module is
// just the env + cookie wiring so the logic stays unit-testable.
const PW = process.env.ADMIN_PASSWORD;

export const ADMIN_COOKIE = 'lootix_admin';

/** False when ADMIN_PASSWORD is missing or blank, so callers can fail closed. */
export function adminConfigured(): boolean {
  return isConfigured(PW);
}

export function checkPassword(pw: string): boolean {
  return verifyPassword(PW, pw);
}

/** Derived session token — never the password itself. */
export function cookieValue(): string {
  return sessionToken(PW);
}

export async function isAuthed(): Promise<boolean> {
  if (!adminConfigured()) return false;
  const store = await cookies();
  return verifySessionToken(PW, store.get(ADMIN_COOKIE)?.value);
}
