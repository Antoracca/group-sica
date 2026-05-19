import { FooterConstruction } from "@/components/footer-construction";
import { ConstructionHeader } from "@/components/construction-header";
import { SectionRail } from "@/components/section-rail";
import { DevelopmentLock } from "./_sections/development-lock";
import { HeroConstruction } from "./_sections/hero";
import { ProofStrip } from "./_sections/proof-strip";
import { ExpertisesSection } from "./_sections/expertises";
import { ProjectsAZSection } from "./_sections/projects-az";
import { TeamSpotlightSection } from "./_sections/team-spotlight";
import { ProcessSection } from "./_sections/process";
import { CtaConstruction } from "./_sections/cta";

export default function ConstructionHomePage() {
  return (
    <>
      <ConstructionHeader />

      <main id="main-content">
        <HeroConstruction />
        <DevelopmentLock>
          <SectionRail />
          <ProofStrip />
          <ExpertisesSection />
          <ProjectsAZSection />
          <TeamSpotlightSection />
          <ProcessSection />
          <CtaConstruction />
          <FooterConstruction />
        </DevelopmentLock>
      </main>
    </>
  );
}

