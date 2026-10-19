import { redirect } from 'next/navigation';

// The old Quick Entries UI (QuickEntryForm, BonusEntryActions) confirmed entries
// and "bonus entries" that were never recorded server-side. Until those are wired
// to the raffle data layer and covered by the Official Rules, send visitors to the homepage email sign-up,
// the real, working free-entry flow.
export default function QuickEntriesPage() {
  redirect('/');
}
