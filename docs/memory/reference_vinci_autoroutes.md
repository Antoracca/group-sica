---
name: Site de référence — Vinci Autoroutes (header pattern)
description: Analyse en direct via Chrome MCP du site vinci-autoroutes.com — comportement header scroll-hide/scroll-show à reproduire pour SICA.
type: reference
originSessionId: 9ba9197f-632c-4857-85df-dbe6ee129509
---
**URL** : https://www.vinci-autoroutes.com/fr/ — premier des 3 sites de référence fournis par le client.

**Stack technique observée** (depuis le DOM) :
- **Tailwind CSS** — classes utilitaires détectées (`h-full`, `w-full`, `opacity-0`, `focus-within:fixed`, `inset-0`, `z-[2001]`, `lg:px-8`, `2xl:px-12`, `bg-[rgba(8,30,91,0.55)]`, `bg-darkishBlue`, `shadow-[0_1px_8px_2px_rgba(0,0,0,0.3)]`).
- Couleur custom `bg-darkishBlue` = **rgb(0, 68, 137) = #004489**.

**Header — comportement à 3 états** (vérifié par scroll instrumenté) :

| État | scrollY | position | bg | Bloc droit | Notes |
|---|---|---|---|---|---|
| 1 — Initial | 0 | static (flux normal) | transparent | logo "FONDATION VINCI AUTOROUTES" | Laisse voir l'image hero, hauteur 120px |
| 2 — Scrolled (down) | ~120–600 | **fixed top-0** | #004489 solide + shadow `0 1px 8px 2px rgba(0,0,0,0.3)` | CTA orange "PROFITER DU TÉLÉPÉAGE" | z-index 2000, hauteur 120px, transition `all` |
| 3 — Deep down | > ~600 (scrolling down) | translateY(-100%) ou unmount | — | — | Header se cache pour libérer la vue |
| 4 — Scroll up | n'importe quand après état 3 | fixed top-0 | #004489 solide | CTA orange | Réapparition instantanée |

**Layout navbar** :
- Logo VINCI Autoroutes : top-left
- Menu central-gauche, 6 entrées en CAPS : INFO TRAFIC / ITINÉRAIRE ET SERVICES / ACTUALITÉS / CONSEILS / DÉCOUVERTES / CORPORATE
- Icône loupe (search) après "CORPORATE"
- Top-right : icône user + "ESPACE CLIENT" + zone CTA contextuelle (logo en état 1, bouton orange en état 2)

**Hero** :
- Image fond paysage autoroutier (Provence/Vaucluse, vignobles, route qui serpente)
- Titre énorme "Bien Voyager" en bold gigantesque blanc, italique léger
- Sous-titre CAPS : "VINCI AUTOROUTES VOUS ACCOMPAGNE CHAQUE JOUR, À TOUTE HEURE ET PAR TOUS LES TEMPS"
- Carte ULYS top-right (carte de télépéage promotion)
- Widget recherche centré bas du hero : 4 tabs (ITINÉRAIRE / INFO TRAFIC / DÉCOUVERTES / RECHERCHE) + 2 inputs ("Je pars de…" / "Je vais à…") + bouton flèche bleu foncé

**Application pour SICA** :
- Reproduire ce 3-state header avec hook React custom `useHeaderScroll` (basé sur `window.scrollY` + direction tracking via `useRef`).
- État 1 (sur hero) : header transparent, logo SICA gauche, nav 5-7 entrées (Construction / Assistance / Projets / Carte / Actualités / Contact + Espace client à droite).
- État 2 (scrolled) : `fixed top-0 bg-brand.royal shadow-…`, morph du bloc droit en CTA orange "Demander un devis" (Construction) ou "Démarrer mon dossier" (Assistance).
- État 3 (deep down) : `translate-y-[-100%]` + transition 250ms ease-out.
- État 4 (scroll up) : reset `translate-y-0` instantané.
- Penser à utiliser **Motion v12** (Framer) pour les transitions au lieu d'un hook custom — `useScroll` + `useMotionValueEvent` + `animate` sur `y` font ça nativement de manière performante.

**Why** : le client a explicitement choisi Vinci comme référence, exigeant le même comportement de header au minimum, idéalement mieux.

**How to apply** : quand on scaffoldera `packages/ui/components/SiteHeader.tsx`, implémenter ces 4 états avec Motion v12, threshold = hauteur hero (`100vh` ou `--header-threshold`). Le menu en CAPS Vinci-style n'est PAS obligatoire pour SICA — adapter au ton corporate BTP (CAPS plus discret ou pas de CAPS, à voir avec les 2 autres sites de référence).
