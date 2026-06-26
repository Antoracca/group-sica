import type { Metadata } from "next";
import { AssistanceHeader } from "@/components/assistance-header";
import { FooterAssistance } from "@/components/footer-assistance";
import { ServicesContent } from "./services-content";

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Création et modification d'entreprises, comptabilité, fiscalité, déclarations, conseil en gestion et accompagnement. Le détail des services de SICA Assistance.",
};

export default function ServicesPage() {
  return (
    <>
      <AssistanceHeader forceScrolled />
      <main id="main-content">
        <ServicesContent />
      </main>
      <FooterAssistance />
    </>
  );
}
