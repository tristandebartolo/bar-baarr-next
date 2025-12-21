// src/app/api/admin/translations/languages/route.ts
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { readdir, readFile, writeFile, mkdir } from "fs/promises";
import { requireAdmin } from "@/lib/auth/adminCheck";

const languagesFile = join(process.cwd(), "src", "translations", "_languages.json");
const translationsDir = join(process.cwd(), "src", "translations");

export async function GET() {
  await requireAdmin();
  try {
    const content = await readFile(languagesFile, "utf-8");
    const langs = JSON.parse(content);
    return NextResponse.json({ languages: langs });
  } catch (e) {
    return NextResponse.json({ languages: ["fr", "en"] });
  }
}

export async function POST(req: NextRequest) {
  await requireAdmin();

  const { code } = await req.json();

  if (!code || !/^[a-z]{2,3}$/.test(code)) {
    return NextResponse.json({ error: "Code langue invalide (ex: it, de, es)" }, { status: 400 });
  }

  let languages: string[] = ["fr", "en"];
  try {
    const content = await readFile(languagesFile, "utf-8");
    languages = JSON.parse(content);
  } catch (e) {}

  if (languages.includes(code)) {
    return NextResponse.json({ error: "Langue déjà existante" }, { status: 400 });
  }

  languages.push(code);
  await writeFile(languagesFile, JSON.stringify(languages, null, 2));

  // Migration : créer les fichiers + copier les clés françaises dans toutes les sections
  const sections = await readdir(translationsDir, { withFileTypes: true });
  const folders = sections.filter(d => d.isDirectory()).map(d => d.name);

  for (const folder of folders) {
    const frPath = join(translationsDir, folder, "fr.json");
    let frData = {};
    try {
      const content = await readFile(frPath, "utf-8");
      frData = JSON.parse(content);
    } catch (e) {}

    const newPath = join(translationsDir, folder, `${code}.json`);
    await writeFile(newPath, JSON.stringify(frData, null, 2)); // copie les valeurs françaises
  }

  // Racine aussi
  const rootFrPath = join(translationsDir, "fr.json");
  let rootFrData = {};
  try {
    const content = await readFile(rootFrPath, "utf-8");
    rootFrData = JSON.parse(content);
  } catch (e) {}

  await writeFile(join(translationsDir, `${code}.json`), JSON.stringify(rootFrData, null, 2));

  return NextResponse.json({ success: true, languages });
}