# Prompt Directeur — SICA Construction (17/05/2026)

## Objectif
Créer `sicaconstruction.ci` avec un niveau premium (rigueur métier BTP + finition produit type Stripe): interface sobre, nerveuse, lisible, élégante, non générique, orientée conversion devis et crédibilité chantier.

## Contraintes non négociables
- Respect strict identité SICA: bleu royal `#1E2F8A` + orange `#F39200`, blanc cassé, gris techniques.
- Ton éditorial humain, concret, métier BTP. Zéro texte IA creux.
- Responsivité absolue 320px → 2560px.
- Aucune lourdeur gratuite: animations utiles, nettes, fluides.
- Pas de design “template banal”.

## Direction visuelle
- Typo:
  - Titres: `DM Serif Display` (impact institutionnel).
  - Corps/UI: `Barlow Condensed` + fallback `Inter`.
- Contraste:
  - Hero sombre contrôlé + accents orange.
  - Sections blanches respirantes, blocs data techniques sur fonds bleu.
- Détails premium:
  - Hairlines, halos subtils, overlays calibrés, transitions 180–320ms.
  - Boutons avec états précis (hover, focus, active, disabled) et feedback micro-interaction.

## Images validées (source locale)
- Équipe (obligatoire): `C:\Users\admin\Sica\imagesAll\images\personnels\equipe.jpeg`
- 3 images chantier retenues (carrousel principal):
  - Dossier SGCI (géobéton): `imagesAll\projets\Projet Siège SGCI plateau (géobéton)\...`
  - Dossier Villa Duplex Jacqueville: `imagesAll\projets\Projet VILLA DUPLEX à Jacqueville Abidjan\...`
  - Dossier DABRÉ sous-sol: `imagesAll\projets\PROJET DABRÉ - VILLA BASSE AVEC SOUS SOL\...`

## Lotties retenues
- `Construction Animation.lottie` (hero technique / process).
- `Costumer Support.lottie` (zone service client / suivi).
- Usage: discret, vectoriel, pas envahissant.

## Structure produit (homepage construction)
1. Hero chantier premium
   - Grand visuel chantier + panneau latéral “Lancer un devis”.
   - Punchline courte et mémorable.
   - CTA primaire: `Demander un devis`.
2. Bande preuves
   - Chiffres clés (projets, zones couvertes, disciplines, délai moyen).
3. Savoir-faire métier
   - Cartes spécialisées: géobéton, gros œuvre, second œuvre, étude/contrôle.
4. Carrousel projets (images réelles)
   - Swipe + légendes courtes (lieu, typologie, état).
5. Bloc direction/équipe (avec `equipe.jpeg`)
   - 3 images secondaires animées + textes qui défilent proprement.
6. Process chantier en 5 étapes
   - Diagnostic → Études → Exécution → Contrôle → Livraison.
7. CTA de conversion
   - Devis + contact direct (tel/mail/WhatsApp).

## Micro-fonctionnalités “niveau pro”
- Bouton devis sticky mobile.
- Mini estimateur (surface + type de projet → fourchette initiale).
- Toggle avant/après ou plans/réalisation sur carte projet.
- Barre de progression visuelle sur étapes chantier.
- Panneaux overlay d’info (sans rechargement).
- Skeletons de chargement élégants.

## Règles de copywriting
- Phrases courtes, verbes d’action, vocabulaire chantier.
- Promesses vérifiables, pas de superlatifs vides.
- Exemples de tonalité:
  - “On ne vend pas des plans. On livre des ouvrages.”
  - “Chaque étape est tracée. Chaque délai est tenu.”
  - “Du sol à la finition, un seul pilote.”

## Priorité d’exécution
1. Monter `apps/construction` (layout/nav/footer/theme).
2. Construire homepage sections 1→7 avec images réelles.
3. Brancher interactions premium (swipe/overlay/panels).
4. Finaliser QA responsive + performance + accessibilité.
