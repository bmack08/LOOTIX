import type { Metadata } from 'next';
import ContentPage from '@/components/lootix/ContentPage';
import { HowItWorks, TrustStrip } from '@/components/lootix/sections';

export const metadata: Metadata = {
  title: 'About — Lootix',
  description: 'Lootix is dark-fantasy streetwear forged for the fearless — apparel with a gaming-and-mythology soul, where every order is an entry into the Loot Vault.',
};

export default function AboutPage() {
  return (
    <>
      <ContentPage
        eyebrow="The Guild"
        title="Forged for the fearless"
        subtitle="Dark-fantasy streetwear with a gaming-and-mythology soul — where every release feels like unlocking something."
      >
        <p className="lead">
          Lootix plays on <strong>loot</strong>: the reward, the rare drop, the thing worth questing for. We make apparel
          you&rsquo;d actually wear — heavyweight, high-contrast, mythic — and we back every order with a real shot at the vault.
        </p>

        <h2>Why we exist</h2>
        <p>
          Streetwear got safe and giveaways got shady. We wanted the opposite: gear that looks like a legendary item pulled
          from a boss fight, paired with giveaways that are transparent, independent, and actually paid out. No lazy prints.
          No fake winners. Cop the gear, win the loot.
        </p>

        <h2>What we believe</h2>
        <ul>
          <li><strong>Merch should feel like loot.</strong> Premium fabrics, clean prints, designs worth showing off.</li>
          <li><strong>Giveaways should be real.</strong> Clear Official Rules, an independent draw, winners announced publicly — and a free entry method on every giveaway.</li>
          <li><strong>The guild comes first.</strong> We build for people who game hard and live bold, and we talk to them like equals.</li>
        </ul>

        <h2>The launch vault</h2>
        <p>
          Our first drop puts <strong>$250 cash + a full merch bundle</strong> on the line. Every order earns entries, the
          free mail-in method keeps it open to everyone, and one winner takes it all. <a href="/giveaways">See the current giveaway →</a>
        </p>
      </ContentPage>

      <HowItWorks />
      <TrustStrip />
    </>
  );
}
