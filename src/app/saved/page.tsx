import type { Metadata } from 'next';
import { ALL_CARDS } from '@/config/collections';
import SavedView from './SavedView';

export const metadata: Metadata = { title: { absolute: 'Saved \u2013 Lootix' }, robots: { index: false } };

export default function SavedPage() {
  return <SavedView cards={ALL_CARDS} />;
}
