import Link from 'next/link';
import { NO_PURCHASE_LINE } from '@/lib/sweepstakes';

/**
 * The "No purchase necessary" + Official Rules disclosure.
 *
 * Required on EVERY checkout surface (product add-to-cart, cart, order
 * success). No hooks, so it renders in both server and client components.
 */
export default function NoPurchaseNotice({
  className = '',
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <p
      className={`font-plex m-0 text-stone ${className}`}
      style={{ fontSize: 11, lineHeight: 1.7, letterSpacing: '0.04em', ...style }}
    >
      <strong className="text-sand">No purchase necessary</strong> to enter or win. A purchase does not
      improve your chances of winning. One entry per order; the free mail-in method in the{' '}
      <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">
        Official Rules
      </Link>{' '}
      carries equal odds. Entries are limited to legal US residents, 18+. Void where prohibited.
    </p>
  );
}

export { NO_PURCHASE_LINE };
