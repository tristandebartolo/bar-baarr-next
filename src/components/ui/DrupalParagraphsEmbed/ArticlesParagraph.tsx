// components/paragraphs/ArticlesParagraph.tsx
"use client";

import { ArticlesParagraphDataProps } from "@/lib/types/typesParagraphEmbed";
import { useState, useEffect, JSX } from "react";

export default function ArticlesParagraph({ node }: {node: ArticlesParagraphDataProps}) {
  const [isLoading, setIsLoading] = useState(true);
  const TitleTag = node.field_hn as keyof JSX.IntrinsicElements;

  useEffect(() => {
    // Simule un chargement
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="my-12">
        <div className="mx-auto flex h-64 max-w-3xl animate-pulse items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700">
          <svg
            className="h-12 w-12 animate-spin text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      </div>
    );
  }

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
      card_left: "flex flex-col md:flex-row",
      card_right: "flex flex-col md:flex-row-reverse",
      tiny: "flex flex-col",
      tiny_left: "flex flex-col md:flex-row",
      tiny_right: "flex flex-col md:flex-row-reverse",
    }[node.field_mode_display] || "flex flex-col";

  return (
    <div className={`my-12 prgh-${node?.entity_bundle || "prgh"}`}>
      <div className={`mx-auto max-w-3xl ${node.field_alignement}`}>
        {node.field_show_title && node.field_title && (
          <TitleTag className={`mb-3 font-bold`}>{node.field_title}</TitleTag>
        )}
        {node.field_articles.length > 0 && (
          <div className="flex flex-col gap-4">
            {node.field_articles.map((article) => {
              const vignette =
                article.field_vignette?.[0]?.field_media_image?.[0];
              const imageUrl = vignette?.wide?.url || vignette?.uri?.[0]?.url;
              const articleLink = article.path[0]?.alias || "#";

              return (
                <div
                  key={article.nid}
                  className={`group ${modeDisplayClass} flex-col border border-gray-200 dark:border-gray-800 transition-all duration-200 ease-in-out`}
                  // onClick={() => (window.location.href = articleLink)}  cursor-pointer
                >
                  {imageUrl && (
                    <div
                      data-col-img=""
                      className={`relation ${templateDisplayColsImg} overflow-hidden`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element -- Required for zoom/pan functionality in lightbox */}
                      <img
                        className="min-h-full min-w-full object-cover transition-all duration-200 ease-in-out group-hover:scale-115"
                        src={imageUrl}
                        alt={article.title}
                      />
                    </div>
                  )}

                  <div
                    data-col-info=""
                    className={`flex flex-col ${templateDisplayCols} justify-between p-0`}
                  >
                    <div data-col-body="">
                      <h3 className="text-one mb-1 px-8 pt-8 leading-none">
                        {article.title}
                      </h3>
                      <div
                        className="mb-3 px-8 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: Array.isArray(article.field_chapo)
                            ? article.field_chapo.join("")
                            : article.field_chapo || "",
                        }}
                      />
                    </div>
                    <div
                      data-col-footer=""
                      className="flex justify-between gap-4 bg-white text-sm dark:bg-neutral-800"
                    >
                      <div>
                        <ul className="flex">
                          <li>
                            <a
                              data-link-trigger=""
                              className="block p-4 transition duration-150 ease-in-out hover:bg-gray-100 dark:hover:bg-neutral-900"
                              href={articleLink}
                            >
                              <span className="icon-gm-article"></span>
                              <span className="hidden md:flex">
                                Lire l&apos;article
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul className="flex">
                          <li>
                            <a
                              data-favorite-trigger=""
                              className="block p-4 transition duration-150 ease-in-out hover:bg-gray-100 dark:hover:bg-neutral-900"
                              href={"#"}
                            >
                              <span className="icon-gm-favorite"></span>
                            </a>
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
