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
export type ArticleOverlayModeProps = {
  article: ArticleType | PageType;
  container: Pick<
    ItemsArticlesParagraphProps,
    "field_hn" | "field_show_title" | "field_font_size" | "field_mode_display" | "field_template_display" | "field_min_height" | 'field_mode'
  >;
};

/**
 * ArticleOverlayMode - Affiche un article en mode overlay
 * L'image est en fond avec le titre et les infos superposés
 */
export default function ArticleOverlayMode({ article, container }: ArticleOverlayModeProps) {
  const [isLoading, setIsLoading] = useState(true);

  const modeDisplayArticle = container?.field_mode_display || "overlay";
  const modeDisplay = container?.field_mode || "field_mode";
  const fontSizeArticle = container?.field_font_size || "2xl";
  const heightArticle = container?.field_min_height || "1";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <ArticlePlaceholder modeDisplay={modeDisplayArticle} minHeight={"1"} fontSize={fontSizeArticle} />;
  }

  const vignette = article.field_vignette?.[0]?.field_media_image?.[0];
  const imageUrl = vignette?.wide?.url || null;
  const imageUrlMobile = vignette?.wide?.mobile || null;
  const imageUrlWidth = vignette?.wide?.width || 100;
  const imageUrlHeight = vignette?.wide?.height || 100;
  const articleLink = article.path[0]?.alias || "#";
  const publishedDate = article.created ? formatDate(article.created, "fr") : null;

  return (
    <Link data-link-trigger className="group relative block" href={articleLink}>
      <article className={`group relative flex flex-col justify-end min-h-80 md:min-h-120 xl:min-h-${heightArticle} overflow-hidden rounded-xl transition-all duration-300`}>
        {/* Image de fond */}
        {imageUrl && (
          <div className="absolute inset-0">
            <picture>
              <source media="(max-width: 767px)" srcSet={`/media${imageUrlMobile as string}`} />
              <source media="(min-width: 768px)" srcSet={`/media${imageUrl}`} />
              <Image
                priority
                src={`/media${imageUrl}`}
                alt={article.title}
                width={imageUrlWidth as number}
                height={imageUrlHeight as number}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </picture>
          </div>
        )}

        {/* Placeholder */}
        <div className="absolute inset-x-0 bottom-0 h-full bg-linear-to-t from-stone-100/90 via-white/70 to-stone-200/30 backdrop-blur-sm transition-colors duration-500 group-hover:to-transparent dark:from-stone-800/80 dark:via-stone-800/40 dark:to-stone-400/10" />

        {/* Contenu superposé */}
        <div className="relative p-4 md:p-6 h-full">
          <div className="relative">
            {/* Date */}
            {publishedDate && <p className="mb-2 text-sm text-gray-600 dark:text-white/80">{publishedDate}</p>}

            {/* Titre */}
            <div className="text-gray-900 dark:text-white">
              <ArticleTitle title={article.title} container={container} />
              <ArticleChapo chapo={article} />
            </div>

            {/* Lien */}
            <div className={`mt-3 flex items-center gap-2 text-sm text-gray-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-white/90 ${modeDisplay === 'slider' ? 'pb-10' : ''}`}>
              <span className="group-hover:underline">Lire la suite</span>
              <span className="icon-gm-arrow_forward" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
