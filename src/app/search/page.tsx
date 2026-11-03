import type { Metadata } from 'next';
import Link from 'next/link';
import ProductCard from '@/components/store/ProductCard';
import { searchProducts } from '@/lib/search';

export const metadata: Metadata = { title: { absolute: 'Search \u2013 Lootix' }, robots: { index: false } };

type Props = { searchParams: Promise<{ q?: string | string[] }> };

export default async function SearchPage({ searchParams }: Props) {
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] : raw ?? '').slice(0, 80).trim();
  const results = q ? searchProducts(q) : [];
  return (
    <section className="store-collection text-parchment">
      <nav aria-label="Breadcrumb" className="pdp-crumbs font-plex uppercase text-stone"><Link href="/">Home</Link> / <span className="text-sand">Search</span></nav>
      <header className="store-head"><h1 className="m-0 uppercase">{q ? <>Results for &lsquo;{q}&rsquo;</> : 'Search'}</h1>
        {q ? <span className="font-plex text-stone">{results.length} {results.length === 1 ? 'product' : 'products'}</span> : null}
      </header>
      <form action="/search" role="search" className="hdr-search" style={{ maxWidth: 420, margin: '12px 0 20px' }}>
        <input type="search" name="q" defaultValue={q} aria-label="Search products" placeholder="Search hoodies, tees, hats" />
      </form>

      {q && !results.length ? (
        <p className="store-empty">
          No results for &lsquo;{q}&rsquo;. Try &lsquo;hoodie&rsquo; or &lsquo;tee&rsquo;. <Link href="/shop">All products</Link> &middot; <Link href="/collections/hoodies">Hoodies</Link>
        </p>
      ) : (
        <div className="store-grid">{results.map((c) => <ProductCard key={c.handle} card={c} />)}</div>
      )}
    </section>
  );
}
