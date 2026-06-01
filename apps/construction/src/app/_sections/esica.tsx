"use client";

import React from "react";
import Image from "next/image";
import { Container, Button } from "@sica/ui";
import { ArrowRight, Smartphone, ShieldCheck, Clock, CheckCircle } from "lucide-react";

export function ESicaSection() {
  return (
    <section id="esica" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-10 lg:gap-24 lg:grid-cols-2">
          
          {/* ── Texte (Ordre 1 sur mobile, Ordre 2 sur desktop) ── */}
          <div className="order-1 lg:order-2 flex flex-col h-full justify-center">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-amber/10 text-brand-amber">
                <Smartphone size={20} />
              </div>
              <span className="font-mono text-sm font-bold uppercase tracking-widest text-brand-amber">
                Espace Client
              </span>
            </div>

            <h2 className="font-display text-[2.5rem] font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              Votre chantier <br />
              <span className="text-brand-amber">à portée de main.</span>
            </h2>
            
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Découvrez <strong>E-sica</strong>, votre espace client dédié. Suivez l'avancement de vos travaux en temps réel, consultez vos rapports, vos plans et validez chaque étape directement depuis votre smartphone.
            </p>

            <ul className="mt-10 flex flex-col gap-5">
              <li className="flex items-start gap-4">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-royal/10 text-brand-royal">
                  <Clock size={14} />
                </div>
                <div>
                  <h4 className="font-bold text-ink">Suivi en temps réel</h4>
                  <p className="text-sm text-slate-500">Des notifications à chaque étape clé validée par nos ingénieurs.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-royal/10 text-brand-royal">
                  <ShieldCheck size={14} />
                </div>
                <div>
                  <h4 className="font-bold text-ink">Transparence totale</h4>
                  <p className="text-sm text-slate-500">Accès centralisé à tous vos documents techniques et financiers.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-royal/10 text-brand-royal">
                  <CheckCircle size={14} />
                </div>
                <div>
                  <h4 className="font-bold text-ink">Validation à distance</h4>
                  <p className="text-sm text-slate-500">Consultez les bilans et validez l'avancement d'un simple clic.</p>
                </div>
              </li>
            </ul>

            {/* Bouton Desktop (Masqué sur mobile) */}
            <div className="mt-12 hidden lg:block">
              <Button asChild variant="accent" size="lg" className="group shadow-lg shadow-brand-amber/20">
                <a href="/espace-client">
                  Accéder à E-sica
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>

          {/* ── Image (Ordre 2 sur mobile, Ordre 1 sur desktop) ── */}
          <div className="relative flex justify-start order-2 lg:order-1 mt-6 lg:mt-0">
            {/* L'ombre et le dégradé derrière le demi-cercle */}
            <div className="absolute -inset-4 z-0 rounded-r-full bg-gradient-to-r from-brand-royal-100 to-transparent blur-2xl" />
            
            {/* Conteneur principal découpé en demi-cercle */}
            <div className="relative z-10 w-[90%] sm:w-[80%] lg:w-[110%] aspect-[4/5] rounded-r-full overflow-hidden shadow-[20px_0_40px_-15px_rgba(7,20,74,0.15)] border-y border-r border-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800"
                alt="Application E-sica sur smartphone"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-royal-900/40 via-transparent to-brand-amber/20" />
            </div>
          </div>

          {/* ── Bouton Mobile (Ordre 3 sur mobile, Masqué sur desktop) ── */}
          <div className="order-3 lg:hidden mt-2">
            <Button asChild variant="accent" size="lg" className="w-full group shadow-lg shadow-brand-amber/20">
              <a href="/espace-client">
                Accéder à E-sica
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
