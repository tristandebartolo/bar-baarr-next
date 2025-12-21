// src/app/api/admin/translations/route.ts
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { readFile, writeFile } from "fs/promises";
import { requireAdmin } from "@/lib/auth/adminCheck";

type Translations = Record<string, string>;

// const translationsDir = join(process.cwd(), "src", "translations");
// const languagesFile = join(translationsDir, "_languages.json");
import { getSupportedLanguages, getTranslationFilePath, translationsDir } from "@/lib/helpers/translationUtils";

function getFilePath(section: string, lang: string): string {
  if (section) {
    return join(translationsDir, section, `${lang}.json`);
  }
  return join(translationsDir, `${lang}.json`);
}

export async function GET(req: NextRequest) {
  await requireAdmin();

  const { searchParams } = new URL(req.url);
  const section = searchParams.get("section") || "";
  const lang = searchParams.get("lang") || "fr";

  // On accepte n'importe quelle langue existante (pas besoin de vérifier ici)
  try {
    const filePath = getFilePath(section, lang);
    const content = await readFile(filePath, "utf-8");
    return NextResponse.json(JSON.parse(content));
  } catch (e) {
    return NextResponse.json({}, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  await requireAdmin();

  const { section, lang, key, value } = await req.json();

  if (!key || !lang) {
    return NextResponse.json({ error: "Missing key or lang" }, { status: 400 });
  }

  // Chargement dynamique des langues supportées
  const supportedLanguages = await getSupportedLanguages();

  if (!supportedLanguages.includes(lang)) {
    return NextResponse.json({ error: "Langue non supportée" }, { status: 400 });
  }

  const filePath = getFilePath(section ?? "", lang);
  let data: Translations = {};

  try {
    const content = await readFile(filePath, "utf-8");
    data = JSON.parse(content);
  } catch (e) {
    data = {};
  }

  data[key] = value || "";

  await writeFile(filePath, JSON.stringify(data, null, 2) + "\n");

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  await requireAdmin();

  const { section, key } = await req.json();

  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }

  const supportedLanguages = await getSupportedLanguages();

  for (const lang of supportedLanguages) {
    const filePath = getTranslationFilePath(section ?? "", lang);
    try {
      const content = await readFile(filePath, "utf-8");
      const data: Translations = JSON.parse(content);
      if (data[key] !== undefined) {
        delete data[key];
        await writeFile(filePath, JSON.stringify(data, null, 2) + "\n");
      }
    } catch (e) {
      // Ignore si fichier ou clé n'existe pas
    }
  }

  return NextResponse.json({ success: true });
}