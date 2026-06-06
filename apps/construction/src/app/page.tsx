import { StickyCtaMobile } from "@sica/ui";
import { FooterConstruction } from "@/components/footer-construction";
import { ConstructionHeader } from "@/components/construction-header";
import { SectionRail } from "@/components/section-rail";
import { HeroConstruction } from "./_sections/hero";
import { ProofStrip } from "./_sections/proof-strip";
import { ExpertisesSection } from "./_sections/expertises";
import { ProjectsAZSection } from "./_sections/projects-az";
import { ProcessSection } from "./_sections/process";
import { ESicaSection } from "./_sections/esica";
import { DevisIaSpotlight } from "./_sections/devis-ia-spotlight";
import { CtaConstruction } from "./_sections/cta";

export default function ConstructionHomePage() {
  return (
    <>
      <ConstructionHeader />

      <main id="main-content">
        <HeroConstruction />
        <SectionRail />
        <ProofStrip />
        <DevisIaSpotlight />
        <ESicaSection />
        <ExpertisesSection />
        <ProjectsAZSection />
        <ProcessSection />
        <CtaConstruction />
      </main>

      <FooterConstruction />

      {/* Barre CTA fixe — mobile uniquement, apparaît après le hero */}
      <StickyCtaMobile devisHref="/devis" phoneHref="tel:+2250709883293" />
    </>
  );
}

