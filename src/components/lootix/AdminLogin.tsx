'use client';

import { useState } from 'react';

export default function AdminLogin() {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    });
    if (res.ok) {
      window.location.reload();
    } else {
      const d = await res.json().catch(() => ({}));
      setErr(d.error || 'Wrong password.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] grid place-items-center px-6">
      <form onSubmit={submit} className="w-full max-w-[360px] rounded-card p-8" style={{ background: '#111113', border: '1px solid rgba(255,255,255,.08)' }}>
        <div className="lx-eyebrow mb-3">Lootix Admin</div>
        <h1 className="font-archivo font-black uppercase text-cream text-[26px] mb-6">Vault control</h1>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Admin password"
          className="w-full rounded-btn px-4 py-3 font-archivo text-[15px] text-cream outline-none mb-3"
          style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.16)' }}
        />
        {err && <p className="font-mono text-[12px] text-[#e08a6b] mb-3">{err}</p>}
        <button type="submit" disabled={loading} className="btn-gold w-full !py-3 disabled:opacity-70">
          {loading ? 'Checking…' : 'Enter'}
        </button>
      </form>
    </div>
  );
}
