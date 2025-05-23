import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone', // Enables standalone output for Docker deployments
  
  // Add support for Prisma binary
  experimental: {
    // Add other experimental options here if needed
  },
};

export default nextConfig;
