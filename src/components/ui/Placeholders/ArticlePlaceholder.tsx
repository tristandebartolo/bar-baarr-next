"use client";
// Types
export type ArticlePlaceholderType = {
  modeDisplay: string;
  minHeight: string;
  fontSize: string;
};
// Composent
export default function ArticlePlaceholder({ modeDisplay = "card_left", minHeight = "1", fontSize = "2xl" }: ArticlePlaceholderType) {
  const modeDisplayArticle = modeDisplay || "card_left";
  const minHeightArticle = minHeight || "1";
  const fontSizeArticle = fontSize || "2xl";

  return (
    <div className={`min-h-${minHeightArticle} flex flex-col`}>
      <div className="w-full">
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
