import { NextResponse } from 'next/server';
import { grantSubscription } from '@/lib/raffle';
import { sendWelcome } from '@/lib/email';
import { ENTRY_GRANTS } from '@/lib/lootix';
import {
  ENTRIES_PER_SIGNUP,
  entryWindowState,
  entryWindowReason,
} from '@/lib/sweepstakes';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_SOURCES = new Set(['newsletter', 'giveaway-first-winner', 'enter-to-win']);

export async function POST(req: Request) {
  let body: { email?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 });
  }

  const email = (body.email || '').trim().toLowerCase();
  const source = VALID_SOURCES.has(body.source || '') ? body.source! : 'newsletter';

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email.' }, { status: 422 });
  }

  // Outside the Sweepstakes Period the sign-up is still recorded — they asked
  // for drop alerts — but it earns no entry, so the confirmation must not
  // promise one.
  const window = entryWindowState();

  try {
    const result = await grantSubscription(email, source, { withEntry: window === 'open' });

    if (window !== 'open') {
      console.log(`Subscribe: subscriber recorded, no entry granted (${entryWindowReason(window)})`);
    }

    // Only welcome-email a brand-new grant (avoid spamming repeat submits)
    if (result.granted > 0) {
      await sendWelcome(email, ENTRY_GRANTS[source] ?? ENTRIES_PER_SIGNUP);
    }
    return NextResponse.json({ ok: true, granted: result.granted });
  } catch (e) {
    console.error('subscribe failed', e);
    return NextResponse.json({ ok: false, error: 'Could not save. Try again.' }, { status: 502 });
  }
}
