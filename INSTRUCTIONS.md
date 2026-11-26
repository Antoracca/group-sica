# INSTRUCTIONS — Plateforme GROUPE SICA (à lire en premier, à chaque session)

> Fichier de pilotage. Ordre de lecture : **INSTRUCTIONS.md → DESIGN.md → docs/CONTEXTE.md → docs/TASKS.md**.
> Mis à jour à chaque fin de partie de travail (journal en bas).

## 1. Règles non négociables

1. **Langue** : français partout (UI, commentaires, commits, réponses).
2. **Nom** : toujours **SICA** (jamais « SIKA »).
3. **Design** : **garder l'ancien site** + `DESIGN.md` révision 3 (en tête du fichier). Couleurs officielles imposées par le client : **INDIGO `#0633B0` – BLANC `#FFFFFF` – ORANGE `#F77F00`** (mesurées sur les logos). Le modèle de design fourni sert uniquement de finition (orange = action principale, indigo = action secondaire) ; on ne remplace jamais une section existante.
4. **Contenu sourcé uniquement** : rien d'inventé. Sources : `docs/CONTEXTE.md` §2, les 3 PDF de `docs/` (nov. 2026), le dossier technique. Chiffres (nombre de projets, années, effectifs, taux) **uniquement si validés par la Direction**, sinon on ne les affiche pas.
5. **Photos** : jamais une photo générique présentée comme un chantier SICA. Photos réelles SICA : `apps/groupe/public/projets/*`, `imagesAll/`.
6. **Pas d'emoji, pas d'icônes hors Lucide, pas de texte IA boilerplate, pas de promesses absolues** (« zéro défaut », « 100 % garanti »).
7. **Responsivité absolue** 320 → 2560 px, cibles tactiles ≥ 44 px, texte ≥ 12 px, WCAG AA.
8. **Distinction des entités** : 2 pôles seulement (Construction, Assistance) + le Groupe. Liens visibles entre les 3 sites, activités clairement séparées.
9. **Estimation ≠ devis** : tout chiffrage automatique est « estimation indicative » avec hypothèses, exclusions, date de validité ; validation humaine par le service Études avant devis officiel.
10. **Aucun secret** dans les fichiers de doc ou de mémoire.

## 2. Coordonnées officielles (uniformes sur toutes les pages)

- Domaines (nov. 2026) : **www.groupe-sica.com**, **www.sicaconstruction.com**, **www.sicaassistance.com** (remplacent les `.ci` des anciens docs).
- Téléphones : **(+225) 07 09 88 32 93** · **(+225) 27 22 24 74 45** · (+225) 01 02 44 28 94.
- Email : groupesica@gmail.com.
- Agence Abidjan : **Cocody Centre / PMI** (adresse retenue par le doc du 17/11/2026).
- Bureau Yamoussoukro : **Morofé / 24 Ampoules**.
- Horaires : *à confirmer par la Direction* (ne pas inventer).
- RCCM CI-ABJ-03-2020-B13-17592 · CC 2054314X · CNPS 378047 · forme : SARLU (doc 17/11/2026).
- Signature Construction : « L'exigence technique au service de vos constructions. » Devise Construction : ÉTUDIER • CONCEVOIR • CONSTRUIRE.

## 3. Monorepo (rappel)

`apps/groupe` (3000) · `apps/construction` (3001) · `apps/assistance` (3002) · `apps/landing` (3003) · `packages/{tokens,config,ui,devis-engine,devis-ai}`.
Commandes : `pnpm --filter @sica/app-groupe dev|typecheck|build` (idem `app-construction`, `app-assistance`).

## 4. Ordre de priorité du chantier « Refonte v2 »

1. Fondation design (tokens, polices, composants partagés, header/footer) — partagée par les 3 sites.
2. **Site principal GROUPE SICA**.
3. **SICA Construction** (12 améliorations, document du 17/11/2026).
4. **SICA Assistance** (contenus du document « Info à compléter site web »).
5. Seconde moitié plus tard : espace client E-SICA renforcé, SEO avancé, sécurité/remise des accès (courrier du 11/11/2026), DQE versionné.

Détail tâche par tâche : `docs/TASKS.md` (section « Refonte v2 »).

## 5. Journal

### 2026-11-25
- ✅ Lu les 3 PDF clients (Assistance : contenus ; Construction : 12 améliorations ; Courrier : remise des accès).
- ✅ Créé `DESIGN.md` v2 (modèle client + couleurs officielles mesurées).
- ✅ Créé ce fichier, mis à jour `docs/CONTEXTE.md` (révision 2), `docs/TASKS.md` (plan Refonte v2), mémoire.
- (remplacé par l'entrée du 26/11 ci-dessous)
- ⏳ À faire côté client : horaires des agences, dates d'historique, chiffres validés, photos avant/pendant/après par projet, autorisations témoignages, confirmation des domaines `.com`.

### 2026-11-26 — Vague 1 de la refonte v2 livrée
- ✅ Décision : on **garde Next.js 16** (Astro/Svelte obligerait à réécrire l'espace client, l'admin Supabase, le Devis IA et les API, donc pas « facile »).
- ✅ Fondation : tokens officiels, preset Tailwind, polices Inter / IBM Plex Sans (`font-num`) / IBM Plex Mono, `Button` v2, `SicaHeader` (barre inter-sites + nav sombre/claire), `SicaFooter` clair, `primitives.tsx` (Section, Eyebrow, StatCallout, TrustBadge, CtaBand, DiamondBullet), `lib/contact.ts` (coordonnées uniques), domaines `.com`.
- ✅ `cn()` utilise `extendTailwindMerge` : les tailles `text-caption`, `text-display-*` et les classes `font-num` ne sont plus effacées. **Ne pas revenir à `twMerge` brut.**
- ✅ Groupe : accueil, à propos, contact, réalisations (explorateur filtrable), pages secondaires et légales restylées.
- ✅ Construction : menu imposé, accueil, qui-sommes-nous, expertises A/B/C, solutions, réalisations et fiches projet, agences (carte), contact (PDF ≤ 10 Mo), sitemap et robots.
- ✅ Assistance : accueil, création, modification, formes juridiques, gestion comptable, fiscale et sociale, impôts et taxes, hub services, contact `?objet=`, simulateur et ressources restylés.
- ✅ Vérifié : typecheck 0 erreur, build des 3 apps OK, rendu contrôlé à 375 et 1440 px, sans défilement horizontal.
- ℹ️ Aperçu navigateur : `C:\Users\HP\Sica\.claude\launch.json` (groupe 3000, construction 3001, assistance 3002 en `next start`). Rebuild avant de prévisualiser, et tuer tout ancien `next start` qui servirait un build périmé.
- 🧹 Nettoyage optionnel : `apps/construction/src/lib/cx.ts` et l'Eyebrow local de `page-blocks.tsx` peuvent passer sur `@sica/ui`. Les anciens dossiers `_sections` non importés peuvent être supprimés.
- ⏳ Seconde vague : DQE v2, E-SICA renforcé, preuves de crédibilité, SEO complet (pages locales, rapport), dossier de sécurité et de remise des accès.
- ⏳ Direction : horaires, numéro WhatsApp, année / statut / type par projet, localisation de Dabré, contenus actualités, partenaires commerciaux, photo DG, dates d'historique, photos des bureaux.

### 2026-11-26 (suite) — Refonte v2 REJETÉE, retour à l'ancien site
- ❌ Le client a détesté la refonte (« générique, ça sent l'IA »). Code remis à l'état du commit 954ba3a ; la refonte est gardée dans `git stash` « refonte-v2-rejetee-2026-11-26 » (rien n'est perdu, réutilisable fichier par fichier).
- ✅ Règle : **garder l'ancien site** (style, fond, forme) + couleurs officielles + corrections du DG + finitions du modèle de design (voir DESIGN.md révision 3).
- ✅ Groupe fait : remappage des couleurs (635 occurrences, 42 fichiers, et variables HSL des tokens), domaines `.com`, adresses, SARLU, téléphones, chiffres sourcés, années de projets « à confirmer », filigrane vidéo recadré, `Button` arrondi 10 px semibold, 2e téléphone dans le footer. Typecheck OK, rendu vérifié en 1440 et 375 px.
- ⚠️ Disque C: plein (14 Mo libres) pendant la vérification : supprimé les `.next` (régénérables). Surveiller l'espace disque.
- ⏳ À faire : validation du Groupe par le client, puis Construction, puis Assistance (même méthode). L'espace client `/espace/*` utilise encore des bleus Tailwind par défaut (seconde vague).
- ℹ️ Aperçu : `C:\Users\HP\Sica\.claude\launch.json` → `groupe-dev`, `construction-dev`, `assistance-dev` (next dev).

### 2026-11-26 (soir) — Construction corrigé + courrier de remise des accès
- ✅ Courrier de remise des accès (réponse au courrier du 11/11) : `docs/REMISE_ACCES_GROUPE_SICA.md` + `.docx`. Mail d'envoi, synthèse des services (registrar, Vercel, Supabase, GitHub, Gemini, Google), réponse aux 12 points, tableau de tests, PV. Aucun mot de passe écrit : transfert de propriété vers groupesica@gmail.com pendant une séance de remise. Champs `[à compléter]` : registrar, dates, nom du développeur.
- ✅ Groupe : dernière promesse absolue retirée (« zéro mauvaise surprise »), page cookies corrigée (aucun outil d'audience n'est installé, Plausible n'était pas réel).
- ✅ Construction (ancien site conservé) : couleurs remappées (58), menu imposé du DG (8 entrées), nouvelles pages `/qui-sommes-nous`, `/expertises` (A/B/C), `/solutions`, `/agences` (carte + itinéraire), `/contact` (formulaire mailto avec objet), gabarit `components/page-shell.tsx` au style de l'accueil, `lib/contact.ts` (coordonnées uniques), phrase d'accueil et signature du DG dans le hero, chiffres non validés retirés (bandeau de preuves, fiches projets : maîtres d'ouvrage, surfaces, années, équipes, référents supprimés), « zéro défaut » retiré, domaines `.com`, footer (SARLU, 2e téléphone, liens légaux vers le Groupe), `sitemap.ts`, `robots.ts`.
- ✅ `SiteHeader` partagé : mode `compactNav` (> 6 entrées) → liens resserrés sans retour à la ligne, bascule desktop à `xl`. Groupe et Assistance inchangés.
- ✅ Assistance : couleurs, domaines `.com`, adresses, SARLU, 3 téléphones, copyright RCCM/CC.
- ✅ Typecheck des 3 apps OK ; Construction vérifié à 1440 et 375 px (aucun débordement).
- ⚠️ Sécurité : l'URL du dépôt Git local contient un jeton GitHub en clair (`git remote -v`). À révoquer sur GitHub et remplacer ; ne jamais remettre le dossier `.git` tel quel au client.
- ⚠️ Photos du hero Construction (`/hero/construction-apartment-building.webp` en mobile, `/hero/*.jpg` en desktop) : vérifier qu'il s'agit bien de chantiers SICA, sinon les remplacer (règle DG).
- ⏳ À faire : pages de contenu Assistance d'après le PDF « Info à compléter » (création, modification, formes juridiques, gestion comptable/fiscale/sociale, impôts et taxes). Seconde vague : DQE v2, E-SICA, SEO complet, Search Console/Analytics.

### 2026-11-26 (nuit) — SICA Assistance refait
- ✅ Direction artistique : structure et effets de batup.fr (nav en pilule flottante, hero plein écran, panneaux empilés, sections sombres arrondies, bandeau défilant, FAQ, footer arrondi), **sans** leurs textes, images, vidéos, logo ni couleurs. Référence : `apps/assistance/DESIGN.md` (révision 2).
- ✅ Contenu repris fidèlement du PDF « Info à compléter » (`src/lib/contenu.ts`) : création, modification, formes juridiques, gestion, impôts et taxes, CNPS. FAQ réécrite d'après le PDF.
- ✅ Pages : accueil, `/creation-entreprise`, `/modification-entreprise`, `/formes-juridiques`, `/gestion`, `/impots-et-taxes`, `/services`, `/contact` (formulaire mailto, horaires « communiqués prochainement »), sitemap, robots.
- ✅ Retours client appliqués : pas de pilule ni de ligne RCCM dans le hero ; mots rotatifs (2,6 s, 4 directions) ; **aucune numérotation** ; sur-titres en **bannière orange** ; logo SVG avec « SICA ASSISTANCE » dedans ; section Formes juridiques sur fond indigo tracé ; bandeau défilant dans les deux sens sans pastilles ; carte d'appel sous les panneaux.
- ✅ Assistant « IA SICA » : bonhomme qui apparaît en remontant la page, fenêtre de questions/réponses tirées des fiches du site (pas d'IA externe, pas de clé).
- ✅ Typecheck OK ; vérifié à 1440 et 375 px (aucun débordement).
- ⏳ En attente du client : son modal pour l'assistant, vidéo et photos des bureaux, horaires, témoignages autorisés. Anciens fichiers `src/app/_sections/*` d'Assistance non utilisés (à supprimer après validation).
- ✅ Retours suivants (26/11, nuit) : cachet rotatif retiré ; quadrillage et pointillés de fond retirés ; Formes juridiques refaites en index typographique sur indigo uni (sans cartes ni liserés orange, « OHADA » mis en avant) ; étapes de la méthode et des pages intérieures sans cartes ni numéros (`Parcours`) ; interlocuteurs sans carte. IA SICA : comportement inversé (sort en descendant, se cache derrière un bandeau blanc en remontant en restant un peu visible).
- ✅ Fin de soirée : suivi de dossier animé dans le hero (sans « Exemple illustratif »), point orange du bandeau supérieur retiré, Formes juridiques avec noms visibles et bouton « Clique pour comprendre », assistant renommé « SICA ASSISTANCE » avec un accueil plus chaleureux. Typecheck OK, vérifié à 1440 et 375 px.
- ⚠️ Disque C: tombé à 0 octet libre pendant la session (le serveur de dev a planté) : supprimé les `.next` des 3 apps (régénérables), environ 1 Go libre ensuite. À surveiller : libérer de l'espace avant tout `next build`.
- ✅ Nuit : suivi de dossier du hero refait (v3, DESIGN.md Assistance §11) : bande blanche pleine largeur fondue dans la photo, étapes qui glissent en boucle comme une vidéo, nom d'étape en ruban bleu rempli d'orange doux, plan final « Prise en charge terminée. / Merci pour votre confiance. » affiché en premier pendant 6 s.
- ⚠️ La photo de fin (femme pouce levé) est un visuel généré (Figma IA), pas une vraie cliente : à remplacer par une photo SICA réelle. Un fichier Figma « SICA Assistance — visuels » a été créé dans les brouillons du compte Figma pour la générer.

