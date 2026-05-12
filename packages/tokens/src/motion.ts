import type { Variants, Transition } from "motion/react";

export const easings = {
  standard: [0.4, 0, 0.2, 1] as const,
  emphasized: [0.2, 0, 0, 1] as const,
  decelerate: [0, 0, 0.2, 1] as const,
  accelerate: [0.4, 0, 1, 1] as const,
} as const;

export const durations = {
  instant: 0.1,
  fast: 0.2,
  base: 0.3,
  slow: 0.5,
  slower: 0.7,
} as const;

export const transitions = {
  fast: { duration: durations.fast, ease: easings.standard } satisfies Transition,
  base: { duration: durations.base, ease: easings.standard } satisfies Transition,
  emphasized: { duration: durations.slow, ease: easings.emphasized } satisfies Transition,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: transitions.base },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.base },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: transitions.base },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: transitions.base },
};

export const revealStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const headerSlide: Variants = {
  visible: { y: 0, transition: { duration: durations.fast, ease: easings.decelerate } },
  hidden: { y: "-100%", transition: { duration: durations.fast, ease: easings.accelerate } },
};
