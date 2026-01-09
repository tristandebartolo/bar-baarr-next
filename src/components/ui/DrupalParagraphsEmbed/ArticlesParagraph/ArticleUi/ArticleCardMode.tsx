"use client";
// Lib
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
// Types
import { PageType, ArticleType, ItemsArticlesParagraphProps } from "@/lib/types/typesParagraphEmbed";
// Tools
import { formatDate } from "@/lib/helpers/utilsTools";
// Components
import ArticlePlaceholder from "@/components/ui/Placeholders/ArticlePlaceholder";
import ArticleTitle from "./ArticleTitle";
import ArticleChapo from "./ArticleChapo";

// Props type
export type ArticleCardModeProps = {
  article: ArticleType | PageType;
  container: Pick<ItemsArticlesParagraphProps, "field_hn" | "field_show_title" | "field_font_size" | "field_mode_display" | "field_template_display">;
};

/**
 * ArticleCardMode - Affiche un article en mode carte
 * Supporte les variantes: card, card_only, card_left, card_right, tiny, tiny_left, tiny_right
 */
export default function ArticleCardMode({ article, container }: ArticleCardModeProps) {
  const [isLoading, setIsLoading] = useState(true);

  const modeDisplayArticle = container?.field_mode_display || "card";
  const fontSizeArticle = container?.field_font_size || "2xl";
  const modeDisplayTemplateArticle = container?.field_template_display || "tmp1";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <ArticlePlaceholder modeDisplay={modeDisplayArticle} minHeight={"1"} fontSize={fontSizeArticle} />;
  }

  const withoutImg = ["card", "card_left", "card_right", "tiny_right", "tiny_left"];
  const isTiny = ["tiny", "tiny_right", "tiny_left"];
  const vignette = article.field_vignette?.[0]?.field_media_image?.[0];
  const imageUrl = vignette?.wide?.url || null;
  const imageUrlMobile = vignette?.wide?.mobile || null;
  const imageUrlWidth = vignette?.wide?.width || 100;
  const imageUrlHeight = vignette?.wide?.height || 100;
  const articleLink = article.path[0]?.alias || "#";
  const withImg = withoutImg.includes(modeDisplayArticle) && imageUrl;
  const publishedDate = article.created ? formatDate(article.created, "fr") : null;

  // Templates d'affichage (colonnes) basés sur field_template_display
  const templateDisplayColsImg =
    {
      tmp1: "md:basis-1/2",
      tmp2: "md:basis-1/3",
      tmp3: "md:basis-1/4",
      tmp4: "md:basis-1/5",
      tmp5: "md:basis-2/5",
    }[modeDisplayTemplateArticle] || "basis-1/2";

  const templateDisplayCols =
    {
      tmp1: "md:basis-1/2",
      tmp2: "md:basis-2/3",
      tmp3: "md:basis-3/4",
      tmp4: "md:basis-4/5",
      tmp5: "md:basis-3/5",
    }[modeDisplayTemplateArticle] || "basis-1/2";

  // Styles pour les modes d'affichage basés sur field_mode_display
  const modeDisplayClass =
    {
      card: "flex flex-col",
      card_only: "flex flex-col",
      card_left: "flex flex-col items-stretch md:flex-row",
      card_right: "flex flex-col items-stretch md:flex-row-reverse",
      overlay: "flex flex-col",
      tiny: "flex flex-col",
      tiny_left: "flex flex-col md:flex-row",
      tiny_right: "flex flex-col md:flex-row-reverse",
      list: "flex flex-col"
    }[modeDisplayArticle] || "flex flex-col";

  return (
    <Link data-link-trigger className="group relative" href={articleLink}>
      <article
        key={article.nid}
        className={`group ${modeDisplayClass} transition-all duration-200 ease-in-out gap-5`}
      >

        {withImg && modeDisplayArticle !== "card_only" && (
          <div data-col-img="" className={`relation ${templateDisplayColsImg} overflow-hidden rounded-xl border-0`}>
            <picture>
              <source media="(max-width: 767px)" srcSet={`/media${imageUrlMobile as string}`} />
              <source media="(min-width: 768px)" srcSet={`/media${imageUrl}`} />
              <Image
                priority
                src={`/media${imageUrl}`}
                alt={article.title}
                width={imageUrlWidth as number}
                height={imageUrlHeight as number}
                className="min-h-full min-w-full object-cover"
              />
            </picture>
          </div>
        )}

        <div data-col-info="" className={`relative flex flex-col ${withImg ? templateDisplayCols : "w-1/1"} mx-auto justify-between p-0`}>
          <div data-col-body="">
            {publishedDate && <p className="text-sm">{publishedDate}</p>}
            <ArticleTitle title={article.title} container={container} />
            {/* <ArticleChapo chapo={article} tiny={isTiny.includes(modeDisplayArticle)} /> */}
          </div>
          {/* <div data-col-footer="" className="flex justify-between gap-4 text-sm">
            <div>
              <ul className="mb-10 flex gap-4">
                <li>
                  <button className="flex cursor-pointer items-center gap-1">
                    <span className="group-hover:underline">Lire la suite</span>
                    <span className="icon-gm-arrow_forward" />
                  </button>
                </li>
              </ul>
            </div>
          </div> */}
        </div>
      </article>
    </Link>
  );
}
