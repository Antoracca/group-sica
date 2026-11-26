import { ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "@sica/ui";

/* Étapes présentées sans carte ni numéro : une suite de titres reliés par une flèche,
   posés directement sur le fond sombre. */

export function Parcours({
  etapes,
  ordre = true,
  className,
}: {
  etapes: readonly { titre: string; texte: string }[];
  /* true : flèche de progression devant chaque titre ; false : simple liste */
  ordre?: boolean;
  className?: string;
}) {
  const Liste = ordre ? "ol" : "ul";
  return (
    <Liste className={cn("grid gap-x-14 gap-y-12 md:grid-cols-2 lg:grid-cols-3", className)}>
      {etapes.map((e) => (
        <li key={e.titre} className="max-w-sm">
          <p className="f-titre flex items-start gap-3 text-[clamp(1.35rem,2vw,1.7rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-white">
            {ordre ? (
              <>
                <ArrowRight aria-hidden className="mt-1 hidden size-6 shrink-0 text-brand-amber md:block" />
                <ArrowDown aria-hidden className="mt-1 size-6 shrink-0 text-brand-amber md:hidden" />
              </>
            ) : null}
            <span>{e.titre}</span>
          </p>
          <p className={cn("mt-3 text-[15px] leading-relaxed text-white/65", ordre && "md:pl-9")}>{e.texte}</p>
        </li>
      ))}
    </Liste>
  );
}
