import type { Metadata } from 'next';
import { GiveawayBar, GrandPrizeShowcase, PrizeVault, TrustStrip, EmailSection } from '@/components/lootix/sections';

export const metadata: Metadata = {
  title: 'Giveaways — Lootix',
  description: 'Enter the Lootix Loot Vault. Every order stacks entries across every live giveaway — $250 cash + a free merch bundle. No purchase necessary.',
};

export default function GiveawaysPage() {
  return (
    <>
      <GiveawayBar />
      <GrandPrizeShowcase />
      <PrizeVault />
      <TrustStrip />
      <EmailSection />
    </>
  );
}
