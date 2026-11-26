import { getTranslations } from "next-intl/server";
import { Container } from "@sica/ui";
import { AWARDS } from "../awards-data";

/*
  Bandeau de chiffres clés sous le hero : 4 stats simples, typo display,
  filets dorés. Donne du rythme entre le hero éditorial et la galerie.
*/

export async function AwardsKeyFigures() {
  const t = await getTranslations("Awards.figures");

  const totalDistinctions = AWARDS.length;
  const trophies = AWARDS.filter((a) => a.kind === "trophy").length;
  const diplomas = AWARDS.filter(
    (a) => a.kind === "diploma" || a.kind === "attestation",
  ).length;
  const years = new Set(AWARDS.map((a) => a.year)).size;

  const figures = [
    { value: totalDistinctions, label: t("distinctions") },
    { value: trophies, label: t("trophies") },
    { value: diplomas, label: t("certificates") },
    { value: years, label: t("years") },
  ];

  return (
    <section
      aria-label={t("ariaLabel")}
      className="relative border-y border-white/[0.08] bg-[#050816]"
    >
      <Container className="py-12 sm:py-14">
        <ul className="grid grid-cols-2 gap-y-8 sm:grid-cols-4">
          {figures.map((f, i) => (
            <li
              key={i}
              className="relative flex flex-col items-center text-center"
            >
              {i > 0 ? (
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 hidden h-10 -translate-y-1/2 border-l border-white/10 sm:block"
                />
              ) : null}
              <span
                className="font-display text-[clamp(2.4rem,4.5vw,3.6rem)] leading-none tracking-tight text-[#F39200]"
                aria-hidden
              >
                {f.value}
              </span>
              <span className="mt-3 max-w-[18ch] font-mono text-[0.7rem] font-semibold uppercase leading-snug tracking-[0.22em] text-white/55">
                {f.label}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
