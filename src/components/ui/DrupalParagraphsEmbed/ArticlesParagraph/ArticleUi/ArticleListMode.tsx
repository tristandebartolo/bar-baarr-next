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

// Props type
export type ArticleListModeProps = {
  article: ArticleType | PageType;
  container: Pick<ItemsArticlesParagraphProps, "field_hn" | "field_show_title" | "field_font_size" | "field_mode_display" | "field_template_display">;
};

/**
 * ArticleListMode - Affiche un article en mode liste
 * Format compact avec image miniature à gauche et infos à droite
 */
export default function ArticleListMode({ article, container }: ArticleListModeProps) {
  const [isLoading, setIsLoading] = useState(true);

  const modeDisplayArticle = container?.field_mode_display || "list";
  const fontSizeArticle = container?.field_font_size || "lg";

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

  // Catégories de l'article
  const categories = article.field_rubriques || article.field_thematiques || [];

  return (
    <Link data-link-trigger className="group relative block" href={articleLink}>
      <article className="flex items-start gap-4 border-b border-gray-200 py-4 transition-colors duration-200 hover:bg-gray-50/50 dark:border-gray-700 dark:hover:bg-gray-800/50">
        {/* Image miniature */}
        {imageUrl && (
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg md:h-24 md:w-24">
            <picture>
              <source media="(max-width: 767px)" srcSet={`/media${imageUrlMobile as string}`} />
              <source media="(min-width: 768px)" srcSet={`/media${imageUrl}`} />
              <Image
                src={`/media${imageUrl}`}
                alt={article.title}
                width={imageUrlWidth as number}
                height={imageUrlHeight as number}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </picture>
          </div>
        )}

        {/* Contenu */}
        <div className="flex flex-1 flex-col justify-center">
          {/* Catégories */}
          {categories.length > 0 && (
            <div className="mb-1 flex flex-wrap gap-2">
              {categories.slice(0, 2).map((cat) => (
                <span
                  key={cat.tid}
                  className="text-xs font-medium uppercase tracking-wide text-one"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}

          {/* Titre */}
          <div className="mb-1">
            <ArticleTitle title={article.title} container={{
              ...container,
              field_font_size: "lg"
            }} />
          </div>

          {/* Meta infos */}
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            {publishedDate && <span>{publishedDate}</span>}
            <span className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <span>Lire</span>
              <span className="icon-gm-arrow_forward text-xs" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
