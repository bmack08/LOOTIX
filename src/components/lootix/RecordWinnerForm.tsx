'use client';

import { useState } from 'react';

const FIELD = {
  background: 'rgba(255,255,255,.04)',
  border: '1px solid rgba(255,255,255,.16)',
} as const;

function Label({ children }: { children: React.ReactNode }) {
  return <label className="font-mono text-[11px] tracking-[.12em] uppercase text-muted-2">{children}</label>;
}

type PreviewEntry = {
  entry_id: string;
  entrant: string;
  name: string;
  email: string;
  entry_method: string;
  entries: number;
  entry_date: string;
};

/**
 * Record the winner of a RANDOM.ORG draw.
 *
 * The flow mirrors how the draw actually runs:
 *   1. download the weighted entrant CSV (server-side, admin-only),
 *   2. generate one integer in 1…total entries on RANDOM.ORG while recording
 *      the screen, and paste the number + the result URL here,
 *   3. preview which entry that number landed on, then fill in the winner's
 *      details and save the record.
 *
 * Every field here is personal data and is sent straight to the admin API —
 * nothing is logged, and there are no SSN / tax ID / DOB / W-9 content fields.
 */
export default function RecordWinnerForm({ totalEntries, disabled }: { totalEntries: number; disabled?: boolean }) {
  const [randomNumber, setRandomNumber] = useState('');
  const [preview, setPreview] = useState<PreviewEntry | null>(null);
  const [f, setF] = useState({
    fullName: '',
    email: '',
    phone: '',
    mailingAddress: '',
    shippingAddress: '',
    paypalEmail: '',
    hoodieSize: '',
    teeSize: '',
    drawVerificationUrl: '',
    alternateRank: '1',
    notificationDate: '',
    attemptNumber: '1',
    w9Status: 'not_needed',
    note: '',
  });
  const [state, setState] = useState<'idle' | 'confirm' | 'saving' | 'done'>('idle');
  const [err, setErr] = useState('');

  const noEntries = totalEntries <= 0;
  const blocked = disabled || noEntries;

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF((cur) => ({ ...cur, [k]: e.target.value }));

  async function runPreview() {
    setErr('');
    setPreview(null);
    const res = await fetch('/api/admin/draw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preview: true, randomNumber }),
    });
    const d = await res.json().catch(() => ({}));
    if (res.ok && d.ok) {
      setPreview(d.entry);
      // Pre-fill what the ledger already knows.
      setF((cur) => ({ ...cur, email: cur.email || d.entry.email || '', fullName: cur.fullName || d.entry.name || '' }));
    } else {
      setErr(d.error || 'Could not resolve that number.');
    }
  }

  async function submit() {
    setState('saving');
    setErr('');
    const res = await fetch('/api/admin/draw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...f, randomNumber: randomNumber || undefined }),
    });
    const d = await res.json().catch(() => ({}));
    if (res.ok && d.ok) {
      setState('done');
      setTimeout(() => window.location.reload(), 2200);
    } else {
      setErr(d.error || 'Could not record the winner.');
      setState('idle');
    }
  }

  if (state === 'done') {
    return (
      <div className="rounded-card p-5 text-center" style={{ background: 'rgba(212,175,55,.1)', border: '1px solid rgba(212,175,55,.4)' }}>
        <div className="font-mono text-[11px] tracking-[.16em] uppercase text-gold-label mb-1">Winner recorded</div>
        <div className="font-archivo font-black text-[22px] text-gold-bright break-all">{f.fullName}</div>
        <div className="font-mono text-[11px] text-muted mt-1">Emailed &amp; site unlocked · refreshing…</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Step 1 — the weighted entrant list */}
      <div className="flex items-center gap-3 flex-wrap">
        <a href="/api/admin/export/entrants" className="btn-outline-gold !py-[11px]">⬇ Download entrant list (CSV)</a>
        <span className="font-mono text-[11px] text-muted">
          {noEntries ? 'No entries yet — nothing to draw.' : `${totalEntries.toLocaleString()} entries · one row per entry, with its number range.`}
        </span>
      </div>

      {/* Step 2 — the RANDOM.ORG result */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label>RANDOM.ORG number (1–{Math.max(1, totalEntries).toLocaleString()})</Label>
          <div className="flex gap-2">
            <input
              type="number"
              min={1}
              max={Math.max(1, totalEntries)}
              value={randomNumber}
              onChange={(e) => setRandomNumber(e.target.value)}
              disabled={blocked}
              className="flex-1 rounded-btn px-4 py-3 font-archivo text-[14px] text-cream outline-none"
              style={FIELD}
            />
            <button onClick={runPreview} disabled={blocked || !randomNumber} className="btn-ghost !py-3 disabled:opacity-50">
              Resolve
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Draw verification URL (RANDOM.ORG result page)</Label>
          <input
            value={f.drawVerificationUrl}
            onChange={set('drawVerificationUrl')}
            placeholder="https://www.random.org/..."
            className="rounded-btn px-4 py-3 font-archivo text-[14px] text-cream outline-none"
            style={FIELD}
          />
        </div>
      </div>

      {preview && (
        <div className="rounded-tier p-4 flex flex-col gap-1" style={{ background: 'rgba(212,175,55,.08)', border: '1px solid rgba(212,175,55,.35)' }}>
          <span className="font-mono text-[10.5px] tracking-[.14em] uppercase text-gold-label">That number lands on</span>
          <span className="font-archivo font-bold text-[15px] text-cream break-all">{preview.email || preview.name || preview.entrant}</span>
          <span className="font-mono text-[11px] text-muted">
            {preview.entry_method} · {preview.entries.toLocaleString()} entries · entry {preview.entry_id}
          </span>
        </div>
      )}

      {/* Step 3 — the winner record */}
      <div style={{ height: 1, background: 'rgba(255,255,255,.08)' }} />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label>Full name *</Label>
          <input value={f.fullName} onChange={set('fullName')} className="rounded-btn px-4 py-3 font-archivo text-[14px] text-cream outline-none" style={FIELD} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Email *</Label>
          <input type="email" value={f.email} onChange={set('email')} className="rounded-btn px-4 py-3 font-archivo text-[14px] text-cream outline-none" style={FIELD} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Phone</Label>
          <input value={f.phone} onChange={set('phone')} className="rounded-btn px-4 py-3 font-archivo text-[14px] text-cream outline-none" style={FIELD} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>PayPal email (payout)</Label>
          <input type="email" value={f.paypalEmail} onChange={set('paypalEmail')} className="rounded-btn px-4 py-3 font-archivo text-[14px] text-cream outline-none" style={FIELD} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label>Mailing address *</Label>
          <textarea value={f.mailingAddress} onChange={set('mailingAddress')} rows={3} className="rounded-btn px-4 py-3 font-archivo text-[14px] text-cream outline-none" style={FIELD} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Shipping address (if different)</Label>
          <textarea value={f.shippingAddress} onChange={set('shippingAddress')} rows={3} className="rounded-btn px-4 py-3 font-archivo text-[14px] text-cream outline-none" style={FIELD} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="flex flex-col gap-2">
          <Label>Hoodie size</Label>
          <input value={f.hoodieSize} onChange={set('hoodieSize')} className="rounded-btn px-4 py-3 font-archivo text-[14px] text-cream outline-none" style={FIELD} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Tee size</Label>
          <input value={f.teeSize} onChange={set('teeSize')} className="rounded-btn px-4 py-3 font-archivo text-[14px] text-cream outline-none" style={FIELD} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Alternate rank (1 = winner)</Label>
          <input type="number" min={1} value={f.alternateRank} onChange={set('alternateRank')} className="rounded-btn px-4 py-3 font-archivo text-[14px] text-cream outline-none" style={FIELD} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Attempt (1–3)</Label>
          <input type="number" min={1} max={3} value={f.attemptNumber} onChange={set('attemptNumber')} className="rounded-btn px-4 py-3 font-archivo text-[14px] text-cream outline-none" style={FIELD} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label>Notification date (deadline = +7 days)</Label>
          <input type="date" value={f.notificationDate} onChange={set('notificationDate')} className="rounded-btn px-4 py-3 font-archivo text-[14px] text-cream outline-none" style={FIELD} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>W-9 status (status only — never the form itself)</Label>
          <select value={f.w9Status} onChange={set('w9Status')} className="rounded-btn px-4 py-3 font-archivo text-[14px] text-cream outline-none" style={FIELD}>
            <option value="not_needed">Not needed</option>
            <option value="requested">Requested</option>
            <option value="received">Received</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Proof / method note</Label>
        <input
          value={f.note}
          onChange={set('note')}
          placeholder="e.g. screen recording URL, who ran the draw"
          className="rounded-btn px-4 py-3 font-archivo text-[14px] text-cream outline-none"
          style={FIELD}
        />
      </div>

      {state === 'confirm' ? (
        <div className="flex gap-3 flex-wrap items-center">
          <span className="font-archivo text-[13px] text-muted">
            Record <strong className="text-cream break-all">{f.fullName || f.email}</strong> as
            {Number(f.alternateRank) > 1 ? ` alternate #${f.alternateRank}` : ' the winner'}
            {Number(f.alternateRank) > 1 ? '' : ' and email them'}?
          </span>
          <button onClick={submit} className="btn-gold !py-3">Yes, record it</button>
          <button onClick={() => setState('idle')} className="btn-ghost !py-3">Cancel</button>
        </div>
      ) : (
        <button
          onClick={() => {
            if (!f.fullName.trim()) return setErr("Enter the winner's full name.");
            if (!f.email.trim()) return setErr("Enter the winner's email.");
            if (!f.mailingAddress.trim()) return setErr('Enter the mailing address.');
            setErr('');
            setState('confirm');
          }}
          disabled={blocked || state === 'saving'}
          className="btn-gold !py-3 self-start disabled:opacity-50"
        >
          {state === 'saving' ? 'Recording…' : 'Record the winner'}
        </button>
      )}

      {noEntries && <p className="font-mono text-[11px] text-muted">No entries yet — nothing to draw.</p>}
      {err && <p className="font-mono text-[12px] text-[#e08a6b]">{err}</p>}
    </div>
  );
}
