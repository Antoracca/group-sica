import type { Metadata } from "next";
import { MapPin, Phone, Mail } from "lucide-react";
import { Block, PageHero, PageShell } from "@/components/page-shell";
import { AGENCES, CONTACT } from "@/lib/contact";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact et demande de devis",
  description:
    "Contactez SICA CONSTRUCTION : demande de devis, étude de sol, rendez-vous. (+225) 07 09 88 32 93 · groupesica@gmail.com · Abidjan et Yamoussoukro.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Contact · Demander un devis"
        title={
          <>
            Parlons de <span className="text-brand-amber">votre projet.</span>
          </>
        }
        intro="Demande de devis, étude, rendez-vous ou simple question : un conseiller SICA CONSTRUCTION vous répond."
        image="/media/projects/dabre-villa/WhatsApp Image 2026-05-12 at 06.54.36 (3).jpeg"
      >
        <a
          href="/devis"
          className="inline-flex h-12 items-center justify-center rounded-[10px] bg-brand-amber px-7 text-sm font-semibold text-ink transition-colors hover:bg-brand-amber-600"
        >
          Estimer mon projet en ligne
        </a>
        <a
          href="tel:+2250709883293"
          className="inline-flex h-12 items-center justify-center rounded-[10px] border border-white/25 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          Appeler un conseiller
        </a>
      </PageHero>

      <Block id="rendez-vous" tone="white">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <ContactForm />
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200/80 bg-paper p-6 sm:p-8">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-brand-amber">
                Coordonnées
              </p>
              <ul className="mt-5 space-y-4 text-sm text-slate">
                <li className="flex gap-3">
                  <Phone aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-amber" />
                  <span>
                    {CONTACT.telephones.map((t) => (
                      <a key={t.href} href={t.href} className="block font-semibold text-ink hover:text-brand-royal">
                        {t.label}
                      </a>
                    ))}
                  </span>
                </li>
                <li className="flex gap-3">
                  <Mail aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-amber" />
                  <a href={`mailto:${CONTACT.email}`} className="font-semibold text-ink hover:text-brand-royal">
                    {CONTACT.email}
                  </a>
                </li>
                {AGENCES.map((a) => (
                  <li key={a.id} className="flex gap-3">
                    <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-amber" />
                    <span>
                      <span className="block font-semibold text-ink">{a.nom}</span>
                      {a.adresse}
                    </span>
                  </li>
                ))}
              </ul>
              <a href="/agences" className="mt-6 inline-block text-sm font-semibold text-brand-royal hover:underline">
                Cartes et itinéraires
              </a>
            </div>
          </div>
        </div>
      </Block>
    </PageShell>
  );
}
