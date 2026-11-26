# DESIGN.md — SICA ASSISTANCE (révision 2, 26/11/2026)

> Direction artistique demandée par le client : **reprendre la mise en page, le rythme et les effets de www.batup.fr**
> (hero vidéo plein écran, navigation en pilule flottante, panneaux arrondis empilés, sections sombres arrondies,
> bandeau défilant, FAQ en accordéon, footer sombre arrondi).
> **Ce qu'on reprend** : la structure, les proportions, les rayons, les ombres, la typographie, les animations.
> **Ce qu'on ne reprend jamais** : leurs textes, leurs photos, leurs vidéos, leur logo, leurs couleurs violettes,
> leurs chiffres et témoignages. Le contenu vient uniquement du PDF « Info à compléter site web » du DG
> (`docs/Info à completer site web.pdf`) et des coordonnées officielles (`INSTRUCTIONS.md` §2).

---

## 1. Couleurs (imposées, non négociables)

| Rôle | Valeur | Classe Tailwind |
|---|---|---|
| Indigo SICA (marque, fonds sombres teintés, liens) | `#0633B0` | `brand-royal`, `brand-royal-700`, `brand-royal-900` |
| Orange SICA (action principale, mot mis en avant dans les titres) | `#F77F00` | `brand-amber`, `brand-amber-600` |
| Blanc | `#FFFFFF` | `white` |
| Encre (texte, sections sombres) | variable `--ink` | `ink` |
| Gris texte | variable `--slate` | `slate` |
| Fond gris clair des sections alternées | variable `--paper` / `--mist` | `paper`, `mist` |

Équivalences avec la référence :
- leur violet lavande du mot mis en avant → **orange SICA** ;
- leur bouton violet plein → **bouton orange plein** (texte encre) ;
- leurs panneaux pastel (bleu, vert, violet) → **teintes d'indigo** (`brand-royal/[0.05]`, `/[0.08]`), **teinte orange** (`brand-amber/[0.07]`) et **indigo plein** pour le dernier panneau ;
- leur noir violacé `#17141F` → **indigo très profond** `brand-royal-900` mélangé à `ink`.

## 2. Typographie et titres (révision 2)

Trois polices, chargées par `next/font` (`src/lib/fonts.ts`) :
- **Titres** : **Bricolage Grotesque** 800 (classe `f-titre`), `leading-[0.98]`, `tracking-[-0.035em]`.
  - H1 hero : `clamp(2.6rem, 6vw, 5rem)`, centré, blanc.
  - H2 de section : `clamp(2.35rem, 5vw, 4.3rem)`, **aligné à gauche** (centré seulement pour la FAQ).
- **Mot mis en avant** : **Instrument Serif italique**, orange SICA, `1.08em` (composant `Em`).
- **Corps** : Geist 400, 16–18 px, `text-slate`, largeur max 40 rem.

Sur-titres (composant `Kicker`, `src/components/titres.tsx`) :
- **Interdit** (refusé par le client, « ça fait trop IA ») : pilule transparente centrée avec icône, petits sur-titres discrets, **toute numérotation** (01, 02…, grands numéros en filigrane, « 1. », « 2. »).
- **À la place** : une **bannière orange** en ruban (bouts entaillés, légèrement inclinée, ombre indigo décalée), texte en Bricolage Grotesque 800 capitales, `clamp(1.05rem, 2.5vw, 2.15rem)`, couleur `#0A1130`, suivie d'une petite flèche tracée à la main.

Dessins SVG propres à SICA (`src/components/titres.tsx`) :
- `Trait` : soulignement orange tracé à la main, qui se dessine à l'apparition.
- `SicaDots` : logo redessiné, les 10 points **avec « SICA » écrit dedans et « ASSISTANCE » dessous** (règle : partout où le logo est tracé, le nom y figure).
- **Refusés par le client** (retirés) : tampon circulaire qui tourne, quadrillage et lignes pointillées en fond, liserés orange en haut des cartes.

Présentation des contenus (retours du 26/11, nuit) :
- **Éviter les cartes** pour présenter les parties : contenus posés directement sur le fond (typographie, espaces, icônes Lucide sans pastille).
- **Pas de numérotation des étapes** : composant `Parcours` (`src/components/parcours.tsx`), titres en Bricolage précédés d'une flèche orange (droite sur grand écran, bas sur mobile), texte en dessous, sans cadre.
- Peu de couleurs par section : blanc + indigo, l'orange seulement pour l'élément actif ou le mot mis en avant.

## 3. Formes, rayons, ombres

| Élément | Rayon | Ombre |
|---|---|---|
| Boutons | pilule (`rounded-full`), hauteur 44–48 px | orange : `shadow-[0_8px_24px_-8px_rgba(247,127,0,.55)]` |
| Navigation | pilule flottante sombre, `rounded-2xl`, flou d'arrière-plan | `shadow-xl` |
| Panneaux empilés | `rounded-[32px]` | `shadow-[0_30px_80px_-40px_rgba(6,51,176,.35)]` |
| Sections sombres (simulateur, formalités, CTA, footer) | `rounded-[28px]` encastrées avec 12–16 px de marge latérale | aucune |
| Cartes | `rounded-3xl`, bordure `slate-200/70`, fond blanc | `shadow-sm` |
| Puces flottantes sur photo | `rounded-2xl`, fond blanc 95 %, flou | `shadow-lg` |

## 4. Sections de l'accueil (ordre, calqué sur la référence)

1. **Bandeau supérieur** fin : « Formalités, comptabilité, fiscalité · Abidjan et Yamoussoukro ».
2. **Navigation** en pilule sombre flottante : logo, menu (Accueil, Création, Modification, Formes juridiques, Gestion, Impôts & taxes), « Contact » et bouton blanc « Démarrer mon dossier ».
3. **Hero plein écran** : photo réelle du bureau SICA (DG au bureau) avec léger zoom lent (Ken Burns) à la place de la vidéo, voile sombre + halo radial ; H1 centré dont la fin **change toutes les 2,6 s** (« sans courir les guichets. », « sous 30 jours. », « en toute conformité. », « avec un seul cabinet. »), entrée tour à tour par la gauche, la droite, le haut et le bas ; deux boutons (orange plein / contour blanc) ; **pas de pilule ni de ligne RCCM** (retirées à la demande du client) ; **maquette d'un suivi de dossier** qui déborde en bas du hero (équivalent de leur capture logiciel).
4. **Constat** (« Entreprendre est un métier. Les formalités en sont un autre. ») : trois cartes visuelles avec puce flottante (pièces à réunir, guichets, déclarations).
5. **Panneaux empilés** (`position: sticky`, chaque panneau recouvre le précédent au défilement) : Création · Modification · Gestion comptable, fiscale et sociale · Impôts & taxes. Sous les panneaux, une **carte d'appel bien visible** (« Un dossier à lancer ? Parlons-en. ») avec « Démarrer mon dossier » et le téléphone.
6. **Phrase manifeste** centrée : « Votre entreprise évolue. Vos statuts aussi. »
7. **Interlocuteurs** posés sur fond blanc, sans carte : grande icône Lucide indigo + nom en Bricolage (équivalent de leurs intégrations) : DGI / e-Impôts, CEPICI, Greffe (RCCM), CNPS / e-CNPS, Notaire agréé, Banque — icônes Lucide, aucun logo d'institution.
8. **Formes juridiques** dans un grand cadre **indigo uni arrondi**, sans carte ni quadrillage : **index typographique** (sigles EI, SARL, SA, SAS, SCI, SNC · SCS en Instrument Serif droit, grand, blanc atténué ; le sigle actif en orange) et, à côté, la fiche du sigle choisi (nom en Bricolage, Associés / Capital / Responsabilité / Idéal pour) directement sur le fond. « OHADA » géant en contour blanc en bas, avec assez d'espace pour être lu (`src/app/_accueil/formes-explorer.tsx`).
9. **Section sombre « formalités »** avec onglets Création / Modification : les 6 étapes du PDF en `Parcours` (sans carte ni numéro).
10. **Bandeau défilant** des repères du PDF, dans la carte sombre « Les règles ivoiriennes, on les applique chaque jour » : **deux lignes en sens opposés**, texte en grand directement sur le fond, alternance plein / contour, **sans pastilles ni points orange**.
11. **Tuiles « L'essentiel »** + deux grandes cartes d'appel (rendez-vous avec photo réelle de la direction, simulateur).
12. **FAQ** en accordéon sur fond gris.
13. **CTA final** sombre arrondi.
14. **Footer** sombre arrondi encastré.

Sections de la référence **volontairement absentes** tant que la Direction ne fournit pas de matière réelle :
étude de cas client, témoignages, note Google, tarifs, articles de blog. Les emplacements sont prévus (voir §7).

## 5. Pages intérieures

Gabarit `components/assistance-page.tsx` :
- hero sombre centré (photo réelle + voile), bannière orange, H1 avec mot orange, intro, boutons ;
- blocs alternés blanc / gris, sans numérotation ;
- cartes `rounded-3xl`, listes à puces orange, encadrés indigo pour les pièces à fournir ;
- section sombre arrondie pour les étapes ;
- CTA final sombre arrondi.

Pages (contenu repris fidèlement du PDF) :
- `/creation-entreprise` — but de la création, pièces à fournir, 5 étapes de formalités (actes, DGI, immatriculations, Impôts, CNPS).
- `/modification-entreprise` — but de la modification, 6 motifs fréquents, pièces et étapes.
- `/formes-juridiques` — EI, SARL/SARLU, SA, SAS/SASU, SCI, SNC/SCS.
- `/gestion` — gestion comptable (SYSCOHADA), fiscale (DGI), sociale (CNPS) + prestations du cabinet (tenue, états financiers, FNE, business plan, accompagnement).
- `/impots-et-taxes` — particuliers (ITS, CN, IGR), entreprises (IS, IMF, TVA), régimes TEE / RME / RSI / RNI, fonciers, CNPS.

## 6. Mouvement

- Hero : zoom lent de l'image (`scale 1 → 1.08` sur 20 s, alterné), désactivé si `prefers-reduced-motion`.
- Apparition des blocs : fondu + translation 16 px (déjà fourni par `motion`).
- Panneaux empilés : CSS `sticky` uniquement, aucune bibliothèque.
- Bandeau défilant : 60 s, deux sens (`sica-marquee`, `sica-marquee-droite`), pause au survol.
- Mots rotatifs du hero : 2,6 s, entrées `sica-in-gauche` → `sica-in-droite` → `sica-in-haut` → `sica-in-bas`.
- Trait SVG qui se dessine (`sica-trace`), bras du bonhomme qui salue (`sica-salut`).
- **Toutes** ces animations sont coupées si `prefers-reduced-motion`.

## 7. Images et vidéo

- **Photos autorisées** (réelles, SICA) dans `public/media/` : `direction-bureau.jpeg`, `equipe-bureau.jpeg`, `equipe-bureau-2.jpeg`, `partenariat.jpeg`, `inauguration.jpeg`.
- **Interdit** : photos de banque d'images présentées comme SICA, images ou vidéos de batup.fr.
- **Vidéo du hero** : le composant accepte une vidéo (`/media/hero-assistance.mp4`, muette, en boucle, avec affiche). Dès que la Direction fournit une vidéo réelle des bureaux (10–20 s, 1920×1080, < 8 Mo), il suffit de déposer le fichier : la photo devient l'affiche.
- **À fournir par la Direction** pour compléter le modèle : vidéo des bureaux, témoignages clients autorisés (nom, activité, ville), étude de cas chiffrée, horaires, numéro WhatsApp.

## 8. Accessibilité et responsive

- Contraste AA partout (texte blanc sur voile ≥ 60 % d'opacité).
- Cibles tactiles ≥ 44 px, navigation mobile en tiroir plein écran.
- Testé à 375 et 1440 px, aucun défilement horizontal.

## 9. Assistant « IA SICA »

- Composant `src/components/assistant-sica.tsx`, monté dans `layout.tsx` (toutes les pages).
- Un **petit bonhomme SICA** (SVG : tête indigo, antenne et corps orange, bras qui salue) **sort de derrière un petit bandeau blanc** en bas à droite **quand le visiteur descend la page** (après le hero). Quand il **remonte**, le bonhomme se cache derrière le bandeau en laissant dépasser le haut de la tête, comme s'il épiait. Bulle : « IA SICA · Posez vos questions ».
- Au clic : fenêtre de discussion (85 % de la hauteur sur mobile, 400 × 620 px sur grand écran), fermeture par Échap ou clic à côté, suggestions de questions.
- **Réponses tirées uniquement des fiches du site** (`src/lib/assistant.ts`). Si rien ne correspond : renvoi vers un conseiller (téléphone et e-mail officiels). Mention « à titre indicatif ».
- Pas encore branché sur un vrai modèle d'IA. Le client a annoncé fournir son propre modal : il remplacera la fenêtre actuelle en gardant le lanceur.
- Sur mobile, le lanceur reste au-dessus de la barre d'appel collante (`bottom-20`).

## 10. Révision du 26/11 (fin de soirée)

- **Bandeau supérieur** : plus de point orange devant « Formalités, comptabilité, fiscalité ».
- **Hero — suivi de dossier animé** (`src/app/_accueil/suivi-dossier.tsx`) : plus de mention « Exemple illustratif ». Frise des 6 étapes du PDF reliée par une ligne (pointillés gris → trait indigo qui se remplit), une icône Lucide par étape, une seule étape orange à la fois (« En cours »), barre et pourcentage d'avancement, documents qui se débloquent quand l'étape qui les délivre est terminée (statuts, RCCM, IDU, DFE, CNPS). 0,9 s par étape, pause de 2,2 s quand tout est terminé, puis reprise. Fixe si `prefers-reduced-motion`.
- **Formes juridiques** : les noms complets sont affichés en permanence à côté des sigles (colonnes alignées) ; une pilule orange scintillante « Clique pour comprendre » (main qui tapote, onde) se place sur la forme suivante tant que le visiteur n'a pas cliqué, puis au survol. Sur mobile, elle passe sous le sigle et un clic fait défiler jusqu'à la fiche.
- **Assistant** : le nom affiché est **« SICA ASSISTANCE »** (plus « IA SICA »). Accueil en deux messages : salutation selon l'heure (« Bonjour » / « Bonsoir ») et « Comment allez-vous aujourd'hui ? », puis proposition d'aide avec exemples. Réponses de politesse (ça va, merci, bonjour, au revoir) sans passer par les fiches. Sous-titre : « Assistant en ligne · réponses immédiates » (on ne prétend pas qu'un humain répond).

## 11. Hero — suivi de dossier, version 3 (26/11, nuit)

Remplace la frise de la section 10 (jugée trop générique, trop bleue, trop rapide).

- **Bande blanche pleine largeur** sous les boutons du hero, sans cadre ni contour : fond « blanc métal » (`#FFFFFF → #F4F5F7 → #FFFFFF`). Son bord haut se fond dans la photo du hero (voile blanc dégradé + léger flou masqué), pour un effet immersif.
- **Un seul écran, une seule piste horizontale** qui glisse comme une vidéo (`transform` GPU, 1,25 s, courbe douce). Chaque étape est un bloc unique : texte à gauche, pièces traitées à droite, donc tout bouge ensemble, sans décalage. Le contenu arrive un peu après la piste (effet de profondeur).
- **Ordre en boucle** : plan final d'abord (6 s), puis les 6 étapes du document du DG (3,3 s chacune), puis de nouveau le plan final, etc. Retour au début sans saut (le plan final existe en double en début et fin de piste).
- **Nom de l'étape en ruban**, même famille que les sur-titres « LE CONSTAT » : ruban bleu (ombre bleu nuit décalée), qu'une jauge orange doux `#FDAE5C` remplit rapidement de gauche à droite ; le texte passe du blanc au bleu nuit au passage de la jauge. Pas de barre de progression.
- **Plan final** : photo d'une femme souriante qui lève le pouce (léger zoom arrière), « Prise en charge terminée. » mot à mot (Bricolage), petit trait orange, « Merci pour votre confiance. » (Instrument Serif italique).
- **Photo** : `public/media/prise-en-charge-terminee-clair.jpg` est un **visuel d'illustration généré**, pas une cliente réelle. À remplacer par une vraie photo (cliente ou collaboratrice SICA, avec accord) dès que possible.
- `prefers-reduced-motion` : plan final fixe, sans boucle.

