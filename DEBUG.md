# Guide de Debug en Production

## Activer le mode debug

Ajoutez cette variable dans votre `.env`:

```bash
NEXT_PUBLIC_DEBUG=true
```

## Méthodes de debugging

```ts
// Importer l'helper
import {debugLog} from "@/lib/helpers/logger";

// Utiliser l'helper
await debugLog('[DEBUG] log', {
  alias,
  langcode,
  mode,
  hasSession: !!session
});


```

### 1. Logs serveur (Terminal)

Les logs des Server Components apparaissent dans le terminal où tourne le serveur:

```bash
yarn ndmn          # Dev
yarn ndmn-start    # Production
```

Vous verrez:
- `[MIDDLEWARE]` - Logs du middleware (redirections)
- `[DEBUG]` - Logs de la page [...alias]

### 2. Logs fichier (logs/debug.log)

Les logs sont aussi écrits dans `logs/debug.log`:

```bash
# Suivre les logs en temps réel
tail -f logs/debug.log

# Voir les dernières lignes
tail -n 50 logs/debug.log

# Chercher un alias spécifique
grep "mon-article" logs/debug.log
```

### 3. Console navigateur (Client)

Le composant `<DebugInfo>` affiche un panneau en bas à droite du navigateur avec:
- L'alias de la page
- La locale
- Le bundle (article/page)
- Le statut

Les logs client apparaissent aussi dans la console du navigateur (F12).

## Tracer les redirections

Les redirections apparaissent dans le terminal avec le préfixe `[MIDDLEWARE]`:

```
[MIDDLEWARE] Add locale to path: /mon-article -> /fr/mon-article
[MIDDLEWARE] Processing: /fr/mon-article | Locale: fr
```

## Nettoyer les logs

```bash
rm -rf logs/*.log
```

## Désactiver le debug

Retirez ou commentez dans `.env`:

```bash
# NEXT_PUBLIC_DEBUG=true
```
