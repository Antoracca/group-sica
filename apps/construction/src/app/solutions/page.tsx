import type { Metadata } from "next";
import { Block, Bullets, Card, CtaBand, PageHero, PageShell, PendingNote } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Nos services et solutions constructives — Villa, duplex, géobéton",
  description:
    "Construction de villa basse, villa duplex et immeubles, case ronde et bungalow. Solutions constructives : brique ordinaire, géobéton / BTCS, construction métallique. Méthode de projet en 7 étapes.",
  alternates: { canonical: "/solutions" },
};

const OUVRAGES = [
  { t: "Villa basse", d: "Villas de plain-pied, de 2 à 4 pièces et plus, avec ou sans sous-sol." },
  { t: "Villa duplex et immeubles", d: "Ouvrages à étages : duplex, triplex et immeubles R+1 et au-delà, sur étude de structure." },
  { t: "Case ronde et bungalow", d: "Ouvrages de loisirs ou d'accueil, en maçonnerie ou en géobéton." },
  { t: "Extension et réhabilitation", d: "Agrandissement d'un bâtiment existant, après diagnostic de la structure." },
];

const SOLUTIONS = [
  {
    t: "Brique ordinaire",
    d: "Maçonnerie en agglos / parpaings et béton armé, la solution courante pour villas et immeubles.",
  },
  {
    t: "Géobéton / BTCS",
    d: "Brique de terre comprimée stabilisée, produite sur nos machines à briques à partir d'une terre sélectionnée et d'un dosage de ciment contrôlé.",
  },
  {
    t: "Construction métallique",
    d: "Charpentes, hangars, combles et structures métalliques, de l'étude au montage.",
  },
];

const SERVICES = [
  "Électricité et plomberie",
  "Terrassement et assainissement",
  "Location d'engins BTP et livraison",
  "Matériaux de construction et quincaillerie",
];

const ETAPES = [
  { t: "Visite du terrain", d: "Avec l'extrait topographique du terrain." },
  { t: "Étude de sol", d: "Prestation facturée." },
  { t: "Conception et DQE", d: "Conception architecturale, ingénierie et devis quantitatif estimatif (prestation facturée)." },
  { t: "Validation du DQE", d: "Validation du DQE et du protocole avec le bureau d'études." },
  { t: "Permis de construire", d: "Permis de construire et certificat d'urbanisme (prestation facturée)." },
  { t: "Paiements", d: "Par chèque, espèces ou virement, selon l'échéancier convenu." },
  { t: "Démarrage du projet", d: "Ouverture du chantier et suivi par les équipes SICA." },
];

export default function SolutionsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Nos services · Solutions constructives"
        title={
          <>
            Le bon ouvrage, <span className="text-brand-amber">la bonne solution constructive.</span>
          </>
        }
        intro="Villas, duplex, immeubles et ouvrages spécifiques, en brique ordinaire, en géobéton / BTCS ou en structure métallique."
        image="/media/projects/dabre/dabre-2.jpeg"
      >
        <a
          href="/devis"
          className="inline-flex h-12 items-center justify-center rounded-[10px] bg-brand-amber px-7 text-sm font-semibold text-ink transition-colors hover:bg-brand-amber-600"
        >
          Demander un devis
        </a>
      </PageHero>

      <Block eyebrow="Types d'ouvrage" title="Ce que nous construisons" tone="white">
        <div className="grid gap-4 sm:grid-cols-2">
          {OUVRAGES.map((o) => (
            <Card key={o.t} title={o.t}>
              {o.d}
            </Card>
          ))}
        </div>
      </Block>

      <Block eyebrow="Solutions constructives" title="Trois modes constructifs">
        <div className="grid gap-4 lg:grid-cols-3">
          {SOLUTIONS.map((s) => (
            <Card key={s.t} title={s.t}>
              {s.d}
            </Card>
          ))}
        </div>
        <div className="mt-6">
          <Card title="Services associés">
            <div className="grid gap-x-8 sm:grid-cols-2">
              <Bullets items={SERVICES} />
            </div>
          </Card>
        </div>
      </Block>

      <Block
        eyebrow="Méthode"
        title="Votre projet en 7 étapes"
        intro="Le parcours type d'un projet de construction avec SICA CONSTRUCTION."
        tone="white"
      >
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ETAPES.map((e, i) => (
            <li key={e.t} className="rounded-2xl border border-slate-200/80 bg-paper p-6">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-brand-amber">
                Étape {i + 1}
              </span>
              <p className="mt-2 font-display text-lg font-semibold text-ink">{e.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate">{e.d}</p>
            </li>
          ))}
        </ol>
        <PendingNote>
          Toute estimation en ligne est indicative. Seul le devis officiel, établi après vérification par le service
          Études et validé par un responsable habilité, engage SICA CONSTRUCTION.
        </PendingNote>
      </Block>

      <CtaBand />
    </PageShell>
  );
}
