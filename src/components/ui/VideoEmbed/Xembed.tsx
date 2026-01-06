"use client";
// Types
import { TwitterParagrapDataProps } from "@/lib/types/typesParagraphEmbed";
import { useEffect, useRef } from "react";
// Composent
export default function Xembed({
  node,
  langcode = "fr",
  theme = "dark",
}: {
  node: TwitterParagrapDataProps;
  langcode?: string;
  theme?: string;
}) {
  const tweetRef = useRef<HTMLDivElement>(null);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (hasLoaded.current || !tweetRef.current) return;

    const tweetId = node.field_url_embed.split("/status/")[1]?.split("?")[0];
    if (!tweetId) {
      tweetRef.current.innerHTML = `<p class="text-red-600">URL de tweet invalide</p>`;
      return;
    }

    // Si twttr est déjà chargé (retour sur la page), on crée directement
    if (window.twttr?.widgets) {
      renderTweet();
      return;
    }

    // Sinon, on charge le script une fois
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    script.onload = () => {
      if (window.twttr?.widgets) renderTweet();
    };
    document.body.appendChild(script);

    function renderTweet() {
      if (hasLoaded.current) return;
      hasLoaded.current = true;

      // Nettoie le conteneur
      tweetRef.current!.innerHTML = `
        <div class="paragraph-loader flex items-center justify-center py-12">
          <svg class="h-12 w-12 animate-spin text-gray-500" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      `;

      window.twttr!.widgets
        .createTweet(tweetId, tweetRef.current!, {
          lang: langcode,
          theme: theme as "light" | "dark",
          dnt: true,
          width: "100%",
          align: "center",
        })
        .then(() => {
          // if (!iframe) return;

          // Solution 1 : écouter l'événement global de Twitter "tweet-loaded"
          const onTweetLoaded = (event: any) => {
            if (event.data && event.data["tweet-loaded"]) {
              hideLoader();
              window.removeEventListener("message", onTweetLoaded);
            }
          };
          window.addEventListener("message", onTweetLoaded);

          // Solution 2 (fallback) : écouter le load de l'iframe
          const iframeEl = tweetRef.current?.querySelector("iframe");
          if (iframeEl) {
            iframeEl.onload = () => {
              setTimeout(hideLoader, 300); // petit délai pour laisser le contenu interne charger
            };
          }

          // Solution 3 (ultime fallback) : timeout de sécurité
          setTimeout(hideLoader, 10);
        })
        .catch((err) => {
          console.error("Failed to load tweet:", err);
          tweetRef.current!.innerHTML = `<p class="text-red-600">Erreur de chargement du tweet</p>`;
        });
    }

    function hideLoader() {
      const loader = tweetRef.current?.querySelector(".paragraph-loader");
      if (loader) {
        loader.remove();
      }

      // // Optionnel : force full width une dernière fois
      // const iframe = tweetRef.current?.querySelector("iframe");
      // if (iframe) {
      //   iframe.style.width = "100%";
      //   iframe.style.maxWidth = "none";
      // }
    }

    // Pas de cleanup du script (on veut le garder)
  }, [node.field_url_embed, langcode, theme]);

  return (
    <div ref={tweetRef} className="twitter-tweet-wrapper w-full" />
  );
}