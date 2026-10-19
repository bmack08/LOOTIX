import 'server-only';
import { createHash } from 'crypto';

/**
 * A short, stable, non-reversible tag for an email address, for use in logs.
 *
 * Logs get shipped to hosting dashboards, retained for months and read by
 * whoever has dashboard access, so putting entrant addresses in them turns
 * every log line into a copy of the mailing list. A tag still lets you follow
 * one person's requests through a trace, or match a support report to a log
 * line, without the log itself holding an address.
 *
 * Not a security control — the input space of email addresses is small enough
 * to brute-force. It is a data-minimisation measure: don't log what you don't
 * need. Never use this as an identifier in the database.
 */
export function emailTag(email: string): string {
  const addr = (email || '').trim().toLowerCase();
  if (!addr) return 'anon';
  return createHash('sha256').update(addr).digest('hex').slice(0, 8);
}
