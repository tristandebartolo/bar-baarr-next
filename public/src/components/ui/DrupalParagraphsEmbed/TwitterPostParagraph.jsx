"use strict";
// components/paragraphs/TwitterPostParagraph.tsx
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TwitterPostParagraph;
const react_1 = require("react");
function TwitterPostParagraph({ node, langcode, theme, }) {
    const tweetRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (!tweetRef.current)
            return;
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.charset = "utf-8";
        document.body.appendChild(script);
        script.onload = () => {
            var _a;
            if (window.twttr && window.twttr.widgets) {
                // Extrait l'ID du tweet de l'URL (ex: 1994089738827886827)
                const tweetId = (_a = node.field_url_embed
                    .split("/status/")[1]) === null || _a === void 0 ? void 0 : _a.split("?")[0];
                if (!tweetId) {
                    console.error("Invalid tweet URL:", node.field_url_embed);
                    tweetRef.current.innerHTML = `<p class="text-red-600">URL de tweet invalide</p>`;
                    return;
                }
                // Crée le widget Twitter avec l'ID exact
                window.twttr.widgets
                    .createTweet(tweetId, tweetRef.current, {
                    lang: langcode,
                    theme: theme,
                    dnt: true,
                })
                    .then(() => {
                    var _a, _b;
                    const divLoad = ((_a = tweetRef.current) === null || _a === void 0 ? void 0 : _a.querySelector(".paragraph-loader")) || null;
                    // Force la largeur à 100% après chargement
                    if (divLoad) {
                        divLoad.innerHTML = "";
                        console.log("Tweet loaded successfully", divLoad);
                    }
                    const tweetContainer = ((_b = tweetRef.current) === null || _b === void 0 ? void 0 : _b.querySelector("iframe")) || tweetRef.current;
                    if (tweetContainer) {
                        tweetContainer.style.width = "100%";
                        tweetContainer.style.maxWidth = "100%"; // Évite débordement
                    }
                })
                    .catch((err) => {
                    console.log("Failed to load tweet:", err);
                    tweetRef.current.innerHTML = `<p class="text-red-600">Erreur de chargement du tweet</p>`;
                });
            }
            else {
                // console.warn(
                //   "Twitter widget script loaded but twttr is not available.",
                // );
                tweetRef.current.innerHTML = `<p class="text-red-600">Script Twitter non chargé</p>`;
            }
        };
        return () => {
            document.body.removeChild(script);
        };
    }, [node.field_url_embed, langcode, theme]);
    return (<div ref={tweetRef} className="twitter-tweet-wrapper w-full">
      <div className="paragraph-loader">
        <svg className="h-12 w-12 animate-spin text-gray-500" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </div>);
}
