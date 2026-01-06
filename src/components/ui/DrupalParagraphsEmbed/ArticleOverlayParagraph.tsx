// components/paragraphs/ArticlesParagraph.tsx
"use client";

import { ArticleParagraphProps } from "@/lib/types/typesParagraphEmbed";
import Link from "next/link";
import { useState, useEffect, JSX } from "react";
import ArticleOverlayPlaceholder from "../Placeholders/ArticleOverlayPlaceholder";

export default function ArticleOverlayParagraph({ node }: { node: ArticleParagraphProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const TitleTag = node.field_hn as keyof JSX.IntrinsicElements;
  // console.log("node", node);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const modeDisplay = node?.field_mode_display || "card_left";
  const minHieght = node?.field_min_height || "1";
  const fonSize = node?.field_font_size || "2xl";

  if (isLoading) {
    return <ArticleOverlayPlaceholder node={node} />;
  }

  return (
    <div className={`relative prgh-${node?.entity_bundle || "prgh"} ${modeDisplay === "overlay" ? `min-h-${minHieght}` : ""}`}>
      <div className={`mx-auto ${node.field_alignement}`}>
        {node.field_article && node.field_article?.length > 0 && (
          <div className="flex flex-col gap-4">
            {node.field_article.map((article) => {
              const vignette = article.field_vignette?.[0]?.field_media_image?.[0];
              const imageUrl = vignette?.wide?.url || null;
              const articleLink = article.path[0]?.alias || "#";
              const articleRubrique = article?.field_rubriques || null;
              const okOverlay = modeDisplay === "overlay" && imageUrl;
              return (
                <div
                  key={article.nid}
                  className={`min-h-${minHieght} flex-colitems-center mx-auto flex container xl:max-w-7xl items-center justify-center border border-gray-200 transition-all duration-200 ease-in-out dark:border-gray-800`}
                  // onClick={() => (window.location.href = articleLink)}  cursor-pointer
                >
                  {okOverlay && (
                    <>
                      <div
                        data-col-img=""
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${imageUrl})`,
                        }}
                      />
                      <div className="absolute inset-0 bg-white/70 dark:bg-black/70" />
                    </>
                  )}

                  <div data-col-info="" className={`relative mx-auto flex basis-1/1 flex-col justify-between py-16`}>
                    <div data-col-footer="" className="flex justify-between gap-4 px-8 text-sm">
                      <div>
                        <ul className="flex">
                          {/* <li>
                            <Link data-link-trigger className="text-sm" href={articleLink}>
                              Lire l&apos;article
                            </Link>
                          </li> */}
                          {articleRubrique &&
                            articleRubrique.map((rubrique, i) => {
                              return (
                                <li key={i} className="group relative overflow-hidden rounded-xl shadow-lg">
                                  <Link data-link-trigger className="text-sm" href={articleLink}>
                                    {rubrique.name}
                                  </Link>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </div>
                    <div data-col-body="">
                      <TitleTag className={`text-one mb-1 px-8 pt-0 leading-none text-${fonSize}`}>{article.title}</TitleTag>
                      <div
                        className="mb-3 px-8 text-lg leading-6"
                        dangerouslySetInnerHTML={{
                          __html: Array.isArray(article.field_chapo) ? article.field_chapo.join("") : article.field_chapo || "",
                        }}
                      />
                    </div>
                    <div data-col-footer="" className="flex justify-between gap-4 px-8 text-sm">
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
