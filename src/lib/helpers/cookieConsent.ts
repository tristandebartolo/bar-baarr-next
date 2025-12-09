// src/lib/cookieConsentService.ts
const KEY = "cookie-consent-v1";

export type ConsentState = {
  consents: Record<string, boolean>;
  hasConsented: boolean;
};

let state: ConsentState = { consents: {}, hasConsented: false };
const listeners = new Set<() => void>();

const load = (): ConsentState => {
  if (typeof window === "undefined") return state;
  try {
    const raw = localStorage.getItem(KEY);
    state = raw ? JSON.parse(raw) : { consents: {}, hasConsented: false };
    return state;
  } catch {
    return state;
  }
};

const save = (newState: ConsentState) => {
  state = newState;
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(state));
    listeners.forEach((l) => l());
  }
};

export const cookieConsent = {
  getState: () => load(),

  // Retourne explicitement une fonction de désabonnement
  subscribe: (listener: () => void): (() => void) => {
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

  acceptCookie: (id: string) => {
    const s = load();
    s.consents[id] = true;
    s.hasConsented = true;
    save(s);
  },

  rejectCookie: (id: string) => {
    const s = load();
    delete s.consents[id];
    s.hasConsented = Object.keys(s.consents).length > 0;
    save(s);
  },

  isAccepted: (id: string): boolean => load().consents[id] === true,
  hasConsented: (): boolean => load().hasConsented,
};