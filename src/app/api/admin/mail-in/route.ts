import { NextResponse } from 'next/server';
import { isAuthed } from '@/lib/admin';
import { logMailInEntry } from '@/lib/raffle';
import { GIVEAWAY, isEntryWindowOpen } from '@/lib/site';

export const runtime = 'nodejs';

/**
 * Admin-only mail-in card logging.
 *
 * Mail-in rows hold personal data (name, mailing address), so this route is
 * behind the admin check, refuses when Supabase isn't configured, and never
 * logs the submitted values. The public /api/subscribe endpoint cannot create
 * source='mail-in' rows at all.
 */
export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: 'Not authorized.' }, { status: 401 });
  }

  let body: {
    fullName?: string;
    email?: string;
    mailingAddress?: string;
    postmarkDate?: string;
    receivedDate?: string;
    confirmOutsideWindow?: boolean;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 });
  }

  const postmark = (body.postmarkDate || '').trim();

  // A card postmarked outside the entry window is not eligible. Warn and make
  // the admin confirm rather than silently logging an ineligible entry.
  if (postmark) {
    const postmarkMs = Date.parse(`${postmark}T12:00:00-04:00`);
    const inWindow = !Number.isNaN(postmarkMs) && isEntryWindowOpen(postmarkMs);
    if (!inWindow && !body.confirmOutsideWindow) {
      const reason = !GIVEAWAY.startISO || !GIVEAWAY.drawDateISO
        ? 'The giveaway dates are not set yet, so no postmark can be inside the entry window.'
        : 'That postmark date is outside the entry window.';
      return NextResponse.json(
        { ok: false, needsConfirm: true, error: `${reason} Log it anyway?` },
        { status: 409 },
      );
    }
  }

  const result = await logMailInEntry({
    fullName: body.fullName || '',
    email: body.email,
    mailingAddress: body.mailingAddress || '',
    postmarkDate: postmark,
    receivedDate: (body.receivedDate || '').trim(),
  });

  if ('error' in result) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }
  return NextResponse.json(
    { ok: true, entries: result.entries },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
