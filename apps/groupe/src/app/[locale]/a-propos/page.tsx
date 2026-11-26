import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { AProposContent } from "./_content";

export const metadata: Metadata = {
  title: "À propos — Groupe SICA · Côte d'Ivoire",
  description:
    "Découvrez Ngoran Ivan, fondateur du Groupe SICA, l'organigramme de nos équipes et nos implantations à Abidjan et Yamoussoukro.",
};

export default function AProposPage() {
  return (
    <PageShell>
      <AProposContent />
    </PageShell>
  );
}
