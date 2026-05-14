import * as React from "react";
import { cn } from "../lib/cn";

interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
  headingAs?: "h2" | "h3";
  headingClassName?: string;
  className?: string;
}

/**
 * Reusable section heading block: eyebrow label + h2/h3 + optional lead.
 * Works on both light and dark backgrounds — inherit text-color from parent
 * for the heading; description uses text-slate (override via className for dark).
 */
export function SectionHeader({
  eyebrow,
  heading,
  description,
  align = "left",
  headingAs: Heading = "h2",
  headingClassName,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-amber sm:text-sm">
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          "font-display font-bold tracking-tight text-balance",
          "text-[clamp(1.875rem,4vw,3rem)]",
          eyebrow && "mt-3 sm:mt-4",
          headingClassName,
        )}
      >
        {heading}
      </Heading>
      {description && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-slate sm:mt-5 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
