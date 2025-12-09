// src/lib/video-consent.ts
export type VideoProvider =
  | "youtube"
  | "vimeo"
  | "dailymotion"
  | "archive"
  | "rts"
  | "ina";

export const VIDEO_PROVIDERS: Record<VideoProvider, { name: string }> = {
  youtube: { name: "YouTube" },
  vimeo: { name: "Vimeo" },
  dailymotion: { name: "Dailymotion" },
  archive: { name: "Archive.org" },
  rts: { name: "RTS" },
  ina: { name: "INA" },
};