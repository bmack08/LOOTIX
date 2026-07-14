import 'server-only';
import { cookies } from 'next/headers';

// Simple password gate for the /admin dashboard. Set ADMIN_PASSWORD in env
// (a strong value). Over HTTPS in production the httpOnly cookie is fine for MVP.
const PW = process.env.ADMIN_PASSWORD || 'lootix-admin';
export const ADMIN_COOKIE = 'lootix_admin';

export function checkPassword(pw: string) {
  return typeof pw === 'string' && pw.length > 0 && pw === PW;
}

export function cookieValue() {
  return PW;
}

export async function isAuthed() {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === PW;
}
