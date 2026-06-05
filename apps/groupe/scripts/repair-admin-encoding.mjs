import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = join(process.cwd(), "src", "app", "sica-panel-gestion", "dashboard");
const extensions = new Set([".ts", ".tsx"]);

const replacements = [
  ["setCopiÃ©d", "setCopied"],
  ["CopiÃ©r", "Copier"],
  ["copiÃ©d", "copied"],
  ["CrÃ©er", "Créer"],
  ["CrÃ©ez", "Créez"],
  ["crÃ©Ã©", "créé"],
  ["crÃ©Ã©s", "créés"],
  ["crÃ©ation", "création"],
  ["CrÃ©ation", "Création"],
  ["PrÃ©nom", "Prénom"],
  ["TÃ©lÃ©phone", "Téléphone"],
  ["GÃ©nÃ©rer", "Générer"],
  ["PrÃ©-remplir", "Pré-remplir"],
  ["caractÃ¨res", "caractères"],
  ["signÃ©", "signé"],
  ["premiÃ¨re", "première"],
  ["Ã ", "à"],
  ["Ã€", "À"],
  ["Ã‰", "É"],
  ["Ã©", "é"],
  ["Ã¨", "è"],
  ["Ãª", "ê"],
  ["Ã´", "ô"],
  ["Ã¹", "ù"],
  ["Ã§", "ç"],
  ["Â·", "·"],
  ["DÃ©connexion", "Déconnexion"],
  ["connectÃ©", "connecté"],
  ["conseillÃ©", "conseillé"],
  ["systÃ¨me", "système"],
  ["RÃ©partition", "Répartition"],
  ["MaturitÃ©", "Maturité"],
  ["PrÃ©vu", "Prévu"],
  ["PrÃ©vus", "Prévus"],
  ["dÃ©jÃ ", "déjà"],
  ["piÃ¨ces", "pièces"],
  ["SignÃ©s", "Signés"],
  ["engagÃ©s", "engagés"],
  ["RÃ©fÃ©rence", "Référence"],
  ["dÃ©finir", "définir"],
  ["TraitÃ©es", "Traitées"],
  ["clÃ´turÃ©es", "clôturées"],
  ["liÃ©e", "liée"],
  ["opÃ©rations", "opérations"],
  ["OpÃ©rations", "Opérations"],
  ["opÃ©rationnelle", "opérationnelle"],
  ["oÃ¹", "où"],
  ["enregistrÃ©", "enregistré"],
  ["supervisÃ©s", "supervisés"],
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

console.log(`Encodage admin réparé dans ${changed} fichier(s).`);
