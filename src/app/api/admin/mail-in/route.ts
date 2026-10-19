import { NextResponse } from 'next/server';
import { isAuthed } from '@/lib/admin';
import { grantMailInEntry } from '@/lib/raffle';

export const runtime = 'nodejs';

/**
 * Log one mail-in (AMOE) card as one entry. Admin only.
 *
 * Idempotent on `cardRef`, so a double-submit or a refresh cannot turn one
 * envelope into two entries. Logs carry the card reference only — never the
 * entrant's email or name.
 */
export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: 'Not authorized.' }, { status: 401 });
  }

  let body: { email?: string; cardRef?: string; postmark?: string; note?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 });
  }

  const email = (body.email || '').trim().toLowerCase();
  const cardRef = (body.cardRef || '').trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Enter the entrant email from the card.' }, { status: 400 });
  }
  if (!cardRef) {
    return NextResponse.json(
      { ok: false, error: 'Enter a card reference (envelope number, or postmark + initials).' },
      { status: 400 },
    );
  }

  try {
    const result = await grantMailInEntry(email, cardRef, {
      postmark: (body.postmark || '').trim() || null,
      note: (body.note || '').trim() || null,
    });
    if (result.duplicate) {
      return NextResponse.json({
        ok: true,
        duplicate: true,
        granted: 0,
        message: `Card ${cardRef} was already logged — no second entry added.`,
      });
    }
    return NextResponse.json({
      ok: true,
      duplicate: false,
      granted: result.granted,
      message: `Logged card ${cardRef} — 1 entry added.`,
    });
  } catch (e) {
    // Reference the card, not the entrant — see the no-PII-in-logs rule.
    console.error(`Mail-in entry failed for card ${cardRef}`, e);
    return NextResponse.json({ ok: false, error: 'Could not log that card. Try again.' }, { status: 500 });
  }
}
