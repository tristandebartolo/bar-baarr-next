"use client";
// Libs
import { useEffect, useRef } from "react";
import UIkit from "uikit";
// Types
import { ItemsArticlesParagraphProps } from "@/lib/types/typesParagraphEmbed";
// Composents
import BlockTitle from "@/components/ui/DrupalParagraphsEmbed/ArticlesParagraph/ArticleUi/BlockTitle";
import ArticleDisplaySelector from "./ArticleUi/ArticleDisplaySelector";
// Composent
export default function GridWrapper({ node, pembed }: { node: ItemsArticlesParagraphProps, pembed: boolean }) {

  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (node.field_mode === "grid" && gridRef.current) {
      UIkit.grid(gridRef.current, { masonry: "next" });
    }
  }, [node.field_mode]);

  const hasArticles = node?.field_articles || null;
  if (!hasArticles) {
    return null;
  }

  const numberColumns = node?.field_mode_grid || "2";
  const numberColumnsMd = node?.field_mode_grid_md || "2";
  const gapDisplay = node?.field_gap || "0";

  const marginGrid =
    {
      "1": "uk-grid-small", 
      "8": "uk-grid-medium",
      "12": "uk-grid-medium",
      "16": "uk-grid-large",
      "24": "uk-grid-large",
    }[gapDisplay] || "uk-grid-collapse";

  return (
    <div className={`mx-auto flex w-full flex-col card-${pembed ? 'page' : 'emb'}`}>
      <BlockTitle container={node} classTitle={"title-block"} />
      <div
        ref={gridRef}
        className={`relative uk-grid uk-child-width-1-1 uk-child-width-1-${numberColumnsMd}@m uk-child-width-1-${parseInt(numberColumns) > 4 ? parseInt(numberColumns)-1 : numberColumns}@l uk-child-width-1-${numberColumns}@xl md:items-start ${marginGrid}`}
      >
        {node.field_articles.map((nd, i) => (
          <div key={i}>
            <ArticleDisplaySelector article={nd} container={node} />
          </div>
        ))}
      </div>
    </div>
  );
}
