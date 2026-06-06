"use client";

import { useState, useTransition } from "react";
import { Check, Loader2, Pencil, X } from "lucide-react";
import { updateDevisLine } from "../actions";

/*
  Cellule éditable inline pour une ligne de devis.
  Double-clic → édition / Enter → sauvegarde / Échap → annule.
*/

interface Props {
  generationId: string;
  lotCode: string;
  sousLotCode: string;
  ligneIndex: number;
  field: "quantite" | "pu" | "designation";
  value: string | number;
  className?: string;
  numeric?: boolean;
}

export function EditableCell({
  generationId,
  lotCode,
  sousLotCode,
  ligneIndex,
  field,
  value,
  className = "",
  numeric = false,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const handleSave = () => {
    setError(null);
    startTransition(async () => {
      const res = await updateDevisLine({
        generationId,
        lotCode,
        sousLotCode,
        ligneIndex,
        field,
        value: numeric ? Number(draft) : draft,
      });
      if (res?.error) {
        setError(res.error);
        return;
      }
      setEditing(false);
    });
  };

  if (!editing) {
    return (
      <span className={`group inline-flex items-center gap-1 ${className}`}>
        <span>{value}</span>
        <button
          type="button"
          onClick={() => {
            setDraft(String(value));
            setEditing(true);
          }}
          aria-label="Modifier"
          className="opacity-0 transition-opacity group-hover:opacity-100"
        >
          <Pencil className="size-3 text-slate-400 hover:text-slate-700" />
        </button>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1">
      <input
        autoFocus
        type={numeric ? "number" : "text"}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSave();
          if (e.key === "Escape") setEditing(false);
        }}
        className={`h-8 rounded border border-slate-300 px-2 text-sm outline-none focus:border-[#1E2F8A] ${numeric ? "w-24 text-right tabular-nums" : "w-48"}`}
      />
      <button
        type="button"
        onClick={handleSave}
        disabled={pending}
        aria-label="Sauvegarder"
        className="flex size-7 items-center justify-center rounded text-emerald-700 hover:bg-emerald-50"
      >
        {pending ? <Loader2 className="size-3.5 animate-spin" /> : <Check className="size-3.5" />}
      </button>
      <button
        type="button"
        onClick={() => setEditing(false)}
        aria-label="Annuler"
        className="flex size-7 items-center justify-center rounded text-slate-500 hover:bg-slate-100"
      >
        <X className="size-3.5" />
      </button>
      {error ? <span className="text-xs text-rose-700">{error}</span> : null}
    </span>
  );
}
