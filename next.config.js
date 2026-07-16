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
      // v2 has 7 routes: / /shop /giveaways /winners /about /faq /official-rules.
      // Everything else folds into its v2 equivalent.
      { source: '/giveaway', destination: '/giveaways', permanent: true },
      { source: '/how-it-works', destination: '/about', permanent: true },
      { source: '/privacy', destination: '/official-rules', permanent: true },
      { source: '/terms', destination: '/official-rules', permanent: true },
      { source: '/returns', destination: '/faq', permanent: true },
      { source: '/shipping', destination: '/faq', permanent: true },
      { source: '/contact', destination: '/faq', permanent: true },
      { source: '/cart', destination: '/shop', permanent: true },
    ];
  },
};

module.exports = nextConfig;
