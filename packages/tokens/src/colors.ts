export const brand = {
  royal: {
    DEFAULT: "#0633B0",
    50: "#EBF0FD",
    100: "#D0DBF8",
    200: "#A0B8F3",
    300: "#6B8EE7",
    400: "#3965D5",
    500: "#1548C9",
    600: "#0633B0",
    700: "#042B8E",
    800: "#032270",
    900: "#031F68",
    950: "#021442",
  },
  amber: {
    DEFAULT: "#F77F00",
    50: "#FFF4E6",
    100: "#FFE2BF",
    200: "#FFC685",
    300: "#FFAA51",
    400: "#FF9025",
    500: "#F77F00",
    600: "#D86B00",
    700: "#A85100",
    800: "#7A3A00",
    900: "#4D2400",
  },
} as const;

export const neutral = {
  ink: "#071027",
  slate: "#4B556C",
  mist: "#ECF0F9",
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
    DEFAULT: "#C96A0D",
    fg: "#FFFFFF",
    soft: "#FCEDDC",
  },
  danger: {
    DEFAULT: "#B5283A",
    fg: "#FFFFFF",
    soft: "#FBE4E7",
  },
  info: {
    DEFAULT: "#1548C9",
    fg: "#FFFFFF",
    soft: "#E1E8F9",
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
