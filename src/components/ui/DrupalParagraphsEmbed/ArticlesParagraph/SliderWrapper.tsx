"use client";

// Libs
import { JSX, useEffect, useRef, useState } from "react";
import UIkit from "uikit";

// Style
import "./SliderWrapper.scss";

// Types
import { ItemsArticlesParagraphProps } from "@/lib/types/typesParagraphEmbed";
import ArticleNode from "./ArticleUi/ArticleNode";

export default function SliderWrapper({ node }: { node: ItemsArticlesParagraphProps }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  const TitleTag = node?.field_hn ? (node.field_hn as keyof JSX.IntrinsicElements) : "h2";

  const hasArticles = node?.field_articles?.length > 0;

  // On active le montage côté client uniquement après le premier rendu
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialisation UIkit uniquement côté client et après montage
  useEffect(() => {
    if (!isMounted || node.field_mode !== "slider" || !sliderRef.current) {
      return;
    }

    UIkit.slider(sliderRef.current, {
      autoplay: true,
      autoplayInterval: 9000,
      // center: false,
      // index: 2,
      pauseOnHover: true,
      draggable: true
      // sets: false,
    });

  }, [isMounted, node.field_mode]);

  if (!hasArticles) {
    return null;
  }

  const overlayDisplay = ["overlay", "overlay_list"];
  const hnSize = node?.field_font_size || "2xl";
  const numberColumns = node?.field_mode_grid || "2";
  const numberColumnsMd = node?.field_mode_grid_md || "2";
  const modeDisplay = node?.field_mode_display || "card_left";

  // Contenu commun (titre + grille d'articles)
  const content = (
    <>
      {node.field_show_title && node.field_title && (
        <TitleTag className={`mb-8 text-${hnSize} font-bold text-gray-900 dark:text-white`}>{node.field_title}</TitleTag>
      )}

      <div ref={sliderRef} className="relative mx-auto flex w-full flex-col">
        <div className={`uk-slider-items uk-child-width-1-1 uk-child-width-1-${numberColumns}@m relative md:grid md:grid-cols-${numberColumnsMd} lg:grid-cols-${parseInt(numberColumns) > 4 ? parseInt(numberColumns)-1 : numberColumns} xl:grid-cols-${numberColumns} md:items-start uk-grid-small gap-3`}>
          {node.field_articles.map((item, i) => (
            <div
              key={i}
              className={`relative w-1/1 md:w-1/3 lg:w-1/4`}
              draggable="true"
            >
             
              { overlayDisplay.includes(modeDisplay) && 
                <p>hello</p>
              }

              { !overlayDisplay.includes(modeDisplay) && 
                <ArticleNode key={i} article={item} container={node} />
              }
            </div>
          ))}
        </div>

        {/* Navigation par points (dotnav) */}
        <ul className="uk-slideshow-nav uk-dotnav uk-flex-center uk-margin-medium-top absolute top-3 right-3" />

        {/* Flèches de navigation – elles seront enrichies par UIkit côté client */}
        {isMounted && (
          <>
            <a href="#" className="uk-position-center-left uk-position-small uk-hidden-hover" uk-slidenav-previous="" uk-slider-item="previous" />
            <a href="#" className="uk-position-center-right uk-position-small uk-hidden-hover" uk-slidenav-next="" uk-slider-item="next" />
          </>
        )}
      </div>
    </>
  );

  return (
    <div className="my-12">
      <div className="mx-auto lg:max-w-7xl">{content}</div>
    </div>
  );
}
