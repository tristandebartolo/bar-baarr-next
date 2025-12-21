// src/lib/video-consent.ts
export type VideoProvider =
  | "youtube"
  | "vimeo"
  | "dailymotion"
  | "archive"
  | "rts"
  | "ina"
  | "x";

export const VIDEO_PROVIDERS: Record<VideoProvider, { name: string, description?: string, link?: string }> = {
  youtube: { 
    name: "YouTube", 
    description: "Autoriser les vidéos",
    link: "",
  },
  vimeo: { name: "Vimeo", description: "Autoriser les vidéos" },
  dailymotion: { name: "Dailymotion", description: "Autoriser les vidéos" },
  archive: { name: "Archive.org", description: "Autoriser les vidéos" },
  rts: { name: "RTS", description: "Autoriser les vidéos" },
  ina: { name: "INA", description: "Autoriser les vidéos" },
  x: { name: "X", description: "Autoriser les posts" },
};

export const SUPPORTED_LANGUAGES = ["fr", "en", "it", "de", 'es'] as const;