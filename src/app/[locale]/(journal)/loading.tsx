import { ccCookies } from "@/lib/action";

// Component
export default async function loading() {
  const currentTheme = (await ccCookies("theme")) || "dark";
  const currentColor = (await ccCookies("color")) || "bleu";

  return (
    <div
      className={`${currentTheme} ${currentColor} scroll-pt-23 scroll-smooth`}
    >
      <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center dark:bg-background">
        <span className="border-t-one mb-44 block h-14 w-14 animate-spin rounded-full border-4 border-gray-300"></span>
      </div>
    </div>
  );
}
