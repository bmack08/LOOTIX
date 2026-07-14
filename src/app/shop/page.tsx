import type { Metadata } from 'next';
import { FeaturedDrops, TrustStrip, EmailSection } from '@/components/lootix/sections';

export const metadata: Metadata = {
  title: 'Shop — Lootix',
  description: 'Legendary fantasy-streetwear drops. Every order earns entries into the Loot Vault giveaway. Cop the gear, win the vault.',
};

export default function ShopPage() {
  return (
    <>
      <FeaturedDrops full />
      <TrustStrip />
      <EmailSection />
    </>
  );
}
