import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/espace-client"] }],
    sitemap: "https://www.sicaconstruction.com/sitemap.xml",
  };
}
