export const fontFamilies = {
  display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
  body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
  mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
} as const;

export const fontSizes = {
  "2xs": ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.01em" }],
  xs: ["0.75rem", { lineHeight: "1rem" }],
  sm: ["0.875rem", { lineHeight: "1.25rem" }],
  base: ["1rem", { lineHeight: "1.5rem" }],
  lg: ["1.125rem", { lineHeight: "1.75rem" }],
  xl: ["1.25rem", { lineHeight: "1.75rem" }],
  "2xl": ["1.5rem", { lineHeight: "2rem" }],
  "3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.005em" }],
  "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.01em" }],
  "5xl": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
  "6xl": ["3.75rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
  "7xl": ["4.5rem", { lineHeight: "1", letterSpacing: "-0.025em" }],
  "8xl": ["6rem", { lineHeight: "1", letterSpacing: "-0.03em" }],
  "9xl": ["8rem", { lineHeight: "1", letterSpacing: "-0.035em" }],
} as const;

export const fontWeights = {
  light: "300",
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
} as const;

export const letterSpacings = {
  tighter: "-0.04em",
  tight: "-0.02em",
  normal: "0",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
} as const;
