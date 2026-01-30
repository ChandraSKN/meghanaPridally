/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Enable React Strict Mode
  reactStrictMode: true,

  // Static export for GitHub Pages
  output: 'export',

  // Disable Next.js image optimization (required for static export)
  images: {
    unoptimized: true,
  },

  // Base path for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/pridally-daily-guide' : '',

  // Trailing slash for GitHub Pages
  trailingSlash: true,
};

module.exports = nextConfig;
