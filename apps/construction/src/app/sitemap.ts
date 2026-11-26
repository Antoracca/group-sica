import type { MetadataRoute } from "next";
import { constructionProjects } from "@/lib/projects";

const BASE = "https://www.sicaconstruction.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/qui-sommes-nous", "/expertises", "/realisations", "/solutions", "/agences", "/contact", "/devis", "/devis-auto"];
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...constructionProjects.map((p) => ({ url: `${BASE}/projets/${p.id}`, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
