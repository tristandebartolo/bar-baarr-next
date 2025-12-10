// src/components/ui/VideoWithConsent.tsx
"use client";

import { useEffect, useState } from "react";
import { cookieConsent } from "@/lib/helpers/cookieConsent";
import VideoEmbed from "./VideoEmbed";
import { VIDEO_PROVIDERS } from "@/lib/types/typesCookies";

const getProvider = (url: string): keyof typeof VIDEO_PROVIDERS | null => {
  if (url.includes("youtube") || url.includes("youtu.be")) return "youtube";
  if (url.includes("vimeo")) return "vimeo";
  if (url.includes("dailymotion")) return "dailymotion";
  if (url.includes("archive.org")) return "archive";
  if (url.includes("rts.ch")) return "rts";
  if (url.includes("ina.fr")) return "ina";
  return null;
};

export default function VideoWithConsent({ url }: { url: string }) {
  const [isMounted, setIsMounted] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  const provider = getProvider(url);
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
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-950">
              <svg
                className="h-12 w-12 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            </div>
            {/* <h3 className="mb-3 text-2xl font-bold">
              {provider ? VIDEO_PROVIDERS[provider].name : "Vidéo"}
            </h3> */}
            <p className="mb-8 text-gray-600 dark:text-gray-400">
              Cette vidéo est hébergée par{" "}
              <strong>
                {provider ? VIDEO_PROVIDERS[provider].name : "un service tiers"}
              </strong>
              .
              <br />
              Pour la visionner, merci d&apos;accepter les cookies
            </p>
            {provider && (
              <button
                onClick={() => cookieConsent.acceptCookie(cookieId!)}
                className="bg-one hover:bg-one/70 cursor-pointer rounded-xl px-8 py-4 text-lg font-semibold text-white transition dark:text-black"
              >
                Accepter les cookies{" "}
                <strong>
                  {provider
                    ? VIDEO_PROVIDERS[provider].name
                    : "un service tiers"}
                </strong>
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
    <VideoEmbed
      field_embed_url={url}
      width={800}
      height={450}
      className="mx-auto"
    />
  );
}
