import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <section className="text-parchment flex flex-col items-center gap-5 text-center" style={{ padding: '96px 16px' }}>
      <h1 className="m-0 uppercase" style={{ fontSize: 28, fontWeight: 900 }}>We couldn&rsquo;t find that product.</h1>
      <p className="font-plex text-sand m-0" style={{ fontSize: 14 }}>It may have sold out or moved.</p>
      <Link href="/shop" className="btn-brass" style={{ padding: '14px 28px' }}>Back to shop</Link>
    </section>
  );
}
