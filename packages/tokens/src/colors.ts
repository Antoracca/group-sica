export const brand = {
  royal: {
    DEFAULT: "#1E2F8A",
    50: "#EEF1FA",
    100: "#D6DDF2",
    200: "#ADBBE6",
    300: "#7E91D4",
    400: "#5168BD",
    500: "#2E45A3",
    600: "#1E2F8A",
    700: "#182572",
    800: "#121D5A",
    900: "#0F1956",
    950: "#080F38",
  },
  amber: {
    DEFAULT: "#F39200",
    50: "#FFF6E6",
    100: "#FFE7BF",
    200: "#FFD085",
    300: "#FFB851",
    400: "#FFA225",
    500: "#F39200",
    600: "#D87D00",
    700: "#A85F00",
    800: "#7A4400",
    900: "#4D2A00",
  },
} as const;

export const neutral = {
  ink: "#0B1020",
  slate: "#475066",
  mist: "#EEF1F7",
  paper: "#FAFAF7",
  pure: "#FFFFFF",
} as const;

export const semantic = {
  success: {
    DEFAULT: "#1F8A56",
    fg: "#FFFFFF",
    soft: "#E3F4EC",
  },
  warn: {
    DEFAULT: "#C97A0D",
    fg: "#FFFFFF",
    soft: "#FCF0DC",
  },
  danger: {
    DEFAULT: "#B5283A",
    fg: "#FFFFFF",
    soft: "#FBE4E7",
  },
  info: {
    DEFAULT: "#2E45A3",
    fg: "#FFFFFF",
    soft: "#E5E9F5",
  },
} as const;

export const colors = {
  brand,
  neutral,
  semantic,
} as const;

export type BrandColor = keyof typeof brand;
export type NeutralColor = keyof typeof neutral;
export type SemanticColor = keyof typeof semantic;
