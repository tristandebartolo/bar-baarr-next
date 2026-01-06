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
export async function generateMetadata({ params }: PropsMetatags): Promise<Metadata> {
  const { locale } = await params;
  const accueil = await getMetatags("0", "nid", "home", locale);
  return accueil && accueil.node ? accueil.node : {title: "home"};
}
// Page
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const accueil = await getAccueil(locale);

  // const alias = `/article?alias=${'/journal/culture/arts/addiction-un-cocktail-vampirique'}`;
  // const accueilNode = await getApiArticlee(alias);
  // console.log('res.json()', accueilNode);

  if (!accueil?.success && !accueil?.node) {
    return notFound();
  }

  return <PageLanding node={accueil.node} locale={locale} />;
}
