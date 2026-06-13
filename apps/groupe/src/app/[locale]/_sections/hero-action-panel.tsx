"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import {
  MapPin,
  Search,
  User,
  Lock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronDown,
  X,
} from "lucide-react";
import { Handshake, HouseSimple, ClipboardText } from "@phosphor-icons/react";
import { links } from "@/lib/links";

/* ════════════════════════════════════════════════════════════════════════
   DONNÉES
════════════════════════════════════════════════════════════════════════ */

/* Identifiants stables des items (clés de traduction).
   Les libellés FR/EN sont résolus dans le composant via useTranslations. */
const CONSTRUCTION_TYPE_KEYS = [
  "villa", "house", "duplex", "apartment", "buildingR2", "buildingR4",
  "residence", "headquarters", "office", "shop", "warehouse", "fencing",
] as const;

const VILLES_CI = [
  "Abidjan",
  "Bouaké",
  "Daloa",
  "Korhogo",
  "Yamoussoukro",
  "San-Pédro",
  "Man",
  "Gagnoa",
  "Abengourou",
  "Divo",
  "Aboisso",
  "Bondoukou",
  "Odienné",
  "Dimbokro",
  "Agboville",
  "Adzopé",
  "Anyama",
  "Grand-Bassam",
  "Soubré",
  "Sassandra",
  "Duekoué",
  "Issia",
  "Lakota",
  "Tiassalé",
  "Toumodi",
  "Katiola",
  "Ferkessédougou",
  "Séguéla",
  "Tengrela",
  "Bouna",
];

const ASSISTANCE_NEED_KEYS = [
  "creation", "accounting", "tax", "legal", "advisory", "structuring",
  "financialReport", "audit", "hr", "businessPlan",
] as const;

const REALISATIONS_CATEGORY_KEYS = [
  "construction", "assistance", "villa", "building", "soilStudy",
  "civilEngineering", "creation", "commercial",
] as const;

/* ════════════════════════════════════════════════════════════════════════
   ICÔNES PREMIUM — onglets (44 × 44)
════════════════════════════════════════════════════════════════════════ */

function IconConstruction({ className }: { className?: string }) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
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

/* Assistance — Phosphor Handshake, plus impactant que le custom SVG */
function IconAssistance({ className }: { className?: string }) {
  return <Handshake size={44} weight="thin" className={className} />;
}

function IconRealisations({ className }: { className?: string }) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
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

function IconClient({ className }: { className?: string }) {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2L4 5.5V10c0 5.8 3.8 10.3 8 11.8 4.2-1.5 8-6 8-11.8V5.5L12 2z" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M7.5 18.5a4.8 4.8 0 0 1 9 0" />
    </svg>
  );
}

function LongArrow({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   TYPES & CONFIG
════════════════════════════════════════════════════════════════════════ */

type TabId = "construction" | "assistance" | "realisations" | "client";

const TAB_ICONS: Record<TabId, React.FC<{ className?: string }>> = {
  client: IconClient,
  construction: IconConstruction,
  assistance: IconAssistance,
  realisations: IconRealisations,
};

/* ── Petites icônes pour les champs de saisie (16 px, lucide) ── */
type SmallIcon = React.FC<{ className?: string }>;

/* Maison = je veux construire */
const HouseSimpleIcon: SmallIcon = ({ className }) => (
  <HouseSimple size={16} weight="regular" className={className} />
);
/* Presse-papiers = mon besoin / requirements */
const ClipboardTextIcon: SmallIcon = ({ className }) => (
  <ClipboardText size={16} weight="regular" className={className} />
);
const SearchIcon: SmallIcon = ({ className }) => (
  <Search size={16} strokeWidth={1.4} className={className} />
);
const MapPinIcon: SmallIcon = ({ className }) => (
  <MapPin size={16} strokeWidth={1.4} className={className} />
);
const UserIcon: SmallIcon = ({ className }) => (
  <User size={16} strokeWidth={1.4} className={className} />
);
const LockIcon: SmallIcon = ({ className }) => (
  <Lock size={16} strokeWidth={1.4} className={className} />
);

interface FieldCfg {
  ph: string;
  Icon: SmallIcon;
  type?: "text" | "email" | "password";
  /** Liste d'options → champ devient un sélecteur dropdown */
  dropdown?: string[];
  /** Champ facultatif (pas bloquant à la validation) */
  optional?: boolean;
}

/* Construit dans le composant (a besoin du traducteur). */

/* ── Identifiants démo (à remplacer par Supabase auth) ── */
const DEMO_CREDENTIALS = { user: "demo@sica.ci", pass: "sica2026" };

type Feedback =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; msg: string }
  | { kind: "error"; msg: string };

/* ════════════════════════════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
════════════════════════════════════════════════════════════════════════ */

export function HeroActionPanel() {
  const t = useTranslations("Home.actionPanel");
  const locale = useLocale();

  /* Listes localisées (les noms de villes restent tels quels — noms propres) */
  const CONSTRUCTION_TYPES = CONSTRUCTION_TYPE_KEYS.map((k) => t(`constructionTypes.${k}`));
  const ASSISTANCE_BESOINS = ASSISTANCE_NEED_KEYS.map((k) => t(`assistanceNeeds.${k}`));
  const REALISATIONS_CATEGORIES = REALISATIONS_CATEGORY_KEYS.map((k) => t(`realisationsCategories.${k}`));

  const TABS: {
    id: TabId;
    label: string;
    labelShort: string;
    Icon: React.FC<{ className?: string }>;
  }[] = [
    { id: "client",       label: t("tabs.client.label"),       labelShort: t("tabs.client.short"),       Icon: TAB_ICONS.client },
    { id: "construction", label: t("tabs.construction.label"), labelShort: t("tabs.construction.short"), Icon: TAB_ICONS.construction },
    { id: "assistance",   label: t("tabs.assistance.label"),   labelShort: t("tabs.assistance.short"),   Icon: TAB_ICONS.assistance },
    { id: "realisations", label: t("tabs.realisations.label"), labelShort: t("tabs.realisations.short"), Icon: TAB_ICONS.realisations },
  ];

  const FORM_CFG: Record<TabId, { f1: FieldCfg; f2: FieldCfg }> = {
    client: {
      f1: { ph: t("placeholders.clientId"),     Icon: UserIcon, type: "email" },
      f2: { ph: t("placeholders.password"),     Icon: LockIcon, type: "password" },
    },
    construction: {
      f1: { ph: t("placeholders.buildWhat"),    Icon: HouseSimpleIcon,   dropdown: CONSTRUCTION_TYPES },
      f2: { ph: t("placeholders.inCity"),       Icon: MapPinIcon,        dropdown: VILLES_CI },
    },
    assistance: {
      f1: { ph: t("placeholders.myNeed"),       Icon: ClipboardTextIcon, dropdown: ASSISTANCE_BESOINS },
      f2: { ph: t("placeholders.companyName"),  Icon: UserIcon, optional: true },
    },
    realisations: {
      f1: { ph: t("placeholders.lookingFor"),   Icon: SearchIcon,  dropdown: REALISATIONS_CATEGORIES, optional: true },
      f2: { ph: t("placeholders.byCity"),       Icon: MapPinIcon,  dropdown: VILLES_CI, optional: true },
    },
  };

  const [active, setActive] = React.useState<TabId>("client");
  const [f1, setF1] = React.useState("");
  const [f2, setF2] = React.useState("");
  const [feedback, setFeedback] = React.useState<Feedback>({ kind: "idle" });
  const [openDropdown, setOpenDropdown] = React.useState<"f1" | "f2" | null>(null);
  const [tabsMenuOpen, setTabsMenuOpen] = React.useState(false);
  const formWrapRef = React.useRef<HTMLDivElement>(null);

  const cfg = FORM_CFG[active];

  /* ── Reset au changement d'onglet ── */
  React.useEffect(() => {
    setFeedback({ kind: "idle" });
    setF1("");
    setF2("");
    setOpenDropdown(null);
    setTabsMenuOpen(false);
  }, [active]);

  /* ── ESC ferme le sélecteur d'onglet mobile ── */
  React.useEffect(() => {
    if (!tabsMenuOpen) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTabsMenuOpen(false);
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [tabsMenuOpen]);

  /* ── Fermeture dropdown clic extérieur ── */
  React.useEffect(() => {
    if (!openDropdown) return;
    const handle = (e: MouseEvent) => {
      if (formWrapRef.current && !formWrapRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [openDropdown]);

  /* ════════ SOUMISSION ════════ */
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenDropdown(null);

    /* Espace Client */
    if (active === "client") {
      if (!f1.trim() || !f2.trim()) {
        setFeedback({ kind: "error", msg: t("feedback.missingCredentials") });
        return;
      }
      setFeedback({ kind: "loading" });
      setTimeout(() => {
        const ok =
          f1.trim().toLowerCase() === DEMO_CREDENTIALS.user &&
          f2 === DEMO_CREDENTIALS.pass;
        if (ok) {
          setFeedback({ kind: "success", msg: t("feedback.loginSuccess") });
          setTimeout(() => window.location.reload(), 1100);
        } else {
          setFeedback({ kind: "error", msg: t("feedback.loginError") });
        }
      }, 700);
      return;
    }

    /* Devis Construction — les deux champs sont obligatoires */
    if (active === "construction") {
      if (!f1.trim() || !f2.trim()) {
        setFeedback({
          kind: "error",
          msg: !f1.trim()
            ? t("feedback.pickConstructionType")
            : t("feedback.pickCity"),
        });
        return;
      }
      const params = new URLSearchParams({ besoin: f1.trim(), ville: f2.trim() });
      window.location.href = `${links.construction.devis}?${params.toString()}`;
      return;
    }

    /* Conseil Assistance — besoin obligatoire, entreprise facultatif */
    if (active === "assistance") {
      if (!f1.trim()) {
        setFeedback({ kind: "error", msg: t("feedback.pickNeed") });
        return;
      }
      const params = new URLSearchParams({ besoin: f1.trim() });
      if (f2.trim()) params.set("entreprise", f2.trim());
      window.location.href = `${links.assistance.base}/contact?${params.toString()}`;
      return;
    }

    /* Réalisations — au moins un champ doit être rempli */
    if (active === "realisations") {
      if (!f1.trim() && !f2.trim()) {
        setFeedback({ kind: "error", msg: t("feedback.pickAtLeastOne") });
        return;
      }
      const params = new URLSearchParams();
      if (f1.trim()) params.set("q", f1.trim());
      if (f2.trim()) params.set("ville", f2.trim());
      window.location.href = `/${locale}/realisations?${params.toString()}`;
      return;
    }
  };

  /* ════════ HELPERS ════════ */
  const isLoading = feedback.kind === "loading";

  const selectOption = (field: "f1" | "f2", value: string) => {
    if (field === "f1") setF1(value);
    else setF2(value);
    setOpenDropdown(null);
    setFeedback({ kind: "idle" });
  };

  const clearField = (field: "f1" | "f2") => {
    if (field === "f1") setF1("");
    else setF2("");
  };

  /* ════════ RENDU D'UN CHAMP ════════ */
  const renderField = (field: "f1" | "f2") => {
    const fieldCfg = field === "f1" ? cfg.f1 : cfg.f2;
    const FieldIcon = fieldCfg.Icon;
    const value = field === "f1" ? f1 : f2;
    const setValue = field === "f1" ? setF1 : setF2;
    const isOpen = openDropdown === field;

    /* Champ avec dropdown */
    if (fieldCfg.dropdown) {
      return (
        <div className="flex flex-1 items-center gap-2 px-4 py-3 sm:py-[14px]">
          <FieldIcon className="shrink-0 text-gray-400" />
          <button
            type="button"
            onClick={() => {
              setOpenDropdown(isOpen ? null : field);
              setFeedback({ kind: "idle" });
            }}
            disabled={isLoading}
            className="flex flex-1 items-center justify-between gap-1 text-left outline-none disabled:opacity-60"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <span
              className={[
                "truncate text-[13px] font-normal",
                value ? "text-slate-700" : "text-slate-400",
              ].join(" ")}
            >
              {value || fieldCfg.ph}
            </span>
            <span className="flex shrink-0 items-center gap-1">
              {value ? (
                <span
                  role="button"
                  tabIndex={0}
                  aria-label={t("aria.clearSelection")}
                  onClick={(e) => {
                    e.stopPropagation();
                    clearField(field);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.stopPropagation();
                      clearField(field);
                    }
                  }}
                  className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 text-slate-500 transition-colors hover:bg-slate-300"
                >
                  <X size={9} />
                </span>
              ) : null}
              <ChevronDown
                size={13}
                strokeWidth={2}
                className={[
                  "text-slate-400 transition-transform duration-200",
                  isOpen ? "rotate-180" : "",
                ].join(" ")}
              />
            </span>
          </button>
        </div>
      );
    }

    /* Champ texte libre */
    return (
      <div className="flex flex-1 items-center gap-3 px-4 py-3 sm:py-[14px]">
        <FieldIcon className="shrink-0 text-gray-400" />
        <input
          type={fieldCfg.type ?? "text"}
          placeholder={fieldCfg.ph}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setFeedback({ kind: "idle" });
          }}
          disabled={isLoading}
          autoComplete={
            active === "client"
              ? field === "f1"
                ? "username"
                : "current-password"
              : "off"
          }
          className="w-full bg-transparent text-[13px] font-normal text-slate-700 placeholder:text-slate-400 outline-none disabled:opacity-60"
        />
      </div>
    );
  };

  /* Options du dropdown actif */
  const activeOptions =
    openDropdown === "f1" ? cfg.f1.dropdown : cfg.f2.dropdown;

  /* ════════════════════════════════════════════════════════════════
     RENDU
  ════════════════════════════════════════════════════════════════ */
  return (
    <div className="relative w-full">

      {/* ── Bandeau bleu ── */}
      <div className="w-full bg-[#2D9CDB] pt-20 sm:pt-24 pb-6 sm:pb-8">
        <div className="mx-auto max-w-[640px] px-4">

          {/* Formulaire + dropdown, positionné relativement */}
          <div ref={formWrapRef} className="relative">

            {/* Carte blanche du formulaire */}
            <form
              onSubmit={onSubmit}
              className="flex flex-col sm:flex-row bg-white rounded-[2px] shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
            >
              {renderField("f1")}

              {/* Séparateur */}
              <div className="h-px w-full sm:h-auto sm:w-px bg-gray-200 sm:my-2" />

              {renderField("f2")}

              {/* Bouton soumettre */}
              <button
                type="submit"
                aria-label={t("aria.submit")}
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

            {/* ── Panneau dropdown ── */}
            <AnimatePresence>
              {openDropdown && activeOptions ? (
                <motion.div
                  key={`dd-${openDropdown}-${active}`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
                  role="listbox"
                  aria-label={openDropdown === "f1" ? cfg.f1.ph : cfg.f2.ph}
                  className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-[2px] bg-white shadow-[0_10px_36px_rgba(0,0,0,0.16)]"
                >
                  {/* Scroll area */}
                  <div
                    className="max-h-[220px] overflow-y-auto p-3"
                    style={{ scrollbarWidth: "thin", scrollbarColor: "#cbd5e1 transparent" }}
                  >
                    <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                      {activeOptions.map((opt) => {
                        const currentVal = openDropdown === "f1" ? f1 : f2;
                        const selected = currentVal === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            role="option"
                            aria-selected={selected}
                            onClick={() => selectOption(openDropdown, opt)}
                            className={[
                              "rounded-[2px] px-3 py-2 text-left text-[11.5px] font-medium leading-snug transition-all duration-150",
                              selected
                                ? "bg-[#1E2F8A] text-white"
                                : "bg-slate-50 text-slate-700 hover:bg-[#1E2F8A]/10 hover:text-[#1E2F8A]",
                            ].join(" ")}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer indicatif */}
                  <div className="border-t border-slate-100 px-4 py-2">
                    <p className="text-[11px] uppercase tracking-[0.1em] text-slate-400">
                      {openDropdown === "f1"
                        ? cfg.f1.ph.replace("...", "").trim()
                        : cfg.f2.ph.replace("...", "").trim()}
                      {(openDropdown === "f1" ? cfg.f1.optional : cfg.f2.optional)
                        ? ` — ${t("optional")}`
                        : ""}
                    </p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* ── Feedback succès / erreur — tous les onglets ── */}
          <AnimatePresence>
            {feedback.kind === "error" || feedback.kind === "success" ? (
              <motion.div
                key={`fb-${feedback.kind}-${active}`}
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

      {/* ── Carte des onglets (flotte au-dessus) ── */}
      <div className="absolute top-0 left-1/2 z-10 w-full max-w-[780px] -translate-x-1/2 -translate-y-1/2 px-4">

        {/* Mobile <480px : sélecteur dropdown — gain de place + lisibilité */}
        <div className="relative min-[480px]:hidden">
          {(() => {
            const activeTab = TABS.find((t) => t.id === active);
            if (!activeTab) return null;
            const ActiveIcon = activeTab.Icon;
            return (
              <>
                <button
                  type="button"
                  onClick={() => setTabsMenuOpen((v) => !v)}
                  aria-haspopup="listbox"
                  aria-expanded={tabsMenuOpen}
                  aria-label={t("aria.pickAction")}
                  className="flex w-full items-center gap-3 rounded-t-[10px] border border-b-0 border-white/25 bg-[#2D9CDB] px-4 text-white transition-colors hover:bg-[#2890CC]"
                  style={{ minHeight: 56 }}
                >
                  <ActiveIcon className="h-7 w-7 shrink-0" />
                  <span className="flex-1 text-left text-[0.8125rem] font-bold uppercase tracking-[0.1em]">
                    {activeTab.label}
                  </span>
                  <ChevronDown
                    size={18}
                    strokeWidth={2}
                    className={[
                      "shrink-0 transition-transform duration-200",
                      tabsMenuOpen ? "rotate-180" : "",
                    ].join(" ")}
                  />
                </button>

                <AnimatePresence>
                  {tabsMenuOpen ? (
                    <motion.ul
                      role="listbox"
                      aria-label={t("aria.selectAction")}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute left-0 right-0 top-full z-30 mt-1 overflow-hidden rounded-[6px] border border-white/25 bg-[#2D9CDB] shadow-lg"
                    >
                      {TABS.map((tab) => {
                        const TabIcon = tab.Icon;
                        const isActive = tab.id === active;
                        return (
                          <li key={tab.id}>
                            <button
                              type="button"
                              role="option"
                              aria-selected={isActive}
                              onClick={() => {
                                setActive(tab.id);
                                setTabsMenuOpen(false);
                              }}
                              className={[
                                "flex w-full items-center gap-3 px-4 text-left text-white transition-colors",
                                isActive ? "bg-white/20" : "hover:bg-white/10",
                              ].join(" ")}
                              style={{ minHeight: 52 }}
                            >
                              <TabIcon className="h-6 w-6 shrink-0" />
                              <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em]">
                                {tab.label}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </motion.ul>
                  ) : null}
                </AnimatePresence>
              </>
            );
          })()}
        </div>

        {/* Tablette / Desktop ≥480px : grille 4 onglets existante */}
        <div className="hidden overflow-hidden rounded-t-[10px] border border-b-0 border-white/25 bg-[#2D9CDB] min-[480px]:flex">
          {TABS.map((tab, i) => {
            const isActive = active === tab.id;
            const TabIcon = tab.Icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={[
                  "flex min-w-0 flex-1 flex-col items-center gap-1.5 px-1.5 py-4 sm:px-2 sm:py-5",
                  "font-[Inter,Helvetica,sans-serif] transition-all duration-200",
                  isActive
                    ? "bg-white/15 text-[#1E2F8A]"
                    : "text-white/75 hover:bg-white/10 hover:text-white",
                  i !== TABS.length - 1 ? "border-r border-white/20" : "",
                ].join(" ")}
              >
                <TabIcon className="shrink-0" />
                <span
                  className={[
                    "text-center text-[11px] uppercase leading-tight tracking-[0.06em] sm:tracking-[0.1em]",
                    isActive ? "font-bold" : "font-semibold",
                  ].join(" ")}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
