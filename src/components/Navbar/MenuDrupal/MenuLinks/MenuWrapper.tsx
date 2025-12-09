"use client";
// Params
// import { useParams } from "next/navigation";
// Types
import { MenuLinkType, MenuLinksDisplayType } from "@/lib/types";
// Composents
import MenuLinks from "@/components/Navbar/MenuDrupal/MenuLinks/MenuLinks";
import { Menu } from "@drupal/decoupled-menu-parser/dist/core/menu";
import { MenuElement } from "@drupal/decoupled-menu-parser/dist/core/menu-element";
// import { useRef } from "react";
// Type props
type MenuLinksProps = {
  items: Menu | Menu[];
  display: MenuLinksDisplayType[];
};
// Composent
export function MenuWrapper({ items, display }: MenuLinksProps) {
  const menuItem = Array.isArray(items) ? items[0] : items;
  const ulClass = display && display[0]?.ul ? display[0].ul : "";
  return (
    <ul className={`navbar menu-ulh ${ulClass}`}>
      {menuItem &&
        menuItem.tree &&
        menuItem.tree.map((link: MenuElement, key: number) => (
          <MenuLinks
            key={key}
            menuLinkItem={link as MenuLinkType}
            layer={1}
            display={display}
          />
        ))}
    </ul>
  );
}
export default MenuWrapper;
