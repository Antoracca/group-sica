export const containerMaxWidth = "1440px";

export const breakpoints = {
  xs: "360px",
  sm: "480px",
  md: "640px",
  lg: "768px",
  xl: "1024px",
  "2xl": "1280px",
  "3xl": "1440px",
  "4xl": "1920px",
} as const;

export const radii = {
  none: "0",
  xs: "0.125rem",
  sm: "0.25rem",
  DEFAULT: "0.5rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  "3xl": "2rem",
  full: "9999px",
} as const;

export const shadows = {
  none: "none",
  xs: "0 1px 2px 0 rgb(11 16 32 / 0.05)",
  sm: "0 1px 3px 0 rgb(11 16 32 / 0.08), 0 1px 2px -1px rgb(11 16 32 / 0.08)",
  DEFAULT: "0 4px 6px -1px rgb(11 16 32 / 0.10), 0 2px 4px -2px rgb(11 16 32 / 0.10)",
  md: "0 10px 15px -3px rgb(11 16 32 / 0.10), 0 4px 6px -4px rgb(11 16 32 / 0.10)",
  lg: "0 20px 25px -5px rgb(11 16 32 / 0.10), 0 8px 10px -6px rgb(11 16 32 / 0.10)",
  xl: "0 25px 50px -12px rgb(11 16 32 / 0.20)",
  header: "0 1px 8px 2px rgb(11 16 32 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(11 16 32 / 0.05)",
} as const;
