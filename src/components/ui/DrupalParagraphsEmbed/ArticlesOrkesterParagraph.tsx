"use client";
// Types
import { ItemsArticlesParagraphProps } from "@/lib/types/typesParagraphEmbed";
// Components
import GridWrapper from "@/components/ui/DrupalParagraphsEmbed/ArticlesParagraph/GridWrapper";
import SliderWrapper from "@/components/ui/DrupalParagraphsEmbed/ArticlesParagraph/SliderWrapper";
import NormalWrapper from "@/components/ui/DrupalParagraphsEmbed/ArticlesParagraph/NormalWrapper";
// Styles
import "./uikitStyle.scss";
// Components Map
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
const PARAGRAPH_ARTICLE_TYPE_MAP: Record<string, React.ComponentType<any>> = {
  grid: GridWrapper,
  slideshow: SliderWrapper,
  slider: SliderWrapper,
  normal: NormalWrapper,
};
// Component
export default function ArticlesOrkesterParagraph({ node, pembed = false }: { node?: ItemsArticlesParagraphProps, pembed?: boolean }) {
  const availables_display = ["grid", "slider", "normal"];
  if (!node || !node.field_mode || !availables_display.includes(node.field_mode)) return null;
  console.log("node", node);
  const Component = PARAGRAPH_ARTICLE_TYPE_MAP[node.field_mode];
  return <Component node={node} pembed={pembed} />;
}
