"use client";

import * as React from "react";
import { Phone, FileText } from "lucide-react";
import { cn } from "../lib/cn";

export interface StickyCtaMobileProps {
  /** Lien du devis (typiquement /devis du sous-site Construction). */
  devisHref: string;
  /** Lien tel: format `tel:+225...`. */
  phoneHref: string;
  /** Libellé bouton primaire (devis). Par défaut "Devis". */
  devisLabel?: string;
  /** Libellé bouton secondaire (appel). Par défaut "Appeler". */
  phoneLabel?: string;
  /** Seuil de scroll en pixels avant la première apparition. Par défaut 400. */
  showAfterScrollPx?: number;
  /** Delta de scroll (px) en-dessous duquel on ignore le changement. Évite
   *  les micro-jitters / le mouvement inertiel iOS. Par défaut 4. */
  minDelta?: number;
  className?: string;
}

/**
 * Barre CTA fixe en bas de l'écran, visible uniquement sur mobile (<768 px).
 *
 * Comportement directionnel (miroir de la navbar) :
 *   - Tant que y <= showAfterScrollPx → cachée (hero immersive intacte).
 *   - Scroll VERS LE BAS (delta > 0) → cachée (libère le contenu en lecture).
 *   - Scroll VERS LE HAUT (delta < 0) → visible (intent de revenir / agir).
 *
 * Touch targets : 56 px de hauteur, > 44 px recommandés.
 * Respecte `env(safe-area-inset-bottom)` pour les iPhone à encoche.
 */
export function StickyCtaMobile({
  devisHref,
  phoneHref,
  devisLabel = "Devis",
  phoneLabel = "Appeler",
  showAfterScrollPx = 400,
  minDelta = 4,
  className,
}: StickyCtaMobileProps) {
  const [visible, setVisible] = React.useState(false);
  const lastY = React.useRef(0);

  React.useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      // Filtre les micro-mouvements (bounce iOS / trackpad inertial).
      if (Math.abs(delta) < minDelta) return;

      if (y <= showAfterScrollPx) {
        // En haut de page : on reste caché quelle que soit la direction.
        setVisible(false);
      } else if (delta < 0) {
        // Scroll vers le haut → on affiche.
        setVisible(true);
      } else {
        // Scroll vers le bas → on cache.
        setVisible(false);
      }
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfterScrollPx, minDelta]);

  return (
    <div
      role="region"
      aria-label="Actions rapides"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px border-t border-white/10 bg-ink/95 backdrop-blur-md transition-transform duration-300 md:hidden",
        visible ? "translate-y-0" : "translate-y-full",
        className,
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <a
        href={devisHref}
        className="flex items-center justify-center gap-2 bg-brand-amber px-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-brand-amber-600 active:bg-brand-amber-600"
        style={{ minHeight: 56 }}
      >
        <FileText className="size-4 shrink-0" strokeWidth={2.25} />
        {devisLabel}
      </a>
      <a
        href={phoneHref}
        className="flex items-center justify-center gap-2 bg-white/[0.04] px-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10 active:bg-white/10"
        style={{ minHeight: 56 }}
      >
        <Phone className="size-4 shrink-0" strokeWidth={2.25} />
        {phoneLabel}
      </a>
    </div>
  );
}
