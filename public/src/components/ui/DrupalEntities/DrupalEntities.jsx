"use strict";
// components/DrupalEntities.tsx
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DrupalEntities;
// Lib
const react_1 = require("react");
const client_1 = __importDefault(require("react-dom/client"));
// Helpers
const MediaAction_1 = require("@/lib/action/MediaAction");
// Composants
const VideoParagraph_1 = __importDefault(require("@/components/ui/DrupalParagraphsEmbed/VideoParagraph"));
const TwitterPostParagraph_1 = __importDefault(require("../DrupalParagraphsEmbed/TwitterPostParagraph"));
const MessageParagraph_1 = __importDefault(require("../DrupalParagraphsEmbed/MessageParagraph"));
const GalerieParagraph_1 = __importDefault(require("../DrupalParagraphsEmbed/GalerieParagraph"));
const ArticlesParagraph_1 = __importDefault(require("../DrupalParagraphsEmbed/ArticlesParagraph"));
// import ArticleParagraph from "./paragraphs/ArticleParagraph";
// import ListArticlesParagraph from "./paragraphs/ListArticlesParagraph";
// import TwitterParagraph from "./paragraphs/TwitterParagraph";
// Mapping exact : type Drupal → Composant React
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PARAGRAPH_COMPONENT_MAP = {
    video: VideoParagraph_1.default,
    message: MessageParagraph_1.default,
    // article: ArticleParagraph,
    articles: ArticlesParagraph_1.default,
    post_x: TwitterPostParagraph_1.default,
    galerie: GalerieParagraph_1.default,
    // "quote": QuoteParagraph,
    // etc.
};
function DrupalEntities({ children, langcode, theme }) {
    const containerRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (!containerRef.current)
            return;
        const elements = containerRef.current.querySelectorAll("drupal-paragraph, drupal-media");
        if (elements.length === 0)
            return;
        const loadEntity = async (el) => {
            var _a;
            const tagName = el.tagName.toLowerCase();
            const uuid = el.getAttribute("data-paragraph-id");
            if (!uuid) {
                el.innerHTML = `<p class="text-red-600">ID manquant</p>`;
                return;
            }
            try {
                // On garde exactement ton appel existant
                const type = tagName === "drupal-paragraph" ? "paragraph" : "media";
                const res = await (0, MediaAction_1.getDataEmbed)(type, uuid, langcode);
                if (!res.success || !res.node) {
                    throw new Error("Entity non trouvée ou succès false");
                }
                const { node } = res;
                console.log('node', node);
                // On détermine le type de paragraph via le champ Drupal (ex: node.type ou node.bundle)
                // Dans ton cas, tu as probablement un champ comme node.type ou node.bundle
                const paragraphType = node.type || node.bundle || "unknown";
                // On cherche le composant correspondant
                const Component = PARAGRAPH_COMPONENT_MAP[paragraphType];
                if (!Component) {
                    el.innerHTML = `<p class="text-orange-600">Composant non implémenté : ${paragraphType}</p>`;
                    return;
                }
                // On récupère tous les data-* comme props (alignement, classes, etc.)
                const props = { node, langcode, theme };
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
                const reactElement = <Component {...props}/>;
                // On remplace la balise custom par un conteneur temporaire
                const placeholder = document.createElement("div");
                (_a = el.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(placeholder, el);
                // Montage React
                const root = client_1.default.createRoot(placeholder);
                root.render(reactElement);
            }
            catch (err) {
                console.error(`Failed to load ${tagName} ${uuid}`, err);
                el.innerHTML = `<p class="text-red-600">Contenu indisponible</p>`;
            }
        };
        // Chargement parallèle
        Promise.allSettled(Array.from(elements).map(loadEntity));
    }, [children, langcode, theme]);
    return <div ref={containerRef}>{children}</div>;
}
