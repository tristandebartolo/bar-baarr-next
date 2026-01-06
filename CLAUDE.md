# CLAUDE.md - Bar-Baarr-Next

## Vue d'ensemble

Frontend Next.js 15 découplé pour un CMS Drupal - Journal/Magazine "Le journal du Bar.Bâ.a.r.r" (Yamn). Application multi-langue avec authentification, rendu dynamique de contenu et communication temps réel.

## Stack technique

- **Framework:** Next.js 15.5.7 avec App Router et React 19
- **Langage:** TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS 4 + SASS/SCSS modules
- **Auth:** NextAuth 5 (beta) avec JWT
- **i18n:** next-intl 4.6.0 (fr, en, it, de)
- **UI:** UIKit 3.24, lucide-react, GSAP
- **Temps réel:** Socket.IO 4.8
- **CMS:** Drupal découplé via API REST

## Structure du projet

```
/src
├── /app                    # App Router (pages et layouts)
│   ├── /[locale]           # Routes par locale (fr, en, it)
│   │   ├── /(admin)        # Section admin (protégée)
│   │   ├── /(auth)         # Pages d'authentification
│   │   └── /(journal)      # Pages articles/journal
│   └── /api                # Routes API (NextAuth, admin)
├── /components             # Composants React
│   ├── /Auth               # Composants authentification
│   ├── /Header, /Footer, /Navbar
│   └── /ui                 # Composants UI réutilisables
│       ├── /DrupalParagraphsEmbed  # Rendu paragraphes Drupal
│       ├── /Article        # Composants article
│       ├── /CookieBanner   # Gestion cookies
│       └── /VideoEmbed     # Intégration vidéos
├── /auth                   # Config NextAuth
├── /context                # Contexts React (FrontContext)
├── /i18n                   # Config internationalisation
├── /lib                    # Utilitaires
│   ├── /action             # Server actions
│   ├── /helpers            # Fonctions helper
│   └── /types              # Types TypeScript
└── /translations           # Fichiers JSON i18n
```

## Commandes

```bash
npm run dev          # Dev avec Turbopack
npm run build        # Build production
npm run start        # Démarrer serveur production
npm run ndmn-build   # Build serveur Node custom
npm run ndmn-start   # Démarrer serveur Node (Socket.IO)
```

## Architecture

### Rendu de contenu

Le système utilise un pattern Layout Builder pour le rendu dynamique :

- [LayoutRenderer.tsx](src/components/ui/LayoutRenderer/LayoutRenderer.tsx) - Dispatcher de composants
- Types de paragraphes supportés : articles, galeries, vidéos, messages, X/Twitter embeds

### Authentification

1. Credentials provider vers API Drupal
2. JWT encryption des données sensibles
3. Session cookies secure/httpOnly
4. CSRF token depuis Drupal

### Fetching de données

- **SSR** comme stratégie principale (composants async)
- Server actions pour cookies et CSRF
- API Drupal avec endpoints obfusqués

## Patterns importants

### Composants serveur vs client

- Layouts racine en SSR (async)
- Navbar charge les menus côté serveur
- Composants client marqués `"use client"`
- Suspense fallbacks pour opérations async

## Thème et styling

### Variables CSS (globals.css)

```css
--color-x-one          # Couleur primaire
--color-x-one-hover    # État hover
--container            # Max-width (80rem)
--color-bgcontainer    # Background
--color-txtcontainer   # Texte
```

### Thèmes de couleur

Classes disponibles : `.bleu`, `.apple`, `.fushia`, `.red`

Dark mode : classe `.dark` ou media query système

## Conventions de code

- Path alias : `@/*` → `./src/*`
- SCSS modules pour styles complexes
- Server actions dans `/lib/action/`
- Types centralisés dans `/lib/types/`

## Intégrations externes

- **Drupal CMS:** (backend)
- **PayPal:**
- **Nodemailer:** Envoi d'emails

## Notes de développement

- Build output : `standalone` (Docker/serverless ready)
- Images optimisées depuis `yamn.baarr.fr/sites/default/files/**`
- Socket.IO configuré pour features temps réel (game rooms)
- Middleware gère locale detection et routing
