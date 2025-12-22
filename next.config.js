/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.contentful.com',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.org',
      },
      {
        protocol: 'https',
        hostname: '**.strapi.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig

