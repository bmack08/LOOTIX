import { NextResponse } from 'next/server';
import { isAuthed } from '@/lib/admin';
import { runDraw } from '@/lib/raffle';
import { sendWinner } from '@/lib/email';
import { GIVEAWAY_PRIZE } from '@/lib/lootix';

export const runtime = 'nodejs';

export async function POST() {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: 'Not authorized.' }, { status: 401 });
  }
  const result = await runDraw(GIVEAWAY_PRIZE);
  if ('error' in result) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }
  await sendWinner(result.winner_email, result.prize);
  return NextResponse.json({ ok: true, draw: result });
}
