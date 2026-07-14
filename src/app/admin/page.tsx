import { isAuthed } from '@/lib/admin';
import { getStats, getEntrantTotals, listDraws, usingSupabase } from '@/lib/raffle';
import AdminLogin from '@/components/lootix/AdminLogin';
import RunDrawButton from '@/components/lootix/RunDrawButton';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Lootix Admin', robots: { index: false, follow: false } };

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-card p-6" style={{ background: '#111113', border: '1px solid rgba(255,255,255,.08)' }}>
      <div className="font-archivo font-black text-[34px] text-gold-bright tracking-[-.02em]">{value}</div>
      <div className="font-mono text-[11px] tracking-[.14em] uppercase text-muted-2 mt-1">{label}</div>
    </div>
  );
}

export default async function AdminPage() {
  if (!(await isAuthed())) return <AdminLogin />;

  const [stats, entrants, draws] = await Promise.all([getStats(), getEntrantTotals(), listDraws()]);

  return (
    <div className="max-w-[900px] mx-auto px-6 md:px-10 py-16">
      <div className="flex items-end justify-between gap-4 flex-wrap mb-8">
        <div>
          <div className="lx-eyebrow mb-2">Lootix Admin</div>
          <h1 className="font-archivo font-black uppercase text-cream text-[34px] leading-none">The Vault</h1>
        </div>
        <span className="font-mono text-[11px] tracking-[.1em] uppercase" style={{ color: usingSupabase() ? '#C9A94A' : '#8E8A82' }}>
          {usingSupabase() ? '● Live · Supabase' : '○ Dev mode · local file'}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        <Stat label="Subscribers" value={stats.subscriberCount.toLocaleString()} />
        <Stat label="Entrants" value={stats.entrantCount.toLocaleString()} />
        <Stat label="Total Entries" value={stats.totalEntries.toLocaleString()} />
      </div>

      {/* Draw control */}
      <div className="rounded-card p-7 mb-10" style={{ background: 'linear-gradient(165deg,#1a1610,#0d0d0e)', border: '1px solid rgba(212,175,55,.3)' }}>
        <h2 className="font-archivo font-extrabold uppercase text-cream text-[20px] mb-2">Run the launch draw</h2>
        <p className="font-archivo text-[14px] text-muted mb-5 max-w-[520px]">
          Picks one winner at random, weighted by each entrant&rsquo;s entry count. Records the draw and emails the winner. The homepage vault auto-unlocks with the result.
        </p>
        <RunDrawButton disabled={stats.totalEntries <= 0} />
      </div>

      {/* Past draws */}
      {draws.length > 0 && (
        <div className="mb-10">
          <h2 className="font-archivo font-extrabold uppercase text-cream text-[18px] mb-4">Past draws</h2>
          <div className="flex flex-col gap-2">
            {draws.map((d, i) => (
              <div key={i} className="flex items-center justify-between gap-4 rounded-tier px-4 py-3" style={{ background: '#111113', border: '1px solid rgba(255,255,255,.08)' }}>
                <div>
                  <div className="font-archivo font-bold text-[14px] text-cream">{d.winner_email}</div>
                  <div className="font-mono text-[11px] text-muted-2">{new Date(d.created_at).toLocaleString()} · {d.prize}</div>
                </div>
                <div className="font-mono text-[11px] text-gold-label">{d.total_entries.toLocaleString()} entries</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Entrants */}
      <h2 className="font-archivo font-extrabold uppercase text-cream text-[18px] mb-4">Entrants ({entrants.length})</h2>
      <div className="rounded-card overflow-hidden" style={{ border: '1px solid rgba(255,255,255,.08)' }}>
        {entrants.length === 0 && <div className="p-6 font-archivo text-[14px] text-muted">No entrants yet.</div>}
        {entrants.map((e, i) => (
          <div key={e.email} className="flex items-center justify-between gap-4 px-5 py-3" style={{ background: i % 2 ? '#0e0e10' : '#111113', borderTop: i ? '1px solid rgba(255,255,255,.05)' : 'none' }}>
            <span className="font-archivo text-[14px] text-cream truncate">{e.email}</span>
            <span className="font-mono text-[12px] text-gold-bright whitespace-nowrap">{e.entries.toLocaleString()} entries</span>
          </div>
        ))}
      </div>
    </div>
  );
}
