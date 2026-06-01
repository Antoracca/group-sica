"use client";

import { useId } from "react";
import {
  Circle,
  Plus,
  RectangleHorizontal,
  Square as SquareIcon,
  Trash2,
} from "lucide-react";
import type { StampConfig, StampShape } from "@/lib/devis/types";
import { StampRenderer } from "./stamp-renderer";

const SHAPES: { id: StampShape; label: string; icon: typeof Circle }[] = [
  { id: "circle", label: "Rond", icon: Circle },
  { id: "oval", label: "Ovale", icon: Circle },
  { id: "square", label: "Carré", icon: SquareIcon },
  { id: "rectangle", label: "Rectangle", icon: RectangleHorizontal },
];

const PRESET_COLORS = ["#1E2F8A", "#0B1020", "#B5283A", "#1F8A56", "#000000"];

export function StampBuilder({
  config,
  onChange,
}: {
  config: StampConfig;
  onChange: (next: StampConfig) => void;
}) {
  const id = useId();
  const round = config.shape === "circle" || config.shape === "oval";

  const set = <K extends keyof StampConfig>(key: K, value: StampConfig[K]) =>
    onChange({ ...config, [key]: value });

  const setLine = (i: number, value: string) => {
    const next = [...config.lines];
    next[i] = value;
    onChange({ ...config, lines: next });
  };

  const addLine = () => onChange({ ...config, lines: [...config.lines, ""] });
  const removeLine = (i: number) =>
    onChange({ ...config, lines: config.lines.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-4">
      {/* Aperçu live */}
      <div className="flex justify-center rounded-xl border border-black/10 bg-[radial-gradient(circle_at_center,#fff_0%,#eef1f7_100%)] p-6">
        <StampRenderer config={config} />
      </div>

      {/* Forme */}
      <fieldset>
        <legend className="mb-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-slate">
          Forme
        </legend>
        <div className="grid grid-cols-4 gap-2">
          {SHAPES.map((s) => {
            const Icon = s.icon;
            const active = s.id === config.shape;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => set("shape", s.id)}
                aria-pressed={active}
                className={`flex min-h-[60px] flex-col items-center justify-center gap-1 rounded-lg border text-xs font-semibold transition-colors ${
                  active
                    ? "border-brand-royal bg-brand-royal/5 text-brand-royal"
                    : "border-black/10 bg-white text-slate hover:bg-mist"
                }`}
              >
                <Icon className={s.id === "oval" ? "size-5 scale-x-150" : "size-5"} />
                {s.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Sliders + couleur */}
      <div className="space-y-3">
        <SliderField
          id={`${id}-size`}
          label={`Taille : ${config.size} px`}
          value={config.size}
          min={120}
          max={260}
          step={10}
          onChange={(v) => set("size", v)}
        />
        <SliderField
          id={`${id}-border`}
          label={`Épaisseur du contour : ${config.borderWidth} px`}
          value={config.borderWidth}
          min={1}
          max={8}
          step={1}
          onChange={(v) => set("borderWidth", v)}
        />

        <div>
          <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-slate">
            Couleur
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {PRESET_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => set("color", c)}
                aria-label={`Couleur ${c}`}
                className={`size-9 rounded-full border-2 transition-transform hover:scale-110 ${
                  config.color === c ? "border-brand-amber" : "border-black/10"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
            <label className="flex size-9 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-black/20 text-slate hover:bg-mist">
              <input
                type="color"
                value={config.color}
                onChange={(e) => set("color", e.target.value)}
                className="size-0 opacity-0"
                aria-label="Choisir une autre couleur"
              />
              <Plus className="size-4" />
            </label>
          </div>
        </div>
      </div>

      {/* Texte courbé (round only) */}
      {round ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <TextField
            label="Texte courbé haut"
            value={config.curvedTop}
            onChange={(v) => set("curvedTop", v)}
          />
          <TextField
            label="Texte courbé bas"
            value={config.curvedBottom}
            onChange={(v) => set("curvedBottom", v)}
          />
        </div>
      ) : null}

      {/* Lignes centrales */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-slate">
            Lignes centrales
          </p>
          <button
            type="button"
            onClick={addLine}
            className="flex h-8 items-center gap-1 rounded-md px-2 text-xs font-semibold text-brand-royal hover:bg-mist"
          >
            <Plus className="size-3.5" /> Ajouter
          </button>
        </div>
        <ul className="space-y-2">
          {config.lines.map((line, i) => (
            <li key={i} className="flex items-center gap-2">
              <input
                value={line}
                onChange={(e) => setLine(i, e.target.value)}
                placeholder={`Ligne ${i + 1}`}
                className="h-10 flex-1 rounded-lg border border-black/10 bg-white px-3 text-sm outline-none focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/15"
              />
              <button
                type="button"
                onClick={() => removeLine(i)}
                aria-label={`Retirer la ligne ${i + 1}`}
                className="flex size-10 items-center justify-center rounded-lg text-slate hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SliderField({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block font-mono text-[0.65rem] uppercase tracking-[0.14em] text-slate"
      >
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand-amber"
      />
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[0.65rem] uppercase tracking-[0.14em] text-slate">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-lg border border-black/10 bg-white px-3 text-sm outline-none focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/15"
      />
    </label>
  );
}
