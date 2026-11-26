import type { Metadata } from "next";
import { Block, CtaFinal, InnerHero, PageShell, StepsDark } from "@/components/assistance-page";
import { Btn, Bullets, Card } from "@/components/kit";
import {
  CREATION_BUTS,
  CREATION_DEFINITION,
  ETAPES_FORMALITES,
  PIECES_A_FOURNIR,
  PROMESSE,
  SUITE_FORMALITES,
} from "@/lib/contenu";

export const metadata: Metadata = {
  title: "Création d'entreprise en Côte d'Ivoire — formalités, pièces à fournir",
  description:
    "Création de société en Côte d'Ivoire avec SICA ASSISTANCE : pièces à fournir, rédaction des actes, enregistrement DGI, RCCM, CEPICI, rattachement aux impôts et à la CNPS, sous 30 jours.",
  alternates: { canonical: "/creation-entreprise" },
};

export default function CreationPage() {
  return (
    <PageShell>
      <InnerHero
        pill="Création d'entreprise"
        title={
          <>
            Formalités de création <span className="f-accent text-[1.08em] text-brand-amber">de société.</span>
          </>
        }
        intro={PROMESSE}
        image="/media/equipe-bureau-2.jpeg"
      >
        <Btn href="/contact?objet=creation" arrow>
          Créer ma société
        </Btn>
        <Btn href="#pieces" variant="outline-light">
          Voir les pièces à fournir
        </Btn>
      </InnerHero>

      <Block pill="Définition" title="Qu'est-ce que la création de société ?" intro={CREATION_DEFINITION}>
        <div className="grid gap-5 md:grid-cols-3">
          {CREATION_BUTS.map((b, i) => (
            <Card key={b.titre}>
              <span className="font-display text-sm font-extrabold text-brand-amber">0{i + 1}</span>
              <h3 className="mt-3 font-display text-xl font-bold text-ink">{b.titre}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{b.texte}</p>
            </Card>
          ))}
        </div>
      </Block>

      <Block
        id="pieces"
        gray
        pill="Recueil des pièces"
        title="Les pièces et informations à fournir"
        intro="Préparez ces éléments pour votre premier rendez-vous : votre dossier avance plus vite."
      >
        <div className="mx-auto max-w-4xl rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-sm sm:p-10">
          <div className="grid gap-x-10 text-[15px] md:grid-cols-2 [&_ul]:space-y-4">
            <Bullets items={PIECES_A_FOURNIR.slice(0, 5)} />
            <div className="mt-4 md:mt-0">
              <Bullets items={PIECES_A_FOURNIR.slice(5)} />
            </div>
          </div>
          <div className="mt-8 flex flex-col items-start gap-4 border-t border-slate-200/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate">Vous hésitez sur la forme juridique ?</p>
            <Btn href="/formes-juridiques" variant="outline">
              Comparer les formes juridiques
            </Btn>
          </div>
        </div>
      </Block>

      <div className="pt-20 sm:pt-24" />
      <StepsDark
        pill="Formalités"
        title="Les étapes de votre création"
        intro="Pour le siège social et, le cas échéant, la succursale."
        etapes={ETAPES_FORMALITES}
        note={SUITE_FORMALITES}
      />

      <CtaFinal
        title={
          <>
            Votre activité formalisée <span className="f-accent text-[1.08em] text-brand-amber">sous 30 jours.</span>
          </>
        }
      />
    </PageShell>
  );
}
