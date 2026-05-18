# SICA Construction - Context Memory

Date: 2026-05-18
Workspace: C:/Users/HP/Sica/sica-platform/apps/construction

## 1) Scope du dossier
Application Next.js 16 dédiée au pôle `SICA Construction`, port local `3001`.
Stack principale:
- Next.js 16 + React 19
- Tailwind CSS (preset partagé `@sica/config/tailwind-preset`)
- Composants partagés `@sica/ui` + tokens `@sica/tokens`
- Motion (`motion`) + Lucide icons

## 2) Arborescence fonctionnelle

### Config
- `package.json`
- `next.config.ts`
- `tailwind.config.ts`
- `postcss.config.mjs`
- `eslint.config.mjs`
- `tsconfig.json`

### Code source
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`
- `src/app/contact/page.tsx`
- `src/app/devis/page.tsx`
- `src/app/espace-client/page.tsx`
- `src/app/realisations/page.tsx`
- `src/app/_sections/hero.tsx`
- `src/app/_sections/hero-estimator.tsx`
- `src/app/_sections/proof-strip.tsx`
- `src/app/_sections/expertises.tsx`
- `src/app/_sections/projects-az.tsx`
- `src/app/_sections/team-spotlight.tsx`
- `src/app/_sections/process.tsx`
- `src/app/_sections/cta.tsx`
- `src/components/section-rail.tsx`
- `src/components/footer-construction.tsx`
- `src/lib/nav.ts`
- `src/lib/projects.ts`
- `src/lib/fonts.ts`

### Assets publics
- Logos: `logo-construction.png`, `logo-groupe.png`, `logo-assistance.png`
- Team: `media/team/equipe.jpeg`, `portrait-1/2/3.jpeg`
- Projets media:
  - `media/projects/dabre/dabre-1/2/3.jpeg`
  - `media/projects/sgci/sgci-1/2/3.jpeg`
  - `media/projects/villa-duplex/villa-1/2/3.jpeg`

## 3) Routing actuel
- `/` Home construction
- `/devis` (placeholder)
- `/contact` (placeholder)
- `/realisations` (portfolio list)
- `/espace-client` (placeholder)

## 4) Structure de la home (`src/app/page.tsx`)
Ordre des blocs:
1. `SiteHeader` (brand `construction`, nav dédiée, CTA scrolled `Lancer un devis`)
2. `SectionRail` (quick nav flottante desktop XL)
3. `HeroConstruction`
4. `ProofStrip`
5. `ExpertisesSection`
6. `ProjectsAZSection`
7. `TeamSpotlightSection`
8. `ProcessSection`
9. `CtaConstruction`
10. `FooterConstruction`

## 5) Détails sections clés

### Hero + estimateur (`hero.tsx`, `hero-estimator.tsx`)
- Fond image chantier (`/media/projects/sgci/sgci-1.jpeg`) + overlays.
- Positionnement éditorial "On ne vend pas des plans. On livre des ouvrages."
- Carte `Estimateur express` avec paramètres:
  - type projet (villa/immeuble/extension/rehabilitation)
  - surface (range 60-2000 m2)
  - localité (abidjan/interieur/hors-ci)
  - urgence (normal/rapide/urgent)
- Calcul fourchette FCFA:
  - `baseRateByType * surface * localityFactor * urgencyFactor`
  - borne basse = `*0.88`, borne haute = `*1.14`
- CTA vers `/devis` avec query string des paramètres.

### Proof strip (`proof-strip.tsx`)
- 4 métriques (11+, 5, 24/6, A→Z) en bande sombre.

### Expertises (`expertises.tsx`)
- 6 cartes métier (études, géobéton, résidentiel, pilotage, contrôle, sécurité/livraison).

### Projects A-Z (`projects-az.tsx`)
- Données depuis `src/lib/projects.ts`.
- Index alphabétique dynamique via `projectLetters`.
- Cartes projets + badges statut/type.
- `ProjectPanel` modal (fixed) avec:
  - image principale
  - infos projet
  - logique d'exécution
  - thumbnails quand media disponible

### Team spotlight (`team-spotlight.tsx`)
- Carousel automatique toutes les `3800ms`.
- 4 frames team avec image + titre + texte.

### Process (`process.tsx`)
- Timeline en 5 étapes:
  1. Diagnostic
  2. Études
  3. Exécution
  4. Contrôle
  5. Livraison

### CTA finale (`cta.tsx`)
- Double CTA: `/devis` et `tel:+2250709883293`.

## 6) Données métier (`src/lib/projects.ts`)
- Type `ProjectItem`:
  - id, letter, name, city, type, status, summary, media?
- `constructionProjects`: 11 projets (A/B/C/D/G/J/O/S/S/Y).
- `status`: `Livré`, `En cours`, `Étude`.
- 3 projets avec photos locales branchées (DABRE, SGCI, Villa duplex).

## 7) Navigation & UI shared
- `src/lib/nav.ts`:
  - Accueil, Expertises, Projets A-Z, Réalisations, Process, Devis, Contact.
- Header fourni par `@sica/ui` (`SiteHeader`).
- Footer dédié construction (`footer-construction.tsx`).

## 8) SEO/metadata
- `layout.tsx`:
  - `metadataBase`: `https://sicaconstruction.ci`
  - Title default: `SICA Construction — BTP, Génie Civil, Géobéton`
  - OG/Twitter/robots configurés.

## 9) Infra/dev behavior
- `dev` script: kill port 3001 puis `next dev --port 3001`.
- `next.config.ts`:
  - `allowedDevOrigins` large pour tests LAN mobile (HMR cross-origin)
  - optimize imports lucide/motion
  - images formats avif/webp + remotePatterns supabase/ftcdn.

## 10) Points en attente / placeholders
- `/devis`: placeholder texte (formulaire multi-étapes annoncé)
- `/contact`: placeholder texte (contact minimal)
- `/espace-client`: placeholder texte (module futur)

## 11) Notes qualité
- Le cœur home est avancé et riche visuellement.
- Les pages satellites (devis/contact/espace-client) sont minimales et prêtes pour implémentation métier.
- La data projet est centralisée proprement dans `lib/projects.ts`.
