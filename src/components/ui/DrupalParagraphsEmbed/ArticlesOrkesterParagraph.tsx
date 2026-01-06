"use client";
// Types
import {
  ItemsArticlesParagraphProps
} from "@/lib/types/typesParagraphEmbed";
// Components
import ArticlesGridWrapperParagraph from "@/components/ui/DrupalParagraphsEmbed/ArticlesWrapperParagraph/ArticlesGridWrapperParagraph";
import ArticlesSlideshowWrapperParagraph from "./ArticlesWrapperParagraph/ArticlesSlideshowWrapperParagraph";
import ArticlesSliderWrapperParagraph from "./ArticlesWrapperParagraph/ArticlesSliderWrapperParagraph";
import ArticlesNormalWrapperParagraph from "./ArticlesWrapperParagraph/ArticlesNormalWrapperParagraph";
// Components Map
const PARAGRAPH_ARTICLE_TYPE_MAP: Record<string, React.ComponentType<any>> = {
  grid: ArticlesGridWrapperParagraph,
  slideshow: ArticlesSlideshowWrapperParagraph,
  slider: ArticlesSliderWrapperParagraph,
  normal: ArticlesNormalWrapperParagraph,
};
// Component
export default function ArticlesOrkesterParagraph({ node }: { node?: ItemsArticlesParagraphProps; }) {
  const availables_display = ['grid', 'slideshow', 'slider', 'normal'];
  if (!node || !node.field_mode || !availables_display.includes(node.field_mode)) return null;
  console.log('node', node)
  const Component = PARAGRAPH_ARTICLE_TYPE_MAP[node.field_mode];
  return <Component node={node} />;
}
