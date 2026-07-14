import Reveal from './Reveal';

/**
 * Shared shell for content + legal pages in the obsidian & gold theme.
 * Renders a centered page hero, then a max-width prose column. Wrap page
 * body in elements styled by `.lx-prose` (h2/h3/p/ul/a/strong...).
 */
export default function ContentPage({
  eyebrow,
  title,
  subtitle,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="relative overflow-hidden" style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(70% 120% at 50% 0%,rgba(212,175,55,.10),transparent 60%)' }} />
        <div className="relative max-w-[820px] mx-auto px-6 md:px-10 pt-20 pb-12 text-center">
          <Reveal>
            <div className="lx-eyebrow mb-4">{eyebrow}</div>
            <h1 className="font-archivo font-black uppercase text-cream m-0" style={{ fontSize: 'clamp(38px,5.4vw,64px)', lineHeight: 0.96, letterSpacing: '-.03em' }}>{title}</h1>
            {subtitle && <p className="font-archivo text-[17px] text-muted max-w-[560px] mx-auto mt-4">{subtitle}</p>}
            {updated && <p className="font-mono text-[11px] tracking-[.14em] uppercase text-faint mt-5">Last updated · {updated}</p>}
          </Reveal>
        </div>
      </section>

      <section className="max-w-[820px] mx-auto px-6 md:px-10 py-16">
        <div className="lx-prose">{children}</div>
      </section>
    </>
  );
}
