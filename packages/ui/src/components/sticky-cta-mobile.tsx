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
  /** Seuil de scroll en pixels avant apparition. Par défaut 400. */
  showAfterScrollPx?: number;
  className?: string;
}

/**
 * Barre CTA fixe en bas de l'écran, visible uniquement sur mobile (<768 px).
 * Apparaît après que l'utilisateur a scrollé `showAfterScrollPx` pixels —
 * la hero reste donc immersive au premier impact, puis la barre se présente.
 *
 * Touch targets : 56 px de hauteur, > 44 px recommandés.
 * Respecte `env(safe-area-inset-bottom)` pour les iPhone à encoche.
 *
 * Note : la barre couvre les ~56 px du bas. Si une page risque d'avoir
 * du contenu critique tout en bas (au-delà du footer), ajouter un
 * `pb-[80px] md:pb-0` sur le wrapper concerné.
 */
export function StickyCtaMobile({
  devisHref,
  phoneHref,
  devisLabel = "Devis",
  phoneLabel = "Appeler",
  showAfterScrollPx = 400,
  className,
}: StickyCtaMobileProps) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > showAfterScrollPx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfterScrollPx]);

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
