import type { Metadata } from "next";
import { Block, CtaFinal, InnerHero, PageShell, StepsDark } from "@/components/assistance-page";
import { Btn, Bullets, Card } from "@/components/kit";
import {
  ETAPES_FORMALITES,
  MODIFICATION_BUTS,
  MODIFICATION_DEFINITION,
  MODIFICATION_MOTIFS,
  PIECES_A_FOURNIR,
  SUITE_FORMALITES,
} from "@/lib/contenu";

export const metadata: Metadata = {
  title: "Modification de société — gérant, siège, capital, forme juridique",
  description:
    "Modification de société en Côte d'Ivoire avec SICA ASSISTANCE : changement de gérant, transfert de siège, capital social, forme juridique, dénomination, objet social.",
  alternates: { canonical: "/modification-entreprise" },
};

const ETAPES_MODIFICATION = [
  { titre: "Recueil des pièces et mise à jour des informations", texte: "Liste de toutes les modifications à faire, puis les mêmes pièces et informations que pour une création." },
  ...ETAPES_FORMALITES.slice(1),
];

export default function ModificationPage() {
  return (
    <PageShell>
      <InnerHero
        pill="Modification d'entreprise"
        title={
          <>
            Formalités de modification <span className="f-accent text-[1.08em] text-brand-amber">de société.</span>
          </>
        }
        intro={MODIFICATION_DEFINITION}
        image="/media/equipe-bureau.jpeg"
      >
        <Btn href="/contact?objet=modification" arrow>
          Modifier ma société
        </Btn>
        <Btn href="#motifs" variant="outline-light">
          Voir les motifs
        </Btn>
      </InnerHero>

      <Block pill="Le but" title="Pourquoi modifier sa société ?">
        <div className="grid gap-5 md:grid-cols-3">
          {MODIFICATION_BUTS.map((b, i) => (
            <Card key={b.titre}>
              <span className="font-display text-sm font-extrabold text-brand-amber">0{i + 1}</span>
              <h3 className="mt-3 font-display text-xl font-bold text-ink">{b.titre}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{b.texte}</p>
            </Card>
          ))}
        </div>
      </Block>

      <Block
        id="motifs"
        gray
        pill="Motifs fréquents"
        title="Les modifications les plus demandées"
        intro="Les entreprises sollicitent des cabinets comme SICA ASSISTANCE pour les changements suivants."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {MODIFICATION_MOTIFS.map((m) => (
            <div key={m.titre} className="rounded-3xl border border-slate-200/70 bg-white p-7 shadow-sm">
              <h3 className="font-display text-lg font-bold text-ink">{m.titre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{m.texte}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block pill="Recueil des pièces" title="Pièces et informations à mettre à jour">
        <div className="mx-auto max-w-4xl rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-sm sm:p-10">
          <div className="grid gap-x-10 text-[15px] md:grid-cols-2">
            <Bullets items={["Liste de toutes les modifications à faire", ...PIECES_A_FOURNIR.slice(0, 5)]} />
            <div className="mt-3 md:mt-0">
              <Bullets items={PIECES_A_FOURNIR.slice(5)} />
            </div>
          </div>
        </div>
      </Block>

      <StepsDark pill="Formalités" title="Les étapes de votre modification" etapes={ETAPES_MODIFICATION} note={SUITE_FORMALITES} />

      <CtaFinal
        title={
          <>
            Des statuts à jour, <span className="f-accent text-[1.08em] text-brand-amber">une entreprise en règle.</span>
          </>
        }
      />
    </PageShell>
  );
}
