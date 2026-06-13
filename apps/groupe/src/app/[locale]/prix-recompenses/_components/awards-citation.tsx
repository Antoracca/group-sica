import { getTranslations } from "next-intl/server";
import { Container } from "@sica/ui";

/*
  Bloc « citation » du Directeur Général : mise en page éditoriale avec
  guillemets dorés monumentaux et signature manuscrite. Pose la voix
  humaine derrière les distinctions.
*/

export async function AwardsCitation() {
  const t = await getTranslations("Awards.citation");

  return (
    <section
      aria-label={t("ariaLabel")}
      className="relative overflow-hidden bg-gradient-to-b from-[#070A1A] via-[#0A0F2A] to-[#070A1A] py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(247,160,38,0.10) 0%, transparent 60%)",
        }}
      />

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Guillemets dorés monumentaux */}
          <span
            aria-hidden
            className="block font-display text-[8rem] leading-none text-[#F39200] sm:text-[10rem]"
            style={{
              textShadow: "0 4px 30px rgba(247,160,38,0.25)",
            }}
          >
            “
          </span>

          <blockquote className="-mt-10 font-display text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.35] tracking-[-0.012em] text-white/90 sm:-mt-12">
            <p>{t("text")}</p>
          </blockquote>

          {/* Filet doré + signature */}
          <div className="mt-10 flex flex-col items-center gap-3">
            <span aria-hidden className="h-px w-12 bg-[#F39200]" />
            <p className="font-display text-base text-white">{t("name")}</p>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-white/55">
              {t("role")}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
