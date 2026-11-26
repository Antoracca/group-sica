> ## RÉVISION 3 — 26/11/2026 (prioritaire sur tout ce fichier)
>
> La refonte v2 décrite plus bas a été **rejetée** par le client (« générique, ça sent l'IA ») et **annulée** (`git stash` « refonte-v2-rejetee-2026-11-26 »).
> Règle désormais :
> 1. **On garde l'ancien site** (commit 954ba3a) : structure, sections, fond, forme, polices, animations, photos.
> 2. **Couleurs officielles imposées** : INDIGO `#0633B0` – BLANC – ORANGE `#F77F00`. Elles ont été appliquées par remappage de teinte (même clarté que les anciennes nuances) : `brand-royal` = indigo, `brand-amber` = orange, variables HSL `--brand-*` dans `packages/tokens/src/globals.css`.
> 3. **Corrections du DG** (PDF du 17/11/2026) appliquées sur le contenu : coordonnées uniformes, domaines `.com`, SARLU, aucun chiffre ni date non validés, pas de promesses absolues.
> 4. **Modèle de design fourni le 26/11** (dark, un accent principal + un secondaire, Inter 600/800, boutons arrondis 10 px, cartes 16 px, pills, surfaces plates + filets) : sert de **finition** uniquement. Correspondance : vert du modèle → orange SICA (action principale), bleu du modèle → indigo SICA (action secondaire, liens, onglets actifs). Ne jamais remplacer une section existante par un composant générique.
>
> Les sections 1 à 10 ci-dessous restent une référence de tokens, pas un plan de refonte.

---

---
version: 2.0
name: SICA-design-system
source: "Modèle « Binance-design-analysis » fourni par le client (structure, échelle, composants) + couleurs officielles imposées par GROUPE SICA (INDIGO – BLANC – ORANGE, document « 12 améliorations » du 17/11/2026)."
description: Interface corporate confiante, posée sur un canvas indigo-nuit profond, où l'ORANGE SICA porte chaque CTA principal, chaque accent de marque et chaque chiffre-preuve. L'INDIGO SICA est la couleur d'identité (logo, bandes signature, liens sur fond clair). Typo Inter (texte) + IBM Plex Sans tabulaire (chiffres) à graisses fermes. Pages vitrines en mode sombre ; pages transactionnelles (devis, simulateur, formulaires, espace client, pages documentaires longues) en mode clair, avec les mêmes CTA orange et les mêmes filets gris-bleu.

colors:
  # ── Couleurs officielles (logo, mesurées sur les PNG) ─────────────
  indigo: "#0633b0"            # INDIGO SICA — couleur d'identité
  orange: "#f77f00"            # ORANGE SICA — couleur d'action (= primary)
  white: "#ffffff"             # BLANC
  # ── Rôles (adaptation du modèle) ──────────────────────────────────
  primary: "#f77f00"           # remplace le jaune du modèle
  primary-active: "#de6f00"    # pressé / hover plus sombre
  primary-disabled: "#3a2a1a"  # CTA désactivé sur fond sombre
  on-primary: "#0a1033"        # texte encre sur orange (jamais blanc : contraste)
  indigo-active: "#05298f"
  indigo-soft: "#e8edfb"       # fond teinté indigo très léger (badges sur clair)
  indigo-bright: "#5b7cff"     # indigo éclairci, lisible sur fond sombre (liens/focus)
  ink: "#0a1033"               # texte fort sur clair (indigo quasi noir)
  body: "#e6e9f2"              # texte courant sur sombre
  body-on-light: "#0a1033"
  muted: "#6b7390"             # légendes, en-têtes de tableaux (clair ET sombre)
  muted-strong: "#9aa1bb"
  hairline-on-light: "#e4e7f0"
  hairline-on-dark: "#1c2560"
  border-strong: "#c9cedd"
  canvas-light: "#ffffff"
  canvas-dark: "#060a26"       # indigo-nuit — jamais noir pur
  surface-card-dark: "#0e1540"
  surface-elevated-dark: "#1c2560"
  surface-soft-light: "#f7f8fc" # footer clair + états désactivés
  surface-strong-light: "#eef0f7"
  on-dark: "#ffffff"
  status-up: "#0ecb81"         # chantier livré / avancement / variation +
  status-down: "#f6465d"       # incident / retard / variation −
  focus-ring: "#5b7cff"

typography:
  # Substituts open-source recommandés par le modèle : BinanceNova → Inter ; BinancePlex → IBM Plex Sans
  hero-display:   { fontFamily: "Inter", fontSize: 64px, fontWeight: 700, lineHeight: 1.07, letterSpacing: -1px }
  display-lg:     { fontFamily: "Inter", fontSize: 48px, fontWeight: 700, lineHeight: 1.07, letterSpacing: -0.5px }
  display-md:     { fontFamily: "Inter", fontSize: 40px, fontWeight: 600, lineHeight: 1.12, letterSpacing: -0.3px }
  display-sm:     { fontFamily: "Inter", fontSize: 32px, fontWeight: 600, lineHeight: 1.17, letterSpacing: 0 }
  title-lg:       { fontFamily: "Inter", fontSize: 24px, fontWeight: 600, lineHeight: 1.3 }
  title-md:       { fontFamily: "Inter", fontSize: 20px, fontWeight: 600, lineHeight: 1.35 }
  title-sm:       { fontFamily: "Inter", fontSize: 16px, fontWeight: 600, lineHeight: 1.4 }
  number-display: { fontFamily: "IBM Plex Sans", fontSize: 40px, fontWeight: 700, lineHeight: 1.1, letterSpacing: -0.3px, fontVariant: tabular-nums }
  number-md:      { fontFamily: "IBM Plex Sans", fontSize: 16px, fontWeight: 500, lineHeight: 1.4, fontVariant: tabular-nums }
  number-sm:      { fontFamily: "IBM Plex Sans", fontSize: 14px, fontWeight: 500, lineHeight: 1.4, fontVariant: tabular-nums }
  body-md:        { fontFamily: "Inter", fontSize: 14px, fontWeight: 400, lineHeight: 1.5 }   # 15–16px autorisé pour lecture longue (Assistance)
  body-sm:        { fontFamily: "Inter", fontSize: 13px, fontWeight: 400, lineHeight: 1.5 }
  caption:        { fontFamily: "Inter", fontSize: 12px, fontWeight: 500, lineHeight: 1.4 }   # plancher absolu : 12px
  button:         { fontFamily: "Inter", fontSize: 14px, fontWeight: 600, lineHeight: 1 }
  nav-link:       { fontFamily: "Inter", fontSize: 14px, fontWeight: 500, lineHeight: 1.4 }

rounded: { xs: 2px, sm: 4px, md: 6px, lg: 8px, xl: 12px, pill: 9999px, full: 9999px }

spacing: { xxs: 4px, xs: 8px, sm: 12px, md: 16px, lg: 24px, xl: 32px, xxl: 48px, section: 80px }

components:
  button-primary:            { bg: primary, text: on-primary, type: button, rounded: md, padding: 12px 24px, height: 44px }
  button-primary-active:     { bg: primary-active, text: on-primary }
  button-primary-disabled:   { bg: primary-disabled, text: muted }
  button-primary-pill:       { bg: primary, text: on-primary, rounded: pill, padding: 14px 32px }   # 1 seul par écran : « l'action »
  button-secondary-on-dark:  { bg: surface-card-dark, text: on-dark, border: hairline-on-dark, rounded: md }
  button-secondary-on-light: { bg: canvas-light, text: ink, border: hairline-on-light, rounded: md }
  button-indigo:             { bg: indigo, text: white, rounded: md }   # action secondaire forte sur clair (ex. « Parler à un conseiller »)
  button-tertiary-text:      { bg: transparent, text: body }
  text-link-on-dark:         { text: primary }
  text-link-on-light:        { text: indigo }                        # orange sur blanc = contraste insuffisant
  top-nav-dark:              { bg: canvas-dark, text: on-dark, height: 64px }
  top-nav-light:             { bg: canvas-light, text: ink, height: 64px, border-bottom: hairline-on-light }
  hero-band-dark:            { bg: canvas-dark, text: on-dark, type: hero-display, padding: 80px }
  stat-callout:              { bg: transparent, text: primary, type: number-display }
  trust-badge:               { bg: surface-card-dark, text: on-dark, type: title-sm, rounded: lg, padding: 16px 20px }
  data-table-card:           { bg: surface-card-dark, rounded: xl, padding: 24px }    # ex markets-table : projets, régimes fiscaux
  data-row:                  { padding: 12px 0, divider: hairline }
  feature-photo-card:        { bg: surface-card-dark, rounded: xl }                    # photos bord à bord
  promo-card:                { bg: surface-card-dark, rounded: xl, padding: 32px, type: title-md }
  signature-band:            { bg: canvas-dark, headline: primary, type: display-lg, padding: 80px }   # ex « FUNDS ARE SAFU »
  faq-row:                   { padding: 20px 0, divider: hairline, type: title-sm }
  cta-band-dark:             { bg: surface-card-dark, rounded: xl, padding: 48px, type: display-sm }
  cta-band-indigo:           { bg: indigo, text: white, rounded: xl, padding: 48px }   # variante identité, CTA orange dedans
  cookie-consent-card:       { bg: canvas-light, text: ink, type: body-sm, rounded: lg, padding: 16px }
  estimate-card:             { bg: canvas-light, text: ink, type: number-display, rounded: lg, padding: 24px }  # ex buy-crypto-amount-card
  steps-card:                { bg: canvas-light, text: ink, type: title-sm, rounded: lg, padding: 24px, border: hairline-on-light }
  text-input-on-light:       { bg: canvas-light, text: ink, border: hairline-on-light, rounded: md, padding: 10px 16px, height: 44px }
  search-input-on-dark:      { bg: surface-card-dark, text: on-dark, rounded: lg, padding: 10px 16px, height: 44px }
  footer-light:              { bg: surface-soft-light, text: body-on-light, padding: 64px }
---

# SICA — Système de design (v2, novembre 2026)

> **Ce fichier est la seule référence visuelle du projet.** Toute page, section ou composant des sites GROUPE SICA, SICA Construction et SICA Assistance doit s'y conformer. En cas de conflit avec un ancien commentaire de code, un ancien fichier mémoire ou l'ancienne charte de `docs/CONTEXTE.md` §3, **DESIGN.md gagne**.

> **SICA Assistance** a sa propre direction artistique (structure inspirée de batup.fr, couleurs SICA) : voir `apps/assistance/DESIGN.md`. Elle prime sur ce fichier pour `apps/assistance`.

## 0. D'où vient ce système

1. **Modèle structurel** : le client a fourni l'analyse de design d'une plateforme financière (canvas sombre, un seul accent qui porte toute la marque, typo ferme, chiffres tabulaires, surfaces plates séparées par la couleur, footer clair qui ferme la page). On en reprend **la structure, l'échelle, les composants et les règles**.
2. **Couleurs imposées** : le document « 12 améliorations » (17/11/2026) exige le *respect strict des couleurs officielles INDIGO – BLANC – ORANGE et du logo officiel*. Les valeurs ont été **mesurées sur les logos PNG** : indigo `#0633B0`, orange `#F77F00`.
3. **Ce qui manquait** (tons de surface, gris, filets, états, sémantique) est dérivé du modèle et teinté indigo pour rester dans la famille.

### Correspondance modèle → SICA

| Rôle dans le modèle | Valeur modèle | Valeur SICA | Commentaire |
|---|---|---|---|
| Accent unique (CTA, chiffres, titres-preuves) | jaune `#FCD535` | **orange `#F77F00`** | Même rôle, même rareté |
| Accent pressé | `#F0B90B` | `#DE6F00` | |
| Texte sur accent | noir `#181A20` | encre `#0A1033` | Orange + blanc = 2,9:1 → interdit. Orange + encre = 7,4:1 |
| Canvas sombre | `#0B0E11` | indigo-nuit `#060A26` | Le sombre devient indigo : la page entière parle SICA |
| Carte sombre | `#1E2329` | `#0E1540` | |
| Carte surélevée / filet sombre | `#2B3139` | `#1C2560` | |
| — (absent du modèle) | — | **indigo `#0633B0`** | Couleur d'identité : logo, bandes signature, liens sur clair, bouton secondaire fort |
| Canvas clair | `#FFFFFF` | `#FFFFFF` | BLANC officiel |
| Footer clair | `#FAFAFA` | `#F7F8FC` | Légère teinte indigo |
| Hausse / baisse | `#0ECB81` / `#F6465D` | identiques | Statuts chantier (livré / incident) et variations chiffrées uniquement |

## 1. Vue d'ensemble

L'atmosphère : **canvas indigo-nuit** (`#060A26`) portant un texte blanc et un accent unique omniprésent : **l'ORANGE SICA**. L'orange fait le travail lourd de la marque : chaque CTA principal (« Demander un devis », « Démarrer mon dossier »), chaque chiffre-preuve, chaque titre-signature (« L'exigence technique au service de vos constructions »). L'**INDIGO SICA** pur (`#0633B0`) est l'identité : il apparaît dans le logo, dans les bandes signature pleine largeur, comme couleur de lien et de bouton secondaire sur fond clair.

**Multi-thème selon l'intention** :
- **Sombre (vitrine)** : accueils Groupe / Construction / Assistance, pages expertises, réalisations, qui sommes-nous.
- **Clair (transactionnel / documentaire)** : devis, simulateurs, DQE, contact, agences, espace client E-SICA, pages de contenu juridique/fiscal longues d'Assistance (formes juridiques, impôts & taxes, gestion comptable), pages légales.
- Les CTA orange et les filets gris-bleu sont identiques dans les deux modes.

**Caractéristiques clés**
- Un seul accent d'action : orange. Il reste **rare** sur sombre (focal points) et devient le bouton évident sur clair.
- Typo **Inter** (titres + texte) + **IBM Plex Sans en chiffres tabulaires** (prix FCFA, surfaces, pourcentages, années, compteurs, références `SICA-DV-2026-0001`). Mélanger les deux sur un chiffre est une faute.
- **Footer clair sur page sombre** (`#F7F8FC`) : il ferme visuellement chaque page, sur les 3 sites.
- **Surfaces plates** : pas d'ombres lourdes, pas de glassmorphism, pas de dégradés d'ambiance (mesh, aurora, glow). La profondeur vient du saut canvas → carte.
- Rayons courts : 6 px boutons, 8 px champs et cartes de contenu, 12 px conteneurs, pilule réservée à « L'action » de la page.
- Rythme vertical : **80 px** entre bandes (`py-20` desktop ; 56 px mobile).

## 2. Couleurs

### Identité
- **Orange SICA** `#F77F00` — CTA principaux, chiffres-preuves (`stat-callout`), titres signature sur sombre, liens sur sombre, indicateur actif de navigation, puces de liste « ◆ » (comme dans le document Assistance).
- **Orange pressé** `#DE6F00` — état actif/pressé.
- **Indigo SICA** `#0633B0` — logo, `cta-band-indigo`, `button-indigo`, liens et titres d'accent sur clair, numéros d'étape sur clair, onglet actif sur clair.
- **Indigo éclairci** `#5B7CFF` — uniquement sur fond sombre quand l'indigo pur manque de contraste (lien secondaire, anneau de focus).

### Surfaces
- Sombre : `canvas-dark #060A26` → `surface-card-dark #0E1540` → `surface-elevated-dark #1C2560`.
- Clair : `canvas-light #FFFFFF` → `surface-soft-light #F7F8FC` (footer, zones alternées) → `surface-strong-light #EEF0F7` (fonds de champs en contexte atténué).

### Texte
- Sur sombre : titres `#FFFFFF`, courant `#E6E9F2`, secondaire `#9AA1BB`, légende `#6B7390` (≥ 12 px seulement).
- Sur clair : `ink #0A1033` pour titres et courant, `#6B7390` pour légendes, `#0633B0` pour liens.

### Filets
- Sur clair `#E4E7F0`, sur sombre `#1C2560`, renforcé `#C9CEDD`. Le système utilise beaucoup de filets 1 px (tableaux, FAQ, listes de pièces).

### Sémantique
- `status-up #0ECB81` : chantier livré, étape franchie, variation positive. Texte ou petite pastille, **jamais fond de carte**.
- `status-down #F6465D` : incident, retard, champ en erreur. Même règle.

### Contraste (WCAG 2.1 AA vérifié)
- Encre sur orange 7,4:1 ✓ — Blanc sur indigo 8,9:1 ✓ — Blanc sur canvas-dark 19:1 ✓ — Orange sur canvas-dark 7,0:1 ✓ — `#9AA1BB` sur canvas-dark 7,6:1 ✓ — `#6B7390` sur blanc 4,7:1 ✓.
- **Interdits** : texte blanc sur orange ; texte orange sur blanc pour du corps de texte (2,6:1) — l'orange sur blanc n'est autorisé que pour des éléments graphiques (puces, filets, icônes ≥ 24 px) et des chiffres display ≥ 32 px gras.

## 3. Typographie

- **Inter** (variable, `next/font/google`, `--font-display` et `--font-body`) — titres, paragraphes, boutons, navigation.
- **IBM Plex Sans** (400/500/600/700, `--font-num`) + `font-variant-numeric: tabular-nums` — tous les nombres mis en valeur. Classe utilitaire : `font-num tabular-nums`.
- **IBM Plex Mono** (`--font-mono`) — références de dossier/devis, eyebrows techniques en capitales espacées. Usage parcimonieux.

| Token | Desktop | Mobile (< 768) | Graisse | Usage |
|---|---|---|---|---|
| hero-display | 64 px / 1.07 / −1 px | 36–40 px (`clamp`) | 700 | H1 d'accueil |
| display-lg | 48 px | 32 px | 700 | Titre-signature, H1 de page intérieure |
| display-md | 40 px | 28 px | 600 | Titres de section longues pages |
| display-sm | 32 px | 24 px | 600 | Bandes CTA |
| title-lg | 24 px | 20 px | 600 | Sous-sections |
| title-md | 20 px | 18 px | 600 | Titres de cartes |
| title-sm | 16 px | 16 px | 600 | FAQ, badges, étapes |
| number-display | 40 px | 32 px | 700 | Chiffres-preuves (Plex) |
| body-md | 14–16 px / 1.5–1.6 | 15–16 px | 400 | Texte courant |
| caption | 12 px | 12 px | 500 | Méta, légendes (plancher 12 px) |

Règle : on ne descend **jamais** la graisse display sous 600. Pas de texte < 12 px.

## 4. Mise en page

- Base 4 px. Tokens 4 / 8 / 12 / 16 / 24 / 32 / 48 / 80.
- Container max **1280 px** (vitrine), **1440 px** (tableaux denses : DQE, espace client). Gouttières `clamp(16px, 4vw, 48px)`.
- Grille 12 colonnes ; pages produit en 8/4 (contenu + rail latéral collant : résumé devis, sommaire juridique).
- Gouttières de cartes 24 px ; listes denses 16 px.
- Footer : 4 à 6 colonnes desktop → 2 tablette → 1 mobile (accordéon autorisé).
- Densité : on assume une page dense (tableaux, FAQ, listes de pièces) ; la séparation vient du contraste, pas du blanc.

## 5. Profondeur

| Niveau | Traitement | Usage |
|---|---|---|
| Plat | rien | sections, header, hero, footer |
| Filet | 1 px hairline | champs, tableaux, FAQ, boutons secondaires |
| Carte | saut de surface (canvas → card), sans ombre | toutes les cartes |
| Ombre légère | `0 8px 24px rgba(6,10,38,.08)` | uniquement carte d'estimation posée sur image, menus déroulants |
| Focus | `0 0 0 2px #5B7CFF` (ou `outline 2px offset 2px`) | clavier, champs, boutons |

Exception décorative unique autorisée : **dégradé vertical orange → canvas-dark** pour un hero d'événement/lancement (ex. lancement Devis IA). Jamais généralisé.

## 6. Formes

6 px boutons et champs · 8 px cartes de contenu, badges, champs de recherche · 12 px conteneurs (tableaux, bandes CTA, cartes photo) · pilule : le CTA « L'action » du hero et rien d'autre · cercle : avatars, pastilles de statut.

Photos : rognées en 12 px, **uniquement photos authentiques SICA** (chantiers, équipes, bureaux). Une photo libre de droits ne doit **jamais** être présentée comme un chantier SICA (exigence n°4 du client) ; si utilisée en ambiance, pas de légende « projet ».

Iconographie : **Lucide** (trait 1.5–2 px), monochrome (blanc / muted / orange pour l'actif). Pas d'emoji. Pas de pack d'icônes génériques mélangés.

## 7. Composants

### Navigation
- **`top-nav-dark`** (vitrine) : 64 px, `canvas-dark`, logo officiel à gauche, menu principal, à droite liens inter-sites discrets + bouton `button-primary` (« Demander un devis » / « Démarrer mon dossier » / « Espace client »). Au scroll : fond solide `canvas-dark` + filet bas `hairline-on-dark` ; masquage au scroll bas, réapparition au scroll haut (`prefers-reduced-motion` respecté).
- **`top-nav-light`** (transactionnel) : même structure, fond blanc, texte encre, filet bas.
- **Barre inter-sites** (au-dessus, 32 px, `surface-card-dark`, caption 12 px) : GROUPE SICA · SICA Construction · SICA Assistance — l'entité courante marquée, les autres en lien. Exigence du client : distinguer clairement les entités.
- Mobile < 1024 : burger → feuille plein écran sombre, CTA orange ancré en bas de feuille.

### Boutons
`button-primary` (orange, texte encre, 6 px, 44 px de haut) · `button-primary-pill` (une fois par page) · `button-secondary-on-dark` · `button-secondary-on-light` · `button-indigo` · `button-tertiary-text`. Cibles tactiles ≥ 44 px.

### Cartes et blocs
- **`hero-band-dark`** : H1 hero-display, sous-titre body 16–18 px `#E6E9F2`, paire de CTA (primary + secondary-on-dark), à droite un module utile (carte d'estimation, sélecteur de profil, photo authentique).
- **`stat-callout`** : chiffres orange en Plex, libellé muted dessous. **Uniquement chiffres validés par la Direction** (sinon ne pas afficher).
- **`trust-badge`** : petites cartes sombres « RCCM CI-ABJ-03-2020-B13-17592 », « Abidjan & Yamoussoukro », « Notaire agréé », etc.
- **`data-table-card`** (ex markets-table) : tableau sombre à onglets — utilisé pour les réalisations (Projet / Type / Localisation / Année / Statut), les régimes fiscaux (Régime / Seuil CA / Taux / TVA), les formes juridiques (Forme / Associés / Capital min. / Responsabilité).
- **`data-row`** : 12 px vertical, filet entre lignes, chiffres en Plex, statut coloré `status-up/down`.
- **`feature-photo-card`** : photo bord à bord, 12 px, légende en dessous.
- **`promo-card`** : carte 32 px de padding, titre title-md, texte, CTA.
- **`signature-band`** : bande sombre, titre display-lg orange (« L'exigence technique au service de vos constructions. »), trois `stat-callout` dessous.
- **`faq-row`** : accordéon, chevron à droite, filet.
- **`cta-band-dark` / `cta-band-indigo`** : bande pré-footer, titre display-sm + CTA à droite.
- **`steps-card`** : étapes numérotées (numéro orange en Plex), utilisées pour le processus construction (7 étapes) et les formalités Assistance.
- **`estimate-card`** (clair) : montant en number-display, hypothèses, validité, bouton primary.
- **`checklist`** (clair, Assistance) : listes de pièces à fournir, puces losange orange `◆` en SVG (pas d'emoji), 2 colonnes desktop.

### Formulaires
`text-input-on-light` 44 px, filet, focus indigo-bright ; label au-dessus, aide en caption, erreur en `status-down`. Champ fichier (plans PDF) : zone pointillée hairline, limites de taille et formats affichées.

### Footer
**`footer-light`** sur les 3 sites : fond `#F7F8FC`, colonnes (Entité · Services · Ressources · Groupe SICA · Contact), coordonnées uniformes, mentions RCCM, liens légaux. Logo officiel couleur.

## 8. À faire / À ne pas faire

**À faire**
- Réserver l'orange aux actions et aux preuves. Sa rareté fait sa force.
- Garder `button-primary` (orange + encre) identique en sombre et en clair.
- Choisir le mode selon l'intention : sombre = montrer, clair = remplir / lire longtemps.
- Mettre tous les nombres en Plex tabulaire.
- Coordonnées, noms de services et formulations **identiques sur toutes les pages** (exigence n°11).
- Chaque section ancrée sur le rythme 80 px.

**À ne pas faire**
- Introduire une troisième couleur de marque (pas de vert, violet, jaune décoratif).
- Mettre du texte blanc sur orange, ou du texte courant orange sur blanc.
- Utiliser `status-up/down` comme fond de carte ou pour « confirmer/annuler ».
- Adoucir les titres (< 600).
- Dégradés d'ambiance, glow, mesh, glassmorphism, ombres lourdes.
- Photos génériques présentées comme chantiers SICA ; chiffres non validés (nombre de projets, années, effectifs, taux de satisfaction).
- Promesses absolues (« zéro défaut », « 100 % garanti ») : remplacer par des engagements mesurables.
- Emoji, icônes non Lucide, texte IA boilerplate.

## 9. Responsive

| Nom | Largeur | Changements |
|---|---|---|
| Mobile | < 768 | burger ; hero 36–40 px ; tableaux → cartes empilées ; grilles 1 colonne ; footer 1–2 colonnes ; barre CTA mobile fixe (Devis · Appeler) |
| Tablette | 768–1024 | nav serrée, items secondaires dans « Plus » ; grilles 2 colonnes |
| Desktop | 1024–1440 | nav complète ; tableaux complets ; 8/4 |
| Large | > 1440 | container plafonné 1280/1440, marges croissantes ; testé jusqu'à 2560 |

Cibles tactiles ≥ 44 px. Le gros chiffre du hero rétrécit (`clamp`) au lieu de passer à la ligne. Le footer clair reste pleine largeur à toutes tailles.

## 10. Implémentation (code)

- Tokens : `packages/tokens/src/colors.ts` + variables CSS `packages/tokens/src/globals.css`.
- Classes Tailwind (preset `packages/config/tailwind-preset.ts`) :
  - Couleurs : `bg-canvas-dark`, `bg-surface-card-dark`, `bg-surface-elevated-dark`, `bg-canvas-light`, `bg-surface-soft-light`, `bg-surface-strong-light`, `text-ink`, `text-body` (courant sur sombre), `text-muted-foreground` (légende #6B7390), `text-muted-strong` (secondaire sur sombre), `border-hairline`, `border-hairline-dark`, `bg-sica-orange`, `bg-sica-indigo`, `text-sica-orange`, `text-sica-indigo`, `text-indigo-bright`, `text-status-up`, `text-status-down`.
  - Compatibilité : `brand-royal` pointe désormais sur l'indigo officiel `#0633B0`, `brand-amber` sur l'orange officiel `#F77F00` (l'ancien code reste cohérent).
  - Typo : `font-display`, `font-body` (Inter), `font-num` (IBM Plex Sans), `font-mono` (IBM Plex Mono) ; tailles `text-hero`, `text-display-lg`, `text-display-md`, `text-display-sm`, `text-title-lg`, `text-title-md`, `text-title-sm`, `text-num-display`.
  - Rayons : `rounded-sm` 4, `rounded-md` 6, `rounded-lg` 8, `rounded-xl` 12.
  - Rythme : `py-section` (80 px), `py-section-sm` (56 px).
- Composants partagés : `packages/ui` (`Button` variantes `primary | pill | secondary-dark | secondary-light | indigo | ghost`, `Container`, `SiteHeader`).

## 11. Guide d'itération

1. Un composant à la fois, en citant son token (`{component.data-table-card}`).
2. Nouveau composant : décider d'abord sombre (vitrine) ou clair (transactionnel).
3. Variantes (`-active`, `-disabled`) = entrées séparées.
4. Tout nombre en Plex ; tout texte en Inter.
5. `status-up/down` = statuts chantier et variations chiffrées, rien d'autre.
6. Toute donnée affichée est sourcée (`docs/CONTEXTE.md`, PDF client) ou marquée « à confirmer par la Direction » côté code (jamais visible en prod sans validation).
