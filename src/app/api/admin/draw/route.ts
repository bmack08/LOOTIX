import { NextResponse } from 'next/server';
import { isAuthed } from '@/lib/admin';
import { recordExternalDraw } from '@/lib/raffle';
import { sendWinner } from '@/lib/email';
import { GIVEAWAY_PRIZE } from '@/lib/lootix';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: 'Not authorized.' }, { status: 401 });
  }
  let body: { winnerEmail?: string; method?: string; note?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 });
  }

  const result = await recordExternalDraw(
    GIVEAWAY_PRIZE,
    body.winnerEmail || '',
    body.method || 'third-party',
    body.note,
  );
  if ('error' in result) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }
  await sendWinner(result.winner_email, result.prize);
  return NextResponse.json({ ok: true, draw: result });
}
