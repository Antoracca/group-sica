"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/* ════════════════════════════════════════════════════════════════════════
   PROJECT IMAGE CAROUSEL — aperçu dynamique des projets
   ────────────────────────────────────────────────────────────────────────
   - Défilement automatique des images d'un projet, avec fade + Ken Burns
     (léger zoom progressif) pour un rendu premium.
   - Décalage staggered entre cartes : `staggerIndex × staggerMs` retarde
     le tout premier changement de chaque carte, évitant que toutes les
     cartes basculent en même temps.
   - Pause au survol (perception : on examine cette carte, pas les autres).
   - Pause hors viewport via IntersectionObserver (économie batterie/CPU).
   - Préchargement éclair des 2 images suivantes pour éliminer le flash blanc.
   - `prefers-reduced-motion` : on désactive le zoom et on ralentit le cycle.
═══════════════════════════════════════════════════════════════════════ */

export interface ProjectImageCarouselProps {
  /** Liste d'URLs d'images (chemins publics absolus type "/media/..."). */
  images: string[];
  /** Texte alt pour le projet (utilisé sur chaque image). */
  alt: string;
  /** Index 0-based de la carte dans la grille (pilote le délai initial). */
  staggerIndex?: number;
  /** Délai (ms) ajouté entre cartes successives au premier cycle. */
  staggerMs?: number;
  /** Durée (ms) d'affichage d'une image avant la suivante. */
  intervalMs?: number;
  /** Durée (ms) du fade entre 2 images. */
  fadeMs?: number;
  /** `sizes` HTML pour next/image (responsive). */
  sizes?: string;
  /** `priority` next/image pour les 2 premières cartes au-dessus du fold. */
  priority?: boolean;
  /** Classes appliquées au conteneur (positionnement / aspect-ratio géré par le parent). */
  className?: string;
  /** Effet zoom-in en plus du fade (Ken Burns). Désactivé si reduced motion. */
  kenBurns?: boolean;
}

export function ProjectImageCarousel({
  images,
  alt,
  staggerIndex = 0,
  staggerMs = 2000,
  intervalMs = 5500,
  fadeMs = 900,
  sizes = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  className,
  kenBurns = true,
}: ProjectImageCarouselProps) {
  const reduce = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [visible, setVisible] = React.useState(true);

  const safeImages = images.length > 0 ? images : ["/placeholder.jpg"];

  /* ── Pause hors viewport ───────────────────────────────────────────── */
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(!!entry?.isIntersecting),
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ── Boucle d'autoplay avec décalage initial staggered ─────────────── */
  React.useEffect(() => {
    if (safeImages.length < 2) return;
    if (paused || !visible) return;

    const effectiveInterval = reduce ? Math.max(intervalMs, 9000) : intervalMs;
    const initialDelay = staggerIndex * staggerMs;

    let intervalId: ReturnType<typeof setInterval> | null = null;
    const timeoutId = window.setTimeout(() => {
      // Premier saut
      setIndex((i) => (i + 1) % safeImages.length);
      // Puis cadence régulière
      intervalId = setInterval(() => {
        setIndex((i) => (i + 1) % safeImages.length);
      }, effectiveInterval);
    }, initialDelay);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [paused, visible, reduce, intervalMs, staggerIndex, staggerMs, safeImages.length]);

  /* ── Préchargement de l'image suivante (élimine le flash blanc) ──── */
  React.useEffect(() => {
    if (safeImages.length < 2 || typeof window === "undefined") return;
    const next = safeImages[(index + 1) % safeImages.length];
    const after = safeImages[(index + 2) % safeImages.length];
    [next, after].forEach((src) => {
      if (!src) return;
      const img = new window.Image();
      img.src = src;
    });
  }, [index, safeImages]);

  const useKenBurns = kenBurns && !reduce;

  return (
    <div
      ref={containerRef}
      className={["relative h-full w-full overflow-hidden", className]
        .filter(Boolean)
        .join(" ")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={`${safeImages[index]}-${index}`}
          className="absolute inset-0"
          initial={{
            opacity: 0,
            scale: useKenBurns ? 1.0 : 1,
          }}
          animate={{
            opacity: 1,
            scale: useKenBurns ? 1.08 : 1,
          }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: fadeMs / 1000, ease: [0.4, 0, 0.2, 1] },
            scale: useKenBurns
              ? { duration: (intervalMs + fadeMs) / 1000, ease: "linear" }
              : { duration: 0 },
          }}
        >
          <Image
            src={safeImages[index]!}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority && index === 0}
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Indicateurs (dots) discrets bas-droite — purement visuels */}
      {safeImages.length > 1 ? (
        <div className="pointer-events-none absolute bottom-3 right-3 z-10 flex gap-1.5">
          {safeImages.map((_, i) => (
            <span
              key={i}
              aria-hidden
              className={[
                "h-1 rounded-full transition-all duration-500",
                i === index ? "w-5 bg-brand-amber" : "w-1 bg-white/60",
              ].join(" ")}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
