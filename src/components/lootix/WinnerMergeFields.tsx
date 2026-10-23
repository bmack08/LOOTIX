'use client';

import { useState } from 'react';

/**
 * Admin-only "copy merge fields" button for a winner record, so the winner
 * paperwork drafts fill in without retyping.
 *
 * The fields are fetched on click from /api/admin/export/winner (admin check,
 * Cache-Control: no-store) rather than embedded in the page HTML. Nothing is
 * logged, and the payload carries no SSN / tax ID / DOB / W-9 contents.
 */
export default function WinnerMergeFields() {
  const [state, setState] = useState<'idle' | 'loading' | 'copied' | 'error'>('idle');
  const [err, setErr] = useState('');

  async function copy() {
    setState('loading');
    setErr('');
    try {
      const res = await fetch('/api/admin/export/winner', { cache: 'no-store' });
      const d = await res.json();
      if (!res.ok || !d.ok) throw new Error(d.error || 'Could not load the record.');
      await navigator.clipboard.writeText(JSON.stringify(d.merge_fields, null, 2));
      setState('copied');
      setTimeout(() => setState('idle'), 2500);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Could not copy.');
      setState('error');
    }
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <button onClick={copy} disabled={state === 'loading'} className="btn-outline-gold !py-[11px] disabled:opacity-50">
        {state === 'loading' ? 'Loading…' : state === 'copied' ? '✓ Merge fields copied' : '⧉ Copy merge fields'}
      </button>
      <a href="/api/admin/export/winner" className="link-gold font-mono text-[11px]">⬇ Download winner JSON</a>
      {state === 'error' && <span className="font-mono text-[11px] text-[#e08a6b]">{err}</span>}
    </div>
  );
}
