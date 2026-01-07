"use client";

// Libs
import { JSX, useEffect, useRef, useState } from "react";
import UIkit from "uikit";

// Style
import "./SliderWrapper.scss";

// Types
import { ItemsArticlesParagraphProps } from "@/lib/types/typesParagraphEmbed";
import ArticleNode from "./ArticleUi/ArticleNode";

export default function SliderWrapper({ node, pembed }: { node: ItemsArticlesParagraphProps; pembed: boolean }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  console.log("pembed", pembed);
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
      draggable: true,
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
  const gapDisplay = node?.field_gap || "0";

  const marginGrid =
    {
      "1": "uk-grid-small",
      "8": "uk-grid-medium",
      "12": "uk-grid-medium",
      "16": "uk-grid-large",
      "24": "uk-grid-large",
    }[gapDisplay] || "uk-grid-collapse";

  // Contenu commun (titre + grille d'articles)
  const content = (
    <>
      {node.field_show_title && node.field_title && (
        <TitleTag className={`mb-24 text-${hnSize} font-bold text-gray-900 dark:text-white`}>{node.field_title}</TitleTag>
      )}

      <div ref={sliderRef} className="relative">
        <div className={`uk-slider-items uk-grid ${marginGrid}`}>
          {node.field_articles.map((item, i) => (
            <div
              key={i}
              className={`uk-width-1-1 uk-width-1-${parseInt(numberColumnsMd) > 4 ? parseInt(numberColumnsMd) - 1 : numberColumnsMd}@m uk-width-1-${numberColumns}@l`}
              draggable="true"
            >
              {/* <p className="bg-amber-400/30">hello {numberColumns}</p>
               <p className="bg-red-400/30">mode : {modeDisplay}</p>
               <p className="bg-amber-400/30">hello {numberColumns}</p> */}
              {overlayDisplay.includes(modeDisplay) && <p>hello</p>}

              {!overlayDisplay.includes(modeDisplay) && <ArticleNode key={i} article={item} container={node} />}
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
      <div className="mx-auto flex flex-col">{content}</div>
    </div>
  );
}
