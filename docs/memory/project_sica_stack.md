---
name: SICA — stack technique et charte graphique verrouillées
description: Décisions techniques et design validées par le client SICA, à ne pas remettre en cause sans son accord explicite.
type: project
originSessionId: 9ba9197f-632c-4857-85df-dbe6ee129509
---
**Stack confirmée par le client (mai 2026)** :
- Front : Next.js 16 (App Router, RSC) + TypeScript strict + Tailwind + shadcn/ui + Motion v12 (Turbopack par défaut)
- Back : Supabase (Postgres + Auth + Realtime + Storage + Edge Functions)
- IA : Anthropic Claude Haiku 4.5 par défaut (`claude-haiku-4-5`), bascule Sonnet 4.6 (`claude-sonnet-4-6`) si complexe, via Vercel AI SDK + prompt caching + tool calling
- Maps : MapLibre GL JS + tuiles MapTiler free tier
- PDF : react-pdf
- Signature : hybride canvas+OTP+SHA-256 < 2 M FCFA, Yousign API v3 au-delà (valeur OHADA)
- Hosting : Vercel 4 projets distincts + Supabase Cloud, domaines `.ci` via GIRA/NIC.CI
- Monorepo : Turborepo + pnpm workspaces, structure `apps/{groupe,construction,assistance,studio}` + `packages/{ui,tokens,config,db,auth,i18n,ai,pdf,signature,maps,analytics,emails}`

**Charte couleurs (extraite des 3 logos PNG)** :
- Primary `brand.royal` = **#1E2F8A** (bleu profond royal/cobalt)
- Accent `brand.amber` = **#F39200** (orange vif)
- Variantes royal 700/900, amber 600 dans `packages/tokens`

**Typographies** : Display = General Sans (Fontshare), Body = Inter Tight, Mono = JetBrains Mono. **Pas Inter ni Poppins seuls — trop vu.**

**Why** : ces choix ont été validés explicitement par AskUserQuestion. Les remettre en cause forcerait à reprendre une nouvelle phase de cadrage.

**How to apply** : utiliser ces noms exacts dans le code (`brand.royal`, `brand.amber`, etc.). Charger fonts via `next/font`. Ne pas proposer Mapbox, Docusign, Material UI, Chakra, Vue, etc. sans demander.
