import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',

  // Allow external images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },

  // Disable telemetry
  typescript: {
    // Don't fail build on TypeScript errors
    // ignoreBuildErrors: false,
  },
};

export default nextConfig;
