import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { Container } from "@sica/ui";
import { Award, MapPin, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "À propos — Groupe SICA · Côte d'Ivoire",
  description:
    "Découvrez Ngoran Ivan, fondateur du Groupe SICA, l'organigramme de nos équipes et nos implantations à Abidjan et Yamoussoukro.",
};

/* ════════════════════════════════════════════════════════════════════════
   PAGE À PROPOS — Dirigeant · Organigramme · Implantations
   Sections sourcées de docs/CONTEXTE.md (dossier technique 36 pages)
   AUCUNE Hero, identité légale, pôles-cards, vision/mission, valeurs.
═══════════════════════════════════════════════════════════════════════ */

const ORGA = [
  { titre: "Direction", sous: ["Directeur — Ngoran Ivan", "Secrétariat de service"] },
  { titre: "Pôle Commercial", sous: ["Vente Construction", "Vente Assistance"] },
  { titre: "Pôle Technique", sous: ["Études & conception", "Production chantier"] },
  { titre: "Pôle Administratif", sous: ["Achats & approvisionnement", "Ressources humaines"] },
];

export default function AProposPage() {
  return (
    <PageShell>
      {/* ════════════════════════════════════════════════════
          EN-TÊTE DE PAGE — sobre, pas de hero vidéo
      ════════════════════════════════════════════════════ */}
      <div className="border-b border-neutral-100 bg-white pt-36 pb-12 sm:pt-44 sm:pb-16">
        <Container>
          <p className="mb-4 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-brand-amber">
            Corporate
          </p>
          <h1 className="font-display max-w-3xl text-balance text-[2rem] font-bold leading-tight tracking-tight text-[#0D1A4A] sm:text-[2.75rem]">
            Qui nous sommes,
            <br />
            d'où nous venons.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-neutral-500 sm:text-[1.0625rem]">
            Une SARL ivoirienne fondée en 2020 à Abidjan, portée par une conviction simple :
            que la rigueur n'est pas une option — ni sur les chantiers, ni dans les dossiers.
          </p>
        </Container>
      </div>

      {/* ════════════════════════════════════════════════════
          DIRIGEANT — Ngoran Ivan
      ════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="pdg-heading"
        className="relative overflow-hidden bg-[#FAFAF7] py-20 sm:py-28"
      >
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-brand-amber">
                <Award size={14} strokeWidth={2} aria-hidden />
                Meilleur jeune entrepreneur ivoirien 2023
              </p>
              <h2
                id="pdg-heading"
                className="font-display text-balance text-[1.875rem] font-bold leading-tight tracking-tight text-[#0D1A4A] sm:text-[2.5rem]"
              >
                Ngoran Ivan,
                <br />
                <span style={{ color: "#F39200" }}>fondateur & directeur.</span>
              </h2>
              <p className="mt-6 text-pretty text-base leading-relaxed text-neutral-600 sm:text-[1.0625rem]">
                Depuis la création du Groupe SICA en 2020, Ngoran Ivan porte une vision claire :
                offrir à la Côte d'Ivoire un acteur intégré, capable d'accompagner aussi bien le
                montage d'une PME que la livraison d'un siège institutionnel.
              </p>
              <p className="mt-4 text-pretty text-base leading-relaxed text-neutral-600 sm:text-[1.0625rem]">
                Distingué{" "}
                <strong className="text-[#0D1A4A]">Meilleur jeune entrepreneur ivoirien en 2023</strong>,
                il dirige aujourd'hui une équipe pluridisciplinaire — 5 équipes terrain BTP,
                techniciens supérieurs bureau, juristes, comptables et conseillers.
              </p>

              <blockquote className="mt-8 border-l-2 pl-5" style={{ borderColor: "#F39200" }}>
                <p className="font-display text-[1.125rem] italic leading-relaxed text-[#0D1A4A] sm:text-[1.25rem]">
                  « Vos défis sont les nôtres : lancez-vous. »
                </p>
                <footer className="mt-2 text-[0.8125rem] text-neutral-500">
                  Devise du Groupe SICA
                </footer>
              </blockquote>
            </div>

            {/* Portrait — placeholder en attendant photo client */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(155deg, #1E2F8A 0%, #0D1A4A 50%, #0F1956 100%)",
                }}
              />
              {/* Pattern blueprint discret */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='44' height='44'><g stroke='white' stroke-width='0.5' fill='none'><path d='M44 0H0V44'/></g></svg>\")",
                  backgroundSize: "44px 44px",
                }}
              />
              {/* Initiales — à remplacer par photo */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <p className="font-display text-[5rem] font-bold leading-none">NI</p>
                <p className="mt-3 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-white/55">
                  Ngoran Ivan
                </p>
                <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/35">
                  Directeur · fondateur
                </p>
              </div>
              {/* Filet ambre vertical signature */}
              <div
                aria-hidden
                className="absolute right-0 top-0 h-full w-[3px]"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 5%, #F39200 30%, #F39200 70%, transparent 95%)",
                }}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════
          ORGANIGRAMME — 4 pôles opérationnels
      ════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="orga-heading"
        className="border-y border-neutral-200 bg-white py-20 sm:py-28"
      >
        <Container>
          <div className="mb-12 max-w-3xl sm:mb-16">
            <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-brand-amber">
              Organisation
            </p>
            <h2
              id="orga-heading"
              className="font-display text-balance text-[1.75rem] font-bold leading-tight tracking-tight text-[#0D1A4A] sm:text-[2.5rem]"
            >
              Une équipe structurée en 4 pôles opérationnels.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ORGA.map((o, i) => (
              <div
                key={o.titre}
                className="relative overflow-hidden rounded-2xl border bg-neutral-50 p-6"
                style={{ borderColor: "#E4E7F0" }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-md text-[0.7rem] font-bold text-white"
                    style={{ background: "#1E2F8A" }}
                  >
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-[1rem] font-semibold text-[#0D1A4A]">
                    {o.titre}
                  </h3>
                </div>
                <ul className="mt-4 space-y-1.5">
                  {o.sous.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-2 text-[0.875rem] leading-relaxed text-neutral-600"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1 w-1 shrink-0 rounded-full"
                        style={{ background: "#F39200" }}
                      />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════
          IMPLANTATIONS — Abidjan + Yamoussoukro
      ════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="implantations-heading"
        className="bg-[#FAFAF7] py-20 sm:py-28"
      >
        <Container>
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-brand-amber">
              Implantations
            </p>
            <h2
              id="implantations-heading"
              className="font-display text-balance text-[1.75rem] font-bold leading-tight tracking-tight text-[#0D1A4A] sm:text-[2.5rem]"
            >
              Présents là où vos chantiers et dossiers prennent vie.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <LocationCard
              ville="Abidjan"
              role="Siège social"
              adresse="Cocody Mermoz, derrière la Pharmacie Mermoz"
              detail="Après le terrain SOGEFIA/RTI"
              tel="+225 0709883293"
            />
            <LocationCard
              ville="Yamoussoukro"
              role="Succursale"
              adresse="Morofé · 24 ampoules"
              detail="Rond-point route Daloa"
              tel="+225 2722247445"
            />
          </div>

          <p className="mt-8 text-[0.875rem] text-neutral-500">
            <Sparkles size={14} strokeWidth={2} className="mr-1.5 inline" aria-hidden />
            Équipes mobiles partout en Côte d'Ivoire — devis sur site possibles.
          </p>
        </Container>
      </section>
    </PageShell>
  );
}

/* ──────────────────────────────────────────────────────────
   COMPOSANT interne
────────────────────────────────────────────────────────── */

function LocationCard({
  ville,
  role,
  adresse,
  detail,
  tel,
}: {
  ville: string;
  role: string;
  adresse: string;
  detail: string;
  tel: string;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border bg-white p-7 sm:p-8"
      style={{ borderColor: "#E4E7F0" }}
    >
      <div className="flex items-start gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
          style={{ background: "rgba(30,47,138,0.08)" }}
        >
          <MapPin size={20} strokeWidth={1.8} style={{ color: "#1E2F8A" }} aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-brand-amber">
            {role}
          </p>
          <h3 className="mt-1 font-display text-[1.5rem] font-bold leading-tight tracking-tight text-[#0D1A4A]">
            {ville}
          </h3>
          <p className="mt-2 text-[0.9375rem] font-medium text-neutral-700">{adresse}</p>
          <p className="text-[0.875rem] text-neutral-500">{detail}</p>
          <a
            href={`tel:${tel.replace(/\s/g, "")}`}
            className="mt-4 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-[#1E2F8A] transition-colors hover:text-brand-amber"
          >
            {tel}
          </a>
        </div>
      </div>
    </div>
  );
}
