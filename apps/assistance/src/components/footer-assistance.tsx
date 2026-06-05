import Image from "next/image";
import { Container, Logo } from "@sica/ui";

const SERVICES_LINKS = [
  { label: "Création d'entreprise", href: "/services#creation" },
  { label: "Comptabilité et fiscalité", href: "/services#comptable" },
  { label: "Déclarations", href: "/services#declarations" },
  { label: "Conseil et suivi", href: "/services#conseil" },
] as const;

const RESSOURCES_LINKS = [
  { label: "Simulateur de création", href: "/simulateur" },
  { label: "Ressources et guides", href: "/ressources" },
  { label: "Questions fréquentes", href: "/#faq" },
  { label: "Contact", href: "/contact" },
] as const;

export function FooterAssistance() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="bg-ink text-white/70">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1.1fr]">
          <div className="space-y-4">
            <Logo
              brand="assistance"
              href="/"
              imageRenderer={({ src, alt, width, height, className }) => (
                <Image src={src} alt={alt} width={width} height={height} className={className} />
              )}
            />
            <p className="max-w-md text-sm leading-relaxed text-white/60">
              Le pôle administratif et conseil du Groupe SICA. Création d&apos;entreprise,
              comptabilité, fiscalité et accompagnement des entrepreneurs et des PME en
              Côte d&apos;Ivoire.
            </p>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-white/45">
              RCCM CI-ABJ-03-2020-B13-17592
            </p>
          </div>

          <nav aria-label="Services">
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-white/55">
              Services
            </p>
            <ul className="space-y-2 text-sm">
              {SERVICES_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-white/60 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Ressources">
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-white/55">
              Ressources
            </p>
            <ul className="space-y-2 text-sm">
              {RESSOURCES_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-white/60 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-white/55">
              Contact direct
            </p>
            <ul className="space-y-2 text-sm">
              <li><a href="tel:+2250709883293" className="text-white/60 hover:text-white">+225 07 09 88 32 93</a></li>
              <li><a href="tel:+2250102442894" className="text-white/60 hover:text-white">+225 01 02 44 28 94</a></li>
              <li><a href="mailto:groupesica@gmail.com" className="text-white/60 hover:text-white">groupesica@gmail.com</a></li>
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-white/45">
Cocody Centre, en face Cité 48 Logements V1, Abidjan
              <br />
              Morofé, 24 ampoules, Yamoussoukro
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-5 font-mono text-xs text-white/55">
          © {year} SICA Assistance · Groupe SICA · Côte d&apos;Ivoire
        </div>
      </Container>
    </footer>
  );
}
