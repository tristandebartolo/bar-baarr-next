"use client";
// Lib
import { Fragment, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
// Types
import {
  ItemsArticlesParagraphProps,
  ItemsParagraphProps,
  LayoutParagraphRegionSettings,
  MessageParagraphDataProps,
  TexteParagraphProps,
  TwitterParagrapDataProps,
  VideoParagraphDataProps,
} from "@/lib/types/typesParagraphEmbed";
// Styles
import './LayoutRenderer.scss';
// Components
import MessageParagraph from "../DrupalParagraphsEmbed/MessageParagraph";
import VideoParagraph from "../DrupalParagraphsEmbed/VideoParagraph";
import ArticlesOrkesterParagraph from "../DrupalParagraphsEmbed/ArticlesOrkesterParagraph";
import XwithConsent from "../VideoEmbed/XwithConsent";
// Composent
const renderBlock = (block: ItemsParagraphProps): ReactNode => {
  switch (block.entity_bundle) {

    case "articles":
    case "articles_by_term": {
      const articlesBlock = block as ItemsArticlesParagraphProps;
      return <ArticlesOrkesterParagraph node={articlesBlock} />;
    }

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
      return <XwithConsent node={b} />;
    }

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
