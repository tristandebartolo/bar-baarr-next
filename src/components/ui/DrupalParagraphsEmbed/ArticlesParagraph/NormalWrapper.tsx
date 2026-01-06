"use client";
// Libs
import { JSX, useEffect, useRef, useState } from "react";
import UIkit from "uikit";
// Types
import { ItemsArticlesParagraphProps } from "@/lib/types/typesParagraphEmbed";
// Composent
export default function NormalWrapper({ node, pembed }: { node: ItemsArticlesParagraphProps, pembed: boolean }) {
  const TitleTag = node.field_hn as keyof JSX.IntrinsicElements;

  const hasArticles = node?.field_articles || null;
  if (!hasArticles) {
    return null;
  }

  const numberColumns = node?.field_mode_grid || "2";
  const hnSize = node?.field_font_size || "2xl";

  // const gridCols =
  //   {
  //     "1": "g-cols g-cols-1",
  //     "2": "g-cols g-cols-2",
  //     "3": "g-cols g-cols-3",
  //     "4": "g-cols g-cols-4",
  //   }[numberColumns] || "2";

  return (
    <div className="my-12">
      <div className="mx-auto max-w-3xl">
        {node.field_show_title && node.field_title && (
          <TitleTag className={`mb-8 text-${hnSize} font-bold text-gray-900 dark:text-white`}>{node.field_title}</TitleTag>
        )}

        <div className={"space-y-12"}>
          {node.field_articles.map((nd, i) => (
            <li key={i} className="group relative overflow-hidden">
              {nd.title}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
