// components/ui/JournalSommaire/JournalSommaire.tsx
"use client";

import { FC, useEffect, useState } from "react";

import { SommaireItem } from "@/lib/types/index";

interface JournalSommaireProps {
  sommaire: string[] | SommaireItem[];
  className?: string;
}

export const JournalSommaire: FC<JournalSommaireProps> = ({
  sommaire,
  className = "",
}) => {
  // === TOUS LES HOOKS EN PREMIER (toujours appelés) ===
  const [activeId, setActiveId] = useState<string | null>(null);

  // // === Early return APRÈS les hooks ===
  // if (!sommaire || sommaire.length === 0) return null;

  // === Maintenant on peut déclarer tout le reste en toute sécurité ===
  const isStructured = (
    items: string[] | SommaireItem[],
  ): items is SommaireItem[] => {
    return (
      Array.isArray(items) &&
      items.length > 0 &&
      typeof items[0] === "object" &&
      items[0] !== null &&
      "id" in items[0] &&
      "title" in items[0]
    );
  };

  const hasLinks = isStructured(sommaire);

  const extractText = (html: string): string => {
    if (typeof document !== "undefined") {
      const div = document.createElement("div");
      div.innerHTML = html;
      return div.textContent || "";
    }
    return html.replace(/<[^>]*>/g, "").trim();
  };

  // === useEffect maintenant inconditionnel (appel garanti à chaque rendu) ===
  useEffect(() => {
    if (!hasLinks) return;

    const items = sommaire as SommaireItem[];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      let current: string | null = null;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const element = document.getElementById(item.id);
        if (!element) continue;

        const top = element.offsetTop;
        const nextElement = items[i + 1] ? document.getElementById(items[i + 1].id) : null;
        const bottom = nextElement ? nextElement.offsetTop : Infinity;

        if (scrollPosition >= top && scrollPosition < bottom) {
          current = item.id;
          break;
        }
      }

      setActiveId(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [hasLinks, sommaire]);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  // === Rendu ===
  return (
    <nav className={`${className}`}>
      <div>
        <h3 className="mb-6 font-mono text-xs font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
          Sommaire
        </h3>

        <ul className="space-y-3 border-l-2 border-gray-200 dark:border-gray-700">
          {hasLinks ? (
            <>
              {/* Retour en haut */}
              <li className="ml-4 -indent-4">
                <a
                  href="#top"
                  onClick={scrollToTop}
                  className="block py-1 pl-4 text-sm text-gray-500 transition-all duration-200 hover:translate-x-1 hover:text-one"
                >
                  ↑ Retour en haut
                </a>
              </li>

              {/* Liens du sommaire */}
              {(sommaire as SommaireItem[]).map((item, index) => {
                const isActive = activeId === item.id;

                return (
                  <li key={item.id + index} className="m-0">
                    <a
                      href={`#${item.id}`}
                      className={`block py-1 pl-4 text-sm transition-all duration-300 ${
                        isActive
                          ? "font-bold text-one translate-x-2"
                          : "text-gray-600 hover:translate-x-2 hover:text-one hover:font-bold"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        const target = document.getElementById(item.id);
                        if (target) {
                          window.scrollTo({
                            top: target.offsetTop - 120,
                            behavior: "smooth",
                          });
                        }
                      }}
                    >
                      {item.title}
                    </a>
                  </li>
                );
              })}

              {/* Aller en bas */}
              <li className="ml-4 -indent-4">
                <a
                  href="#bottom"
                  onClick={scrollToBottom}
                  className="block py-1 pl-4 text-sm text-gray-500 transition-all duration-200 hover:translate-x-1 hover:text-one"
                >
                  ↓ Aller en bas de page
                </a>
              </li>
            </>
          ) : (
            (sommaire as string[]).map((html, index) => {
              const text = extractText(html);
              return (
                <li
                  key={index}
                  className="ml-4 py-1 pl-4 text-sm text-gray-500 dark:text-gray-500"
                >
                  {text}
                </li>
              );
            })
          )}
        </ul>
      </div>
    </nav>
  );
};