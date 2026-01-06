"use client";
// libs
import { FC, JSX, useEffect, useState } from "react";
import { SommaireItem } from "@/lib/types/index";
import "./JournalSommaire.scss";
// Types
interface JournalSommaireProps {
  sommaire: string[] | SommaireItem[];
  className?: string;
}
// Composent
export const JournalSommaire: FC<JournalSommaireProps> = ({ sommaire, className = "" }) => {
  const [activeIds, setActiveIds] = useState<Set<string>>(new Set());
  const [isFullyExpanded, setIsFullyExpanded] = useState(false);

  if (!sommaire || sommaire.length === 0) return null;

  const isStructured = (items: string[] | SommaireItem[]): items is SommaireItem[] => {
    return Array.isArray(items) && items.length > 0 && typeof items[0] === "object" && items[0] !== null && "id" in items[0] && "title" in items[0];
  };

  const hasLinks = isStructured(sommaire);
  const items = sommaire as SommaireItem[];

  // === Construction de la hiérarchie ===
  const childrenMap = new Map<string, SommaireItem[]>();
  const roots: SommaireItem[] = [];

  items.forEach((item) => {
    if (!item.parent_id) {
      roots.push(item);
    } else {
      if (!childrenMap.has(item.parent_id)) {
        childrenMap.set(item.parent_id, []);
      }
      childrenMap.get(item.parent_id)!.push(item);
    }
  });

  const flatItems = items.sort((a, b) => items.indexOf(a) - items.indexOf(b));

  // === NOUVEAU : Vérifier s’il y a au moins un nœud avec enfants ===
  const hasAnyChildren = roots.some((root) => childrenMap.has(root.id));

  // === Gestion du scroll (inchangée) ===
  useEffect(() => {
    const handleScroll = () => {
      const offset = 160;
      const scrollPosition = window.scrollY + offset;

      const newActive = new Set<string>();

      for (let i = 0; i < flatItems.length; i++) {
        const item = flatItems[i];
        const element = document.getElementById(item.id);
        if (!element) continue;

        const top = element.offsetTop;
        const nextItem = flatItems[i + 1];
        const bottom = nextItem ? document.getElementById(nextItem.id)?.offsetTop || Infinity : Infinity;

        if (scrollPosition >= top && scrollPosition < bottom) {
          newActive.add(item.id);

          let parentId = item.parent_id;
          while (parentId) {
            newActive.add(parentId);
            const parentItem = items.find((it) => it.id === parentId);
            parentId = parentItem?.parent_id || null;
          }
          break;
        }
      }

      setActiveIds(newActive);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [flatItems]);

  const smoothScroll = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const toggleFullExpand = () => {
    window.dispatchEvent(new Event("sidebar-height-changed"));
    setIsFullyExpanded((prev) => !prev);
  };

  const renderTree = (item: SommaireItem, depth: number = 0): JSX.Element => {
    const hasChildren = childrenMap.has(item.id);
    const isActive = activeIds.has(item.id);
    const isOpen = isFullyExpanded || isActive;

    return (
      <li key={item.id} className="sommaire-group">
        <a
          href={`#${item.id}`}
          onClick={(e) => {
            e.preventDefault();
            smoothScroll(item.id);
          }}
          className={`block truncate py-2 text-sm leading-none transition-all duration-300 hover:text-pretty ${
            isActive ? "text-one -ml-3 translate-x-2 pl-6 font-bold" : "hover:text-one text-gray-600 hover:translate-x-1"
          }`}
          style={{ paddingLeft: `${depth * 20 + 24}px` }}
        >
          {item.title}
        </a>

        {hasChildren && (
          <ul
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{
              maxHeight: isOpen ? "1000px" : "0px",
              opacity: isOpen ? 1 : 0,
            }}
          >
            {childrenMap.get(item.id)!.map((child) => renderTree(child, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav className={className} aria-label="Sommaire de l'article">
      <h3 className="mb-6 font-mono text-xs font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">Sommaire</h3>
      <ul className="oo-sommaire space-y-1">
        {/* Retour en haut */}
        <li>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="hover:text-one block py-2 pl-6 text-sm text-gray-500 transition"
          >
            ↑ Retour en haut
          </a>
        </li>

        {/* Bouton Déplier/Replier tout → uniquement si utile */}
        {hasAnyChildren && (
          <li>
            <button
              onClick={toggleFullExpand}
              className="hover:text-one block w-full py-2 pl-6 text-left text-sm text-gray-500 transition"
              aria-label={isFullyExpanded ? "Replier tout le sommaire" : "Déplier tout le sommaire"}
            >
              {isFullyExpanded ? "− Replier tout" : "+ Déplier tout"}
            </button>
          </li>
        )}

        {/* Arborescence */}
        {roots.map((root) => renderTree(root, 0))}

        {/* Aller en bas */}
        <li>
          <a
            href="#bottom"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              });
            }}
            className="hover:text-one block py-2 pl-6 text-sm text-gray-500 transition"
          >
            ↓ Aller en bas de page
          </a>
        </li>
      </ul>
    </nav>
  );
};
