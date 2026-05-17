import Image from "next/image";
import { Logo, SiteHeader } from "@sica/ui";
import { mainNav } from "@/lib/nav";
import { Footer } from "@/components/footer";

/* ── Renderer next/image (même pattern que page.tsx) ── */
function makeImageRenderer(priority = false) {
  return ({
    src,
    alt,
    width,
    height,
    className,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className: string;
  }) => (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}

export const metadata = {
  title: "Nos réalisations",
  description:
    "Découvrez l'ensemble des projets réalisés par SICA Construction — villas, sièges institutionnels, études géotechniques.",
};

export default function RealisationsPage() {
  return (
    <>
      <SiteHeader
        brand="groupe"
        logo={
          <Logo
            brand="groupe"
            imgClassName="h-16 w-auto select-none sm:h-[4.5rem] lg:h-20 xl:h-24"
            imageRenderer={makeImageRenderer(true)}
          />
        }
        nav={mainNav}
      />

      <main id="main-content" className="min-h-[80vh] bg-[#FAFAF8]">
        <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-36 sm:px-10 sm:pt-44 lg:px-16 lg:pt-52">

          {/* Fil d'Ariane */}
          <nav aria-label="Fil d'Ariane" className="mb-8 flex items-center gap-2 text-xs text-neutral-400">
            <a href="/" className="transition-colors hover:text-[#1E2F8A]">Accueil</a>
            <span aria-hidden>/</span>
            <span className="text-neutral-600">Réalisations</span>
          </nav>

          {/* En-tête */}
          <p className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#1E2F8A]">
            Réalisations · SICA Construction
          </p>

          <h1 className="max-w-2xl text-balance text-[2rem] font-bold leading-[1.08] tracking-tight text-[#0D1A4A] sm:text-[2.75rem] lg:text-[3.5rem]">
            Nos dossiers de réalisation.
          </h1>

          <p className="mt-5 max-w-[480px] text-pretty text-base leading-relaxed text-neutral-500">
            Cette section est en cours de préparation. Nous travaillons à documenter
            chaque projet avec le soin qu'il mérite — photos, détails techniques et
            récits de chantier.
          </p>

          <p className="mt-2 text-pretty text-sm leading-relaxed text-neutral-400">
            Revenez bientôt pour découvrir l'ensemble de nos réalisations.
          </p>

          {/* Séparateur */}
          <div className="mt-10 h-px w-12 bg-[#1E2F8A]/20" />

          {/* Actions */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="/"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#1E2F8A] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#0D1A6E]"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden
              >
                <path
                  d="M11 7H3M6 10.5L2.5 7 6 3.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Retour à l'accueil
            </a>

            <a
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-full border border-[#1E2F8A]/20 px-6 py-3 text-sm font-semibold text-[#1E2F8A] transition-all duration-300 hover:border-[#1E2F8A] hover:bg-[#1E2F8A]/5"
            >
              Nous contacter
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
