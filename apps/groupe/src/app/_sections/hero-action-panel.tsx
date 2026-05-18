"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Briefcase, Search, User, Lock, Building2, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { links } from "@/lib/links";

/* ══ ICÔNES PREMIUM SICA ══ */

/* Construction — Immeuble architectural avec étages + fenêtres */
function IconConstruction({ className }: { className?: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2.5 21.5h19" />
      <path d="M4.2 21.5V10.2l6.8-5.1 6.8 5.1v11.3" />
      <path d="M9.2 21.5v-4.4h3.6v4.4" />
      <rect x="5.2" y="4.1" width="4.2" height="2.4" rx="0.45" />
      <path d="M5.2 6.5v4.2" />
      <path d="M7.3 6.5v2.8" />
      <path d="M9.4 6.5v1.6" />
      <path d="M13.1 11.3h2.1" />
      <path d="M13.1 13.8h2.1" />
    </svg>
  );
}

/* Assistance — Conseil premium (bulle + dossier validé) */
function IconAssistance({ className }: { className?: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4.5 5.5h8.2a2.2 2.2 0 0 1 2.2 2.2v4.5a2.2 2.2 0 0 1-2.2 2.2H8.4l-3.9 3v-3H4.5a2 2 0 0 1-2-2V7.5a2 2 0 0 1 2-2Z" />
      <path d="M17.5 7.8h3.2a1.8 1.8 0 0 1 1.8 1.8v6a1.8 1.8 0 0 1-1.8 1.8h-4.2" />
      <path d="M8 9.6h5.4" />
      <path d="M8 12.1h3.8" />
      <path d="m17.2 13.3 1.3 1.3 2.2-2.5" />
    </svg>
  );
}

/* Réalisations — Galerie premium */
function IconRealisations({ className }: { className?: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="13" height="16" rx="1.8" />
      <rect x="8" y="2.5" width="13" height="16" rx="1.8" />
      <path d="M10.8 8.3h7.3" />
      <path d="M10.8 11.1h7.3" />
      <path d="M10.8 13.9h5" />
      <path d="M5.7 14.8 7.4 13l2 2.3" />
      <circle cx="7.1" cy="9.3" r="1.1" />
    </svg>
  );
}

/* Espace Client — Bouclier sécurisé avec profil utilisateur */
function IconClient({ className }: { className?: string }) {
  return (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2L4 5.5V10c0 5.8 3.8 10.3 8 11.8 4.2-1.5 8-6 8-11.8V5.5L12 2z" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M7.5 18.5a4.8 4.8 0 0 1 9 0" />
    </svg>
  );
}

function LongArrow({ className }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}

/* ── Données ── */

type TabId = "construction" | "assistance" | "realisations" | "client";

/* labelShort : version mobile qui ne wrap pas sur les écrans étroits. */
const TABS: { id: TabId; label: string; labelShort: string; Icon: React.FC<{ className?: string }> }[] = [
  { id: "client",       label: "Espace Client",      labelShort: "Client",       Icon: IconClient },
  { id: "construction", label: "Devis Construction", labelShort: "Devis",        Icon: IconConstruction },
  { id: "assistance",   label: "Conseil Assistance", labelShort: "Conseil",      Icon: IconAssistance },
  { id: "realisations", label: "Nos Réalisations",   labelShort: "Réalisations", Icon: IconRealisations },
];

const FORM_CFG: Record<TabId, {
  f1: { ph: string; Icon: React.FC<{ className?: string }>; type?: string };
  f2: { ph: string; Icon: React.FC<{ className?: string }>; type?: string };
}> = {
  construction: {
    f1: { ph: "Je veux construire...", Icon: Building2 },
    f2: { ph: "Dans la ville de...",   Icon: MapPin },
  },
  assistance: {
    f1: { ph: "Mon besoin...",         Icon: Briefcase },
    f2: { ph: "Nom de l'entreprise",   Icon: User },
  },
  realisations: {
    f1: { ph: "Je cherche...",         Icon: Search },
    f2: { ph: "Par ville...",          Icon: MapPin },
  },
  client: {
    f1: { ph: "Identifiant / Email",   Icon: User },
    f2: { ph: "Mot de passe",          Icon: Lock, type: "password" },
  },
};

/* ── Identifiants démo pour validation login espace client ─────────────
   À remplacer plus tard par un vrai appel Supabase auth. Pour l'instant
   on simule un check côté front pour démontrer les états success/error. */
const DEMO_CREDENTIALS = { user: "demo@sica.ci", pass: "sica2026" };

type Feedback =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; msg: string }
  | { kind: "error"; msg: string };

export function HeroActionPanel() {
  const [active, setActive] = React.useState<TabId>("client");
  const cfg = FORM_CFG[active];
  const [f1, setF1] = React.useState("");
  const [f2, setF2] = React.useState("");
  const [feedback, setFeedback] = React.useState<Feedback>({ kind: "idle" });

  /* Reset feedback et valeurs au changement d'onglet */
  React.useEffect(() => {
    setFeedback({ kind: "idle" });
    setF1("");
    setF2("");
  }, [active]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    /* ── Espace Client : login validé → succès + reload, sinon erreur rouge ── */
    if (active === "client") {
      if (!f1.trim() || !f2.trim()) {
        setFeedback({ kind: "error", msg: "Veuillez renseigner identifiant et mot de passe." });
        return;
      }
      setFeedback({ kind: "loading" });
      // Simulation latence réseau — sera remplacée par Supabase auth
      setTimeout(() => {
        const ok =
          f1.trim().toLowerCase() === DEMO_CREDENTIALS.user &&
          f2 === DEMO_CREDENTIALS.pass;
        if (ok) {
          setFeedback({ kind: "success", msg: "Connexion réussie. Redirection..." });
          setTimeout(() => window.location.reload(), 1100);
        } else {
          setFeedback({ kind: "error", msg: "Identifiant ou mot de passe incorrect." });
        }
      }, 700);
      return;
    }

    /* ── Devis Construction → redirige vers site Construction avec le besoin ── */
    if (active === "construction") {
      const params = new URLSearchParams();
      if (f1.trim()) params.set("besoin", f1.trim());
      if (f2.trim()) params.set("ville", f2.trim());
      const qs = params.toString();
      window.location.href = `${links.construction.devis}${qs ? `?${qs}` : ""}`;
      return;
    }

    /* ── Conseil Assistance → redirige vers site Assistance avec le besoin ── */
    if (active === "assistance") {
      const params = new URLSearchParams();
      if (f1.trim()) params.set("besoin", f1.trim());
      if (f2.trim()) params.set("entreprise", f2.trim());
      const qs = params.toString();
      window.location.href = `https://sicaassistance.ci/contact${qs ? `?${qs}` : ""}`;
      return;
    }

    /* ── Réalisations → page interne /realisations avec query de recherche ── */
    if (active === "realisations") {
      const params = new URLSearchParams();
      if (f1.trim()) params.set("q", f1.trim());
      if (f2.trim()) params.set("ville", f2.trim());
      const qs = params.toString();
      window.location.href = `/realisations${qs ? `?${qs}` : ""}`;
      return;
    }
  };

  const isLoading = feedback.kind === "loading";

  return (
    <div className="relative w-full">

      {/* ═══ COUCHE 1 : Bandeau bleu pleine largeur ═══ */}
      <div className="w-full bg-[#2D9CDB] pt-20 sm:pt-24 pb-6 sm:pb-8">
        <div className="mx-auto max-w-[640px] px-4">
          <form
            onSubmit={onSubmit}
            className="flex flex-col sm:flex-row bg-white rounded-[2px] shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
          >
            <div className="flex flex-1 items-center gap-3 px-4 py-3 sm:py-[14px]">
              <cfg.f1.Icon className="size-[16px] shrink-0 stroke-[1.4] text-gray-400" />
              <input
                type={cfg.f1.type ?? "text"}
                placeholder={cfg.f1.ph}
                value={f1}
                onChange={(e) => setF1(e.target.value)}
                disabled={isLoading}
                autoComplete={active === "client" ? "username" : "off"}
                className="w-full bg-transparent text-[13px] font-normal text-slate-700 placeholder:text-slate-400 outline-none disabled:opacity-60"
              />
            </div>
            <div className="h-px w-full sm:h-auto sm:w-px bg-gray-200 sm:my-2" />
            <div className="flex flex-1 items-center gap-3 px-4 py-3 sm:py-[14px]">
              <cfg.f2.Icon className="size-[16px] shrink-0 stroke-[1.4] text-gray-400" />
              <input
                type={cfg.f2.type ?? "text"}
                placeholder={cfg.f2.ph}
                value={f2}
                onChange={(e) => setF2(e.target.value)}
                disabled={isLoading}
                autoComplete={active === "client" ? "current-password" : "off"}
                className="w-full bg-transparent text-[13px] font-normal text-slate-700 placeholder:text-slate-400 outline-none disabled:opacity-60"
              />
            </div>
            <button
              type="submit"
              aria-label="Valider"
              disabled={isLoading}
              className="flex h-[46px] sm:h-auto w-full sm:w-[60px] shrink-0 items-center justify-center bg-[#2C4373] text-white transition-colors duration-200 hover:bg-[#1E3054] disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <LongArrow />
              )}
            </button>
          </form>

          {/* ── Feedback inline (succès vert / erreur rouge) ──
              Visible UNIQUEMENT pour l'onglet client. Apparaît sous le bandeau,
              fond blanc + filet coloré à gauche pour la lecture rapide.            */}
          <AnimatePresence>
            {active === "client" && (feedback.kind === "error" || feedback.kind === "success") ? (
              <motion.div
                key={`fb-${feedback.kind}`}
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, y: -4, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -4, height: 0 }}
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div
                  className={[
                    "mt-2 flex items-start gap-2.5 rounded-[2px] bg-white px-4 py-2.5 text-[12.5px] font-medium shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
                    feedback.kind === "error"
                      ? "border-l-[3px] border-l-red-500 text-red-700"
                      : "border-l-[3px] border-l-emerald-500 text-emerald-700",
                  ].join(" ")}
                >
                  {feedback.kind === "error" ? (
                    <AlertCircle className="mt-px size-4 shrink-0" />
                  ) : (
                    <CheckCircle2 className="mt-px size-4 shrink-0" />
                  )}
                  <span>{feedback.msg}</span>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {/* ═══ COUCHE 2 : Carte des onglets — fusion visuelle avec le bandeau ═══ */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-[780px] px-4">
        <div className="flex rounded-t-[10px] bg-[#2D9CDB] border border-b-0 border-white/25 overflow-hidden">
          {TABS.map((tab, i) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={[
                  "flex flex-1 flex-col items-center gap-1.5 py-4 sm:py-5 px-2",
                  "font-[Inter,Helvetica,sans-serif] transition-all duration-200",
                  isActive
                    ? "bg-white/15 text-[#1E2F8A]"
                    : "text-white/75 hover:text-white hover:bg-white/10",
                  i !== TABS.length - 1 ? "border-r border-white/20" : "",
                ].join(" ")}
              >
                <tab.Icon className="shrink-0" />
                <span className={[
                  "text-[10px] sm:text-[11px] uppercase tracking-[0.08em] sm:tracking-[0.1em] leading-tight whitespace-nowrap",
                  isActive ? "font-bold" : "font-semibold",
                ].join(" ")}>
                  <span className="sm:hidden">{tab.labelShort}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
