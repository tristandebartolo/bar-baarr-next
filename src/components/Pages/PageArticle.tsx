// "use client";
// Types
import { JournalNode } from "@/lib/types/index";
import Image from "next/image";
// Components
import { JournalSommaire } from "../ui/JournalSommaire/JournalSommaire";
import SidebarSticky from "../ui/SidebarSticky/SidebarSticky";
// Styles
import styles from "./PageArticle.module.css";
import VideoWithConsent from "../ui/VideoEmbed/VideoWithConsent";
import DrupalEntities from "../ui/DrupalEntities/DrupalEntities";
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

// Component
export function PageArticle({
  node,
  locale,
  theme
}: {
  node: JournalNode;
  locale: string;
  theme: string;
}) {
  const publishedDate = node.created ? formatDate(node.created, locale) : null;

  const portraitAuthor = node?.author?.picture || null;

  const timeOfRead = node?.count_text || null;

  return (
    <>
      <div className="pp-article container mx-auto flex font-sans 2xl:max-w-(--container) dark:text-cyan-50">
        <div className="flex gap-4 px-5 py-24">
          <main className="w-1/1">
            {node && (
              <>
                <h1 className={styles.h1}>{node.title}</h1>
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  Par {node.author.prenom} {node.author.nom} • {publishedDate}{" "}
                  {timeOfRead
                    ? ` • Temps de lecture: ${timeOfRead} minutes`
                    : ``}
                </div>
                {/* Chapô */}
                {node.field_chapo && (
                  <div
                    className="prose prose-lg dark:prose-invert mt-12 max-w-none"
                    dangerouslySetInnerHTML={{ __html: node.field_chapo }}
                  />
                )}

                {portraitAuthor && (
                  <div className="relative">
                    <Image
                      priority
                      src={portraitAuthor}
                      alt={node.title}
                      width={100}
                      height={100}
                      className=""
                    />
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
      {node.field_embed_url && (
        <div className="my-16">
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
                Visuellement, The Addiction est un bijou brut, grâce à la
                photographie en noir et blanc de Ken Kelsch, qui évoque les
                films noirs des années 50 tout en capturant un New York
                crasseux, juste avant sa gentrification. La bande-son, mêlant le
                score de Joe Delia à des éclats de rap comme Cypress Hill
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
              {node?.sommaire && <JournalSommaire sommaire={node.sommaire} />}
            </SidebarSticky>
          </div>
        </div>
      </div>
    </>
  );
}
export default PageArticle;
