/**
 * CSV building for admin exports.
 *
 * Kept free of Next and node:fs imports so it can be unit-tested directly —
 * see src/lib/csv.test.ts.
 */

/**
 * Quote one CSV field and defuse spreadsheet formula injection.
 *
 * Excel, Google Sheets and LibreOffice evaluate a cell that begins with
 * = + - @ (or a leading tab / CR) as a formula. Entrant emails are supplied by
 * strangers on the internet, so an address like `=HYPERLINK("http://evil",...)`
 * would execute when the admin opens the export — the classic CSV injection
 * path to data exfiltration. Prefixing with an apostrophe keeps the value
 * readable but inert.
 */
export function csvCell(value: unknown): string {
  const raw = value === null || value === undefined ? '' : String(value);
  const dangerous = /^[=+\-@\t\r]/.test(raw);
  const text = dangerous ? `'${raw}` : raw;
  return `"${text.replace(/"/g, '""')}"`;
}

/**
 * Build a CSV document.
 *
 * Emits CRLF line endings and a UTF-8 BOM, which is what Excel on Windows
 * needs to open the file as UTF-8 rather than the local codepage — without it,
 * non-ASCII names arrive mangled.
 */
export function toCsv(headers: string[], rows: unknown[][]): string {
  const lines = [headers.map(csvCell).join(','), ...rows.map((r) => r.map(csvCell).join(','))];
  return '﻿' + lines.join('\r\n') + '\r\n';
}
