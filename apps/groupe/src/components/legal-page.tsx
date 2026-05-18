import { PageShell } from "@/components/page-shell";
import { Container } from "@sica/ui";

/* ════════════════════════════════════════════════════════════════════════
   LEGAL PAGE — squelette partagé pour mentions, confidentialité, cookies
═══════════════════════════════════════════════════════════════════════ */

interface Section {
  heading: string;
  body: React.ReactNode;
}

interface LegalPageProps {
  title: string;
  intro?: string;
  updatedAt: string; /* format libre */
  sections: Section[];
}

export function LegalPage({ title, intro, updatedAt, sections }: LegalPageProps) {
  return (
    <PageShell>
      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden pt-32 pb-12 text-white sm:pt-40 sm:pb-16 lg:pt-44"
        style={{ background: "linear-gradient(155deg, #08112E 0%, #1E2F8A 60%, #0D1A4A 100%)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><g stroke='white' stroke-width='0.5' fill='none'><path d='M48 0H0V48'/></g></svg>\")",
            backgroundSize: "48px 48px",
          }}
        />
        <Container className="relative">
          <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.22em]" style={{ color: "#F7A832" }}>
            Mentions officielles
          </p>
          <h1 className="font-display max-w-3xl text-balance text-[2rem] font-bold leading-tight tracking-tight sm:text-[2.75rem] lg:text-[3.25rem]">
            {title}
          </h1>
          {intro && (
            <p className="mt-4 max-w-2xl text-pretty text-[0.9375rem] leading-relaxed text-white/65 sm:text-base">
              {intro}
            </p>
          )}
          <p className="mt-5 text-[0.75rem] text-white/40">
            Dernière mise à jour : {updatedAt}
          </p>
        </Container>
      </section>

      {/* ── CORPS ── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container size="tight">
          <div className="space-y-12">
            {sections.map((s, i) => (
              <article key={i}>
                <h2 className="font-display text-[1.375rem] font-bold leading-tight tracking-tight text-[#0D1A4A] sm:text-[1.625rem]">
                  {s.heading}
                </h2>
                <div className="prose-styles mt-4 space-y-4 text-[0.9375rem] leading-[1.75] text-neutral-700 sm:text-base">
                  {s.body}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
