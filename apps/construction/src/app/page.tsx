import Image from "next/image";
import { Button, Logo, SiteHeader } from "@sica/ui";
import { FooterConstruction } from "@/components/footer-construction";
import { SectionRail } from "@/components/section-rail";
import { constructionNav } from "@/lib/nav";
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
      <SiteHeader
        brand="construction"
        nav={constructionNav}
        logo={
          <Logo
            brand="construction"
            imgClassName="h-[3.1rem] w-auto sm:h-14 lg:h-[3.6rem] xl:h-[3.9rem]"
            imageRenderer={({ src, alt, width, height, className }) => (
              <Image src={src} alt={alt} width={width} height={height} className={className} priority />
            )}
          />
        }
        badgeLogo={
          <Logo
            brand="construction"
            imgClassName="h-20 w-auto sm:h-24"
            imageRenderer={({ src, alt, width, height, className }) => (
              <Image src={src} alt={alt} width={width} height={height} className={className} />
            )}
          />
        }
        rightSlotScrolled={
          <Button asChild variant="accent" size="md">
            <a href="/devis">Lancer un devis</a>
          </Button>
        }
      />

      <SectionRail />

      <main id="main-content">
        <HeroConstruction />
        <ProofStrip />
        <ExpertisesSection />
        <ProjectsAZSection />
        <TeamSpotlightSection />
        <ProcessSection />
        <CtaConstruction />
      </main>

      <FooterConstruction />
    </>
  );
}

