"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@sica/ui";
import { AWARDS, type Award } from "../awards-data";

/*
  Galerie « musée des distinctions » :
    - Cartes asymétriques alternées (col-span 7/5 puis 5/7) sur desktop
    - Photo dans un cadre noir mat avec halo doré au hover
    - Fiche éditoriale à côté : eyebrow (catégorie), titre, lieu/date,
      description longue, badge année.
    - Sur mobile : stack vertical, l'image domine.
*/

const KIND_LABEL_KEY: Record<Award["kind"], string> = {
  diploma: "kinds.diploma",
  attestation: "kinds.attestation",
  trophy: "kinds.trophy",
  tribute: "kinds.tribute",
  certificate: "kinds.certificate",
};

export function AwardsGallery() {
  const t = useTranslations("Awards");
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="awards-gallery-title"
      className="relative overflow-hidden bg-[#070A1A] py-24 sm:py-32"
    >
      {/* Texture filigrane diagonale */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #F39200 0 1px, transparent 1px 32px)",
        }}
      />

      <Container className="relative">
        <div className="mb-16 max-w-3xl sm:mb-20">
          <p className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.32em] text-[#F39200]">
            <span aria-hidden className="h-px w-8 bg-[#F39200]" />
            {t("gallery.eyebrow")}
          </p>
          <h2
            id="awards-gallery-title"
            className="mt-5 font-display text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.05] tracking-[-0.02em] text-white"
          >
            {t("gallery.title")}
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-white/55 sm:text-lg">
            {t("gallery.intro")}
          </p>
        </div>

        <ol className="flex flex-col gap-20 sm:gap-24 lg:gap-28">
          {AWARDS.map((award, i) => {
            const isFlipped = i % 2 === 1; // alterne la position photo/texte
            return (
              <motion.li
                key={award.id}
                initial={reduce ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="group/item relative"
              >
                <div
                  className={[
                    "grid items-center gap-10 lg:gap-16",
                    "lg:grid-cols-12",
                  ].join(" ")}
                >
                  {/* === MÉDIA === */}
                  <div
                    className={[
                      "relative lg:col-span-7",
                      isFlipped ? "lg:order-2" : "",
                    ].join(" ")}
                  >
                    <AwardFrame award={award} index={i} />
                  </div>

                  {/* === FICHE ÉDITORIALE === */}
                  <div
                    className={[
                      "lg:col-span-5",
                      isFlipped ? "lg:order-1 lg:pr-6" : "lg:pl-6",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-[#F39200]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px w-8 bg-[#F39200]/40" />
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/55">
                        {t(KIND_LABEL_KEY[award.kind])}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-[clamp(1.5rem,2.6vw,2.2rem)] leading-[1.1] tracking-[-0.015em] text-white">
                      {t(`items.${award.id}.title`)}
                    </h3>

                    {/* Méta : organisme + année */}
                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.85rem] text-white/55">
                      <span className="inline-flex items-center gap-2">
                        <span aria-hidden className="size-1.5 rounded-full bg-[#F39200]" />
                        {t(`items.${award.id}.organism`)}
                      </span>
                      <span className="text-white/30">/</span>
                      <span>{award.context}</span>
                      <span className="text-white/30">/</span>
                      <span className="font-mono text-[0.78rem] tracking-wider text-[#F39200]/90">
                        {award.year}
                      </span>
                    </div>

                    <p className="mt-5 text-pretty text-[0.95rem] leading-relaxed text-white/65 sm:text-base">
                      {t(`items.${award.id}.description`)}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Cadre photo « gala »
   - cadre noir mat + double passe-partout doré
   - halo doré au hover (transition douce)
   - badge année en angle haut-droit
───────────────────────────────────────────────────────────── */
function AwardFrame({ award, index }: { award: Award; index: number }) {
  const aspect = award.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]";

  return (
    <div className="relative">
      {/* Halo doré actif au hover, désactivé par défaut pour la sobriété */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] bg-[radial-gradient(circle_at_50%_50%,rgba(247,160,38,0.18),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover/item:opacity-100"
      />

      {/* Cadre extérieur */}
      <div
        className={[
          "relative overflow-hidden rounded-[20px]",
          "border border-white/[0.08]",
          "bg-gradient-to-br from-[#0C112B] via-[#080B1F] to-[#040616]",
          "shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)]",
        ].join(" ")}
      >
        {/* Passe-partout doré */}
        <div className="relative p-3 sm:p-4">
          <div className="relative overflow-hidden rounded-[12px] ring-1 ring-[#F39200]/30">
            {/* Filet doré intérieur */}
            <div aria-hidden className="pointer-events-none absolute inset-1 z-10 rounded-[8px] ring-1 ring-[#F39200]/15" />
            <div className={`relative ${aspect} bg-black`}>
              <Image
                src={award.image}
                alt={award.image.split("/").pop() ?? ""}
                fill
                sizes="(min-width: 1024px) 56vw, 92vw"
                className="object-cover transition-transform duration-700 ease-out group-hover/item:scale-[1.03]"
                priority={index < 2}
              />
              {/* Dégradé bas léger pour ancrer */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
                style={{
                  background:
                    "linear-gradient(to top, rgba(7,10,26,0.55) 0%, transparent 100%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Coin haut-droit : badge "année" en losange */}
        <div className="absolute right-5 top-5 z-20">
          <div className="relative flex h-14 w-14 items-center justify-center rotate-45 border border-[#F39200]/60 bg-[#070A1A]/85 backdrop-blur-sm">
            <span className="-rotate-45 font-mono text-[0.7rem] font-bold tracking-wider text-[#F39200]">
              {award.year}
            </span>
          </div>
        </div>

        {/* Coins dorés (suggestion de cadre de tableau) */}
        {[
          "left-3 top-3 border-l border-t",
          "right-3 top-3 border-r border-t",
          "left-3 bottom-3 border-l border-b",
          "right-3 bottom-3 border-r border-b",
        ].map((pos) => (
          <span
            key={pos}
            aria-hidden
            className={`pointer-events-none absolute size-5 border-[#F39200]/60 ${pos}`}
          />
        ))}
      </div>
    </div>
  );
}
