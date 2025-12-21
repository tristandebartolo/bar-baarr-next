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
import styles from "./PageArticle.module.css";
import { JournalSommaireSnippet } from "../ui/JournalSommaire/JournalSommaireSnippet";
import AuthForm from "../Auth/AuthForm";
// import { formatDate } from "@/lib/helpers/utilsTools";

// Cette fonction marche maintenant en français côté serveur !
const formatDate = (dateString: string, locale: string) => {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Paris",
  }).format(new Date(dateString));
};

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
  const collectionData = node?.field_collection || null;
  const thematiquesData = node?.field_thematiques || null;
  const rubriquesData = node?.field_rubriques || null;
  const trombinoscopeData = node?.field_trombinoscope || null;
  const authorsData = node?.field_authors || null;
  // const isPublic = node?.ccs || null;

  console.log("trombinoscopeData", node);

  return (
    <>
      <div className="pp-article container mx-auto flex font-sans 2xl:max-w-(--container) dark:text-cyan-50">
        <div className="flex gap-4 px-5 py-16">
          <main className="w-1/1">
            {node && (
              <>
                <h1 className={`${styles.h1} my-1`}>{node.title}</h1>

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
          </main>
        </div>
      </div>
      {node?.field_embed_url && !Array.isArray(node.field_embed_url) && node.field_embed_url !== '' && (
        <div className="mb-16">
          <VideoWithConsent url={node.field_embed_url} />
        </div>
      )}
      <div className="pp-article container mx-auto flex font-sans 2xl:max-w-(--container) dark:text-cyan-50">
        <div className="gap-4 px-5 md:flex" id="js-oversized">
          {/* Sidebar Sticky */}
          <div className="w-full md:w-1/4">
            <SidebarSticky
              options={{
                offset: 90,
                end: "#js-oversized",
                media: 768,
              }}
            >
              <div>
                Visuellement, The Addiction est un bijou brut, grâce à la photographie en noir et blanc de Ken Kelsch, qui évoque les films noirs des
                années 50 tout en capturant un New York crasseux, juste avant sa gentrification. La bande-son, mêlant le score de Joe Delia à des
                éclats de rap comme Cypress Hill
              </div>
            </SidebarSticky>
          </div>
          <div className="md:w-3/4">
            <div className="gg-body">
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
          {/* Sidebar Sticky */}
          <div className="max-md:hidden md:w-1/4">
            <SidebarSticky
              options={{
                offset: 90,
                end: "#js-oversized",
                media: 768,
              }}
            >
              {isPublic && node?.sommaire && <JournalSommaire sommaire={node.sommaire} />}
            </SidebarSticky>
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
