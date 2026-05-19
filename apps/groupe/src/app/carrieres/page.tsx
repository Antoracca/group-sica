import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { Container } from "@sica/ui";
import { ArrowRight, Bell } from "lucide-react";
import { NewsletterForm } from "./_newsletter";

export const metadata: Metadata = {
  title: "Carrières — Rejoindre le Groupe SICA",
  description:
    "Rejoignez les équipes SICA Construction et SICA Assistance en Côte d'Ivoire. Candidatures spontanées bienvenues.",
};

const UPDATE_DATE = "18 mai 2026";

export default function CarrieresPage() {
  return (
    <PageShell>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden pt-36 pb-20 text-white sm:pt-44 sm:pb-28 lg:pt-48"
        style={{ background: "linear-gradient(155deg, #060D22 0%, #0F1C55 55%, #1E2F8A 100%)" }}
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

        <Container className="relative">
          <p
            className="mb-6 text-[0.65rem] font-bold uppercase tracking-[0.35em]"
            style={{ color: "#F39200" }}
          >
            Carrières SICA · Côte d'Ivoire
          </p>
          <h1
            className="max-w-3xl text-balance text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.04] tracking-tight"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Construire avec nous,{" "}
            <em className="not-italic" style={{ color: "#F39200" }}>
              structurer demain.
            </em>
          </h1>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-white/62">
            5 équipes terrain, un bureau d'études, une équipe Assistance. SICA recrute des
            profils techniques et administratifs partout en Côte d'Ivoire.
          </p>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════════════
          OFFRES — état vide avec alerte email
      ══════════════════════════════════════════════════════ */}
      <section className="border-t border-neutral-100 bg-[#F8F8F5] py-16 sm:py-20 lg:py-24">
        <Container>

          {/* En-tête section */}
          <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-[#F39200]">
                Offres en cours
              </p>
              <h2
                className="text-balance text-[clamp(1.875rem,3.5vw,2.5rem)] font-bold leading-tight tracking-tight text-[#0D1A4A]"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                0 poste ouvert.
              </h2>
            </div>
            <p className="shrink-0 text-[0.8125rem] text-neutral-400">
              Mise à jour le {UPDATE_DATE}
            </p>
          </div>

          {/* État vide éditorial */}
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            <div className="grid lg:grid-cols-[1fr_480px]">

              {/* Colonne texte */}
              <div className="flex flex-col justify-center px-8 py-12 lg:px-12 lg:py-14">
                <div
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: "rgba(243,146,0,0.09)" }}
                >
                  <Bell size={24} strokeWidth={1.6} style={{ color: "#F39200" }} />
                </div>
                <h3
                  className="mb-3 text-[1.375rem] font-bold leading-tight tracking-tight text-[#0D1A4A]"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  Aucune offre disponible pour le moment.
                </h3>
                <p className="mb-8 max-w-[42ch] text-[0.9375rem] leading-[1.68] text-neutral-500">
                  Laissez votre email et nous vous préviendrons dès qu'un poste s'ouvre chez
                  SICA Construction ou SICA Assistance.
                </p>
                <NewsletterForm />
              </div>

              {/* Colonne visuelle desktop */}
              <div
                className="hidden lg:flex lg:flex-col lg:items-center lg:justify-center lg:gap-6 lg:px-12 lg:py-14"
                style={{ background: "linear-gradient(145deg, #0F1C55 0%, #1E2F8A 100%)" }}
              >
                {/* Blueprint grid */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='44' height='44'><path d='M44 0H0V44' fill='none' stroke='white' stroke-width='0.5'/></svg>\")",
                    backgroundSize: "44px 44px",
                  }}
                />
                {[
                  { label: "Domaines", items: ["BTP · Génie civil", "Géobéton", "Bureau d'études"] },
                  { label: "Assistance", items: ["Comptabilité OHADA", "Droit des affaires", "Conseil PME"] },
                  { label: "Groupement", items: ["Direction générale", "RH · Finance", "Communication"] },
                ].map((group) => (
                  <div key={group.label} className="w-full max-w-[260px]">
                    <p className="mb-2 text-[0.6rem] font-bold uppercase tracking-[0.28em] text-white/35">
                      {group.label}
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {group.items.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#F39200]/60" />
                          <span className="text-[0.8125rem] text-white/52">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </Container>
      </section>

      {/* ══════════════════════════════════════════════════════
          CANDIDATURE SPONTANÉE — version desktop premium
      ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{
              background: "linear-gradient(160deg, #060D22 0%, #0F1C55 45%, #1E2F8A 100%)",
            }}
          >
            {/* Blueprint grid */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.055]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='44' height='44'><path d='M44 0H0V44' fill='none' stroke='white' stroke-width='0.5'/></svg>\")",
                backgroundSize: "44px 44px",
              }}
            />
            {/* Halo ambre */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 right-1/3 h-[400px] w-[400px] rounded-full opacity-15"
              style={{ background: "radial-gradient(circle, rgba(243,146,0,0.5) 0%, transparent 65%)" }}
            />

            <div className="relative grid items-center gap-10 px-8 py-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:px-16 lg:py-16">
              {/* Texte */}
              <div>
                <p
                  className="mb-4 text-[0.65rem] font-bold uppercase tracking-[0.35em]"
                  style={{ color: "#F39200" }}
                >
                  Candidature spontanée
                </p>
                <h2
                  className="text-balance text-[clamp(1.75rem,3.5vw,2.875rem)] font-bold leading-[1.1] tracking-tight text-white"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  Vous ne trouvez pas d'offre ?
                  <br />
                  Envoyez-nous votre CV.
                </h2>
                <p className="mt-5 max-w-[44ch] text-[0.9375rem] leading-[1.7] text-white/60">
                  Nous étudions toutes les candidatures qualifiées en BTP, comptabilité,
                  droit OHADA et conseil PME. Réponse garantie sous 15 jours.
                </p>
              </div>

              {/* CTA + info */}
              <div className="flex flex-col items-start gap-5 lg:items-center lg:pl-8">
                <a
                  href="mailto:groupesica@gmail.com?subject=Candidature%20spontan%C3%A9e"
                  className="group inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 text-[0.9375rem] font-semibold text-white transition-all hover:opacity-92"
                  style={{
                    background: "linear-gradient(135deg, #F39200 0%, #D87D00 100%)",
                    boxShadow: "0 4px 24px rgba(243,146,0,0.35)",
                  }}
                >
                  Envoyer mon CV
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </a>
                <p className="text-[0.78rem] text-white/32 lg:text-center">
                  groupesica@gmail.com
                  <br />
                  Réponse sous 15 jours ouvrés
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

    </PageShell>
  );
}
