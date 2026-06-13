import { defineRouting } from "next-intl/routing";

/*
  Configuration de l'internationalisation du site Groupe SICA.
  - locales : français (par défaut) + anglais
  - localePrefix "always" : chaque langue a son préfixe d'URL (/fr, /en)
  Les routes NON localisées (espace client, panel admin) sont exclues via
  le matcher du middleware (src/middleware.ts).
*/
export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
