'use client';

import Link from 'next/link';

export default function ProductError({ reset }: { error: Error; reset: () => void }) {
  return (
    <section role="alert" className="text-parchment flex flex-col items-center gap-5 text-center" style={{ padding: '96px 16px' }}>
      <h1 className="m-0 uppercase" style={{ fontSize: 28, fontWeight: 900 }}>This product didn&rsquo;t load.</h1>
      <p className="font-plex text-sand m-0" style={{ fontSize: 14 }}>Check your connection and try again.</p>
      <div className="flex gap-3">
        <button type="button" className="btn-brass" style={{ padding: '14px 28px' }} onClick={reset}>Try again</button>
        <Link href="/shop" className="font-plex uppercase text-brass" style={{ padding: '14px 12px', fontSize: 12, letterSpacing: '0.1em' }}>Back to shop</Link>
      </div>
    </section>
  );
}
