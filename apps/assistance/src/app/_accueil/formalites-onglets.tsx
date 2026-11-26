"use client";

import { useState } from "react";
import { cn } from "@sica/ui";
import { DarkFrame, SectionHead, WRAP } from "@/components/kit";
import { Parcours } from "@/components/parcours";
import { Em } from "@/components/titres";
import { ETAPES_FORMALITES, MODIFICATION_MOTIFS, SUITE_FORMALITES } from "@/lib/contenu";

/* §4.9 — Section sombre à onglets (équivalent du « avant / avec » de la référence). */

const ONGLETS = [
  { id: "creation", label: "Création" },
  { id: "modification", label: "Modification" },
] as const;

export function FormalitesOnglets() {
  const [actif, setActif] = useState<(typeof ONGLETS)[number]["id"]>("creation");

  return (
    <DarkFrame id="formalites">
      <div className={cn(WRAP, "py-20 sm:py-24")}>
        <div className="flex flex-col gap-10">
          <SectionHead
            dark
            pill="La méthode"
            title={
              <>
                Vos formalités, <Em>étape par étape.</Em>
              </>
            }
            intro="Le parcours suivi par SICA ASSISTANCE pour formaliser ou mettre à jour votre société."
            className="w-full"
          />
          <div role="tablist" aria-label="Type de formalité" className="flex shrink-0 self-start rounded-full bg-white/10 p-1">
            {ONGLETS.map((o) => (
              <button
                key={o.id}
                role="tab"
                type="button"
                aria-selected={actif === o.id}
                onClick={() => setActif(o.id)}
                className={cn(
                  "min-h-11 rounded-full px-6 text-sm font-semibold transition-colors",
                  actif === o.id ? "bg-white text-ink" : "text-white/75 hover:text-white",
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {actif === "modification" ? (
          <div className="mt-14">
            <Parcours etapes={MODIFICATION_MOTIFS} ordre={false} />
            <p className="mt-12 max-w-2xl text-[15px] text-white/65">
              Ensuite, les mêmes étapes que pour une création s&apos;appliquent à la mise à jour : recueil des pièces,
              rédaction des actes, enregistrement à la DGI, immatriculations et rattachements.
            </p>
          </div>
        ) : (
          <Parcours etapes={ETAPES_FORMALITES} className="mt-14" />
        )}

        <div className="mt-16 flex flex-col items-start gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-[15px] text-white/75">{SUITE_FORMALITES}</p>
          <a
            href={actif === "creation" ? "/contact?objet=creation" : "/contact?objet=modification"}
            className="inline-flex min-h-12 shrink-0 items-center rounded-full bg-brand-amber px-7 text-sm font-semibold text-ink hover:bg-brand-amber-600"
          >
            {actif === "creation" ? "Créer ma société" : "Modifier ma société"}
          </a>
        </div>
      </div>
    </DarkFrame>
  );
}
