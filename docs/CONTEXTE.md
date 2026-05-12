# Plateforme Web GROUPE SICA — Plan & Mémoire Contexte

> Ce document tient lieu **à la fois de plan d'exécution et de mémoire de contexte**. Toute IA reprenant ce projet doit pouvoir l'ouvrir et démarrer sans rien d'autre. Pas de génération vague — tout ce qui suit est sourcé du dossier technique 36 pages, de l'offre GIRA signée, des logos et du fichier `infosSica.txt`.

---

## 1. Contexte — pourquoi cette plateforme

Le **GROUPE SICA** (SARL ivoirienne, RCCM CI-ABJ-03-2020-B13-17592, capital 2 500 000 FCFA, dirigeant Ngoran Ivan élu *Meilleur jeune entrepreneur ivoirien 2023*) a deux pôles d'activité — **SICA Construction** (BTP, génie civil, géobéton, charpente, plomberie, électricité, VRD) et **SICA Assistance** (création d'entreprise, comptabilité, fiscal, juridique, conseil PME). Le Groupe a signé en mai 2026 une offre commerciale auprès du cabinet **GIRA** (réf. GIRA-2026-SICA-002, Casablanca 04/05/2026) pour la création de **3 sites web interconnectés** avec assistant en ligne. Le client a élargi le périmètre à une **livraison premium type "Vinci Group"** : multilingue, blog SEO, devis interactif PDF, simulateur, médiathèque chantier, signature électronique avec valeur juridique OHADA, dashboard direction, PWA, accessibilité AA. **Fenêtre projet : 114 jours**, donc aucune pression budgétaire ni avenant à négocier — qualité d'abord. L'objectif est un site *corporate de référence en Côte d'Ivoire*, pas une vitrine générique.

---

## 2. Mémoire d'entreprise (faits sourcés — ne pas inventer)

### Identité légale
- **Raison sociale** : GROUPE SICA — forme : SARL
- **Pôles** : SICA Construction & SICA Assistance
- **RCCM** : CI-ABJ-03-2020-B13-17592 • **Capital** : 2 500 000 FCFA
- **Compte contribuable** : 2054314X • **CNPS employeur** : 378047
- **Certificat IDU** : CI20200014890K
- **Compte bancaire** : CI93 CI260 01210 01389869 0001 45 (AFG BANK CI)
- **Directeur** : Ngoran Ivan
- **Régime fiscal** : TEE

### Implantations
- **Siège** : Abidjan — Cocody Mermoz, derrière la Pharmacie Mermoz, après le terrain SOGEFIA/RTI (autre version texte : Cocody Centre, face cité 48 Logements V1 / près PMI Urbaine) — *à confirmer avec le client, deux adresses divergent entre le PDF technique et le fichier txt*.
- **Succursale** : Yamoussoukro — Morofé, 24 ampoules (rond-point route Daloa)
- **Boîtes postales** : 2100 BP 05 Abidjan / 01 BP 1203 Abidjan
- **Couverture** : « équipes mobiles partout en Côte d'Ivoire »

### Contacts
- Téléphones : **+225 0709883293**, **+225 0102442894**, **+225 2722247445**
- Email : `groupesica@gmail.com`
- Site historique : `www.sica.ci`
- Facebook : `facebook.com/SicaConstruction`

### Organigramme (dossier technique p.7)
Directeur → Secrétaire de Service → 3 responsables : Commercial (Vente Assistance + Vente Construction), Technique (Études + Production), Administratif (Achat + Personnel).

### Valeurs & devise
**Engagement** (24/7) — **Dynamisme** (réactivité, écoute) — **Professionnalisme** (équipes certifiées) — **Satisfaction client** — **Rigueur**, **Innovation**, **Responsabilité**.
**Devise** : *« Vos défis sont les nôtres : lancez-vous ! »*

### Vision & mission
- Vision : devenir une référence en Côte d'Ivoire dans l'assistance aux entreprises et la construction moderne.
- Mission : accompagner les particuliers et les entreprises avec professionnalisme dans leurs démarches administratives, leurs projets entrepreneuriaux et leurs réalisations immobilières.

### Services SICA Construction (à reprendre tels quels)
Études / conception / réalisation (visite site, étude de sol, plans, béton armé, terrassement, assainissement, signalisation, paysagiste) • Génie civil – Bâtiment – **Géobéton** (matériau signature, brique BTCS / agglo / parpaing / préfabriqué) • Construction métallique (charpente, hangars, combles, pylônes) • Plomberie • Électricité • Location d'engins BTP & livraison • Commerce général, quincaillerie, matériaux • Fournitures bureau, mobilier • Immobilier & BTP • Assistance entrepreneuriale.

### Services SICA Assistance
Création & modification d'entreprises • Assistance administrative & juridique • Gestion comptable & fiscale • Déclarations fiscales et sociales • Conseil en gestion d'entreprise • Suivi administratif des sociétés • Accompagnement entrepreneurs et porteurs de projets.

### Méthodologie type SICA Construction (7 étapes, dossier technique p.30)
1. Visite du terrain avec extrait topographique
2. Étude de sol *(facturée)*
3. Conception architecturale + ingénierie + DQE *(facturé)*
4. Validation du DQE & protocole bureau
5. Permis de construire + certificat d'urbanisme *(facturé)*
6. Paiements (chèque / espèce / virement)
7. Démarrage du projet

### Moyens techniques cités
Ordinateurs, véhicules, camions, chargeuses, machines à briques, bétonnières, vibreurs, pelles, brouettes, pioches, poulies, équipements pressiomètre/pénétromètre. 5 équipes terrain (TEAM N°1 à N°5) + techniciens supérieurs bureau.

### Projets historiques (11 dossiers présents dans `projets/`, à enrichir)
PROJET DABRÉ (Villa basse avec sous-sol) • Projet AVAGOUT (Jacqueville Abidjan) • Projet Cocody Extension Abidjan • Projet GBAKAYO Soubré • Projet GUESSIGUIÉ Agboville • Projet O'CALM du km53 Abidjan • Projet SONGON Abidjan • Projet Siège SGCI Plateau (géobéton) • Projet Villa Duplex Jacqueville Abidjan • Projet Y4 Cocody Abidjan • Étude de sol projet R+3 Bingerville Abidjan.

> **À faire avec le client (Sprint 1)** : récupérer pour chaque projet — photos haute résolution + cession de droits, dates, client, surface, budget si publiable, mission, statut (achevé / en cours), localisation GPS.

---

## 3. Charte graphique (sourcée logos + dossier technique)

### Couleurs
| Token | Hex | Usage |
|---|---|---|
| `brand.royal` | **#1E2F8A** | Primary — fonds sombres, titres, header, boutons primaires |
| `brand.royal.700` | #182572 | Hover, gradients |
| `brand.royal.900` | #0F1956 | Hero overlay, dark mode |
| `brand.amber` | **#F39200** | Accent — CTA, liens actifs, badges statut « en cours » |
| `brand.amber.600` | #D87D00 | Hover amber |
| `neutral.ink` | #0B1020 | Texte body sur fond clair |
| `neutral.slate` | #475066 | Texte secondaire, légendes |
| `neutral.mist` | #EEF1F7 | Surface alternative |
| `neutral.paper` | #FAFAF7 | Fond principal |
| `semantic.success` | #1F8A56 | Chantier livré |
| `semantic.warn` | #C97A0D | Chantier suspendu |
| `semantic.danger` | #B5283A | Incident, urgence |

Déclinaison par marque (ton, pas couleur) :
- **Groupe** : 60 % royal / 10 % amber / 30 % paper — institutionnel, photos larges.
- **Construction** : 50 % royal / 20 % amber / 30 % paper + plus de surfaces sombres pour rendu chantier.
- **Assistance** : 65 % royal / 5 % amber / 30 % paper — codes administratifs, lecture longue, peu d'orange.

### Typographies
- **Display** : *General Sans* (Fontshare, gratuit commercial) — géométrique chaleureux, distinctif, évite le piège Inter/Poppins.
- **Body** : *Inter Tight* — lisible petits corps, pro.
- **Mono** : *JetBrains Mono* — tableaux chiffrés (devis, KPI dashboard).
- Chargement : `next/font/google` + `next/font/local` (General Sans), subset latin, `display:swap`.
- Échelle modulaire (ratio 1.25) en rem : 0.75 / 0.875 / 1 / 1.125 / 1.25 / 1.5 / 1.875 / 2.25 / 3 / 3.75 / 4.5.

### Grille, breakpoints, motion
- Grille 8 pt (sub-step 4 pt). Container max 1440 px. Gouttières `clamp(16px, 4vw, 80px)`.
- Breakpoints : 360 / 480 / 640 / 768 / 1024 / 1280 / 1440 / 1920 (couvre du petit smartphone aux ultrawide >24″ — critique pour le client).
- Motion : *Motion* (ex-Framer Motion) v12. Variants centralisées (`fadeUp`, `revealStagger`, `slideIn`). Animations discrètes uniquement.
- Dark mode opt-in sur Groupe + Construction. Assistance : light only.
- **Interdits stricts** (instruction client) : aucun emoji, aucune icône générique « free » Heroicons sans curation, aucun texte généré IA boilerplate. Iconographie : **Lucide** + jeu custom SVG pour services BTP (truelle, géobéton, pylône) commissionné ou dessiné.

### Hero homepage — décision
**Image héro responsive + vidéo discrète en boucle dans une « fenêtre » à l'intérieur**, pas une vidéo plein écran. Raisons : (a) vidéo plein écran tue le LCP sur 4G Abidjan, (b) image avec `art-direction` (5 ratios différents 9:16 → 21:9) garantit la responsivité parfaite. Vidéo `<video muted autoplay playsinline loop preload="metadata">` chargée seulement ≥ tablette, masquée mobile. Capture vidéo à shooter sur un chantier SICA actif (drone).

### Header — comportement (inspiré et amélioré de Vinci Autoroutes)
Pattern 4-states, implémenté avec **Motion v12** (`useScroll` + `useMotionValueEvent`) dans `packages/ui/components/SiteHeader.tsx` :

1. **Initial (sur hero, scrollY = 0)** : `position: static`, bg transparent, logo gauche, nav centre-gauche, "Espace client" + zone d'affiliation à droite. Hauteur ~96–120px.
2. **Scrolled solid (scrollY > headerHeight)** : `position: fixed top-0`, `bg-brand.royal` (#1E2F8A) + drop-shadow `0 1px 8px 2px rgba(0,0,0,0.25)`, z-index 2000. Le bloc droit **morph** en CTA orange `bg-brand.amber` (« Demander un devis » sur Construction, « Démarrer mon dossier » sur Assistance, « Espace client » sur Groupe).
3. **Hidden (scroll down continu, vitesse > seuil)** : `translateY(-100%)` avec transition 250ms ease-out. Libère la vue lecture.
4. **Re-show (scroll up détecté)** : `translateY(0)` instantané, opacité 1.

Améliorations vs Vinci : a11y `prefers-reduced-motion` (désactive hide-on-scroll), bannière de breaking news optionnelle au-dessus (alerte chantier, jours fériés), badge "actif" sur l'item courant via `usePathname()`.

---

## 4. Cahier des charges (offre GIRA signée + extensions premium validées)

### Périmètre GIRA contractuel (référence)
- 3 sites : `groupesica.ci`, `sicaconstruction.ci`, `sicaassistance.ci`
- 5 fonctionnalités clés : (1) assistant IA prise en charge 24/7, (2) suivi chantier temps réel, (3) carte interactive des projets, (4) signature électronique, (5) tableau de bord direction
- Inclus : 3 domaines `.ci`, serveur, SSL 1 an, formation 1 session, guide.
- *(Budget et durée GIRA non contraignants pour ce dev — fenêtre de 114 jours allouée par le client.)*

### Extensions premium ajoutées (validées par l'utilisateur)
- Multilingue **FR (défaut) + EN** dès la V1, **AR** différé en Sprint 6.
- Blog / actualités SEO indexé par site (mutualisé via `packages/ui`).
- Page **carrières** avec gestion d'offres et candidatures spontanées.
- **Devis interactif multi-étapes** (stepper conditionnel) + simulateur surface/coût + génération PDF auto + envoi email + version brouillon en base.
- **Simulateur création entreprise** côté Assistance (SARL/SA, capital, secteur → coût estimé).
- **Médiathèque chantier** centralisée (Supabase Storage + transformations natives).
- **Espace partenaire / fournisseur** (Sprint 6) avec accès docs et BC.
- **Conformité ARTCI** (Côte d'Ivoire, équivalent RGPD), bandeau cookies granulaire.
- **Schema.org LocalBusiness** Abidjan + Yamoussoukro + JSON-LD Service/Article/FAQ.
- **PWA installable** (manifest + service worker offline pour pages clés).
- **Accessibilité WCAG 2.1 AA** vérifiée (contrastes palette validés, navigation clavier, ARIA correct).
- **Audit log** immuable sur signatures, changements statuts, accès dossiers.

---

## 5. Stack technique (verrouillée)

| Couche | Choix | Pourquoi |
|---|---|---|
| Framework | **Next.js 16 (App Router, RSC)** + TypeScript strict | Dernière version stable, SEO natif, RSC pour vitrine perf, server actions pour formulaires, Turbopack stable par défaut |
| UI | **Tailwind CSS** + **shadcn/ui** (Radix sous-jacent) | Tokens propres, accessibilité Radix, composants composables |
| Animations | **Motion v12** | Successeur direct Framer Motion |
| Backend | **Supabase** (Postgres + Auth + Realtime + Storage + Edge Functions) | Tout-en-un, realtime pour suivi chantier, Auth OTP/email natif |
| IA | **Anthropic Claude Haiku 4.5** (`claude-haiku-4-5`) via **Vercel AI SDK** + tool calling + **prompt caching** | Latence + coût, fallback Sonnet 4.6 (`claude-sonnet-4-6`) si conv complexe |
| Maps | **MapLibre GL JS** + tuiles **MapTiler** free tier | Open source, pas de lock-in Mapbox |
| PDF | **react-pdf** | Zéro Chromium, déterministe, Edge-compatible |
| Signature | **Hybride** : in-house (canvas + OTP + SHA-256 + horodatage RFC3161) pour devis < 2 M FCFA, **Yousign API v3** au-delà | Valeur juridique OHADA/loi 2013-546 préservée |
| Emails | **react-email** + Resend (ou Supabase Auth SMTP) | Templates typés, preview locale |
| Rate limit | **Upstash Redis + @upstash/ratelimit** | Edge, free tier généreux |
| Monitoring | **Sentry** + **Vercel Analytics** + **Plausible** | Erreurs + perfs + analytics RGPD-friendly |
| Tests | **Playwright** (E2E) + **Vitest** (unitaires) | Parcours critiques : devis, intake, signature, IA |
| Hosting | **Vercel** (4 projets : groupe, construction, assistance, studio) + **Supabase Cloud** | POPs Paris/Marseille ~80-120 ms vers CI, ISR, preview branches |
| Domaines | `.ci` enregistrés via GIRA / NIC.CI | Démarche à lancer Sprint 1 J1 (5-15 j ouvrés) |

**Outils design** : *aucun plugin Figma* — design directement en code (Tailwind + shadcn). Maquettes en code = source unique de vérité.

---

## 6. Architecture monorepo

```
sica-platform/
├── apps/
│   ├── groupe/              # groupesica.ci  (corporate)
│   ├── construction/        # sicaconstruction.ci
│   ├── assistance/          # sicaassistance.ci
│   └── studio/              # admin.sica.ci (back-office direction + équipes)
├── packages/
│   ├── ui/                  # shadcn + composants SICA (Hero, ProjectCard, ChantierTimeline…)
│   ├── tokens/              # couleurs, type, spacing — TS + CSS vars
│   ├── config/              # tsconfig.base, eslint, prettier, tailwind-preset
│   ├── db/                  # client Supabase, types générés, repositories
│   ├── auth/                # helpers Supabase Auth SSR, RBAC, middleware
│   ├── i18n/                # next-intl, namespaces partagés
│   ├── ai/                  # Anthropic client, prompts, tools, rate limit
│   ├── pdf/                 # devis/contrats react-pdf, templates
│   ├── signature/           # canvas pad + OTP + hash, intégration Yousign
│   ├── maps/                # MapLibre wrapper, markers, clusters
│   ├── analytics/           # events typés
│   └── emails/              # react-email templates
├── supabase/
│   ├── migrations/          # SQL versionné
│   ├── functions/           # Edge Functions (sign-pdf, notify-team, ai-relay)
│   └── seed.sql
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

**Stratégie déploiement** : 4 projets Vercel distincts pointant tous sur ce repo, chacun avec Root Directory dédié et `turbo-ignore`. Variables d'env isolées. Sitemap/robots indépendants par domaine. Cross-site links via composant `<CrossSiteLink site="construction" />` avec UTM tracking.

---

## 7. Modèle de données Supabase (synthèse)

Tables principales — détails colonnes, enums et RLS dans `supabase/migrations/0001_init.sql` à créer.

- **`profiles`** (lié `auth.users`) — `role` enum `client | staff_construction | staff_assistance | direction | admin`
- **`organizations`** — clients pro / PME
- **`projects`** — chantiers Construction : statut, géoloc, galerie, budget, `is_public`, `progress_pct`
- **`project_updates`** — fil temps réel (photo, rapport, étape, livrable, incident)
- **`devis`** + **`devis_items`** — référence `SICA-DV-2026-NNNN`, JSON multi-étapes recomposable, PDF Storage
- **`signatures`** — audit complet (méthode, IP, UA, geo, hash, OTP, révocation)
- **`dossiers`** — SICA Assistance : référence `SICA-AS-2026-NNNN`, intake JSON, statut workflow, pièces attendues
- **`leads`** — sortie assistant IA (transcript redacté, qualification, conversion)
- **`media`** — bibliothèque centralisée, métadonnées, tags
- **`blog_posts`** — MDX, multi-site, multilingue, SEO JSON
- **`careers_offers`**, **`partners`**, **`testimonials`**, **`audit_log`**

**Buckets Storage** : `public-media`, `projects-gallery`, `chantier-updates`, `devis`, `dossiers` (privé strict), `signatures` (retention 10 ans).

**Realtime** : channels `project:{id}:updates`, `dossier:{id}`, `staff:notifications`.

**RLS** : default deny, policies par rôle. Service role key uniquement dans Edge Functions.

---

## 8. Information Architecture — pages par site

### `groupesica.ci` (Corporate)
`/` (hero + chiffres-clés + 2 pôles + actu + témoignages + CTA), `/groupe` (histoire, dirigeant Ngoran Ivan, vision/mission/valeurs), `/poles/construction`, `/poles/assistance`, `/actualites` + `[slug]`, `/carrieres`, `/partenaires`, `/contact`, légal (mentions, confidentialité, cookies).

### `sicaconstruction.ci`
`/` (hero immersif chantier), `/services` + `[slug]` (etudes, **geobeton** dédié, génie civil, charpente, plomberie, électricité, VRD, location-engins, rénovation), `/projets` (galerie filtrable) + `[slug]`, `/carte` (plein écran CI), `/devis` (stepper + simulateur + PDF), `/realisations-geobeton` (landing différenciant), `/espace-client` (protégé), `/actualites`, `/contact`, légal.

### `sicaassistance.ci`
`/` (institutionnel), `/services` + `[slug]` (création, modification, comptabilité, fiscal, juridique, conseil), `/simulateur` (création SARL/SA), `/intake` (formulaire intelligent conditionnel), `/espace-client` (suivi dossier, pièces attendues, échanges, factures), `/ressources` (modèles, guides PDF), `/actualites`, `/contact`, légal.

### `admin.sica.ci` (Studio)
Dashboard direction (KPIs CA, chantiers actifs, dossiers, leads 7j, conversion IA), CRUD projets/dossiers/devis/leads/blog/carrières, boîte à signer, modération témoignages, audit log viewer.

---

## 9. Assistant IA — architecture

- Widget flottant `<AiAssistant brand="construction|assistance|groupe" />`, ton et services varient par marque.
- Endpoint Edge Runtime `app/api/chat/route.ts`, streaming via Vercel AI SDK.
- **Prompt caching** sur bloc système (services + FAQ + exemples) — ~80 % d'économie tokens.
- **Tools** : `capture_lead`, `book_callback`, `request_devis`, `fetch_project_examples`.
- Modèle par défaut **Haiku 4.5**, bascule **Sonnet 4.6** si conv > 8 tours ou ambiguïté.
- **Garde-fous** : rate limit Upstash (10/min/IP, 50/jour/IP non-auth), redaction PII transcripts >30 j, refus strict hors périmètre SICA, circuit breaker 3× 5xx → fallback formulaire statique 10 min.

---

## 10. Performance, SEO, sécurité

- **Images** : Next/Image + loader Supabase Storage transforms + AVIF/WebP + `blurDataURL` généré à l'upload.
- **Routes** : ISR (`revalidate = 3600`) vitrine, `force-static` légal, `force-dynamic` espaces client.
- **Sitemap/robots** : `app/sitemap.ts` + `app/robots.ts` par app. Bloque `/espace-client/*`, `/api/*`, `/admin*`.
- **Structured data JSON-LD** : `Organization`, `LocalBusiness` (Abidjan Cocody Mermoz + Yamoussoukro Morofé), `BreadcrumbList`, `Article`, `Service`, `FAQPage`.
- **Core Web Vitals cibles** : LCP < 2.0 s sur 4G Abidjan, INP < 200 ms, CLS < 0.05.
- **OG images dynamiques** via `opengraph-image.tsx` (Vercel OG).
- **Auth** : Supabase email + OTP (Magic Link + 6-digit), WhatsApp OTP (Twilio CI ou MTN) optionnel pour clients sans email.
- **Headers** : HSTS, CSP strict (nonce), Referrer-Policy `strict-origin-when-cross-origin`, Permissions-Policy verrouillée.
- **CSRF** : Server Actions Next 16 + double-submit cookie pour REST.
- **Rate limit** : `/api/chat` 10/min, `/api/devis` 5/min, `/api/auth/*` 3/min par IP.
- **Cookie consent** : maison, conforme ARTCI, granularité (essentiel / mesure / marketing), refus aussi facile que l'acceptation, version + date stockées.
- **Secrets** : Supabase Vault (Anthropic, Yousign, Twilio, MapTiler). Service role jamais exposée client.
- **Backup** : PITR 7 j Supabase + export hebdo Cloudflare R2 via cron Vercel.

---

## 11. Phasage — sprints réalistes

| Sprint | Contenu | Durée |
|---|---|---|
| **S1 — Fondations** | Monorepo, configs, tokens, ui pack (≈15 composants), schema v1 (profiles, leads, blog, media), i18n FR/EN, app Groupe complète, CI GH Actions, previews Vercel | **12 j** |
| **S2 — SICA Construction** | Schema v2 (projects, project_updates, devis), app Construction, galerie filtrable, carte MapLibre, stepper devis + PDF, seed 11 projets historiques | **14 j** |
| **S3 — SICA Assistance** | Schema v3 (dossiers, organizations), app Assistance, simulateur création, intake conditionnel, espace client v1 lecture | **10 j** |
| **S4 — Espace client + signature + realtime** | RBAC, middleware SSR, timeline realtime, signature in-house + Yousign, studio v1 CRUD + boîte à signer + dashboard | **12 j** |
| **S5 — IA + blog + polish + SEO/perf** | Assistant IA Claude + prompts par marque, éditeur MDX studio, carrières/partenaires/témoignages, audit Lighthouse, accessibilité AA, E2E Playwright, PWA, OG images | **10 j** |
| **Total** | | **~58 j-homme** (≈ 7 semaines avec 2 devs en parallèle) |

> Fenêtre projet allouée par le client = **114 jours calendaires**. Largement confortable pour le périmètre premium, slack disponible pour itérer sur le design (revues clients), refaire les sections qui ne satisfont pas, et intégrer des references visuelles (Vinci, etc.) en profondeur.

---

## 12. Fichiers critiques à créer en premier

À démarrage de l'implémentation (post-validation) :

- `C:\Users\admin\Sica\sica-platform\pnpm-workspace.yaml`
- `C:\Users\admin\Sica\sica-platform\turbo.json`
- `C:\Users\admin\Sica\sica-platform\package.json` (root)
- `C:\Users\admin\Sica\sica-platform\packages\tokens\src\index.ts` *(palette SICA + type + spacing)*
- `C:\Users\admin\Sica\sica-platform\packages\config\tailwind-preset.ts`
- `C:\Users\admin\Sica\sica-platform\packages\ui\src\components\SiteHeader.tsx`
- `C:\Users\admin\Sica\sica-platform\packages\ui\src\components\SiteFooter.tsx`
- `C:\Users\admin\Sica\sica-platform\supabase\migrations\0001_init.sql`
- `C:\Users\admin\Sica\sica-platform\apps\groupe\app\layout.tsx`
- `C:\Users\admin\Sica\sica-platform\apps\groupe\app\page.tsx`

**Fichiers de référence existants à exploiter** :
- `C:\Users\admin\Sica\infosSica.txt` (texte officiel — présentation, services, valeurs, devise)
- `C:\Users\admin\Sica\Infos\DOSSIER TECHNIQUE GROUPE SICA (SICAConstruction) dec2025.pdf` (36 p.)
- `C:\Users\admin\Sica\Infos\GIRA_SICA_Offre_Essentielle.pdf` (cahier des charges signé)
- `C:\Users\admin\Sica\images\logo\` (3 logos PNG — Groupe / Assistance / Construction)
- `C:\Users\admin\Sica\projets\` (11 dossiers projets, photos à fournir par le client)

---

## 13. Risques & mitigations (top 5)

| # | Risque | P | I | Mitigation |
|---|---|---|---|---|
| 1 | Enregistrement `.ci` lent à NIC.CI (5-15 j ouvrés) | Élevée | Bloque la mise en prod | Dépôt dossier Sprint 1 J1 avec RCCM + pièce dirigeant. Domaine repli `groupesica.com` |
| 2 | Photos chantiers manquantes / sans cession de droits | Élevée | Galerie vide | Audit semaine 1, shooting éclair (drone + reflex) si nécessaire, cession écrite |
| 3 | Valeur juridique signature in-house en cas de litige BTP | Moyenne | Contentieux non opposable | Yousign API > 2 M FCFA, validation avocat OHADA Abidjan |
| 4 | Coût/latence Anthropic | Moyenne | UX dégradée, facture | Haiku 4.5 + prompt caching, rate limit, circuit breaker, alerte Sentry quotidienne |
| 5 | Latence Vercel Edge → CI (POPs Paris/Marseille) | Faible | LCP dégradé | ISR agressif, CDN Supabase (Cloudflare), PWA offline-first, tests réels Abidjan |

---

## 14. Décisions ouvertes à valider avec le client après validation du plan

1. **Adresse siège** : Cocody Mermoz (dossier technique) **ou** Cocody Centre face cité 48 Log V1 (txt) — les deux divergent.
2. **Drone + shooting photos chantiers** : qui le commandite et budget ?
3. **Choix vidéo héro** : tournage dédié (recommandé) ou réutilisation matériau existant ?
4. **Multilingue AR** : maintenu au Sprint 6 ou abandonné ?
5. **Hébergement domaines .ci** : GIRA s'en charge dans le devis ; confirmer dépôt RCCM et délai NIC.CI.
6. **Email pro** : passer de `groupesica@gmail.com` → `contact@groupesica.ci` (Google Workspace ou Zoho) — fortement recommandé pour crédibilité.

---

## 15. Vérification end-to-end (post-implémentation)

1. **Build & types** : `pnpm -r build` + `pnpm -r typecheck` (0 erreur).
2. **Lint & format** : `pnpm -r lint` (0 warning), `prettier --check`.
3. **Tests unitaires** : `pnpm -r test` (Vitest, packages critiques `ai`, `pdf`, `signature`, `db`).
4. **E2E Playwright** sur les 4 apps : parcours devis (visiteur → PDF reçu), parcours intake Assistance, parcours signature OTP, parcours assistant IA (capture lead → ligne en base).
5. **Lighthouse CI** : LCP < 2.0 s, INP < 200 ms, CLS < 0.05, A11y ≥ 95, SEO 100.
6. **axe-core a11y** : 0 violation critique sur toutes pages publiques.
7. **WebPageTest depuis Lagos** (proxy le plus proche d'Abidjan) : TTFB < 600 ms.
8. **Test réel mobile** depuis un device 4G Abidjan (à demander au client) avec rapport screen recording.
9. **Audit sécurité** : `npm audit`, `pnpm audit` (0 high), headers via `securityheaders.com` (A+ visé), test RLS Supabase avec compte client/staff/anonyme.
10. **Tests Supabase Realtime** : ouverture d'un projet côté client + ajout d'un `project_update` côté studio → toast apparaît < 1 s.
11. **Validation devis PDF** : génération + ouverture Adobe Reader (pas de glyphes manquants), signature visible, hash correspondant.
12. **Validation contenu** : relecture humaine de chaque page (zéro contenu généré IA non revu), validation par le client en présentation projetée.

---

## 16. Méthode de travail recommandée pour la suite

1. Ce fichier reste la **source de vérité**. Toute IA ou dev reprenant le projet le lit en premier.
2. Au lancement du dev (sortie du plan mode), créer le repo `C:\Users\admin\Sica\sica-platform\` avec `git init` + commit initial.
3. Pousser sur GitHub privé sous l'org SICA dès J1 pour activer Vercel + previews.
4. Toute modification de charte / périmètre / décision majeure → mise à jour de ce document.
5. Garder ce document à jour dans `docs/CONTEXTE.md` du repo une fois créé (copie de ce plan, vivant).

---

*Document de référence — révision 1 — mai 2026 — préparé pour Groupe SICA Côte d'Ivoire.*
