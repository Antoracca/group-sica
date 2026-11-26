import { StickyCtaMobile } from "@sica/ui";
import { AssistanceHeader } from "@/components/assistance-header";
import { FooterAssistance } from "@/components/footer-assistance";
import { CtaFinal } from "@/components/assistance-page";
import { HeroAccueil } from "./_accueil/hero";
import { Constat, Panneaux } from "./_accueil/constat-panneaux";
import { FormalitesOnglets } from "./_accueil/formalites-onglets";
import { Essentiel, Faq, FormesJuridiques, Manifeste, Reperes } from "./_accueil/sections";

/* Accueil SICA ASSISTANCE — ordre des sections : apps/assistance/DESIGN.md §4. */

export default function AssistanceHomePage() {
  return (
    <>
      <AssistanceHeader />

      <main id="main-content" className="bg-white">
        <HeroAccueil />
        <Constat />
        <Panneaux />
        <Manifeste />
        <FormesJuridiques />
        <div className="pt-20 sm:pt-24" />
        <FormalitesOnglets />
        <div className="pt-6" />
        <Reperes />
        <Essentiel />
        <Faq />
        <CtaFinal />
      </main>

      <FooterAssistance />

      <StickyCtaMobile devisHref="/contact?objet=creation" phoneHref="tel:+2250709883293" devisLabel="Mon dossier" />
    </>
  );
}
