import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@sica/ui";
import { Btn, Label, SectionHead, WRAP } from "@/components/kit";
import { Em, Trait } from "@/components/titres";
import { ETAPES_FORMALITES, MODIFICATION_MOTIFS, PIECES_A_FOURNIR } from "@/lib/contenu";

/* §4.4 — Constat : trois cartes photo avec puce flottante. */

const CONSTAT = [
  {
    image: "/media/equipe-bureau.jpeg",
    chip: `${PIECES_A_FOURNIR.length} rubriques de pièces à fournir`,
    label: "Le dossier",
    titre: "Les pièces à réunir.",
    texte: "Identité, extrait de naissance, casier judiciaire, siège, banque, bailleur : nous constituons le dossier avec vous.",
    pos: "top-5 left-5",
  },
  {
    image: "/media/partenariat.jpeg",
    chip: `${ETAPES_FORMALITES.length} étapes de formalités`,
    label: "Les guichets",
    titre: "Les administrations à enchaîner.",
    texte: "Notaire, DGI, CEPICI, greffe, centre des impôts, CNPS : chaque étape a son interlocuteur, nous les suivons pour vous.",
    pos: "bottom-5 left-5",
  },
  {
    image: "/media/equipe-bureau-2.jpeg",
    chip: "TVA, ITS, FDFP, CNPS",
    label: "Les échéances",
    titre: "Les déclarations chaque mois.",
    texte: "Après la création viennent les déclarations fiscales et sociales. Le cabinet en assure le suivi.",
    pos: "top-5 right-5",
  },
] as const;

export function Constat() {
  return (
    <section className="py-24 sm:py-28">
      <div className={WRAP}>
        <SectionHead
          pill="Le constat"
          deco="points"
          title={
            <>
              Entreprendre est un métier. <Trait>Les formalités</Trait> en sont <Em>un autre.</Em>
            </>
          }
          intro="Statuts, immatriculations, impôts, CNPS, déclarations mensuelles : SICA ASSISTANCE prend en charge l'administratif pour que vous vous consacriez à votre activité."
        />
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {CONSTAT.map((c) => (
            <article key={c.titre}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-mist">
                <Image src={c.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                <span
                  className={cn(
                    "absolute max-w-[75%] rounded-2xl bg-white/95 px-4 py-3 text-sm font-semibold text-brand-royal shadow-lg backdrop-blur",
                    c.pos,
                  )}
                >
                  {c.chip}
                </span>
              </div>
              <p className="mt-5 text-xs font-medium text-slate">{c.label}</p>
              <h3 className="mt-1 font-display text-lg font-bold text-ink">{c.titre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{c.texte}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* §4.5 — Panneaux empilés au défilement (sticky). */

function Panneau({
  id,
  label,
  titre,
  texte,
  sousTitre,
  sousTexte,
  lien,
  visuel,
  theme,
  index,
}: {
  id: string;
  label: string;
  titre: ReactNode;
  texte: string;
  sousTitre: string;
  sousTexte: string;
  lien: { href: string; label: string };
  visuel: ReactNode;
  theme: "royal-tint" | "amber-tint" | "slate-tint" | "royal";
  index: number;
}) {
  const dark = theme === "royal";
  return (
    <article
      id={id}
      style={{ top: `${96 + index * 18}px` }}
      className={cn(
        "sticky mb-8 scroll-mt-28 overflow-hidden rounded-[32px] border shadow-[0_30px_80px_-40px_rgba(6,51,176,0.35)]",
        theme === "royal-tint" && "border-brand-royal/10 bg-[#EEF2FC]",
        theme === "amber-tint" && "border-brand-amber/15 bg-[#FFF4E8]",
        theme === "slate-tint" && "border-slate-200 bg-[#EEF1F6]",
        dark && "border-transparent bg-brand-royal text-white",
      )}
    >
      <div className="grid items-center gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_1.05fr] lg:p-14">
        <div>
          <Label dark={dark}>{label}</Label>
          <h3
            className={cn(
              "f-titre mt-4 text-balance text-[clamp(1.9rem,3.3vw,2.9rem)] font-extrabold leading-[1.02] tracking-[-0.035em]",
              dark ? "text-white" : "text-ink",
            )}
          >
            {titre}
          </h3>
          <p className={cn("mt-5 max-w-md text-base leading-relaxed", dark ? "text-white/80" : "text-slate")}>{texte}</p>
          <div className="mt-7">
            <p className={cn("text-sm font-bold", dark ? "text-white" : "text-ink")}>{sousTitre}</p>
            <p className={cn("text-sm", dark ? "text-white/70" : "text-slate")}>{sousTexte}</p>
          </div>
          <a
            href={lien.href}
            className={cn(
              "mt-7 inline-flex items-center gap-2 text-sm font-semibold hover:underline",
              dark ? "text-white" : "text-brand-royal",
            )}
          >
            {lien.label} <ArrowRight aria-hidden className="size-4" />
          </a>
        </div>
        <div>{visuel}</div>
      </div>
    </article>
  );
}

export function Panneaux() {
  return (
    <section className="pb-16">
      <div className={WRAP}>
        <SectionHead
          pill="Nos domaines"
          title={
            <>
              Reprenez la main sur <Em>votre administratif.</Em>
            </>
          }
          intro="Création, modification, comptabilité, fiscalité, social : un seul cabinet pour toutes vos démarches."
          className="mb-16"
        />

        <Panneau
          index={0}
          id="creation"
          theme="royal-tint"
          label="Création d'entreprise"
          titre={
            <>
              Votre société immatriculée,
              <br />
              rattachée aux impôts et à la CNPS
            </>
          }
          texte="Rédaction des actes par notre notaire agréé ou sous seing privé, enregistrement à la DGI, immatriculations RCCM et CEPICI, rattachements au centre des impôts et à la CNPS."
          sousTitre="Objectif : sous 30 jours"
          sousTexte="Selon le document de la Direction SICA ASSISTANCE."
          lien={{ href: "/creation-entreprise", label: "Découvrir la création d'entreprise" }}
          visuel={
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image src="/media/equipe-bureau-2.jpeg" alt="L'équipe SICA dans ses bureaux" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur sm:right-auto">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-royal">Documents remis</p>
                <p className="mt-1 text-sm font-semibold text-ink">Statuts · RCCM · IDU · DFE · N° CNPS</p>
              </div>
            </div>
          }
        />

        <Panneau
          index={1}
          id="modification"
          theme="amber-tint"
          label="Modification d'entreprise"
          titre={
            <>
              Vos statuts suivent
              <br />
              l&apos;évolution de votre entreprise
            </>
          }
          texte="Changement de gérant, transfert de siège, capital, forme juridique, dénomination, objet social : nous mettons vos actes à jour et informons l'administration."
          sousTitre="Conformité maintenue"
          sousTexte="Pas de décalage entre la réalité et vos documents officiels."
          lien={{ href: "/modification-entreprise", label: "Découvrir la modification d'entreprise" }}
          visuel={
            <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-amber-600">Motifs les plus fréquents</p>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {MODIFICATION_MOTIFS.map((m) => (
                  <li key={m.titre} className="flex items-start gap-2.5 rounded-2xl border border-slate-200/70 p-3 text-sm font-semibold text-ink">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-amber text-ink">
                      <Check aria-hidden className="size-3" strokeWidth={3} />
                    </span>
                    {m.titre}
                  </li>
                ))}
              </ul>
            </div>
          }
        />

        <Panneau
          index={2}
          id="gestion"
          theme="slate-tint"
          label="Gestion comptable, fiscale et sociale"
          titre={
            <>
              Comptabilité, fiscalité, social :
              <br />
              le suivi au quotidien
            </>
          }
          texte="Tenue de comptabilité selon le SYSCOHADA révisé, déclarations sur e-Impôts, paie et déclarations CNPS, états financiers de fin d'année, Facture Normalisée Électronique."
          sousTitre="Business plan et accompagnement"
          sousTexte="Pour vos demandes de financement et vos décisions de gestion."
          lien={{ href: "/gestion", label: "Découvrir la gestion" }}
          visuel={
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { t: "Comptable", d: ["SYSCOHADA", "Rapprochement bancaire", "États financiers"] },
                { t: "Fiscale", d: ["e-Impôts", "TVA, ITS, FDFP", "Liasse fiscale"] },
                { t: "Sociale", d: ["Contrats", "Paie", "e-CNPS"] },
              ].map((c) => (
                <div key={c.t} className="rounded-3xl bg-white p-5 shadow-sm">
                  <p className="font-display text-base font-bold text-ink">{c.t}</p>
                  <ul className="mt-3 space-y-2 text-[13px] text-slate">
                    {c.d.map((x) => (
                      <li key={x} className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-brand-amber" />
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          }
        />

        <Panneau
          index={3}
          id="impots"
          theme="royal"
          label="Impôts et taxes"
          titre={
            <>
              Le bon régime d&apos;imposition,
              <br />
              les bons taux
            </>
          }
          texte="TEE, RME, RSI ou réel normal : votre régime dépend de votre chiffre d'affaires. Nous vous aidons à comprendre vos obligations et à les respecter."
          sousTitre="Particuliers et entreprises"
          sousTexte="ITS, CN, IGR, IS, IMF, TVA, impôts fonciers, cotisations CNPS."
          lien={{ href: "/impots-et-taxes", label: "Découvrir les impôts et taxes" }}
          visuel={
            <div className="rounded-3xl bg-white p-5 text-ink shadow-xl sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-royal">Repères en Côte d&apos;Ivoire</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { v: "18 %", l: "TVA, taux normal" },
                  { v: "25 %", l: "Impôt sur les sociétés" },
                  { v: "4 % · 5 %", l: "TEE commerce · services" },
                  { v: "7 %", l: "RME, taux unique" },
                ].map((r) => (
                  <div key={r.l} className="rounded-2xl bg-[#F5F6F8] p-4">
                    <p className="font-display text-2xl font-extrabold tracking-tight text-brand-royal">{r.v}</p>
                    <p className="mt-1 text-xs text-slate">{r.l}</p>
                  </div>
                ))}
              </div>
            </div>
          }
        />

        <div className="relative z-10 mt-24 flex flex-col items-center justify-between gap-6 rounded-[28px] border border-brand-royal/10 bg-white p-8 shadow-[0_30px_80px_-40px_rgba(6,51,176,0.35)] sm:p-10 lg:flex-row">
          <p className="f-titre max-w-xl text-center text-[clamp(1.6rem,2.6vw,2.2rem)] font-extrabold leading-tight tracking-[-0.03em] text-ink lg:text-left">
            Un dossier à lancer ? <Em>Parlons-en.</Em>
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Btn href="/contact?objet=creation" arrow>
              Démarrer mon dossier
            </Btn>
            <Btn href="tel:+2250709883293" variant="outline">
              (+225) 07 09 88 32 93
            </Btn>
          </div>
        </div>
      </div>
    </section>
  );
}
