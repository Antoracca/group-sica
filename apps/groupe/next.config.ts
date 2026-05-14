import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@sica/ui", "@sica/tokens"],
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Supabase Storage (à compléter quand SUPABASE_URL connu)
      { protocol: "https", hostname: "*.supabase.co" },
      // Hero image — Adobe Stock / Fotolia CDN
      { protocol: "https", hostname: "*.ftcdn.net" },
    ],
  },
  poweredByHeader: false,
  compress: true,
};

export default config;
