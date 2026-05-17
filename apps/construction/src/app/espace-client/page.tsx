import { Container } from "@sica/ui";

export default function EspaceClientPage() {
  return (
    <main className="min-h-[70svh] bg-paper pt-28 sm:pt-32">
      <Container className="space-y-4">
        <h1 className="font-display text-4xl font-bold text-ink">Espace client</h1>
        <p className="text-slate">
          Ce module accueillera le suivi d&apos;avancement chantier, documents et photos.
        </p>
      </Container>
    </main>
  );
}

