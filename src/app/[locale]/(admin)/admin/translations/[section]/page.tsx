import TranslationManager from "@/app/[locale]/(admin)/admin/translations/TranslationManager";

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  // On await les params (obligatoire en Next.js 15)
  const { section } = await params;

  return <TranslationManager section={section} />;
}