'use client';

import { useState } from 'react';

/**
 * Inline email capture (input + gold button, no gap, sharp corners).
 * Button flips to "✓ In the Guild" on success. Posts to /api/subscribe,
 * which grants entries + sends the welcome email.
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
    <form onSubmit={submit} noValidate>
      <div className="flex" style={{ maxWidth: 480, margin: '0 auto' }}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          aria-label="Email address"
          disabled={state === 'done'}
          className="flex-1 font-archivo text-linen outline-none focus:border-brass transition-colors"
          style={{
            background: '#0A0806',
            border: '1px solid rgba(201,164,92,.35)',
            borderRight: 'none',
            fontSize: 14,
            padding: '15px 18px',
          }}
        />
        <button
          type="submit"
          disabled={state === 'loading' || state === 'done'}
          className="font-archivo uppercase transition-colors"
          style={{
            background: state === 'done' ? '#E8DCC2' : '#C9A45C',
            border: 'none',
            color: '#14100A',
            fontSize: 12.5,
            fontWeight: 700,
            letterSpacing: '.14em',
            padding: '15px 26px',
            cursor: state === 'done' ? 'default' : 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {state === 'done' ? '✓ In the Guild' : state === 'loading' ? 'Claiming…' : 'Claim entries'}
        </button>
      </div>
      {state === 'error' && (
        <p className="text-center mt-3" style={{ fontSize: 12, color: '#e08a6b' }} role="alert">{err}</p>
      )}
    </form>
  );
}
