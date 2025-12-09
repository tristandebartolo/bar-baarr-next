"use client";
// Params
// import { useParams } from "next/navigation";
import { useState } from "react";
// Types
import { MenuLinkType, MenuLinksDisplayType } from "@/lib/types";
// import { MenuElement } from "@drupal/decoupled-menu-parser/dist/core/menu-element";
// Composents
import MenuLink from "../MenuLink/MenuLink";
// Type props
type MenuLinksProps = {
  menuLinkItem: MenuLinkType;
  layer: number;
  display: MenuLinksDisplayType[]
};
// Composent
export function MenuLinks({ menuLinkItem, layer, display }: MenuLinksProps) {
  // const params = useParams();
  const [openMenu, setOpenMenu] = useState(false)
  const { children, link } = menuLinkItem;

  const hdlOpen = () => {
    setOpenMenu(!openMenu)
  }

  const ulClass = display && display[layer]?.ul ? display[layer].ul : 'flex flex-col';
  const liClass = display && display[layer]?.li ? display[layer].li : '';
  const hasChild = children && children.length > 0 ? ' has-child' : '';
  const menuIsOpen = openMenu ? ' open' : ' close';

  return (
    <li className={`${hasChild}${menuIsOpen}${liClass}`}>
      <MenuLink linkItem={link} hasChild={children && children.length > 0} hdlOpen={hdlOpen} isOpen={openMenu}/>
      {children && children.length > 0 && openMenu && (
        <>
          <ul className={`layer-${layer} ${ulClass} ${layer === 1 ? 'absolute' : ''}`}>
            {children.map((lk: MenuLinkType, key: number) => (
              <MenuLinks key={key} menuLinkItem={lk as MenuLinkType} layer={layer+1} display={display}/>
            ))}
          </ul>
        </>
      )}
    </li>
  );
}
export default MenuLinks;
