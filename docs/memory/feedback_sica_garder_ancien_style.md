---
name: feedback_sica_garder_ancien_style
description: "Le client a REJETÉ la refonte v2 « générique IA » du 25/11/2026 ; on garde l'ancien site (style, fond, forme) et on corrige seulement"
metadata:
  node_type: memory
  type: feedback
  originSessionId: a32405e2-c80c-4b75-b228-596f3e551a4e
  modified: 2026-11-26T01:11:53.307Z
---

Le 26/11/2026 l'utilisateur a détesté la refonte complète (nouveaux header/footer/sections « DESIGN.md v2 ») : « ça pue l'IA, tout est générique ». Elle a été annulée (`git stash` « refonte-v2-rejetee-2026-11-26 », récupérable avec `git show stash@{0}:chemin` / `stash@{0}^3:` pour les fichiers nouveaux).

Règle désormais :
- Garder la structure, les sections, la mise en page, le fond et la forme de l'ancien site (commit 954ba3a, juin 2026).
- Appliquer les couleurs imposées ([[feedback_sica_couleurs_officielles]]) et les corrections demandées par le DG dans les PDF de `docs/`.
- Le modèle de design fourni (dark, accent primaire + secondaire, Inter 600/800, cartes 16 px, pills) sert à affiner (finitions), pas à remplacer les sections.
- Ordre : page Groupe d'abord ; quand l'utilisateur valide, passer à Construction puis Assistance.

**Why:** une réécriture totale a produit un rendu générique qui a perdu l'identité du site déjà en ligne.
**How to apply:** modifications ciblées dans les fichiers existants, jamais de remplacement de sections entières ni de nouveaux composants génériques. Voir [[project_sica_refonte_v2]].
