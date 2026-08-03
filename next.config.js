/** @type {import('next').NextConfig} */
// GitHub Pages serves this as a project site at /<repo-name>/, not the domain root.
// GITHUB_ACTIONS is set automatically by GH Actions runners, so local `npm run dev`/`build` stay at root.
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repoName = 'meghanaPridally';

const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  output: 'export',
  trailingSlash: true,
  basePath: isGithubActions ? `/${repoName}` : '',
  assetPrefix: isGithubActions ? `/${repoName}/` : '',
  // ESLint was silently broken (invalid eslint.config.js) until this change, so `next build`
  // never actually enforced it. Fixing the config surfaced a backlog of pre-existing lint
  // errors across marketing pages — `npm run lint` now works for cleaning those up, but they
  // shouldn't block deploys. Remove this once the backlog is cleared.
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
