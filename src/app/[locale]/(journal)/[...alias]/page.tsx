// Actions
import { ccCookies, getDataWithCookie } from "@/lib/action";
// Auth
import { auth } from "@/auth/auth";
// Next
import { notFound } from "next/navigation";

import { JournalResponse } from "@/lib/types/index";
import PageLanding from "@/components/Pages/PageLanding";
import PageArticle from "@/components/Pages/PageArticle";
import { debugLog } from "@/lib/helpers/logger";
import DebugInfo from "@/components/DebugInfo";
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

  await debugLog('buildedAlias PAGE', { buildedAlias, locale, hasSession: !!session });

   const post: JournalResponse = await getDataWithCookie(
    buildedAlias,
    session,
    locale,
  );

  await debugLog('post response', {
    success: post?.success,
    hasNode: !!post?.node,
    bundle: post?.node?.bundle,
    status: post?.node?.status
  });

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
      <DebugInfo
        label="Page Debug"
        data={{
          buildedAlias,
          locale,
          bundle: node.bundle,
          status: node.status
        }}
      />
    </>
  );
}
