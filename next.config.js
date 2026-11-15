/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // A production build wipes .next, which breaks a running dev server's
  // client chunks. Set NEXT_DIST_DIR to build somewhere else while dev runs.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

module.exports = nextConfig;