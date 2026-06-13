import type { NextConfig } from "next";
import path from "path";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const config: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@sica/ui", "@sica/tokens"],

  /*
    MONOREPO — indique à Turbopack la racine du workspace pour éviter
    le warning "multiple lockfiles" lors du build.
  */
  // @ts-expect-error — turbopack.root est documenté mais pas encore dans les types NextConfig
  turbopack: {
    root: path.resolve(__dirname, "../.."),
  },

  /*
    DEV uniquement — autorise les requêtes HMR cross-origin (iPhone sur WiFi etc.)
    allowedDevOrigins n'a AUCUN effet en production, c'est purement dev-server.
  */
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
    ],
  },

  poweredByHeader: false,
  compress: true,
};

export default withNextIntl(config);
