---
name: SICA Assistance — source de vérité (contexte projet)
description: Référentiel unique pour le site sicaassistance.ci. À relire avant toute tâche Assistance. Tout est sourcé du dossier technique et de docs/CONTEXTE.md. Interdiction d'inventer.
type: project
---

# SICA Assistance — Contexte & source de vérité

> Document à relire AVANT toute intervention sur `apps/assistance`. Rien dans ce
> fichier ne doit être inventé : tout provient de `docs/CONTEXTE.md` (consolidation
> du dossier technique 36 pages) et des fichiers mémoire. Si une information manque,
> on demande au client, on ne génère pas.

## 1. Positionnement

SICA Assistance est le pôle **administratif et conseil** du Groupe SICA (holding).
Pendant administratif de SICA Construction (le pôle BTP). Le site doit ressembler
à Construction par l'identité et la qualité, mais avec un registre **administratif,
institutionnel, de confiance** : lecture longue, structure claire, sobriété.

Hiérarchie du holding :
- **Groupe SICA** = holding corporate (groupesica.ci)
- **SICA Construction** = pôle BTP (sicaconstruction.ci)
- **SICA Assistance** = pôle administratif et conseil (sicaassistance.ci)

## 2. Services SICA Assistance (sourcés — à reprendre tels quels, ne pas inventer)

1. Création et modification d'entreprises
2. Assistance administrative et juridique
3. Gestion comptable et fiscale
4. Déclarations fiscales et sociales
5. Conseil en gestion d'entreprise
6. Suivi administratif des sociétés
7. Accompagnement des entrepreneurs et porteurs de projets

## 3. Faits d'entreprise réutilisables (sourcés)

- Raison sociale : GROUPE SICA (SARL)
- RCCM : CI-ABJ-03-2020-B13-17592
- Capital : 2 500 000 FCFA
- Compte contribuable : 2054314X · CNPS employeur : 378047
- Certificat IDU : CI20200014890K · Régime fiscal : TEE
- Banque : AFG BANK CI — CI93 CI260 01210 01389869 0001 45
- Directeur : Ngoran Ivan (élu Meilleur jeune entrepreneur ivoirien 2023)
- Siège : Abidjan, Cocody Mermoz · Succursale : Yamoussoukro, Morofé
- Téléphones : +225 07 09 88 32 93 · +225 01 02 44 28 94 · +225 27 22 24 74 45
- Email : groupesica@gmail.com
- Valeurs : Engagement, Dynamisme, Professionnalisme, Satisfaction client, Rigueur, Innovation, Responsabilité
- Devise officielle : « Vos défis sont les nôtres : lancez-vous ! »
- Vision : devenir une référence en Côte d'Ivoire dans l'assistance aux entreprises et la construction moderne.
- Mission : accompagner particuliers et entreprises avec professionnalisme dans leurs démarches administratives, projets entrepreneuriaux et réalisations immobilières.

> Donnée à NE PAS inventer : aucun chiffre client (nombre de dossiers traités, taux
> de réussite, etc.) n'est sourcé. On n'affiche que des faits vérifiables (année de
> création 2020, RCCM, implantations, valeurs). Tout chiffre marketing doit être
> validé par le client avant affichage.

## 4. Charte Assistance (sourcée docs/CONTEXTE.md §3)

- Répartition : **65% royal / 5% amber / 30% paper**. Codes administratifs, lecture
  longue, **peu d'orange**. **Light only** (pas de dark mode, contrairement à Groupe/Construction).
- Couleurs (tokens partagés `@sica/tokens`) : `brand-royal` #1E2F8A, `brand-royal-900`,
  `brand-amber` #F39200 (usage parcimonieux), `ink`, `slate`, `mist`, `paper`,
  `success` #1F8A56, `warning` #C97A0D, `danger` #B5283A.
- Typographies : **Geist (display + body) + Geist Mono (labels, références, données)**,
  cohérence stricte avec SICA Construction. On NE change PAS de police par site.
- Iconographie : **Lucide** uniquement, curées par contexte. Aucun emoji. Aucune icône générique non pertinente.

## 5. Cohérence inter-sites obligatoire

- Header : composant partagé `@sica/ui` `SiteHeader` avec `brand="assistance"`.
- Top-nav : `getTopNav("assistance", …)` déjà prêt dans `@sica/ui` (cross-links Groupe / Construction / SICA + Contact).
- CTA header scrolled Assistance : « Démarrer mon dossier ».
- Composants réutilisables : `Container`, `Button`, `SectionHeader`, `StickyCtaMobile`, `Logo`.
- Logo : `/logo-assistance.png` (présent dans public).

## 6. Règles éditoriales (copywriting)

- Ton humain, naturel, crédible, professionnel. Registre administratif accessible
  aux non-spécialistes (un entrepreneur, pas un juriste).
- Vocabulaire : création d'entreprise, formalités, RCCM, statuts, comptabilité,
  déclarations, accompagnement, conseil, dossier, démarches.
- INTERDITS : texte généré générique, slogans creux, jargon vide, emoji, tirets
  cadratins (—) utilisés comme séparateurs dans les phrases.

## 7. Architecture des pages prévue (docs/CONTEXTE.md §8)

`/` institutionnel · `/services` (+ détail des 7 services) · `/simulateur` (création
SARL/SA : capital, secteur, estimation) · `/intake` (formulaire intelligent) ·
`/espace-client` (suivi dossier) · `/ressources` (modèles, guides PDF) ·
`/actualites` · `/contact` · pages légales.

> Le périmètre V1 effectif (quelles pages on construit en premier) est décidé avec
> le client. Voir docs/TASKS.md section Assistance.

## 8. Stack (verrouillée, identique au reste du monorepo)

Next.js 16 (App Router) + React 19 + TypeScript strict + Tailwind (preset `@sica/config`)
+ Motion v11 (`motion/react`) + Geist via `next/font/google`. Mobile-first prioritaire
(90% du trafic est mobile selon le client).

## 9. Priorité absolue : mobile-first

Le client insiste : l'expérience mobile prime. Concevoir mobile d'abord, puis étendre.
Cibles : texte body >= 16px mobile, cibles tactiles >= 44px, breakpoints 360/480/640/768/1024/1280/1440/1920,
`prefers-reduced-motion` respecté, contraste WCAG AA.

---

*Source de vérité — à maintenir à jour à chaque évolution du pôle Assistance.*
