"use client";
// Lib
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
// Types
import { PageType, ArticleType, ItemsArticlesParagraphProps } from "@/lib/types/typesParagraphEmbed";
// Tools
import { formatDate } from "@/lib/helpers/utilsTools";
// Composents
import ArticlePlaceholder from "@/components/ui/Placeholders/ArticlePlaceholder";
import ArticleTitle from "@/components/ui/DrupalParagraphsEmbed/ArticlesWrapperParagraph/ArticleUi/ArticleTitle";
import ArticleChapo from "./ArticleChapo";
// Components propstype
export type ArticlePropsType = {
  article: ArticleType | PageType;
  container: Pick<ItemsArticlesParagraphProps, "field_hn" | "field_show_title" | "field_font_size" | "field_mode_display" | "field_template_display">;
};
// Composent
export default function ArticleNode({ article, container }: ArticlePropsType) {
  // States
  const [isLoading, setIsLoading] = useState(true);
  // Const
  const modeDisplayArticle = container?.field_mode_display || "grid";
  const fontSizeArticle = container?.field_font_size || "2xl";
  const modeDisplayTemplateArticle = container?.field_template_display || "card";
  // Effects
  useEffect(() => {
    // Simule un chargement
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <ArticlePlaceholder modeDisplay={modeDisplayArticle} minHeight={"1"} fontSize={fontSizeArticle} />;
  }

  // | 'card_only' | "card" | "card_left" | "card_right" | "tiny" | "tiny_left" | "tiny_right" | 'overlay' | 'list';

  // const minHieght = node?.field_min_height || "1";
  const activeTitleArticle = container?.field_show_title || false;
  const withoutImg = ["card", "card_left", "card_right", "tiny_right", "tiny_left"];
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
      list: "flex flex-col",
      overlay: "flex flex-col",
      card_left: "flex flex-col items-stretch md:flex-row",
      card_right: "flex flex-col items-stretch md:flex-row-reverse",
      tiny: "flex flex-col",
      tiny_left: "flex flex-col md:flex-row",
      tiny_right: "flex flex-col md:flex-row-reverse",
    }[modeDisplayArticle] || "flex flex-col";

  return (
    <Link data-link-trigger className="group relative" href={articleLink}>
      <div
        key={article.nid}
        className={`group ${modeDisplayClass} transition-all duration-200 ease-in-out`}
        // onClick={() => (window.location.href = articleLink)}  cursor-pointer
      >
        {publishedDate && <p className="text-sm">{publishedDate}</p>}
        {withImg && (
          <div data-col-img="" className={`relation ${templateDisplayColsImg} mb-4 overflow-hidden rounded-xl border-0`}>
            <picture>
              {/* Mobile : charge l'image déjà cropée en 16:9 avec sujet centré */}
              <source media="(max-width: 767px)" srcSet={imageUrlMobile as string} />
              {/* Desktop/tablette : charge l'image dans le format choisi par l'utilisateur */}
              <source media="(min-width: 768px)" srcSet={imageUrl} />
              {/* Fallback pour Next.js Image (optimisation + lazy loading) */}
              <Image
                priority
                src={imageUrl}
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
            <ArticleTitle title={article.title} container={container} />
            <ArticleChapo chapo={article} />
          </div>
          <div data-col-footer="" className="flex justify-between gap-4 text-sm">
            <div>
              <ul className="mb-10 flex gap-4">
                {/* <li>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log("hellooo");
                    }}
                    className="cursor-pointer hover:text-red-400"
                    aria-label={false ? "Retirer des favoris" : "Ajouter aux favoris"}
                  >
                    <span className={`icon-gm-${false ? "favorite_outline" : "favorite"}`}></span>
                  </button>
                </li> */}
                <li className="">
                  <button className="flex cursor-pointer items-center gap-1">
                    <span className="group-hover:underline">Lire la suite</span>
                    <span className={`icon-gm-arrow_forward`}></span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
