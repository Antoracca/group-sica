import { Inter, Sora } from "next/font/google";

export const fontDisplay = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "600", "700", "800"],
});

export const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600"],
});
