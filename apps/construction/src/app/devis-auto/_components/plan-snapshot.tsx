"use client";

import { Layers, Ruler, Home, Droplets } from "lucide-react";
import type { PlanInput, PieceType } from "@sica/devis-engine";

/*
  Synthèse compacte du plan lu par l'agent vision.
  Style « relevé technique » — pas d'icônes décoratives, chiffres tabular-nums.
*/

const PIECE_LABEL: Record<PieceType, string> = {
  chambre: "Chambre",
  sejour: "Séjour / Salon",
  cuisine: "Cuisine",
  sdb: "Salle d'eau",
  wc: "WC",
  douche: "Douche",
  terrasse: "Terrasse",
  veranda: "Véranda",
  couloir: "Couloir",
  autre: "Autre",
};

const STANDING_LABEL = {
  eco: "Économique",
  moyen: "Standard",
  haut: "Haut standing",
  premium: "Premium",
} as const;

interface Props {
  plan: PlanInput;
}

function fmtNum(n: number) {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 }).format(n);
}

export function PlanSnapshot({ plan }: Props) {
  const groupes = plan.pieces.reduce<Record<string, { count: number; surface: number; nom?: string }>>((acc, p) => {
    const k = p.type;
    if (!acc[k]) acc[k] = { count: 0, surface: 0 };
    acc[k].count += 1;
    acc[k].surface += p.surface_m2 ?? 0;
    return acc;
  }, {});

  const niveauxLabel = plan.niveaux === 1 ? "Plain-pied" : plan.niveaux === 2 ? "R+1" : `R+${plan.niveaux - 1}`;

  return (
    <section className="rounded-2xl border border-ink/8 bg-white p-6 shadow-[0_8px_30px_-15px_rgba(13,26,74,0.18)]">
      <header className="mb-5 flex items-baseline justify-between">
        <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-brand-royal">
          Compréhension du plan
        </p>
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-slate">
          Agent · Lecteur
        </p>
      </header>

      {/* Métriques saillantes */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Metric icon={Ruler} label="Surface habitable" value={`${fmtNum(plan.surfaceHabitable_m2)} m²`} />
        <Metric icon={Layers} label="Niveaux" value={niveauxLabel} />
        <Metric icon={Home} label="Standing détecté" value={STANDING_LABEL[plan.standing]} />
        <Metric icon={Droplets} label="Points d'eau" value={String((groupes.sdb?.count ?? 0) + (groupes.wc?.count ?? 0) + (groupes.douche?.count ?? 0))} />
      </div>

      {/* Pièces par type */}
      <div className="mt-6">
        <p className="mb-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-slate">
          Pièces identifiées
        </p>
        <ul className="divide-y divide-ink/5 overflow-hidden rounded-xl border border-ink/8 bg-paper">
          {Object.entries(groupes).map(([type, g]) => (
            <li key={type} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-4 py-2.5">
              <span className="text-sm font-medium text-ink">{PIECE_LABEL[type as PieceType] ?? type}</span>
              <span className="font-mono text-[0.72rem] tabular-nums text-slate">×{g.count}</span>
              <span className="font-mono text-[0.78rem] font-semibold tabular-nums text-ink">
                {fmtNum(g.surface)} m²
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Indices visuels */}
      {plan.indicesStanding && plan.indicesStanding.length > 0 ? (
        <div className="mt-5">
          <p className="mb-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-slate">
            Indices observés
          </p>
          <div className="flex flex-wrap gap-1.5">
            {plan.indicesStanding.map((indice) => (
              <span
                key={indice}
                className="inline-flex items-center rounded-full border border-brand-amber/30 bg-brand-amber/8 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-brand-amber-700"
              >
                {indice}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Ruler;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-ink/8 bg-paper p-3.5">
      <Icon className="size-4 text-brand-royal" strokeWidth={1.5} />
      <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-slate">
        {label}
      </p>
      <p className="mt-0.5 font-display text-base font-bold tabular-nums text-ink">{value}</p>
    </div>
  );
}
