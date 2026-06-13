import Link from "next/link";
import { GroupeHeader } from "@/components/groupe-header";
import { Footer } from "@/components/footer";
import { ArrowLeft, ArrowRight, Clock, ClipboardList } from "lucide-react";

export const metadata = {
  title: "Réalisations Assistance — Groupe SICA",
  description:
    "Dossiers de réalisation du pôle Conseil SICA Assistance : création d'entreprises, comptabilité, juridique.",
};

/* ── 6 slots projets — à remplir ──────────────────────────────────────── */
const PROJETS = [
  { num: 1, label: "Création d'entreprise" },
  { num: 2, label: "Mise en conformité comptable" },
  { num: 3, label: "Mission juridique" },
  { num: 4, label: "Conseil en gestion PME" },
  { num: 5, label: "Accompagnement fiscal" },
  { num: 6, label: "Structuration d'activité" },
];

export default function RealisationsAssistancePage() {
  return (
    <>
      <GroupeHeader forceScrolled />

      <main id="main-content">

        {/* Hero */}
        <section
          className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28"
          style={{ background: "linear-gradient(145deg, #FBF4E6 0%, #FEF0CC 45%, #FFFBF2 100%)" }}
        >
          {/* Diagonal pattern */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><line x1='0' y1='40' x2='40' y2='0' stroke='%23F39200' stroke-width='0.6' stroke-opacity='0.35'/></svg>\")",
              backgroundSize: "40px 40px",
              opacity: 0.055,
            }}
          />
          <div
            className="absolute inset-x-0 top-0 h-[3px]"
            style={{ background: "linear-gradient(to right, #F39200, rgba(243,146,0,0.3), transparent)" }}
          />

          <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
            {/* Breadcrumb */}
            <nav aria-label="Fil d'Ariane" className="mb-10 flex items-center gap-2 text-[0.75rem] text-[#0D1A4A]/40">
              <Link href="/" className="transition-colors hover:text-[#0D1A4A]/80">Accueil</Link>
              <ArrowRight size={11} strokeWidth={2} className="text-[#0D1A4A]/25" />
              <Link href="/realisations" className="transition-colors hover:text-[#0D1A4A]/80">Réalisations</Link>
              <ArrowRight size={11} strokeWidth={2} className="text-[#0D1A4A]/25" />
              <span className="text-[#0D1A4A]/70">Assistance</span>
            </nav>

            <div className="mb-5 inline-flex items-center gap-2">
              <ClipboardList size={14} strokeWidth={1.5} className="text-[#A05500]" />
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.35em] text-[#A05500]">
                Pôle Conseil
              </p>
            </div>

            <h1
              className="max-w-3xl text-balance text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.06] tracking-tight text-[#0D1A4A]"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Projets Assistance
            </h1>

            <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.72] text-[#0D1A4A]/60">
              Création d'entreprises, missions comptables, juridiques et de conseil en gestion. Six dossiers illustrant l'expertise SICA Assistance auprès des PME ivoiriennes.
            </p>

            <div
              className="mt-10 h-px w-full max-w-[400px]"
              style={{
                background: "linear-gradient(to right, rgba(243,146,0,0.55), transparent)",
              }}
            />
          </div>
        </section>

        {/* Grille des 6 projets */}
        <section className="bg-[#F8F8F5] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">

            <div className="mb-12 flex items-center justify-between">
              <div>
                <p className="mb-2 text-[0.6rem] font-bold uppercase tracking-[0.35em] text-[#F39200]">
                  Dossiers
                </p>
                <h2
                  className="text-[1.375rem] font-bold tracking-tight text-[#0D1A4A]"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  6 projets Assistance
                </h2>
              </div>
              <Link
                href="/realisations"
                className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-[#1E2F8A]/60 transition-colors hover:text-[#1E2F8A]"
              >
                <ArrowLeft size={13} strokeWidth={2} />
                Tous les pôles
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {PROJETS.map((projet) => (
                <div
                  key={projet.num}
                  className="relative overflow-hidden border border-[#F39200]/15 bg-white"
                >
                  {/* Accent bar top */}
                  <div className="h-[3px] w-full bg-[#F39200]" />

                  {/* Placeholder zone */}
                  <div
                    className="flex h-48 items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(145deg, #FBF4E6 0%, #FEF0CC 45%, #FFFBF2 100%)",
                    }}
                  >
                    <div className="flex flex-col items-center gap-3 text-center">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-2xl"
                        style={{
                          background: "rgba(243,146,0,0.12)",
                          border: "1px solid rgba(243,146,0,0.20)",
                        }}
                      >
                        <ClipboardList size={20} strokeWidth={1.35} className="text-[#A05500]/60" />
                      </div>
                      <p className="text-[0.6rem] font-bold uppercase tracking-[0.25em] text-[#A05500]/40">
                        Dossier {String(projet.num).padStart(2, "0")}
                      </p>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6">
                    <span className="mb-3 block text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-[#A05500]/60">
                      Assistance
                    </span>
                    <h3
                      className="text-[1.0625rem] font-bold leading-tight tracking-tight text-[#0D1A4A]"
                      style={{ fontFamily: "'DM Serif Display', serif" }}
                    >
                      {projet.label}
                    </h3>
                    <div className="mt-4 flex items-center gap-1.5 text-[0.75rem] text-neutral-400">
                      <Clock size={11} strokeWidth={2} />
                      <span>Dossier en cours de préparation</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-12 text-center text-[0.75rem] leading-relaxed text-neutral-400">
              Les dossiers complets avec descriptions de mission et résultats concrets seront disponibles prochainement.
            </p>
          </div>
        </section>

        {/* CTA Contact */}
        <section className="border-t border-neutral-200 bg-white py-16">
          <div className="mx-auto max-w-[1440px] px-6 text-center sm:px-10 lg:px-16">
            <p className="mb-3 text-[0.6rem] font-bold uppercase tracking-[0.35em] text-[#F39200]">
              Un besoin d'accompagnement ?
            </p>
            <h2
              className="mb-4 text-[1.375rem] font-bold tracking-tight text-[#0D1A4A]"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Parlons de votre entreprise
            </h2>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#F39200] px-7 py-3 text-[0.875rem] font-semibold text-white transition-all duration-300 hover:bg-[#D97F00]"
              >
                Nous contacter
                <ArrowRight size={14} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
