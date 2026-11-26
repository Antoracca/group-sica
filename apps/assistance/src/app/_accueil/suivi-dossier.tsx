"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { cn } from "@sica/ui";
import { ETAPES_FORMALITES } from "@/lib/contenu";

/*
  Suivi d'un dossier de création (hero) — bande blanche pleine largeur, fondue dans la photo du hero.
  Lecture en boucle, comme une vidéo :
    plan final (« Prise en charge terminée. » / « Merci pour votre confiance. ») pendant 6 s,
    puis les 6 étapes du document du DG, puis de nouveau le plan final, et ainsi de suite.
  Une seule piste horizontale glisse (transform GPU) : dans chaque étape, le texte (gauche) et les
  pièces traitées (droite) font partie du même bloc, donc ils bougent ensemble, sans décalage.
  Le retour au début se fait sans saut : le plan final existe deux fois (début et fin de piste) et
  l'on repasse de la copie à l'original sans transition, les deux étant identiques à l'écran.
  Le nom de chaque étape est présenté dans un ruban bleu qu'une jauge orange doux remplit.
  Photo : visuel d'illustration (pas une cliente réelle), à remplacer par une photo SICA dès
  qu'elle est disponible : public/media/prise-en-charge-terminee-clair.jpg.
*/

const DETAILS: { phase: string; resume: string; liste: string; pieces: string[] }[] = [
  {
    phase: "Préparation",
    resume: "Nous rassemblons avec vous les pièces et les informations à fournir.",
    liste: "Ce que nous réunissons",
    pieces: ["Pièces à fournir", "Informations du dossier"],
  },
  {
    phase: "Rédaction",
    resume: "Par notre notaire agréé ou sous seing privé.",
    liste: "Actes rédigés",
    pieces: ["Statuts", "DSNV ou DSV", "Contrat de bail", "Procès-verbal", "Règlement intérieur"],
  },
  {
    phase: "Enregistrement",
    resume: "Les actes de la société sont enregistrés auprès de la DGI.",
    liste: "Actes enregistrés",
    pieces: ["Statuts", "DSNV ou DSV", "Contrat de bail", "Procès-verbal"],
  },
  {
    phase: "Immatriculation",
    resume: "Immatriculation au RCCM et identifiant unique auprès du CEPICI.",
    liste: "Documents obtenus",
    pieces: ["RCCM", "PV de dépôt", "Certificat IDU · CEPICI", "Annexe CEPICI", "Avis de constitution"],
  },
  {
    phase: "Fiscalité",
    resume: "Rattachement du siège et/ou de la succursale au centre des impôts.",
    liste: "Démarches traitées",
    pieces: ["Visite du cadastre", "Rapport de localisation", "DFE légale", "Plateforme e-Impôts activée"],
  },
  {
    phase: "Sécurité sociale",
    resume: "Rattachement du siège et/ou de la succursale au centre de la CNPS.",
    liste: "Démarches traitées",
    pieces: ["Visite de géolocalisation", "Formulaires employeur et travailleurs", "Numéro CNPS légal", "Plateforme e-CNPS activée"],
  },
];

const N = ETAPES_FORMALITES.length;
/* Piste : 0 = plan final, 1..N = étapes, N + 1 = copie du plan final */
const COPIE = N + 1;
const FIN = 6000; // ms sur le plan final
const INTERVALLE = 3300; // ms par étape : le temps de lire, sans traîner

const CADRE = "mx-auto w-full max-w-[1200px] px-5 sm:px-8";

const STYLE = `
.sica-piste { transition: transform 1.25s cubic-bezier(.77,0,.18,1); will-change: transform; }
.sica-mv { transition: transform 1.25s cubic-bezier(.77,0,.18,1), opacity .9s ease; will-change: transform, opacity; }
[data-etat="avant"] .sica-mv { transform: translate3d(-64px,0,0); opacity: 0; }
[data-etat="apres"] .sica-mv { transform: translate3d(96px,0,0); opacity: 0; }
[data-etat="actif"] .sica-mv { transform: none; opacity: 1; transition-delay: var(--d, 0s); }
.sica-coche { transition: transform .5s cubic-bezier(.2,.8,.2,1), opacity .4s ease; transform: scale(.4); opacity: 0; }
[data-etat="actif"] .sica-coche { transform: none; opacity: 1; transition-delay: var(--d, 0s); }
.sica-mot { display: inline-block; transform: translate3d(0,110%,0); transition: transform 1.1s cubic-bezier(.2,.8,.1,1); }
[data-etat="actif"] .sica-mot { transform: none; transition-delay: var(--d, 0s); }
.sica-photo { transform: scale(1.1); transition: transform 5.2s cubic-bezier(.16,1,.3,1); transform-origin: 70% 35%; }
[data-etat="actif"] .sica-photo { transform: scale(1); }
.sica-trait { transform: scaleX(0); transform-origin: left; transition: transform 1s cubic-bezier(.65,0,.35,1); }
[data-etat="actif"] .sica-trait { transform: scaleX(1); transition-delay: var(--d, 0s); }
.sica-jauge { clip-path: inset(0 100% 0 0); transition: clip-path .8s cubic-bezier(.65,0,.35,1); }
[data-etat="actif"] .sica-jauge { clip-path: inset(0 0 0 0); transition-delay: var(--d, 0s); }
[data-saut] .sica-piste, [data-saut] .sica-piste * { transition: none !important; }
@media (prefers-reduced-motion: reduce) {
  .sica-piste, .sica-mv, .sica-coche, .sica-mot, .sica-photo, .sica-trait { transition: none !important; }
  .sica-jauge { transition: none !important; }
}
`;

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export function SuiviDossier() {
  const [actif, setActif] = useState(0);
  const [pret, setPret] = useState(false); // le panneau est entré à l'écran
  const [saut, setSaut] = useState(false); // retour copie → original, sans transition
  const boite = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPret(true);
      return;
    }
    const el = boite.current;
    if (!el) return;
    let t: ReturnType<typeof setTimeout> | undefined;
    let raf = 0;

    const aller = (q: number) => {
      setActif(q);
      if (q === COPIE) {
        /* fin du plan final (copie) : on repasse sur l'original sans transition, puis on enchaîne */
        t = setTimeout(() => {
          setSaut(true);
          setActif(0);
          raf = requestAnimationFrame(() => {
            raf = requestAnimationFrame(() => {
              setSaut(false);
              aller(1);
            });
          });
        }, FIN);
        return;
      }
      t = setTimeout(() => aller(q + 1), q === 0 ? FIN : INTERVALLE);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          io.disconnect();
          setPret(true);
          t = setTimeout(() => aller(1), FIN);
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, []);

  const etatDe = (i: number) => (!pret ? "apres" : i < actif ? "avant" : i > actif ? "apres" : "actif");

  return (
    <div
      ref={boite}
      data-saut={saut ? "" : undefined}
      className="relative h-[560px] overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#F4F5F7_62%,#FFFFFF_100%)] text-left text-ink sm:h-[480px]"
    >
      <style href="sica-suivi-dossier" precedence="default">
        {STYLE}
      </style>

      {/* En-tête fixe : seul le contenu défile */}
      <div className="relative z-10 border-b border-black/[0.06]">
        <div className={cn(CADRE, "flex items-center justify-between gap-4 py-4")}>
          <p className="truncate text-[13px] font-semibold text-ink">Création d&apos;une SARLU</p>
          <p className="hidden shrink-0 text-[13px] text-slate sm:block">Dossier suivi par SICA ASSISTANCE</p>
        </div>
      </div>

      {/* Piste unique */}
      <div className="absolute inset-x-0 bottom-0 top-[53px]">
        <div className="sica-piste flex h-full" style={{ transform: `translate3d(${-actif * 100}%,0,0)` }}>
          <PlanFinal etat={etatDe(0)} masque={actif !== 0} />

          {ETAPES_FORMALITES.map((e, i) => {
            const x = DETAILS[i]!;
            const pos = i + 1;
            return (
              <section
                key={e.titre}
                data-etat={etatDe(pos)}
                aria-hidden={actif !== pos}
                className="h-full w-full shrink-0"
              >
                <div
                  className={cn(
                    CADRE,
                    "grid content-start gap-7 pt-7 sm:pt-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16",
                  )}
                >
                  <div>
                    <Ruban texte={x.phase} />
                    <h3
                      className="sica-mv f-titre mt-6 text-balance text-[clamp(1.7rem,3.6vw,2.9rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-[#0A1130]"
                      style={d(0.12)}
                    >
                      {e.titre}
                    </h3>
                    <p
                      className="sica-mv mt-4 hidden max-w-md text-pretty text-[15px] leading-relaxed text-slate sm:block"
                      style={d(0.2)}
                    >
                      {x.resume}
                    </p>
                  </div>

                  <div>
                    <p className="sica-mv text-[11px] font-semibold uppercase tracking-[0.16em] text-slate/80" style={d(0.18)}>
                      {x.liste}
                    </p>
                    <ul className="mt-3">
                      {x.pieces.map((p, k) => (
                        <li
                          key={p}
                          className="sica-mv flex items-center justify-between gap-4 border-b border-black/[0.07] py-2.5"
                          style={d(0.22 + k * 0.06)}
                        >
                          <span className="text-[15px] font-medium text-[#0A1130]">{p}</span>
                          <Check
                            aria-hidden
                            className="sica-coche size-4 shrink-0 text-[#0A1130]"
                            strokeWidth={2.5}
                            style={d(0.7 + k * 0.12)}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            );
          })}

          <PlanFinal etat={etatDe(COPIE)} masque />
        </div>
      </div>

    </div>
  );
}

/* Nom de l'étape en ruban (même famille que les sur-titres « LE CONSTAT ») :
   le ruban est bleu, puis une jauge orange doux le remplit rapidement de gauche à droite ;
   le texte passe du blanc au bleu nuit au passage de la jauge. */
const RUBAN = "[clip-path:polygon(0_0,100%_0,calc(100%-14px)_50%,100%_100%,0_100%,14px_50%)]";
const TEXTE_RUBAN =
  "f-titre whitespace-nowrap px-7 py-2.5 text-[clamp(0.95rem,1.7vw,1.3rem)] font-extrabold uppercase leading-none tracking-[0.04em] sm:px-9 sm:py-3";

function Ruban({ texte }: { texte: string }) {
  return (
    <p className="sica-mv relative inline-flex -rotate-[2deg]" style={d(0.05)}>
      <span aria-hidden className={cn("absolute inset-0 translate-x-[5px] translate-y-[5px] bg-[#0A1130]", RUBAN)} />
      <span className={cn("relative inline-flex bg-brand-royal", RUBAN)}>
        <span className={cn(TEXTE_RUBAN, "text-white")}>{texte}</span>
        <span aria-hidden className="sica-jauge absolute inset-0 flex bg-[#FDAE5C]" style={d(0.75)}>
          <span className={cn(TEXTE_RUBAN, "text-[#0A1130]")}>{texte}</span>
        </span>
      </span>
    </p>
  );
}

/* Plan final : photo en léger zoom arrière, texte qui monte mot à mot. */
function PlanFinal({ etat, masque }: { etat: string; masque: boolean }) {
  return (
    <section data-etat={etat} aria-hidden={masque} className="relative h-full w-full shrink-0 overflow-hidden">
      <Image
        src="/media/prise-en-charge-terminee-clair.jpg"
        alt={masque ? "" : "Une femme souriante lève le pouce, satisfaite de sa prise en charge"}
        fill
        sizes="100vw"
        className="sica-photo object-cover object-[72%_32%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(0deg,#FFFFFF_12%,rgba(255,255,255,0.88)_40%,rgba(255,255,255,0)_66%)] md:bg-[linear-gradient(90deg,#FFFFFF_0%,rgba(255,255,255,0.9)_28%,rgba(255,255,255,0)_55%)]"
      />
      <div className="absolute inset-x-0 bottom-10 md:inset-y-0 md:flex md:items-center">
        <div className={CADRE}>
          <div className="md:max-w-[28rem]">
            <h3 className="f-titre text-[clamp(2.2rem,5vw,3.9rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-[#0A1130]">
              {["Prise", "en", "charge", "terminée."].map((m, k) => (
                <span key={m} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <span className="sica-mot" style={d(0.7 + k * 0.14)}>
                    {m}
                  </span>
                </span>
              ))}
            </h3>
            <span aria-hidden className="sica-trait mt-5 block h-[2px] w-14 bg-brand-amber" style={d(1.5)} />
            <p className="f-accent mt-4 text-[clamp(1.5rem,3vw,2.2rem)] italic leading-tight text-slate">
              {["Merci", "pour", "votre", "confiance."].map((m, k) => (
                <span key={m} className="mr-[0.2em] inline-block overflow-hidden pb-[0.1em] align-bottom">
                  <span className="sica-mot" style={d(1.7 + k * 0.12)}>
                    {m}
                  </span>
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
