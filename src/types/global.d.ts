// src/types/global.d.ts
export {};

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement | null) => Promise<void>;
        createTweet: (
          id: string,
          element: HTMLElement,
          options?: Record<string, unknown>
        ) => Promise<void>;
      };
    };
  }
}