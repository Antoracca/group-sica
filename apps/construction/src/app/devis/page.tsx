import { Container } from "@sica/ui";
import { ConstructionHeader } from "@/components/construction-header";
import { FooterConstruction } from "@/components/footer-construction";

export default function DevisPage() {
  return (
    <>
      <ConstructionHeader forceScrolled />
      <main id="main-content" className="min-h-[70svh] bg-paper pt-40 sm:pt-44">
        <Container className="space-y-4">
          <h1 className="font-display text-4xl font-bold text-ink">Demande de devis</h1>
          <p className="text-slate">
            Module devis en cours de finalisation. Le formulaire multi-étapes sera branché ici.
          </p>
        </Container>
      </main>
      <FooterConstruction />
    </>
  );
}

