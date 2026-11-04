import type { Metadata } from 'next';
import CollectionView from '@/components/store/CollectionView';
import { CHIP_HANDLES, cardsFor, getCollection } from '@/config/collections';
import { SITE_ORIGIN } from '@/config/giveaway';
import ShopNotes from './ShopNotes';

export const metadata: Metadata = {
  title: { absolute: 'Shop \u2013 Lootix' },
  description: 'Lootix launch collection: hoodies, tees and hats. Ships to the US only.',
  alternates: { canonical: `${SITE_ORIGIN}/shop` },
};

export default function ShopPage() {
  const chips = CHIP_HANDLES.map((h) => ({ handle: h, title: h === 'all' ? 'All' : getCollection(h)!.title }));
  return (
    <div className="text-parchment">
      <CollectionView handle="all" title="Shop" cards={cardsFor('all')} chips={chips} crumbs={[{ href: '/', label: 'Home' }, { label: 'Shop' }]} />
      <ShopNotes />
    </div>
  );
}
