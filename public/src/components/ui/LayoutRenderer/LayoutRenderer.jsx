"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LayoutRenderer;
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const renderBlock = (block) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    switch (block.entity_bundle) {
        case "article": {
            const art = (_a = block.field_article) === null || _a === void 0 ? void 0 : _a[0];
            if (!art)
                return null;
            const img = (_d = (_c = (_b = art.field_vignette) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.field_media_image) === null || _d === void 0 ? void 0 : _d[0];
            const imgUrl = ((_e = img === null || img === void 0 ? void 0 : img.wide) === null || _e === void 0 ? void 0 : _e.url) || null;
            const imgWidth = ((_f = img === null || img === void 0 ? void 0 : img.wide) === null || _f === void 0 ? void 0 : _f.width) || null;
            const imgHeight = ((_g = img === null || img === void 0 ? void 0 : img.wide) === null || _g === void 0 ? void 0 : _g.height) || null;
            const alias = `/${((_j = (_h = art.path) === null || _h === void 0 ? void 0 : _h[0]) === null || _j === void 0 ? void 0 : _j.langcode) || "fr"}${((_m = (_l = (_k = art.path) === null || _k === void 0 ? void 0 : _k[0]) === null || _l === void 0 ? void 0 : _l.alias) === null || _m === void 0 ? void 0 : _m.replace(/^\/\w+/, "")) || ""}`;
            return (<link_1.default href={alias} className="group block">
          <article className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-2xl">
            {imgUrl && imgWidth && imgHeight && (<div className="relative aspect-video">
                <image_1.default priority src={imgUrl} alt={art.title} height={imgHeight} width={imgWidth} className="object-cover transition-transform group-hover:scale-105"/>
              </div>)}
            <div className="p-6">
              <h3 className={`font-bold text-${block.field_font_size || "2xl"} mb-3`}>
                {art.title}
              </h3>
              <div className="line-clamp-3 text-gray-600" dangerouslySetInnerHTML={{ __html: art.field_chapo || "" }}/>
            </div>
          </article>
        </link_1.default>);
        }
        case "articles": {
            const items = (_o = block.field_articles) !== null && _o !== void 0 ? _o : [];
            return (<div className="grid gap-5 grid-cols-1">
          {items.map((art, i) => (
                // On réutilise renderBlock en forçant le type
                <div key={i}>
              {renderBlock({
                        ...block,
                        entity_bundle: "article",
                        field_article: [art],
                    })}
            </div>))}
        </div>);
        }
        case "text":
            return (<div className={`prose prose-lg mx-auto ${block.field_font_size ? `text-${block.field_font_size}` : ""}`} dangerouslySetInnerHTML={{ __html: block.field_text }}/>);
        case "message": {
            const b = block;
            const colors = {
                success: "bg-green-50 border-green-200 text-green-900",
                warning: "bg-amber-50 border-amber-200 text-amber-900",
                danger: "bg-red-50   border-red-200   text-red-900",
                primary: "bg-blue-50  border-blue-200  text-blue-900",
                info: "bg-gray-50  border-gray-200  text-gray-900",
            };
            return (<div className={`rounded-xl border-2 p-8 ${colors[b.field_status_msg]}`}>
          {b.field_show_title && b.field_title && (<h3 className="mb-4 text-2xl font-bold">{b.field_title}</h3>)}
          <div dangerouslySetInnerHTML={{ __html: b.field_text }}/>
        </div>);
        }
        case "video": {
            const url = (_q = (_p = block.field_url_embed) === null || _p === void 0 ? void 0 : _p[0]) === null || _q === void 0 ? void 0 : _q.value;
            const id = ((_r = url === null || url === void 0 ? void 0 : url.match(/youtube\.com.*v=([^&]+)/)) === null || _r === void 0 ? void 0 : _r[1]) ||
                ((_s = url === null || url === void 0 ? void 0 : url.match(/youtu\.be\/([^?]+)/)) === null || _s === void 0 ? void 0 : _s[1]);
            return id ? (<div className="aspect-video overflow-hidden rounded-2xl shadow-2xl">
          <iframe src={`https://www.youtube.com/embed/${id}`} allowFullScreen className="h-full w-full"/>
        </div>) : null;
        }
        case "accordions": {
            const accs = (_t = block.field_accordions) !== null && _t !== void 0 ? _t : [];
            return (<div className="space-y-4">
          {accs.map((acc) => (<details key={acc.uuid} className="group rounded-xl border bg-white shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between px-8 py-6 text-lg font-semibold">
                {acc.field_title}
                <span className="i-gntl--expand_more transition group-open:rotate-180"></span>
              </summary>
              <div className="border-t px-8 pt-6 pb-8">
                <LayoutRenderer blocks={acc.field_accordion}/>
              </div>
            </details>))}
        </div>);
        }
        default:
            console.warn("Bloc non géré :", block);
            return null;
    }
};
function LayoutRenderer({ blocks, settings }) {
    if (!(blocks === null || blocks === void 0 ? void 0 : blocks.length))
        return null;
    console.log('settings', settings);
    return (<>
      {blocks.map((block, i) => (<div key={block.id || i} className="">
          {renderBlock(block)}
        </div>))}
    </>);
}
