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
      { source: '/membership', destination: '/giveaways', permanent: true },
      { source: '/quick-entries', destination: '/giveaways', permanent: true },
      { source: '/products', destination: '/shop', permanent: true },
      { source: '/mens', destination: '/shop', permanent: true },
      { source: '/womens', destination: '/shop', permanent: true },
      { source: '/new-drops', destination: '/shop', permanent: true },
      { source: '/collections/:category', destination: '/shop', permanent: true },
      { source: '/product/:slug', destination: '/shop', permanent: true },
      // Superseded one-off routes fold into their v2 equivalent.
      { source: '/giveaway', destination: '/giveaways', permanent: true },
      { source: '/how-it-works', destination: '/about', permanent: true },
      { source: '/cart', destination: '/shop', permanent: true },
      // NOT redirected: /privacy, /terms, /returns, /shipping, /contact.
      // Each has its own standalone page and must serve directly. Folding the
      // legal and policy pages into /official-rules and /faq left the site with
      // no reachable Terms, Privacy, Returns, Shipping or Contact document —
      // and these are permanent (301) redirects, which browsers and crawlers
      // cache hard. Do not reintroduce them.
    ];
  },
};

module.exports = nextConfig;
