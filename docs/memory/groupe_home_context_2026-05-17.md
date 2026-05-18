# Contexte `apps/groupe` - Snapshot du 2026-05-17

## Entrée Home
- Fichier: `apps/groupe/src/app/page.tsx`
- Ordre des blocs rendu:
1. `SiteHeader` (brand groupe, logo agrandi via `imgClassName`)
2. `Hero` (avec `HeroVideo` + `AnimatedHeroTitle`)
3. `HeroActionPanel` (panneau flottant onglets + mini-form)
4. `Pillars`
5. `Stats`
6. `Realisations`
7. `News`
8. `Testimonials`
9. `CtaBand`
10. `Footer`

## Sections Home (détail)

### 1) Header
- Fichier nav: `apps/groupe/src/lib/nav.ts`
- Liens principaux: Le Groupe, Construction, Assistance, Réalisations, Actualités, Carrières, Contact.
- `Construction` est centralisé vers `links.construction.base`.

### 2) Hero
- Fichiers:
  - `apps/groupe/src/app/page.tsx` (`Hero()`)
  - `apps/groupe/src/app/_sections/hero-video.tsx`
  - `apps/groupe/src/app/_sections/animated-hero-title.tsx`
- Contenu: vidéo de fond `/hero.mp4` + poster `/hero-poster.jpg`, overlay sombre, titre animé phrase par phrase.

### 3) HeroActionPanel
- Fichier: `apps/groupe/src/app/_sections/hero-action-panel.tsx`
- 4 onglets: Client, Devis Construction, Conseil Assistance, Réalisations.
- Chaque onglet a un mini formulaire 2 champs + bouton flèche.
- Actions:
  - Construction -> `links.construction.devis`
  - Assistance -> `https://sicaassistance.ci/contact`
  - Réalisations -> `/realisations`
  - Client -> `/espace-client`

### 4) Pillars
- Fichier: `apps/groupe/src/app/_sections/pillars.tsx`
- Section éditoriale split Construction / Assistance.
- Lotties chargées dynamiquement:
  - `/Construction Animation.lottie`
  - `/Costumer Support.lottie`
- CTA Construction -> `links.construction.base`.

### 5) Stats
- Fichier: `apps/groupe/src/app/_sections/stats.tsx`
- Section KPI premium:
  - fond image blueprint `/plan-ouverture-architecte-recolte.avif`
  - particules canvas interactives
  - animation rideau diagonal
  - compteurs (6, 150+, 2, 500+)

### 6) Réalisations (home showcase)
- Fichier: `apps/groupe/src/app/_sections/realisations.tsx`
- 11 projets définis en dur, avec carrousel/rotation et mosaïque d’images.
- Assets `public/projets/*.jpg` utilisés.
- CTA vers `/realisations`.

### 7) News
- Fichier: `apps/groupe/src/app/_sections/news.tsx`
- 3 cartes actualités (contenu statique) + lien `/actualites`.

### 8) Testimonials
- Fichier: `apps/groupe/src/app/_sections/testimonials.tsx`
- 2 témoignages statiques Construction/Assistance.

### 9) CTA Band
- Fichier: `apps/groupe/src/app/_sections/cta-band.tsx`
- CTA principal vers `links.construction.devis`, secondaire `/contact`.

### 10) Footer
- Fichier: `apps/groupe/src/components/footer.tsx`
- Colonnes:
  - marque + adresses
  - navigation groupe
  - navigation informations
  - pôles + contact direct
- Pôle construction relié à `links.construction.base`.

## Pages annexes détectées
- `apps/groupe/src/app/realisations/page.tsx` (placeholder éditorial actuel)

## Config / liens
- `apps/groupe/src/lib/links.ts`
  - `construction.base` = `NEXT_PUBLIC_CONSTRUCTION_URL` sinon `http://localhost:3001`
  - `construction.devis` = `${construction.base}/devis`

## Assets notables dans `public`
- Logos:
  - `/logo-groupe.png`
  - `/logo-construction.png`
  - `/logo-assistance.png`
- Hero media:
  - `/hero.mp4`
  - `/hero-original.mp4`
  - `/hero-poster.jpg`
- Lottie:
  - `/Construction Animation.lottie`
  - `/Costumer Support.lottie`
- Projets:
  - 33 images (`11 projets x 3 vues`) dans `/public/projets`

## Point d’attention actuel
- Beaucoup de texte est encore hardcodé dans les sections.
- Certaines routes de navigation existent côté UI mais pas encore implémentées côté pages (`/actualites`, `/carrieres`, `/contact`, etc. selon état actuel).

## Mise à jour navigation (2026-05-17, soirée)
- Header aligné sur le pattern Vinci demandé:
  - entrée `Corporate` avec sous-menu déroulant desktop au survol
  - bandeau dropdown descendant sous la navbar
  - sous-liens en style ligne (barre verticale + flèche), sans cartes
  - suppression du fond blanc, rendu en continuité transparente/bleutée du header
- Version mobile adaptée:
  - `Corporate` en accordéon dans le drawer
  - sous-liens accessibles sans surcharge visuelle
- Fichiers impactés:
  - `packages/ui/src/components/site-header.tsx`
  - `apps/groupe/src/lib/nav.ts`
