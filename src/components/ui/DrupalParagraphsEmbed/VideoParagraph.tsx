// Composents
import VideoWithConsent from "@/components/ui/VideoEmbed/VideoWithConsent";
// Stules
import "./VideoParagraph.scss";
import { VideoParagraphProps } from "@/lib/types/typesParagraphEmbed";
// Types


// Composents
export default function VideoParagraph({
  node
}: VideoParagraphProps) {
  //   const TitleTag = node.field_hn as keyof JSX.IntrinsicElements;

  return (
    <div className={`my-12`}>
      <div
        className={`prgh-video mx-auto max-w-5xl text-${node?.field_alignement || "left"}`}
      >
        {/* Titre conditionnel */}
        {/* {node.field_show_title && node.field_title && (
          <TitleTag className={`mb-6 text-${font_size} font-bold`}>
            {node.field_title}
          </TitleTag>
        )} */}

        {/* Vidéo avec consentement */}
        <div className="relative aspect-video overflow-hidden rounded-xl shadow-sm dark:shadow-2xl">
          <VideoWithConsent url={node.field_url_embed} />
        </div>
      </div>
    </div>
  );
}
