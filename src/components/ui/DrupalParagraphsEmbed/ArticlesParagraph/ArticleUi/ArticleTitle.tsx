"use client";
import { fontSizeCChild, hnCChild } from "@/lib/helpers/designTools";
import { ItemsArticlesParagraphProps } from "@/lib/types/typesParagraphEmbed";
import { ElementType } from "react";

// Types
export type ArticleTitleType = {
  title: string;
  container: Pick<ItemsArticlesParagraphProps, "field_hn" | "field_show_title" | "field_font_size" | "field_mode_display" | "field_template_display">
};

// Component
export default function ArticleTitle({ title, container }: ArticleTitleType) {
  const isTitleBlockActive = container?.field_show_title || false;
  const defaultHn = container?.field_hn || 'h2';
  const defaultFontSize = container?.field_font_size || '2xl';

  const currentHn = isTitleBlockActive ? hnCChild(defaultHn) : defaultHn;
  const currentFontSize = isTitleBlockActive ? fontSizeCChild(defaultFontSize) : defaultFontSize;

  const TitleTag = currentHn as ElementType;

  return (
    <TitleTag
      className={`mb-8 transition-colors group-hover:text-one text-${currentFontSize} break-before-all font-bold text-gray-900 dark:text-white`}
    >
      {title}
    </TitleTag>
  );
}
