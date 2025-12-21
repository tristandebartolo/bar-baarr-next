// src/lib/translationUtils.ts
import { join } from "path";
import { readFile } from "fs/promises";

export const translationsDir = join(process.cwd(), "src", "translations");
export const languagesFile = join(translationsDir, "_languages.json");

/**
 * Charge la liste des langues supportées depuis _languages.json
 * Fallback sur ["fr", "en"] si fichier absent ou corrompu
 */
export async function getSupportedLanguages(): Promise<string[]> {
  try {
    const content = await readFile(languagesFile, "utf-8");
    const langs = JSON.parse(content);

    if (Array.isArray(langs) && langs.length > 0) {
      return langs;
    }
  } catch (e) {
    // Fichier non trouvé, corrompu, ou JSON invalide
    console.warn("Impossible de charger _languages.json, utilisation du fallback", e);
  }

  return ["fr", "en"];
}

/**
 * Retourne le chemin complet d'un fichier de traduction
 */
export function getTranslationFilePath(section: string, lang: string): string {
  if (section) {
    return join(translationsDir, section, `${lang}.json`);
  }
  return join(translationsDir, `${lang}.json`);
}

/**
 * Chemin vers le dossier des traductions
 */
export const getTranslationsDir = () => translationsDir;