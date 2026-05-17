import Image from "next/image";
import { Container, Logo } from "@sica/ui";

export function FooterConstruction() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-white/70">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="space-y-4">
            <Logo
              brand="construction"
              href="/"
              imageRenderer={({ src, alt, width, height, className }) => (
                <Image src={src} alt={alt} width={width} height={height} className={className} />
              )}
            />
            <p className="max-w-md text-sm leading-relaxed text-white/55">
              De l'étude de sol jusqu'à la livraison, SICA Construction pilote chaque lot avec
              une logique chantier claire: délais, qualité, sécurité, traçabilité.
            </p>
          </div>

          <nav aria-label="Liens construction">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/35">
              Construction
            </p>
            <ul className="space-y-2 text-sm">
              <li><a href="/#expertises" className="hover:text-white">Expertises</a></li>
              <li><a href="/#projets-az" className="hover:text-white">Projets A-Z</a></li>
              <li><a href="/realisations" className="hover:text-white">Réalisations</a></li>
              <li><a href="/#process" className="hover:text-white">Process chantier</a></li>
            </ul>
          </nav>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/35">
              Contact direct
            </p>
            <ul className="space-y-2 text-sm">
              <li><a href="tel:+2250709883293" className="hover:text-white">+225 07 09 88 32 93</a></li>
              <li><a href="tel:+2250102442894" className="hover:text-white">+225 01 02 44 28 94</a></li>
              <li><a href="mailto:groupesica@gmail.com" className="hover:text-white">groupesica@gmail.com</a></li>
              <li><a href="https://facebook.com/SicaConstruction" target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook · SicaConstruction</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-5 text-xs text-white/35">
          © {year} SICA Construction · Groupe SICA · Côte d'Ivoire
        </div>
      </Container>
    </footer>
  );
}

