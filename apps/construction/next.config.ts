import type { NextConfig } from "next";
import path from "path";

const config: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@sica/ui", "@sica/tokens"],

  // @ts-expect-error — turbopack.root documenté mais pas encore dans les types NextConfig
  turbopack: {
    root: path.resolve(__dirname, "../.."),
  },

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
      { protocol: "https", hostname: "*.ftcdn.net" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  poweredByHeader: false,
  compress: true,
};

export default config;
