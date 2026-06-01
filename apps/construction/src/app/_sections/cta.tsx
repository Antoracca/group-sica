import { Button, Container } from "@sica/ui";
import Image from "next/image";

export function CtaConstruction() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 sm:pt-24">
      <Container className="relative z-10 flex flex-col items-center text-center">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-brand-amber">
          Prêt à lancer
        </p>
        
        <h2 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-ink text-balance max-w-5xl">
          On transforme ton cahier des charges en plan d'exécution.
        </h2>
        
        <div className="mt-10 flex flex-col items-center">
          <Button asChild variant="accent" size="lg" className="h-14 px-10 text-base font-bold shadow-xl shadow-brand-amber/20">
            <a href="tel:+2250709883293">Parler à un expert chantier</a>
          </Button>
          <p className="mt-3 text-sm font-medium text-slate-500">
            Temps de réponse inférieur à 5 minutes.
          </p>
        </div>
      </Container>

      {/* Image EQUIPE2 fondue dans le décor (pleine largeur) */}
      <div className="relative mt-12 w-full lg:mt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white/10 z-10" />
        <div className="relative aspect-[4/3] w-full sm:aspect-[21/9] lg:aspect-[3/1]">
          <Image
            src="/equipe2.jpg"
            alt="Équipe SICA Construction"
            fill
            className="object-cover object-top"
            sizes="100vw"
            quality={90}
          />
        </div>
      </div>
    </section>
  );
}

