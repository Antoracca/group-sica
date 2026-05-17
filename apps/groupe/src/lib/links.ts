const constructionBase =
  process.env.NEXT_PUBLIC_CONSTRUCTION_URL?.replace(/\/+$/, "") ||
  "http://localhost:3001";

export const links = {
  construction: {
    base: constructionBase,
    devis: `${constructionBase}/devis`,
  },
};

