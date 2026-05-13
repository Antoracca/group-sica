import * as React from "react";
import { cn } from "../lib/cn";

export type LogoBrand = "groupe" | "construction" | "assistance";

interface LogoProps extends React.HTMLAttributes<HTMLAnchorElement> {
  brand?: LogoBrand;
  href?: string;
  src?: string;
  alt?: string;
  /** Natural width of the source image (informational, kept for aspect ratio). */
  width?: number;
  /** Natural height of the source image. */
  height?: number;
  /** Tailwind classes applied to the img element. Drive responsive size from here. */
  imgClassName?: string;
  imageRenderer?: (props: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className: string;
  }) => React.ReactNode;
}

const labels: Record<LogoBrand, string> = {
  groupe: "Groupe SICA",
  construction: "SICA Construction",
  assistance: "SICA Assistance",
};

/**
 * Brand logo wrapper. Responsive by default — scales from 32px high on tiny
 * mobiles up to 56px on large desktops. Pass `imageRenderer` to delegate to
 * next/image inside apps; otherwise renders a plain <img> as a fallback.
 */
export function Logo({
  brand = "groupe",
  href = "/",
  src,
  alt,
  width = 200,
  height = 200,
  className,
  imgClassName,
  imageRenderer,
  ...rest
}: LogoProps) {
  const finalAlt = alt ?? labels[brand];
  const finalSrc = src ?? `/logo-${brand}.png`;
  const finalImgClassName = cn(
    "h-9 w-auto select-none sm:h-10 lg:h-11 xl:h-12",
    imgClassName,
  );

  return (
    <a
      href={href}
      aria-label={finalAlt}
      className={cn("inline-flex shrink-0 items-center", className)}
      {...rest}
    >
      {imageRenderer ? (
        imageRenderer({ src: finalSrc, alt: finalAlt, width, height, className: finalImgClassName })
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={finalSrc}
          alt={finalAlt}
          width={width}
          height={height}
          loading="eager"
          className={finalImgClassName}
        />
      )}
    </a>
  );
}
