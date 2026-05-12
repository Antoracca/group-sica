---
name: SICA — préférences strictes du client sur la qualité
description: Interdictions et exigences du client pour éviter tout rendu "IA générique" sur le projet SICA.
type: feedback
originSessionId: 9ba9197f-632c-4857-85df-dbe6ee129509
---
**Interdictions strictes** (instruction directe du client) :
- Aucun emoji nulle part (code, copy, commits, UI).
- Aucune icône générique non curée (Heroicons free, etc.). Utiliser **Lucide** + jeu SVG custom pour services BTP (truelle, géobéton, pylône).
- Aucun texte généré IA "boilerplate" (lorem-corporate, slogans creux). Tout contenu doit être sourcé du dossier technique, infosSica.txt, ou rédigé manuellement avec validation.
- Pas de plugin Figma — design directement en code Tailwind + shadcn.

**Exigences positives** :
- Rendu **corporate de référence type Vinci / Bouygues / Eiffage** — pas un site PME générique.
- Responsivité maximale de 360 px (petit smartphone) à 1920 px+ (ultrawide >24″). Le client a explicitement mentionné les "très grands écrans".
- Expérience immersive : hero avec image art-directed multi-ratio + vidéo discrète en fenêtre (pas vidéo plein écran qui tue le LCP en 4G Abidjan).
- SEO/perfs au top (Core Web Vitals : LCP < 2.0 s, INP < 200 ms, CLS < 0.05).
- WCAG 2.1 AA validé.

**Why** : le client paye cher, son brief insiste plusieurs fois sur "professionnel", "pas générique", "pas IA", "comme les grands sites". Premier livrable médiocre = perte de confiance immédiate.

**How to apply** : avant de proposer un composant, vérifier qu'il ne ressemble pas à un template Tailwind UI standard. Avant d'écrire une ligne de copy, demander au client le contenu ou citer le PDF technique. Toute icône générique = à remplacer.
