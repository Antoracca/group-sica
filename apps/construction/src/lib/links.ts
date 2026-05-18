const constructionBase =
  process.env.NEXT_PUBLIC_CONSTRUCTION_URL?.replace(/\/+$/, "") ||
  "http://localhost:3001";

const groupeBase =
  process.env.NEXT_PUBLIC_GROUPE_URL?.replace(/\/+$/, "") ||
  "https://groupesica.ci";

const assistanceBase =
  process.env.NEXT_PUBLIC_ASSISTANCE_URL?.replace(/\/+$/, "") ||
  "https://sicaassistance.ci";

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
};

