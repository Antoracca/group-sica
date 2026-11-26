"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Phone, Send, X } from "lucide-react";
import { cn } from "@sica/ui";
import { chercher, SUGGESTIONS } from "@/lib/assistant";

/*
  Assistant « SICA ASSISTANCE » (DESIGN.md §9).
  - Lanceur animé (styles : globals.css, bloc « Assistant IA SICA — lanceur animé ») :
      cache : dans le hero, seul le petit bandeau blanc « SICA ASSISTANCE » est visible ;
      sorti : en descendant, le bonhomme sort de derrière le bandeau (ressort, salut, bulle) ;
      epie  : en remontant, il plonge derrière le bandeau mais laisse dépasser antenne, haut de la tête et yeux.
  - Les réponses viennent uniquement des fiches du site (lib/assistant.ts) ; sinon, renvoi vers un conseiller.
*/

type Etat = "cache" | "sorti" | "epie";

/* Écart minimal de défilement (px) avant de décider du sens. */
const SEUIL_SENS = 10;

type Message = { de: "ia" | "moi"; texte: string; lien?: string };

/* Accueil : chaleureux, professionnel, adapté au moment de la journée. */
function accueil(): Message[] {
  const h = new Date().getHours();
  const salut = h >= 18 || h < 5 ? "Bonsoir" : "Bonjour";
  return [
    { de: "ia", texte: `${salut} et bienvenue chez SICA ASSISTANCE. Comment allez-vous aujourd'hui ?` },
    {
      de: "ia",
      texte:
        "Créer votre société, la modifier, tenir votre comptabilité ou y voir clair dans vos impôts en Côte d'Ivoire : je vous réponds tout de suite. Que souhaitez-vous savoir ? Par exemple :",
    },
  ];
}

/* Échanges de politesse : on répond comme un vrai conseiller, sans chercher dans les fiches. */
const sansAccents = (t: string) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

function politesse(q: string): string | null {
  const t = sansAccents(q).replace(/[^a-z' ]/g, " ").replace(/\s+/g, " ").trim();
  if (/^(merci|merci beaucoup|super merci|ok merci|parfait|top)\b/.test(t))
    return "Avec plaisir. Une autre question ? Je reste à votre disposition, et un conseiller SICA ASSISTANCE peut aussi vous rappeler.";
  if (/\b(ca va|je vais bien|bien et vous|tres bien|ca va bien|pas mal)\b/.test(t) && t.split(" ").length <= 6)
    return "Très bien, merci ! Ravi de vous accompagner. Dites-moi ce qui vous amène : création, modification, gestion ou impôts ?";
  if (/^(bonjour|bonsoir|salut|hello|coucou|bjr|bsr)\b/.test(t) && t.split(" ").length <= 4)
    return "Bonjour ! Comment puis-je vous aider ? Vous pouvez me demander, par exemple, les pièces à fournir pour créer une SARL ou le taux de TVA.";
  if (/^(au revoir|bonne journee|bonne soiree|a bientot)\b/.test(t))
    return "Au plaisir ! L'équipe SICA ASSISTANCE vous accueille à Abidjan et à Yamoussoukro, ou au (+225) 07 09 88 32 93.";
  return null;
}

export function Bonhomme({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 84 96" aria-hidden className={className}>
      {/* bras gauche */}
      <path d="M18 70 Q9 78 13 89" fill="none" strokeWidth="7" strokeLinecap="round" className="stroke-brand-amber" />
      {/* corps */}
      <path d="M14 94 C14 71 25 60 40 60 C55 60 66 71 66 94 Z" className="fill-brand-amber" />
      <path d="M33 61 L40 73 L47 61" fill="none" stroke="white" strokeWidth="2.5" strokeLinejoin="round" />
      {/* bras qui salue */}
      <g className="sica-salut">
        <path d="M63 72 Q77 63 75 47" fill="none" strokeWidth="7" strokeLinecap="round" className="stroke-brand-amber" />
        <circle cx="75" cy="44" r="5.5" className="fill-brand-royal" />
      </g>
      {/* tête, avec l'antenne : se penche quand il épie */}
      <g className="sica-ia-tete">
        <line x1="40" y1="14" x2="40" y2="6" strokeWidth="2.5" strokeLinecap="round" className="stroke-brand-royal" />
        <circle cx="40" cy="5" r="3.5" className="fill-brand-amber" />
        <circle cx="40" cy="36" r="22" className="fill-brand-royal" />
        <rect x="24" y="26" width="32" height="20" rx="10" fill="white" fillOpacity="0.14" />
        {/* regard (glisse sur le côté quand il épie), puis yeux (clignent) */}
        <g className="sica-ia-regard">
          <g className="sica-ia-yeux">
            <ellipse cx="33" cy="35" rx="3" ry="4" fill="white" />
            <ellipse cx="47" cy="35" rx="3" ry="4" fill="white" />
          </g>
        </g>
        <path d="M34 42 Q40 47 46 42" fill="none" strokeWidth="2.5" strokeLinecap="round" className="stroke-brand-amber" />
      </g>
    </svg>
  );
}

export function AssistantSica() {
  const [etat, setEtat] = useState<Etat>("cache");
  const etatRef = useRef<Etat>("cache");
  const [ouvert, setOuvert] = useState(false);
  const [messages, setMessages] = useState<Message[]>(accueil);
  const [saisie, setSaisie] = useState("");
  const champ = useRef<HTMLInputElement>(null);
  const fil = useRef<HTMLDivElement>(null);
  const lanceur = useRef<HTMLButtonElement>(null);
  const etaitOuvert = useRef(false);

  const changerEtat = (e: Etat) => {
    if (etatRef.current === e) return;
    etatRef.current = e;
    setEtat(e);
  };

  /*
    Un seul écouteur scroll passif, lu au rythme de requestAnimationFrame.
    React ne refait un rendu que lorsque l'état change (jamais à chaque pixel).
  */
  useEffect(() => {
    let repere = window.scrollY;
    let image = 0;
    const definir = (e: Etat) => {
      if (etatRef.current === e) return;
      etatRef.current = e;
      setEtat(e);
    };
    const evaluer = () => {
      image = 0;
      const y = window.scrollY;
      if (y < window.innerHeight * 0.6) {
        definir("cache");
        repere = y;
        return;
      }
      const ecart = y - repere;
      if (Math.abs(ecart) < SEUIL_SENS) return;
      definir(ecart > 0 ? "sorti" : "epie");
      repere = y;
    };
    const onScroll = () => {
      if (!image) image = window.requestAnimationFrame(evaluer);
    };
    /* Page rechargée au milieu : le bonhomme est déjà sorti. */
    image = window.requestAnimationFrame(() => {
      image = 0;
      if (window.scrollY >= window.innerHeight * 0.6) definir("sorti");
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (image) window.cancelAnimationFrame(image);
    };
  }, []);

  /* À la fermeture de la discussion, le focus revient au lanceur. */
  useEffect(() => {
    if (ouvert) {
      etaitOuvert.current = true;
    } else if (etaitOuvert.current) {
      etaitOuvert.current = false;
      lanceur.current?.focus({ preventScroll: true });
    }
  }, [ouvert]);

  useEffect(() => {
    if (!ouvert) return;
    champ.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ouvert]);

  useEffect(() => {
    fil.current?.scrollTo({ top: fil.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const poser = (question: string) => {
    const q = question.trim();
    if (!q) return;
    const poli = politesse(q);
    const fiche = poli ? null : chercher(q);
    const reponse: Message = poli
      ? { de: "ia", texte: poli }
      : fiche
      ? { de: "ia", texte: fiche.reponse, lien: fiche.lien }
      : {
          de: "ia",
          texte:
            "Bonne question, et je préfère vous donner une réponse exacte. Un conseiller SICA ASSISTANCE vous répond au (+225) 07 09 88 32 93 ou à groupesica@gmail.com.",
          lien: "/contact",
        };
    setMessages((m) => [...m, { de: "moi", texte: q }, reponse]);
    setSaisie("");
  };

  return (
    <>
      {/* Lanceur : le bonhomme sort de derrière le petit bandeau blanc, ou s'y cache en épiant */}
      <button
        ref={lanceur}
        type="button"
        onClick={() => setOuvert(true)}
        onFocus={(e) => {
          /* Au clavier, il sort pour que l'on voie bien l'élément qui a le focus. */
          if (e.currentTarget.matches(":focus-visible")) changerEtat("sorti");
        }}
        aria-label="Ouvrir SICA ASSISTANCE : posez vos questions"
        aria-hidden={ouvert}
        tabIndex={ouvert ? -1 : 0}
        data-etat={etat}
        className={cn(
          "sica-ia group fixed bottom-[calc(4.25rem+env(safe-area-inset-bottom))] right-[max(0.625rem,env(safe-area-inset-right))] z-40 flex items-end gap-2 outline-none md:bottom-5 sm:right-6 lg:bottom-0",
          "transition-[opacity,visibility] duration-300",
          ouvert ? "invisible opacity-0" : "visible opacity-100",
        )}
      >
        {/* Bulle : apparaît quand il sort, se replie quand il se cache */}
        <span className="sica-ia-bulle mb-[5.5rem] hidden rounded-2xl rounded-br-sm bg-white px-4 py-2.5 text-left shadow-xl ring-1 ring-black/5 sm:block">
          <span className="f-titre block whitespace-nowrap text-base font-extrabold leading-tight text-brand-royal">SICA ASSISTANCE</span>
          <span className="block whitespace-nowrap text-[13px] text-slate">Posez vos questions</span>
        </span>

        <span className="flex flex-col items-center">
          {/* Fenêtre coupée au ras du haut du bandeau : le bonhomme disparaît vraiment derrière */}
          <span className="sica-ia-fenetre relative block h-14 w-12 sm:h-28 sm:w-24">
            <span className="sica-ia-corps absolute inset-0 block">
              <span className="sica-ia-ressort block h-full w-full">
                <Bonhomme className="h-full w-full drop-shadow-xl" />
              </span>
            </span>
          </span>

          {/* Petit bandeau blanc, devant le bonhomme */}
          <span
            className={cn(
              "sica-ia-bandeau relative z-10 flex h-7 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-white/95 px-2.5 backdrop-blur sm:h-11 sm:rounded-2xl sm:px-4 lg:rounded-b-none lg:rounded-t-2xl",
              "shadow-[0_4px_14px_-4px_rgba(10,17,48,0.3)] sm:shadow-[0_-4px_22px_-6px_rgba(10,17,48,0.28)] ring-1 ring-black/5",
              "group-focus-visible:ring-2 group-focus-visible:ring-brand-amber",
            )}
          >
            <span aria-hidden className="absolute inset-x-4 top-0 hidden h-[3px] sm:block sm:inset-x-6 rounded-b-full bg-brand-royal" />
            <span className="f-titre text-[8.5px] font-extrabold uppercase tracking-[0.1em] text-brand-royal sm:text-[11px] sm:tracking-[0.12em]"><span className="sm:hidden">Aide</span><span className="hidden sm:inline">SICA ASSISTANCE</span></span>
          </span>
        </span>
      </button>

      {/* Fenêtre de discussion */}
      {ouvert ? (
        <div className="fixed inset-0 z-[60] flex items-end justify-end sm:p-6">
          <button
            type="button"
            aria-label="Fermer"
            className="absolute inset-0 bg-[#0A1130]/40 backdrop-blur-[2px]"
            onClick={() => setOuvert(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="SICA ASSISTANCE"
            className="relative flex h-[85dvh] w-full flex-col overflow-hidden rounded-t-[28px] bg-white shadow-2xl sm:h-[620px] sm:max-h-[85vh] sm:w-[400px] sm:rounded-[28px]"
          >
            <div className="relative flex items-center gap-3 bg-[#0A1130] px-5 py-4 text-white">
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_90%_at_0%_0%,rgba(6,51,176,0.7),transparent_70%)]" />
              <span className="relative grid size-12 place-items-center rounded-2xl bg-white">
                <Bonhomme className="h-10 w-9" />
              </span>
              <div className="relative flex-1">
                <p className="f-titre text-lg font-extrabold leading-tight">SICA ASSISTANCE</p>
                <p className="text-xs text-white/70">Assistant en ligne · réponses immédiates</p>
              </div>
              <button
                type="button"
                onClick={() => setOuvert(false)}
                className="relative grid size-11 place-items-center rounded-xl hover:bg-white/10"
                aria-label="Fermer SICA ASSISTANCE"
              >
                <X className="size-5" />
              </button>
            </div>

            <div ref={fil} className="flex-1 space-y-3 overflow-y-auto bg-[#F5F6F8] px-4 py-5" aria-live="polite">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex", m.de === "moi" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      m.de === "moi"
                        ? "rounded-br-sm bg-brand-royal text-white"
                        : "rounded-bl-sm bg-white text-ink shadow-sm ring-1 ring-black/5",
                    )}
                  >
                    {m.texte}
                    {m.lien ? (
                      <a href={m.lien} className="mt-2 flex items-center gap-1.5 text-[13px] font-semibold text-brand-royal hover:underline">
                        En savoir plus <ArrowRight aria-hidden className="size-3.5" />
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
              {messages.length === 2 && messages[0]?.de === "ia" && messages[1]?.de === "ia" ? (
                <div className="flex flex-wrap gap-2 pt-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => poser(s)}
                      className="min-h-9 rounded-full border border-brand-royal/20 bg-white px-3.5 text-[13px] font-medium text-brand-royal hover:bg-brand-royal hover:text-white"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                poser(saisie);
              }}
              className="border-t border-slate-200/70 bg-white p-3"
            >
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-4 pr-1 focus-within:border-brand-royal">
                <label htmlFor="ia-sica-question" className="sr-only">
                  Votre question
                </label>
                <input
                  id="ia-sica-question"
                  ref={champ}
                  value={saisie}
                  onChange={(e) => setSaisie(e.target.value)}
                  placeholder="Ex. : quel capital pour une SARL ?"
                  className="min-h-10 flex-1 bg-transparent text-base text-ink outline-none sm:text-sm"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="grid size-10 place-items-center rounded-full bg-brand-amber text-ink hover:bg-brand-amber-600"
                  aria-label="Envoyer la question"
                >
                  <Send className="size-4" />
                </button>
              </div>
              <p className="mt-2 flex items-center justify-between gap-2 px-2 text-[11px] text-slate">
                <span>Réponses tirées des fiches SICA ASSISTANCE, à titre indicatif.</span>
                <a href="tel:+2250709883293" className="flex shrink-0 items-center gap-1 font-semibold text-brand-royal">
                  <Phone aria-hidden className="size-3" /> Appeler
                </a>
              </p>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
