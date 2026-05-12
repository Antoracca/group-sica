"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useReducedMotion } from "motion/react";

export type HeaderState = "top" | "scrolled" | "hidden";

export interface UseHeaderScrollOptions {
  /** Distance in pixels before the header switches from transparent to solid. */
  scrolledThreshold?: number;
  /** Distance in pixels before scroll-down can hide the header (must be > scrolledThreshold). */
  hideThreshold?: number;
  /** Minimum scroll delta (px) to trigger a state change. Prevents jitter. */
  minDelta?: number;
}

/**
 * Replicates and improves on the Vinci Autoroutes header behavior:
 *  - "top"      : near the page top, header is transparent over the hero.
 *  - "scrolled" : after scrolledThreshold, header is solid and fixed.
 *  - "hidden"   : scrolling down past hideThreshold hides the header (translateY -100%).
 *  - "scrolled" again as soon as the user scrolls up by minDelta.
 *
 * Respects `prefers-reduced-motion`: never hides the header.
 */
export function useHeaderScroll(options: UseHeaderScrollOptions = {}): HeaderState {
  const { scrolledThreshold = 80, hideThreshold = 480, minDelta = 6 } = options;
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();
  const [state, setState] = useState<HeaderState>("top");
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - lastY.current;
    if (Math.abs(delta) < minDelta) return;

    let next: HeaderState;
    if (y <= scrolledThreshold) {
      next = "top";
    } else if (!reduceMotion && delta > 0 && y > hideThreshold) {
      next = "hidden";
    } else {
      next = "scrolled";
    }

    if (next !== state) setState(next);
    lastY.current = y;
  });

  // Reset to "top" on mount if the page is at the top (SSR may render with last state).
  useEffect(() => {
    if (window.scrollY <= scrolledThreshold) setState("top");
  }, [scrolledThreshold]);

  return state;
}
