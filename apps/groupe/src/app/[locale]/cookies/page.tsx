import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Politique cookies — Groupe SICA",
  description: "Information sur l'utilisation des cookies par les sites du Groupe SICA.",
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Politique cookies"
      intro="Le Groupe SICA utilise un nombre limité de cookies, exclusivement à des fins techniques et de mesure d'audience anonymisée. Cette page détaille les cookies utilisés et vos possibilités de paramétrage."
      updatedAt="15 mai 2026"
      sections={[
        {
          heading: "Qu'est-ce qu'un cookie ?",
          body: (
            <p>
              Un cookie est un petit fichier texte déposé par un site web sur votre appareil
              (ordinateur, smartphone, tablette) lors de la navigation. Il permet au site de
              mémoriser certaines informations utiles à votre expérience ou à des fins statistiques.
            </p>
          ),
        },
        {
          heading: "Cookies utilisés",
          body: (
            <>
              <p>Sur les sites du Groupe SICA, nous utilisons exclusivement les cookies suivants :</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Cookies essentiels</strong> — strictement nécessaires au fonctionnement
                  du site (gestion de session, préférences de langue, sécurité). Aucun consentement
                  requis.
                </li>
                <li>
                  <strong>Cookies de mesure d'audience</strong> — Plausible Analytics, conforme RGPD.
                  Mesure anonymisée du trafic, sans suivi inter-sites ni profilage. Données agrégées
                  uniquement.
                </li>
              </ul>
              <p>
                Nous n'utilisons <strong>aucun cookie publicitaire ni de profilage</strong>. Aucune
                de vos données n'est cédée à des tiers à des fins commerciales.
              </p>
            </>
          ),
        },
        {
          heading: "Vos choix",
          body: (
            <p>
              Lors de votre première visite, un bandeau vous permet d'accepter ou refuser les
              cookies non essentiels. Vous pouvez modifier ce choix à tout moment via le pied de
              page de chaque site, lien « Préférences cookies ». Vous pouvez également bloquer
              tous les cookies via les paramètres de votre navigateur — certaines fonctionnalités
              peuvent alors être altérées.
            </p>
          ),
        },
        {
          heading: "Durée de conservation",
          body: (
            <p>
              Les cookies essentiels sont supprimés à la fermeture de votre navigateur. Les cookies
              de mesure d'audience ont une durée de vie maximale de 13 mois conformément aux
              recommandations ARTCI.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Pour toute question relative à cette politique cookies, écrivez à{" "}
              <a href="mailto:secretariat@groupe-sica.com" className="text-[#1E2F8A] underline hover:text-brand-amber">secretariat@groupe-sica.com</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
