"use strict";
// components/paragraphs/GalerieParagraph.tsx
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GalerieParagraph;
const react_1 = require("react");
const uikit_1 = __importDefault(require("uikit"));
require("./GalerieParagraph.scss");
require("./uikitStyle.scss");
const CustomLightbox_1 = __importDefault(require("../CustomLightbox/CustomLightbox"));
function GalerieParagraph({ node }) {
    const slideshowRef = (0, react_1.useRef)(null);
    const gridRef = (0, react_1.useRef)(null);
    const [lightboxOpen, setLightboxOpen] = (0, react_1.useState)(false);
    const [lightboxIndex, setLightboxIndex] = (0, react_1.useState)(0);
    const TitleTag = node.field_hn;
    // Préparation des items pour la galerie et la lightbox
    const galleryItems = node.field_galerie.flatMap((vignette) => vignette.field_media_image.map((img) => {
        var _a, _b;
        const full = ((_a = img.wide) === null || _a === void 0 ? void 0 : _a.url) || img.uri[0].url;
        const fullBig = ((_b = img.wide) === null || _b === void 0 ? void 0 : _b.full) || img.uri[0].url;
        const thumb = img.uri[0].url;
        return {
            src: full,
            full: fullBig,
            thumb,
            title: (vignette === null || vignette === void 0 ? void 0 : vignette.name) || "",
            caption: (vignette === null || vignette === void 0 ? void 0 : vignette.field_description) || "",
            copyright: vignette.field_copyright
                ? `© ${vignette.field_copyright}`
                : null,
        };
    }));
    // UIkit slideshow & grid (seulement quand nécessaire)
    (0, react_1.useEffect)(() => {
        if (node.field_mode === "slideshow" && slideshowRef.current) {
            uikit_1.default.slideshow(slideshowRef.current, {
                autoplay: false,
                autoplayInterval: 9000,
                animation: "push",
            });
        }
        if (node.field_mode === "grid" && gridRef.current) {
            uikit_1.default.grid(gridRef.current, { masonry: "next" });
        }
    }, [node.field_mode]);
    const openLightbox = (index) => {
        // if (!node.field_lightbox) return;
        setLightboxIndex(index);
        setLightboxOpen(true);
    };
    if (galleryItems.length === 0)
        return null;
    const gridCols = {
        "1": "g-cols g-cols-1",
        "2": "g-cols g-cols-2",
        "3": "g-cols g-cols-3",
        "4": "g-cols g-cols-4",
    }[node.field_mode_grid];
    return (<div className="my-12">
      <div className="mx-auto max-w-3xl">
        {node.field_show_title && node.field_title && (<TitleTag className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
            {node.field_title}
          </TitleTag>)}

        {/* Slideshow */}
        {node.field_mode === "slideshow" && (<div ref={slideshowRef} className="uk-slideshow overflow-hidden rounded-xl shadow-lg relative">
            <ul className="uk-slideshow-items">
              {galleryItems.map((item, i) => (<li key={i} className="group relative overflow-hidden rounded-xl shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element -- Required for zoom/pan functionality in lightbox */}
                  <img src={item.src} alt={item.caption} className="object-cover" uk-cover="true"/>
                  {/* opacity-0 transition-opacity group-hover:opacity-100 */}
                  <div className="absolute right-3 bottom-3">
                    <div className="flex items-center">
                      <span className="text-sm mr-4">{item.title}</span>
                      {(item === null || item === void 0 ? void 0 : item.copyright) && (<span className="text-xs mr-4">{item.copyright}</span>)}
                      <a href={item.src} onClick={(e) => {
                    e.preventDefault();
                    openLightbox(i);
                }} className="z-50 cursor-pointer rounded-2xl bg-black/40 p-3">
                        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </li>))}
            </ul>
            <ul className="absolute right-3 top-3 uk-slideshow-nav uk-dotnav uk-flex-center uk-margin-medium-top"/>
          </div>)}

        {/* Grid ou Normal */}
        {(node.field_mode === "grid" || node.field_mode === "normal") && (<div ref={gridRef} className={node.field_mode === "grid" ? `${gridCols}` : "space-y-12"}>
            {galleryItems.map((item, i) => (<div key={i} className="group relative cursor-pointer overflow-hidden rounded-xl shadow-lg" onClick={() => openLightbox(i)}>
                {/* eslint-disable-next-line @next/next/no-img-element -- Required for zoom/pan functionality in lightbox */}
                <img src={item.src} alt={item.caption} loading="lazy"/>
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
              </div>))}
          </div>)}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (<CustomLightbox_1.default items={galleryItems} initialIndex={lightboxIndex} onClose={() => setLightboxOpen(false)}/>)}
    </div>);
}
