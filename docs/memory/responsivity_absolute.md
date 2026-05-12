---
name: SICA — Responsivité ABSOLUE (exigence n°1)
description: Le client a explicitement insisté plusieurs fois sur la responsivité totale — du plus petit smartphone aux écrans ultrawide. Aucune excuse acceptable.
type: feedback
---

**Règle absolue** : chaque composant, chaque page, chaque section, chaque interaction doit fonctionner et être beau sur **toutes les tailles d'écran**, de 320 px (vieux iPhone SE) à 2560+ px (écrans 27"+ ultrawide).

**Breakpoints à tester systématiquement** (déjà configurés dans `packages/tokens/src/spacing.ts` et le Tailwind preset) :
- 360 px (Android petit format)
- 480 px (smartphone classique)
- 640 px (smartphone large / phablette)
- 768 px (tablette portrait)
- 1024 px (tablette paysage / petit laptop)
- 1280 px (laptop)
- 1440 px (desktop standard)
- 1920 px (Full HD)
- 2560 px (4K / ultrawide)

**Checklist par composant** :
- [ ] Pas de débordement horizontal (overflow-x: hidden uniquement en dernier recours, jamais comme cache-misère)
- [ ] Touch targets >= 44×44 px en mobile (taille minimum Apple HIG / Material)
- [ ] Texte lisible à toutes tailles : `clamp()` pour les titres, ratio modulaire pour le body
- [ ] Images en `next/image` avec `sizes` prop renseigné selon les breakpoints
- [ ] Grilles fluides avec `clamp()` ou `grid-template-columns: repeat(auto-fit, minmax(...))`
- [ ] Aucun `width: 100vw` (utiliser `100%` ou `100svw`)
- [ ] `dvh`/`svh`/`lvh` au lieu de `vh` quand un élément doit remplir l'écran mobile (gère la barre d'adresse Safari)
- [ ] Navigation mobile : drawer testé (orientation portrait + paysage)
- [ ] Header transparent → fixed solide : testé sur petit écran (logo + menu burger sans overlap)
- [ ] Boutons : taille minimum confortable au pouce, espacement vertical entre CTAs empilés
- [ ] Tableaux : scrollables horizontalement avec indicateur ou réorganisés en cards mobile
- [ ] Formulaires : labels au-dessus en mobile (jamais à côté), inputs full-width
- [ ] Images responsive avec art-direction (`<picture>` avec sources par breakpoint) si nécessaire (hero principal)
- [ ] Iframes / vidéos : ratio fluide via `aspect-ratio`
- [ ] Performance : pas de carrousels JS lourds en mobile, lazy loading agressif sous le pli

**Outils de validation** :
- Chrome DevTools : tester chaque page sur les 9 breakpoints listés
- Playwright E2E : 3 viewports minimum (mobile 375×667, tablette 768×1024, desktop 1440×900)
- Lighthouse mobile + desktop : score Perf/A11y/SEO/Best-Practices >= 90 sur les deux
- Test physique sur device 4G Côte d'Ivoire (à demander au client) avant chaque livraison majeure

**Why** : le client a dit textuellement « ça doit s'adapter à toutes les tailles de téléphones, du plus petit au plus grand, des tablettes, des plus grands ordinateurs, parce qu'il n'y a pas que des petits écrans d'ordinateurs, il y a plein de très grands écrans d'ordinateurs qui existent. Je sais, je le sais, parce que souvent, c'est responsive sur d'autres et sur d'autres, ce n'est pas responsive. » Il a vu trop de sites mal responsifs, il n'acceptera pas ça.

**How to apply** : à chaque écriture de composant, tester mentalement les 9 breakpoints. À chaque PR, valider Chrome DevTools sur mobile + desktop avant de signaler comme terminé. Si on n'a pas testé un breakpoint, on ne dit pas que c'est fait.
