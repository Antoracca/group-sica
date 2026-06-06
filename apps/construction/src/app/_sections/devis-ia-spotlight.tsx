import Link from "next/link";
import { ArrowRight, FileText, LayoutList, Layers } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

/*
  Section vedette « Devis IA » sur la home Construction.
  Ton : professionnel, orienté métier, compréhensible et élégant.
  Visuel : Sans cadre, flottant, ultra-clean avec Lottie en en-tête.
*/

export function DevisIaSpotlight() {
  return (
    <section
      aria-labelledby="devis-ia-spotlight-title"
      className="relative isolate overflow-hidden bg-white py-24 sm:py-32 border-y border-slate-100"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-center">
          {/* Colonne éditoriale */}
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-brand-royal">
              Nouveau — Service propulsé par SICA
            </p>
            <h2
              id="devis-ia-spotlight-title"
              className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-5xl"
            >
              Votre devis structuré, <br className="hidden lg:inline" />
              généré à partir de <span className="relative inline-block">
                <span className="relative">vos plans</span>
                <span aria-hidden className="absolute inset-x-0 bottom-1 h-3 bg-brand-royal/10" />
              </span>.
            </h2>
            <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-slate">
              Obtenez une estimation financière détaillée de votre projet. Importez simplement vos plans architecturaux et notre système d'analyse structurelle génère un Devis Quantitatif Estimatif (DQE) complet.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/devis-auto"
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-ink px-8 text-sm font-bold text-white transition-all hover:bg-slate-800 hover:shadow-xl hover:shadow-ink/20 active:scale-[0.98]"
              >
                Générer mon devis
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
              </Link>
              <Link
                href="/devis"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 text-sm font-bold text-ink transition-colors hover:bg-slate-50 hover:border-slate-300"
              >
                Compléter manuellement
              </Link>
            </div>
          </div>

          {/* Bloc visuel intégré directement sans carte */}
          <div className="relative lg:ml-auto w-full max-w-lg mt-10 lg:mt-0 pt-20 sm:pt-24">
            {/* Effet lumineux en arrière-plan */}
            <div className="absolute -inset-10 bg-gradient-to-tr from-brand-royal/5 via-brand-amber/5 to-transparent rounded-full -z-10 blur-3xl"></div>
            
            {/* Animation Lottie IA en en-tête */}
            <div className="flex justify-center -mt-16 mb-4 z-20 pointer-events-none relative">
              <div className="w-56 h-56 opacity-90 drop-shadow-2xl mix-blend-multiply">
                <DotLottieReact src="/ai.lottie" loop autoplay />
              </div>
            </div>
            
            {/* Elements flottants directement sur le fond */}
            <div className="relative space-y-14 z-10">
              {/* Ligne de flux */}
              <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-gradient-to-b from-slate-200 via-brand-amber/30 to-slate-200 z-0 hidden sm:block"></div>
              
              {/* Node 1 */}
              <div className="relative z-10 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start group cursor-default">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-400 shadow-sm transition-all duration-300 group-hover:bg-slate-50 group-hover:border-slate-300 group-hover:text-ink group-hover:shadow-md">
                  <FileText className="size-5" strokeWidth={1.5} />
                </div>
                <div className="pt-2">
                  <h3 className="font-display text-xl font-bold text-ink transition-colors duration-300">
                    Analyse des plans PDF
                  </h3>
                  <p className="mt-2 text-base text-slate leading-relaxed">
                    Extraction ultra-précise des surfaces, volumes et caractéristiques géométriques du bâtiment.
                  </p>
                </div>
              </div>

              {/* Node 2 */}
              <div className="relative z-10 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start group cursor-default">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-400 shadow-sm transition-all duration-300 group-hover:bg-brand-royal/5 group-hover:border-brand-royal/20 group-hover:text-brand-royal group-hover:shadow-md">
                  <Layers className="size-5" strokeWidth={1.5} />
                </div>
                <div className="pt-2">
                  <h3 className="font-display text-xl font-bold text-ink transition-colors duration-300">
                    Structuration par lots
                  </h3>
                  <p className="mt-2 text-base text-slate leading-relaxed">
                    Application stricte des règles de l'art pour le gros œuvre et l'ensemble du second œuvre.
                  </p>
                </div>
              </div>

              {/* Node 3 */}
              <div className="relative z-10 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start group cursor-default">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-amber text-white shadow-lg shadow-brand-amber/20 transition-all duration-300 group-hover:-translate-y-1">
                  <LayoutList className="size-5" strokeWidth={2} />
                </div>
                <div className="pt-2">
                  <h3 className="font-display text-xl font-bold text-ink">
                    Génération du DQE
                  </h3>
                  <p className="mt-2 text-base text-slate leading-relaxed">
                    Un devis chiffré complet de 11 lots, prêt à être édité et exploité pour votre financement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
