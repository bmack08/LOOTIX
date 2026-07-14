'use client';

import { useState } from 'react';

export default function RunDrawButton({ disabled }: { disabled?: boolean }) {
  const [state, setState] = useState<'idle' | 'confirm' | 'running' | 'done'>('idle');
  const [result, setResult] = useState<{ winner_email: string; total_entries: number } | null>(null);
  const [err, setErr] = useState('');

  async function run() {
    setState('running');
    setErr('');
    const res = await fetch('/api/admin/draw', { method: 'POST' });
    const d = await res.json().catch(() => ({}));
    if (res.ok && d.ok) {
      setResult(d.draw);
      setState('done');
      setTimeout(() => window.location.reload(), 2500);
    } else {
      setErr(d.error || 'Draw failed.');
      setState('idle');
    }
  }

  if (state === 'done' && result) {
    return (
      <div className="rounded-card p-5 text-center" style={{ background: 'rgba(212,175,55,.1)', border: '1px solid rgba(212,175,55,.4)' }}>
        <div className="font-mono text-[11px] tracking-[.16em] uppercase text-gold-label mb-1">Winner drawn</div>
        <div className="font-archivo font-black text-[22px] text-gold-bright">{result.winner_email}</div>
        <div className="font-mono text-[11px] text-muted mt-1">from {result.total_entries.toLocaleString()} entries · refreshing…</div>
      </div>
    );
  }

  return (
    <div>
      {state === 'confirm' ? (
        <div className="flex gap-3 flex-wrap">
          <button onClick={run} className="btn-gold !py-3">Yes — draw the winner</button>
          <button onClick={() => setState('idle')} className="btn-ghost !py-3">Cancel</button>
        </div>
      ) : (
        <button
          onClick={() => setState('confirm')}
          disabled={disabled || state === 'running'}
          className="btn-gold !py-3 disabled:opacity-50"
        >
          {state === 'running' ? 'Drawing…' : 'Run the draw'}
        </button>
      )}
      {disabled && <p className="font-mono text-[11px] text-muted mt-2">No entries yet — nothing to draw.</p>}
      {err && <p className="font-mono text-[12px] text-[#e08a6b] mt-2">{err}</p>}
    </div>
  );
}
