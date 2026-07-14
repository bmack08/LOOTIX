import { getLatestWinner } from '@/lib/raffle';
import {
  Hero, StatBand, HowItWorks, FeaturedDrops, GrandPrizeShowcase,
  WinnersVault, TrustStrip, EmailSection,
} from '@/components/lootix/sections';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const winner = await getLatestWinner();
  return (
    <>
      <Hero />
      <StatBand />
      <HowItWorks />
      <FeaturedDrops />
      <GrandPrizeShowcase />
      <WinnersVault winner={winner} />
      <TrustStrip />
      <EmailSection />
    </>
  );
}
