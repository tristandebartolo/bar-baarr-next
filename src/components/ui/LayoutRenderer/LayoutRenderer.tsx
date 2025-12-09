"use client";

import Image from "next/image";
import Link from "next/link";
import {
  LayoutBlock,
  ArticleBlock,
  ArticleReference,
  MessageBlock,
  VideoBlock,
  AccordionsBlock,
  TextBlock,
  LayoutRegionSettings
} from "@/lib/types/typesPageJournal";

const renderBlock = (block: LayoutBlock): React.ReactNode => {
  switch (block.entity_bundle) {
    case "article": {
      const art = (block as ArticleBlock).field_article?.[0];
      if (!art) return null;

      const img = art.field_vignette?.[0]?.field_media_image?.[0];
      const imgUrl = img?.wide?.url || null;
      const imgWidth = img?.wide?.width as number || null;
      const imgHeight = img?.wide?.height as number || null;

      const alias = `/${art.path?.[0]?.langcode || "fr"}${art.path?.[0]?.alias?.replace(/^\/\w+/, "")|| ""}`

      return (
        <Link href={alias} className="group block">
          <article className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-2xl">
            {imgUrl && imgWidth && imgHeight && (
              <div className="relative aspect-video">
                <Image priority src={imgUrl} alt={art.title} height={imgHeight} width={imgWidth} className="object-cover transition-transform group-hover:scale-105" />
              </div>
            )}
            <div className="p-6">
              <h3
                className={`font-bold text-${block.field_font_size || "2xl"} mb-3`}
              >
                {art.title}
              </h3>
              <div
                className="line-clamp-3 text-gray-600"
                dangerouslySetInnerHTML={{ __html: art.field_chapo || "" }}
              />
            </div>
          </article>
        </Link>
      );
    }

    case "articles": {
      const items = block.field_articles ?? [];
      return (
        <div className="grid gap-5 grid-cols-1">
          {items.map((art: ArticleReference, i: number) => (
            // On réutilise renderBlock en forçant le type
            <div key={i}>
              {renderBlock({
                ...block,
                entity_bundle: "article",
                field_article: [art],
              } as LayoutBlock)}
            </div>
          ))}
        </div>
      );
    }

    case "text":
      return (
        <div
          className={`prose prose-lg mx-auto ${block.field_font_size ? `text-${block.field_font_size}` : ""}`}
          dangerouslySetInnerHTML={{ __html: (block as TextBlock).field_text }}
        />
      );

    case "message": {
      const b = block as MessageBlock;
      const colors: Record<string, string> = {
        success: "bg-green-50 border-green-200 text-green-900",
        warning: "bg-amber-50 border-amber-200 text-amber-900",
        danger: "bg-red-50   border-red-200   text-red-900",
        primary: "bg-blue-50  border-blue-200  text-blue-900",
        info: "bg-gray-50  border-gray-200  text-gray-900",
      };
      return (
        <div
          className={`rounded-xl border-2 p-8 ${colors[b.field_status_msg]}`}
        >
          {b.field_show_title && b.field_title && (
            <h3 className="mb-4 text-2xl font-bold">{b.field_title}</h3>
          )}
          <div dangerouslySetInnerHTML={{ __html: b.field_text }} />
        </div>
      );
    }

    case "video": {
      const url = (block as VideoBlock).field_url_embed?.[0]?.value;
      const id =
        url?.match(/youtube\.com.*v=([^&]+)/)?.[1] ||
        url?.match(/youtu\.be\/([^?]+)/)?.[1];
      return id ? (
        <div className="aspect-video overflow-hidden rounded-2xl shadow-2xl">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      ) : null;
    }

    case "accordions": {
      const accs = (block as AccordionsBlock).field_accordions ?? [];
      return (
        <div className="space-y-4">
          {accs.map((acc) => (
            <details
              key={acc.uuid}
              className="group rounded-xl border bg-white shadow-sm"
            >
              <summary className="flex cursor-pointer items-center justify-between px-8 py-6 text-lg font-semibold">
                {acc.field_title}
                <span className="i-gntl--expand_more transition group-open:rotate-180"></span>
              </summary>
              <div className="border-t px-8 pt-6 pb-8">
                <LayoutRenderer blocks={acc.field_accordion} />
              </div>
            </details>
          ))}
        </div>
      );
    }

    default:
      console.warn("Bloc non géré :", block);
      return null;
  }
};

export default function LayoutRenderer({ blocks, settings }: { blocks?: LayoutBlock[], settings?: LayoutRegionSettings }) {
  if (!blocks?.length) return null;

  // console.log('settings', settings)
  return (
    <>
      {blocks.map((block, i) => (
        <div key={block.id || i} className="">
          {renderBlock(block)}
        </div>
      ))}
    </>
  );
}
