import type { Metadata } from "next";
import { Mail, MapPin, Navigation, Phone } from "lucide-react";
import { InnerHero, PageShell } from "@/components/assistance-page";
import { Btn, WRAP } from "@/components/kit";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact et rendez-vous",
  description:
    "Contactez SICA ASSISTANCE pour une création ou une modification d'entreprise, votre comptabilité, votre fiscalité ou vos déclarations sociales. Abidjan (Cocody Centre / PMI) et Yamoussoukro (Morofé / 24 Ampoules).",
  alternates: { canonical: "/contact" },
};

const AGENCES = [
  { ville: "Abidjan", lieu: "Cocody Centre / PMI", q: "Cocody Centre PMI Abidjan" },
  { ville: "Yamoussoukro", lieu: "Morofé / 24 Ampoules", q: "Morofé 24 Ampoules Yamoussoukro" },
] as const;

export default function ContactPage() {
  return (
    <PageShell>
      <InnerHero
        pill="Contact · Rendez-vous"
        title={
          <>
            Parlons de <span className="f-accent text-[1.08em] text-brand-amber">votre dossier.</span>
          </>
        }
        intro="Création, modification, comptabilité, fiscalité ou social : décrivez votre besoin, un conseiller SICA ASSISTANCE vous indique les pièces à réunir et la marche à suivre."
        image="/media/partenariat.jpeg"
      >
        <Btn href="tel:+2250709883293" arrow>
          (+225) 07 09 88 32 93
        </Btn>
        <Btn href="mailto:groupesica@gmail.com" variant="outline-light">
          groupesica@gmail.com
        </Btn>
      </InnerHero>

      <section id="rendez-vous" className="scroll-mt-28 py-20 sm:py-24">
        <div className={`${WRAP} grid gap-8 lg:grid-cols-[1.2fr_0.8fr]`}>
          <ContactForm />
          <div className="space-y-4">
            <div className="rounded-[28px] bg-[#F5F6F8] p-6 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-royal">Téléphones</p>
              <ul className="mt-4 space-y-2">
                {[
                  ["(+225) 07 09 88 32 93", "tel:+2250709883293"],
                  ["(+225) 27 22 24 74 45", "tel:+2252722247445"],
                  ["(+225) 01 02 44 28 94", "tel:+2250102442894"],
                ].map(([l, h]) => (
                  <li key={h}>
                    <a href={h} className="flex items-center gap-3 font-semibold text-ink hover:text-brand-royal">
                      <Phone aria-hidden className="size-4 text-brand-amber" /> {l}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="mailto:groupesica@gmail.com" className="flex items-center gap-3 font-semibold text-ink hover:text-brand-royal">
                    <Mail aria-hidden className="size-4 text-brand-amber" /> groupesica@gmail.com
                  </a>
                </li>
              </ul>
            </div>
            {AGENCES.map((a) => (
              <div key={a.ville} className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-royal">
                  <MapPin aria-hidden className="size-4 text-brand-amber" /> {a.ville}
                </p>
                <p className="mt-2 font-display text-lg font-bold text-ink">{a.lieu}</p>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(a.q)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-royal hover:underline"
                >
                  <Navigation aria-hidden className="size-4" /> Itinéraire
                </a>
              </div>
            ))}
            <p className="px-2 text-xs text-slate">Horaires d&apos;ouverture : communiqués prochainement par la Direction.</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
