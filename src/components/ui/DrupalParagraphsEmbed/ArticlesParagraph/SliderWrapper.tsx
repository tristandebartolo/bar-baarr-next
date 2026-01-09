"use client";

// Libs
import { JSX, useEffect, useRef, useState } from "react";
import UIkit from "uikit";

// Style
import "./SliderWrapper.scss";

// Types
import { ItemsArticlesParagraphProps } from "@/lib/types/typesParagraphEmbed";
import ArticleDisplaySelector from "./ArticleUi/ArticleDisplaySelector";

// Composant skeleton pour le rendu initial serveur
function SliderSkeleton({ node, pembed }: { node: ItemsArticlesParagraphProps; pembed: boolean }) {
  const TitleTag = node?.field_hn ? (node.field_hn as keyof JSX.IntrinsicElements) : "h2";
  const hnSize = node?.field_font_size || "2xl";

  return (
    <div className="m-0">
      <div className="mx-auto flex flex-col">
        {node.field_show_title && node.field_title && (
          <TitleTag className={`mb-24 text-${hnSize} font-bold text-gray-900 dark:text-white`}>{node.field_title}</TitleTag>
        )}
        <div className={`relative brk-${pembed ? "embed" : "node"}`}>
          <div className="uk-grid uk-grid-collapse">
            {node.field_articles.map((item, i) => (
              <div key={i} className="uk-width-1-1">
                <ArticleDisplaySelector article={item} container={node} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant principal pour le slider après montage
function SliderContent({
  node,
  pembed,
  sliderRef,
}: {
  node: ItemsArticlesParagraphProps;
  pembed: boolean;
  sliderRef: React.RefObject<HTMLDivElement | null>;
}) {
  const TitleTag = node?.field_hn ? (node.field_hn as keyof JSX.IntrinsicElements) : "h2";
  const hnSize = node?.field_font_size || "2xl";
  const numberColumns = node?.field_mode_grid || "2";
  const numberColumnsMd = node?.field_mode_grid_md || "2";
  const gapDisplay = node?.field_gap || "0";

  const marginGrid =
    {
      "1": "uk-grid-small",
      "8": "uk-grid-medium",
      "12": "uk-grid-medium",
      "16": "uk-grid-large",
      "24": "uk-grid-large",
    }[gapDisplay] || "uk-grid-collapse";

  // Calcul des classes responsives
  const getResponsiveClass = () => {
    const colMd = parseInt(numberColumnsMd) > 4 ? parseInt(numberColumnsMd) - 1 : numberColumnsMd;
    return `uk-width-1-1 uk-width-1-${colMd}@m uk-width-1-${numberColumns}@l`;
  };

  return (
    <div className="m-0">
      <div className="mx-auto flex flex-col">
        {node.field_show_title && node.field_title && (
          <TitleTag className={`mb-24 text-${hnSize} font-bold text-gray-900 dark:text-white`}>{node.field_title}</TitleTag>
        )}

        <div ref={sliderRef} className={`relative brk-${pembed ? "embed" : "node"}`}>
          <div className={`uk-slider-items uk-grid ${marginGrid}`}>
            {node.field_articles.map((item, i) => (
              <div key={i} className={getResponsiveClass()}>
                <ArticleDisplaySelector article={item} container={node} />
              </div>
            ))}
          </div>

          <div className="absolute right-0 bottom-0 z-50 flex items-center gap-3 p-5">
            {/* Flèches de navigation */}
            <a href="#" className="uk-position-center-left dark:text-white" uk-slidenav-previous="" uk-slider-item="previous" />
            {/* Navigation par points (dotnav) */}
            <ul className="uk-slider-nav uk-dotnav" />
            <a href="#" className="uk-position-center-right dark:text-white" uk-slidenav-next="" uk-slider-item="next" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SliderWrapper({ node, pembed }: { node: ItemsArticlesParagraphProps; pembed: boolean }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  const TitleTag = node?.field_hn ? (node.field_hn as keyof JSX.IntrinsicElements) : "h2";
  const hasArticles = node?.field_articles?.length > 0;

  // Vérification du mode valide (slider OU slideshow)
  const isValidMode = node.field_mode === "slider" || node.field_mode === "slideshow";

  // Montage côté client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialisation UIkit après montage
  useEffect(() => {
    if (!isMounted || !isValidMode || !sliderRef.current) {
      return;
    }

    const sliderInstance = UIkit.slider(sliderRef.current, {
      autoplay: false,
      autoplayInterval: 9000,
      pauseOnHover: true,
      draggable: true,
    });

    // Cleanup à la destruction du composant
    return () => {
      if (sliderInstance) {
        sliderInstance.$destroy();
      }
    };
  }, [isMounted, isValidMode]);

  // Ne rien rendre côté serveur si invalide, mais toujours de manière stable
  if (!hasArticles || !isValidMode) {
    return null;
  }

  // Si pas encore monté, on affiche une version simplifiée sans interactions UIKit
  if (!isMounted) {
    return <SliderSkeleton node={node} pembed={pembed} />;
  }

  return <SliderContent node={node} pembed={pembed} sliderRef={sliderRef} />;
}
