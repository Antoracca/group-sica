import { Container } from "@sica/ui";
import { ConstructionHeader } from "@/components/construction-header";
import { FooterConstruction } from "@/components/footer-construction";

export default function EspaceClientPage() {
  return (
    <>
      <ConstructionHeader forceScrolled />
      <main id="main-content" className="min-h-[70svh] bg-paper pt-40 sm:pt-44">
        <Container className="space-y-4">
          <h1 className="font-display text-4xl font-bold text-ink">Espace client</h1>
          <p className="text-slate">
            Ce module accueillera le suivi d&apos;avancement chantier, documents et photos.
          </p>
        </Container>
      </main>
      <FooterConstruction />
    </>
  );
}

