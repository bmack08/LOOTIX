// Size charts per blank, from Printful's size guides (read-only snapshot in
// printful-blanks.json, refreshed by scripts/printful-blanks.mjs).
// Printful gives flat widths; Chest = pit-to-pit width x 2.

import BLANKS from './printful-blanks.json';

type Unit = 'in' | 'cm';
export type SizeChartRow = { label: string; values: Record<Unit, Record<string, string>> };
export type SizeChart =
  | { kind: 'table'; sizes: string[]; rows: SizeChartRow[] }
  | { kind: 'one-size'; note: string }
  | { kind: 'none' };

type Raw = { label: string; values: Record<string, string> };
type RawChart = { inches?: { measurements: Raw[] }[]; cm?: { measurements: Raw[] }[] };
const blanks = (BLANKS as unknown as { blanks: Record<string, { sizeChart?: RawChart | null }> }).blanks;

function num(v: string): number {
  // "18 1/2", "28.25", "20\t"
  const t = v.replace(/\s+/g, ' ').trim();
  const m = /^(\d+(?:\.\d+)?)(?: (\d+)\/(\d+))?$/.exec(t);
  if (!m) return NaN;
  return Number(m[1]) + (m[2] ? Number(m[2]) / Number(m[3]) : 0);
}

function fmt(n: number, unit: Unit): string {
  if (!Number.isFinite(n)) return '\u2013';
  return unit === 'in' ? String(Math.round(n * 4) / 4).replace(/\.0+$/, '') : String(Math.round(n));
}

const ROWS: { from: RegExp; label: string; times: number }[] = [
  { from: /^(width|chest)$/i, label: 'Chest', times: 2 },
  { from: /^length$/i, label: 'Body length', times: 1 },
  { from: /^sleeve length$/i, label: 'Sleeve', times: 1 },
];

export function sizeChartFor(blankId: number, sizes: readonly string[] | null): SizeChart {
  const raw = blanks[String(blankId)]?.sizeChart;
  const inch = raw?.inches?.[0]?.measurements;
  const cm = raw?.cm?.[0]?.measurements;
  if (!inch?.length || !cm?.length) return { kind: 'none' };
  if (!sizes) {
    const a = inch.find((m) => m.label === 'A')?.values;
    const b = cm.find((m) => m.label === 'A')?.values;
    const ai = a && Object.values(a)[0];
    const ac = b && Object.values(b)[0];
    return { kind: 'one-size', note: ai && ac ? `Fits head sizes ${ai.trim()} in (${ac.trim()} cm).` : '' };
  }
  const rows: SizeChartRow[] = [];
  for (const r of ROWS) {
    const i = inch.find((m) => r.from.test(m.label.trim()));
    const c = cm.find((m) => r.from.test(m.label.trim()));
    if (!i || !c) continue;
    const row: SizeChartRow = { label: r.label, values: { in: {}, cm: {} } };
    for (const s of sizes) {
      row.values.in[s] = fmt(num(i.values[s] ?? '') * r.times, 'in');
      row.values.cm[s] = fmt(num(c.values[s] ?? '') * r.times, 'cm');
    }
    rows.push(row);
  }
  return rows.length ? { kind: 'table', sizes: [...sizes], rows } : { kind: 'none' };
}
