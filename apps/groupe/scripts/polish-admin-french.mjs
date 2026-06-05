import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = join(process.cwd(), "src", "app", "sica-panel-gestion", "dashboard");
const extensions = new Set([".ts", ".tsx"]);

// Keep replacements precise. Avoid short fragments such as "Copie" because
// they can accidentally touch identifiers like setCopied.
const replacements = [
  ["setCopiÃ©d", "setCopied"],
  ["CrÃ©er", "Créer"],
  ["CrÃ©ez", "Créez"],
  ["PrÃ©nom", "Prénom"],
  ["TÃ©lÃ©phone", "Téléphone"],
  ["GÃ©nÃ©rer", "Générer"],
  ["PrÃ©-remplir", "Pré-remplir"],
  ["CrÃ©ation", "Création"],
  ["DÃ©connexion", "Déconnexion"],
  ["Ã€ connecter", "À connecter"],
  ["PrÃ©vu", "Prévu"],
  ["PrÃ©vus", "Prévus"],
  ["MaturitÃ©", "Maturité"],
  ["RÃ©partition", "Répartition"],
  ["RÃ©fÃ©rence", "Référence"],
  ["SignÃ©s", "Signés"],
  ["TraitÃ©es", "Traitées"],
  ["clÃ´turÃ©es", "clôturées"],
  ["piÃ¨ces", "pièces"],
  ["engagÃ©s", "engagés"],
  ["opÃ©rationnelle", "opérationnelle"],
  ["opÃ©rations", "opérations"],
  ["OpÃ©rations", "Opérations"],
  ["enregistrÃ©", "enregistré"],
  ["connectÃ©", "connecté"],
  ["conseillÃ©", "conseillé"],
  ["premiÃ¨re", "première"],
  ["systÃ¨me", "système"],
  ["donnÃ©es", "données"],
  ["dÃ©finir", "définir"],
  ["dÃ©jÃ ", "déjà"],
  ["Ã ", "à"],
  ["Ã©", "é"],
  ["Ã¨", "è"],
  ["Ãª", "ê"],
  ["Ã´", "ô"],
  ["Ã¹", "ù"],
  ["Ã§", "ç"],
  ["Â·", "·"],
  ["Centre de controle", "Centre de contrôle"],
  ["Etat systeme", "État système"],
  ["Operations", "Opérations"],
  ["A connecter", "À connecter"],
  ["Prevu", "Prévu"],
  ["Prevus", "Prévus"],
  ["A activer", "À activer"],
  ["A traiter", "À traiter"],
  ["A signer", "À signer"],
  ["A finaliser", "À finaliser"],
  ["a gauche", "à gauche"],
  ["a brancher", "à brancher"],
  ["a definir", "à définir"],
  ["a cadrer", "à cadrer"],
  ["a qualifier", "à qualifier"],
  ["Répartition par pole", "Répartition par pôle"],
  ["les poles", "les pôles"],
  ["pole conseil", "pôle conseil"],
  ["CrÃ©ation...", "Création..."],
  ["CopiÃ©", "Copié"],
  ["CopiÃ©r", "Copier"],
];

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) return listFiles(full);
      if (extensions.has(entry.name.slice(entry.name.lastIndexOf(".")))) return [full];
      return [];
    }),
  );
  return files.flat();
}

let changed = 0;
for (const file of await listFiles(root)) {
  let content = await readFile(file, "utf8");
  const before = content;
  for (const [from, to] of replacements) {
    content = content.split(from).join(to);
  }
  if (content !== before) {
    await writeFile(file, content, "utf8");
    changed += 1;
  }
}

console.log(`Textes admin corrigés dans ${changed} fichier(s).`);
