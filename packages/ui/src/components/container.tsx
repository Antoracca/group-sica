import * as React from "react";
import { cn } from "../lib/cn";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "article" | "header" | "footer" | "main" | "nav";
  size?: "tight" | "default" | "wide" | "full";
}

const sizeMap = {
  tight: "max-w-3xl",
  default: "max-w-screen-2xl",
  wide: "max-w-screen-3xl",
  full: "max-w-none",
} as const;

export function Container({
  as: Comp = "div",
  size = "default",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Comp className={cn("mx-auto w-full px-gutter", sizeMap[size], className)} {...props}>
      {children}
    </Comp>
  );
}
