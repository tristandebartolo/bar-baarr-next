"use client";
// Types
import { ArticleParagraphProps } from "@/lib/types/typesParagraphEmbed";
// Composent
export default function ArticleOverlayPlaceholder({ node }: { node: ArticleParagraphProps }) {
  const modeDisplay = node?.field_mode_display || "card_left";
  const minHieght = node?.field_min_height || "1";
  const fonSize = node?.field_font_size || "2xl";

  return (
    <div className={`min-h-${minHieght} flex flex-col justify-center gap-4`}>
      <div className="w-full px-5">
        <div className="container mx-auto flex animate-pulse flex-col xl:max-w-7xl">
          <div className="mb-3 flex h-8 w-3xs max-w-full justify-center rounded-lg bg-gray-200 md:h-12 md:w-sm dark:bg-stone-800"></div>
          <div className="mb-3 flex h-3 w-2xs max-w-full justify-center rounded-lg bg-gray-200 md:w-xl dark:bg-stone-800"></div>
          <div className="mb-3 flex h-3 w-md max-w-full justify-center rounded-lg bg-gray-200 md:w-2xl dark:bg-stone-800"></div>
          <div className="mb-3 flex h-2 w-xs max-w-full justify-center rounded-lg bg-gray-200 md:w-md dark:bg-stone-800"></div>
          <div className="mb-3 flex h-2 w-2xs max-w-full justify-center rounded-lg bg-gray-200 md:w-sm dark:bg-stone-800"></div>
        </div>
      </div>
    </div>
  );
}
