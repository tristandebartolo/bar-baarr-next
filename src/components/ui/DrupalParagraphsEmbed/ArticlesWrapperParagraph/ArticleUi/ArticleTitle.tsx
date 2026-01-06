"use client";
import { fontSizeCChild, hnCChild } from "@/lib/helpers/designTools";
import { ItemsArticlesParagraphProps } from "@/lib/types/typesParagraphEmbed";
// Libs
import { JSX } from "react";
// Types
export type ArticleTitleType = {
  title: string;
  container: Pick<ItemsArticlesParagraphProps, "field_hn" | "field_show_title" | "field_font_size" | "field_mode_display" | "field_template_display">
};
// Composent
export default function ArticleTitle({ title, container }: ArticleTitleType) {
  const currentHn = container?.field_hn || "h2";
  const hnSize = container?.field_font_size || "2xl";
  const hnConvert = hnCChild(currentHn)
  const hnSizeConvert = fontSizeCChild(hnSize)
  const TitleTag = hnConvert as keyof JSX.IntrinsicElements;
  return <TitleTag className={`mb-8 transition-colors group-hover:text-one text-${hnSizeConvert} break-before-all font-bold text-gray-900 dark:text-white`}>{title}</TitleTag>;
}
