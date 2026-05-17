# Snapshot Contexte — 17/05/2026

## 1) État global du repo
- Monorepo présent et structuré: `apps/`, `packages/`, `docs/`, `scripts/`, `supabase/`.
- Dernier commit visible: `004058f` (sections hero/stats/pillars/realisations + assets + page `/realisations`).
- Arbo apps:
  - `apps/groupe`: actif et alimenté.
  - `apps/construction`: dossier présent mais vide.
  - `apps/assistance`: dossier présent mais vide.
  - `apps/studio`: dossier présent mais vide.

## 2) Ce qui a changé dans la nouvelle version
- `apps/groupe` a été fortement enrichi:
  - Home découpée en sections: `hero`, `stats`, `pillars`, `realisations`, `news`, `testimonials`, `cta-band`.
  - Nouvelle page: `/realisations`.
  - Nouveaux composants hero: `animated-hero-title`, `hero-action-panel`, `hero-video`.
  - Mise à jour du `site-header`.
- Assets ajoutés:
  - Lottie: `Construction Animation.lottie`, `Costumer Support.lottie`.
  - Image hero (`avif/webp`), vidéo hero (`hero-original.mp4`), set photos projets.

## 3) Qualité technique vérifiée
- `pnpm --filter @sica/app-groupe typecheck`: OK.
- `pnpm --filter @sica/app-groupe build`: OK (routes statiques détectées: `/`, `/_not-found`, `/realisations`).
- `pnpm lint` monorepo: KO actuellement.
  - `@sica/app-groupe`: script `next lint` invalide dans ce setup.
  - `@sica/ui`: absence de `eslint.config.mjs` local pour ESLint v9.

## 4) Dépendances et pull Git
- Après pull, modules manquants observés (`@lottiefiles/dotlottie-react`, `lucide-react`) puis corrigés via `pnpm install`.
- Conclusion: après chaque `git pull`, relancer `pnpm install` à la racine.

## 5) Risques / dettes techniques immédiates
- Le pipeline lint n’est pas vert (bloquant CI si lint requis).
- `apps/construction` n’a pas encore de scaffold (objectif prioritaire demandé par le client).
- `apps/assistance` et `apps/studio` restent à initialiser.

## 6) Priorité recommandée (prochaine étape)
1. Démarrer `apps/construction` uniquement (scaffold Next 16 + layout + nav + footer + home sectionnée).
2. Réutiliser `packages/ui` et `packages/tokens` pour cohérence visuelle.
3. Corriger ensuite le lint monorepo (scripts + config UI).

## 7) Rappel produit
- Le site `groupesica.ci` en local n’est pas la version finale métier.
- Focus projet actuel validé par le client: `sicaconstruction.ci`.
