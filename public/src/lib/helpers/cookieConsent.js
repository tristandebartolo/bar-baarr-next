"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieConsent = void 0;
// src/lib/cookieConsentService.ts
const KEY = "cookie-consent-v1";
let state = { consents: {}, hasConsented: false };
const listeners = new Set();
const load = () => {
    if (typeof window === "undefined")
        return state;
    try {
        const raw = localStorage.getItem(KEY);
        state = raw ? JSON.parse(raw) : { consents: {}, hasConsented: false };
        return state;
    }
    catch {
        return state;
    }
};
const save = (newState) => {
    state = newState;
    if (typeof window !== "undefined") {
        localStorage.setItem(KEY, JSON.stringify(state));
        listeners.forEach((l) => l());
    }
};
exports.cookieConsent = {
    getState: () => load(),
    // Retourne explicitement une fonction de désabonnement
    subscribe: (listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    },
    acceptAll: () => {
        save({
            consents: {
                necessary: true,
                preferences: true,
                video_youtube: true,
                video_vimeo: true,
                video_dailymotion: true,
                video_archive: true,
                video_rts: true,
                video_ina: true,
            },
            hasConsented: true,
        });
    },
    rejectAll: () => {
        save({ consents: { necessary: true }, hasConsented: true });
    },
    acceptCookie: (id) => {
        const s = load();
        s.consents[id] = true;
        s.hasConsented = true;
        save(s);
    },
    rejectCookie: (id) => {
        const s = load();
        delete s.consents[id];
        s.hasConsented = Object.keys(s.consents).length > 0;
        save(s);
    },
    isAccepted: (id) => load().consents[id] === true,
    hasConsented: () => load().hasConsented,
};
