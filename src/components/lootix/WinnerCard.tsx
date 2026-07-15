import type { Draw } from '@/lib/raffle';

// Privacy-safe handle when no real name is collected: "wi•••@example.com"
function maskEmail(email: string) {
  const [local, domain] = email.split('@');
  return `${local.slice(0, 2)}${'•'.repeat(Math.max(3, local.length - 2))}@${domain ?? ''}`;
}

/**
 * Featured winner card — the "gaming setup / battlestation" angle from the
 * strategy brief. The left panel is an IMAGE SLOT designed to be filled by a
 * generated (Higgsfield) winner-setup image at `/brand/winners/latest.*`;
 * until one exists it shows an on-brand placeholder. Right panel holds the
 * verified winner details, ready to drop in name / city / prize / date.
 */
export default function WinnerCard({
  winner,
  image,
  name,
  location,
}: {
  winner: Draw;
  image?: string;       // e.g. '/brand/winners/latest.jpg' once generated
  name?: string;        // e.g. 'Marcus R.' once collected; falls back to masked email
  location?: string;    // e.g. 'Austin, TX'
}) {
  const displayName = name || maskEmail(winner.winner_email);
  const date = new Date(winner.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="lx-card grid md:grid-cols-2 mb-10" style={{ border: '1px solid rgba(212,175,55,.35)' }}>
      {/* IMAGE SLOT — winner's setup / battlestation (Higgsfield-ready) */}
      <div
        className="relative min-h-[260px] md:min-h-[340px] grid place-items-center overflow-hidden"
        style={
          image
            ? { backgroundImage: `url('${image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : { background: 'radial-gradient(90% 90% at 50% 30%, rgba(212,175,55,.14), #0d0d0e)' }
        }
      >
        <span className="absolute top-4 left-4 badge-solid" style={{ letterSpacing: '.18em' }}>Winner&rsquo;s Setup</span>
        {!image && (
          <div className="text-center px-6">
            <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#C9A94A" strokeWidth="1.4" className="mx-auto mb-3">
              <rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" strokeLinecap="round" />
            </svg>
            <div className="font-mono text-[11px] tracking-[.16em] uppercase text-muted-2">Battlestation photo drops here</div>
          </div>
        )}
      </div>

      {/* DETAILS */}
      <div className="p-8 md:p-10 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-4">
          <span className="lx-eyebrow" style={{ letterSpacing: '.22em' }}>Latest Winner</span>
          <span className="inline-flex items-center gap-[5px] font-mono text-[10px] tracking-[.08em] uppercase text-gold-label">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A94A" strokeWidth="2.6"><path d="M5 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Verified
          </span>
        </div>

        <div className="font-archivo font-black uppercase text-cream tracking-[-.02em] break-all" style={{ fontSize: 34, lineHeight: 1 }}>{displayName}</div>
        {location && <div className="font-mono text-[12px] text-muted-2 mt-2">{location}</div>}

        <div className="font-archivo font-black text-gold-bright tracking-[-.02em] mt-5" style={{ fontSize: 24 }}>{winner.prize}</div>
        <div className="font-mono text-[12px] text-muted mt-2">
          Drawn {date} · from {winner.total_entries.toLocaleString()} entries · independent draw
        </div>

        <a href="/how-it-works" className="link-gold mt-7 self-start">How the draw works →</a>
      </div>
    </div>
  );
}
