"use client";

export default function CookiePreferencesButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gray-800/90 px-4 py-2.5 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-gray-700"
      aria-label="Préférences cookies"
    >
      <span className="text-2xl icon-gm-cookies"></span>
    </button>
  );
}