'use client';

import { useState } from 'react';

const FIELD = {
  background: 'rgba(255,255,255,.04)',
  border: '1px solid rgba(255,255,255,.16)',
} as const;

function Label({ children }: { children: React.ReactNode }) {
  return <label className="font-mono text-[11px] tracking-[.12em] uppercase text-muted-2">{children}</label>;
}

/**
 * Admin-only mail-in card logging. One card per envelope, one entry row worth
 * MAIL_IN_ENTRIES. If the postmark falls outside the entry window the server
 * replies 409 and we make the admin confirm before logging it.
 */
export default function MailInEntryForm({ entriesPerCard, disabled }: { entriesPerCard: number; disabled?: boolean }) {
  const [f, setF] = useState({
    fullName: '',
    email: '',
    mailingAddress: '',
    postmarkDate: '',
    receivedDate: '',
  });
  const [state, setState] = useState<'idle' | 'saving' | 'done'>('idle');
  const [err, setErr] = useState('');
  const [warning, setWarning] = useState('');
  const [saved, setSaved] = useState<{ entries: number; eligible: boolean } | null>(null);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((cur) => ({ ...cur, [k]: e.target.value }));

  async function save(confirmOutsideWindow: boolean) {
    setState('saving');
    setErr('');
    const res = await fetch('/api/admin/mail-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...f, confirmOutsideWindow }),
    });
    const d = await res.json().catch(() => ({}));
    if (res.ok && d.ok) {
      setSaved({ entries: Number(d.entries ?? 0), eligible: Boolean(d.eligible) });
      setState('done');
      setWarning('');
      setTimeout(() => window.location.reload(), 2200);
      return;
    }
    if (res.status === 409 && d.needsConfirm) {
      setWarning(d.error || 'That postmark is outside the entry window. Log it anyway?');
      setState('idle');
      return;
    }
    setErr(d.error || 'Could not log the card.');
    setState('idle');
  }

  if (state === 'done') {
    const eligible = saved?.eligible ?? false;
    return (
      <div
        className="rounded-card p-5 text-center"
        style={
          eligible
            ? { background: 'rgba(212,175,55,.1)', border: '1px solid rgba(212,175,55,.4)' }
            : { background: 'rgba(220,140,60,.08)', border: '1px solid rgba(220,140,60,.45)' }
        }
      >
        <div className="font-mono text-[11px] tracking-[.16em] uppercase" style={{ color: eligible ? undefined : '#e0a86b' }}>
          {eligible ? 'Card logged' : 'Card logged as ineligible'}
        </div>
        <div className="font-archivo font-black text-[20px]" style={{ color: eligible ? '#F0CE6B' : '#e0a86b' }}>
          {eligible ? `${saved?.entries ?? entriesPerCard} entries added` : '0 entries — postmark outside the entry window'}
        </div>
        {!eligible && (
          <div className="font-mono text-[11px] text-muted-2 mt-1">
            Kept on file for the paper trail; it cannot be drawn.
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label>Full name *</Label>
          <input value={f.fullName} onChange={set('fullName')} className="rounded-btn px-4 py-3 font-archivo text-[14px] text-cream outline-none" style={FIELD} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Email (optional)</Label>
          <input type="email" value={f.email} onChange={set('email')} className="rounded-btn px-4 py-3 font-archivo text-[14px] text-cream outline-none" style={FIELD} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Mailing address *</Label>
        <textarea
          value={f.mailingAddress}
          onChange={set('mailingAddress')}
          rows={3}
          className="rounded-btn px-4 py-3 font-archivo text-[14px] text-cream outline-none"
          style={FIELD}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label>Postmark date *</Label>
          <input type="date" value={f.postmarkDate} onChange={set('postmarkDate')} className="rounded-btn px-4 py-3 font-archivo text-[14px] text-cream outline-none" style={FIELD} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Received date *</Label>
          <input type="date" value={f.receivedDate} onChange={set('receivedDate')} className="rounded-btn px-4 py-3 font-archivo text-[14px] text-cream outline-none" style={FIELD} />
        </div>
      </div>

      {warning && (
        <div className="rounded-tier p-4 flex flex-col gap-3" style={{ background: 'rgba(220,140,60,.08)', border: '1px solid rgba(220,140,60,.45)' }}>
          <span className="font-archivo text-[13px]" style={{ color: '#e0a86b' }}>⚠ {warning}</span>
          <div className="flex gap-3 flex-wrap">
            <button onClick={() => save(true)} className="btn-gold !py-2.5">Yes, log it anyway</button>
            <button onClick={() => setWarning('')} className="btn-ghost !py-2.5">Cancel</button>
          </div>
        </div>
      )}

      {!warning && (
        <button
          onClick={() => save(false)}
          disabled={disabled || state === 'saving'}
          className="btn-gold !py-3 self-start disabled:opacity-50"
        >
          {state === 'saving' ? 'Logging…' : `Log card (${entriesPerCard} entries)`}
        </button>
      )}

      {err && <p className="font-mono text-[12px] text-[#e08a6b]">{err}</p>}
    </div>
  );
}
