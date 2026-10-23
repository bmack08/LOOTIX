import { isAuthed, adminConfigured } from '@/lib/admin';
import { getStats, getEntrantTotals, listDraws, listMailInEntries, usingSupabase, NO_DB } from '@/lib/raffle';
import AdminLogin from '@/components/lootix/AdminLogin';
import RecordWinnerForm from '@/components/lootix/RecordWinnerForm';
import MailInEntryForm from '@/components/lootix/MailInEntryForm';
import WinnerMergeFields from '@/components/lootix/WinnerMergeFields';
import { MAIL_IN_ENTRIES, SIGNUP_ENTRIES, ENTRIES_LABEL } from '@/config/giveaway';
import { GIVEAWAY, isEntryWindowOpen } from '@/lib/site';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Lootix Admin', robots: { index: false, follow: false } };

const CARD = { background: '#111113', border: '1px solid rgba(255,255,255,.08)' } as const;

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-card p-6" style={CARD}>
      <div className="font-archivo font-black text-[34px] text-gold-bright tracking-[-.02em]">{value}</div>
      <div className="font-mono text-[11px] tracking-[.14em] uppercase text-muted-2 mt-1">{label}</div>
    </div>
  );
}

function Panel({ title, children, warm }: { title: string; children: React.ReactNode; warm?: boolean }) {
  return (
    <div
      className="rounded-card p-7 mb-10"
      style={
        warm
          ? { background: 'linear-gradient(165deg,#1a1610,#0d0d0e)', border: '1px solid rgba(212,175,55,.3)' }
          : CARD
      }
    >
      <h2 className="font-archivo font-extrabold uppercase text-cream text-[20px] mb-2">{title}</h2>
      {children}
    </div>
  );
}

export default async function AdminPage() {
  // No ADMIN_PASSWORD on the server → the admin area simply does not open.
  if (!adminConfigured()) {
    return (
      <div className="max-w-[640px] mx-auto px-6 py-24">
        <div className="rounded-card p-7" style={{ background: 'rgba(220,140,60,.07)', border: '1px solid rgba(220,140,60,.4)' }}>
          <h1 className="font-archivo font-black uppercase text-cream text-[22px] mb-3">Admin is disabled</h1>
          <p className="font-archivo text-[14px] text-muted m-0">
            <code className="text-cream">ADMIN_PASSWORD</code> is not set on the server, so there is no admin login. Set it in the
            environment and redeploy. There is no default password.
          </p>
        </div>
      </div>
    );
  }

  if (!(await isAuthed())) return <AdminLogin />;

  const live = usingSupabase();
  const [stats, entrants, draws, mailIn] = await Promise.all([
    getStats(),
    getEntrantTotals(),
    listDraws(),
    listMailInEntries(),
  ]);
  const latestWinner = draws[0] ?? null;
  const windowOpen = isEntryWindowOpen();

  return (
    <div className="max-w-[900px] mx-auto px-6 md:px-10 py-16">
      <div className="flex items-end justify-between gap-4 flex-wrap mb-8">
        <div>
          <div className="lx-eyebrow mb-2">Lootix Admin</div>
          <h1 className="font-archivo font-black uppercase text-cream text-[34px] leading-none">The Vault</h1>
        </div>
        <span className="font-mono text-[11px] tracking-[.1em] uppercase" style={{ color: live ? '#C9A94A' : '#8E8A82' }}>
          {live ? '● Live · Supabase' : '○ Dev mode · local file'}
        </span>
      </div>

      {/* Entry window + rates, so the numbers on screen are never a mystery */}
      <div className="rounded-tier px-5 py-4 mb-8 flex flex-col gap-1" style={CARD}>
        <span className="font-mono text-[11px] tracking-[.12em] uppercase" style={{ color: windowOpen ? '#C9A94A' : '#e0a86b' }}>
          {windowOpen ? '● Entry window OPEN' : '○ Entry window CLOSED — no entries are being created'}
        </span>
        <span className="font-mono text-[11px] text-muted-2">
          Start {GIVEAWAY.startISO ?? 'not set'} · End {GIVEAWAY.endDateISO ?? 'not set'} · Draw{' '}
          {GIVEAWAY.drawDateISO ?? 'not set'}
        </span>
        <span className="font-mono text-[11px] text-muted-2">
          {ENTRIES_LABEL} · mail-in {MAIL_IN_ENTRIES}/card · sign-up {SIGNUP_ENTRIES} once per email
        </span>
      </div>

      {!live && (
        <div className="rounded-card p-5 mb-10" style={{ background: 'rgba(220,140,60,.07)', border: '1px solid rgba(220,140,60,.4)' }}>
          <p className="font-archivo text-[13.5px] m-0" style={{ color: '#e0a86b' }}>
            ⚠ {NO_DB} Mail-in logging and winner records are disabled until then — they hold personal data and are never written to
            local files.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <Stat label="Subscribers" value={stats.subscriberCount.toLocaleString()} />
        <Stat label="Entrants" value={stats.entrantCount.toLocaleString()} />
        <Stat label="Total Entries" value={stats.totalEntries.toLocaleString()} />
        <Stat label="Mail-in Cards" value={stats.mailInCount.toLocaleString()} />
      </div>

      {/* Mail-in logging */}
      <Panel title={`Log a mail-in card (${MAIL_IN_ENTRIES} entries)`}>
        <p className="font-archivo text-[14px] text-muted mb-5 max-w-[620px]">
          One card per envelope, {MAIL_IN_ENTRIES} entries each, no cap on envelopes. If the postmark falls outside the entry
          window you&rsquo;ll be warned and asked to confirm before it is logged.
        </p>
        <MailInEntryForm entriesPerCard={MAIL_IN_ENTRIES} disabled={!live} />
      </Panel>

      {/* Draw control */}
      <Panel title="Record the RANDOM.ORG draw" warm>
        <p className="font-archivo text-[14px] text-muted mb-5 max-w-[620px]">
          Download the weighted entrant list, then generate one number from 1 to{' '}
          <strong className="text-cream">{stats.totalEntries.toLocaleString()}</strong> on RANDOM.ORG while recording your screen.
          Paste the number and the result URL below — a row worth 129 entries occupies 129 numbers, so the odds match the entry
          counts exactly. Record the winner, and the record carries every merge field the paperwork needs.
        </p>
        <RecordWinnerForm totalEntries={stats.totalEntries} disabled={!live} />
      </Panel>

      {/* Latest winner record + merge fields */}
      {latestWinner && (
        <Panel title="Latest winner record">
          <div className="grid gap-x-8 gap-y-2 md:grid-cols-2 font-mono text-[12px] mb-5">
            {[
              ['Name', latestWinner.full_name],
              ['Status', latestWinner.status],
              ['Alternate rank', String(latestWinner.alternate_rank)],
              ['Attempt', `${latestWinner.attempt_number} of 3`],
              ['Notified', latestWinner.notification_date ?? '—'],
              ['Response deadline', latestWinner.response_deadline ?? '—'],
              ['W-9', latestWinner.w9_status],
              ['Drawn from', `${latestWinner.total_entries.toLocaleString()} entries`],
              ['Random number', latestWinner.random_number !== null ? String(latestWinner.random_number) : '—'],
              ['Entry', `${latestWinner.entry_method ?? '—'} · ${latestWinner.entry_id ?? '—'}`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4" style={{ borderBottom: '1px solid rgba(255,255,255,.05)', paddingBottom: 4 }}>
                <span className="text-muted-2">{k}</span>
                <span className="text-cream text-right break-all">{v}</span>
              </div>
            ))}
          </div>
          {latestWinner.draw_verification_url && (
            <a
              href={latestWinner.draw_verification_url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-gold font-mono text-[11px] block mb-4"
            >
              Draw verification → {latestWinner.draw_verification_url}
            </a>
          )}
          <WinnerMergeFields />
        </Panel>
      )}

      {/* Past draws */}
      {draws.length > 0 && (
        <div className="mb-10">
          <h2 className="font-archivo font-extrabold uppercase text-cream text-[18px] mb-4">All winner records</h2>
          <div className="flex flex-col gap-2">
            {draws.map((d, i) => (
              <div key={d.id ?? i} className="flex items-center justify-between gap-4 rounded-tier px-4 py-3" style={CARD}>
                <div>
                  <div className="font-archivo font-bold text-[14px] text-cream">
                    {d.full_name}
                    {d.alternate_rank > 1 && <span className="text-muted-2"> · alternate #{d.alternate_rank}</span>}
                  </div>
                  <div className="font-mono text-[11px] text-muted-2">
                    {new Date(d.drawn_at).toLocaleString()} · {d.prize}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[11px] text-gold-label">{d.total_entries.toLocaleString()} entries</div>
                  <div className="font-mono text-[10.5px] text-muted-2 uppercase">{d.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mail-in log */}
      <h2 className="font-archivo font-extrabold uppercase text-cream text-[18px] mb-4">Mail-in cards ({mailIn.length})</h2>
      <div className="rounded-card overflow-hidden mb-10" style={{ border: '1px solid rgba(255,255,255,.08)' }}>
        {mailIn.length === 0 && <div className="p-6 font-archivo text-[14px] text-muted">No mail-in cards logged yet.</div>}
        {mailIn.map((m, i) => (
          <div key={m.id} className="flex items-start justify-between gap-4 px-5 py-3" style={{ background: i % 2 ? '#0e0e10' : '#111113', borderTop: i ? '1px solid rgba(255,255,255,.05)' : 'none' }}>
            <div className="min-w-0">
              <div className="font-archivo text-[14px] text-cream truncate">{m.fullName}</div>
              <div className="font-mono text-[11px] text-muted-2 truncate">{m.email || 'no email'}</div>
              <div className="font-mono text-[11px] text-muted-2">
                Postmarked {m.postmarkDate || '—'} · received {m.receivedDate || '—'}
              </div>
            </div>
            <span className="font-mono text-[12px] text-gold-bright whitespace-nowrap">
              {m.entries ? `${m.entries} entries` : 'voided'}
            </span>
          </div>
        ))}
      </div>

      {/* Entrants */}
      <div className="flex items-end justify-between gap-4 flex-wrap mb-4">
        <h2 className="font-archivo font-extrabold uppercase text-cream text-[18px] m-0">Entrants ({entrants.length})</h2>
        <a href="/api/admin/export/entrants" className="link-gold font-mono text-[11px]">⬇ Entrant CSV</a>
      </div>
      <div className="rounded-card overflow-hidden" style={{ border: '1px solid rgba(255,255,255,.08)' }}>
        {entrants.length === 0 && <div className="p-6 font-archivo text-[14px] text-muted">No entrants yet.</div>}
        {entrants.map((e, i) => (
          <div key={e.entrant} className="flex items-center justify-between gap-4 px-5 py-3" style={{ background: i % 2 ? '#0e0e10' : '#111113', borderTop: i ? '1px solid rgba(255,255,255,.05)' : 'none' }}>
            <span className="font-archivo text-[14px] text-cream truncate">{e.email || e.name || e.entrant}</span>
            <span className="font-mono text-[12px] text-gold-bright whitespace-nowrap">{e.entries.toLocaleString()} entries</span>
          </div>
        ))}
      </div>
    </div>
  );
}
