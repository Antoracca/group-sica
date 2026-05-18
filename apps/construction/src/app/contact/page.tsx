import { Container } from "@sica/ui";
import { ConstructionHeader } from "@/components/construction-header";
import { FooterConstruction } from "@/components/footer-construction";

export default function ContactPage() {
  return (
    <>
      <ConstructionHeader forceScrolled />
      <main id="main-content" className="min-h-[70svh] bg-paper pt-40 sm:pt-44">
        <Container className="space-y-4">
          <h1 className="font-display text-4xl font-bold text-ink">Contact chantier</h1>
          <p className="text-slate">
            Appelez le +225 07 09 88 32 93 ou écrivez à groupesica@gmail.com.
          </p>
        </Container>
      </main>
      <FooterConstruction />
    </>
  );
}

