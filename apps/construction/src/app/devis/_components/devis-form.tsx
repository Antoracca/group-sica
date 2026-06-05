"use client";

import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useState,
} from "react";
import {
  Building2,
  Car,
  Check,
  ChevronDown,
  DraftingCompass,
  DoorOpen,
  Fence,
  FileCheck2,
  Hammer,
  Images,
  MapPin,
  PaintRoller,
  Plus,
  PackageOpen,
  Tractor,
  TrafficCone,
  Trash2,
  Trees,
  Truck,
  UserRound,
  Wallet,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  CIVILITES,
  DELAIS,
  MODALITES_PAIEMENT,
  OPTION_CATALOG,
  STANDINGS,
  TYPES_CHANTIER,
  UNIT_LABEL,
  VILLES_CI,
} from "@/lib/devis/catalog";
import type { DevisState, OptionLine, WorkGroup } from "@/lib/devis/types";
import { formatFcfa } from "@/lib/devis/pricing";

const GROUP_ICON: Record<WorkGroup, LucideIcon> = {
  etudes: DraftingCompass,
  structure: Hammer,
  "second-oeuvre": DoorOpen,
  reseaux: Zap,
  finitions: PaintRoller,
};

const OPTION_ICON: Record<string, LucideIcon> = {
  "visite-site": Car,
  permis: FileCheck2,
  transport: Truck,
  materiaux: PackageOpen,
  engins: Tractor,
  cloture: Fence,
  paysagisme: Trees,
  signalisation: TrafficCone,
  piscine: Waves,
};

/* ── Primitives UI ──────────────────────────────────────────────────── */

const labelCls = "font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate";
const fieldCls =
  "h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-[16px] sm:text-sm text-ink outline-none transition-colors focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/15";

function Section({
  icon: Icon,
  title,
  hint,
  defaultOpen = false,
  children,
}: {
  icon: LucideIcon;
  title: string;
  hint?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="overflow-hidden rounded-xl border border-black/10 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex min-h-[56px] w-full items-center gap-3 px-4 text-left transition-colors hover:bg-mist/50"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-royal/10 text-brand-royal">
          <Icon className="size-5" />
        </span>
        <span className="flex-1">
          <span className="block font-display text-sm font-semibold text-ink">{title}</span>
          {hint ? <span className="block text-xs text-slate">{hint}</span> : null}
        </span>
        <ChevronDown
          className={`size-4 text-slate transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? <div className="border-t border-black/5 p-4">{children}</div> : null}
    </section>
  );
}

function Labelled({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className={`mb-1.5 block ${labelCls}`}>{label}</span>
      {children}
    </label>
  );
}

/* ── Formulaire ─────────────────────────────────────────────────────── */

export function DevisForm({
  state,
  setState,
}: {
  state: DevisState;
  setState: Dispatch<SetStateAction<DevisState>>;
}) {
  const surface = state.projet.surface;

  const toggleWork = (id: string) =>
    setState((s) => ({
      ...s,
      works: s.works.map((w) => (w.id === id ? { ...w, enabled: !w.enabled } : w)),
    }));

  // Prix évolutifs : P.U. et quantités modifiables en direct (demande direction).
  const setWorkPu = (id: string, pu: number) =>
    setState((s) => ({
      ...s,
      works: s.works.map((w) => (w.id === id ? { ...w, pu: Math.max(0, pu) } : w)),
    }));

  const setWorkQty = (id: string, qty: number) =>
    setState((s) => ({
      ...s,
      works: s.works.map((w) => (w.id === id ? { ...w, qty: Math.max(0, qty) } : w)),
    }));

  const setOptionPu = (id: string, pu: number) =>
    setState((s) => ({
      ...s,
      options: s.options.map((o) => (o.id === id ? { ...o, pu: Math.max(0, pu) } : o)),
    }));

  // Standing : pré-remplit le prix/m² du gros œuvre (reste éditable ensuite).
  const setStanding = (id: string) =>
    setState((s) => {
      const tier = STANDINGS.find((t) => t.id === id);
      return {
        ...s,
        projet: { ...s.projet, standing: id },
        works: tier
          ? s.works.map((w) => (w.id === "gros-oeuvre" ? { ...w, pu: tier.pu } : w))
          : s.works,
      };
    });

  const hasOption = (catalogId: string) =>
    state.options.some((o) => o.catalogId === catalogId);

  const addOption = (catalogId: string) =>
    setState((s) => {
      if (s.options.some((o) => o.catalogId === catalogId)) return s;
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

  const removeOption = (id: string) =>
    setState((s) => ({ ...s, options: s.options.filter((o) => o.id !== id) }));

  const setOptionQty = (id: string, qty: number) =>
    setState((s) => ({
      ...s,
      options: s.options.map((o) => (o.id === id ? { ...o, qty: Math.max(0, qty) } : o)),
    }));

  const addAnnexes = (files: FileList | null) => {
    if (!files) return;
    const added = Array.from(files).map((f) => ({
      id: crypto.randomUUID(),
      name: f.name,
      url: URL.createObjectURL(f),
    }));
    setState((s) => ({ ...s, annexes: [...s.annexes, ...added] }));
  };

  const removeAnnex = (id: string) =>
    setState((s) => ({ ...s, annexes: s.annexes.filter((a) => a.id !== id) }));

  return (
    <div className="space-y-3">
      {/* Identité */}
      <Section icon={UserRound} title="Identité du client" defaultOpen>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Labelled label="Civilité">
            <select
              className={fieldCls}
              value={state.client.civilite}
              onChange={(e) =>
                setState((s) => ({ ...s, client: { ...s.client, civilite: e.target.value } }))
              }
            >
              <option value="">Choisir</option>
              {CIVILITES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Labelled>
          <Labelled label="Téléphone">
            <input
              type="tel"
              className={fieldCls}
              placeholder="+225 ..."
              value={state.client.telephone}
              onChange={(e) =>
                setState((s) => ({ ...s, client: { ...s.client, telephone: e.target.value } }))
              }
            />
          </Labelled>
          <Labelled label="Nom">
            <input
              className={fieldCls}
              value={state.client.nom}
              onChange={(e) =>
                setState((s) => ({ ...s, client: { ...s.client, nom: e.target.value } }))
              }
            />
          </Labelled>
          <Labelled label="Prénom">
            <input
              className={fieldCls}
              value={state.client.prenom}
              onChange={(e) =>
                setState((s) => ({ ...s, client: { ...s.client, prenom: e.target.value } }))
              }
            />
          </Labelled>
          <Labelled label="Adresse e-mail">
            <input
              type="email"
              className={fieldCls}
              value={state.client.email}
              onChange={(e) =>
                setState((s) => ({ ...s, client: { ...s.client, email: e.target.value } }))
              }
            />
          </Labelled>
          <Labelled label="Entreprise (optionnel)">
            <input
              className={fieldCls}
              value={state.client.entreprise}
              onChange={(e) =>
                setState((s) => ({ ...s, client: { ...s.client, entreprise: e.target.value } }))
              }
            />
          </Labelled>
        </div>
      </Section>

      {/* Localisation */}
      <Section icon={MapPin} title="Localisation du chantier">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Labelled label="Ville">
            <select
              className={fieldCls}
              value={state.localisation.ville}
              onChange={(e) =>
                setState((s) => ({ ...s, localisation: { ...s.localisation, ville: e.target.value } }))
              }
            >
              <option value="">Choisir</option>
              {VILLES_CI.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </Labelled>
          <Labelled label="Quartier">
            <input
              className={fieldCls}
              value={state.localisation.quartier}
              onChange={(e) =>
                setState((s) => ({ ...s, localisation: { ...s.localisation, quartier: e.target.value } }))
              }
            />
          </Labelled>
          <div className="col-span-2">
            <Labelled label="Adresse / repère">
              <input
                className={fieldCls}
                placeholder="Lot, îlot, point de repère"
                value={state.localisation.adresse}
                onChange={(e) =>
                  setState((s) => ({ ...s, localisation: { ...s.localisation, adresse: e.target.value } }))
                }
              />
            </Labelled>
          </div>
        </div>
      </Section>

      {/* Projet */}
      <Section icon={Building2} title="Projet" defaultOpen>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Labelled label="Type de chantier">
            <select
              className={fieldCls}
              value={state.projet.typeChantier}
              onChange={(e) =>
                setState((s) => ({ ...s, projet: { ...s.projet, typeChantier: e.target.value } }))
              }
            >
              <option value="">Choisir</option>
              {TYPES_CHANTIER.map((t) => (
                <option key={t.id} value={t.label}>
                  {t.label}
                </option>
              ))}
            </select>
          </Labelled>
          <Labelled label="Nature des travaux">
            <input
              className={fieldCls}
              placeholder="Villa, immeuble R+2..."
              value={state.projet.natureTravaux}
              onChange={(e) =>
                setState((s) => ({ ...s, projet: { ...s.projet, natureTravaux: e.target.value } }))
              }
            />
          </Labelled>
          <Labelled label="Standing (prix gros œuvre / m²)">
            <select
              className={fieldCls}
              value={state.projet.standing}
              onChange={(e) => setStanding(e.target.value)}
            >
              <option value="">Choisir</option>
              {STANDINGS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label} — {formatFcfa(t.min)} à {formatFcfa(t.max)} FCFA/m²
                </option>
              ))}
            </select>
          </Labelled>
          <Labelled label={`Surface : ${surface} m²`}>
            <input
              type="range"
              min={0}
              max={3000}
              step={10}
              className="w-full accent-brand-amber"
              value={surface}
              onChange={(e) =>
                setState((s) => ({ ...s, projet: { ...s.projet, surface: Number(e.target.value) } }))
              }
            />
          </Labelled>
          <Labelled label="Niveaux (R+n)">
            <input
              type="number"
              min={0}
              max={20}
              className={fieldCls}
              value={state.projet.niveaux}
              onChange={(e) =>
                setState((s) => ({ ...s, projet: { ...s.projet, niveaux: Number(e.target.value) } }))
              }
            />
          </Labelled>
          <Labelled label="Délai souhaité">
            <select
              className={fieldCls}
              value={state.projet.delai}
              onChange={(e) =>
                setState((s) => ({ ...s, projet: { ...s.projet, delai: e.target.value } }))
              }
            >
              <option value="">Choisir</option>
              {DELAIS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </Labelled>
          <div className="col-span-2">
            <Labelled label="Précisions">
              <textarea
                rows={2}
                className={`${fieldCls} !h-auto min-h-[64px] resize-none py-2`}
                value={state.projet.description}
                onChange={(e) =>
                  setState((s) => ({ ...s, projet: { ...s.projet, description: e.target.value } }))
                }
              />
            </Labelled>
          </div>
        </div>
      </Section>

      {/* Corps d'état */}
      <Section icon={Hammer} title="Corps d'état" hint="Sélectionnez les lots à chiffrer" defaultOpen>
        <ul className="space-y-2">
          {state.works.map((w) => {
            const Icon = GROUP_ICON[w.group] ?? Hammer;
            const qty = w.surfaceDriven ? surface : w.qty;
            const total = w.pu * qty;
            return (
              <li
                key={w.id}
                className={`overflow-hidden rounded-lg border transition-colors ${
                  w.enabled ? "border-brand-royal/30 bg-brand-royal/5" : "border-black/10 bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleWork(w.id)}
                  aria-pressed={w.enabled}
                  className="flex w-full items-center gap-3 p-3 text-left transition-colors hover:bg-mist/40"
                >
                  <span
                    className={`flex size-5 shrink-0 items-center justify-center rounded border ${
                      w.enabled
                        ? "border-brand-royal bg-brand-royal text-white"
                        : "border-black/20 bg-white"
                    }`}
                  >
                    {w.enabled ? <Check className="size-3.5" /> : null}
                  </span>
                  <Icon className="size-4 shrink-0 text-brand-royal" />
                  <span className="flex-1">
                    <span className="block text-sm font-medium text-ink">{w.label}</span>
                    <span className="block text-xs text-slate">{w.detail}</span>
                  </span>
                  <span className="shrink-0 text-right">
                    <span className="block font-mono text-xs font-semibold text-ink">
                      {formatFcfa(total)}
                    </span>
                    <span className="block font-mono text-[0.6rem] text-slate">
                      {w.surfaceDriven ? `${surface} m²` : `${w.qty} ${UNIT_LABEL[w.unit]}`}
                    </span>
                  </span>
                </button>

                {/* Prix évolutifs : P.U. (et quantité) éditables une fois le lot activé */}
                {w.enabled ? (
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-brand-royal/15 bg-white/70 px-3 py-2.5">
                    {w.surfaceDriven ? (
                      <span className="flex items-center gap-1.5">
                        <span className={labelCls}>Qté</span>
                        <span className="text-sm text-ink">{surface} m²</span>
                        <span className="font-mono text-[0.6rem] text-slate">(surface)</span>
                      </span>
                    ) : (
                      <label className="flex items-center gap-1.5">
                        <span className={labelCls}>Qté</span>
                        <input
                          type="number"
                          min={0}
                          aria-label={`Quantité ${w.label}`}
                          className="h-9 w-20 rounded-md border border-black/10 px-2 text-right text-sm outline-none focus:border-brand-royal"
                          value={w.qty}
                          onChange={(e) => setWorkQty(w.id, Number(e.target.value))}
                        />
                        <span className="font-mono text-[0.6rem] text-slate">{UNIT_LABEL[w.unit]}</span>
                      </label>
                    )}
                    <label className="flex items-center gap-1.5">
                      <span className={labelCls}>P.U.</span>
                      <input
                        type="number"
                        min={0}
                        step={1000}
                        aria-label={`Prix unitaire ${w.label}`}
                        className="h-9 w-28 rounded-md border border-black/10 px-2 text-right text-sm outline-none focus:border-brand-royal"
                        value={w.pu}
                        onChange={(e) => setWorkPu(w.id, Number(e.target.value))}
                      />
                      <span className="font-mono text-[0.6rem] text-slate">FCFA/{UNIT_LABEL[w.unit]}</span>
                    </label>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Options */}
      <Section icon={Plus} title="Options supplémentaires" hint="Ajoutez des prestations">
        <div className="grid grid-cols-2 gap-2">
          {OPTION_CATALOG.map((o) => {
            const Icon = OPTION_ICON[o.id] ?? Plus;
            const added = hasOption(o.id);
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => addOption(o.id)}
                disabled={added}
                className={`flex min-h-[44px] items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                  added
                    ? "cursor-default border-brand-amber/40 bg-brand-amber/10 text-slate"
                    : "border-black/10 bg-white hover:border-brand-royal/30 hover:bg-mist/50"
                }`}
              >
                <Icon className="size-4 shrink-0 text-brand-royal" />
                <span className="flex-1 leading-tight">{o.label}</span>
                {added ? (
                  <Check className="size-4 text-brand-amber" />
                ) : (
                  <Plus className="size-4 text-slate" />
                )}
              </button>
            );
          })}
        </div>

        {state.options.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {state.options.map((o) => (
              <li
                key={o.id}
                className="rounded-lg border border-black/10 bg-mist/40 p-2.5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex-1 text-sm font-medium text-ink">{o.label}</span>
                  <button
                    type="button"
                    onClick={() => removeOption(o.id)}
                    aria-label={`Retirer ${o.label}`}
                    className="flex size-9 items-center justify-center rounded-md text-slate transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <label className="flex items-center gap-1.5">
                    <span className={labelCls}>Qté</span>
                    <input
                      type="number"
                      min={0}
                      aria-label={`Quantité ${o.label}`}
                      className="h-9 w-16 rounded-md border border-black/10 px-2 text-right text-sm outline-none focus:border-brand-royal"
                      value={o.qty}
                      onChange={(e) => setOptionQty(o.id, Number(e.target.value))}
                    />
                    <span className="font-mono text-[0.6rem] text-slate">{UNIT_LABEL[o.unit]}</span>
                  </label>
                  <label className="flex items-center gap-1.5">
                    <span className={labelCls}>P.U.</span>
                    <input
                      type="number"
                      min={0}
                      step={1000}
                      aria-label={`Prix unitaire ${o.label}`}
                      className="h-9 w-28 rounded-md border border-black/10 px-2 text-right text-sm outline-none focus:border-brand-royal"
                      value={o.pu}
                      onChange={(e) => setOptionPu(o.id, Number(e.target.value))}
                    />
                    <span className="font-mono text-[0.6rem] text-slate">FCFA/{UNIT_LABEL[o.unit]}</span>
                  </label>
                  <span className="ml-auto font-mono text-xs font-semibold text-ink">
                    {formatFcfa(o.pu * o.qty)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </Section>

      {/* Finances */}
      <Section icon={Wallet} title="Conditions financières">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Labelled label="Remise (%)">
            <input
              type="number"
              min={0}
              max={100}
              className={fieldCls}
              value={state.finances.remisePct}
              onChange={(e) =>
                setState((s) => ({ ...s, finances: { ...s.finances, remisePct: Number(e.target.value) } }))
              }
            />
          </Labelled>
          <Labelled label="Avance (%)">
            <input
              type="number"
              min={0}
              max={100}
              className={fieldCls}
              value={state.finances.avancePct}
              onChange={(e) =>
                setState((s) => ({ ...s, finances: { ...s.finances, avancePct: Number(e.target.value) } }))
              }
            />
          </Labelled>
          <Labelled label="Modalité de paiement">
            <select
              className={fieldCls}
              value={state.finances.modalite}
              onChange={(e) =>
                setState((s) => ({ ...s, finances: { ...s.finances, modalite: e.target.value } }))
              }
            >
              {MODALITES_PAIEMENT.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </Labelled>
          <label className="flex cursor-pointer items-end gap-2 pb-2">
            <input
              type="checkbox"
              className="size-5 accent-brand-royal"
              checked={state.finances.tva}
              onChange={(e) =>
                setState((s) => ({ ...s, finances: { ...s.finances, tva: e.target.checked } }))
              }
            />
            <span className="text-sm text-ink">Appliquer la TVA (18%)</span>
          </label>
        </div>
      </Section>

      {/* Annexes */}
      <Section icon={Images} title="Annexes" hint="Photos du chantier ou du terrain">
        <label className="flex min-h-[88px] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-black/20 bg-mist/40 text-center transition-colors hover:border-brand-royal/40">
          <Images className="size-5 text-brand-royal" />
          <span className="text-sm font-medium text-ink">Importer des images</span>
          <span className="text-xs text-slate">JPG ou PNG, plusieurs fichiers acceptés</span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => addAnnexes(e.target.files)}
          />
        </label>
        {state.annexes.length > 0 ? (
          <div className="mt-3 grid grid-cols-4 gap-2">
            {state.annexes.map((a) => (
              <div key={a.id} className="group relative aspect-square overflow-hidden rounded-md border border-black/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.url} alt={a.name} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeAnnex(a.id)}
                  aria-label="Retirer l'image"
                  className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </Section>

      <p className="px-1 pt-1 text-center text-xs text-slate">
        Utilisez la barre d&apos;outils en haut pour prévisualiser, imprimer en PDF ou
        exporter en Word.
      </p>
    </div>
  );
}
