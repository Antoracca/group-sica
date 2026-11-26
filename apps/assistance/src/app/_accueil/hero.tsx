import Image from "next/image";
import { Btn, WRAP } from "@/components/kit";
import { MotsRotatifs } from "./mots-rotatifs";
import { SuiviDossier } from "./suivi-dossier";
import { PROMESSE } from "@/lib/contenu";

/* Hero plein écran (DESIGN.md §4.3) : photo réelle du bureau SICA en zoom lent à la place
   d'une vidéo, voile sombre, titre centré avec fin rotative, deux boutons, maquette de suivi de dossier. */

const MOTS = [
  "sans courir les guichets.",
  "sous 30 jours.",
  "en toute conformité.",
  "avec un seul cabinet.",
] as const;

export function HeroAccueil() {
  return (
    <section id="hero" className="relative isolate overflow-hidden bg-[#0A1130] text-white">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src="/media/direction-bureau.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="sica-kenburns object-cover object-[50%_30%]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(42%_38%_at_50%_30%,rgba(0,0,0,0.38),transparent_100%),linear-gradient(180deg,rgba(10,17,48,0.62)_0%,rgba(10,17,48,0.55)_45%,rgba(10,17,48,0.96)_88%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(35%_30%_at_80%_15%,rgba(6,51,176,0.35),transparent_70%)]" />
      </div>

      <div className={`${WRAP} pt-40 text-center sm:pt-48`}>
        <h1 className="f-titre mx-auto max-w-5xl text-balance text-[clamp(2.6rem,6vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.04em]">
          Créez, modifiez et gérez votre entreprise
          <br />
          <MotsRotatifs mots={MOTS} />
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
          {PROMESSE}
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Btn href="/contact?objet=creation" arrow>
            Démarrer mon dossier
          </Btn>
          <Btn href="tel:+2250709883293" variant="outline-light">
            Parler à un conseiller
          </Btn>
        </div>
      </div>

      {/* Maquette animée : suivi d'un dossier de création */}
      {/* Bande blanche pleine largeur : son bord haut se fond dans la photo (voile + léger flou) */}
      <div className="relative mt-20 sm:mt-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-full h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.4)_55%,#FFFFFF_100%)] backdrop-blur-[3px] [mask-image:linear-gradient(180deg,transparent,black_70%)] sm:h-28"
        />
        <SuiviDossier />
      </div>
    </section>
  );
}
