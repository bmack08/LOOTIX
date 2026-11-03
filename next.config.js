/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.cdn.printful.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images-api.printify.com',
      },
    ],
  },
  // Old-design pages superseded by the redesign routes (301-style permanent).
  async redirects() {
    return [
      { source: '/current-giveaway', destination: '/giveaways', permanent: true },
      { source: '/past-winners', destination: '/winners', permanent: true },
      // Membership is hidden unless NEXT_PUBLIC_MEMBERSHIP_ENABLED=true (src/config/flags.ts).
      // Off: /membership (and sub-paths) go to /. On: no redirect, the page is served.
      ...(process.env.NEXT_PUBLIC_MEMBERSHIP_ENABLED === 'true'
        ? []
        : [
            { source: '/membership', destination: '/', permanent: false },
            { source: '/membership/:path*', destination: '/', permanent: false },
          ]),
      { source: '/quick-entries', destination: '/giveaways', permanent: true },
      { source: '/products', destination: '/shop', permanent: true },
      { source: '/mens', destination: '/collections/mens', statusCode: 301 },
      { source: '/womens', destination: '/collections/womens', statusCode: 301 },
      { source: '/new-drops', destination: '/collections/new', statusCode: 301 },
      { source: '/collections/all', destination: '/shop', statusCode: 301 },
      // Old product URLs -> the new product pages where a mapping exists
      // (scripts/gen-legacy-redirects.ts), 301.
      ...Object.entries(require('./src/config/legacy-product-redirects.json')).flatMap(([slug, destination]) =>
        ['/product', '/shop'].map((base) => ({ source: `${base}/${slug}`, destination, statusCode: 301 })),
      ),
      // No catch-all: an unmapped /product/* or /shop/* is a 404.
      // v2 has 7 routes: / /shop /giveaways /winners /about /faq /official-rules.
      // Everything else folds into its v2 equivalent.
      { source: '/giveaway', destination: '/giveaways', permanent: true },
      { source: '/how-it-works', destination: '/about', permanent: true },
      // /privacy /terms /returns /shipping /contact are served directly —
      // the legal pages have to be reachable at their own URLs.
    ];
  },
};

module.exports = nextConfig;
