const isDev = process.env.NODE_ENV === "development";

const constructionBase =
  process.env.NEXT_PUBLIC_CONSTRUCTION_URL?.replace(/\/+$/, "") ||
  (isDev ? "http://localhost:3001" : "https://sicaconstruction.com");

const groupeBase =
  process.env.NEXT_PUBLIC_GROUPE_URL?.replace(/\/+$/, "") ||
  (isDev ? "http://localhost:3000" : "https://groupe-sica.com");

const assistanceBase =
  process.env.NEXT_PUBLIC_ASSISTANCE_URL?.replace(/\/+$/, "") ||
  (isDev ? "http://localhost:3002" : "https://sicaassistance.com");

const landingBase =
  process.env.NEXT_PUBLIC_LANDING_URL?.replace(/\/+$/, "") ||
  (isDev ? "http://localhost:3003" : "https://sica.com");

// L'espace client est intégré à l'app groupe : connexion sous /espace-client.
const espaceBase = `${groupeBase}/espace-client`;

export const links = {
  construction: {
    base: constructionBase,
    devis: `${constructionBase}/devis`,
  },
  groupe: {
    base: groupeBase,
  },
  assistance: {
    base: assistanceBase,
  },
  landing: {
    base: landingBase,
  },
  espace: {
    base: espaceBase,
  }
};

