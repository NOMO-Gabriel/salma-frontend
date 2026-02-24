import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Pour les bourses et pays
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',     // Pour les visages des étudiants
      },
    ],
  },
};

export default nextConfig;