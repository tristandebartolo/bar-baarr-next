// Lib
import type { Metadata } from "next";
import { notFound } from "next/navigation";
// Actions
import { getAccueil, getMetatags } from "@/lib/action";
// Composents
import PageLanding from "@/components/Pages/PageLanding";
// Types
type PropsMetatags = {
  params: Promise<{ locale: string }>;
};
// generateMetadata
export async function generateMetadata(
  { params }: PropsMetatags,
): Promise<Metadata> {
  // const locale = (await params).locale
  const { locale } = await params;
  const accueil = await getMetatags("0", "nid", "home", locale);
  // console.log('accueil', accueil)
  return accueil && accueil.node
    ? accueil.node
    : {
        title: "home",
      };
}
// Page
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const accueil = await getAccueil(locale);

  if (!accueil?.success && !accueil?.node) {
    return notFound();
  }

  console.log("accueil", accueil);

  return (
    <PageLanding node={accueil.node} locale={locale} />
  );
}
