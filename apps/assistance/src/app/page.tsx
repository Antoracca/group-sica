import { StickyCtaMobile } from "@sica/ui";
import { AssistanceHeader } from "@/components/assistance-header";
import { FooterAssistance } from "@/components/footer-assistance";
import { AssistanceHero } from "./_sections/hero";
import { TrustStrip } from "./_sections/trust-strip";
import { ServicesSection } from "./_sections/services";
import { ProcessSection } from "./_sections/process";
import { SimulateurTeaser } from "./_sections/simulateur-teaser";
import { SegmentsSection } from "./_sections/segments";
import { RessourcesSection } from "./_sections/ressources";
import { FaqSection } from "./_sections/faq";
import { CtaSection } from "./_sections/cta";

export default function AssistanceHomePage() {
  return (
    <>
      <AssistanceHeader forceScrolled />

      <main id="main-content">
        <AssistanceHero />
        <TrustStrip />
        <ServicesSection />
        <ProcessSection />
        <SimulateurTeaser />
        <SegmentsSection />
        <RessourcesSection />
        <FaqSection />
        <CtaSection />
      </main>

      <FooterAssistance />

      <StickyCtaMobile devisHref="/#contact" phoneHref="tel:+2250709883293" devisLabel="Mon dossier" />
    </>
  );
}
