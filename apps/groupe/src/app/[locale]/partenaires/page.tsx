import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { Container } from "@sica/ui";
import { ArrowRight, Handshake, Award, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Partenaires — Réseau du Groupe SICA",
  description:
    "Banque, fournisseurs matériaux, bureaux d'études, institutions : découvrez le réseau de partenaires du Groupe SICA en Côte d'Ivoire.",
};

interface Partenaire {
  nom: string;
  categorie: "Bancaire" | "Matériaux" | "Études techniques" | "Institution" | "Cabinet conseil";
  description: string;
  depuis?: string;
}

const PARTENAIRES: Partenaire[] = [
  {
    nom: "CEPICI",
    categorie: "Institution",
    description:
      "Centre de Promotion des Investissements en Côte d'Ivoire. Guichet unique pour la création d'entreprise et l'accompagnement des investisseurs.",
  },
  {
    nom: "DGI Côte d'Ivoire",
    categorie: "Institution",
    description:
      "Direction Générale des Impôts. Immatriculation fiscale, déclarations et suivi des obligations fiscales de nos clients.",
  },
  {
    nom: "CNPS",
    categorie: "Institution",
    description:
      "Caisse Nationale de Prévoyance Sociale. Immatriculation employeur, déclarations sociales et couverture des travailleurs.",
  },
  {
    nom: "FDFP",
    categorie: "Institution",
    description:
      "Fonds de Développement de la Formation Professionnelle. Financement et appui à la formation des équipes.",
  },
  {
    nom: "Guichet Unique du Permis de Construire",
    categorie: "Institution",
    description:
      "Guichet Unique du Permis de Construire et du Contrôle Urbain. Autorisations d'urbanisme et conformité des constructions.",
  },
  {
    nom: "Cabinet d'Experts-Comptables",
    categorie: "Cabinet conseil",
    description:
      "Cabinet d'Experts-Comptables de Côte d'Ivoire. Tenue, révision et certification des comptes de nos clients.",
  },
  {
    nom: "Cabinet d'Architecte",
    categorie: "Cabinet conseil",
    description:
      "Cabinet d'Architecte de Côte d'Ivoire. Conception architecturale, plans et suivi technique des projets.",
  },
];

const CATEGORIE_COLORS: Record<string, { bg: string; text: string }> = {
  Bancaire: { bg: "rgba(31,138,86,0.12)", text: "#0B6E45" },
  Matériaux: { bg: "rgba(6,51,176,0.10)", text: "#0633B0" },
  "Études techniques": { bg: "rgba(168,78,0,0.12)", text: "#A84E00" },
  Institution: { bg: "rgba(2,27,90,0.10)", text: "#021B5A" },
  "Cabinet conseil": { bg: "rgba(247,127,0,0.12)", text: "#A84E00" },
};

export default function PartenairesPage() {
  return (
    <PageShell>
      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden pt-32 pb-16 text-white sm:pt-40 sm:pb-20 lg:pt-44"
        style={{ background: "linear-gradient(155deg, #011138 0%, #0633B0 60%, #021B5A 100%)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><g stroke='white' stroke-width='0.5' fill='none'><path d='M48 0H0V48'/></g></svg>\")",
            backgroundSize: "48px 48px",
          }}
        />
        <Container className="relative">
          <p className="mb-4 text-[0.7rem] font-bold uppercase tracking-[0.22em]" style={{ color: "#F79832" }}>
            Partenaires SICA
          </p>
          <h1 className="font-display max-w-3xl text-balance text-[2.25rem] font-bold leading-tight tracking-tight sm:text-[3rem] lg:text-[3.75rem]">
            Un réseau, un engagement.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/65 sm:text-lg">
            Banque, fournisseurs, bureaux d'études, institutions. Chaque chantier et chaque dossier
            s'appuie sur un écosystème éprouvé en Côte d'Ivoire.
          </p>
        </Container>
      </section>

      {/* ── CHIFFRES ── */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-10 sm:py-14">
        <Container>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { Icon: Handshake, value: "2", label: "Pôles : Construction et Assistance" },
              { Icon: Award, value: "10 ans", label: "Ancienneté moyenne" },
              { Icon: Building2, value: "3", label: "Régions couvertes" },
              { Icon: Handshake, value: "CI", label: "Équipes mobiles sur tout le territoire" },
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <s.Icon size={20} strokeWidth={1.8} style={{ color: "#0633B0" }} className="mt-1 shrink-0" />
                <div>
                  <p className="font-display text-[1.75rem] font-bold leading-tight text-[#021B5A]">
                    {s.value}
                  </p>
                  <p className="text-[0.75rem] uppercase tracking-wider text-neutral-500">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── LISTING PARTENAIRES ── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-brand-amber">
              Notre écosystème
            </p>
            <h2 className="font-display text-balance text-[1.75rem] font-bold leading-tight tracking-tight text-[#021B5A] sm:text-[2.5rem]">
              Avec qui nous travaillons au quotidien.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PARTENAIRES.map((p, i) => (
              <div
                key={i}
                className="relative flex flex-col rounded-2xl border bg-white p-6 transition-shadow hover:shadow-md"
                style={{ borderColor: "#E4E7F0" }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className="inline-flex rounded-full px-2.5 py-0.5 text-[0.625rem] font-bold uppercase tracking-[0.18em]"
                    style={{
                      background: CATEGORIE_COLORS[p.categorie]?.bg,
                      color: CATEGORIE_COLORS[p.categorie]?.text,
                    }}
                  >
                    {p.categorie}
                  </span>
                  {p.depuis && (
                    <span className="text-[0.7rem] text-neutral-400">Depuis {p.depuis}</span>
                  )}
                </div>
                <h3 className="font-display text-[1.125rem] font-bold leading-tight text-[#021B5A]">
                  {p.nom}
                </h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-neutral-600">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── DEVENIR PARTENAIRE ── */}
      <section
        className="relative overflow-hidden py-16 text-white sm:py-20"
        style={{ background: "linear-gradient(160deg, #021B5A 0%, #0633B0 60%, #011138 100%)" }}
      >
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.22em]" style={{ color: "#F79832" }}>
                Vous êtes un partenaire potentiel ?
              </p>
              <h2 className="font-display text-balance text-[1.75rem] font-bold leading-tight tracking-tight sm:text-[2.25rem]">
                Rejoindre le réseau des partenaires SICA.
              </h2>
              <p className="mt-4 text-pretty text-white/65">
                Fournisseur de matériaux, bureau d'études, cabinet juridique ou institution :
                écrivez-nous pour discuter d'une collaboration.
              </p>
            </div>
            <div className="flex justify-end">
              <a
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 text-sm font-semibold text-white transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #F77F00 0%, #D86B00 100%)",
                  boxShadow: "0 4px 22px rgba(247,127,0,0.32)",
                }}
              >
                Discuter d'un partenariat
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
