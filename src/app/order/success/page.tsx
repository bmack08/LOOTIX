import Link from 'next/link';
import NoPurchaseNotice from '@/components/NoPurchaseNotice';
import { getOrderEntryCount } from '@/lib/raffle';
import ClearCart from './ClearCart';

// Per-request: the entry message depends on what the webhook recorded for this session.
export const dynamic = 'force-dynamic';

/**
 * Post-payment landing. Stripe redirects here with ?session_id=cs_...; the
 * webhook grants entries (only inside the entry window, judged at payment
 * time). We only mention entries the DB actually holds for this session;
 * otherwise (none yet, out of window, unknown id, DB unavailable) the page
 * shows a neutral thank-you with no entry claim.
 */
export default async function OrderSuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string | string[] }> }) {
  const sp = await searchParams;
  const sid = typeof sp.session_id === 'string' ? sp.session_id : '';
  const entries = sid ? await getOrderEntryCount(sid) : null;

  return (
    <div className="text-parchment" style={{ padding: '96px 24px' }}>
      <ClearCart />
      <div className="mx-auto text-center flex flex-col gap-5 items-center" style={{ maxWidth: 560 }}>
        <span
          className="grid place-items-center"
          style={{ width: 64, height: 64, border: '1px solid rgba(198,161,91,0.5)', borderRadius: '50%', color: '#C6A15B', fontSize: 28 }}
        >
          ◆
        </span>
        <span className="v2-eyebrow">Order confirmed</span>
        <h1 className="m-0 uppercase" style={{ fontSize: 'clamp(32px,5vw,48px)', fontWeight: 900, letterSpacing: '-0.01em' }}>
          {entries ? <>You&rsquo;re in the vault</> : <>Thanks for your order</>}
        </h1>
        <p className="m-0 text-sand" style={{ fontSize: 16, lineHeight: 1.7 }}>
          Payment received. {entries
            ? `${entries} ${entries === 1 ? 'entry was' : 'entries were'} recorded for this order in the Lootix Launch Giveaway, and a confirmation email is on its way.`
            : 'A confirmation email is on its way.'}{' '}
          Gear ships within 2–4 business days, to US addresses only.
        </p>
        <div className="flex gap-3.5 flex-wrap justify-center" style={{ marginTop: 8 }}>
          <Link href="/giveaways" className="btn-brass">See the giveaway</Link>
          <Link href="/shop" className="btn-ghost-v2">Keep shopping</Link>
        </div>
        <NoPurchaseNotice className="font-plex m-0 text-stone" style={{ fontSize: 11, lineHeight: 1.7, letterSpacing: '0.04em', marginTop: 8 }}>
          Winner is selected at random using RANDOM.ORG; the draw is screen-recorded and posted. See the{' '}
          <Link href="/official-rules" className="text-brass hover:text-brass-lit transition-colors">Official Rules</Link>.
        </NoPurchaseNotice>
      </div>
    </div>
  );
}
