// Actions
import { ccCookies, getDataWithCookie } from "@/lib/action";
// Auth
import { auth } from "@/auth/auth";
// Next
import { notFound } from "next/navigation";

import { JournalResponse } from "@/lib/types/index";
import PageLanding from "@/components/Pages/PageLanding";
import PageArticle from "@/components/Pages/PageArticle";
// Props
type PageProps = {
  params: Promise<{ locale: string; alias: string[] }>;
};
// Page
export default async function Page({ params }: PageProps) {

  const session = await auth();
  const { locale, alias } = await params;
  const currentTheme = (await ccCookies("theme")) || "dark";

  const buildedAlias = `/${alias.join("/")}`;

   const post: JournalResponse = await getDataWithCookie(
    buildedAlias,
    session,
    locale,
  );

  if (post?.success && !post?.node) {
    notFound();
  }
  
  const { node } = post;

  // Si node est null → 404 (ou tu peux afficher un loader)
  if (!node) {
    notFound();
  }

  return (
    <>
     {node.bundle === "article" ? (
        <>
          <PageArticle node={node} locale={locale} theme={currentTheme} />
        </>
      ) : (
        <PageLanding node={node} locale={locale} />
      )}
    </>
  );
}
