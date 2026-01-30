/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/pridally-daily-guide',
  assetPrefix: '/pridally-daily-guide/',
  trailingSlash: true,
};

module.exports = nextConfig;
