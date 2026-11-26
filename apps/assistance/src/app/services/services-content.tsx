"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@sica/ui";
import { PageHero } from "@/components/page-hero";
import { ASSISTANCE_SERVICES } from "@/lib/services";
import { getServiceDetailByServiceId } from "@/lib/service-details";

export function ServicesContent() {
  return (
    <>
      <PageHero
        eyebrow="Nos services"
        title="L'administratif de votre entreprise, pris en charge de bout en bout."
        intro="Sept domaines d'intervention complémentaires. Vous mobilisez un seul service ou un accompagnement complet, selon votre situation."
      />

      <section className="bg-background pb-20 sm:pb-24 lg:pb-28">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
            {ASSISTANCE_SERVICES.map((service) => {
              const Icon = service.icon;
              const detail = getServiceDetailByServiceId(service.id);
              return (
                <article
                  key={service.id}
                  id={service.id}
                  className="flex scroll-mt-28 flex-col rounded-[2rem] border border-brand-royal/10 bg-white p-6 sm:p-8 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-royal/5"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand-royal/5 text-brand-royal">
                      <Icon weight="duotone" className="size-7" aria-hidden />
                    </span>
                    <span className="font-mono text-sm font-bold tracking-wider text-brand-amber">
                      {service.num}
                    </span>
                  </div>

                  <h2 className="mt-6 font-display text-2xl font-bold leading-snug tracking-tight text-zinc-950">
                    {service.label}
                  </h2>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-zinc-600">
                    {service.description}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-50 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-500"
                      >
                        <span aria-hidden className="size-1 shrink-0 rounded-full bg-brand-amber" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  {detail ? (
                    <Link
                      href={`/services/${detail.slug}`}
                      className="group mt-8 inline-flex w-fit items-center gap-2 text-sm font-bold text-brand-royal transition-colors hover:text-brand-amber"
                    >
                      En savoir plus
                      <ArrowRight
                        className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden
                      />
                    </Link>
                  ) : null}
                </article>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 flex flex-col items-start gap-6 rounded-[2rem] border border-brand-royal/10 bg-zinc-50 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-zinc-950">
                Un besoin précis ? Parlons-en.
              </h2>
              <p className="mt-2 max-w-md text-lg leading-relaxed text-zinc-600">
                Exposez-nous votre situation, nous vous orientons vers le bon service.
              </p>
            </div>
            <a
              href="/contact"
              className="group inline-flex min-h-[56px] shrink-0 items-center justify-center gap-3 rounded-full bg-zinc-950 px-8 text-sm font-bold text-white transition-all hover:-translate-y-1 hover:bg-brand-royal hover:shadow-xl hover:shadow-brand-royal/20"
            >
              Démarrer mon dossier
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
