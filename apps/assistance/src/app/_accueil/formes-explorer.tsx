"use client";

import { useState } from "react";
import { MousePointerClick } from "lucide-react";
import { cn } from "@sica/ui";
import { AUTRES_FORMES, FORMES } from "@/lib/contenu";

/* Formes juridiques présentées comme un index typographique : on choisit un sigle,
   sa fiche s'affiche à côté, directement sur le fond indigo (aucune carte). */

type Ligne = { label: string; texte: string };
type Entree = { sigle: string; nom: string; lignes: Ligne[] };

const ENTREES: Entree[] = [
  ...FORMES.map((f) => ({
    sigle: f.sigle,
    nom: f.nom,
    lignes: [
      { label: "Associés", texte: f.associes },
      { label: "Capital minimum", texte: f.capital },
      { label: "Responsabilité", texte: f.responsabilite },
      { label: "Idéal pour", texte: f.ideal },
    ],
  })),
  {
    sigle: "SNC · SCS",
    nom: "Autres formes juridiques",
    lignes: AUTRES_FORMES.map((a) => ({ label: a.nom, texte: a.texte })),
  },
];


/* Bouton « Clique pour comprendre » : pilule orange qui scintille, onde autour, main qui tapote. */
const STYLE_INDICE = `
@keyframes sica-scintille { 0% { background-position: 180% 0; } 100% { background-position: -80% 0; } }
@keyframes sica-tapote { 0%, 100% { transform: translate(0, 0) scale(1); } 45% { transform: translate(-2px, -2px) scale(0.86); } 60% { transform: translate(0, 0) scale(1.04); } }
@keyframes sica-flotte { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(6px); } }
@keyframes sica-halo { 0% { box-shadow: 0 0 0 0 rgba(247, 127, 0, 0.55), 0 10px 30px -8px rgba(247, 127, 0, 0.8); } 100% { box-shadow: 0 0 0 12px rgba(247, 127, 0, 0), 0 10px 30px -8px rgba(247, 127, 0, 0.8); } }
.sica-indice {
  background-image: linear-gradient(110deg, #F77F00 0%, #F77F00 38%, #FFD4A3 50%, #F77F00 62%, #F77F00 100%);
  background-size: 250% 100%;
  animation: sica-scintille 2.4s linear infinite, sica-flotte 2.4s ease-in-out infinite, sica-halo 1.6s ease-out infinite;
}
.sica-indice-main { animation: sica-tapote 1.2s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .sica-indice, .sica-indice-main { animation: none; }
}
`;

function Indice({ visible }: { visible: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative mt-2 inline-flex w-max items-center transition-all duration-500",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0",
      )}
    >
      <span className="sica-indice relative inline-flex items-center gap-2 rounded-full py-1.5 pl-2.5 pr-3.5 text-[13px] font-bold text-[#0A1130]">
        <MousePointerClick className="sica-indice-main size-4" strokeWidth={2.25} />
        Clique pour comprendre
      </span>
    </span>
  );
}

export function FormesExplorer() {
  const [actif, setActif] = useState(0);
  /* tant que le visiteur n'a pas cliqué, l'indice reste sur la forme suivante */
  const [touche, setTouche] = useState(false);
  const [survol, setSurvol] = useState<number | null>(null);
  const e = ENTREES[actif] ?? ENTREES[0]!;
  const suivante = (actif + 1) % ENTREES.length;

  const choisir = (i: number, defiler = true) => {
    setActif(i);
    setTouche(true);
    if (defiler && window.innerWidth < 1024) {
      document.getElementById("forme-fiche")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const clavier = (ev: React.KeyboardEvent<HTMLButtonElement>) => {
    if (ev.key !== "ArrowDown" && ev.key !== "ArrowRight" && ev.key !== "ArrowUp" && ev.key !== "ArrowLeft") return;
    ev.preventDefault();
    const pas = ev.key === "ArrowDown" || ev.key === "ArrowRight" ? 1 : -1;
    const n = (actif + pas + ENTREES.length) % ENTREES.length;
    choisir(n, false);
    document.getElementById(`forme-onglet-${n}`)?.focus();
  };

  const indiceSur = (i: number) => i !== actif && (survol === i || (!touche && survol === null && i === suivante));

  return (
    <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
      <style href="sica-formes-indice" precedence="default">
        {STYLE_INDICE}
      </style>
      <div role="tablist" aria-label="Formes juridiques" aria-orientation="vertical" className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 sm:gap-x-7" onMouseLeave={() => setSurvol(null)}>
        {ENTREES.map((x, i) => (
          <button
            key={x.sigle}
            id={`forme-onglet-${i}`}
            role="tab"
            type="button"
            aria-selected={actif === i}
            aria-controls="forme-fiche"
            tabIndex={actif === i ? 0 : -1}
            onClick={() => choisir(i)}
            onKeyDown={clavier}
            onMouseEnter={() => setSurvol(i)}
            className="group col-span-2 grid min-h-11 items-center py-1 text-left [grid-template-columns:subgrid] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:gap-x-7"
          >
            <span
              className={cn(
                "font-[family-name:var(--font-accent)] text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02] tracking-[-0.01em] transition-colors duration-300",
                actif === i ? "text-brand-amber" : "text-white/40 group-hover:text-white",
              )}
            >
              {x.sigle}
            </span>
            <span className="flex flex-col items-start">
              <span
                className={cn(
                  "text-sm font-medium leading-snug transition-colors duration-300 sm:text-base",
                  actif === i ? "text-white" : "text-white/60 group-hover:text-white",
                )}
              >
                {x.nom}
              </span>
              <span className="hidden sm:block">
                <Indice visible={indiceSur(i)} />
              </span>
            </span>
            {indiceSur(i) ? (
              <span className="col-span-2 sm:hidden">
                <Indice visible />
              </span>
            ) : null}
          </button>
        ))}
      </div>

      <div id="forme-fiche" role="tabpanel" aria-labelledby={`forme-onglet-${actif}`} className="scroll-mt-28 lg:pt-4">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/55">{e.sigle}</p>
        <h3 key={e.sigle} className="f-titre mt-3 text-balance text-[clamp(2rem,3.6vw,3.2rem)] font-extrabold leading-[1] tracking-[-0.03em] text-white">
          {e.nom}
        </h3>
        <dl className="mt-10 grid gap-x-12 gap-y-9 sm:grid-cols-2">
          {e.lignes.map((l) => (
            <div key={l.label}>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">{l.label}</dt>
              <dd className="mt-2 text-lg leading-snug text-white">{l.texte}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
