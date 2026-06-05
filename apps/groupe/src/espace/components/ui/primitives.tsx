import type { ReactNode } from "react";
import { cn } from "@sica/ui";
import type { LucideIcon } from "lucide-react";

/* ── Surface : carte « Mica » translucide, coins arrondis, ombre douce ── */
export function Surface({
  className,
  children,
  as: Comp = "div",
}: {
  className?: string;
  children: ReactNode;
  as?: "div" | "section" | "article";
}) {
  return (
    <Comp
      className={cn(
        "rounded-2xl border border-black/[0.06] bg-white/80 shadow-[0_1px_2px_rgba(13,26,74,0.04),0_8px_24px_-16px_rgba(13,26,74,0.18)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </Comp>
  );
}

/* ── Carte KPI (tableau de bord direction) ── */
export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  trend,
  accent = false,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
  trend?: string;
  accent?: boolean;
}) {
  return (
    <Surface className="p-5">
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "flex size-10 items-center justify-center rounded-xl",
            accent ? "bg-brand-amber/15 text-brand-amber-600" : "bg-brand-royal/10 text-brand-royal",
          )}
        >
          <Icon className="size-5" aria-hidden />
        </span>
        {trend ? (
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[0.6rem] font-semibold uppercase tracking-wide text-emerald-600">
            {trend}
          </span>
        ) : null}
      </div>
      <p className="mt-4 font-display text-[2rem] font-bold leading-none tracking-tight text-ink tabular-nums">
        {value}
      </p>
      <p className="mt-1.5 text-sm font-medium text-ink/80">{label}</p>
      {hint ? <p className="mt-0.5 text-xs text-slate">{hint}</p> : null}
    </Surface>
  );
}

/* ── Barre de progression ── */
export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div
      className={cn("h-2 w-full overflow-hidden rounded-full bg-brand-royal/10", className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-brand-royal to-brand-royal-700 transition-[width] duration-500"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

/* ── Pastille de statut ── */
const PILL: Record<string, string> = {
  "En cours": "bg-brand-royal/10 text-brand-royal",
  Livré: "bg-emerald-500/12 text-emerald-700",
  "En étude": "bg-amber-500/12 text-amber-700",
  Suspendu: "bg-red-500/12 text-red-700",
  "a-signer": "bg-brand-amber/15 text-brand-amber-600",
  signe: "bg-emerald-500/12 text-emerald-700",
  "en-attente": "bg-slate/15 text-slate",
  nouvelle: "bg-brand-amber/15 text-brand-amber-600",
  "en-cours": "bg-brand-royal/10 text-brand-royal",
  traitee: "bg-emerald-500/12 text-emerald-700",
};

export function StatusPill({ kind, label }: { kind: string; label: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em]",
        PILL[kind] ?? "bg-slate/15 text-slate",
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

/* ── Titre de section ── */
export function SectionTitle({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <h2 className="font-display text-lg font-semibold tracking-[-0.01em] text-ink">{children}</h2>
      {action}
    </div>
  );
}
