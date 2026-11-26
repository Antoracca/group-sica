import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { links } from "@/lib/links";
import { Btn } from "@/components/kit";

const COLONNES = [
  {
    titre: "Formalités",
    liens: [
      { label: "Création d'entreprise", href: "/creation-entreprise" },
      { label: "Modification d'entreprise", href: "/modification-entreprise" },
      { label: "Formes juridiques", href: "/formes-juridiques" },
      { label: "Pièces à fournir", href: "/creation-entreprise#pieces" },
    ],
  },
  {
    titre: "Gestion",
    liens: [
      { label: "Gestion comptable", href: "/gestion#comptable" },
      { label: "Gestion fiscale", href: "/gestion#fiscale" },
      { label: "Gestion sociale", href: "/gestion#sociale" },
      { label: "Impôts et taxes", href: "/impots-et-taxes" },
    ],
  },
  {
    titre: "Outils",
    liens: [
      { label: "Simulateur de création", href: "/simulateur" },
      { label: "Ressources", href: "/ressources" },
      { label: "Questions fréquentes", href: "/#faq" },
      { label: "Espace client E-SICA", href: links.espace.base },
    ],
  },
  {
    titre: "GROUPE SICA",
    liens: [
      { label: "GROUPE SICA", href: links.groupe.base },
      { label: "SICA CONSTRUCTION", href: links.construction.base },
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Confidentialité", href: "/confidentialite" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
] as const;

export function FooterAssistance() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="px-3 pb-3 pt-16 sm:px-4 sm:pb-4">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-[#0A1130] text-white/70">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_0%_0%,rgba(6,51,176,0.5),transparent_70%)]"
        />
        <div className="mx-auto max-w-[1200px] px-6 py-14 sm:px-10 sm:py-16">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
            <div className="max-w-sm space-y-5">
              <a href="/" className="flex items-center gap-3" aria-label="SICA ASSISTANCE — accueil">
                <span className="grid size-12 place-items-center overflow-hidden rounded-xl bg-white">
                  <Image src="/logo-assistance.png" alt="" width={48} height={48} className="size-12 object-contain" />
                </span>
                <span className="font-display text-lg font-bold text-white">
                  SICA <span className="font-medium text-white/70">ASSISTANCE</span>
                </span>
              </a>
              <p className="text-sm leading-relaxed text-white/60">
                Le pôle administratif et conseil du GROUPE SICA : création et modification d&apos;entreprise, gestion
                comptable, fiscale et sociale, en Côte d&apos;Ivoire.
              </p>
              <Btn href="/contact?objet=rendez-vous" variant="orange">
                Prendre rendez-vous
              </Btn>
              <ul className="space-y-2.5 pt-2 text-sm">
                <li className="flex items-start gap-2.5">
                  <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-amber" />
                  <span>
                    <a href="tel:+2250709883293" className="block hover:text-white">(+225) 07 09 88 32 93</a>
                    <a href="tel:+2252722247445" className="block hover:text-white">(+225) 27 22 24 74 45</a>
                    <a href="tel:+2250102442894" className="block hover:text-white">(+225) 01 02 44 28 94</a>
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail aria-hidden className="size-4 shrink-0 text-brand-amber" />
                  <a href="mailto:groupesica@gmail.com" className="hover:text-white">groupesica@gmail.com</a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-amber" />
                  <span>
                    Abidjan · Cocody Centre / PMI
                    <br />
                    Yamoussoukro · Morofé / 24 Ampoules
                  </span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {COLONNES.map((c) => (
                <nav key={c.titre} aria-label={c.titre}>
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">{c.titre}</p>
                  <ul className="space-y-2.5 text-sm">
                    {c.liens.map((l) => (
                      <li key={l.label}>
                        <a href={l.href} className="transition-colors hover:text-white">
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} SICA ASSISTANCE · GROUPE SICA – SARLU. Tous droits réservés.</p>
            <p>RCCM CI-ABJ-03-2020-B13-17592 · CC 2054314X · CNPS 378047</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
