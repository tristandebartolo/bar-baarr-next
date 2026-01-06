"use client";
// Libs
import { JSX, useEffect, useRef, useState } from "react";
import UIkit from "uikit";
// Style
import "./SlideshowWrapper.scss";
// Types
import { ItemsArticlesParagraphProps } from "@/lib/types/typesParagraphEmbed";
// Composent
export default function SlideshowWrapper({ node }: { node: ItemsArticlesParagraphProps }) {
  const slideshowRef = useRef<HTMLDivElement>(null);
  const TitleTag = node.field_hn as keyof JSX.IntrinsicElements;

  // UIkit slideshow
  useEffect(() => {
    if (node.field_mode === "slideshow" && slideshowRef.current) {
      UIkit.slideshow(slideshowRef.current, {
        autoplay: false,
        autoplayInterval: 9000,
        animation: "push",
      });
    }
  }, [node.field_mode]);

  const hasArticles = node?.field_articles || null;

  if (!hasArticles) {
    return null;
  }

  const hnSize = node?.field_font_size || "2xl";
  const numberColumns = node?.field_mode_grid || "2";

  return (
    <div className="my-12">
      <div className="mx-auto lg:max-w-7xl">
        {node.field_show_title && node.field_title && (
          <TitleTag className={`mb-8 text-${hnSize} font-bold text-gray-900 dark:text-white`}>{node.field_title}</TitleTag>
        )}
        {/* Slideshow */}
        <div ref={slideshowRef} className="uk-slideshow relative overflow-hidden rounded-xl shadow-lg">
          <ul className="uk-slideshow-items">
            {node.field_articles.map((item, i) => (
              <li key={i} className="group relative overflow-hidden rounded-xl shadow-lg">
                <div className="absolute right-3 bottom-3">
                  <div className="flex items-center">
                    <span className="mr-4 text-sm">{item.title}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <ul className="uk-slideshow-nav uk-dotnav uk-flex-center uk-margin-medium-top absolute top-3 right-3" />
        </div>
      </div>
    </div>
  );
}
