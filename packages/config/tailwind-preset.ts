import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import {
  breakpoints,
  containerMaxWidth,
  fontFamilies,
  fontSizes,
  fontWeights,
  letterSpacings,
  radii,
  shadows,
} from "@sica/tokens";

const preset: Omit<Config, "content"> = {
  darkMode: ["class"],
  theme: {
    screens: {
      sm: breakpoints.sm,
      md: breakpoints.md,
      lg: breakpoints.lg,
      xl: breakpoints.xl,
      "2xl": breakpoints["2xl"],
      "3xl": breakpoints["3xl"],
      "4xl": breakpoints["4xl"],
    },
    container: {
      center: true,
      padding: "var(--gutter)",
      screens: {
        "2xl": containerMaxWidth,
      },
    },
    extend: {
      fontFamily: {
        display: fontFamilies.display,
        body: fontFamilies.body,
        mono: fontFamilies.mono,
        sans: fontFamilies.body,
      },
      fontSize: fontSizes,
      fontWeight: fontWeights,
      letterSpacing: letterSpacings,
      borderRadius: {
        ...radii,
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: shadows,
      colors: {
        brand: {
          royal: {
            DEFAULT: "hsl(var(--brand-royal))",
            700: "hsl(var(--brand-royal-700))",
            900: "hsl(var(--brand-royal-900))",
          },
          amber: {
            DEFAULT: "hsl(var(--brand-amber))",
            600: "hsl(var(--brand-amber-600))",
          },
        },
        ink: "hsl(var(--ink))",
        slate: "hsl(var(--slate))",
        mist: "hsl(var(--mist))",
        paper: "hsl(var(--paper))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
      },
      spacing: {
        "header-height": "var(--header-height)",
        "header-height-lg": "var(--header-height-lg)",
        gutter: "var(--gutter)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
};

export default preset;
