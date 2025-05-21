import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone', // Enables standalone output for Docker deployments
};

export default nextConfig;
