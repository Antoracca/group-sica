import type { Metadata } from "next";
import { MapPin, Navigation, Phone, Clock, Mail } from "lucide-react";
import { Block, CtaBand, PageHero, PageShell, PendingNote } from "@/components/page-shell";
import { AGENCES, CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Nos agences — Abidjan et Yamoussoukro",
  description:
    "Agence SICA CONSTRUCTION d'Abidjan (Cocody Centre / PMI) et bureau de Yamoussoukro (Morofé / 24 Ampoules) : téléphones, carte et itinéraire.",
  alternates: { canonical: "/agences" },
};

export default function AgencesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Nos agences"
        title={
          <>
            Abidjan et Yamoussoukro, <span className="text-brand-amber">au plus près de vos chantiers.</span>
          </>
        }
        intro="Deux implantations et des équipes mobiles sur le territoire ivoirien."
        image="/media/projects/songon-abidjan/WhatsApp Image 2026-05-11 at 19.34.04 (1).jpeg"
      />

      {AGENCES.map((a, i) => (
        <Block
          key={a.id}
          id={a.id}
          eyebrow={a.ville}
          title={a.nom}
          tone={i % 2 === 0 ? "white" : "paper"}
        >
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
              <ul className="space-y-5 text-sm text-slate sm:text-[0.95rem]">
                <li className="flex gap-3">
                  <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-amber" />
                  <span>
                    <span className="block font-semibold text-ink">Adresse</span>
                    {a.adresse}
                  </span>
                </li>
                <li className="flex gap-3">
                  <Phone aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-amber" />
                  <span>
                    <span className="block font-semibold text-ink">Téléphones</span>
                    {CONTACT.telephones.map((t) => (
                      <a key={t.href} href={t.href} className="block hover:text-brand-royal">
                        {t.label}
                      </a>
                    ))}
                  </span>
                </li>
                <li className="flex gap-3">
                  <Mail aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-amber" />
                  <span>
                    <span className="block font-semibold text-ink">E-mail</span>
                    <a href={`mailto:${CONTACT.email}`} className="hover:text-brand-royal">
                      {CONTACT.email}
                    </a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <Clock aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-amber" />
                  <span>
                    <span className="block font-semibold text-ink">Horaires</span>
                    Sur rendez-vous — horaires d&apos;ouverture communiqués prochainement.
                  </span>
                </li>
              </ul>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(a.recherche)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-[10px] bg-brand-amber px-6 text-sm font-semibold text-ink transition-colors hover:bg-brand-amber-600"
              >
                <Navigation aria-hidden className="size-4" />
                Itinéraire
              </a>
              <PendingNote>
                Numéro WhatsApp, horaires et photo des bureaux : publiés après confirmation par la Direction.
              </PendingNote>
            </div>
            <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-slate-200/80 bg-mist">
              <iframe
                title={`Carte — ${a.nom}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(a.recherche)}&output=embed`}
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Block>
      ))}

      <CtaBand />
    </PageShell>
  );
}
