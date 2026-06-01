# SICA Platform — Suivi des tâches

> Source unique de vérité du travail en cours. Cochée = livrée ET validée client.
> Convention : `[ ]` à faire · `[~]` en cours · `[x]` terminée et validée · `[!]` bloquée.

---

## Légende des sites

- **G** = GROUPE SICA (`apps/groupe`, port 3000)
- **C** = SICA Construction (`apps/construction`, port 3001) — actuellement bloqué côté visiteur par splash "en cours"
- **A** = SICA Assistance (`apps/assistance`, port 3002) — actuellement page coming-soon
- **L** = Landing portail (`apps/landing`) — page d'attente sica.ci

---

## En attente de validation visuelle client : GROUPE SICA mobile-first

Code livré, typecheck `pnpm --filter @sica/app-groupe typecheck` = 0 erreur. À tester sur device mobile réel via `pnpm --filter @sica/app-groupe dev` + IP LAN.

- [~] **G-1** Plancher 12 px sur les labels / eyebrows / sub-labels mobile
  - [x] `_sections/pillars.tsx` : taglines mobile 9 → 11 px ; CTA labels 11 → 12 px ; eyebrow 10 → 11 px (sm: 11 → 12 px) ; taglines desktop 10 → 11 px ; CTA desktop 11 → 12 px
  - [x] `_sections/stats.tsx` : stat lines 10 → 11 px ; sub-label 11 → 12 px
  - [x] `components/footer.tsx` : headers 9.3 → 11 px ; copyright/légal 11.5 → 12 px
  - [x] `_sections/hero-action-panel.tsx` : dropdown footer 9.5 → 11 px
  - [x] `realisations/{assistance,construction}/page.tsx` : eyebrows cards 9.3 → 11 px

- [~] **G-2** Tap targets ≥ 44 px
  - [x] `packages/ui/src/components/button.tsx` : `size.md` h-10 → h-11 (44 px) ; `size.icon` size-10 → size-11
  - [x] `_sections/pillars.tsx` : 4 CTA (mobile + desktop, Construction + Assistance) — ajout `min-h-[44px]` + `py-2.5` → `py-3` sur mobile
  - [x] `_sections/cta-band.tsx` : lien "Nous contacter" devient `inline-flex min-h-[44px] items-center` + contraste blanc/40 → blanc/60

- [~] **G-3** HeroActionPanel : dropdown unifié sous 480 px (option B)
  - [x] Ajout state `tabsMenuOpen` + reset on `active` change + close on ESC
  - [x] Variante mobile (`min-[480px]:hidden`) : trigger 56 px avec icône + label complet + chevron ; panel listbox 52 px par option avec Motion AnimatePresence
  - [x] Variante desktop (`hidden min-[480px]:flex`) : grille 4 onglets ancienne (label complet, plus de `labelShort` car place suffisante dès 480 px)

- [~] **G-4** Sticky bottom CTA mobile (Devis · Appeler)
  - [x] Nouveau composant `packages/ui/src/components/sticky-cta-mobile.tsx` : barre fixe 56 px, apparaît après scrollY > 400 px, masquée ≥ 768 px, respect `safe-area-inset-bottom`
  - [x] Export `StickyCtaMobile` + `StickyCtaMobileProps` depuis `@sica/ui`
  - [x] Intégration dans `apps/groupe/src/app/page.tsx` après `<Footer />` : `devisHref=links.construction.devis`, `phoneHref="tel:+2250709883293"`

- [~] **G-5** Hero text mobile reformulé
  - [x] `apps/groupe/src/app/page.tsx` : split en 2 `<p>` — version mobile concise (« Vos chantiers et votre paperasse. » + sub) sous `sm:hidden`, version desktop complète sous `hidden sm:block`

- [~] **G-6** Stats staircase mobile : `gap-y-14` → `gap-y-20` sur la grille
  - [x] `_sections/stats.tsx`

- [~] **G-7** Contrastes Footer WCAG AA
  - [x] `text-white/24` → `text-white/55` (copyright + légal)
  - [x] `text-white/28` → `text-white/55` (adresse, arrows)
  - [x] `text-white/36` → `text-white/60` (poles tagline)
  - [x] `text-white/40` → `text-white/60` (body court)

---

## SICA Construction — refonte premium (en cours)

- [x] **C-0** Splash `DevelopmentLock` retiré du `page.tsx` (composant conservé dans le repo)
- [x] **C-1** Audit cartographique complet (5 pages, 11 sections, polices, couleurs, images, dette technique) — voir réponse de session
- [x] **C-2** Fondation typo + Hero flagship — *implémenté, en attente validation visuelle*
  - [x] Polices : Sora/Inter → **Geist + Geist Mono** (`lib/fonts.ts`, via next/font/google, Geist confirmé dans manifeste Next 16)
  - [x] Images : 3 visuels HD licence Unsplash téléchargés dans `public/hero/` (`chantier.jpg`, `ingenierie.jpg`, `pilotage.jpg`)
  - [x] Préchargement : preload chantier + prefetch des 2 autres dans `layout.tsx`
  - [x] Hero `_sections/hero.tsx` : slider cinématique (crossfade + Ken Burns), scrim adaptatif par luminosité, accroche évolutive (4 mots pivots), kicker mono, index mono pagination, `prefers-reduced-motion` respecté
  - Typecheck construction : 0 erreur

### Construction — refonte premium livrée (build prod OK, 18 routes)
- [x] **C-3** Estimateur enrichi (`hero-estimator.tsx`) — 8 typologies en grille tactile, segmented controls localité/cadence, résultat FCFA animé, cibles ≥44px, labels mono
- [x] **C-4** Expertises (`expertises.tsx`, agent) — composition éditoriale asymétrique, typo monumentale, numérotation mono 01–06, micro-interactions hover, reveal scroll stagger, reduced-motion. Plus de cartes classiques.
- [x] **C-5** Process (`process.tsx`, agent) — ligne continue ambre tracée au scroll (`useScroll`+`useTransform` sur scaleX/Y), étapes en reveal, connecteurs fléchés, reduced-motion. Plus de cartes/timeline générique.
- [x] **C-6** Projets A-Z (`projects-az.tsx`, agent) — teaser 3 blocs premium asymétriques (SGCI signature + DABRÉ + Villa Duplex), compteur mono « 11 opérations », CTA → /realisations, modale conservée. N'affiche plus les 11.
- [x] **C-7** Page projet détaillée (`projets/[slug]/page.tsx`) — colonne gauche sticky (titre, contexte, caractéristiques, méthode) / droite galerie scrollable, SSG 11 projets, SEO par projet, fallback « visuels en préparation »
- [x] **C-8 (partiel)** Transverse : `StickyCtaMobile` branché dans `page.tsx`, contrastes footer `white/35`→`white/60` (WCAG AA), section-rail XL+ scroll-aware (apparition en descente, retrait en montée, mono)

### Construction — Simulateur de devis (livré, build OK)
- [x] **C-9** Page `/devis` — simulateur de devis temps réel **desktop**
  - Document A4 vivant à gauche (96 dpi, en-tête logo + pied légal, pagination déterministe multi-pages, champs à pointillés qui se remplissent en direct)
  - Formulaire à droite : identité, localisation, projet, corps d'état (toggles), options (catalogue +/−), finances (remise/TVA/avance), annexes (import images), signature (import)
  - Catalogue sourcé du dossier technique (12 corps d'état + 8 options, PU FCFA indicatifs)
  - Calcul live sous-total → remise → HT → TVA 18% → TTC → avance → solde
  - Zoom + impression/PDF (`window.print`, CSS `@page A4`)
  - Libs réutilisables : `lib/devis/{types,company,catalog,pricing,pagination,state}.ts`
  - Composants : `app/devis/_components/{a4-sheet,devis-document,devis-form}.tsx` + `devis-simulator.tsx`
  - **Connexion CTAs** : tous les boutons devis du site pointent déjà vers `/devis` ; l'estimateur du hero transmet `?type&surface&locality` → préremplissage automatique
  - Version **mobile** : à concevoir séparément (mobile-first dédié) — non faite, comme convenu
- [ ] Pages `/contact`, `/espace-client` (encore des stubs)
- [ ] **À ARBITRER client** : `proof-strip.tsx` affiche « 11+ projets » ; le brief demandait « 50+ ». Non modifié (mémoire = ne pas inventer de chiffres). Décision client requise.
- [ ] **À ARBITRER client** : `team-spotlight.tsx` contient un texte brouillon (« Tu demandais l'image du PDG… »). **Non modifié** car consigne explicite « Team Spotlight : ne rien modifier ». À débloquer si tu veux que je corrige ce texte.
- [ ] **C-10** Reportage photo : 8 projets sur 11 sans visuel (galerie en fallback). À fournir par le client.

## SICA Assistance — landing V1 (livrée, build OK)
Direction validée : fusion **Trust & Authority + Gateway par profil**, charte conservée (Geist, royal/amber, light only). Source de vérité : `docs/memory/sica_assistance_context.md`.
- [x] **A-0** Fondation : Geist (`lib/fonts`), `lib/links`, `lib/nav` (+ getTopNav), layout light, header + footer partagés
- [x] **A-1** Données sourcées : `lib/services.ts` (7 services), `lib/profiles.ts` (4 profils), `lib/faq.ts`
- [x] **A-2** Landing `/` — 9 sections mobile-first :
  - [x] Hero Gateway « Je suis… » + accroche évolutive + faits vérifiables
  - [x] Bande de confiance (Trust & Authority, faits sourcés only)
  - [x] Services (liste éditoriale des 7 services)
  - [x] Process (ligne continue animée au scroll, 5 étapes)
  - [x] Simulateur création (teaser bande royale, sélecteur forme juridique)
  - [x] Pour qui (4 profils)
  - [x] Ressources (teaser guides, « bientôt disponible »)
  - [x] FAQ (accordéon, 6 questions)
  - [x] CTA final (devise sourcée) + StickyCtaMobile
  - Typecheck + build prod : 0 erreur
- [ ] **A-3** Pages V2 : `/services` détail, `/simulateur` (vrai), `/contact`, `/intake`, `/espace-client`, `/ressources`, légal
- [ ] Reprise possible des 3 agents annulés (limite de session) — non nécessaire, sections faites manuellement
- [ ] Setup skills `sica-context` et `sica-task-validate` + hook `SessionStart` (après stabilisation)

---

## Tâches terminées et validées

*Le client valide visuellement chaque ligne `[~]` ci-dessus pour qu'elle passe en `[x]` et migre ici.*

---

*Mise à jour automatique : éditer ce fichier à chaque clôture/validation.*
