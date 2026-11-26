import type { Metadata } from "next";
import { Block, Bullets, Card, CtaBand, PageHero, PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Nos expertises — Études, réalisation, suivi de chantier",
  description:
    "Les trois domaines d'expertise de SICA CONSTRUCTION : études et conception (étude de sol, étude de structure, plans, métrés, devis), technique et réalisation (villas, immeubles, gros œuvre, géobéton), suivi et contrôle.",
  alternates: { canonical: "/expertises" },
};

const DOMAINES = [
  {
    id: "etudes",
    lettre: "A",
    titre: "Études & conception",
    fonction: "Fonction Études — bureau d'études",
    intro:
      "Le bureau d'études définit le projet avant tout engagement : connaissance du sol, conception, dimensionnement et chiffrage.",
    items: [
      "Étude de sol",
      "Conception architecturale",
      "Études de structure",
      "Plans techniques",
      "Métrés",
      "Estimation et devis",
    ],
    validation:
      "Les plans, quantités et hypothèses sont validés par le responsable Études avant l'émission d'un devis officiel.",
    cta: { label: "Demander une étude", href: "/contact?objet=etudes" },
  },
  {
    id: "technique",
    lettre: "B",
    titre: "Technique & réalisation",
    fonction: "Fonction Technique — équipes terrain",
    intro:
      "Les équipes terrain réalisent les ouvrages à partir des plans validés, de la préparation du chantier jusqu'aux finitions.",
    items: [
      "Préparation de chantier",
      "Villas et immeubles",
      "Gros œuvre",
      "Second œuvre",
      "Électricité",
      "Plomberie",
      "Finitions",
      "Géobéton / BTCS",
    ],
    validation:
      "L'exécution suit les plans validés par les Études ; toute modification technique est soumise au responsable Technique.",
    cta: { label: "Demander un devis travaux", href: "/devis" },
  },
  {
    id: "suivi",
    lettre: "C",
    titre: "Suivi, contrôle & accompagnement",
    fonction: "Suivi de chantier — de l'ouverture à la réception",
    intro:
      "Le suivi accompagne le client pendant toute la durée du chantier et jusqu'à la réception des travaux.",
    items: [
      "Suivi de chantier",
      "Contrôle qualité",
      "Coordination",
      "Conseil technique",
      "Réception",
      "Accompagnement",
    ],
    validation:
      "Chaque contrôle est daté et rattaché à un responsable ; la réception est réalisée avec le client, réserves comprises.",
    cta: { label: "Parler à un conseiller", href: "tel:+2250709883293" },
  },
] as const;

export default function ExpertisesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Nos expertises"
        title={
          <>
            Trois domaines, <span className="text-brand-amber">des responsabilités claires.</span>
          </>
        }
        intro="Études & conception, Technique & réalisation, Suivi, contrôle & accompagnement. La fonction Études et la fonction Technique sont distinctes, chacune avec ses validations."
        image="/media/projects/guessiguie-agboville/WhatsApp Image 2026-05-12 at 06.49.18 (3).jpeg"
      >
        {DOMAINES.map((d) => (
          <a
            key={d.id}
            href={`#${d.id}`}
            className="inline-flex h-11 items-center justify-center rounded-full bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
          >
            {d.lettre}. {d.titre}
          </a>
        ))}
      </PageHero>

      {DOMAINES.map((d, i) => (
        <Block
          key={d.id}
          id={d.id}
          eyebrow={`Domaine ${d.lettre} · ${d.fonction}`}
          title={`${d.lettre}. ${d.titre}`}
          intro={d.intro}
          tone={i % 2 === 0 ? "white" : "paper"}
        >
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <Card title="Prestations">
              <div className="grid gap-x-8 sm:grid-cols-2">
                <Bullets items={d.items} />
              </div>
            </Card>
            <Card title="Validation">
              <p>{d.validation}</p>
              <a
                href={d.cta.href}
                className="mt-6 inline-flex h-11 items-center justify-center rounded-[10px] bg-brand-amber px-6 text-sm font-semibold text-ink transition-colors hover:bg-brand-amber-600"
              >
                {d.cta.label}
              </a>
            </Card>
          </div>
        </Block>
      ))}

      <CtaBand />
    </PageShell>
  );
}
