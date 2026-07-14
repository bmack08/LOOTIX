import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cart — Lootix',
  description: 'Review your Lootix cart and check out.',
};

export default function CartPage() {
  return (
    <section className="max-w-site mx-auto px-6 md:px-10 py-24">
      <div className="max-w-[520px] mx-auto text-center">
        <div className="w-24 h-24 rounded-full grid place-items-center mx-auto mb-8" style={{ background: '#111113', border: '1px solid rgba(255,255,255,.08)' }}>
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#8E8A82" strokeWidth="1.5">
            <path d="M5 9h14l1 12H4L5 9z M16 11V7a4 4 0 00-8 0v4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="font-archivo font-black uppercase text-cream m-0 mb-3" style={{ fontSize: 'clamp(30px,4vw,44px)', letterSpacing: '-.02em' }}>Your cart is empty</h1>
        <p className="font-archivo text-[16px] text-muted mb-8">Cop legendary gear and every order stacks entries into the Loot Vault.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/shop" className="btn-gold">Shop the Drop</Link>
          <Link href="/giveaways" className="btn-ghost">Enter to Win</Link>
        </div>
        <div className="mt-12 rounded-tier p-5" style={{ background: 'rgba(212,175,55,.06)', border: '1px solid rgba(212,175,55,.2)' }}>
          <p className="font-archivo text-[14px] text-muted m-0">
            Every order earns entries into the current giveaway.{' '}
            <Link href="/how-it-works" className="text-gold-label underline hover:text-gold-bright transition-colors">See how it works</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
