import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@sica/ui";
import { GroupeHeader } from "@/components/groupe-header";
import { Footer } from "@/components/footer";
import { AwardsHero } from "./_components/awards-hero";
import { AwardsGallery } from "./_components/awards-gallery";
import { AwardsKeyFigures } from "./_components/awards-key-figures";
import { AwardsCitation } from "./_components/awards-citation";

/*
  Page « Prix et récompenses » du Groupe SICA.
  Mise en scène muséale des distinctions du Directeur Général M. N'GORAN
  KOFFI VICTOR IVAN. Palette noir profond + or (#F39200) + filets royaux ;
  layouts asymétriques pour échapper à la grille standard du site corporate.
*/

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Awards" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function AwardsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <GroupeHeader forceScrolled />
      <main id="main-content" className="bg-[#070A1A] text-white">
        <AwardsHero />
        <AwardsKeyFigures />
        <AwardsGallery />
        <AwardsCitation />

        {/* Bandeau de transition vers le footer (qui est sombre lui aussi) */}
        <div aria-hidden className="h-px w-full bg-gradient-to-r from-transparent via-[#F39200]/40 to-transparent" />
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.32em] text-[#F39200]/80">
              Groupe SICA
            </p>
            <p className="mt-4 font-display text-lg text-white/70 sm:text-xl">
              <em className="not-italic text-white">
                La reconnaissance suit l&apos;exigence.
              </em>{" "}
              Notre engagement reste le même : bâtir solide, accompagner juste.
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
