import Link from 'next/link';
import { COMPANY, FOOTER_COLS } from '@/lib/site';

const HAIR = '1px solid rgba(201,164,92,.12)';

const BADGES = [
  { label: 'Secure Stripe checkout', icon: <><path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4Z" /><path d="m9 12 2 2 4-4" /></>, box: '0 0 24 24' },
  { label: 'Live, verified draws', icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>, box: '0 0 24 24' },
  { label: 'No purchase necessary', icon: <path d="M1 3h18v2.4a2 2 0 0 0 0 3.2V11H1V8.6a2 2 0 0 0 0-3.2V3Z" />, box: '0 0 20 14' },
  { label: 'Ships worldwide', icon: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.5 3 14 0 18-3-4-3-14.5 0-18Z" /></>, box: '0 0 24 24' },
  { label: '18+ · Play responsibly', icon: <><path d="M12 3v18M5 8l7-5 7 5" /><circle cx="12" cy="14" r="4" /></>, box: '0 0 24 24' },
];

const SOCIALS = [
  { href: COMPANY.socials.instagram, label: 'Instagram', node: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>, fill: 'none' },
  { href: COMPANY.socials.tiktok, label: 'TikTok', node: <path d="M16 3c.4 2.4 1.9 3.9 4.3 4.1v2.8c-1.6.1-3-.4-4.3-1.3v6.6c0 4.2-3 6.2-6 6.2-2.7 0-5.5-1.9-5.5-5.4 0-3.6 3-5.6 6-5.4v2.9c-1.4-.2-3 .5-3 2.4 0 1.7 1.4 2.6 2.6 2.6 1.4 0 2.9-.8 2.9-3.3V3H16Z" />, fill: 'currentColor' },
  { href: COMPANY.socials.discord, label: 'Discord', node: <path d="M19 5.5A16 16 0 0 0 15.3 4l-.5 1a14 14 0 0 0-5.6 0L8.7 4A16 16 0 0 0 5 5.5C2.6 9 2 12.4 2.3 15.8A16 16 0 0 0 7 18l1-1.6a9 9 0 0 1-1.6-.8l.4-.3a11.4 11.4 0 0 0 10.4 0l.4.3c-.5.3-1 .6-1.6.8L17 18a16 16 0 0 0 4.7-2.2c.4-4-.6-7.4-2.7-10.3ZM9.3 13.7c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.7.8 1.6 1.8c0 1-.7 1.8-1.6 1.8Zm5.4 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8c0 1-.7 1.8-1.6 1.8Z" />, fill: 'currentColor' },
];

export default function SiteFooter() {
  return (
    <footer className="font-archivo" style={{ background: '#080604', borderTop: '1px solid rgba(201,164,92,.14)' }}>
      <div className="max-w-v2 mx-auto" style={{ padding: '0 32px' }}>
        {/* 5-badge trust strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5" style={{ borderBottom: HAIR }}>
          {BADGES.map((b, i) => (
            <div
              key={b.label}
              className="flex items-center justify-center gap-2.5 text-center"
              style={{ padding: '22px 12px', borderRight: i < BADGES.length - 1 ? HAIR : undefined }}
            >
              <svg width="16" height="16" viewBox={b.box} fill="none" stroke="#C9A45C" strokeWidth="1.5" className="flex-none">{b.icon}</svg>
              <span className="uppercase text-stone" style={{ fontSize: 11, letterSpacing: '.14em' }}>{b.label}</span>
            </div>
          ))}
        </div>

        {/* 4-col links */}
        <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]" style={{ padding: '56px 0 48px' }}>
          <div className="flex flex-col gap-[18px] items-start">
            <img src="/brand/site/logo.png" alt="Lootix Streetwear" style={{ height: 44 }} />
            <p className="m-0 text-stone" style={{ fontSize: 13.5, lineHeight: 1.7, maxWidth: 300 }}>
              Fantasy streetwear, forged for the fearless. Cop the gear. Win the vault.
            </p>
            <div className="flex gap-3.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-sand hover:text-linen transition-colors"
                  style={{ width: 36, height: 36, border: '1px solid rgba(201,164,92,.3)' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill={s.fill} stroke="currentColor" strokeWidth="1.6">{s.node}</svg>
                </a>
              ))}
            </div>
            <div className="text-ash" style={{ fontSize: 12, lineHeight: 1.8 }}>
              {COMPANY.legalName} · {COMPANY.location}
              <br />
              <a href={`mailto:${COMPANY.email}`} className="text-stone hover:text-linen transition-colors">{COMPANY.email}</a>
            </div>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <div className="font-cinzel uppercase text-brass" style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.2em', marginBottom: 20 }}>{col.title}</div>
              <div className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <Link key={l.label} href={l.href} className="text-sand hover:text-linen transition-colors" style={{ fontSize: 13.5 }}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Compliance fine print */}
        <div className="flex flex-col md:flex-row justify-between gap-8 items-start" style={{ borderTop: HAIR, padding: '24px 0 32px' }}>
          <div className="text-ash" style={{ fontSize: 11.5 }}>© 2026 {COMPANY.legalName}. All rights reserved. Earn it. Wear it. Loot it.</div>
          <div className="text-ash md:text-right" style={{ fontSize: 11.5, lineHeight: 1.7, maxWidth: 640 }}>
            No purchase necessary. A purchase will not increase your chances of winning. Void where prohibited. Open to legal residents 18+. Odds depend on the total number of eligible entries. See the{' '}
            <Link href="/official-rules" className="text-stone" style={{ borderBottom: '1px solid rgba(143,129,104,.4)' }}>Official Rules</Link>{' '}
            for the free entry method and full details.
          </div>
        </div>
      </div>
    </footer>
  );
}
