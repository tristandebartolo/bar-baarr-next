// components/DrupalEntities.tsx
"use client";
// Lib
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
// Helpers
import { getDataEmbed } from "@/lib/action/MediaAction";
// Composants
import VideoParagraph from "@/components/ui/DrupalParagraphsEmbed/VideoParagraph";
import MessageParagraph from "../DrupalParagraphsEmbed/MessageParagraph";
import GalerieParagraph from "../DrupalParagraphsEmbed/GalerieParagraph";
import ArticlesParagraph from "../DrupalParagraphsEmbed/ArticlesParagraph";
import XParagraph from "../DrupalParagraphsEmbed/XParagraph";
// import ArticleParagraph from "./paragraphs/ArticleParagraph";
// import ListArticlesParagraph from "./paragraphs/ListArticlesParagraph";
// import TwitterParagraph from "./paragraphs/TwitterParagraph";

// Mapping exact : type Drupal → Composant React
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PARAGRAPH_COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
  video: VideoParagraph,
  message: MessageParagraph,
  // article: ArticleParagraph,
  articles: ArticlesParagraph,
  articles_by_term: ArticlesParagraph,
  post_x: XParagraph,
  galerie: GalerieParagraph,
  // "quote": QuoteParagraph,
};

export default function DrupalEntities({
  children,
  langcode,
  theme
}: {
  children: React.ReactNode;
  langcode: string;
  theme: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(
      "drupal-paragraph, drupal-media",
    );

    if (elements.length === 0) return;

    const loadEntity = async (el: Element) => {
      const tagName = el.tagName.toLowerCase();
      const uuid = el.getAttribute("data-paragraph-id");

      if (!uuid) {
        el.innerHTML = `<p class="text-red-600">ID manquant</p>`;
        return;
      }

      try {
        // On garde exactement ton appel existant
        const type = tagName === "drupal-paragraph" ? "paragraph" : "media";
        const res = await getDataEmbed(type, uuid, langcode);

        if (!res.success || !res.node) {
          throw new Error("Entity non trouvée ou succès false");
        }

        const { node } = res;

        // On détermine le type de paragraph via le champ Drupal (ex: node.type ou node.bundle)
        // Dans ton cas, tu as probablement un champ comme node.type ou node.bundle
        const paragraphType = node.entity_bundle || "unknown";

        // On cherche le composant correspondant
        const Component = PARAGRAPH_COMPONENT_MAP[paragraphType];

        if (!Component) {
          el.innerHTML = `<p class="text-orange-600">Composant non implémenté : ${paragraphType}</p>`;
          return;
        }

        // On récupère tous les data-* comme props (alignement, classes, etc.)
        const props: Record<string, unknown> = { node, langcode, theme };

      
        Array.from(el.attributes).forEach((attr) => {
         
          if (attr.name.startsWith("data-")) {
            const key = attr.name.replace("data-", "");
            props[key] = attr.value;
          }
          if (attr.name === "class") {
            props.className = attr.value;
          }
        });

        // Création du vrai composant React
        const reactElement = <Component {...props} />;

        // On remplace la balise custom par un conteneur temporaire
        const placeholder = document.createElement("div");
        el.parentNode?.replaceChild(placeholder, el);

        // Montage React
        const root = ReactDOM.createRoot(placeholder);
        root.render(reactElement);
      } catch (err) {
        console.error(`Failed to load ${tagName} ${uuid}`, err);
        el.innerHTML = `<p class="text-red-600">Contenu indisponible</p>`;
      }
    };

    // Chargement parallèle
    Promise.allSettled(Array.from(elements).map(loadEntity));
  }, [children, langcode, theme]);

  return <div ref={containerRef}>{children}</div>;
}
