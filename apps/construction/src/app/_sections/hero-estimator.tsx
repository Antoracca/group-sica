"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";

/*
  Estimateur express — pré-cadrage budgétaire dans le hero.
  8 typologies de projet, sélection tactile, recalcul live avec feedback
  animé. Carte « glass » posée sur le hero sombre. Tokens : font-mono pour
  les labels (signature ingénierie), brand-amber pour l'état actif.
*/

const TYPES = [
  { id: "neuve", label: "Construction neuve", rate: 280_000 },
  { id: "rehabilitation", label: "Réhabilitation", rate: 210_000 },
  { id: "extension", label: "Extension", rate: 240_000 },
  { id: "amenagement", label: "Aménagement", rate: 160_000 },
  { id: "genie-civil", label: "Génie civil", rate: 320_000 },
  { id: "industriel", label: "Bâtiment industriel", rate: 300_000 },
  { id: "commercial", label: "Bâtiment commercial", rate: 290_000 },
  { id: "infrastructure", label: "Infrastructure", rate: 350_000 },
] as const;
type TypeId = (typeof TYPES)[number]["id"];

const LOCALITIES = [
  { id: "abidjan", label: "Abidjan", factor: 1 },
  { id: "interieur", label: "Intérieur", factor: 1.08 },
  { id: "hors-ci", label: "Hors CI", factor: 1.2 },
] as const;
type LocalityId = (typeof LOCALITIES)[number]["id"];

const URGENCIES = [
  { id: "normal", label: "Normale", factor: 1 },
  { id: "rapide", label: "Accélérée", factor: 1.12 },
  { id: "urgent", label: "Urgente", factor: 1.22 },
] as const;
type UrgencyId = (typeof URGENCIES)[number]["id"];

function formatFcfa(value: number) {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(
    Math.round(value),
  );
}

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <div>
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-[#475569]">
        {label}
      </p>
      <div role="group" aria-label={label} className="grid grid-cols-3 gap-1.5">
        {options.map((opt) => {
          const selected = opt.id === value;
          return (
            <button
              key={opt.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(opt.id)}
              className={[
                "min-h-[44px] rounded-lg px-2 text-[0.8rem] font-semibold transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber/70",
                selected
                  ? "bg-brand-amber text-[#1E2F8A]"
                  : "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]",
              ].join(" ")}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function HeroEstimator() {
  const [type, setType] = useState<TypeId>("neuve");
  const [surface, setSurface] = useState(240);
  const [locality, setLocality] = useState<LocalityId>("abidjan");
  const [urgency, setUrgency] = useState<UrgencyId>("normal");

  const { low, high } = useMemo(() => {
    const rate = TYPES.find((t) => t.id === type)!.rate;
    const localityFactor = LOCALITIES.find((l) => l.id === locality)!.factor;
    const urgencyFactor = URGENCIES.find((u) => u.id === urgency)!.factor;
    const weighted = rate * surface * localityFactor * urgencyFactor;
    return { low: weighted * 0.85, high: weighted * 1.15 };
  }, [type, surface, locality, urgency]);

  const query = new URLSearchParams({
    type,
    surface: String(surface),
    locality,
    urgency,
  }).toString();

  return (
    <aside className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.15)] sm:p-6">
      <div className="flex items-center gap-3">
        <span aria-hidden className="h-px w-6 bg-brand-amber" />
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-brand-amber">
          Estimateur express
        </p>
      </div>
      <h2 className="mt-3 font-display text-2xl font-semibold text-black">
        Pré-cadrage de votre projet
      </h2>

      {/* Typologie — grille tactile */}
      <div className="mt-5">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-[#475569]">
          Nature des travaux
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          {TYPES.map((t) => {
            const selected = t.id === type;
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setType(t.id)}
                className={[
                  "min-h-[44px] rounded-lg px-3 text-left text-[0.8rem] font-semibold leading-tight transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber/70",
                  selected
                    ? "bg-brand-amber text-[#1E2F8A]"
                    : "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]",
                ].join(" ")}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Surface */}
      <div className="mt-5">
        <div className="mb-2 flex items-baseline justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#475569]">
            Surface estimée
          </p>
          <p className="font-mono text-sm font-semibold text-black">
            {surface} m²
          </p>
        </div>
        <input
          type="range"
          min={40}
          max={3000}
          step={10}
          value={surface}
          onChange={(e) => setSurface(Number(e.target.value))}
          aria-label={`Surface estimée ${surface} mètres carrés`}
          className="w-full accent-brand-amber"
        />
      </div>

      {/* Localité + urgence */}
      <div className="mt-5 space-y-4">
        <Segmented
          label="Localité"
          options={LOCALITIES}
          value={locality}
          onChange={setLocality}
        />
        <Segmented
          label="Cadence"
          options={URGENCIES}
          value={urgency}
          onChange={setUrgency}
        />
      </div>

      {/* Résultat — feedback animé */}
      <div className="mt-6 overflow-hidden rounded-xl border border-[#1E2F8A]/10 bg-[#1E2F8A]/5 p-4">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[#1E2F8A]/80">
          Fourchette initiale
        </p>
        <div className="mt-1 h-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={`${low}-${high}`}
              initial={{ y: "60%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-60%", opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-xl font-bold text-[#1E2F8A]"
            >
              {formatFcfa(low)} – {formatFcfa(high)}{" "}
              <span className="font-mono text-sm font-medium text-brand-amber">
                FCFA
              </span>
            </motion.p>
          </AnimatePresence>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-[#475569]">
          Estimation indicative, avant visite de site et étude technique.
        </p>
      </div>

      <a
        href={`/devis?${query}`}
        className="group mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#1E2F8A] px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-amber hover:text-[#1E2F8A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E2F8A]"
      >
        Continuer avec ces paramètres
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </a>
    </aside>
  );
}
