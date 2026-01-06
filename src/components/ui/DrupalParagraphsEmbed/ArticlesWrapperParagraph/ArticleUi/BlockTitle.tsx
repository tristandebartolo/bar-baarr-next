"use client";
// Types
import { ItemsArticlesParagraphProps } from "@/lib/types/typesParagraphEmbed";
// Libs
import { JSX } from "react";
// Types
export type ArticleTitleType = {
  container: Pick<ItemsArticlesParagraphProps, "field_title" | "field_hn" | "field_show_title" | "field_font_size">
  classTitle: string;
};
// Composent
export default function BlockTitle({ container, classTitle }: ArticleTitleType) {
  const TitleTag = container?.field_hn as keyof JSX.IntrinsicElements;
  const hnSize = container?.field_font_size || "2xl";
  const title = container?.field_title || null;
  return (
    <>
      {container?.field_show_title && title && (
        <TitleTag className={`mb-8 text-${hnSize} font-bold text-gray-900 dark:text-white ${classTitle}`}>{title}</TitleTag>
      )}
    </>
  );
}
