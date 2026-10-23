import { isAuthed } from '@/lib/admin';
import { NextResponse } from 'next/server';
import { getLedger, listMailInEntries } from '@/lib/raffle';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Admin-only entrant CSV: one row per live entry row, weighted by `entries`,
 * including mail-in cards. Voided rows (refund / chargeback) are excluded by
 * getLedger, so what you download is exactly what feeds the draw.
 *
 * Mail-in rows carry a name and address, so this is personal data: admin check
 * only, Cache-Control: no-store, and nothing is written to the logs.
 */
function csvCell(v: unknown): string {
  return `"${String(v ?? '').replace(/"/g, '""')}"`;
}

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json(
      { ok: false, error: 'Not authorized.' },
      { status: 401, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const [ledger, mailIn] = await Promise.all([getLedger(), listMailInEntries()]);
  const addressById = new Map(mailIn.map((m) => [m.id, m]));

  const header = [
    'entry_id',
    'entrant',
    'name',
    'email',
    'entry_method',
    'entries',
    'entry_date',
    'order_ref',
    'postmark_date',
    'received_date',
  ];

  // Cumulative range so a RANDOM.ORG number maps straight to a row.
  const rows: string[] = [[...header, 'range_from', 'range_to'].map(csvCell).join(',')];
  let cursor = 0;
  for (const e of ledger) {
    const card = addressById.get(e.entry_id);
    const from = cursor + 1;
    cursor += e.entries;
    rows.push(
      [
        e.entry_id,
        e.entrant,
        e.name,
        e.email,
        e.entry_method,
        e.entries,
        e.entry_date,
        e.order_ref,
        card?.postmarkDate ?? '',
        card?.receivedDate ?? '',
        from,
        cursor,
      ]
        .map(csvCell)
        .join(','),
    );
  }
  rows.push('');
  rows.push([csvCell('TOTAL ENTRIES'), csvCell(cursor)].join(','));

  return new NextResponse(rows.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="lootix-entrants.csv"',
      'Cache-Control': 'no-store',
    },
  });
}
