"use strict";
// src/components/cookies/CookieBanner.tsx
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CookieBanner;
const cookieConsent_1 = require("@/lib/helpers/cookieConsent");
function CookieBanner({ onOpenPreferences }) {
    return (<div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-800 bg-gray-950 p-6 text-white shadow-2xl">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <h3 className="mb-2 text-xl font-bold">Cookies & Confidentialité</h3>
          <p className="text-sm opacity-90">
            Nous utilisons des cookies pour améliorer votre expérience et afficher des vidéos.
          </p>
        </div>
        <div className="flex gap-4">
          <button onClick={onOpenPreferences} className="rounded-xl border border-gray-600 px-6 py-3 transition hover:bg-gray-900">
            Personnaliser
          </button>
          <button onClick={cookieConsent_1.cookieConsent.acceptAll} className="rounded-xl bg-blue-600 px-8 py-3 font-medium text-white hover:bg-blue-700">
            Accepter tout
          </button>
        </div>
      </div>
    </div>);
}
