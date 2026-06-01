"use client";

import React from "react";
import { Container, Button } from "@sica/ui";
import { MoveRight } from "lucide-react";
import Image from "next/image";

/* ─── Data : Direct, compréhensible et rapide ────────────────────────── */

const steps = [
  { label: "Diagnostic", text: "Visite du site, étude des besoins et faisabilité technique." },
  { label: "Études", text: "Conception, dimensionnement, métrés et planning détaillé." },
  { label: "Exécution", text: "Déploiement sur le terrain, construction et coordination des équipes." },
  { label: "Contrôle", text: "Vérifications rigoureuses de la qualité et de la conformité à chaque phase." },
  { label: "Livraison", text: "Réception des travaux, levée des réserves et remise des clés en toute sérénité." },
];

/* ─── Main section ───────────────────────────────────────────────────────── */

export function ProcessSection() {
  return (
    <section id="process" className="relative overflow-hidden bg-white py-20 sm:py-28 lg:py-36">
      
      {/* ── Effets de fond (Fondu coloré et Filigrane Logo) ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Nuages de couleurs (Orange / Bleu) */}
        <div className="absolute -top-[20%] left-1/4 h-[40%] w-1/2 rounded-full bg-brand-amber/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] right-1/4 h-[40%] w-1/2 rounded-full bg-brand-royal/10 blur-[120px]" />
        
        {/* Filigrane (Photogramme SICA Construction) - Desktop uniquement */}
        <div className="hidden lg:block absolute right-[5%] top-[15%] h-[80%] w-1/2 opacity-[0.08] grayscale">
          <Image
            src="/logo-construction.png"
            alt=""
            fill
            className="object-contain object-right"
          />
        </div>
      </div>
      
      <Container className="relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          
          {/* ── Colonne Gauche : Titre et Description ── */}
          <div className="lg:sticky lg:top-40 lg:h-fit">
            <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-brand-amber">
              Notre Méthodologie
            </h2>
            <p className="mt-4 font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.05] tracking-tight text-ink">
              L'ingénierie du <br/><span className="text-brand-amber">zéro défaut.</span>
            </p>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-600">
              Notre méthode est avant tout pensée pour le terrain. De la toute première visite jusqu'à la remise des clés, nous structurons chaque étape pour vous garantir une exécution parfaite, le respect strict des délais et une transparence totale sur l'avancement.
            </p>

            <div className="mt-10 hidden lg:block">
              <Button asChild variant="accent" size="lg" className="group h-14 px-8 text-sm">
                <a href="/devis">
                  Démarrer votre projet
                  <MoveRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>

          {/* ── Colonne Droite : Le Processus Simple et Statique ── */}
          <div className="relative pt-4">
            
            {/* Logo Mobile pleine couleur, placé juste avant Diagnostic, à droite */}
            <div className="mb-8 flex justify-end lg:hidden">
              <Image 
                src="/logo-construction.png" 
                alt="SICA Construction" 
                width={140} 
                height={50} 
                className="object-contain"
              />
            </div>

            <div className="flex flex-col gap-10 lg:gap-14">
              {steps.map((step, index) => (
                <div key={index} className="relative pl-10 lg:pl-14">
                  {/* La Ligne qui relie ce point au suivant (sauf pour le dernier) */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-[11px] top-[13px] h-[calc(100%+40px)] w-[2px] bg-brand-amber/30 lg:left-[15px] lg:h-[calc(100%+56px)]" />
                  )}

                  {/* Le point sur la timeline */}
                  <div className="absolute left-[7px] top-[8px] size-[10px] rounded-full bg-brand-amber shadow-[0_0_8px_rgba(243,146,0,0.6)] z-10 lg:left-[11px] lg:top-[10px]" />

                  {/* Contenu textuel */}
                  <div className="relative z-10">
                    <h3 className="font-display text-xl font-bold tracking-tight text-ink lg:text-2xl">
                      {step.label}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-600">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bouton Mobile */}
            <div className="mt-14 lg:hidden">
              <Button asChild variant="accent" size="lg" className="w-full h-14 text-sm group">
                <a href="/devis">
                  Démarrer votre projet
                  <MoveRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
