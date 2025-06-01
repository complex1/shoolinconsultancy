// import { initDB } from "@/lib/sqlite";
import type { NextConfig } from "next";
import path from 'path';

// initDB().then(() => {
//   console.log('Database initialized successfully');
// }).catch(err => {
//   console.error('Failed to initialize database:', err);
// });
const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone', // Enables standalone output for Docker deployments

  // Add support for Prisma binary
  experimental: {
    // Add other experimental options here if needed
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData: `@import "variables";`,
  },
  images: {
    domains: ['localhost', 'images.unsplash.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
