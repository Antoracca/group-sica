import { ASSISTANCE_FAQ } from "@/lib/faq";
import {
  AUTRES_FORMES,
  COTISATIONS_CNPS,
  FORMES,
  IMPOTS_ENTREPRISES,
  IMPOTS_PARTICULIERS,
  MODIFICATION_MOTIFS,
  PRESTATIONS_CABINET,
  REGIMES,
} from "@/lib/contenu";

/*
  Base de réponses de l'assistant « IA SICA ».
  Toutes les réponses viennent des fiches du site (document du DG, nov. 2026) :
  aucune réponse inventée. Si rien ne correspond, l'assistant oriente vers un conseiller.
*/

export type Fiche = { titre: string; reponse: string; lien?: string; motsCles: string };

const sansAccent = (t: string) =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9% ]/g, " ");

export const FICHES: Fiche[] = [
  ...ASSISTANCE_FAQ.map((f) => ({ titre: f.q, reponse: f.a, motsCles: f.q })),
  ...FORMES.map((f) => ({
    titre: `${f.sigle} — ${f.nom}`,
    reponse: `Associés : ${f.associes} Capital minimum : ${f.capital} Responsabilité : ${f.responsabilite} Idéal pour : ${f.ideal}`,
    lien: "/formes-juridiques",
    motsCles: `${f.sigle} ${f.nom} forme juridique capital associes ${f.sigle === "SARL" ? "sarlu" : ""} ${f.sigle === "SAS" ? "sasu" : ""}`,
  })),
  ...AUTRES_FORMES.map((a) => ({
    titre: `${a.sigle} — ${a.nom}`,
    reponse: a.texte,
    lien: "/formes-juridiques",
    motsCles: `${a.sigle} ${a.nom} forme juridique`,
  })),
  ...REGIMES.map((r) => ({
    titre: `${r.sigle} — ${r.nom}`,
    reponse: `${r.cible} Seuil : ${r.seuil} ${r.points.map((p) => `${p.titre} : ${p.texte}`).join(" ")}`,
    lien: "/impots-et-taxes#regimes",
    motsCles: `${r.sigle} ${r.nom} regime imposition chiffre affaires seuil taux`,
  })),
  ...IMPOTS_ENTREPRISES.map((i) => ({
    titre: `${i.sigle} — ${i.titre}`,
    reponse: i.texte,
    lien: "/impots-et-taxes",
    motsCles: `${i.sigle} ${i.titre} impot taux entreprise`,
  })),
  ...IMPOTS_PARTICULIERS.map((i) => ({
    titre: `${i.sigle} — ${i.titre}`,
    reponse: i.texte,
    lien: "/impots-et-taxes",
    motsCles: `${i.sigle} ${i.titre} salaire salarie impot`,
  })),
  {
    titre: "Cotisations CNPS",
    reponse: COTISATIONS_CNPS.map((c) => `${c.titre} : ${c.valeur} (${c.texte.replace(/\.$/, "").toLowerCase()})`).join(" · "),
    lien: "/impots-et-taxes",
    motsCles: "cnps cotisation retraite pension allocations familiales accident travail social",
  },
  {
    titre: "Modification de société",
    reponse: `Motifs fréquents : ${MODIFICATION_MOTIFS.map((m) => m.titre.toLowerCase()).join(", ")}.`,
    lien: "/modification-entreprise",
    motsCles: "modifier modification gerant siege capital denomination objet transfert changement",
  },
  ...PRESTATIONS_CABINET.map((p) => ({
    titre: p.titre,
    reponse: p.texte,
    lien: "/gestion",
    motsCles: `${p.titre} comptabilite gestion fne facture business plan`,
  })),
];

const VIDES = new Set(["le", "la", "les", "de", "des", "du", "un", "une", "et", "ou", "a", "au", "aux", "en", "pour", "est", "ce", "que", "qui", "quoi", "quel", "quelle", "je", "mon", "ma", "mes", "vous", "votre", "vos", "il", "on", "se", "sur", "dans", "avec", "faut", "comment", "combien", "ca", "c", "d", "l", "s", "y"]);

export function chercher(question: string): Fiche | null {
  const mots = sansAccent(question)
    .split(/\s+/)
    .filter((m) => m.length > 1 && !VIDES.has(m));
  if (mots.length === 0) return null;
  let meilleure: Fiche | null = null;
  let score = 0;
  for (const f of FICHES) {
    const base = sansAccent(`${f.titre} ${f.motsCles}`);
    const corps = sansAccent(f.reponse);
    let s = 0;
    for (const m of mots) {
      if (new RegExp(`\\b${m}`).test(base)) s += 3;
      else if (corps.includes(m)) s += 1;
    }
    if (s > score) {
      score = s;
      meilleure = f;
    }
  }
  return score >= 3 ? meilleure : null;
}

export const SUGGESTIONS = [
  "Quelles pièces pour créer une société ?",
  "Quel capital pour une SARL ?",
  "C'est quoi le régime TEE ?",
  "Quel est le taux de TVA ?",
] as const;
