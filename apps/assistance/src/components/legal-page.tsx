import { Container } from "@sica/ui";
import { AssistanceHeader } from "@/components/assistance-header";
import { FooterAssistance } from "@/components/footer-assistance";
import { PageHero } from "@/components/page-hero";

export interface LegalBlock {
  heading: string;
  paragraphs: string[];
}

export function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  blocks,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  updated: string;
  blocks: LegalBlock[];
}) {
  return (
    <>
      <AssistanceHeader forceScrolled />
      <main id="main-content">
        <PageHero eyebrow={eyebrow} title={title} intro={intro} />
        <section className="bg-background pb-20 sm:pb-24 lg:pb-28">
          <Container>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-slate">
              Dernière mise à jour : {updated}
            </p>
            <div className="mt-8 max-w-3xl space-y-10">
              {blocks.map((block) => (
                <div key={block.heading}>
                  <h2 className="font-display text-xl font-semibold tracking-[-0.01em] text-ink">
                    {block.heading}
                  </h2>
                  <div className="mt-3 space-y-3">
                    {block.paragraphs.map((p, i) => (
                      <p key={i} className="text-base leading-relaxed text-slate">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <FooterAssistance />
    </>
  );
}
