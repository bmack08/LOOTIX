import type { Metadata } from 'next';
import { getLatestWinner } from '@/lib/raffle';
import { WinnersVault, EmailSection } from '@/components/lootix/sections';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Winners — Lootix',
  description: 'Every Lootix draw is independent and every winner announced publicly. See who claimed the Loot Vault — the next name could be yours.',
};

export default async function WinnersPage() {
  const winner = await getLatestWinner();
  return (
    <>
      <WinnersVault winner={winner} />
      <EmailSection />
    </>
  );
}
