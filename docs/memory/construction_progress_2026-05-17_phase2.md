# Construction — Progression Phase 2 (17/05/2026)

## Nouvelles améliorations premium

### 1) Hero: estimateur devis interactif
- Ajout d'un module `HeroEstimator` (client) dans le hero:
  - Type de projet (villa, immeuble, extension, réhabilitation)
  - Surface (range slider)
  - Localité
  - Urgence
- Calcul dynamique d'une fourchette FCFA (indicative) et transfert des paramètres vers `/devis`.
- Objectif: passer d'un CTA passif à un CTA qualifiant.

### 2) Section Projets A→Z: panels overlay chantier
- Refactor `projects-az.tsx` en composant client avec état.
- Ajout de `ProjectPanel` (modal overlay premium):
  - ouverture depuis chaque carte projet
  - visuel principal + mini galerie thumbnails
  - métadonnées chantier (type, statut, ville, synthèse)
  - bloc "logique d'exécution" orienté métier
- Résultat: lecture rapide + profondeur d'information sans quitter la page.

### 3) Copywriting / ton métier
- Renforcement du ton dans le hero et les sections:
  - formulations plus directes
  - cadence punchline
  - vocabulaire chantier concret.
- Nettoyage des libellés FR (ex: "Pourquoi c'est décisif").

## Validation technique après Phase 2
- `pnpm --filter @sica/app-construction typecheck`: OK
- `pnpm --filter @sica/app-construction build`: OK

## Fichiers principaux ajoutés/modifiés en Phase 2
- `apps/construction/src/app/_sections/hero-estimator.tsx` (nouveau)
- `apps/construction/src/app/_sections/hero.tsx` (modifié)
- `apps/construction/src/app/_sections/projects-az.tsx` (refactor complet)
- `apps/construction/src/app/_sections/team-spotlight.tsx` (copy polish)

