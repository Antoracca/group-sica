# Structure définitive Groupe SICA — Navbar, pôles & pages V1

> **Mémoire de référence** — créé le 18 mai 2026 suite à audit complet du dossier technique et du cahier des charges. À consulter avant TOUTE modification de la navigation ou ajout de page sur les sites SICA.

---

## 🔒 RÈGLES IMMUABLES — anti-doublons

### Pôles SICA — sourcés du dossier technique 36 pages
SICA possède **EXACTEMENT 2 pôles** et **PAS UN DE PLUS** :

| Pôle | Services internes — NE PAS faire de pôle séparé pour ces services |
|---|---|
| **SICA Construction** | BTP, génie civil, **géobéton** (signature), bâtiment, charpente métallique, plomberie, électricité, VRD, terrassement, études de sol pressiométriques, location d'engins BTP, immobilier |
| **SICA Assistance** | Création & modification d'entreprises, **comptabilité & fiscalité**, déclarations fiscales/sociales, **juridique**, conseil en gestion d'entreprise, suivi administratif, accompagnement entrepreneurs |

### ❌ Faux pôles à NE JAMAIS recréer
- **"Comptable"** N'EST PAS un pôle séparé — c'est un service interne de SICA Assistance (sous "Comptabilité & fiscalité").
- **"Réalisations"** N'EST PAS un pôle — c'est du contenu Construction (page `/projets` sur sicaconstruction.ci).
- **"Géobéton"** N'EST PAS un pôle — c'est un service Construction (matériau signature).
- **"Études de sol"** N'EST PAS un pôle — c'est un service Construction.

---

## 📐 Structure navbar Groupe SICA (groupesica.ci)

### mainNav — 4 entrées maximum
```
1. Le Groupe        → /groupe          (interne)
   └ À propos · Actualités · Carrières · Partenaires · Contact

2. Construction     → sicaconstruction.ci  (external)
   └ Accueil · Services BTP · Géobéton · Études de sol
   └ Réalisations · Devis · Espace client

3. Assistance       → sicaassistance.ci  (external)
   └ Accueil · Création d'entreprise · Comptabilité & fiscalité
   └ Juridique · Conseil PME · Espace client

4. Actualités       → /actualites       (interne)
```

### topNav adaptatif par brand
Helper `getTopNav(brand)` dans `packages/ui/src/lib/top-nav.ts`.

**Règle absolue** : on n'affiche JAMAIS le lien du site sur lequel on se trouve déjà.

| Sur le site Groupe | Sur Construction | Sur Assistance |
|---|---|---|
| Carrières | ↗ Groupe SICA | ↗ Groupe SICA |
| Partenaires | ↗ Assistance | ↗ Construction |
| Contact | Carrières | Carrières |
|  | Contact | Contact |

---

## 📄 Pages V1 créées sur groupesica.ci

| URL | Statut | Description |
|---|---|---|
| `/` | ✅ existait | Homepage avec hero vidéo + sections |
| `/groupe` | ✅ créée 18/05 | Page institutionnelle Vinci-style (dirigeant, valeurs, organigramme, implantations) |
| `/actualites` | ✅ créée 18/05 | Listing articles + featured |
| `/actualites/[slug]` | ✅ créée 18/05 | Article détail + articles liés |
| `/carrieres` | ✅ créée 18/05 | Offres ouvertes + candidature spontanée |
| `/partenaires` | ✅ créée 18/05 | Listing partenaires par catégorie |
| `/contact` | ✅ créée 18/05 | Formulaire + 2 adresses + canaux |
| `/mentions-legales` | ✅ créée 18/05 | Mentions légales (RCCM, capital, etc.) |
| `/confidentialite` | ✅ créée 18/05 | Politique de données (ARTCI/RGPD) |
| `/cookies` | ✅ créée 18/05 | Politique cookies (Plausible only) |
| `/espace-client` | ✅ existait | Page de connexion e-SICA (split screen) |
| `/realisations` | ⚠️ à reconsidérer | Conserver comme showcase Groupe OU rediriger vers `sicaconstruction.ci/projets` |

---

## 🎯 5 fonctionnalités premium GIRA — état d'avancement

| # | Fonctionnalité | Site cible | Statut |
|---|---|---|---|
| 1 | Assistant IA 24/7 (Claude Haiku) | Groupe + Construction + Assistance | ❌ pas démarré |
| 2 | Suivi chantier temps réel (Supabase Realtime) | Construction (espace-client) | ❌ pas démarré |
| 3 | Carte interactive projets (MapLibre) | Construction | ❌ pas démarré |
| 4 | Signature électronique (in-house + Yousign) | Construction + Assistance | ❌ pas démarré |
| 5 | Tableau de bord direction | admin.sica.ci (Studio) | ❌ pas démarré |

---

## 🔧 Fichiers clés à connaître

- `apps/groupe/src/lib/nav.ts` — source mainNav + topNav (Groupe)
- `packages/ui/src/lib/top-nav.ts` — helper `getTopNav(brand)` partagé
- `packages/ui/src/components/site-header.tsx` — composant SiteHeader (icônes TopNavIcon)
- `apps/groupe/src/components/page-shell.tsx` — wrapper SiteHeader+Footer pour pages internes
- `apps/groupe/src/components/legal-page.tsx` — squelette pages légales
- `apps/groupe/src/components/footer.tsx` — footer Groupe avec colonne Accès Client
- `apps/groupe/src/lib/actualites.ts` — données seed actualités (V1) — à remplacer Supabase plus tard

---

## 🚨 ALERTES futures travaux

1. **Quand on ajoutera un service Construction** → ajouter dans `mainNav.Construction.children`, JAMAIS au top-level.
2. **Quand on ajoutera un service Assistance** → ajouter dans `mainNav.Assistance.children`, JAMAIS au top-level.
3. **Si on évoque "Comptable"** → c'est dans Assistance, pas un pôle.
4. **Si on évoque "Réalisations"** → c'est dans Construction, pas un pôle.
5. **Avant tout commit refactor nav** → relire ce fichier.
