const isDev = process.env.NODE_ENV === "development";

const constructionBase =
  process.env.NEXT_PUBLIC_CONSTRUCTION_URL?.replace(/\/+$/, "") ||
  (isDev ? "http://localhost:3001" : "https://www.sicaconstruction.com");

const groupeBase =
  process.env.NEXT_PUBLIC_GROUPE_URL?.replace(/\/+$/, "") ||
  (isDev ? "http://localhost:3000" : "https://www.groupe-sica.com");

const assistanceBase =
  process.env.NEXT_PUBLIC_ASSISTANCE_URL?.replace(/\/+$/, "") ||
  (isDev ? "http://localhost:3002" : "https://www.sicaassistance.com");

const landingBase =
  process.env.NEXT_PUBLIC_LANDING_URL?.replace(/\/+$/, "") ||
  (isDev ? "http://localhost:3003" : "https://www.groupe-sica.com");

// L'espace client est hébergé dans l'app groupe sous /espace-client.
const espaceBase = `${groupeBase}/espace-client`;

export const links = {
  construction: { base: constructionBase },
  groupe: { base: groupeBase },
  assistance: { base: assistanceBase },
  landing: { base: landingBase },
  espace: { base: espaceBase },
};
