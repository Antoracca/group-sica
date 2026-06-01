"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container, SectionHeader } from "@sica/ui";

const STEPS = [
  {
    num: "01",
    title: "Prise de contact",
    text: "Vous nous exposez votre besoin, nous cernons votre situation et vos objectifs.",
  },
  {
    num: "02",
    title: "Diagnostic",
    text: "Nous identifions la forme juridique et les démarches adaptées à votre projet.",
  },
  {
    num: "03",
    title: "Constitution du dossier",
    text: "Nous réunissons et rédigeons les pièces nécessaires à votre dossier.",
  },
  {
    num: "04",
    title: "Dépôt et démarches",
    text: "Nous déposons et suivons vos formalités auprès des administrations compétentes.",
  },
  {
    num: "05",
    title: "Suivi",
    text: "Nous tenons votre dossier à jour et restons disponibles pour la suite.",
  },
];

function Step({ step, index, total }: { step: (typeof STEPS)[number]; index: number; total: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isLast = index === total - 1;

  return (
    <li ref={ref} className="relative flex gap-5 pb-10 last:pb-0 sm:gap-7">
      {/* Pastille numéro sur la ligne */}
      <div className="relative z-10 shrink-0">
        <motion.div
          initial={reduce ? false : { scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex size-12 items-center justify-center rounded-full border-2 border-brand-amber bg-mist font-mono text-sm font-bold text-brand-royal"
        >
          {step.num}
        </motion.div>
        {!isLast ? <span aria-hidden className="absolute left-1/2 top-12 h-[calc(100%-3rem)] w-px -translate-x-1/2 bg-brand-royal/10" /> : null}
      </div>

      {/* Contenu */}
      <motion.div
        initial={reduce ? false : { opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : undefined}
        transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="pt-1.5"
      >
        <h3 className="font-display text-lg font-semibold tracking-[-0.01em] text-ink sm:text-xl">
          {step.title}
        </h3>
        <p className="mt-2 max-w-md text-base leading-relaxed text-slate">{step.text}</p>
      </motion.div>
    </li>
  );
}

export function ProcessSection() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80%", "end 50%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" aria-labelledby="process-heading" className="bg-mist">
      <Container className="py-20 sm:py-24 lg:py-28">
        <SectionHeader
          eyebrow="Notre approche"
          heading="Un parcours clair, du premier contact au suivi."
          description="Chaque étape est cadrée et documentée. Vous savez en permanence où en est votre dossier."
          headingClassName="text-ink"
          className="max-w-2xl"
        />

        <div ref={trackRef} className="relative mt-14 sm:mt-16">
          {/* Ligne continue animée au scroll (derrière les pastilles) */}
          <div aria-hidden className="absolute left-6 top-0 h-full w-px -translate-x-1/2 bg-brand-royal/10">
            <motion.div
              className="absolute left-0 top-0 w-full origin-top bg-brand-amber"
              style={{ scaleY: reduce ? 1 : scaleY, height: "100%" }}
            />
          </div>

          <ol className="relative">
            {STEPS.map((step, i) => (
              <Step key={step.num} step={step} index={i} total={STEPS.length} />
            ))}
          </ol>
        </div>

        <div className="mt-6 pl-[4.25rem] sm:pl-[4.75rem]">
          <a
            href="/#contact"
            className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-brand-royal px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-royal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal focus-visible:ring-offset-2"
          >
            Démarrer mon dossier
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </a>
        </div>
      </Container>
    </section>
  );
}
