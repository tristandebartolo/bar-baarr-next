// Actions
import { ccCookies, getDataByAlias, getDataWithCookie } from "@/lib/action";
// Auth
import { auth } from "@/auth/auth";
// Next
import { notFound, redirect } from "next/navigation";

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

  console.log(buildedAlias)

  // const post: JournalResponse = await getDataByAlias(
  //   buildedAlias,
  //   session,
  //   locale,
  // );

   const post: JournalResponse = await getDataWithCookie(
    buildedAlias,
    session,
    locale,
  );

  console.log('post2', post)

  if (post?.success && !post?.node) {
    notFound();
  }
  
  const { node } = post;

  // Si node est null → 404 (ou tu peux afficher un loader)
  if (!node) {
    notFound();
  }

  // console.log("post", post);

  // const Component = node?.bundle === "article" ? PageArticle : PageLanding;

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
