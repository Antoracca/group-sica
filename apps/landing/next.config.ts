import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@sica/ui", "@sica/tokens"],
  allowedDevOrigins: [
    "192.168.*.*",
    "10.*.*.*",
    "172.16.*.*",
    "*.local",
  ],
  experimental: {
    optimizePackageImports: [],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  poweredByHeader: false,
  compress: true,
};

export default config;
