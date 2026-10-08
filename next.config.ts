import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All images are served locally from /public — no remote hosts allowed.
    remotePatterns: [],
  },
};

export default nextConfig;
