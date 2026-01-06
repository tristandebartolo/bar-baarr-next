// components/paragraphs/ArticlesParagraph.tsx
"use client";

import { ArticleParagraphProps } from "@/lib/types/typesParagraphEmbed";
import { useState, useEffect, JSX } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ArticleParagraph({ node }: { node: ArticleParagraphProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const TitleTag = node.field_hn as keyof JSX.IntrinsicElements;
  // console.log("node", node);
  useEffect(() => {
    // Simule un chargement
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const modeDisplay = node?.field_mode_display || "card_left";

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="basis-1/2">
          <div className="mx-auto flex h-64 max-w-3xl animate-pulse items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700">
            <svg className="h-12 w-12 animate-spin text-gray-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // | 'card_only' | "card" | "card_left" | "card_right" | "tiny" | "tiny_left" | "tiny_right" | 'overlay' | 'list';

  const minHieght = node?.field_min_height || "1";
  const fonSize = node?.field_font_size || "2xl";
  const imgRatio = node?.field_style_image || "crop169";

  // Templates d'affichage (colonnes) basés sur field_template_display
  const templateDisplayColsImg =
    {
      tmp1: "md:basis-1/2",
      tmp2: "md:basis-1/3",
      tmp3: "md:basis-1/4",
      tmp4: "md:basis-1/5",
      tmp5: "md:basis-2/5",
    }[node.field_template_display] || "basis-1/2";
  const templateDisplayCols =
    {
      tmp1: "md:basis-1/2",
      tmp2: "md:basis-2/3",
      tmp3: "md:basis-3/4",
      tmp4: "md:basis-4/5",
      tmp5: "md:basis-3/5",
    }[node.field_template_display] || "basis-1/2";

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
    }[modeDisplay] || "flex flex-col";

  const withoutImg = ["card", "card_left", "card_right", "tiny_right", "tiny_left"];

  return (
    <div className={`relative prgh-${node?.entity_bundle || "prgh"} ${modeDisplay === "overlay" ? `min-h-${minHieght}` : ""}`}>
      <div className={`mx-auto ${node.field_alignement}`}>
        {node.field_article && node.field_article?.length > 0 && (
          <div className="flex flex-col gap-4">
            {node.field_article.map((article) => {
              const vignette = article.field_vignette?.[0]?.field_media_image?.[0];
              const imageUrl = vignette?.wide?.url || null;
              const imageUrlMobile = vignette?.wide?.mobile || null;
              const imageUrlWidth = vignette?.wide?.width || 100;
              const imageUrlHeight = vignette?.wide?.height || 100;
              const articleLink = article.path[0]?.alias || "#";

              const withImg = withoutImg.includes(modeDisplay) && imageUrl;

              return (
                <div
                  key={article.nid}
                  className={`group${modeDisplay === "overlay" ? ` min-h-${minHieght} mx-auto max-w-7xl items-center justify-center` : ""} ${modeDisplayClass} border border-gray-200 transition-all duration-200 ease-in-out dark:border-gray-800`}
                  // onClick={() => (window.location.href = articleLink)}  cursor-pointer
                >
                  {withImg && (
                    <div data-col-img="" className={`relation ${templateDisplayColsImg} overflow-hidden`}>       
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

                  <div
                    data-col-info=""
                    className={`relative flex flex-col ${withImg ? templateDisplayCols : "w-1/1"} mx-auto justify-between p-0`}
                  >
                    <div data-col-body="">
                      <TitleTag className={`text-one mb-1 px-8 pt-8 leading-none text-${fonSize}`}>{article.title}</TitleTag>
                      <div
                        className="mb-3 px-8 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: Array.isArray(article.field_chapo) ? article.field_chapo.join("") : article.field_chapo || "",
                        }}
                      />
                    </div>
                    <div data-col-footer="" className="flex justify-between gap-4 px-8 pb-5 text-sm">
                      <div>
                        <ul className="flex">
                          <li>
                            <Link data-link-trigger className="text-sm" href={articleLink}>
                              Lire l&apos;article
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
