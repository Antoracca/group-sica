import type { NextConfig } from "next";
import path from "path";

const config: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@sica/ui", "@sica/tokens"],

  allowedDevOrigins: [
    "192.168.*.*",
    "10.*.*.*",
    "172.16.*.*",
    "172.17.*.*",
    "172.18.*.*",
    "172.19.*.*",
    "172.20.*.*",
    "*.local",
  ],

  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
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
