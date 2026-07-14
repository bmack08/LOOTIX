'use client';

import { useState } from 'react';

type Entrant = { email: string; entries: number };

export default function RecordWinnerForm({ entrants }: { entrants: Entrant[] }) {
  const [winner, setWinner] = useState('');
  const [note, setNote] = useState('');
  const [state, setState] = useState<'idle' | 'confirm' | 'saving' | 'done'>('idle');
  const [err, setErr] = useState('');
  const disabled = entrants.length === 0;

  function downloadCsv() {
    const rows = [['email', 'entries'], ...entrants.map((e) => [e.email, String(e.entries)])];
    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lootix-entrants.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  async function submit() {
    setState('saving');
    setErr('');
    const res = await fetch('/api/admin/draw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ winnerEmail: winner, method: 'third-party', note }),
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
        <div className="font-archivo font-black text-[22px] text-gold-bright break-all">{winner}</div>
        <div className="font-mono text-[11px] text-muted mt-1">Emailed &amp; site unlocked · refreshing…</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Step 1: hand the list to the independent drawer */}
      <div className="flex items-center gap-3 flex-wrap">
        <button onClick={downloadCsv} disabled={disabled} className="btn-outline-gold !py-[11px] disabled:opacity-50">
          ⬇ Download entrant list (CSV)
        </button>
        <span className="font-mono text-[11px] text-muted">Give this to your independent drawer / random service.</span>
      </div>

      {/* Step 2: record the winner they returned */}
      <div className="flex flex-col gap-2">
        <label className="font-mono text-[11px] tracking-[.12em] uppercase text-muted-2">Winning entrant (from the independent draw)</label>
        <select
          value={winner}
          onChange={(e) => setWinner(e.target.value)}
          disabled={disabled}
          className="rounded-btn px-4 py-3 font-archivo text-[15px] text-cream outline-none"
          style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.16)' }}
        >
          <option value="">— select the winner —</option>
          {entrants.map((e) => (
            <option key={e.email} value={e.email}>{e.email} ({e.entries} entries)</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-mono text-[11px] tracking-[.12em] uppercase text-muted-2">Proof / method note (optional)</label>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. random.org draw link, video URL, drawer's name"
          className="rounded-btn px-4 py-3 font-archivo text-[14px] text-cream outline-none"
          style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.16)' }}
        />
      </div>

      {state === 'confirm' ? (
        <div className="flex gap-3 flex-wrap items-center">
          <span className="font-archivo text-[13px] text-muted">Record <strong className="text-cream break-all">{winner}</strong> as the winner and email them?</span>
          <button onClick={submit} className="btn-gold !py-3">Yes, record it</button>
          <button onClick={() => setState('idle')} className="btn-ghost !py-3">Cancel</button>
        </div>
      ) : (
        <button
          onClick={() => { if (winner) setState('confirm'); else setErr('Select the winning entrant first.'); }}
          disabled={disabled || state === 'saving'}
          className="btn-gold !py-3 self-start disabled:opacity-50"
        >
          {state === 'saving' ? 'Recording…' : 'Record the winner'}
        </button>
      )}
      {disabled && <p className="font-mono text-[11px] text-muted">No entrants yet — nothing to draw.</p>}
      {err && <p className="font-mono text-[12px] text-[#e08a6b]">{err}</p>}
    </div>
  );
}
