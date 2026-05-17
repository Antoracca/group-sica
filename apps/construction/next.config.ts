import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@sica/ui", "@sica/tokens"],
  /*
    CRITIQUE — Next.js 16 bloque par défaut les requêtes HMR cross-origin.
    Quand on teste depuis un iPhone sur le WiFi (http://192.168.x.x:3000),
    le dev server refuse les websockets → la page reload toute seule chaque minute
    et JavaScript n'hydrate jamais → onClick, useEffect, video.play() tous morts.
    Cette config autorise toutes les IPs de réseau local.
  */
  allowedDevOrigins: [
    "192.168.1.1",
    "192.168.0.1",
    "10.0.0.1",
    // Wildcards pour toutes les IPs LAN courantes
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
