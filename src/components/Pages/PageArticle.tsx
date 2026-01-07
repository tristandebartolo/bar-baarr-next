// "use client";
// Lib
import Image from "next/image";
// Types
import { JournalNode } from "@/lib/types/index";
// Components
import { JournalSommaire } from "../ui/JournalSommaire/JournalSommaire";
import SidebarSticky from "../ui/SidebarSticky/SidebarSticky";
import VideoWithConsent from "../ui/VideoEmbed/VideoWithConsent";
import DrupalEntities from "../ui/DrupalEntities/DrupalEntities";
import ArticleAuthors from "../ui/Article/ArticleAuthors";
// Styles
import { JournalSommaireSnippet } from "../ui/JournalSommaire/JournalSommaireSnippet";
import AuthForm from "../Auth/AuthForm";
import { formatDate } from "@/lib/helpers/utilsTools";

const getRemainingReadingPercentage = (totalMinutes: number, previewMinutes: number): string => {
  // Sécurité : éviter division par zéro ou valeurs négatives
  if (totalMinutes <= 0) return "100% de l'article à lire";
  if (previewMinutes <= 0) return "100% de l'article à lire";

  // On limite previewMinutes au total pour éviter pourcentage négatif
  const effectivePreview = Math.min(previewMinutes, totalMinutes);

  // Calcul du pourcentage lu
  const percentRead = Math.round((effectivePreview / totalMinutes) * 100);

  // Calcul du pourcentage restant
  const percentRemaining = 100 - percentRead;

  // Retour formaté
  return `Il reste ${percentRemaining}% de l'article à lire`;
};

// Component
export function PageArticle({ node, locale, theme }: { node: JournalNode; locale: string; theme: string }) {
  const publishedDate = node.created ? formatDate(node.created, locale) : null;

  const portraitAuthor = node?.author?.picture || null;

  const timeOfRead = node?.count_text || 0;
  const timeOfReadPrview = node?.count_text_preview || 0.5;
  const isPublic = node?.ccs || null;
  const timeOfReadRest = getRemainingReadingPercentage(timeOfRead, timeOfReadPrview);
  // const collectionData = node?.field_collection || null;
  // const thematiquesData = node?.field_thematiques || null;
  // const rubriquesData = node?.field_rubriques || null;
  // const trombinoscopeData = node?.field_trombinoscope || null;
  const authorsData = node?.field_authors || null;
  // const isPublic = node?.ccs || null;

  // console.log("trombinoscopeData", node);

  return (
    <>
      <div className="pp-article container mx-auto flex font-sans 2xl:max-w-(--container) dark:text-cyan-50">
        <div className="flex gap-4 px-5 py-16">
          <header className="w-1/1">
            {node && (
              <>
                <h1 className={`text-5xl md:text-7xl my-1 font-black`}>{node.title}</h1>

                {/* Chapô */}
                {node.field_chapo && (
                  <div className="prose prose-lg dark:prose-invert my-5 max-w-none text-2xl" dangerouslySetInnerHTML={{ __html: node.field_chapo }} />
                )}
                <div className="mt-4 flex flex-col gap-1 text-sm text-gray-600 md:flex-row md:items-end md:gap-3 lg:gap-6 dark:text-gray-400">
                  {publishedDate && <p className="text-sm">{publishedDate}</p>}
                  {authorsData && authorsData?.length > 0 && <p className="max-md:hidden"> • </p>}
                  <ArticleAuthors authors={authorsData} />
                  {timeOfRead && (
                    <>
                      <p className="max-md:hidden"> • </p>
                      <p className="">{timeOfRead} minutes de lecture</p>
                    </>
                  )}
                </div>
                {/* portrait Author */}
                {portraitAuthor && node && (
                  <div className="relative">
                    <Image priority src={portraitAuthor} alt={node.title} width={100} height={100} className="" />
                  </div>
                )}
              </>
            )}
          </header>
        </div>
      </div>
      {node?.field_embed_url && !Array.isArray(node.field_embed_url) && node.field_embed_url !== "" && (
        <div className="mb-16">
          <VideoWithConsent url={node.field_embed_url} />
        </div>
      )}
      <div id="article-container" className="pp-article container mx-auto flex max-w-(--container) font-sans dark:text-cyan-50">
        <div className="gap-8 px-5 md:flex">
          {/* Sidebar Sticky */}
          <div className="w-full md:w-1/4 max-lg:hidden">
            <SidebarSticky
              options={{
                offset: 90,
                end: "#article-container",
                media: 768,
                id: "sidebar-info",
              }}
            >
              <div className="sidebar-wrapper pb-8">
                {node && (
                  <div className="">
                    <h2 className={`my-1 text-4xl`}>{node.title}</h2>
                    <div className="mt-4 flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-400">
                      {publishedDate && <p className="text-sm">{publishedDate}</p>}
                      <ArticleAuthors authors={authorsData} />
                      {timeOfRead && (
                        <>
                          <p className="">{timeOfRead} minutes de lecture</p>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </SidebarSticky>
          </div>
          {/* Sidebar Sticky */}
          <div className="md:w-1/4">
            <SidebarSticky
              options={{
                offset: 90,
                end: "#article-container",
                media: 768,
                id: "sidebar-plus",
              }}
            >
              <div className="sidebar-wrapper pb-8">
                {isPublic && node?.sommaire && <JournalSommaire sommaire={node.sommaire} />}
                {/* <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in consectetur ligula. Maecenas venenatis egestas turpis, at
                  gravida lectus dapibus at. Praesent quam nisl, euismod eu leo pretium, varius ullamcorper mi. Fusce at laoreet arcu. Sed tristique
                  ante tortor, lobortis auctor ipsum lacinia congue. Quisque blandit vulputate sollicitudin. Nam vel molestie purus. Quisque a ligula
                  sed urna elementum aliquam. Integer molestie eu libero eu imperdiet.
                </p> */}
              </div>
            </SidebarSticky>
          </div>
          {/* Main */}
          <div className="md:w-3/4">
            <div className="gg-body pb-3">
              <div className="flex flex-col gap-3">
                {node.body && (
                  <DrupalEntities langcode={locale} theme={theme}>
                    <div dangerouslySetInnerHTML={{ __html: node.body }} />
                  </DrupalEntities>
                )}
                {/* {node?.body && (
                  <div dangerouslySetInnerHTML={{ __html: node.body }} />
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {!isPublic && (
        <div className="bg-one mt-16 min-h-100 py-16 text-black">
          <div className="pp-article container mx-auto flex font-sans 2xl:max-w-(--container)">
            <div className="w-full gap-4 px-5 md:flex">
              {/* Sidebar Sticky */}
              <div className="md:w-1/4"></div>
              <div className="md:w-3/4">
                <h2 className="text-5xl">{timeOfReadRest}</h2>
                <p>Cet article est reservé au abonnée</p>
                <AuthForm />
                {node?.sommaire && node?.sommaire.length > 0 && <JournalSommaireSnippet sommaire={node.sommaire as string[]} />}
              </div>
              {/* Sidebar Sticky */}
              <div className="max-md:hidden md:w-1/4"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default PageArticle;
