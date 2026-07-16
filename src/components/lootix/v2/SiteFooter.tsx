import Link from 'next/link';
import { COMPANY, FOOTER_COLS } from '@/lib/site';

const HAIR = '1px solid rgba(198,161,91,0.16)';

export default function SiteFooter() {
  return (
    <footer style={{ padding: '72px 24px 40px', background: '#0C0A07' }}>
      <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]" style={{ paddingBottom: 48, borderBottom: HAIR }}>
        <div className="flex flex-col gap-[18px]">
          <img src="/brand/v2/logo-clean.png" alt="Lootix Streetwear" style={{ height: 48, width: 130, objectFit: 'contain', objectPosition: 'left' }} />
          <p className="m-0 text-stone" style={{ fontSize: 14, lineHeight: 1.65, maxWidth: 280 }}>
            This isn&rsquo;t just streetwear. This is your story. This is your loot.
          </p>
          <div className="flex gap-4 font-plex" style={{ fontSize: 12, letterSpacing: '0.08em' }}>
            <a href={COMPANY.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-brass hover:text-brass-lit transition-colors">Instagram</a>
            <a href={COMPANY.socials.tiktok} target="_blank" rel="noopener noreferrer" className="text-brass hover:text-brass-lit transition-colors">TikTok</a>
            <a href={COMPANY.socials.discord} target="_blank" rel="noopener noreferrer" className="text-brass hover:text-brass-lit transition-colors">Discord</a>
          </div>
          <span className="font-plex text-ash" style={{ fontSize: 11, lineHeight: 1.7 }}>
            {COMPANY.legalName} · {COMPANY.location}
            <br />
            <a href={`mailto:${COMPANY.email}`} className="text-ash hover:text-brass-lit transition-colors">{COMPANY.email}</a>
          </span>
        </div>

        {FOOTER_COLS.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <span className="font-plex uppercase text-stone" style={{ fontSize: 11, letterSpacing: '0.16em', marginBottom: 6 }}>{col.title}</span>
            {col.links.map((l) => (
              <Link key={l.label} href={l.href} className="text-sand hover:text-brass-lit transition-colors" style={{ fontSize: 14 }}>
                {l.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center gap-6 flex-wrap" style={{ paddingTop: 28 }}>
        <span className="font-plex text-ash" style={{ fontSize: 11 }}>© 2026 {COMPANY.legalName} · All rights reserved</span>
        <span className="text-ash" style={{ fontSize: 11, lineHeight: 1.7, maxWidth: 640 }}>
          No purchase necessary. Void where prohibited. Open to legal residents 18+. Odds depend on number of entries. See{' '}
          <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link> for the free entry method &amp; full details.
        </span>
      </div>
    </footer>
  );
}
