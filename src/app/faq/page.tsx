import type { Metadata } from 'next';
import ContentPage from '@/components/lootix/ContentPage';
import { EmailSection } from '@/components/lootix/sections';

export const metadata: Metadata = {
  title: 'FAQ — Lootix',
  description: 'Answers on how Lootix giveaways work — entries, the free no-purchase method, the independent draw, shipping, and prizes.',
};

const FAQS: { q: string; a: React.ReactNode }[] = [
  { q: 'How do the giveaways work?', a: <>Every order earns you entries into the current giveaway (up to 60× per order). When the draw closes, one winner is selected and announced publicly. You keep your gear either way.</> },
  { q: 'Do I have to buy anything to enter?', a: <>No. There&rsquo;s always a free mail-in / web entry method with the same odds — see the <a href="/official-rules">Official Rules</a>. No purchase is necessary to enter or win.</> },
  { q: 'What’s the current prize?', a: <>Our launch giveaway is <strong>$250 cash + a full Lootix merch bundle</strong> — the winner&rsquo;s pick from the launch drop.</> },
  { q: 'How is the winner chosen?', a: <>By an <strong>independent third party</strong> using a random draw weighted by entries — not by us. The draw is documented and the winner is announced publicly and paid fast.</> },
  { q: 'When is the draw?', a: <>Each giveaway runs to a set close date shown on the <a href="/giveaways">giveaways page</a> countdown. Entries apply to the giveaway live at the time of your order.</> },
  { q: 'Who can enter?', a: <>Open to legal residents 18+ (or the age of majority in your area), void where prohibited. Full eligibility is in the <a href="/official-rules">Official Rules</a>.</> },
  { q: 'How does shipping work?', a: <>Gear ships worldwide. Timelines and costs are on our <a href="/shipping">Shipping page</a>. Free shipping thresholds apply on select entry packs.</> },
  { q: 'Can I get a refund?', a: <>See our <a href="/returns">Returns &amp; Refunds</a> policy. Entries earned from an order may be affected by a refund per the Official Rules.</> },
];

export default function FaqPage() {
  return (
    <>
      <ContentPage
        eyebrow="Support"
        title="Frequently asked"
        subtitle="Everything on entries, the free method, the draw, and shipping. Still stuck? Email hello@getlootix.com."
      >
        {FAQS.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </ContentPage>
      <EmailSection />
    </>
  );
}
