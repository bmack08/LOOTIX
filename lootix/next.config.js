/** @type {import('next').NextConfig} */  
const nextConfig = {
  /* config options here */
  images: {
    domains: ['files.cdn.printful.com'], // for Printful images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.cdn.printful.com',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig; 