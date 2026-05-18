import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { Container } from "@sica/ui";
import { ArrowRight, MapPin, Briefcase, GraduationCap, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Carrières — Rejoindre le Groupe SICA",
  description:
    "Découvrez nos offres d'emploi et rejoignez les équipes SICA Construction et SICA Assistance en Côte d'Ivoire. Candidatures spontanées bienvenues.",
};

interface Offre {
  titre: string;
  pole: "Construction" | "Assistance" | "Groupe";
  type: "CDI" | "CDD" | "Stage" | "Alternance";
  lieu: string;
  resume: string;
}

const OFFRES: Offre[] = [
  {
    titre: "Chef de chantier expérimenté",
    pole: "Construction",
    type: "CDI",
    lieu: "Abidjan · Cocody",
    resume:
      "Pilotage de chantiers résidentiels et institutionnels, encadrement d'équipes, suivi qualité et délais. 5 ans d'expérience minimum en BTP ivoirien.",
  },
  {
    titre: "Ingénieur Bureau d'études BTP",
    pole: "Construction",
    type: "CDI",
    lieu: "Abidjan · Cocody",
    resume:
      "Études d'exécution structure béton armé, géotechnique, dimensionnement fondations. Maîtrise AutoCAD, Robot ou équivalent.",
  },
  {
    titre: "Comptable senior agréé OHADA",
    pole: "Assistance",
    type: "CDI",
    lieu: "Abidjan · Cocody",
    resume:
      "Tenue comptable, bilans, déclarations fiscales et sociales pour portefeuille de PME. Diplôme expertise comptable apprécié.",
  },
  {
    titre: "Juriste d'entreprise",
    pole: "Assistance",
    type: "CDI",
    lieu: "Abidjan",
    resume:
      "Création d'entreprises, statuts SARL/SA, suivi RCCM, conseil juridique aux clients. Maîtrise droit OHADA exigée.",
  },
  {
    titre: "Conducteur d'engins BTP",
    pole: "Construction",
    type: "CDI",
    lieu: "Abidjan · Yamoussoukro",
    resume:
      "Pelleteuse, chargeuse, bétonnière. Permis CACES ou équivalent. Mobile sur chantiers Côte d'Ivoire.",
  },
];

const POLE_COLORS: Record<string, { bg: string; text: string }> = {
  Construction: { bg: "rgba(30,47,138,0.10)", text: "#1E2F8A" },
  Assistance: { bg: "rgba(243,146,0,0.12)", text: "#A85C00" },
  Groupe: { bg: "rgba(13,26,74,0.10)", text: "#0D1A4A" },
};

const AVANTAGES = [
  {
    Icon: GraduationCap,
    titre: "Formation continue",
    desc: "Programmes internes BTP, OHADA, fiscalité ivoirienne. Une session annuelle financée par SICA.",
  },
  {
    Icon: Heart,
    titre: "Couverture santé",
    desc: "Mutuelle santé prise en charge à 70%. CNPS employeur 378047 — toutes obligations sociales à jour.",
  },
  {
    Icon: Briefcase,
    titre: "Évolution interne",
    desc: "Promotion privilégiée en interne. 5 équipes terrain qui montent en compétence avec leurs chefs de projet.",
  },
];

export default function CarrieresPage() {
  return (
    <PageShell>
      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden pt-32 pb-16 text-white sm:pt-40 sm:pb-20 lg:pt-44"
        style={{ background: "linear-gradient(155deg, #08112E 0%, #1E2F8A 60%, #0D1A4A 100%)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><g stroke='white' stroke-width='0.5' fill='none'><path d='M48 0H0V48'/></g></svg>\")",
            backgroundSize: "48px 48px",
          }}
        />
        <Container className="relative">
          <p className="mb-4 text-[0.7rem] font-bold uppercase tracking-[0.22em]" style={{ color: "#F7A832" }}>
            Carrières SICA · Côte d'Ivoire
          </p>
          <h1 className="font-display max-w-3xl text-balance text-[2.25rem] font-bold leading-tight tracking-tight sm:text-[3rem] lg:text-[3.75rem]">
            Construire avec nous,{" "}
            <span style={{ color: "#F39200" }}>structurer demain.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/65 sm:text-lg">
            5 équipes terrain, un bureau d'études, une équipe Assistance — SICA recrute des
            profils techniques et administratifs partout en Côte d'Ivoire.
          </p>
        </Container>
      </section>

      {/* ── AVANTAGES ── */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 sm:grid-cols-3">
            {AVANTAGES.map(({ Icon, titre, desc }) => (
              <div key={titre} className="border-t pt-6" style={{ borderColor: "#1E2F8A" }}>
                <Icon size={22} strokeWidth={1.8} style={{ color: "#1E2F8A" }} />
                <h3 className="mt-4 font-display text-[1.125rem] font-semibold text-[#0D1A4A]">
                  {titre}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-neutral-600">{desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── OFFRES OUVERTES ── */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-brand-amber">
                Offres en cours
              </p>
              <h2 className="font-display text-balance text-[1.75rem] font-bold leading-tight tracking-tight text-[#0D1A4A] sm:text-[2.5rem]">
                {OFFRES.length} postes ouverts.
              </h2>
            </div>
            <p className="text-[0.875rem] text-neutral-500">
              Mise à jour le {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {OFFRES.map((o, i) => (
              <div
                key={i}
                className="group flex flex-col gap-4 rounded-xl border bg-white p-6 transition-shadow hover:shadow-lg sm:flex-row sm:items-center sm:gap-8 sm:p-7"
                style={{ borderColor: "#E4E7F0" }}
              >
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span
                      className="inline-flex rounded-full px-2.5 py-0.5 text-[0.625rem] font-bold uppercase tracking-[0.18em]"
                      style={{
                        background: POLE_COLORS[o.pole]?.bg,
                        color: POLE_COLORS[o.pole]?.text,
                      }}
                    >
                      {o.pole}
                    </span>
                    <span
                      className="inline-flex rounded-full px-2.5 py-0.5 text-[0.625rem] font-bold uppercase tracking-[0.18em]"
                      style={{ background: "#0D1A4A", color: "white" }}
                    >
                      {o.type}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[0.75rem] text-neutral-500">
                      <MapPin size={11} strokeWidth={2} />
                      {o.lieu}
                    </span>
                  </div>
                  <h3 className="font-display text-[1.25rem] font-bold leading-tight tracking-tight text-[#0D1A4A] sm:text-[1.375rem]">
                    {o.titre}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-neutral-600">
                    {o.resume}
                  </p>
                </div>
                <a
                  href={`mailto:groupesica@gmail.com?subject=Candidature — ${encodeURIComponent(o.titre)}`}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[0.8125rem] font-semibold text-white transition-all"
                  style={{
                    background: "linear-gradient(135deg, #1E2F8A 0%, #2C47C5 100%)",
                    boxShadow: "0 2px 12px rgba(30,47,138,0.25)",
                  }}
                >
                  Postuler
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CANDIDATURE SPONTANÉE ── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div
            className="overflow-hidden rounded-2xl p-8 text-white sm:p-12 lg:p-14"
            style={{
              background: "linear-gradient(160deg, #0D1A4A 0%, #1E2F8A 60%, #08112E 100%)",
            }}
          >
            <div className="grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
              <div>
                <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.22em]" style={{ color: "#F7A832" }}>
                  Candidature spontanée
                </p>
                <h2 className="font-display text-balance text-[1.75rem] font-bold leading-tight tracking-tight sm:text-[2.25rem]">
                  Aucune offre ne correspond ? Envoyez-nous votre CV.
                </h2>
                <p className="mt-4 text-pretty text-white/65">
                  Nous étudions toutes les candidatures qualifiées dans le BTP, la comptabilité,
                  le droit OHADA et le conseil PME. Réponse sous 15 jours.
                </p>
              </div>
              <div className="flex justify-end">
                <a
                  href="mailto:groupesica@gmail.com?subject=Candidature spontanée"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 text-sm font-semibold text-white transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #F39200 0%, #D87D00 100%)",
                    boxShadow: "0 4px 22px rgba(243,146,0,0.32)",
                  }}
                >
                  Envoyer mon CV
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
