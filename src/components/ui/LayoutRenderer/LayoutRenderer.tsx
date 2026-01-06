"use client";
// Lib
import { Fragment, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
// Types
import {
  ArticleParagraphProps,
  ArticlesParagraphDataProps,
  ArticleType,
  ItemsArticlesParagraphProps,
  ItemsParagraphProps,
  LayoutParagraphRegionSettings,
  MessageParagraphDataProps,
  PageType,
  TexteParagraphProps,
  TwitterParagrapDataProps,
  VideoParagraphDataProps,
} from "@/lib/types/typesParagraphEmbed";
// Styles
import './LayoutRenderer.scss';
// Components
import ArticlesParagraph from "../DrupalParagraphsEmbed/ArticlesParagraph";
import ArticleParagraph from "../DrupalParagraphsEmbed/ArticleParagraph";
import ArticleOverlayParagraph from "../DrupalParagraphsEmbed/ArticleOverlayParagraph";
import TwitterPostParagraph from "../DrupalParagraphsEmbed/TwitterPostParagraph";
import MessageParagraph from "../DrupalParagraphsEmbed/MessageParagraph";
import VideoParagraph from "../DrupalParagraphsEmbed/VideoParagraph";
import ArticlesOrkesterParagraph from "../DrupalParagraphsEmbed/ArticlesOrkesterParagraph";
import ArticlesGridWrapperParagraph from "../DrupalParagraphsEmbed/ArticlesWrapperParagraph/ArticlesGridWrapperParagraph";
// Components Map
const PARAGRAPH_ARTICLE_MAP: Record<string, React.ComponentType<any>> = {
  card: ArticleParagraph,
  card_only: ArticleParagraph,
  list: ArticleParagraph,
  overlay: ArticleOverlayParagraph,
  card_left: ArticleParagraph,
  card_right: ArticleParagraph,
  tiny: ArticleParagraph,
  tiny_left: ArticleParagraph,
  tiny_right: ArticleParagraph,
};
// Composent
const renderBlock = (block: ItemsParagraphProps): ReactNode => {
  switch (block.entity_bundle) {

    case "articles":
    case "articles_by_term": {
      const articlesBlock = block as ItemsArticlesParagraphProps;
      return <ArticlesOrkesterParagraph node={articlesBlock} />;
    }

    case "grid":
    case "normal": {
      const articlesBlock = block as ItemsArticlesParagraphProps;
      return <ArticlesGridWrapperParagraph node={articlesBlock} />;
    }
    
    // case "article": {
    //   const b = block as ArticleParagraphProps;
    //   const art = b.field_article?.[0];
    //   if (!art) return null;
    //   const modeDisplay = b?.field_mode_display || "card_left";
    //   // const item = block as unknown;

    //   // On cherche le composant correspondant
    //   const ParagraphArticleMode = PARAGRAPH_ARTICLE_MAP[modeDisplay];
    //   if (!ParagraphArticleMode) {
    //     return;
    //   }
    //   return <ParagraphArticleMode node={b as ArticleParagraphProps} />;
    //   // return <ArticleParagraph node={item as ArticleParagraphProps} />
    // }

    // case "articles": {
    //   const b = block as ArticlesParagraphDataProps;
    //   const items = b.field_articles ?? [];
    //   return (
    //     <div className="grid grid-cols-1 gap-5">
    //       {items.map((art: ArticleType | PageType, i: number) => {
    //         const d = {
    //           entity_bundle: "article",
    //           field_article: [art],
    //           field_hn: b?.field_hn,
    //           field_alignement: b?.field_alignement,
    //           field_font_size: b?.field_font_size,
    //           field_mode_display: b?.field_mode_display,
    //           field_style_image: b?.field_style_image,
    //           field_template_display: b?.field_template_display,
    //           field_min_height: b?.field_min_height,
    //           id: b?.id,
    //           status: b?.status,
    //           uuid: b?.uuid,
    //           langcode: b?.langcode,
    //           parent_uuid: b?.parent_uuid,
    //           region: b?.region,
    //         };
    //         return (
    //           // On réutilise renderBlock en forçant le type
    //           <div key={i}>{renderBlock(d as ItemsParagraphProps)}</div>
    //         );
    //       })}
    //     </div>
    //   );
    // }

    // case "articles": {
    //   const items = block.field_articles ?? [];
    //   return (
    //     <div className="grid grid-cols-1 gap-5">
    //       {items.map((art: ArticleReference, i: number) => (
    //         // On réutilise renderBlock en forçant le type
    //         <div key={i}>
    //           {renderBlock({
    //             ...block,
    //             entity_bundle: "article",
    //             field_article: [art],
    //           } as ItemsParagraphProps)}
    //         </div>
    //       ))}
    //     </div>
    //   );
    // }

    case "text": {
      const b = block as TexteParagraphProps;
      // console.log("b", b);
      return (
        <div
          className={`prose prose-lg mx-auto ${b.field_font_size ? `text-${b.field_font_size}` : ""}`}
          dangerouslySetInnerHTML={{ __html: b.field_text }}
        />
      );
    }

    case "message": {
      const b = block as MessageParagraphDataProps;
      return <MessageParagraph node={b} />;
    }

    case "video": {
      const b = block as VideoParagraphDataProps;
      return <VideoParagraph  node={b}/>;
    }

    case "post_x": {
      const b = block as TwitterParagrapDataProps;
      return <TwitterPostParagraph node={b} />;
    }

    // TwitterPostParagraph

    // case "accordions": {
    //   const accs = (block as AccordionsBlock).field_accordions ?? [];
    //   return (
    //     <div className="space-y-4">
    //       {accs.map((acc) => (
    //         <details key={acc.uuid} className="group rounded-xl border bg-white shadow-sm">
    //           <summary className="flex cursor-pointer items-center justify-between px-8 py-6 text-lg font-semibold">
    //             {acc.field_title}
    //             <span className="i-gntl--expand_more transition group-open:rotate-180"></span>
    //           </summary>
    //           <div className="border-t px-8 pt-6 pb-8">
    //             <LayoutRenderer blocks={acc.field_accordion} />
    //           </div>
    //         </details>
    //       ))}
    //     </div>
    //   );
    // }

    default:
      // console.warn("Bloc non géré :", block);
      return null;
  }
};

export default function LayoutRenderer({ blocks, settings }: { blocks?: ItemsParagraphProps[]; settings?: LayoutParagraphRegionSettings }) {
  if (!blocks?.length) return null;
  return (
    <>
      {blocks.map((block, i) => (
        <Fragment key={block.id || i}>{renderBlock(block)}</Fragment>
      ))}
    </>
  );
}
