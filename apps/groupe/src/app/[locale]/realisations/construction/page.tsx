import Link from "next/link";
import { GroupeHeader } from "@/components/groupe-header";
import { Footer } from "@/components/footer";
import { ArrowLeft, ArrowRight, Clock, Home } from "lucide-react";

export const metadata = {
  title: "Réalisations Construction — Groupe SICA",
  description:
    "Dossiers de réalisation du pôle BTP SICA Construction : villas, sièges institutionnels, génie civil.",
};

/* ── 6 slots projets — à remplir ──────────────────────────────────────── */
const PROJETS = [
  { num: 1, label: "Villa particulier" },
  { num: 2, label: "Siège institutionnel" },
  { num: 3, label: "Étude géotechnique" },
  { num: 4, label: "Ouvrage génie civil" },
  { num: 5, label: "Immeuble collectif" },
  { num: 6, label: "Chantier en cours" },
];

export default function RealisationsConstructionPage() {
  return (
    <>
      <GroupeHeader forceScrolled />

      <main id="main-content">

        {/* Hero */}
        <section
          className="relative overflow-hidden pt-36 pb-20 text-white sm:pt-44 sm:pb-28"
          style={{
            background:
              "linear-gradient(155deg, #060D22 0%, #0F1C55 55%, #1E2F8A 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.055]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='52' height='52'><path d='M52 0H0V52' fill='none' stroke='white' stroke-width='0.5'/></svg>\")",
              backgroundSize: "52px 52px",
            }}
          />
          <div
            className="absolute inset-x-0 top-0 h-[3px]"
            style={{ background: "#1E2F8A" }}
          />

          <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
            {/* Breadcrumb */}
            <nav aria-label="Fil d'Ariane" className="mb-10 flex items-center gap-2 text-[0.75rem] text-white/40">
              <Link href="/" className="transition-colors hover:text-white/80">Accueil</Link>
              <ArrowRight size={11} strokeWidth={2} className="text-white/25" />
              <Link href="/realisations" className="transition-colors hover:text-white/80">Réalisations</Link>
              <ArrowRight size={11} strokeWidth={2} className="text-white/25" />
              <span className="text-white/70">Construction</span>
            </nav>

            <div className="mb-5 inline-flex items-center gap-2">
              <Home size={14} strokeWidth={1.5} className="text-[#F39200]" />
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.35em] text-[#F39200]">
                Pôle BTP
              </p>
            </div>

            <h1
              className="max-w-3xl text-balance text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.06] tracking-tight"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Projets Construction
            </h1>

            <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.72] text-white/60">
              Villas, sièges institutionnels, génie civil et études de sol. Six dossiers illustrant l'expertise SICA Construction sur le terrain.
            </p>

            <div
              className="mt-10 h-px w-full max-w-[400px]"
              style={{
                background:
                  "linear-gradient(to right, rgba(243,146,0,0.55), transparent)",
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
                  6 projets Construction
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
                  className="relative overflow-hidden rounded-none border border-[#1E2F8A]/10 bg-white"
                >
                  {/* Accent bar top */}
                  <div className="h-[3px] w-full bg-[#1E2F8A]" />

                  {/* Placeholder zone image */}
                  <div
                    className="flex h-48 items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(145deg, #060D22 0%, #0F1C55 55%, #1E2F8A 100%)",
                    }}
                  >
                    <div className="flex flex-col items-center gap-3 text-center">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-2xl"
                        style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.14)" }}
                      >
                        <Home size={20} strokeWidth={1.35} className="text-white/60" />
                      </div>
                      <p className="text-[0.6rem] font-bold uppercase tracking-[0.25em] text-white/30">
                        Dossier {String(projet.num).padStart(2, "0")}
                      </p>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6">
                    <span className="mb-3 block text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-[#1E2F8A]/50">
                      Construction
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
              Les dossiers complets avec photos, descriptions techniques et récits de chantier seront disponibles prochainement.
            </p>
          </div>
        </section>

        {/* CTA Contact */}
        <section className="border-t border-neutral-200 bg-white py-16">
          <div className="mx-auto max-w-[1440px] px-6 text-center sm:px-10 lg:px-16">
            <p className="mb-3 text-[0.6rem] font-bold uppercase tracking-[0.35em] text-[#F39200]">
              Un projet BTP ?
            </p>
            <h2
              className="mb-4 text-[1.375rem] font-bold tracking-tight text-[#0D1A4A]"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Démarrons votre chantier
            </h2>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#1E2F8A] px-7 py-3 text-[0.875rem] font-semibold text-white transition-all duration-300 hover:bg-[#0D1A4A]"
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
