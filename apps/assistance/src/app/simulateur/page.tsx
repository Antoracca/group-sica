import type { Metadata } from "next";
import { Container } from "@sica/ui";
import { AssistanceHeader } from "@/components/assistance-header";
import { FooterAssistance } from "@/components/footer-assistance";
import { PageHero } from "@/components/page-hero";
import { SimulateurWizard } from "./simulateur-wizard";

export const metadata: Metadata = {
  title: "Simulateur de création d'entreprise",
  description:
    "Estimez votre création d'entreprise en Côte d'Ivoire : forme juridique, secteur, formalités et pièces à prévoir. SICA Assistance vous accompagne.",
};

export default function SimulateurPage() {
  return (
    <>
      <AssistanceHeader forceScrolled />
      <main id="main-content">
        <PageHero
          eyebrow="Simulateur de création"
          title="Estimez votre création d'entreprise."
          intro="Quatre étapes pour cadrer votre projet. Vous obtenez les formalités et les pièces à prévoir, puis nous vous communiquons une estimation après un court échange."
        />

        <section className="bg-background pb-20 sm:pb-24 lg:pb-28">
          <Container>
            <SimulateurWizard />
          </Container>
        </section>
      </main>
      <FooterAssistance />
    </>
  );
}
