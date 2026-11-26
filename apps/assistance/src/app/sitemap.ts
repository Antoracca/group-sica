import type { MetadataRoute } from "next";

const BASE = "https://www.sicaassistance.com";
const PAGES = [
  "",
  "/creation-entreprise",
  "/modification-entreprise",
  "/formes-juridiques",
  "/gestion",
  "/impots-et-taxes",
  "/services",
  "/simulateur",
  "/ressources",
  "/contact",
  "/mentions-legales",
  "/confidentialite",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({
    url: `${BASE}${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : p.startsWith("/mentions") || p === "/confidentialite" || p === "/cookies" ? 0.3 : 0.8,
  }));
}
