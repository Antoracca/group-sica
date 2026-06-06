# SICA PLATFORM — INDEX DES FICHIERS

> Fichier maître pour qu'une IA (ou un nouveau développeur) comprenne où tout se trouve
> dans ce monorepo. Couvre la **fonctionnalité Devis IA** (Phases 1→4) ainsi que les
> apps existantes. À jour au **2026-06-06**.

---

## 1. SURVOL DU MONOREPO

Monorepo **pnpm / Turborepo**. 4 apps Next.js 16 + 4 packages partagés.

```
sica-platform/
├── apps/
│   ├── groupe/         (port 3000)  groupesica.ci      → vitrine + Espace client + Panel admin
│   ├── construction/   (port 3001)  sicaconstruction.ci → vitrine BTP + Devis IA
│   ├── assistance/     (port 3002)  sicaassistance.ci   → vitrine services
│   └── landing/        (port 3003)  sica.ci             → landing page corporate
├── packages/
│   ├── tokens/         design tokens + globals.css
│   ├── config/         tsconfig, tailwind preset, eslint
│   ├── ui/             composants partagés (Header, Footer, StickyCtaMobile…)
│   ├── devis-engine/   ⭐ moteur déterministe de devis (Phase 1)
│   └── devis-ai/       ⭐ agents IA (vision Gemini, Phase 2)
└── docs/supabase/      schémas SQL à exécuter manuellement
```

**URLs et redirections clés** :
- `groupesica.ci/espace-client` → page de connexion (Supabase Auth) de l'espace client
- `groupesica.ci/espace/*` → dashboard client (Suivi chantier, Documents, Demandes, Carte…)
- `groupesica.ci/sica-panel-gestion/*` → panel admin (Direction, Clients, Devis IA…)
- `sicaconstruction.ci/devis-auto` → ⭐ générateur de devis à partir d'un plan (Gemini)
- `sicaconstruction.ci/devis` → simulateur de devis manuel (existant)

---

## 2. CATÉGORIE A — FONCTIONNALITÉ « DEVIS IA » (Phases 1→4)

### A.1 Base de connaissance (source de vérité)

| Chemin | Rôle |
|---|---|
| `C:\Users\HP\Sica\Nouveau dossier\SICA-DEVIS-IA-DATABASE.md` | Fichier maître KB : structure devis-type SICA, bibliothèque de prix, règles de quantité, schéma JSON pivot. |
| `C:\Users\HP\Sica\Nouveau dossier\*.pdf` | 4 devis réels + 4 plans/3D — données d'entraînement source. |

### A.2 Phase 1 — Moteur déterministe `@sica/devis-engine`

| Chemin | Rôle |
|---|---|
| `packages/devis-engine/package.json` | Manifest workspace (zéro dépendance runtime). |
| `packages/devis-engine/tsconfig.json` | Étend `../config/tsconfig.base.json`. |
| `packages/devis-engine/src/types.ts` | Types publics : `PlanInput`, `DevisResult`, `Lot`, `SubLot`, `DevisLine`, `Standing`, `WallMaterial`, `Roof`, `PieceType`, `Unit`. |
| `packages/devis-engine/src/prices.ts` | **Bibliothèque de prix unitaires** `PU` + multiplicateurs `STANDING_MUL` + coefficients `COEF`. **C'est ici qu'on calibre.** |
| `packages/devis-engine/src/engine.ts` | Fonction `generateDevis(plan)` — produit le DQE complet (11 lots, gros œuvre + second œuvre, totaux). |
| `packages/devis-engine/src/index.ts` | API publique. |
| `packages/devis-engine/src/validate.ts` | Script de validation — rejoue les 4 devis réels, mesure l'écart (cible ±15 %, actuel ±7,7 %). `pnpm --filter @sica/devis-engine validate`. |

### A.3 Phase 2 — Agents IA `@sica/devis-ai`

| Chemin | Rôle |
|---|---|
| `packages/devis-ai/package.json` | Dépend de `@google/genai` + `@sica/devis-engine`. |
| `packages/devis-ai/src/gemini.ts` | Provider Gemini 2.5 Flash. Schéma de sortie strict via `responseSchema`. Function `analyzePlanWithGemini(pdfBuffer, opts)`. |
| `packages/devis-ai/src/index.ts` | `analyzePlan(buffer, opts)` — abstraction provider-agnostique (`gemini` aujourd'hui, `claude`/`openai` à brancher). |

### A.4 Phase 3 — UI Construction `/devis-auto`

| Chemin | Rôle |
|---|---|
| `apps/construction/.env.local` | **Secret** : `GEMINI_API_KEY` (server-only), `GEMINI_MODEL`, vars Supabase. Gitignored. |
| `apps/construction/src/lib/supabase-admin.ts` | Client Supabase service_role (server-only). |
| `apps/construction/src/app/api/devis-auto/route.ts` | **API POST** : reçoit PDF → vision Gemini → moteur → persistance Supabase → renvoie `{plan, devis, reference, durationMs}`. |
| `apps/construction/src/app/devis-auto/page.tsx` | **Page principale** — hero éditorial, dropzone, pipeline d'agents, snapshot du plan, DQE rendu, export Word, impression PDF. |
| `apps/construction/src/app/devis-auto/_components/dropzone.tsx` | Zone d'upload drag-drop avec viseurs d'angle façon plan d'architecte. |
| `apps/construction/src/app/devis-auto/_components/agents-pipeline.tsx` | Animation des 4 agents (Lecteur → Métreur → Chiffreur → Contrôleur). |
| `apps/construction/src/app/devis-auto/_components/plan-snapshot.tsx` | Synthèse compacte : pièces, surfaces, standing, indices. |
| `apps/construction/src/app/devis-auto/_components/devis-render.tsx` | Rendu DQE 11 lots (style A4 SICA). |
| `apps/construction/src/app/devis-auto/_components/export-doc.ts` | Génération du fichier `.doc` (HTML-Word inline). |
| `apps/construction/src/app/_sections/devis-ia-spotlight.tsx` | **Section vedette** sur la home Construction (lien direct vers `/devis-auto`). |
| `apps/construction/src/app/globals.css` | Règles `@media print` pour masquer la chrome et imprimer uniquement le DQE. |

### A.5 Phase 3 bis — Sections vedette sur les autres sites

| Chemin | Rôle |
|---|---|
| `apps/groupe/src/app/_sections/devis-ia-spotlight.tsx` | Section vedette sur la home Groupe SICA (lien vers `sicaconstruction.ci/devis-auto`). |
| `apps/assistance/src/app/_sections/devis-ia-spotlight.tsx` | Section vedette sur la home Assistance (lien vers `sicaconstruction.ci/devis-auto`). |
| `apps/groupe/src/lib/links.ts` | Ajouté `links.espace` (= groupe/espace-client). |
| `apps/construction/src/lib/links.ts` | Idem. |
| `apps/assistance/src/lib/links.ts` | Idem. |

### A.6 Phase 4 — Console d'apprentissage (admin)

| Chemin | Rôle |
|---|---|
| `docs/supabase/devis-ai-schema.sql` | **SQL à exécuter dans Supabase SQL Editor** : tables `devis_ai_generations` + `devis_ai_corrections`, RLS, index. |
| `apps/groupe/src/app/sica-panel-gestion/dashboard/devis-ia/page.tsx` | Console — liste des générations + KPIs temps réel. Détecte si la table n'existe pas et affiche un message d'install. |
| `apps/groupe/src/app/sica-panel-gestion/dashboard/devis-ia/[id]/page.tsx` | Détail : plan compris (gauche) + DQE éditable (droite) + historique des corrections. |
| `apps/groupe/src/app/sica-panel-gestion/dashboard/devis-ia/[id]/edit-line.tsx` | Cellule éditable inline (designation, quantité, P.U.). |
| `apps/groupe/src/app/sica-panel-gestion/dashboard/devis-ia/[id]/status-controls.tsx` | Boutons Accepter / Rejeter / Supprimer. |
| `apps/groupe/src/app/sica-panel-gestion/dashboard/devis-ia/actions.ts` | Server actions : `updateDevisLine`, `setGenerationStatus`, `deleteGeneration`. |
| `apps/groupe/src/app/sica-panel-gestion/dashboard/admin-nav.tsx` | Lien « Devis IA » ajouté à la nav admin. |
| `apps/groupe/src/app/sica-panel-gestion/dashboard/module-registry.ts` | Module « Devis IA » ajouté au catalogue (groupe Documents). |
| `apps/groupe/package.json` | Ajouté `@sica/devis-engine`. |

---

## 3. CATÉGORIE B — ESPACE CLIENT (apps/groupe)

### B.1 Routes
- `groupesica.ci/espace-client` → login (page de connexion fidèle, design d'origine, Supabase Auth)
- `groupesica.ci/espace` → dashboard (réservé aux clients authentifiés)
- `groupesica.ci/espace/chantiers`, `/documents`, `/demandes`, `/carte`, `/parametres`, etc.

### B.2 Fichiers clés
| Chemin | Rôle |
|---|---|
| `apps/groupe/src/app/espace-client/page.tsx` | Page de connexion (drag-drop animée, panneau reset password, Supabase). |
| `apps/groupe/src/app/espace/layout.tsx` | Layout server : vérifie l'auth, fournit le profil aux pages enfants. |
| `apps/groupe/src/app/espace/*/page.tsx` | Pages du dashboard client. |
| `apps/groupe/src/middleware.ts` | Protège `/espace`, `/espace/*`, `/espace-client`, `/sica-panel-gestion`, `/sica-panel-gestion/*`. |
| `apps/groupe/src/espace/lib/supabase/server.ts` | Client Supabase server (cookies). |
| `apps/groupe/src/espace/lib/supabase/admin.ts` | Client Supabase service_role. |
| `apps/groupe/src/espace/lib/supabase/middleware.ts` | Logique session du middleware. |
| `apps/groupe/src/espace/lib/queries.ts` | `getProfile`, `getSuivis`, `getDocuments`, `getDemandes`, `getActivity` (avec auto-réparation profil). |
| `apps/groupe/src/espace/lib/actions.ts` | Server actions : `signOut`, `signDocument`, `updateProfile`, `changePassword`, `adminCreateClient`. |
| `apps/groupe/src/espace/lib/data-context.tsx` | Contexte client : `useData()`. |
| `apps/groupe/src/espace/lib/types.ts` | Types métier (Suivi, Document, Demande, etc.). |
| `apps/groupe/src/espace/components/*` | Composants du dashboard (app-shell, sidebar, app-bar, bottom-nav, brand-switcher, primitives). |
| `docs/supabase/schema.sql` | Tables Espace client : profiles, projects, project_steps, documents, demandes, activity, messages, notifications + RLS + trigger handle_new_user + backfill. |

---

## 4. CATÉGORIE C — PANEL ADMIN (apps/groupe/sica-panel-gestion)

### C.1 Arborescence
```
sica-panel-gestion/
├── page.tsx                       login admin
└── dashboard/
    ├── page.tsx                   pilotage (vue d'ensemble)
    ├── layout.tsx                 layout admin (nav latérale + topbar)
    ├── admin-nav.tsx              navigation admin
    ├── admin-module-catalog.tsx   catalogue de modules cherchable
    ├── admin-utils.ts             helpers (fcfa)
    ├── module-registry.ts         registre des modules ADMIN_MODULES
    ├── actions.ts                 server actions admin
    ├── create-client-form.tsx     formulaire création client
    ├── clients/page.tsx           liste + création clients
    ├── projets/page.tsx           liste projets
    ├── documents/page.tsx         liste documents
    ├── demandes/page.tsx          liste demandes
    ├── analytics/page.tsx         KPIs et lecture direction
    ├── modules/page.tsx           catalogue de modules
    └── devis-ia/                  ⭐ console Devis IA (voir A.6)
```

---

## 5. CATÉGORIE D — SITES VITRINES

### D.1 Apps/groupe (Groupe SICA, holding)
- `apps/groupe/src/app/page.tsx` — home avec Hero, HeroActionPanel, Pillars, **DevisIaSpotlight**, Stats, Realisations, News, Testimonials, CtaBand.
- `apps/groupe/src/app/_sections/*` — sections de home.
- `apps/groupe/src/components/footer.tsx` — pied de page.
- `apps/groupe/src/lib/{links.ts,nav.ts,actualites.ts,fonts.ts}` — config.
- Fonts : **Sora** (display) + **Inter** (body) + **JetBrains Mono**.

### D.2 Apps/construction (SICA Construction, BTP)
- `apps/construction/src/app/page.tsx` — home avec Hero, ProofStrip, **DevisIaSpotlight**, ESica, Expertises, ProjectsAZ, Process, Cta.
- `apps/construction/src/app/_sections/*` — sections home (hero, hero-estimator, expertises, projects-az, process, esica, cta, proof-strip, **devis-ia-spotlight**).
- `apps/construction/src/app/devis/*` — simulateur de devis manuel (existant).
- `apps/construction/src/app/devis-auto/*` — ⭐ générateur IA (voir A.4).
- `apps/construction/src/app/projets/*`, `realisations/*`, `contact/*`, `espace-client/page.tsx` (redirect vers groupe).
- `apps/construction/src/components/{construction-header,footer-construction,section-rail}.tsx`.
- Fonts : **Geist** + **Geist Mono** (identité « ingénierie »).

### D.3 Apps/assistance (SICA Assistance, services)
- `apps/assistance/src/app/page.tsx` — home avec Hero, TrustStrip, Services, Process, SimulateurTeaser, **DevisIaSpotlight**, Segments, Ressources, Faq, Cta.
- `apps/assistance/src/app/_sections/*` — sections.
- Fonts : **Geist** + **Geist Mono**.

### D.4 Apps/landing (sica.ci, corporate)
- `apps/landing/src/app/*` — page d'accueil corporate.

---

## 6. CATÉGORIE E — PACKAGES PARTAGÉS

| Package | Rôle |
|---|---|
| `packages/tokens` | Design tokens CSS (couleurs `brand-royal`, `brand-amber`, `ink`, `slate`, `paper`, `mist`, espacements, typo). Exporte `globals.css`. |
| `packages/config` | tsconfigs partagés (`tsconfig.base.json`, `tsconfig.react.json`, `tsconfig.nextjs.json`), preset Tailwind, eslint, postcss. |
| `packages/ui` | Composants UI partagés : Header, Footer, Logo, Container, StickyCtaMobile, getTopNav, etc. |
| `packages/devis-engine` | ⭐ Moteur de devis (voir A.2). |
| `packages/devis-ai` | ⭐ Agents IA (voir A.3). |

---

## 7. CATÉGORIE F — INFRASTRUCTURE

| Chemin | Rôle |
|---|---|
| `package.json` (racine) | Scripts turbo (dev, build, test, format). |
| `pnpm-workspace.yaml` | Déclare `apps/*` + `packages/*`. |
| `turbo.json` | Pipelines turbo. |
| `scripts/kill-port.js` | Tue le processus sur un port avant `dev`. |
| `.gitignore` | Couvre `.env*.local`, `.next`, `node_modules`, `.turbo`. |
| `docs/supabase/schema.sql` | Schéma principal espace client (à exécuter une fois dans Supabase). |
| `docs/supabase/devis-ai-schema.sql` | ⭐ Schéma Devis IA (à exécuter pour activer la console). |

---

## 8. POUR TRAVAILLER SUR…

### …calibrer les prix du devis IA
→ Éditer `packages/devis-engine/src/prices.ts` (objets `PU`, `COEF`, `STANDING_MUL`).
→ Lancer `pnpm --filter @sica/devis-engine validate` pour vérifier l'écart sur les 4 devis réels.

### …améliorer la lecture du plan
→ Éditer le prompt système ou le schéma dans `packages/devis-ai/src/gemini.ts`.

### …ajouter un fournisseur IA (Claude, OpenAI)
→ Ajouter `packages/devis-ai/src/claude.ts` (sur le modèle de `gemini.ts`).
→ Brancher dans le `switch` de `packages/devis-ai/src/index.ts`.

### …modifier l'UX de /devis-auto
→ `apps/construction/src/app/devis-auto/page.tsx` (orchestrateur) et les composants `_components/*`.

### …ajouter une fonctionnalité à la console admin
→ Pages : `apps/groupe/src/app/sica-panel-gestion/dashboard/devis-ia/*`.
→ Server actions : `apps/groupe/src/app/sica-panel-gestion/dashboard/devis-ia/actions.ts`.

### …ajouter une page au dashboard client
→ Créer `apps/groupe/src/app/espace/<nouvelle-route>/page.tsx`.
→ Ajouter à `apps/groupe/src/espace/lib/nav.ts` pour qu'elle apparaisse dans la sidebar.

### …toucher au design system
→ Tokens CSS : `packages/tokens/src/globals.css`.
→ Composants partagés : `packages/ui/src/components/*`.

---

## 9. À FAIRE / RESTE À CONNECTER

1. **Exécuter `docs/supabase/devis-ai-schema.sql`** dans Supabase SQL Editor pour activer la persistance.
2. **Régénérer la clé Gemini** (la clé actuelle a été collée en clair dans le chat — la rotater sur https://aistudio.google.com/apikey, mettre la nouvelle dans `apps/construction/.env.local`).
3. **Connecter les modules admin restants** (« À connecter » dans `module-registry.ts`).
4. **Quand le KB grossit** : passer en few-shot dans `gemini.ts` (récupérer les 3 corrections les plus similaires depuis `devis_ai_corrections` et les fournir comme exemples).
5. **Médiane des corrections → prices.ts** : script de re-calibration automatique à écrire quand on a ≥ 20 corrections par poste.

---

## 10. CONVENTIONS

- **Typo** : Sora (display) sur groupe ; Geist (display + body) sur construction/assistance ; **JetBrains Mono** et **Geist Mono** pour toute donnée chiffrée (`tabular-nums`).
- **Couleurs** : `brand-royal #1E2F8A` (bleu SICA), `brand-amber #F39200` (orange), `ink`, `slate`, `paper`, `mist`. Pas de purple, pas de gradient générique.
- **Icônes** : **Lucide** uniquement (stroke 1.5–2). Pas d'emoji.
- **Aesthetic Devis IA** : « Atelier numérique » — trame technique bleue 4 %, filet ambre signature, viseurs d'angle (cf. `Corner` dans devis-ia-spotlight).
- **Server-side** : tous les secrets via `.env.local` (jamais `NEXT_PUBLIC_`).
- **Supabase** : `service_role` côté serveur uniquement (`createAdminClient`) ; `anon`/`publishable` côté navigateur.

---

**Fin de l'index.** Pour reprendre le travail sans contexte, lisez d'abord §1 (survol), §2 (Devis IA) et §8 (où travailler).
