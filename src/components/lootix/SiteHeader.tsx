import Link from 'next/link';
import { NAV_LINKS, MARQUEE_ITEMS } from '@/lib/lootix';
import LootixWordmark from './LootixWordmark';
import MobileMenu from './MobileMenu';

function Wordmark() {
  return (
    <Link href="/" aria-label="Lootix — home" className="flex items-center no-underline text-cream transition-colors hover:text-gold">
      <LootixWordmark height={30} />
    </Link>
  );
}

export default function SiteHeader() {
  return (
    <>
      {/* ── Announcement marquee ── */}
      <div
        className="overflow-hidden whitespace-nowrap"
        style={{
          background: 'linear-gradient(90deg,#0a0a0b,#15110a,#0a0a0b)',
          borderBottom: '1px solid rgba(212,175,55,.22)',
        }}
      >
        <div className="inline-flex gap-10 py-[9px] animate-marquee font-mono text-[11px] tracking-[.26em] uppercase text-[#8f7536]">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* ── Sticky glass nav ── */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: 'rgba(10,10,11,.82)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(255,255,255,.07)',
        }}
      >
        <div className="max-w-site mx-auto px-6 md:px-10 h-[74px] flex items-center justify-between gap-6">
          <Wordmark />
          <nav className="hidden md:flex items-center gap-[34px]">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-archivo font-bold text-[12.5px] tracking-[.14em] uppercase text-[#C9C4BA] no-underline transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-[18px]">
            <a href="#" aria-label="Cart" className="relative text-[#C9C4BA] flex">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M5 9h14l1 12H4L5 9z M16 11V7a4 4 0 00-8 0v4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="absolute -top-[7px] -right-[8px] bg-gold text-obsidian font-mono font-bold text-[10px] w-[17px] h-[17px] rounded-full grid place-items-center">
                2
              </span>
            </a>
            <a href="/giveaways" className="btn-gold whitespace-nowrap hidden md:inline-flex !px-5 !py-[11px] !text-[12.5px] !tracking-[.1em] shadow-gold-btn-sm">
              Enter to Win
            </a>
            <MobileMenu />
          </div>
        </div>
      </header>
    </>
  );
}
