// Composents
import XwithConsent from "@/components/ui/VideoEmbed/XwithConsent";
// Stules
import "./VideoParagraph.scss";
// Types
import { TwitterParagrapDataProps } from "@/lib/types/typesParagraphEmbed";
// Composents
export default function XParagraph({ node }: { node: TwitterParagrapDataProps }) {
  return (
    <div className={`my-12`}>
      <div className={`prgh-x mx-auto max-w-5xl text-left`}>
        <XwithConsent node={node} />
      </div>
    </div>
  );
}
