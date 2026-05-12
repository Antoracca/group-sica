import * as React from "react";
import { cn } from "../lib/cn";

export type LogoBrand = "groupe" | "construction" | "assistance";

interface LogoProps extends React.HTMLAttributes<HTMLAnchorElement> {
  brand?: LogoBrand;
  href?: string;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  imageRenderer?: (props: { src: string; alt: string; width: number; height: number }) => React.ReactNode;
}

const labels: Record<LogoBrand, string> = {
  groupe: "Groupe SICA",
  construction: "SICA Construction",
  assistance: "SICA Assistance",
};

/**
 * Brand logo wrapper. Pass `imageRenderer` to delegate to next/image inside apps;
 * otherwise renders a plain <img> as a fallback.
 */
export function Logo({
  brand = "groupe",
  href = "/",
  src,
  alt,
  width = 160,
  height = 56,
  className,
  imageRenderer,
  ...rest
}: LogoProps) {
  const finalAlt = alt ?? labels[brand];
  const finalSrc = src ?? `/logo-${brand}.png`;

  return (
    <a
      href={href}
      aria-label={finalAlt}
      className={cn("inline-flex shrink-0 items-center", className)}
      {...rest}
    >
      {imageRenderer ? (
        imageRenderer({ src: finalSrc, alt: finalAlt, width, height })
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={finalSrc} alt={finalAlt} width={width} height={height} loading="eager" />
      )}
    </a>
  );
}
