import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Groupe SICA",
  description: "Politique de confidentialité et traitement des données personnelles du Groupe SICA.",
};

export default function ConfidentialitePage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      intro="Le Groupe SICA accorde une importance fondamentale à la protection de vos données personnelles. Cette politique décrit comment vos informations sont collectées, utilisées et protégées sur l'ensemble de nos sites web."
      updatedAt="15 mai 2026"
      sections={[
        {
          heading: "Responsable du traitement",
          body: (
            <p>
              Le responsable du traitement des données personnelles collectées sur groupesica.ci est
              le <strong>Groupe SICA</strong> (RCCM CI-ABJ-03-2020-B13-17592), représenté par son
              directeur Ngoran Ivan. Toute demande relative à vos données peut être adressée à{" "}
              <a href="mailto:groupesica@gmail.com" className="text-[#1E2F8A] underline hover:text-brand-amber">groupesica@gmail.com</a>.
            </p>
          ),
        },
        {
          heading: "Données collectées",
          body: (
            <>
              <p>Nous collectons les données suivantes uniquement avec votre consentement explicite :</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Identité (nom, prénom)</li>
                <li>Coordonnées (email, téléphone)</li>
                <li>Contenu de vos messages</li>
                <li>Données techniques anonymisées (navigateur, appareil, pages visitées)</li>
              </ul>
              <p>
                Nous ne collectons aucune donnée sensible (origine ethnique, santé, opinions politiques,
                données bancaires) via les formulaires publics.
              </p>
            </>
          ),
        },
        {
          heading: "Finalités",
          body: (
            <>
              <p>Vos données sont utilisées exclusivement pour :</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Répondre à vos demandes de contact et devis</li>
                <li>Gérer votre dossier client (chantiers, comptabilité)</li>
                <li>Vous adresser nos actualités si vous y avez consenti</li>
                <li>Améliorer l'expérience sur nos sites (mesure d'audience anonymisée)</li>
              </ul>
            </>
          ),
        },
        {
          heading: "Conservation",
          body: (
            <p>
              Les données de contact sont conservées 3 ans après le dernier échange. Les dossiers
              clients (devis, factures) sont conservés 10 ans en application des obligations
              comptables et fiscales ivoiriennes. Les transcripts d'échanges avec l'assistant IA
              sont anonymisés au-delà de 30 jours.
            </p>
          ),
        },
        {
          heading: "Vos droits",
          body: (
            <>
              <p>
                Conformément à la loi ivoirienne sur la protection des données personnelles et
                l'ARTCI, vous disposez à tout moment des droits suivants :
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Droit d'accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement</li>
                <li>Droit d'opposition au traitement</li>
                <li>Droit à la portabilité</li>
              </ul>
              <p>
                Pour exercer ces droits, écrivez à{" "}
                <a href="mailto:groupesica@gmail.com" className="text-[#1E2F8A] underline hover:text-brand-amber">groupesica@gmail.com</a>.
                Nous répondons sous 30 jours.
              </p>
            </>
          ),
        },
        {
          heading: "Sécurité",
          body: (
            <p>
              Vos données sont stockées sur des serveurs sécurisés (Supabase / Vercel) avec
              chiffrement TLS 1.3 en transit et AES-256 au repos. Les accès aux dossiers clients
              sont strictement réservés aux équipes habilitées via un système RBAC. Un audit log
              immuable trace toutes les modifications sensibles (signatures, accès dossiers).
            </p>
          ),
        },
        {
          heading: "Sous-traitants",
          body: (
            <p>
              Nous faisons appel aux sous-traitants suivants, tous conformes RGPD/ARTCI : Vercel
              (hébergement), Supabase (base de données et stockage), Resend (emails transactionnels),
              Anthropic (assistant IA Claude — uniquement transcripts redactés), MapTiler (cartes).
            </p>
          ),
        },
      ]}
    />
  );
}
