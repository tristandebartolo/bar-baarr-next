# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Vue d'ensemble

Frontend Next.js 15 découplé pour un CMS Drupal - "Le journal du Bar.Bâ.a.r.r" (Yamn). Journal/magazine multi-langue avec authentification, rendu dynamique de contenu et fonctionnalités temps réel via Socket.IO.

## Stack technique

- **Framework:** Next.js 15.5.7 (App Router, Turbopack) + React 19
- **Langage:** TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS 4 + SCSS modules + UIKit 3.24
- **Auth:** NextAuth 5 (beta) avec JWT + credentials Drupal
- **i18n:** next-intl (locales: fr, en, it, de)
- **Temps réel:** Socket.IO 4.8
- **CMS:** Drupal découplé via API REST

## Commandes

```bash
yarn dev          # Serveur dev avec Turbopack
yarn build        # Build production
yarn start        # Démarrer serveur production
yarn lint         # ESLint
yarn ndmn         # Dev avec nodemon (tsx)
yarn ndmn-build   # Build serveur + compilation TS
yarn ndmn-start   # Serveur production avec Socket.IO
```

⚠️ **IMPORTANT:** Toujours utiliser yarn.

## Structure du projet

```
/src
├── /app                    # Pages App Router
│   ├── /[locale]           # Routes préfixées par locale (fr, en, it, de)
│   │   ├── /(admin)        # Section admin (protégée)
│   │   ├── /(auth)         # Pages auth (/club = login)
│   │   └── /(journal)      # Articles via catch-all [...alias]
│   └── /api                # Routes API NextAuth + admin
├── /auth                   # Config NextAuth (auth.ts, session.ts)
├── /components
│   ├── /Navbar, /Header, /Footer
│   └── /ui
│       ├── /DrupalParagraphsEmbed  # Composants par type de paragraphe
│       ├── /DrupalEntities         # Rendu dynamique d'entités
│       └── /LayoutRenderer         # Dispatcher Layout Builder
├── /context                # FrontContext (état global + Socket.IO)
├── /lib
│   ├── /action             # Server actions (MediaAction, cookies)
│   ├── /helpers            # pathTools, utilsTools, etc.
│   └── /types              # Définitions TypeScript
├── /i18n                   # Config next-intl
└── /translations           # Fichiers JSON traductions
```

## Fichiers et dossiers à ignorer

⚠️ **IMPORTANT:** Lors de la recherche, l'analyse ou la modification de code, **TOUJOURS ignorer** :
- `/trash` - Fichiers obsolètes ou en cours de suppression
- `node_modules/` - Dépendances
- `.next/` - Build Next.js
- `dist/` - Build de production

Ne jamais lire, modifier ou référencer ces fichiers sauf demande explicite.

## Patterns d'architecture

### Fetching de données

Fetching côté serveur via server actions dans `src/lib/action/MediaAction.ts`:
- `getDataByAlias()` - Récupérer page par alias URL
- `getDataWithCookie()` - Fetch authentifié avec CSRF
- `getAccueil()` - Données page d'accueil
- `getMenu()` - Menu Drupal via API Linkset
- `getDataEmbed()` - Données paragraphe/entité

Endpoints API configurés dans `src/lib/helpers/pathTools.ts` via variables d'environnement.

### Rendu des paragraphes Drupal

1. **LayoutRenderer** distribue les sections Layout Builder aux composants
2. **DrupalEntities** hydrate les tags `<drupal-paragraph>` et `<drupal-media>` dans le HTML
3. **Composants paragraphe** mappent les types de bundle:
   - `articles` / `articles_by_term` → ArticlesOrkesterParagraph
   - `video` → VideoParagraph
   - `galerie` → GalerieParagraph
   - `message` → MessageParagraph
   - `post_x` → XParagraph

### Séparation composants Serveur/Client

- Layouts racine sont des composants serveur async (fetch menus, données)
- Fonctionnalités interactives utilisent la directive `"use client"`
- Pattern: `Navbar.tsx` (serveur) → `NavbarClient.tsx` (client)

### Flux d'authentification

1. Credentials envoyés à Drupal `/user/login`
2. Cookie session + token CSRF extraits
3. Chiffrés dans JWT via NextAuth
4. Déchiffrés pour appels API authentifiés

## Styling

### Tailwind + UIKit

- Styling principal via utilitaires Tailwind
- UIKit pour layouts complexes (grilles masonry, éléments sticky)
- Modules CSS pour styles scopés aux composants

### Classes Tailwind dynamiques

⚠️ **IMPORTANT:** Les classes suivantes sont pré-compilées via `@source inline` et **peuvent être utilisées dynamiquement** (avec interpolation de chaînes) :

```typescript
// ✅ Valide - Classes pré-compilées
className={`text-${fontSize}`}  // fontSize = 'xl', '2xl', etc.
className={`md:text-${size}`}   // Avec breakpoints
```

**Classes disponibles :**

- **Max-width (largeurs max):** `max-w-{md,lg,xl,2xl,3xl,4xl,5xl,6xl,7xl}`
  - Avec breakpoints: `{,md:,lg:,xl:,2xl:}max-w-{...}`

- **Grid columns (colonnes de grille):** `grid-cols-{1,2,3,4,5,6}`
  - Avec breakpoints: `{,md:,lg:,xl:}grid-cols-{...}`

- **Column span (étendue de colonne):** `col-span-{1,2,3,4,5,6}`
  - Avec breakpoints: `{,md:,lg:,xl:}col-span-{...}`

- **Text size (tailles de texte):** `text-{xs,sm,md,base,lg,xl,2xl,3xl,4xl,5xl,6xl,7xl,8xl,9xl}`
  - Avec breakpoints: `{,md:,lg:,xl:,2xl:}text-{...}`

- **Min-height (hauteurs min):** `min-h-{1,4,8,16,32,40,80,120,160,200,240,280,320,screen,auto}`
  - Avec breakpoints: `{,md:,lg:,xl:}min-h-{...}`

- **Items alignment (alignement items):** `items-{start,center,end}`
  - Avec breakpoints: `{,md:,lg:,xl:}items-{...}`

- **Padding Y (espacement vertical):** `py-{0,4,8,12,16,24}`
  - Avec breakpoints: `{,md:,lg:,xl:}py-{...}`

- **Padding (espacement):** `p-{0,4,8,12,16,24}`
  - Avec breakpoints: `{,md:,lg:,xl:}p-{...}`

- **Width (largeurs fractionnelles):** `w-{1/1,1/2,1/3,2/3}`
  - Avec breakpoints: `{,md:,lg:,xl:}w-{...}`

- **Justify content (justification):** `justify-{start,center,end}`
  - Avec breakpoints: `{,md:,lg:,xl:}justify-{...}`

- **Self alignment (auto-alignement):** `self-{start,center,end}`
  - Avec breakpoints: `{,md:,lg:,xl:}self-{...}`

- **Flex basis (base flex):** `basis-{1/1,1/2,1/3,2/3}`
  - Avec breakpoints: `{,md:,lg:,xl:}basis-{...}`

- **Gap (espacement entre éléments):** `gap-{0,1,8,12,16,24}`
  - Avec breakpoints: `{,md:,lg:,xl:}gap-{...}`

Déclaration dans le CSS global :
```css
@source inline("{,md:,lg:,xl:,2xl:}max-w-{md,lg,xl,2xl,3xl,4xl,5xl,6xl,7xl}");
@source inline("{,md:,lg:,xl:}grid-cols-{1,2,3,4,5,6}");
@source inline("{,md:,lg:,xl:}col-span-{1,2,3,4,5,6}");
@source inline("{,md:,lg:,xl:,2xl:}text-{xs,sm,md,base,lg,xl,2xl,3xl,4xl,5xl,6xl,7xl,8xl,9xl}");
@source inline("{,md:,lg:,xl:}min-h-{1,4,8,16,32,40,80,120,160,200,240,280,320,screen,auto}");
@source inline("{,md:,lg:,xl:}items-{start,center,end}");
@source inline("{,md:,lg:,xl:}py-{0,4,8,12,16,24}");
@source inline("{,md:,lg:,xl:}p-{0,4,8,12,16,24}");
@source inline("{,md:,lg:,xl:}w-{1/1,1/2,1/3,2/3}");
@source inline("{,md:,lg:,xl:}justify-{start,center,end}");
@source inline("{,md:,lg:,xl:}self-{start,center,end}");
@source inline("{,md:,lg:,xl:}basis-{1/1,1/2,1/3,2/3}");
@source inline("{,md:,lg:,xl:}gap-{0,1,8,12,16,24}");
```

### Système de thème

Variables CSS dans `globals.css`:
- `--color-x-one` / `--color-x-one-hover` - Couleur primaire
- `--container` - Largeur max (80rem)
- `--color-bgcontainer` / `--color-txtcontainer` - Background/texte

Classes de thème: `.bleu`, `.apple`, `.fushia`, `.red`
Mode sombre: classe `.dark` ou préférence système

## Variables d'environnement

Copier `default.env` vers `.env` et configurer:
- `AUTH_SECRET` - Secret NextAuth (requis)
- `DRUPAL_HOSTNAME` - URL backend Drupal
- `JOURNAL_API` - Auth API (base64)
- `NEXTAUTH_URL` - URL callback auth
- `DRUPAL_LOAD_*` - Chemins endpoints API

## Fichiers clés

- [middleware.ts](src/middleware.ts) - Détection locale, routing auth
- [auth/auth.ts](src/auth/auth.ts) - Configuration NextAuth
- [lib/action/MediaAction.ts](src/lib/action/MediaAction.ts) - Fetching données
- [lib/helpers/pathTools.ts](src/lib/helpers/pathTools.ts) - Endpoints API
- [context/FrontContext.tsx](src/context/FrontContext.tsx) - État global
- [components/ui/LayoutRenderer/LayoutRenderer.tsx](src/components/ui/LayoutRenderer/LayoutRenderer.tsx) - Dispatcher contenu

## Intégrations externes

- **Drupal CMS:** Backend contenu
- **PayPal:** Paiements via @paypal/react-paypal-js
- **Nodemailer:** Envoi d'emails
