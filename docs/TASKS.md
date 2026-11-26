# SICA Platform — Suivi des tâches

> Source unique de vérité du travail en cours. Cochée = livrée ET validée client.
> Convention : `[ ]` à faire · `[~]` en cours / livré en attente de validation · `[x]` terminée et validée · `[!]` bloquée.

---

## REFONTE V2 — novembre 2026 (prioritaire)

> **26/11/2026 — vague 1 REJETÉE et ANNULÉE** (code remis à l'état du commit 954ba3a, refonte conservée dans `git stash` « refonte-v2-rejetee-2026-11-26 »). Les cases `[~]` ci-dessous ne sont plus valides. Nouvelle approche : ancien site conservé + couleurs officielles + corrections DG + finitions du modèle de design (voir DESIGN.md révision 3).
>
> **Groupe (fait le 26/11, en attente de validation)** : couleurs officielles sur tout le site, domaines `.com`, adresses Cocody Centre / PMI et Morofé / 24 Ampoules, SARLU, téléphones uniformisés, chiffres non sourcés remplacés (11 réalisations référencées, 5 équipes terrain, 2 implantations, immatriculation 2020), années et statuts de projets « à confirmer », promesses absolues adoucies, filigrane de la vidéo d'accueil recadré, boutons au format du modèle.
> **Ensuite** : Construction (12 améliorations, menu imposé) puis Assistance, même méthode.


Sources : `DESIGN.md` (v2), `INSTRUCTIONS.md`, les 3 PDF de `docs/` (11 et 17/11/2026).
Objectif de cette vague : refaire **plus de 50 %** des 3 sites selon DESIGN.md, dans l'ordre Groupe → Construction → Assistance. L'autre moitié suit dans une seconde vague.

**État au 26/11/2026** : `[~]` = livré dans le code (typecheck 0 erreur, build OK : Groupe 30 pages, Construction 26, Assistance 15, contrôle visuel 375 / 1440 px), en attente de validation client. Les champs non fournis par la Direction sont affichés « à confirmer » ou masqués.

### Phase 0 — Fondation design (partagée)
- [~] **F-1** Tokens couleurs officiels (`#0633B0`, `#F77F00`, surfaces indigo-nuit, filets, statuts) dans `packages/tokens` + variables CSS
- [~] **F-2** Preset Tailwind : nouvelles classes (surfaces, texte, tailles display, `font-num`, `py-section`), rayons 4/6/8/12
- [~] **F-3** Polices unifiées sur les 3 apps : Inter + IBM Plex Sans (chiffres) + IBM Plex Mono
- [~] **F-4** `@sica/ui` : `Button` (primary, pill, secondary-dark, secondary-light, indigo, ghost), `Container` 1280
- [~] **F-5** Header partagé restylé `top-nav-dark` / `top-nav-light` + barre inter-sites (Groupe · Construction · Assistance)
- [~] **F-6** Footer clair `footer-light` sur les 3 sites, coordonnées uniformes, domaines `.com`
- [~] **F-7** Liens de production → `groupe-sica.com`, `sicaconstruction.com`, `sicaassistance.com`

### Phase 1 — Site principal GROUPE SICA (`apps/groupe`)
- [~] **G2-1** Accueil : hero-band-dark (H1 + CTA + accès aux 2 pôles), bande entités, signature-band, réalisations (tableau data-table-card + photos réelles), actualités, cta-band, footer clair
- [~] **G2-2** Page À propos / Le Groupe : présentation SARLU, vision/mission/valeurs, organisation, implantations (sans chiffres non validés)
- [~] **G2-3** Contact : mode clair transactionnel, 2 agences, coordonnées uniformes
- [~] **G2-4** Navigation Groupe : liens vers les 2 pôles distingués, nouveaux domaines

### Phase 2 — SICA Construction (`apps/construction`) — 12 améliorations
- [~] **C2-1** Menu imposé (amélioration 1) : Accueil · Qui sommes-nous ? · Nos expertises · Nos réalisations · Nos solutions constructives · Nos agences · Espace client E-SICA · Contact / Demander un devis + liens Groupe/Assistance
- [~] **C2-2** Accueil : bannière claire + message (phrase d'accueil validée) + CTA, signature « L'exigence technique… »
- [~] **C2-3** Page `/qui-sommes-nous` (amélioration 2)
- [~] **C2-4** Page `/expertises` en 3 domaines A/B/C (amélioration 3), circuits Études vs Technique distincts
- [~] **C2-5** `/realisations` : filtres type / localisation / année, fiche projet (type, localisation, année, statut, mission SICA, caractéristiques) — champs non connus marqués « à confirmer » (amélioration 4)
- [~] **C2-6** Page `/solutions` (services / solutions constructives, dont géobéton / BTCS)
- [~] **C2-7** Page `/agences` : Abidjan Cocody Centre / PMI + Yamoussoukro Morofé / 24 Ampoules, téléphone, WhatsApp, carte + itinéraire, horaires « à confirmer » (amélioration 7)
- [~] **C2-8** Textes commerciaux revus : engagements mesurables, CTA devis / conseiller / rendez-vous (amélioration 11)
- [~] **C2-9** Métadonnées uniques par page + mots-clés SEO de l'amélioration 9

### Phase 3 — SICA Assistance (`apps/assistance`)
- [~] **A2-1** Accueil restylé (hero sombre, services, process, CTA « Démarrer mon dossier »)
- [~] **A2-2** `/creation-entreprise` : but, pièces à fournir, rédaction des actes (notaire agréé / sous seing privé), enregistrement DGI, immatriculations, rattachement impôts, rattachement CNPS, délai 30 jours
- [~] **A2-3** `/modification-entreprise` : définition, buts, motifs fréquents, pièces, mêmes étapes
- [~] **A2-4** `/formes-juridiques` : EI, SARL/SARLU, SA, SAS/SASU, SCI, SNC, SCS (tableau comparatif data-table)
- [~] **A2-5** `/gestion-comptable-fiscale-sociale` : comptable (SYSCOHADA), fiscale (DGI, régimes), sociale (CNPS), FNE, business plan, accompagnement
- [~] **A2-6** `/impots-taxes` : particuliers, entreprises (IS 25 %, IMF, TVA 18 %), régimes TEE / RME / RSI / RNI, foncier et locaux, cotisations CNPS
- [~] **A2-7** Navigation et footer Assistance alignés, domaine `sicaassistance.com`

### Seconde vague (≈ 50 % restant, plus tard)
- [ ] Simulateur devis / DQE v2 (amélioration 5) : estimation vs avant-métré vs DQE vs devis officiel, villa basse / duplex / triplex / immeuble R+1 → R+50, standing, géobéton/BTCS, upload plans PDF limité, hypothèses / exclusions / validité, PDF référencé daté versionné, validation service Études
- [ ] Espace client E-SICA renforcé (amélioration 6) : documents, planning, rapports datés, situations financières, réserves, PV, droits par client (RLS)
- [ ] Preuves de crédibilité (amélioration 8) après validation Direction : équipe, moyens matériels, contrôle qualité, témoignages autorisés
- [ ] SEO complet (amélioration 9) : pages locales Abidjan / Yamoussoukro, sitemap, robots, redirections, rapport SEO avant/après
- [~] Restyle pages secondaires Groupe : actualités, carrières, partenaires, légales ; Assistance : simulateur, ressources, légales
- [ ] Sécurité et remise des accès (amélioration 12 + courrier du 11/11/2026) : dossier de remise (domaines, DNS, hébergement, admin, code, base, e-mails, Analytics/Search Console, SSL, sauvegardes, licences, doc technique, formation, tests de restauration et de récupération)

### À fournir par la Direction (bloquant pour publication, pas pour le dev)
- Horaires des agences, photo des bureaux, numéro WhatsApp à afficher
- Dates d'historique, chiffres publiables (projets, années, effectifs)
- Par projet : type, année, statut, mission SICA, surface/niveaux, photos avant/pendant/après, autorisation client
- Témoignages signés, profils d'équipe autorisés, qualifications justifiables
- Confirmation des domaines `.com` et accès registrar

---

## Historique (vague 1, mai–juin 2026)

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
- [x] **A-3** Pages V2 (build prod OK, 8 routes statiques) :
  - [x] `/services` — détail des 7 services (ancres par service) + composant `PageHero` réutilisable
  - [x] `/simulateur` — wizard 4 étapes (forme juridique OHADA → secteur → détails → coordonnées → récap avec formalités + pièces, sans tarif inventé)
  - [x] `/contact` — coordonnées + formulaire (état de soumission local, prêt backend)
  - [x] `/ressources` — 6 guides « bientôt disponible »
  - [x] `/mentions-legales`, `/confidentialite`, `/cookies` — composant `LegalPage` partagé, contenu sourcé (RCCM, capital, contacts réels)
  - [x] Nav + footer mis à jour vers les vraies routes
  - Données : `lib/simulateur.ts` (formes + secteurs + pièces)
- [ ] **A-4** Page backend (V3) : `/intake` (nécessite Supabase) — différée
- [ ] Setup skills `sica-context` et `sica-task-validate` + hook `SessionStart` (après stabilisation)

## Espace client unifié (`apps/espace`, port 3004) — livré, build OK
App web façon Windows 11 / Fluent, reliée aux 3 pôles (Groupe = vue holding, Construction, Assistance). Design : nos tokens + Geist + Lucide. Données mock TS (`lib/`). Magic MCP abandonné (générique, hors charte). Supabase + admin = étape suivante.
- [x] **E-0** Scaffold app (config sans bloc turbopack), Geist, logos, globals
- [x] **E-1** App shell : sidebar desktop (rail Win11, accent actif), app bar (titre, recherche, switcher de pôle, notifications, avatar), bottom tab bar mobile, fond Mica
- [x] **E-2** Données + contexte : `lib/{types,brand,user,nav,data,format,pole-context}` ; primitives UI (`Surface` Mica, `StatCard`, `Progress`, `StatusPill`)
- [x] **E-3** Les 5 fonctionnalités GIRA (partie 04 du PDF) :
  - [x] Tableau de bord direction (KPIs, suivi temps réel, à-signer, activité, raccourcis)
  - [x] Suivi de chantier (`/chantiers` + `/chantiers/[id]` : avancement, étapes, photos, rapports)
  - [x] Carte interactive (`/carte` : marqueurs positionnés + liste synchronisée)
  - [x] Signature en ligne (`/documents` : liste, modale de signature sécurisée, statut tracé)
  - [x] Assistant de prise en charge (`/demandes` : fiches qualifiées objet/budget/localisation)
  - [x] Paramètres (`/parametres`) + Connexion (`/login`, maquette pré-Supabase)
- [x] Filtre par pôle (Tous / Construction / Assistance) transverse, mobile-first
- [ ] **E-4** Branchement Supabase (auth + données réelles) + espace administration

---

## Tâches terminées et validées

*Le client valide visuellement chaque ligne `[~]` ci-dessus pour qu'elle passe en `[x]` et migre ici.*

---

*Mise à jour automatique : éditer ce fichier à chaque clôture/validation.*


## Mise à jour 26/11/2026 (soir)
- [x] Courrier de remise des accès (`docs/REMISE_ACCES_GROUPE_SICA.docx`)
- [x] Construction : menu imposé, qui-sommes-nous, expertises A/B/C, solutions, agences, contact, données projets nettoyées, signature, sitemap/robots
- [x] Assistance : couleurs + coordonnées uniformes
- [x] Assistance : pages de contenu du PDF « Info à compléter » (refonte style batup, 26/11 nuit)
- [ ] Assistance : intégrer le modal fourni par le client pour IA SICA
- [ ] Assistance : vidéo / photos des bureaux, horaires, témoignages (à fournir)
- [ ] Assistance : supprimer les anciens `src/app/_sections/*` après validation
- [ ] Révoquer le jeton GitHub présent dans l'URL du dépôt local
- [ ] Vérifier/remplacer les photos du hero Construction si non SICA
