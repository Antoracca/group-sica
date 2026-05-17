"use client";

import { useMemo, useState } from "react";

type ProjectType = "villa" | "immeuble" | "extension" | "rehabilitation";
type Locality = "abidjan" | "interieur" | "hors-ci";
type Urgency = "normal" | "rapide" | "urgent";

const baseRateByType: Record<ProjectType, number> = {
  villa: 280_000,
  immeuble: 340_000,
  extension: 240_000,
  rehabilitation: 210_000,
};

const localityFactor: Record<Locality, number> = {
  abidjan: 1,
  interieur: 1.08,
  "hors-ci": 1.2,
};

const urgencyFactor: Record<Urgency, number> = {
  normal: 1,
  rapide: 1.12,
  urgent: 1.22,
};

function formatFcfa(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function HeroEstimator() {
  const [type, setType] = useState<ProjectType>("villa");
  const [surface, setSurface] = useState(240);
  const [locality, setLocality] = useState<Locality>("abidjan");
  const [urgency, setUrgency] = useState<Urgency>("normal");

  const { low, high } = useMemo(() => {
    const base = baseRateByType[type] * surface;
    const weighted = base * localityFactor[locality] * urgencyFactor[urgency];
    return {
      low: weighted * 0.88,
      high: weighted * 1.14,
    };
  }, [type, surface, locality, urgency]);

  const query = new URLSearchParams({
    type,
    surface: String(surface),
    locality,
    urgency,
  }).toString();

  return (
    <aside className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-amber">
        Estimateur express
      </p>
      <h2 className="mt-3 font-display text-2xl font-semibold">Pré-cadrage devis</h2>

      <div className="mt-4 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-white/75">
            Type de projet
          </span>
          <select
            value={type}
            onChange={(event) => setType(event.target.value as ProjectType)}
            className="w-full rounded-xl border border-white/30 bg-white/20 px-3 py-2 text-sm text-white outline-none transition focus:border-brand-amber/80"
          >
            <option value="villa" className="text-ink">Villa</option>
            <option value="immeuble" className="text-ink">Immeuble</option>
            <option value="extension" className="text-ink">Extension</option>
            <option value="rehabilitation" className="text-ink">Réhabilitation</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-white/75">
            Surface estimée · {surface} m²
          </span>
          <input
            type="range"
            min={60}
            max={2000}
            step={10}
            value={surface}
            onChange={(event) => setSurface(Number(event.target.value))}
            className="w-full accent-brand-amber"
          />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-white/75">
              Localité
            </span>
            <select
              value={locality}
              onChange={(event) => setLocality(event.target.value as Locality)}
              className="w-full rounded-xl border border-white/30 bg-white/20 px-3 py-2 text-sm text-white outline-none transition focus:border-brand-amber/80"
            >
              <option value="abidjan" className="text-ink">Abidjan</option>
              <option value="interieur" className="text-ink">Intérieur du pays</option>
              <option value="hors-ci" className="text-ink">Hors Côte d'Ivoire</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-white/75">
              Urgence
            </span>
            <select
              value={urgency}
              onChange={(event) => setUrgency(event.target.value as Urgency)}
              className="w-full rounded-xl border border-white/30 bg-white/20 px-3 py-2 text-sm text-white outline-none transition focus:border-brand-amber/80"
            >
              <option value="normal" className="text-ink">Cadence normale</option>
              <option value="rapide" className="text-ink">Accélérée</option>
              <option value="urgent" className="text-ink">Urgente</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-white/20 bg-black/20 p-3.5">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-white/65">
          Fourchette initiale
        </p>
        <p className="mt-1 text-lg font-bold text-white">
          {formatFcfa(low)} – {formatFcfa(high)} FCFA
        </p>
        <p className="mt-1 text-xs text-white/60">
          Estimation indicative avant visite site et étude technique.
        </p>
      </div>

      <a
        href={`/devis?${query}`}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-brand-royal transition hover:bg-brand-amber hover:text-white"
      >
        Continuer avec ces paramètres
      </a>
    </aside>
  );
}

