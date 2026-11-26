import type { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@sica/ui";
import { Kicker, SicaDots } from "@/components/titres";

/* Kit visuel SICA ASSISTANCE — voir apps/assistance/DESIGN.md (mise en page inspirée de batup.fr,
   couleurs SICA). Composants purement présentationnels, sans état. */

export const WRAP = "mx-auto w-full max-w-[1200px] px-5 sm:px-8";

export function Pill({ children, dark = false, className }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold",
        dark
          ? "border-white/15 bg-white/10 text-white/90 backdrop-blur-md"
          : "border-brand-royal/15 bg-brand-royal/[0.06] text-brand-royal",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHead({
  pill,
  title,
  intro,
  dark = false,
  align = "left",
  deco,
  className,
}: {
  /* libellé du sur-titre (sans fond) */
  pill?: string;
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  align?: "left" | "center";
  deco?: "points";
  className?: string;
}) {
  const centre = align === "center";
  return (
    <div className={cn("relative isolate", centre && "mx-auto max-w-3xl text-center", className)}>
      <div className={cn("grid gap-6", !centre && (intro || deco) && "lg:grid-cols-[1.55fr_1fr] lg:items-end lg:gap-12")}>
        <div className={cn(centre && "flex flex-col items-center")}>
          {pill ? <Kicker dark={dark}>{pill}</Kicker> : null}
          <h2
            className={cn(
              "f-titre mt-8 text-balance text-[clamp(2.35rem,5vw,4.3rem)] font-extrabold leading-[0.98] tracking-[-0.035em]",
              dark ? "text-white" : "text-ink",
            )}
          >
            {title}
          </h2>
        </div>
        {intro || deco ? (
          <div className={cn("flex flex-col gap-6", centre ? "items-center" : "lg:items-start lg:pb-2")}>
            {deco === "points" ? <SicaDots accent={[0, 9]} tone={dark ? "clair" : "royal"} className="hidden h-48 w-32 lg:block" /> : null}
            {intro ? (
              <p
                className={cn(
                  "max-w-xl text-pretty text-base leading-relaxed sm:text-lg",
                  centre && "mx-auto",
                  dark ? "text-white/70" : "text-slate",
                )}
              >
                {intro}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

type BtnVariant = "orange" | "outline-light" | "white" | "dark" | "outline";

const BTN: Record<BtnVariant, string> = {
  orange:
    "bg-brand-amber text-ink shadow-[0_10px_28px_-10px_rgba(247,127,0,0.7)] hover:bg-brand-amber-600",
  "outline-light": "border border-white/35 bg-white/5 text-white backdrop-blur-md hover:bg-white/15",
  white: "bg-white text-ink shadow-[0_2px_12px_rgba(255,255,255,0.15)] hover:bg-white/90",
  dark: "bg-ink text-white hover:bg-brand-royal-900",
  outline: "border border-slate-300 bg-white text-ink hover:border-brand-royal hover:text-brand-royal",
};

export function Btn({
  href,
  children,
  variant = "orange",
  arrow = false,
  className,
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: BtnVariant;
  arrow?: boolean;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold transition-all duration-200",
        BTN[variant],
        className,
      )}
    >
      {children}
      {arrow ? <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" /> : null}
    </a>
  );
}

export function Bullets({ items, dark = false }: { items: readonly string[]; dark?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            aria-hidden
            className={cn(
              "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
              dark ? "bg-brand-amber/20 text-brand-amber" : "bg-brand-amber/15 text-brand-amber-600",
            )}
          >
            <Check className="size-3" strokeWidth={3} />
          </span>
          <span className={dark ? "text-white/80" : "text-slate"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* Section sombre arrondie, encastrée avec une marge latérale (comme les panneaux noirs de la référence). */
export function DarkFrame({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("scroll-mt-28 px-3 sm:px-4", className)}>
      <div className="relative isolate overflow-hidden rounded-[28px] bg-[#0A1130] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_15%_0%,rgba(6,51,176,0.55),transparent_70%),radial-gradient(40%_35%_at_95%_100%,rgba(247,127,0,0.16),transparent_70%)]"
        />
        {children}
      </div>
    </section>
  );
}

/* Carte claire standard. */
export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8", className)}>{children}</div>
  );
}

/* Libellé de panneau en petites capitales. */
export function Label({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={cn("text-[11px] font-semibold uppercase tracking-[0.14em]", dark ? "text-brand-amber" : "text-brand-royal")}>
      {children}
    </p>
  );
}

/* Bandeau défilant infini, sans fond ni puce : texte posé directement dans la carte sombre.
   sens = "gauche" (défile vers la gauche) ou "droite" (défile vers la droite). */
export function Marquee({ items, sens = "gauche" }: { items: readonly string[]; sens?: "gauche" | "droite" }) {
  const row = [...items, ...items];
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
      <div
        className={cn(
          "flex w-max items-baseline gap-12 group-hover:[animation-play-state:paused] motion-reduce:animate-none sm:gap-16",
          sens === "gauche"
            ? "animate-[sica-marquee_60s_linear_infinite]"
            : "animate-[sica-marquee-droite_60s_linear_infinite]",
        )}
      >
        {row.map((t, i) => (
          <span
            key={`${t}-${i}`}
            aria-hidden={i >= items.length}
            className={cn(
              "f-titre whitespace-nowrap text-[clamp(1.6rem,3.4vw,2.9rem)] font-bold tracking-[-0.03em]",
              i % 2 === (sens === "gauche" ? 0 : 1) ? "text-white" : "contour-clair",
            )}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
