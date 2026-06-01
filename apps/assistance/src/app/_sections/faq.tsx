"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { Container, SectionHeader } from "@sica/ui";
import { ASSISTANCE_FAQ } from "@/lib/faq";

export function FaqSection() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-background">
      <Container className="py-20 sm:py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="Questions fréquentes"
              heading="Vous vous posez sûrement ces questions."
              headingClassName="text-ink"
            />
            <div className="mt-6 rounded-2xl border border-brand-royal/10 bg-mist/50 p-5">
              <p className="text-sm leading-relaxed text-slate">
                Vous ne trouvez pas votre réponse ?
              </p>
              <a
                href="/#contact"
                className="mt-3 inline-flex min-h-[44px] items-center justify-center rounded-full bg-brand-royal px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-royal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal focus-visible:ring-offset-2"
              >
                Nous contacter
              </a>
            </div>
          </div>

          <ul className="divide-y divide-brand-royal/10 border-t border-brand-royal/10">
            {ASSISTANCE_FAQ.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex min-h-[56px] w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-display text-base font-semibold text-ink sm:text-lg">
                      {item.q}
                    </span>
                    <Plus
                      className={`size-5 shrink-0 text-brand-royal transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="content"
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-8 text-base leading-relaxed text-slate">
                          {item.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
