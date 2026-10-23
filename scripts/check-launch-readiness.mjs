#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────
// Pre-launch readiness check for Lootix.
//
// Run it with:  npm run check:launch
//
// Read-only and offline on purpose: it opens source files as TEXT, never
// imports the app, never touches the network, and never reads .env or any
// other credential file. It is NOT wired into build/prebuild — it is a thing
// the owner runs before flipping the switch.
//
// It answers four questions:
//   01  Are the giveaway dates set, well-formed, and in the right order?
//   02  Is any copy placeholder still sitting in the shipped source?
//   03  Does Stripe checkout have shipping rates configured?
//   04  What close time is the public copy printing right now?
//
// Exit code 1 if anything FAILed, 0 otherwise. WARN never fails the run.
// ─────────────────────────────────────────────────────────────

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const SITE_TS = 'src/lib/site.ts';
const GIVEAWAY_TS = 'src/config/giveaway.ts';
const CHECKOUT_TS = 'src/app/api/checkout/route.ts';
const OFFICIAL_RULES_TS = 'src/app/official-rules/page.tsx';

/** Directories never worth scanning: vendored reference code and build output. */
const SKIP_DIRS = new Set(['reference', 'node_modules', '.next', '.git', 'photos']);
const SCAN_EXTENSIONS = ['.ts', '.tsx'];

const results = [];
const pass = (name, detail) => results.push({ status: 'PASS', name, detail, lines: [] });
const fail = (name, detail, lines = []) => results.push({ status: 'FAIL', name, detail, lines });
const warn = (name, detail, lines = []) => results.push({ status: 'WARN', name, detail, lines });

/** Read a repo file as text. Returns null if it is not there. */
function readRepoFile(relPath) {
  try {
    return readFileSync(join(ROOT, relPath), 'utf8');
  } catch {
    return null;
  }
}

/** 1-indexed line number of a character offset. */
function lineOf(text, index) {
  return text.slice(0, index).split('\n').length;
}

// ═══════════════ 01 · GIVEAWAY DATES ═══════════════
//
// src/lib/site.ts is the single source for every giveaway date. Each date is
// an Eastern-time ISO string WITH the offset (-04:00 EDT / -05:00 EST) so the
// close is pinned to an ET wall-clock time wherever the server runs.

const ET_OFFSET = /(-04:00|-05:00)$/;
const DATE_FIELDS = ['startISO', 'endDateISO', 'drawDateISO'];

/**
 * Pull the GIVEAWAY object literal out of site.ts and read each date field.
 * We slice to the literal first so the TYPE declaration above it
 * ("startISO: string | null;") can never be mistaken for a value.
 */
function readGiveawayDates(text) {
  const literal = text.match(/export const GIVEAWAY[\s\S]*?\}\s*=\s*\{([\s\S]*?)\n\};/);
  const body = literal ? literal[1] : text;
  const out = {};
  for (const field of DATE_FIELDS) {
    const m = body.match(new RegExp(`\\b${field}\\s*:\\s*(null|'([^']*)'|"([^"]*)")`));
    if (!m) out[field] = { present: false };
    else if (m[1] === 'null') out[field] = { present: true, value: null };
    else out[field] = { present: true, value: m[2] ?? m[3] };
  }
  return out;
}

function checkDates() {
  const text = readRepoFile(SITE_TS);
  if (text === null) {
    fail('Giveaway dates', `Could not read ${SITE_TS}.`);
    return;
  }

  const dates = readGiveawayDates(text);
  const problems = [];
  const parsed = {};

  for (const field of DATE_FIELDS) {
    const entry = dates[field];
    if (!entry.present) {
      problems.push(`${field}: not found in ${SITE_TS} — has the GIVEAWAY object been renamed?`);
      continue;
    }
    if (entry.value === null) {
      problems.push(`${field}: still null — the owner has not set this date.`);
      continue;
    }
    const ms = Date.parse(entry.value);
    if (Number.isNaN(ms)) {
      problems.push(`${field}: '${entry.value}' is not a valid ISO date.`);
      continue;
    }
    if (!ET_OFFSET.test(entry.value)) {
      problems.push(`${field}: '${entry.value}' has no Eastern offset — it must end in -04:00 (EDT) or -05:00 (EST).`);
      continue;
    }
    parsed[field] = ms;
  }

  // Ordering, only for the pairs that both parsed cleanly.
  if (parsed.startISO !== undefined && parsed.endDateISO !== undefined && parsed.endDateISO <= parsed.startISO) {
    problems.push('endDateISO must be AFTER startISO — the entry window would be empty or inverted.');
  }
  if (parsed.endDateISO !== undefined && parsed.drawDateISO !== undefined && parsed.drawDateISO < parsed.endDateISO) {
    problems.push('drawDateISO must NOT be before endDateISO — the draw happens on or after the close.');
  }

  const summary = DATE_FIELDS
    .map((f) => `${f}=${dates[f].present ? JSON.stringify(dates[f].value) : '<missing>'}`)
    .join('  ');

  if (problems.length) {
    fail('Giveaway dates', `${SITE_TS} — ${summary}`, problems);
  } else {
    pass('Giveaway dates', `${SITE_TS} — ${summary}`);
  }
}

// ═══════════════ 02 · COPY PLACEHOLDERS ═══════════════

/** Exact bracket tokens Legal / the owner still has to fill in. */
const NAMED_PLACEHOLDERS = [
  '[start date]', '[end date]', '[START DATE]', '[END DATE]',
  '[RECEIPT DEADLINE]',
  '[HOODIE NAME]', '[HOODIE ARV]', '[TEE NAME]', '[TEE ARV]',
  '[TOTAL VALUE TBD]',
  '[Harford County]',
];

/** Open questions parked in the source for a professional to answer. */
const PREFIXED_PLACEHOLDERS = [
  { label: '[COUNSEL: ...]', re: /\[COUNSEL\b[^\]]*\]/g },
  { label: '[CPA ...]', re: /\[CPA\b[^\]]*\]/g },
  { label: 'TODO(CPA)', re: /TODO\(CPA\)/g },
];

/**
 * A bracket token that reads like a COPY placeholder rather than code.
 *
 * Group 1 is the character before "[" — we require it to be anything EXCEPT an
 * identifier character, ")" or "]". That single rule throws out every indexer
 * and member access: arr[0], ENTRY_GRANTS[SUBSCRIBE_SOURCE], Foo<T>[K],
 * fn()[0]. A real placeholder sits in prose, so it follows a space, a quote,
 * a dash or the start of the line.
 *
 * Group 2 is the content: it must START with an uppercase letter and contain
 * only uppercase letters, digits, spaces, underscores and hyphens, with at
 * least 3 characters total. That throws out:
 *   · Tailwind arbitrary values  — [7px] [90vh] [#F6D87E] [.18em] [-4px]
 *     (digit/#/./- first, or lowercase units)
 *   · lowercase destructuring    — [theme, setTheme] [i] [number]
 *   · array literals and types   — ['All', 'Tees'], string[]
 *   · single-letter generics     — [T] [K]
 * and keeps [TOTAL VALUE TBD], [RECEIPT DEADLINE], [HOODIE ARV], [SOME_TOKEN].
 */
const GENERIC_BRACKET = /(^|[^A-Za-z0-9_$)\]])\[([A-Z][A-Z0-9 _-]{2,})\]/gm;

/**
 * The numeric blanks Legal left in the Official Rules — "[3] alternates",
 * "[30] days", "[6] months". Scoped to that one file on purpose: bare [3] is
 * an array index everywhere else.
 */
const RULE_NUMBER_BRACKET = /(^|[^A-Za-z0-9_$)\]])\[(3|6|30)\]/gm;

/** Every .ts/.tsx file under src/, skipping vendored and generated trees. */
function collectSourceFiles(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) collectSourceFiles(full, out);
    else if (SCAN_EXTENSIONS.some((ext) => entry.endsWith(ext))) out.push(full);
  }
  return out;
}

function checkPlaceholders() {
  const files = collectSourceFiles(join(ROOT, 'src'));
  if (!files.length) {
    fail('Copy placeholders', 'No .ts/.tsx files found under src/ — is this the right directory?');
    return;
  }

  const hits = [];
  const seen = new Set();
  const record = (relPath, line, token) => {
    const key = `${relPath}:${line}:${token}`;
    if (seen.has(key)) return;
    seen.add(key);
    hits.push({ relPath, line, token });
  };

  for (const full of files) {
    const relPath = relative(ROOT, full).split(sep).join('/');
    let text;
    try {
      text = readFileSync(full, 'utf8');
    } catch {
      continue;
    }

    for (const token of NAMED_PLACEHOLDERS) {
      let from = 0;
      for (;;) {
        const i = text.indexOf(token, from);
        if (i === -1) break;
        record(relPath, lineOf(text, i), token);
        from = i + token.length;
      }
    }

    for (const { re } of PREFIXED_PLACEHOLDERS) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(text)) !== null) record(relPath, lineOf(text, m.index), m[0]);
    }

    GENERIC_BRACKET.lastIndex = 0;
    let m;
    while ((m = GENERIC_BRACKET.exec(text)) !== null) {
      record(relPath, lineOf(text, m.index + m[1].length), `[${m[2]}]`);
    }

    if (relPath === OFFICIAL_RULES_TS) {
      RULE_NUMBER_BRACKET.lastIndex = 0;
      while ((m = RULE_NUMBER_BRACKET.exec(text)) !== null) {
        record(relPath, lineOf(text, m.index + m[1].length), `[${m[2]}]`);
      }
    }
  }

  hits.sort((a, b) => a.relPath.localeCompare(b.relPath) || a.line - b.line);

  if (hits.length) {
    fail(
      'Copy placeholders',
      `${hits.length} placeholder${hits.length === 1 ? '' : 's'} still in src/ (${files.length} files scanned).`,
      hits.map((h) => `${h.relPath}:${h.line}  ${h.token}`),
    );
  } else {
    pass('Copy placeholders', `None left in src/ (${files.length} files scanned).`);
  }
}

// ═══════════════ 03 · STRIPE SHIPPING RATES ═══════════════

function checkShippingRates() {
  const text = readRepoFile(CHECKOUT_TS);
  if (text === null) {
    fail('Stripe shipping rates', `Could not read ${CHECKOUT_TS}.`);
    return;
  }

  // shipping_address_collection only asks the buyer WHERE to ship. What costs
  // money is shipping_options / shipping_rate — that is what we look for.
  const configured = /shipping_options|shipping_rate/.test(text);
  const threshold = readFreeShippingThreshold();

  if (configured) {
    pass('Stripe shipping rates', `${CHECKOUT_TS} configures shipping_options / shipping_rate.`);
  } else {
    fail('Stripe shipping rates', `${CHECKOUT_TS} sets no shipping_options / shipping_rate.`, [
      `Owner decision: pick a shipping rate for orders under $${threshold}.`,
      `US shipping is advertised as free at $${threshold}+ (FREE_SHIPPING_THRESHOLD in ${GIVEAWAY_TS}),`,
      'so every order below that needs a rate the buyer actually pays at checkout.',
      'Today checkout collects a US shipping address but charges nothing for shipping.',
    ]);
  }
}

function readFreeShippingThreshold() {
  const text = readRepoFile(GIVEAWAY_TS);
  const m = text && text.match(/FREE_SHIPPING_THRESHOLD\s*=\s*(\d+)/);
  return m ? m[1] : '<unknown>';
}

// ═══════════════ 04 · CLOSE TIME LABEL ═══════════════

function checkCloseTimeLabel() {
  const text = readRepoFile(GIVEAWAY_TS);
  if (text === null) {
    warn('Entry close time', `Could not read ${GIVEAWAY_TS}.`);
    return;
  }
  const m = text.match(/GIVEAWAY_CLOSE_TIME_LABEL\s*=\s*'([^']*)'|GIVEAWAY_CLOSE_TIME_LABEL\s*=\s*"([^"]*)"/);
  const label = m ? (m[1] ?? m[2]) : null;

  if (!label) {
    warn('Entry close time', `GIVEAWAY_CLOSE_TIME_LABEL not found in ${GIVEAWAY_TS}.`);
    return;
  }

  // Informational by design: the value is a live owner decision, not a defect.
  // This never fails the run.
  warn('Entry close time', `Public copy prints "${label}" (GIVEAWAY_CLOSE_TIME_LABEL in ${GIVEAWAY_TS}).`, [
    "Owner decision pending: keep 8:00 PM ET, or move to Legal's 11:59:59 p.m. ET.",
    `If it moves, change BOTH the label in ${GIVEAWAY_TS} and GIVEAWAY.endDateISO in ${SITE_TS}.`,
  ]);
}

// ═══════════════ RUN ═══════════════

checkDates();
checkPlaceholders();
checkShippingRates();
checkCloseTimeLabel();

console.log('');
console.log('Lootix — pre-launch readiness');
console.log('═'.repeat(72));

for (const r of results) {
  console.log('');
  console.log(`[${r.status}] ${r.name} — ${r.detail}`);
  for (const line of r.lines) console.log(`        ${line}`);
}

const failed = results.filter((r) => r.status === 'FAIL');
const warned = results.filter((r) => r.status === 'WARN');
const passed = results.filter((r) => r.status === 'PASS');

console.log('');
console.log('═'.repeat(72));
console.log(`Summary: ${passed.length} passed, ${failed.length} failed, ${warned.length} warning(s).`);
if (failed.length) {
  console.log('NOT READY TO LAUNCH — resolve the FAIL items above.');
  for (const r of failed) console.log(`  · ${r.name}`);
} else {
  console.log('All checks passed. Review the warnings before launching.');
}
console.log('');

process.exit(failed.length ? 1 : 0);
