import { isAuthed } from '@/lib/admin';
import { NextResponse } from 'next/server';
import { listDraws, getEntrantTotals } from '@/lib/raffle';
import { toCsv } from '@/lib/csv';

export const runtime = 'nodejs';

/**
 * CSV export for the admin. Admin only.
 *
 *   /api/admin/export?type=winners   → the recorded draws
 *   /api/admin/export?type=entrants  → entrant list for the independent drawer
 *
 * NO SSN, TIN or other tax-identifier column is exported, by design. Prize
 * winners may still need to file a W-9 for a prize over the IRS reporting
 * threshold, but that paperwork belongs in whatever the sponsor uses for tax
 * records — not in a CSV that gets emailed to a drawing service or opened on a
 * laptop. Do not add one here. Adding a tax-ID column would also pull this
 * file into a different compliance class than "a list of entrants".
 */

function csvResponse(filename: string, body: string): Response {
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      // An entrant list is PII — keep it out of every cache.
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

export async function GET(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: 'Not authorized.' }, { status: 401 });
  }

  const type = new URL(req.url).searchParams.get('type') || 'winners';
  const stamp = new Date().toISOString().slice(0, 10);

  if (type === 'entrants') {
    const totals = await getEntrantTotals();
    const csv = toCsv(
      ['email', 'entries'],
      totals.map((t) => [t.email, t.entries]),
    );
    console.log(`Admin exported entrant list (${totals.length} rows)`);
    return csvResponse(`lootix-entrants-${stamp}.csv`, csv);
  }

  if (type === 'winners') {
    const draws = await listDraws();
    const csv = toCsv(
      ['prize', 'winner_email', 'total_entries', 'entrant_count', 'method', 'drawn_at'],
      draws.map((d) => [
        d.prize,
        d.winner_email,
        d.total_entries,
        d.entrant_count,
        (d as { method?: string }).method ?? 'third-party',
        d.created_at,
      ]),
    );
    console.log(`Admin exported winner list (${draws.length} rows)`);
    return csvResponse(`lootix-winners-${stamp}.csv`, csv);
  }

  return NextResponse.json(
    { ok: false, error: 'Unknown export type. Use ?type=winners or ?type=entrants.' },
    { status: 400 },
  );
}
