"use client";
// Libs
import { JSX, useEffect, useRef, useState } from "react";
import UIkit from "uikit";
// Types
import { ItemsArticlesParagraphProps } from "@/lib/types/typesParagraphEmbed";
// Composents
import ArticleTitle from "@/components/ui/DrupalParagraphsEmbed/ArticlesWrapperParagraph/ArticleUi/ArticleTitle";
import BlockTitle from "@/components/ui/DrupalParagraphsEmbed/ArticlesWrapperParagraph/ArticleUi/BlockTitle";
import ArticleNode from "./ArticleUi/ArticleNode";
// Composent
export default function ArticlesGridWrapperParagraph({ node }: { node: ItemsArticlesParagraphProps }) {
  const gridRef = useRef<HTMLDivElement>(null);

  // const TitleTag = node.field_hn as keyof JSX.IntrinsicElements;

  useEffect(() => {
    if (node.field_mode === "grid" && gridRef.current) {
      UIkit.grid(gridRef.current, { masonry: "next", margin: 'uk-grid-margin-large' });
    }
  }, [node.field_mode]);

  const hasArticles = node?.field_articles || null;
  if (!hasArticles) {
    return null;
  }

  const overlayDisplay = ["overlay", "overlay_list"];
  const numberColumns = node?.field_mode_grid || "2";
  const numberColumnsMd = node?.field_mode_grid_md || "2";
  const hnSize = node?.field_font_size || "2xl";
  const gapColumns = node?.field_gap || "2";
  const modeDisplay = node?.field_mode_display || "card_left";

  return (
    <div className="mx-auto flex w-full flex-col">
      <BlockTitle container={node} classTitle={"title-block"} />
      <div
        ref={gridRef}
        className={`relative md:grid md:grid-cols-${numberColumnsMd} lg:grid-cols-${parseInt(numberColumns) > 4 ? parseInt(numberColumns)-1 : numberColumns} xl:grid-cols-${numberColumns} md:items-start gap-5`}
      >
        {node.field_articles.map((nd, i) => {
          if (overlayDisplay.includes(modeDisplay)) {
            return (
              <div key={i} className={``}>
                <ArticleTitle title={nd.title} container={node} />
              </div>
            );
          } else {
            return <ArticleNode key={i} article={nd} container={node} />;
          }
        })}
      </div>
    </div>
  );
}
