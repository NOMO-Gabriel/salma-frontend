// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'api-x75k2m8-v1.agtgroupholding.com',
      },
       { protocol: 'http',
         hostname: '127.0.0.1' },
    ],
  },
};

export default nextConfig;