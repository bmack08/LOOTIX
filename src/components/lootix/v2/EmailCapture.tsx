'use client';

import { useState } from 'react';

/**
 * Guild signup — lives on the inverted cream section.
 * Posts to /api/subscribe (Supabase-backed: grants entries + welcome email).
 */
export default function EmailCapture({ source = 'newsletter' }: { source?: string }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [err, setErr] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === 'loading' || state === 'done') return;
    setState('loading');
    setErr('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });
      const d = await res.json();
      if (res.ok && d.ok) setState('done');
      else { setState('error'); setErr(d.error || 'Something went wrong.'); }
    } catch {
      setState('error');
      setErr('Network error. Try again.');
    }
  }

  return (
    <form onSubmit={submit} noValidate className="w-full" style={{ maxWidth: 520 }}>
      <div className="flex gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          aria-label="Email address"
          disabled={state === 'done'}
          className="flex-1 font-plex outline-none"
          style={{ background: '#F2E9D2', border: '1px solid #171208', borderRadius: 2, padding: '15px 18px', fontSize: 14, color: '#171208' }}
        />
        <button
          type="submit"
          disabled={state === 'loading' || state === 'done'}
          className="font-archivo uppercase transition-colors"
          style={{
            background: '#171208',
            color: state === 'done' ? '#E6C57E' : '#E4D5B4',
            border: 'none',
            borderRadius: 2,
            padding: '15px 30px',
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: '0.12em',
            cursor: state === 'done' ? 'default' : 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {state === 'done' ? '✓ In the Guild' : state === 'loading' ? 'Claiming…' : 'Claim Entries'}
        </button>
      </div>
      {state === 'error' && <p className="font-plex mt-3" style={{ fontSize: 12, color: '#8a2c14' }} role="alert">{err}</p>}
    </form>
  );
}
