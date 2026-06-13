import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@sica/ui";
import { AssistanceHeader } from "@/components/assistance-header";
import { FooterAssistance } from "@/components/footer-assistance";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez SICA Assistance pour votre création d'entreprise, votre comptabilité ou votre suivi administratif. Abidjan et Yamoussoukro.",
};

const COORDS = [
  {
    icon: Phone,
    label: "Téléphone",
    lines: ["+225 07 09 88 32 93", "+225 01 02 44 28 94"],
    hrefs: ["tel:+2250709883293", "tel:+2250102442894"],
  },
  {
    icon: Mail,
    label: "E-mail",
    lines: ["secretariat@groupe-sica.com"],
    hrefs: ["mailto:secretariat@groupe-sica.com"],
  },
  {
    icon: MapPin,
    label: "Adresses",
    lines: ["Cocody Centre, en face Cité 48 Logements V1, Abidjan", "Morofé, 24 ampoules, Yamoussoukro"],
  },
  {
    icon: Clock,
    label: "Disponibilité",
    lines: ["Du lundi au samedi", "Équipe joignable en journée"],
  },
];

export default function ContactPage() {
  return (
    <>
      <AssistanceHeader forceScrolled />
      <main id="main-content">
        <PageHero
          eyebrow="Contact"
          title="Parlons de votre projet."
          intro="Décrivez votre besoin en quelques lignes. Un conseiller vous répond et vous indique les prochaines étapes, sans engagement."
        />

        <section id="contact" className="bg-background pb-20 sm:pb-24 lg:pb-28">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
              {/* Coordonnées */}
              <div className="space-y-4">
                {COORDS.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div
                      key={c.label}
                      className="flex gap-4 rounded-2xl border border-brand-royal/10 bg-white p-5"
                    >
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-royal/5 text-brand-royal">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <div>
                        <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-slate">
                          {c.label}
                        </p>
                        <div className="mt-1.5 space-y-0.5">
                          {c.lines.map((line, i) => {
                            const href = c.hrefs?.[i];
                            return href ? (
                              <a
                                key={line}
                                href={href}
                                className="block text-base font-semibold text-ink transition-colors hover:text-brand-royal"
                              >
                                {line}
                              </a>
                            ) : (
                              <p key={line} className="text-base font-semibold text-ink">
                                {line}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Formulaire */}
              <ContactForm />
            </div>
          </Container>
        </section>
      </main>
      <FooterAssistance />
    </>
  );
}
