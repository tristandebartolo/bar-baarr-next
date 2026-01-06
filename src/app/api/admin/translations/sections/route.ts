// src/app/api/admin/translations/sections/route.ts
import { NextRequest, NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { readdir, mkdir, readFile, writeFile, rm } from "fs/promises";
import { join } from "path";
import { requireAdmin } from "@/lib/auth/adminCheck";

const translationsDir = join(process.cwd(), "src", "translations");
// const languagesF©©©ile = join(translationsDir, "_languages.json");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getSupportedLanguages, getTranslationFilePath } from "@/lib/helpers/translationUtils";

export async function GET() {
  await requireAdmin();

  try {
    const entries = await readdir(translationsDir, { withFileTypes: true });
    const folders = entries
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_")) // Exclut _languages.json
      .map((entry) => entry.name);

    return NextResponse.json({ sections: folders });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return NextResponse.json({ sections: [] });
  }
}

export async function POST(req: NextRequest) {
  await requireAdmin();

  const { name } = await req.json();

  if (!name || typeof name !== "string" || !/^[a-zA-Z0-9_-]+$/.test(name)) {
    return NextResponse.json({ error: "Nom invalide (lettres, chiffres, _ ou - uniquement)" }, { status: 400 });
  }

  const sectionPath = join(translationsDir, name);

  try {
    await mkdir(sectionPath);

    // Chargement dynamique des langues
    const supportedLanguages = await getSupportedLanguages();

    // Création des fichiers JSON pour chaque langue (avec contenu vide ou copié depuis fr)
    for (const lang of supportedLanguages) {
      const initialContent = "{}";
      await writeFile(join(sectionPath, `${lang}.json`), initialContent + "\n");
    }

    return NextResponse.json({ success: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.code === "EEXIST") {
      return NextResponse.json({ error: "Section déjà existante" }, { status: 409 });
    }
    return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  await requireAdmin();

  const { name } = await req.json();

  if (!name || typeof name !== "string" || !/^[a-zA-Z0-9_-]+$/.test(name)) {
    return NextResponse.json({ error: "Nom de section invalide" }, { status: 400 });
  }

  const sectionPath = join(translationsDir, name);

  try {
    await rm(sectionPath, { recursive: true, force: true });
    return NextResponse.json({ success: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.code === "ENOENT") {
      return NextResponse.json({ error: "Section non trouvée" }, { status: 404 });
    }
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}