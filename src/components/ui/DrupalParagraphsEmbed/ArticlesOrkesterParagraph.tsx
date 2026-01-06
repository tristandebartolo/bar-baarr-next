"use client";
// Types
import { ItemsArticlesParagraphProps } from "@/lib/types/typesParagraphEmbed";
// Components
import GridWrapper from "@/components/ui/DrupalParagraphsEmbed/ArticlesParagraph/GridWrapper";
import SlideshowWrapper from "@/components/ui/DrupalParagraphsEmbed/ArticlesParagraph/SlideshowWrapper";
import SliderWrapper from "@/components/ui/DrupalParagraphsEmbed/ArticlesParagraph/SliderWrapper";
import NormalWrapper from "@/components/ui/DrupalParagraphsEmbed/ArticlesParagraph/NormalWrapper";
// Components Map
const PARAGRAPH_ARTICLE_TYPE_MAP: Record<string, React.ComponentType<any>> = {
  grid: GridWrapper,
  slideshow: SlideshowWrapper,
  slider: SliderWrapper,
  normal: NormalWrapper,
};
// Component
export default function ArticlesOrkesterParagraph({ node }: { node?: ItemsArticlesParagraphProps }) {
  const availables_display = ["grid", "slideshow", "slider", "normal"];
  if (!node || !node.field_mode || !availables_display.includes(node.field_mode)) return null;
  console.log("node", node);
  const Component = PARAGRAPH_ARTICLE_TYPE_MAP[node.field_mode];
  return <Component node={node} />;
}
