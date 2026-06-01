"use client";

import { useEffect, useRef, useState } from "react";
import { Minus, Plus, FileText, Monitor, X, FileSignature, Eye } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { DevisState } from "@/lib/devis/types";
import { computeTotals } from "@/lib/devis/pricing";
import { buildPages, SHEET_W } from "@/lib/devis/pagination";
import { DevisForm } from "./_components/devis-form";
import { DevisDocument } from "./_components/devis-document";
import { DevisToolbar } from "./_components/devis-toolbar";
import { RoleGate } from "./_components/role-gate";
import { SignatureStampPanel } from "./_components/signature-stamp-panel";
import { DEFAULT_STAMP } from "@/lib/devis/state";
import type { UserRole } from "@/lib/devis/types";

const PRINT_CSS = `
@media print {
  @page { size: A4; margin: 0; }

  html, body {
    margin: 0 !important;
    padding: 0 !important;
    background: #fff !important;
    height: auto !important;
    min-height: 0 !important;
    overflow: visible !important;
  }

  .devis-no-print { display: none !important; }

  .devis-screen-root,
  .devis-screen-grid,
  .devis-screen-panel,
  .devis-scaler-box {
    height: auto !important;
    max-height: none !important;
    min-height: 0 !important;
    overflow: visible !important;
    position: static !important;
    width: auto !important;
    padding: 0 !important;
    margin: 0 !important;
    background: #fff !important;
    display: block !important;
    border: 0 !important;
  }

  .devis-scaler {
    transform: none !important;
    width: ${SHEET_W}px !important;
    margin: 0 auto !important;
  }

  #devis-print {
    display: block !important;
    gap: 0 !important;
  }

  .devis-page {
    box-shadow: none !important;
    margin: 0 auto !important;
    page-break-after: always;
    page-break-inside: avoid;
    break-after: page;
    break-inside: avoid;
  }
  .devis-page:last-child {
    page-break-after: auto;
    break-after: auto;
  }
}
`;

/* ── Bannière de suggestion PC ── */
function MobileSuggestionBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;
    if (isMobile) setVisible(true);
  }, []);

  if (!visible || dismissed) return null;

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      className="devis-no-print relative flex items-start gap-3 border-b border-brand-amber/20 bg-brand-amber/[0.07] px-4 py-3"
    >
      <Monitor className="mt-0.5 size-5 shrink-0 text-brand-amber" />
      <div className="flex-1">
        <p className="text-[0.8rem] font-medium text-ink">
          Pour une meilleure expérience, utilisez un ordinateur
        </p>
        <p className="mt-0.5 text-[0.72rem] leading-snug text-slate">
          Le simulateur de devis est optimisé pour un écran large. Vous pouvez continuer sur mobile, mais certaines fonctionnalités seront limitées.
        </p>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-slate transition-colors hover:bg-black/5"
        aria-label="Fermer"
      >
        <X className="size-3.5" />
      </button>
    </motion.div>
  );
}

/* ── Onglets mobile (Formulaire / Aperçu) ── */
function MobileTabBar({
  activeTab,
  onTabChange,
  pageCount,
}: {
  activeTab: "form" | "preview";
  onTabChange: (tab: "form" | "preview") => void;
  pageCount: number;
}) {
  return (
    <div className="devis-no-print flex border-b border-black/10 bg-white lg:hidden">
      <button
        type="button"
        onClick={() => onTabChange("form")}
        className={`flex flex-1 items-center justify-center gap-2 py-3 text-[0.8rem] font-semibold transition-colors ${
          activeTab === "form"
            ? "border-b-2 border-brand-amber text-brand-amber"
            : "text-slate"
        }`}
      >
        <FileSignature className="size-4" />
        Formulaire
      </button>
      <button
        type="button"
        onClick={() => onTabChange("preview")}
        className={`flex flex-1 items-center justify-center gap-2 py-3 text-[0.8rem] font-semibold transition-colors ${
          activeTab === "preview"
            ? "border-b-2 border-brand-royal text-brand-royal"
            : "text-slate"
        }`}
      >
        <Eye className="size-4" />
        Aperçu
        <span className="rounded-full bg-brand-royal/10 px-1.5 py-0.5 text-[0.6rem] font-bold text-brand-royal">
          {pageCount}
        </span>
      </button>
    </div>
  );
}

export function DevisSimulator({ initialState }: { initialState: DevisState }) {
  const [state, setState] = useState<DevisState>(initialState);
  const [zoom, setZoom] = useState(1);
  const [preview, setPreview] = useState(false);
  const [roleChosen, setRoleChosen] = useState(false);
  const [sigStampOpen, setSigStampOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<"form" | "preview">("form");

  const chooseRole = (role: UserRole) => {
    setState((s) => ({
      ...s,
      role,
      stampConfig: role === "staff" && !s.stampConfig ? DEFAULT_STAMP : s.stampConfig,
    }));
    setRoleChosen(true);
  };

  const panelRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [baseScale, setBaseScale] = useState(0.7);
  const [contentH, setContentH] = useState(0);

  const totals = computeTotals(state);
  const pageCount = buildPages(state).length;
  const scale = Math.min(1.4, baseScale * zoom);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth - 32;
      setBaseScale(Math.max(0.25, Math.min(1, w / SHEET_W)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [mobileTab]);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const measure = () => setContentH(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [state]);

  return (
    <div className="devis-screen-root bg-mist/40">
      <style>{PRINT_CSS}</style>

      <DevisToolbar
        state={state}
        setState={setState}
        preview={preview}
        onTogglePreview={() => setPreview((v) => !v)}
        onOpenSignatureStamp={() => setSigStampOpen(true)}
      />

      {/* Bannière de suggestion PC sur mobile */}
      <MobileSuggestionBanner />

      {/* Onglets mobile */}
      <MobileTabBar
        activeTab={mobileTab}
        onTabChange={setMobileTab}
        pageCount={pageCount}
      />

      {!roleChosen ? <RoleGate onChoose={chooseRole} /> : null}

      {sigStampOpen && state.role === "staff" ? (
        <SignatureStampPanel
          state={state}
          setState={setState}
          onClose={() => setSigStampOpen(false)}
        />
      ) : null}

      <div
        className={`devis-screen-grid ${
          preview
            ? "grid grid-cols-1"
            : "mx-auto grid max-w-[1600px] gap-0 lg:grid-cols-[minmax(0,1fr)_460px] xl:grid-cols-[minmax(0,1fr)_500px]"
        }`}
      >
        {/* ── Aperçu document A4 ── */}
        <div
          ref={panelRef}
          className={`devis-screen-panel relative h-[calc(100vh-3.5rem)] overflow-y-auto overflow-x-hidden border-r border-black/5 bg-[linear-gradient(180deg,#eef1f7_0%,#e6eaf3_100%)] px-3 py-4 sm:px-6 sm:py-6 ${
            /* Sur mobile, masquer si on est sur l'onglet formulaire */
            mobileTab === "form" && !preview ? "hidden lg:block" : ""
          }`}
        >
          {/* Barre d'outils zoom */}
          <div className="devis-no-print sticky top-0 z-10 mx-auto mb-4 flex max-w-[var(--w)] items-center justify-between rounded-full border border-black/10 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur sm:mb-5 sm:px-4 sm:py-2">
            <span className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-brand-royal sm:gap-2 sm:text-[0.65rem]">
              <FileText className="size-3.5 sm:size-4" />
              {pageCount} page{pageCount > 1 ? "s" : ""}
            </span>
            <div className="flex items-center gap-0.5 sm:gap-1">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.6, z - 0.1))}
                aria-label="Réduire"
                className="flex size-7 items-center justify-center rounded-full text-slate transition-colors hover:bg-mist sm:size-8"
              >
                <Minus className="size-3.5 sm:size-4" />
              </button>
              <span className="w-10 text-center font-mono text-[0.65rem] text-slate sm:w-12 sm:text-xs">
                {Math.round(scale * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(1.6, z + 0.1))}
                aria-label="Agrandir"
                className="flex size-7 items-center justify-center rounded-full text-slate transition-colors hover:bg-mist sm:size-8"
              >
                <Plus className="size-3.5 sm:size-4" />
              </button>
            </div>
          </div>

          {/* Scène mise à l'échelle */}
          <div
            className="devis-scaler-box mx-auto"
            style={{ width: SHEET_W * scale, height: contentH * scale }}
          >
            <div
              ref={innerRef}
              className="devis-scaler origin-top-left"
              style={{ width: SHEET_W, transform: `scale(${scale})` }}
            >
              <div id="devis-print" className="flex flex-col items-center gap-6">
                <DevisDocument state={state} totals={totals} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Formulaire ── */}
        <div
          className={`devis-no-print h-[calc(100vh-3.5rem)] overflow-y-auto bg-white px-4 py-5 sm:px-5 sm:py-6 ${
            preview ? "hidden" : ""
          } ${
            /* Sur mobile, masquer si on est sur l'onglet aperçu */
            mobileTab === "preview" ? "hidden lg:block" : ""
          }`}
        >
          <div className="mb-5">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-brand-amber">
              Simulateur de devis
            </p>
            <h1 className="mt-1 font-display text-lg font-semibold text-ink sm:text-xl">
              Constituez votre devis
            </h1>
            <p className="mt-1 text-[0.8rem] text-slate sm:text-sm">
              Renseignez les champs : le document se met à jour en temps réel.
            </p>
          </div>
          <DevisForm state={state} setState={setState} />
        </div>
      </div>
    </div>
  );
}
