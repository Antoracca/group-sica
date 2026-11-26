import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Mentions légales — Groupe SICA",
  description: "Mentions légales obligatoires du Groupe SICA (SARLU ivoirienne).",
};

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      title="Mentions légales"
      intro="Conformément à la législation ivoirienne en vigueur, vous trouverez ci-dessous les mentions obligatoires relatives à l'éditeur du site www.groupe-sica.com et à ses pôles."
      updatedAt="15 mai 2026"
      sections={[
        {
          heading: "Éditeur du site",
          body: (
            <>
              <p>
                <strong>GROUPE SICA</strong> — Société à responsabilité limitée unipersonnelle (SARLU) de droit ivoirien.
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>RCCM : CI-ABJ-03-2020-B13-17592</li>
                <li>Capital social : 2 500 000 FCFA</li>
                <li>Compte contribuable : 2054314X</li>
                <li>CNPS employeur : 378047</li>
                <li>Certificat IDU : CI20200014890K</li>
                <li>Régime fiscal : TEE</li>
                <li>Directeur de la publication : Ngoran Ivan</li>
              </ul>
            </>
          ),
        },
        {
          heading: "Siège social",
          body: (
            <>
              <p>
                Cocody Centre / PMI —
                Abidjan, Côte d'Ivoire.
              </p>
              <p>
                Boîtes postales : 2100 BP 05 Abidjan / 01 BP 1203 Abidjan.
              </p>
              <p>
                Succursale : Morofé / 24 Ampoules (rond-point route de Daloa) — Yamoussoukro.
              </p>
            </>
          ),
        },
        {
          heading: "Contact",
          body: (
            <>
              <p>
                Email : <a href="mailto:groupesica@gmail.com" className="text-[#0633B0] underline hover:text-brand-amber">groupesica@gmail.com</a>
              </p>
              <p>
                Téléphones : +225 07 09 88 32 93 · +225 27 22 24 74 45 · +225 01 02 44 28 94
              </p>
            </>
          ),
        },
        {
          heading: "Hébergement",
          body: (
            <p>
              Le site est hébergé par Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723,
              États-Unis, accessible via <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[#0633B0] underline hover:text-brand-amber">vercel.com</a>.
              Les données utilisateurs sont hébergées par Supabase Inc., conforme au RGPD européen
              et applicable en équivalence ARTCI Côte d'Ivoire.
            </p>
          ),
        },
        {
          heading: "Propriété intellectuelle",
          body: (
            <p>
              L'ensemble des éléments du site www.groupe-sica.com — textes, images, logos, charte
              graphique, code source — sont la propriété exclusive du Groupe SICA, sauf mention
              contraire explicite. Toute reproduction, distribution ou modification sans
              autorisation écrite préalable est interdite.
            </p>
          ),
        },
        {
          heading: "Litiges",
          body: (
            <p>
              Tout litige relatif à l'utilisation du site est soumis au droit ivoirien. Les
              tribunaux compétents en cas de désaccord sont ceux du ressort du siège social,
              à Abidjan.
            </p>
          ),
        },
      ]}
    />
  );
}
