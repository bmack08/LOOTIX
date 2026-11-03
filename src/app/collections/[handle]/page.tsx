import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CollectionView from '@/components/store/CollectionView';
import { CHIP_HANDLES, COLLECTIONS, cardsFor, getCollection } from '@/config/collections';
import { SITE_ORIGIN } from '@/config/giveaway';

export const dynamicParams = false;

export function generateStaticParams() {
  return COLLECTIONS.filter((c) => c.handle !== 'all').map((c) => ({ handle: c.handle }));
}

type Params = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { handle } = await params;
  const c = getCollection(handle);
  if (!c) return {};
  return {
    title: { absolute: `${c.title} \u2013 Lootix` },
    description: `Shop ${c.title.toLowerCase()} from the Lootix launch collection. Ships to the US only.`,
    alternates: { canonical: `${SITE_ORIGIN}/collections/${c.handle}` },
  };
}

export default async function CollectionPage({ params }: Params) {
  const { handle } = await params;
  const c = getCollection(handle);
  if (!c) notFound();
  const chips = CHIP_HANDLES.map((h) => ({ handle: h, title: h === 'all' ? 'All' : getCollection(h)!.title }));
  return (
    <CollectionView
      handle={c.handle}
      title={c.title}
      cards={cardsFor(c.handle)}
      chips={chips}
      crumbs={[{ href: '/', label: 'Home' }, { href: '/shop', label: 'Shop' }, { label: c.title }]}
    />
  );
}
