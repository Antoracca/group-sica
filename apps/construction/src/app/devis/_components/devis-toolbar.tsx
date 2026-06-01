"use client";

import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  FileType,
  Home,
  ImagePlus,
  ListPlus,
  Printer,
  Search,
  Stamp,
} from "lucide-react";
import { OPTION_CATALOG, UNIT_LABEL } from "@/lib/devis/catalog";
import { computeTotals, formatFcfa } from "@/lib/devis/pricing";
import { exportDevisToWord } from "@/lib/devis/export-word";
import type { DevisState, OptionLine } from "@/lib/devis/types";

/* ── Bouton outil générique ─────────────────────────────────────────── */

function ToolButton({
  icon: Icon,
  label,
  onClick,
  accent,
  badge,
  title,
}: {
  icon: typeof Home;
  label: string;
  onClick: () => void;
  accent?: boolean;
  badge?: number;
  title?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title ?? label}
      className={`relative flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors ${
        accent
          ? "bg-brand-royal text-white hover:bg-brand-royal-700"
          : "text-ink hover:bg-mist"
      }`}
    >
      <Icon className="size-4" />
      <span className="hidden md:inline">{label}</span>
      {badge && badge > 0 ? (
        <span
          className={`absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-bold ${
            accent ? "bg-brand-amber text-brand-royal-900" : "bg-brand-amber text-white"
          }`}
        >
          {badge}
        </span>
      ) : null}
    </button>
  );
}

/* ── Toolbar ────────────────────────────────────────────────────────── */

export function DevisToolbar({
  state,
  setState,
  preview,
  onTogglePreview,
  onOpenSignatureStamp,
}: {
  state: DevisState;
  setState: Dispatch<SetStateAction<DevisState>>;
  preview: boolean;
  onTogglePreview: () => void;
  onOpenSignatureStamp: () => void;
}) {
  const [optMenu, setOptMenu] = useState(false);
  const [optQuery, setOptQuery] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const surface = state.projet.surface;
  const isStaff = state.role === "staff";

  useEffect(() => {
    if (!optMenu) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOptMenu(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [optMenu]);

  const filtered = useMemo(() => {
    const q = optQuery.trim().toLowerCase();
    return OPTION_CATALOG.filter((o) =>
      !q ? true : o.label.toLowerCase().includes(q) || o.detail.toLowerCase().includes(q),
    );
  }, [optQuery]);

  const addedSet = useMemo(
    () => new Set(state.options.map((o) => o.catalogId)),
    [state.options],
  );

  const toggleOption = (catalogId: string) => {
    setState((s) => {
      const exists = s.options.find((o) => o.catalogId === catalogId);
      if (exists) {
        return { ...s, options: s.options.filter((o) => o.catalogId !== catalogId) };
      }
      const def = OPTION_CATALOG.find((o) => o.id === catalogId);
      if (!def) return s;
      const line: OptionLine = {
        id: catalogId,
        catalogId,
        label: def.label,
        unit: def.unit,
        pu: def.pu,
        qty: def.defaultQty,
      };
      return { ...s, options: [...s.options, line] };
    });
  };

  const addImages = (files: FileList | null) => {
    if (!files) return;
    const added = Array.from(files).map((f) => ({
      id: crypto.randomUUID(),
      name: f.name,
      url: URL.createObjectURL(f),
    }));
    setState((s) => ({ ...s, annexes: [...s.annexes, ...added] }));
  };

  const hasSignature = !!state.signatureStaffUrl;
  const hasStamp = !!state.importedStamp || !!state.stampConfig;
  const stampSigBadge = (hasSignature ? 1 : 0) + (hasStamp ? 1 : 0);

  return (
    <div className="devis-no-print sticky top-0 z-30 flex h-14 items-center gap-1 border-b border-black/10 bg-white px-3 shadow-sm">
      {/* Accueil */}
      <a
        href="/"
        className="flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-brand-royal transition-colors hover:bg-mist"
      >
        <Home className="size-4" />
        <span className="hidden sm:inline">Accueil</span>
      </a>

      <span className="mx-1 hidden h-6 w-px bg-black/10 sm:block" />

      <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.12em] text-slate lg:inline">
        {state.ref}
      </span>
      {isStaff ? (
        <span className="ml-2 hidden rounded-full bg-brand-royal/10 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-brand-royal lg:inline">
          Personnel SICA
        </span>
      ) : null}

      <div className="ml-auto flex items-center gap-1">
        <ToolButton
          icon={preview ? EyeOff : Eye}
          label={preview ? "Quitter" : "Aperçu"}
          onClick={onTogglePreview}
          title={preview ? "Quitter l'aperçu plein écran" : "Aperçu plein écran"}
        />

        {/* ── Menu Option : recherche + toggle + résumé ── */}
        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setOptMenu((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={optMenu}
            className="relative flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-ink transition-colors hover:bg-mist"
          >
            <ListPlus className="size-4" />
            <span className="hidden md:inline">Options</span>
            <ChevronDown className={`size-3.5 transition-transform ${optMenu ? "rotate-180" : ""}`} />
            {state.options.length > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-brand-amber px-1 text-[10px] font-bold text-white">
                {state.options.length}
              </span>
            ) : null}
          </button>
          {optMenu ? (
            <div className="absolute right-0 top-full mt-1 w-[22rem] overflow-hidden rounded-xl border border-black/10 bg-white shadow-xl">
              <div className="flex items-center gap-2 border-b border-black/10 px-3 py-2">
                <Search className="size-4 text-slate" />
                <input
                  autoFocus
                  value={optQuery}
                  onChange={(e) => setOptQuery(e.target.value)}
                  placeholder="Rechercher une option..."
                  className="h-8 flex-1 bg-transparent text-sm outline-none placeholder:text-slate"
                />
              </div>
              <ul className="max-h-80 overflow-y-auto p-1.5">
                {filtered.length === 0 ? (
                  <li className="px-3 py-4 text-center text-sm text-slate">
                    Aucune option ne correspond.
                  </li>
                ) : (
                  filtered.map((o) => {
                    const added = addedSet.has(o.id);
                    const total = o.pu * o.defaultQty;
                    return (
                      <li key={o.id}>
                        <button
                          type="button"
                          onClick={() => toggleOption(o.id)}
                          aria-pressed={added}
                          className={`flex w-full items-start gap-2.5 rounded-lg px-3 py-2 text-left transition-colors ${
                            added ? "bg-brand-amber/10 hover:bg-brand-amber/15" : "hover:bg-mist"
                          }`}
                        >
                          <span
                            className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border ${
                              added
                                ? "border-brand-amber bg-brand-amber text-white"
                                : "border-black/20 bg-white"
                            }`}
                          >
                            {added ? <Check className="size-3.5" /> : null}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-medium text-ink">{o.label}</span>
                            <span className="block truncate text-xs text-slate">{o.detail}</span>
                          </span>
                          <span className="shrink-0 text-right">
                            <span className="block font-mono text-[0.7rem] font-semibold text-ink">
                              {formatFcfa(total)}
                            </span>
                            <span className="block font-mono text-[0.6rem] text-slate">
                              {o.defaultQty} {UNIT_LABEL[o.unit]}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>
              {state.options.length > 0 ? (
                <div className="border-t border-black/5 bg-mist/30 px-3 py-2 text-xs text-slate">
                  <span className="font-medium text-ink">{state.options.length}</span>{" "}
                  option{state.options.length > 1 ? "s" : ""} ajoutée
                  {state.options.length > 1 ? "s" : ""} — modifiez les quantités dans le
                  formulaire.
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* Images / annexes */}
        <ToolButton
          icon={ImagePlus}
          label="Images"
          onClick={() => imgInputRef.current?.click()}
          badge={state.annexes.length}
          title="Importer des photos / annexes"
        />
        <input
          ref={imgInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addImages(e.target.files)}
        />

        {/* Signature & Cachet — STAFF UNIQUEMENT */}
        {isStaff ? (
          <ToolButton
            icon={Stamp}
            label="Signature & cachet"
            onClick={onOpenSignatureStamp}
            badge={stampSigBadge}
            title="Configurer la signature et le cachet officiels"
          />
        ) : null}

        <span className="mx-1 h-6 w-px bg-black/10" />

        <ToolButton
          icon={FileType}
          label="Word"
          onClick={() => exportDevisToWord(state, computeTotals(state))}
        />

        <ToolButton
          icon={Printer}
          label="PDF"
          accent
          onClick={() => window.print()}
        />
      </div>

      {/* surface utilisée par les calculs déclenchés depuis ailleurs */}
      <span className="hidden" aria-hidden>
        {surface}
      </span>
    </div>
  );
}
