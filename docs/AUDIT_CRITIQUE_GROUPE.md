# Audit critique — GROUPE SICA (réponse à la critique IA tierce)

> Document de référence pour le client. À transmettre tel quel si demandé.
> Sourcé exclusivement du code livré dans `apps/groupe/`, `packages/ui/`, `packages/tokens/`.

---

## 1. Contexte

Une IA tierce a produit une critique de la version livrée de `groupesica.ci` sur 9 points. Cette critique a alimenté l'inquiétude du client sur la qualité mobile-first. Nous avons relu le code ligne par ligne et trié les reproches en trois catégories : faux, partiellement vrais, vrais et corrigeables.

---

## 2. Tri honnête des reproches

### Reproches faux (l'IA n'a pas exécuté le JavaScript)

| Reproche IA | Réalité dans le code |
|---|---|
| « Pas de micro-interactions modernes » | `apps/groupe/src/app/_sections/stats.tsx` — particules canvas réactives au curseur, rideaux SVG diagonaux animés à l'entrée. `cta-band.tsx` — slot machine avec blur/scale/spring sur 8 services. `realisations.tsx` — mosaïque exploded + Ken Burns sur les images. `pillars.tsx` — typewriter Lucide + 2 Lottie. Motion v12 est utilisé sur quasi toutes les sections. |
| « Pas de section preuves » | Trois sections preuves consécutives : `Stats` (4 chiffres clés), `Realisations` (11 projets avec photos), `Testimonials`. |
| « Pas de CTA visibles partout » | Header avec CTA scrolled qui morph, `HeroActionPanel` à 4 onglets actionnables, 2 CTA `Pillars`, CTA-band « Commencer », Footer avec « Connexion client » highlight + demande de devis. |
| « Storytelling problème → solution » | Hero : *« Construire un immeuble ou monter sa boîte, c'est le même combat : il faut des fondations solides. SICA s'occupe de vos chantiers et de votre paperasse. »* — c'est exactement la structure problème → solution. |
| « Espacement rigide » | `clamp()` sur titres et hauteurs (`min-h-[78svh] sm:min-h-[100svh]`), 9 breakpoints dans le preset Tailwind. |

### Reproches partiellement vrais

| Reproche IA | Réalité dans le code |
|---|---|
| « Mobile-first pas pensé » | Effort réel : sections séparées `md:hidden` / `md:block` dans `pillars.tsx`, layouts mosaïque distincts mobile/desktop dans `realisations.tsx`. Mais quelques sections (Stats staircase) sont d'abord pensées desktop puis adaptées mobile. |
| « UX tactile pas optimisée » | Conséquence directe des deux points vrais ci-dessous. |

### Reproches vrais (à corriger)

| Reproche IA | Preuve dans le code |
|---|---|
| « Textes trop petits sur mobile » | `pillars.tsx` ligne 546 : `text-[0.5625rem]` = 9 px. `stats.tsx` ligne 481 : `fontSize: "0.625rem"` = 10 px. `footer.tsx` lignes 85/104/142/177 : `text-[0.58rem]` = 9.3 px. `hero-action-panel.tsx` ligne 643 : `text-[9px]` sur onglets. Sous le seuil de lisibilité WCAG sur smartphone. |
| « Boutons pas 44 px » | `packages/ui/src/components/button.tsx` ligne 30 : `size="md"` → `h-10` = **40 px**. CTA Pillars `py-2.5` → ~36-40 px. Tap targets sous les recommandations Apple HIG et Material (44 px). |

---

## 3. Chantiers de correction priorisés

Voir `docs/TASKS.md` pour le statut en temps réel.

| # | Chantier | Impact client |
|---|---|---|
| 1 | Plancher 12 px sur les labels / eyebrows / sub-labels mobile | Lisibilité immédiate |
| 2 | Tap targets ≥ 44 px sur tous les CTA | Conversion mobile |
| 3 | HeroActionPanel : dropdown unifié sous 480 px | Premier écran lisible |
| 4 | Sticky bottom CTA mobile (Devis · Appel) | +20-40 % conversion typique |
| 5 | Hero text mobile : reformuler en blocs courts | Premier impact |
| 6 | Stats staircase mobile : espacement vertical | Respiration |
| 7 | Contrastes Footer : `white/24` → `white/55` minimum | WCAG AA |

---

## 4. Volontairement écartés

- Refonte des animations (l'IA s'est trompée — elles existent).
- Refonte du storytelling Hero (déjà structuré problème → solution).
- Refonte de la « section preuves » (trois sections existent déjà).

Ces refontes coûteraient du temps et de l'argent sans gain mesurable pour le client.

---

## 5. Validation

Chaque chantier est validé visuellement par le client sur **device mobile réel via WiFi local** (`next.config.ts` autorise déjà les origines LAN). Le port dev `apps/groupe` est `3000`.

Critères de fin de chantier `n` :
1. Code édité, push.
2. Build propre (`pnpm --filter @sica/app-groupe build`).
3. Screenshot mobile 360 px / 768 px / 1440 px.
4. Validation client → ligne cochée `[x]` dans `docs/TASKS.md`.

---

*Document vivant. Mise à jour à chaque clôture de chantier.*
