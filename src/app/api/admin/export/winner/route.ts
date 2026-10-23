import { NextResponse } from 'next/server';
import { isAuthed } from '@/lib/admin';
import { getLatestWinner, winnerMergeFields } from '@/lib/raffle';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Admin-only JSON export of the latest winner record, plus every merge field
 * the winner paperwork drafts expect, so the docs fill in without retyping.
 *
 * Personal data: admin check only, Cache-Control: no-store, never logged.
 * Contains NO SSN, tax ID, date of birth, or W-9 contents — w9_status is a
 * status only and the W-9 itself is handled outside this app.
 */
export async function GET() {
  const noStore = { 'Cache-Control': 'no-store' };

  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: 'Not authorized.' }, { status: 401, headers: noStore });
  }

  const winner = await getLatestWinner();
  if (!winner) {
    return NextResponse.json({ ok: false, error: 'No winner recorded yet.' }, { status: 404, headers: noStore });
  }

  return NextResponse.json(
    { ok: true, record: winner, merge_fields: winnerMergeFields(winner) },
    {
      headers: {
        ...noStore,
        'Content-Disposition': 'attachment; filename="lootix-winner.json"',
      },
    },
  );
}
