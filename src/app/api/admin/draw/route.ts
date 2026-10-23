import { NextResponse } from 'next/server';
import { isAuthed } from '@/lib/admin';
import { recordWinner, updateWinner, pickWeightedEntry, W9_STATUSES, WINNER_STATUSES } from '@/lib/raffle';
import type { W9Status, WinnerStatus } from '@/lib/raffle';
import { sendWinner } from '@/lib/email';
import { GIVEAWAY_PRIZE } from '@/lib/lootix';

export const runtime = 'nodejs';

/**
 * Record / update the winner of a RANDOM.ORG draw. Admin-only; the payload and
 * the stored record are personal data and are never logged.
 */
export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: 'Not authorized.' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 });
  }

  // "preview": resolve a RANDOM.ORG number to an entry without saving anything,
  // so the admin can see who it landed on before committing.
  if (body.preview) {
    const picked = await pickWeightedEntry(Number(body.randomNumber));
    if ('error' in picked) {
      return NextResponse.json({ ok: false, error: picked.error }, { status: 400 });
    }
    return NextResponse.json(
      { ok: true, entry: picked.entry, totalEntries: picked.totalEntries },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const w9 = String(body.w9Status ?? 'not_needed') as W9Status;
  const status = String(body.status ?? 'notified') as WinnerStatus;

  const result = await recordWinner(GIVEAWAY_PRIZE, {
    fullName: String(body.fullName ?? ''),
    email: String(body.email ?? ''),
    phone: body.phone ? String(body.phone) : undefined,
    mailingAddress: String(body.mailingAddress ?? ''),
    shippingAddress: body.shippingAddress ? String(body.shippingAddress) : undefined,
    paypalEmail: body.paypalEmail ? String(body.paypalEmail) : undefined,
    hoodieSize: body.hoodieSize ? String(body.hoodieSize) : undefined,
    teeSize: body.teeSize ? String(body.teeSize) : undefined,
    drawVerificationUrl: body.drawVerificationUrl ? String(body.drawVerificationUrl) : undefined,
    randomNumber: body.randomNumber !== undefined && body.randomNumber !== '' ? Number(body.randomNumber) : undefined,
    expectedEntryId: body.expectedEntryId ? String(body.expectedEntryId) : undefined,
    alternateRank: body.alternateRank ? Number(body.alternateRank) : 1,
    notificationDate: body.notificationDate ? String(body.notificationDate) : undefined,
    attemptNumber: body.attemptNumber ? Number(body.attemptNumber) : 1,
    w9Status: W9_STATUSES.includes(w9) ? w9 : 'not_needed',
    status: WINNER_STATUSES.includes(status) ? status : 'notified',
    note: body.note ? String(body.note) : undefined,
  });

  if ('error' in result) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  // Only the primary winner gets the "you won" email; alternates are contacted
  // by hand, in rank order, as the ladder plays out.
  if (result.alternate_rank === 1) {
    await sendWinner(result.email, result.prize);
  }

  return NextResponse.json(
    { ok: true, draw: result },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}

/** Advance a winner record's claim status (notified → … → paid / forfeited). */
export async function PATCH(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: 'Not authorized.' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 });
  }

  const id = String(body.id ?? '');
  if (!id) return NextResponse.json({ ok: false, error: 'Missing record id.' }, { status: 400 });

  const patch: Parameters<typeof updateWinner>[1] = {};
  const status = String(body.status ?? '') as WinnerStatus;
  if (WINNER_STATUSES.includes(status)) patch.status = status;
  const w9 = String(body.w9Status ?? '') as W9Status;
  if (W9_STATUSES.includes(w9)) patch.w9_status = w9;
  if (body.paypalTransactionId !== undefined) patch.paypal_transaction_id = String(body.paypalTransactionId) || null;
  if (body.trackingNumber !== undefined) patch.tracking_number = String(body.trackingNumber) || null;
  if (body.hoodieSize !== undefined) patch.hoodie_size = String(body.hoodieSize) || null;
  if (body.teeSize !== undefined) patch.tee_size = String(body.teeSize) || null;
  if (body.attemptNumber !== undefined) patch.attempt_number = Math.min(3, Math.max(1, Number(body.attemptNumber)));
  if (body.note !== undefined) patch.note = String(body.note) || null;

  const result = await updateWinner(id, patch);
  if ('error' in result) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
}
