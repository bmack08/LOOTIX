import { FOOTER_COLS, COMPANY } from '@/lib/lootix';
import LootixWordmark from './LootixWordmark';

const socials = [
  {
    label: 'Instagram',
    href: COMPANY.socials.instagram,
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </>
    ),
    fill: 'none' as const,
  },
  {
    label: 'TikTok',
    href: COMPANY.socials.tiktok,
    path: <path d="M16 3c.3 2.3 1.8 4 4 4.3v3c-1.5 0-2.9-.5-4-1.3V15a6 6 0 11-6-6c.3 0 .7 0 1 .1v3.1A3 3 0 1013 15V3z" />,
    fill: 'currentColor' as const,
  },
  {
    label: 'Discord',
    href: COMPANY.socials.discord,
    path: <path d="M19 5.5A16 16 0 0015 4l-.2.4a12 12 0 015.5 0L19 5.5zM5 5.5L4.7 5a12 12 0 015.5 0L9 4a16 16 0 00-4 1.5zM8 14a1.4 1.4 0 110-2.8A1.4 1.4 0 018 14zm8 0a1.4 1.4 0 110-2.8A1.4 1.4 0 0116 14z" />,
    fill: 'currentColor' as const,
  },
];

export default function SiteFooter() {
  return (
    <footer className="bg-obsidian" style={{ borderTop: '1px solid rgba(255,255,255,.08)' }}>
      <div className="max-w-site mx-auto px-6 md:px-10 pt-16 pb-10 grid gap-10 grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-1">
          <div className="mb-[18px] text-cream">
            <LootixWordmark height={34} />
          </div>
          <p className="font-archivo text-[14px] leading-[1.6] text-muted-2 max-w-[280px] mb-[18px]">
            Fantasy streetwear, forged for the fearless. Cop the gear, win the loot.
          </p>
          <div className="flex gap-3 mb-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-[38px] h-[38px] rounded-lg grid place-items-center text-[#C9C4BA] transition-colors hover:text-gold hover:border-gold/40"
                style={{ border: '1px solid rgba(255,255,255,.12)' }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill={s.fill} stroke="currentColor" strokeWidth="1.7">
                  {s.path}
                </svg>
              </a>
            ))}
          </div>
          {/* Legal address — required for sweepstakes + CAN-SPAM */}
          <div className="font-mono text-[11.5px] leading-[1.7] text-faint">
            <div className="text-muted-2 font-semibold">{COMPANY.legalName}</div>
            <div>{COMPANY.location}</div>
            <a href={`mailto:${COMPANY.email}`} className="hover:text-gold transition-colors">{COMPANY.email}</a>
          </div>
        </div>

        {FOOTER_COLS.map((col) => (
          <div key={col.title}>
            <div className="font-mono text-[11px] tracking-[.16em] uppercase text-faint mb-4">{col.title}</div>
            <div className="flex flex-col gap-[11px]">
              {col.links.map((link) => (
                <a key={link.href} href={link.href} className="font-archivo text-[14px] text-[#C9C4BA] no-underline transition-colors hover:text-gold">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,.07)' }}>
        <div className="max-w-site mx-auto px-6 md:px-10 py-[22px] flex items-center justify-between gap-[18px] flex-wrap">
          <span className="font-mono text-[11.5px] text-faint tracking-[.04em]">© 2026 {COMPANY.legalName} · All rights reserved</span>
          <span className="font-mono text-[11px] text-[#5e5a52] tracking-[.04em] max-w-[620px] md:text-right">
            No purchase necessary. Void where prohibited. Open to legal residents 18+. Odds depend on number of entries. See{' '}
            <a href="/official-rules" className="underline hover:text-gold transition-colors">Official Rules</a> for the free entry method &amp; full details.
          </span>
        </div>
      </div>
    </footer>
  );
}
