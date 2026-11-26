import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ACTUALITES } from "@/lib/actualites";
import { ActualitesContent } from "./_content";

export const metadata: Metadata = {
  title: "Actualités — Groupe SICA",
  description:
    "Toute l'activité récente du Groupe SICA : livraisons de chantiers, distinctions, lancements produits et études techniques.",
};

export default function ActualitesPage() {
  /* Tri par date décroissante */
  const sorted = [...ACTUALITES].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <PageShell>
      <ActualitesContent articles={sorted} />
    </PageShell>
  );
}
