import { redirect } from 'next/navigation';

// Old quick-entries page held placeholder prizes and stock photos. Hidden:
// the route always sends visitors to /giveaways (also redirected in next.config.js).
export default function QuickEntriesPage() {
  redirect('/giveaways');
}
