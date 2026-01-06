// components/paragraphs/GalerieParagraph.tsx
"use client";

import { JSX, useEffect, useRef, useState } from "react";
import UIkit from "uikit";

import "./GalerieParagraph.scss";
import "./uikitStyle.scss";
import CustomLightbox from "../CustomLightbox/CustomLightbox";
import { GalerieParagraphDataProps } from "@/lib/types/typesParagraphEmbed";

export default function GalerieParagraph({ node }: {node: GalerieParagraphDataProps}) {
  const slideshowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const TitleTag = node.field_hn as keyof JSX.IntrinsicElements;

  // Préparation des items pour la galerie et la lightbox
  const galleryItems = node.field_galerie.flatMap((vignette) =>
    vignette.field_media_image.map((img) => {
      const full = img.wide?.url || img.uri[0].url;
      const fullBig = img.wide?.full || img.uri[0].url;
      const thumb = img.uri[0].url;

      return {
        src: full,
        full: fullBig,
        thumb,
        title: vignette?.name || "",
        caption: vignette?.field_description || "",
        copyright: vignette.field_copyright
          ? `© ${vignette.field_copyright}`
          : null,
      };
    }),
  );

  // UIkit slideshow & grid (seulement quand nécessaire)
  useEffect(() => {
    if (node.field_mode === "slideshow" && slideshowRef.current) {
      UIkit.slideshow(slideshowRef.current, {
        autoplay: false,
        autoplayInterval: 9000,
        animation: "push",
      });
    }
    if (node.field_mode === "grid" && gridRef.current) {
      UIkit.grid(gridRef.current, { masonry: "next" });
    }
  }, [node.field_mode]);

  const openLightbox = (index: number) => {
    // if (!node.field_lightbox) return;
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (galleryItems.length === 0) return null;

  const gridCols = {
    "1": "g-cols g-cols-1",
    "2": "g-cols g-cols-2",
    "3": "g-cols g-cols-3",
    "4": "g-cols g-cols-4",
  }[node.field_mode_grid];

  return (
    <div className="my-12">
      <div className="mx-auto max-w-3xl">
        {node.field_show_title && node.field_title && (
          <TitleTag className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
            {node.field_title}
          </TitleTag>
        )}

        {/* Slideshow */}
        {node.field_mode === "slideshow" && (
          <div
            ref={slideshowRef}
            className="uk-slideshow overflow-hidden rounded-xl shadow-lg relative"
          >
            <ul className="uk-slideshow-items">
              {galleryItems.map((item, i) => (
                <li
                  key={i}
                  className="group relative overflow-hidden rounded-xl shadow-lg"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- Required for zoom/pan functionality in lightbox */}
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="object-cover"
                    uk-cover="true"
                  />
                  {/* opacity-0 transition-opacity group-hover:opacity-100 */}
                  <div className="absolute right-3 bottom-3">
                    <div className="flex items-center">
                      <span className="text-sm mr-4">{item.title}</span>
                      {item?.copyright && (
                        <span className="text-xs mr-4">{item.copyright}</span>
                      )}
                      <a
                        href={item.src}
                        onClick={(e) => {
                          e.preventDefault();
                          openLightbox(i);
                        }}
                        className="z-50 cursor-pointer rounded-2xl bg-black/40 p-3"
                      >
                        <svg
                          className="h-5 w-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <ul className="absolute right-3 top-3 uk-slideshow-nav uk-dotnav uk-flex-center uk-margin-medium-top" />
          </div>
        )}

        {/* Grid ou Normal */}
        {(node.field_mode === "grid" || node.field_mode === "normal") && (
          <div
            ref={gridRef}
            className={
              node.field_mode === "grid" ? `${gridCols}` : "space-y-12"
            }
          >
            {galleryItems.map((item, i) => (
              <div
                key={i}
                className="group relative cursor-pointer overflow-hidden rounded-xl shadow-lg"
                onClick={() => openLightbox(i)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- Required for zoom/pan functionality in lightbox */}
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  // className={`w-full h-auto transition-transform duration-700 ${
                  //   node.field_mode === "normal" ? "group-hover:scale-105" : ""
                  // }`}
                />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <svg
                    className="h-5 w-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <CustomLightbox
          items={galleryItems}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
