import type { ReactNode } from "react";
import { cn } from "@sica/ui";

/* Système de titres SICA ASSISTANCE (DESIGN.md §2, révision 2).
   Tracés SVG dessinés pour SICA : constellation de points du logo avec « SICA ASSISTANCE »,
   trait orange tracé à la main. Aucune pilule, aucune icône générique. */

/* Mot mis en avant : serif italique orange. */
export function Em({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("f-accent text-[1.08em] text-brand-amber", className)}>{children}</span>;
}

/* Mot souligné d'un trait orange tracé à la main (animé). */
export function Trait({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("relative inline-block whitespace-nowrap", className)}>
      <span className="relative z-10">{children}</span>
      <svg
        aria-hidden
        viewBox="0 0 300 16"
        preserveAspectRatio="none"
        className="absolute -bottom-[0.12em] left-[-2%] z-0 h-[0.32em] w-[104%] text-brand-amber"
      >
        <path
          d="M3 11 C 48 4, 96 3, 150 7 S 246 13, 297 5"
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth={5}
          strokeLinecap="round"
          className="sica-trace"
        />
      </svg>
    </span>
  );
}

/* Logo SICA ASSISTANCE redessiné en SVG : constellation de points + « SICA » + « ASSISTANCE ». */
const POINTS: [number, number, number][] = [
  [1050, 305, 0.82],
  [678, 552, 0.95],
  [998, 552, 0.95],
  [1317, 552, 0.95],
  [200, 840, 1.08],
  [568, 840, 1.08],
  [445, 1248, 1.25],
  [868, 1248, 1.25],
  [1290, 1248, 1.25],
  [788, 1632, 1.42],
];

const TITRE = { fontFamily: "var(--font-titre), var(--font-display), sans-serif" } as const;

export function SicaDots({
  className,
  accent = [],
  tone = "royal",
  texte = true,
}: {
  className?: string;
  /* index des points à colorer en orange */
  accent?: number[];
  tone?: "royal" | "clair";
  /* écrit « SICA ASSISTANCE » dans le logo */
  texte?: boolean;
}) {
  const clair = tone === "clair";
  return (
    <svg aria-hidden viewBox={texte ? "0 0 1500 2330" : "0 0 1500 1900"} className={className}>
      {POINTS.map(([x, y, s], i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx={118 * s}
          ry={96 * s}
          transform={`rotate(-18 ${x} ${y})`}
          className={
            accent.includes(i)
              ? "fill-brand-amber"
              : clair
                ? texte
                  ? "fill-white/25"
                  : "fill-white/15"
                : texte
                  ? "fill-brand-royal/80"
                  : "fill-brand-royal"
          }
        />
      ))}
      {texte ? (
        <>
          <text
            x="750"
            y="1150"
            textAnchor="middle"
            textLength="1380"
            lengthAdjust="spacingAndGlyphs"
            fontSize="600"
            fontWeight="800"
            style={{ ...TITRE, paintOrder: "stroke" }}
            strokeWidth="56"
            strokeLinejoin="round"
            className={clair ? "fill-brand-amber stroke-[#0A1130]" : "fill-brand-amber stroke-white"}
          >
            SICA
          </text>
          <text
            x="750"
            y="2250"
            textAnchor="middle"
            textLength="1460"
            lengthAdjust="spacingAndGlyphs"
            fontSize="250"
            fontWeight="800"
            style={TITRE}
            className={clair ? "fill-white" : "fill-brand-royal"}
          >
            ASSISTANCE
          </text>
        </>
      ) : null}
    </svg>
  );
}

/* Sur-titre en bannière orange (ruban incliné, ombre décalée) + flèche tracée à la main. */
const RUBAN = "[clip-path:polygon(0_0,100%_0,calc(100%-16px)_50%,100%_100%,0_100%,16px_50%)]";

export function Kicker({ children, dark = false, className }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <p className={cn("relative inline-flex items-end gap-2", className)}>
      <span className="relative inline-flex -rotate-[2deg]">
        <span aria-hidden className={cn("absolute inset-0 translate-x-[6px] translate-y-[6px]", RUBAN, dark ? "bg-white/20" : "bg-brand-royal")} />
        <span
          className={cn(
            "f-titre relative inline-flex items-center bg-brand-amber sm:whitespace-nowrap px-7 py-3 text-[clamp(1.05rem,2.5vw,2.15rem)] font-extrabold uppercase leading-none tracking-[0.03em] text-[#0A1130] sm:px-12 sm:py-4",
            RUBAN,
          )}
        >
          {children}
        </span>
      </span>
      <svg aria-hidden viewBox="0 0 70 48" className={cn("mb-[-18px] hidden h-10 w-14 shrink-0 sm:block", dark ? "text-white/70" : "text-brand-royal")}>
        <path d="M4 6 C 30 2, 52 12, 50 38" pathLength={1} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="sica-trace" />
        <path d="M41 30 L50 40 L58 29" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </p>
  );
}
