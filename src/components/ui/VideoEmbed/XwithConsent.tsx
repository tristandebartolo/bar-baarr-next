// src/components/ui/VideoWithConsent.tsx
"use client";

import { useEffect, useState } from "react";
import { cookieConsent } from "@/lib/helpers/cookieConsent";
import TwitterPostParagraph from "../DrupalParagraphsEmbed/TwitterPostParagraph";
import { TwitterParagrapDataProps } from "@/lib/types/typesParagraphEmbed";


export default function XwithConsent({ node }: { node: TwitterParagrapDataProps }) {
  const [isMounted, setIsMounted] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  const provider = 'x';
  const cookieId = provider ? `video_${provider}` : null;

  useEffect(() => {
    setIsMounted(true);

    if (!cookieId) {
      setHasConsent(true);
      return;
    }

    // État initial
    setHasConsent(cookieConsent.isAccepted(cookieId));

    // Écoute tous les changements (modale, bandeau, etc.)
    const unsubscribe = cookieConsent.subscribe(() => {
      setHasConsent(cookieConsent.isAccepted(cookieId));
    });

    return unsubscribe;
  }, [cookieId]);

  // === PENDANT SSR + PREMIER RENDU CLIENT ===
  // On affiche TOUJOURS le placeholder → HTML identique serveur/client
  if (!isMounted || (cookieId && !hasConsent)) {
    return (
      <div className="prgh-video-wrapper relative aspect-video overflow-hidden rounded-xl bg-linear-to-br from-gray-200 to-white dark:from-neutral-800 dark:to-neutral-950">
        <div className="absolute inset-0 z-10 flex items-center justify-center p-8">
          <div className="prgh-video-info max-w-md rounded-2xl p-8 text-center">
            <div className="mx-auto mt-4 mb-3 flex h-15 w-15 items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-950">
              <span className="text-gray-600 dark:text-gray-400 text-3xl icon-gm-x" ></span>
            </div>
            <p className="mb-1 text-gray-600 dark:text-gray-400 text-sm">
              Pour la visionner le post, merci d&apos;accepter les cookies
            </p>
            {provider && (
              <button
                onClick={() => cookieConsent.acceptCookie(cookieId!)}
                className="hover:text-one/70 cursor-pointer font-semibold text-one transition text-sm"
              >
                Accepter les cookies X
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // === CONSENTEMENT ACCORDÉ ===
  // On charge vraiment la vidéo
  return (
    <TwitterPostParagraph
      node={node}
      langcode={"fr"}
      theme="dark"
    />
  );
}
