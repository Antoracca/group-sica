import type { Metadata } from "next";
import Image from "next/image";
import { Block, Bullets, Card, CtaBand, PageHero, PageShell, PendingNote } from "@/components/page-shell";
import { links } from "@/lib/links";

export const metadata: Metadata = {
  title: "Qui sommes-nous ? — Entreprise de construction et d'ingénierie",
  description:
    "SICA CONSTRUCTION, pôle construction et ingénierie de GROUPE SICA – SARLU : vision, mission, valeurs, organisation, moyens humains et matériels, implantations à Abidjan et Yamoussoukro.",
  alternates: { canonical: "/qui-sommes-nous" },
};

const VALEURS = [
  { t: "Engagement", d: "Être présents aux côtés du client à chaque étape du projet." },
  { t: "Dynamisme", d: "Réactivité et écoute dans le traitement des demandes." },
  { t: "Professionnalisme", d: "Des équipes qualifiées, encadrées par le bureau d'études." },
  { t: "Rigueur", d: "Des points de contrôle définis avant chaque étape clé du chantier." },
  { t: "Innovation", d: "Des solutions constructives comme le géobéton / BTCS." },
  { t: "Responsabilité", d: "Des validations clairement attribuées entre Études et Technique." },
];

const ORGANISATION = [
  { t: "Direction", d: "Direction générale du GROUPE SICA, dirigée par M. Ngoran Ivan." },
  { t: "Service Technique", d: "Fonction Études (bureau d'études) et fonction Production (équipes terrain)." },
  { t: "Service Commercial", d: "Accueil des demandes, devis et suivi de la relation client." },
  { t: "Service Administratif", d: "Achats, approvisionnements et gestion du personnel." },
];

const MOYENS_MATERIELS = [
  "Véhicules et camions",
  "Chargeuses",
  "Machines à briques (géobéton / BTCS)",
  "Bétonnières et vibreurs",
  "Équipements d'essai de sol : pressiomètre, pénétromètre",
  "Outillage de chantier et matériel informatique du bureau d'études",
];

const ENGAGEMENTS = [
  "Une estimation indicative toujours distinguée du devis officiel, avec ses hypothèses et sa date de validité.",
  "Des quantités et hypothèses vérifiées par le service Études avant toute validation de devis.",
  "Un interlocuteur identifié et un compte rendu daté à chaque étape du chantier.",
  "Un accès à l'espace client E-SICA pour consulter les documents de votre projet.",
  "Une réception des travaux réalisée avec le client, réserves comprises.",
];

export default function QuiSommesNousPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Qui sommes-nous ?"
        title={
          <>
            Une entreprise structurée de <span className="text-brand-amber">construction et d&apos;ingénierie.</span>
          </>
        }
        intro="SICA CONSTRUCTION accompagne les particuliers, entreprises et investisseurs de la conception aux travaux de finition, avec une exigence constante de qualité, de maîtrise technique et de suivi."
        image="/media/projects/songon-abidjan/WhatsApp Image 2026-05-11 at 19.34.04.jpeg"
      />

      <Block
        eyebrow="Présentation"
        title="GROUPE SICA – SARLU et SICA CONSTRUCTION"
        tone="white"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="GROUPE SICA – SARLU">
            Société ivoirienne immatriculée à Abidjan en 2020 (RCCM CI-ABJ-03-2020-B13-17592 · CC 2054314X · CNPS
            378047). Le Groupe réunit deux pôles distincts : SICA CONSTRUCTION et SICA ASSISTANCE.{" "}
            <a href={links.groupe.base} className="font-semibold text-brand-royal underline-offset-4 hover:underline">
              Découvrir le Groupe
            </a>
          </Card>
          <Card title="SICA CONSTRUCTION">
            Le pôle construction et ingénierie du Groupe : études et conception, réalisation des ouvrages, suivi et
            contrôle des chantiers. Les activités d&apos;assistance aux entreprises relèvent de{" "}
            <a href={links.assistance.base} className="font-semibold text-brand-royal underline-offset-4 hover:underline">
              SICA ASSISTANCE
            </a>
            .
          </Card>
        </div>
      </Block>

      <Block eyebrow="Historique" title="Historique et évolution">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card title="2020">Immatriculation de GROUPE SICA au registre du commerce d&apos;Abidjan.</Card>
          <Card title="2023">M. Ngoran Ivan, dirigeant du Groupe, distingué Meilleur jeune entrepreneur ivoirien.</Card>
          <Card title="Aujourd'hui">
            Deux implantations, Abidjan et Yamoussoukro, et des équipes mobiles sur le territoire ivoirien.
          </Card>
        </div>
        <PendingNote>Les autres dates de l&apos;historique seront publiées après confirmation par la Direction.</PendingNote>
      </Block>

      <Block eyebrow="Vision, mission et valeurs" title="Ce qui guide nos chantiers" tone="white">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="Vision">
            Devenir une référence en Côte d&apos;Ivoire dans l&apos;assistance aux entreprises et la construction moderne.
          </Card>
          <Card title="Mission">
            Accompagner les particuliers et les entreprises avec professionnalisme dans leurs projets et leurs réalisations
            immobilières.
          </Card>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VALEURS.map((v) => (
            <Card key={v.t} title={v.t}>
              {v.d}
            </Card>
          ))}
        </div>
      </Block>

      <Block eyebrow="Organisation" title="Organisation et principaux services">
        <div className="grid gap-4 sm:grid-cols-2">
          {ORGANISATION.map((o) => (
            <Card key={o.t} title={o.t}>
              {o.d}
            </Card>
          ))}
        </div>
      </Block>

      <Block eyebrow="Moyens" title="Moyens humains, compétences et moyens matériels" tone="white">
        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-6">
            <Card title="Moyens humains">
              Cinq équipes terrain (Teams n°1 à n°5) et des techniciens supérieurs au bureau d&apos;études : conception,
              structure, métrés, conduite de travaux, électricité, plomberie et finitions.
            </Card>
            <Card title="Moyens matériels">
              <Bullets items={MOYENS_MATERIELS} />
            </Card>
            <PendingNote>
              Profils et photos de l&apos;équipe publiés uniquement avec l&apos;accord des personnes concernées.
            </PendingNote>
          </div>
          <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200/80 bg-mist">
            <Image
              src="/EQUIPE2.jpeg"
              alt="Équipe SICA Construction sur chantier"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </figure>
        </div>
      </Block>

      <Block eyebrow="Implantations" title="Implantations et zones d'intervention">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card title="Agence d'Abidjan">Cocody Centre / PMI.</Card>
          <Card title="Bureau de Yamoussoukro">Morofé / 24 Ampoules.</Card>
          <Card title="Zones d'intervention">
            Équipes mobiles en Côte d&apos;Ivoire : Abidjan, Bingerville, Songon, Jacqueville, Agboville, Soubré…
          </Card>
        </div>
        <p className="mt-6">
          <a href="/agences" className="text-sm font-semibold text-brand-royal underline-offset-4 hover:underline">
            Voir nos agences, horaires et itinéraires
          </a>
        </p>
      </Block>

      <Block eyebrow="Engagements" title="Nos engagements envers les clients" tone="white">
        <Card title="Ce que nous nous engageons à faire">
          <Bullets items={ENGAGEMENTS} />
        </Card>
      </Block>

      <CtaBand />
    </PageShell>
  );
}
