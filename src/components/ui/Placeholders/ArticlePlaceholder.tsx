"use client";
// Types
export type ArticlePlaceholderType = {
  modeDisplay: string;
  minHeight: string;
  fontSize: string;
};
// Styles
import "./ArticlePlaceholder.scss";
// Composent
export default function ArticlePlaceholder({ modeDisplay = "card_left", minHeight = "1", fontSize = "2xl" }: ArticlePlaceholderType) {
  const modeDisplayArticle = modeDisplay || "card_left";
  const minHeightArticle = minHeight || "1";
  const fontSizeArticle = fontSize || "2xl";

  return (
    <div className={`flex flex-col`}>
      <div className="w-full">
        <div className="container mx-auto flex animate-pulse flex-col xl:max-w-7xl gap-1">
          <div className="plchr-i plchr-w-4 plchr-h-8"></div>
          <div className="plchr-i plchr-w-5 plchr-h-9"></div>
          <div className="plchr-i plchr-w-3 plchr-h-7"></div>
          <div className="plchr-i plchr-w-1 plchr-h-3 my-2"></div>
          <div className="plchr-i plchr-w-7 plchr-h-3"></div>
          <div className="plchr-i plchr-w-6 plchr-h-5"></div>
          <div className="plchr-i plchr-w-5 plchr-h-5"></div>
          <div className="plchr-i plchr-w-6 plchr-h-5"></div>
          <div className="plchr-i plchr-w-5 plchr-h-4"></div>
          <div className="plchr-i plchr-w-4 plchr-h-4"></div>
        </div>
      </div>
    </div>
  );
}
