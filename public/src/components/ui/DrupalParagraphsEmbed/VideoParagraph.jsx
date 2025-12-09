"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VideoParagraph;
// Composents
const VideoWithConsent_1 = __importDefault(require("@/components/ui/VideoEmbed/VideoWithConsent"));
// Stules
require("./VideoParagraph.scss");
// Types
// Composents
function VideoParagraph({ node }) {
    //   const TitleTag = node.field_hn as keyof JSX.IntrinsicElements;
    return (<div className={`my-12`}>
      <div className={`prgh-video mx-auto max-w-5xl text-${(node === null || node === void 0 ? void 0 : node.field_alignement) || "left"}`}>
        {/* Titre conditionnel */}
        {/* {node.field_show_title && node.field_title && (
          <TitleTag className={`mb-6 text-${font_size} font-bold`}>
            {node.field_title}
          </TitleTag>
        )} */}

        {/* Vidéo avec consentement */}
        <div className="relative aspect-video overflow-hidden rounded-xl shadow-sm dark:shadow-2xl">
          <VideoWithConsent_1.default url={node.field_url_embed}/>
        </div>
      </div>
    </div>);
}
