// src/components/cookies/CookieModal.tsx
"use client";
import { useEffect, useState } from "react";
import { cookieConsent } from "@/lib/helpers/cookieConsent";
import { VIDEO_PROVIDERS } from "@/lib/types/typesCookies";

export default function CookieModal({ onClose }: { onClose: () => void }) {
  // Force le re-render quand le consentement change
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = cookieConsent.subscribe(() => forceUpdate({}));
    return unsubscribe;
  }, []);

  const providers = Object.entries(VIDEO_PROVIDERS);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-6 text-3xl font-bold">Paramètres des cookies</h2>

        <div className="space-y-6">
          {/* Cookies nécessaires */}
          <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold">Cookies nécessaires</div>
                <p className="text-sm text-gray-600">Requis pour le fonctionnement du site</p>
              </div>
              <div className="relative inline-block w-12 h-6 rounded-full bg-one">
                <div className="absolute left-7 top-1 w-4 h-4 rounded-full bg-white dark:bg-gray-900 shadow"></div>
              </div>
            </div>
          </div>

          {/* Contenus embarqués */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">Contenus embarqués</h3>
            {providers.map(([key, { name }]) => {
              const id = `video_${key}`;
              const isOn = cookieConsent.isAccepted(id);

              return (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-xl border p-3 transition hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div>
                    <div className="font-medium text-lg">{name}</div>
                    <p className="text-sm text-gray-600">Autoriser les vidéos {name}</p>
                  </div>

                  {/* SWITCH */}
                  <button
                    onClick={() => {
                      if (isOn) {
                        cookieConsent.rejectCookie(id);
                      } else {
                        cookieConsent.acceptCookie(id);
                      }
                    }}
                    className={`relative inline-block w-12 h-6 rounded-full transition ${
                      isOn ? "bg-one" : "bg-gray-400"
                    }`}
                    aria-label={`Activer les cookies ${name}`}
                  >
                    <span
                      className={`absolute left-0 top-1 w-4 h-4 rounded-full bg-white dark:bg-gray-900 shadow-md transition-transform ${
                        isOn ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex justify-end gap-4">
          <button
            onClick={() => {
              cookieConsent.rejectAll();
              onClose();
            }}
            className="rounded-xl border px-6 py-3 font-medium transition hover:bg-gray-100"
          >
            Refuser tout
          </button>
          <button
            onClick={() => {
              cookieConsent.acceptAll();
              onClose();
            }}
            className="rounded-xl bg-one px-6 py-3 font-medium text-white dark:text-black hover:bg-one/60"
          >
            Accepter tout
          </button>
          <button
            onClick={onClose}
            className="rounded-xl bg-green-600 px-6 py-3 font-medium text-white dark:text-black hover:bg-green-700"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}