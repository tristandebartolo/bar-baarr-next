"use client";
// Types
import { PageType, ArticleType, ItemsArticlesParagraphProps } from "@/lib/types/typesParagraphEmbed";
import { ModeDisplayType } from "@/lib/types/typesOptionsJournal";
// Components
import ArticleCardMode from "./ArticleCardMode";
import ArticleOverlayMode from "./ArticleOverlayMode";
import ArticleListMode from "./ArticleListMode";

// Props type for the selector
export type ArticleDisplaySelectorProps = {
  article: ArticleType | PageType;
  container: Pick<ItemsArticlesParagraphProps, "field_hn" | "field_show_title" | "field_font_size" | "field_mode_display" | "field_template_display">;
};

// Display modes mapping
const OVERLAY_MODES: ModeDisplayType[] = ["overlay"];
const LIST_MODES: ModeDisplayType[] = ["list"];
const CARD_MODES: ModeDisplayType[] = ["card", "card_only", "card_left", "card_right", "tiny", "tiny_left", "tiny_right"];

/**
 * ArticleDisplaySelector - Composant intelligent qui sélectionne
 * le bon mode d'affichage pour un article
 */
export default function ArticleDisplaySelector({ article, container }: ArticleDisplaySelectorProps) {
  const modeDisplay = container?.field_mode_display || "card";

  // Sélection du composant selon le mode d'affichage
  if (OVERLAY_MODES.includes(modeDisplay)) {
    return <ArticleOverlayMode article={article} container={container} />;
  }

  if (LIST_MODES.includes(modeDisplay)) {
    return <ArticleListMode article={article} container={container} />;
  }

  // Mode par défaut: card (et variantes)
  if (CARD_MODES.includes(modeDisplay)) {
    return <ArticleCardMode article={article} container={container} />;
  }

  // Fallback vers le mode card
  return <ArticleCardMode article={article} container={container} />;
}
