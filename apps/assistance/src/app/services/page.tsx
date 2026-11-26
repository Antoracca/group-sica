import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Block, CtaFinal, InnerHero, PageShell } from "@/components/assistance-page";
import { Btn } from "@/components/kit";

export const metadata: Metadata = {
  title: "Nos services — formalités, gestion, impôts",
  description:
    "Les services de SICA ASSISTANCE : création et modification d'entreprise, formes juridiques, gestion comptable, fiscale et sociale, impôts et taxes en Côte d'Ivoire.",
  alternates: { canonical: "/services" },
};

const SERVICES = [
  {
    titre: "Création d'entreprise",
    texte: "Pièces à fournir, actes, enregistrement DGI, RCCM, CEPICI, rattachements aux impôts et à la CNPS.",
    href: "/creation-entreprise",
  },
  {
    titre: "Modification d'entreprise",
    texte: "Gérant, siège social, capital, forme juridique, dénomination, objet social.",
    href: "/modification-entreprise",
  },
  {
    titre: "Formes juridiques",
    texte: "EI, SARL / SARLU, SA, SAS / SASU, SCI, SNC, SCS : associés, capital, responsabilité.",
    href: "/formes-juridiques",
  },
  {
    titre: "Gestion comptable, fiscale et sociale",
    texte: "SYSCOHADA, e-Impôts, paie, e-CNPS, états financiers, FNE, business plan.",
    href: "/gestion",
  },
  {
    titre: "Impôts et taxes",
    texte: "ITS, CN, IGR, IS, IMF, TVA, régimes TEE, RME, RSI, RNI, impôts fonciers, CNPS.",
    href: "/impots-et-taxes",
  },
] as const;

export default function ServicesPage() {
  return (
    <PageShell>
      <InnerHero
        pill="Nos services"
        title={
          <>
            Tout l&apos;administratif de votre entreprise, <span className="f-accent text-[1.08em] text-brand-amber">un seul cabinet.</span>
          </>
        }
        intro="Formalités de création et de modification, gestion comptable, fiscale et sociale, impôts et taxes."
        image="/media/equipe-bureau-2.jpeg"
      >
        <Btn href="/contact?objet=creation" arrow>
          Démarrer mon dossier
        </Btn>
      </InnerHero>

      <Block>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="group flex flex-col rounded-3xl border border-slate-200/70 bg-white p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-royal/30 hover:shadow-md"
            >
              <h2 className=" font-display text-xl font-bold text-ink">{s.titre}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate">{s.texte}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-brand-royal">
                En savoir plus <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          ))}
          <a
            href="/simulateur"
            className="flex flex-col rounded-3xl bg-[#0A1130] p-7 text-white transition-transform hover:-translate-y-0.5"
          >
            <span className="font-display text-sm font-extrabold text-brand-amber">Outil</span>
            <h2 className="mt-3 font-display text-xl font-bold">Simulateur de création</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">Préparez votre projet avant d&apos;échanger avec un conseiller.</p>
            <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-brand-amber">
              Lancer le simulateur <ArrowRight aria-hidden className="size-4" />
            </span>
          </a>
        </div>
      </Block>

      <CtaFinal />
    </PageShell>
  );
}
