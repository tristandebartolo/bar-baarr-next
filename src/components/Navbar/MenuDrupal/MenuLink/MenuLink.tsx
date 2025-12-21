"use client";
// Params
// import { useParams } from "next/navigation";
// Lib
import Link from "next/link";
// import { MenuElement } from "@drupal/decoupled-menu-parser/dist/core/menu-element";
import { LinkInterface } from "@drupal/linkset/dist/core/link";
// Type props
type MenuLinkProps = {
  linkItem: LinkInterface;
  hasChild?: boolean | null;
  isOpen?: boolean | null;
  hdlOpen: () => void;
};
// import { useRef } from "react";
export function MenuLink({
  linkItem,
  hasChild,
  hdlOpen,
  isOpen,
}: MenuLinkProps) {
  const { attributes, href } = linkItem;
  const typeLink =
    attributes && attributes.next && Array.isArray(attributes.next)
      ? attributes?.next[0]
      : "_nextLink";

  if (typeLink === "_nextLink") {
    return (
      <Link href={href} className="w-full flex items-center justify-between p-2">
        {attributes?.icon && Array.isArray(attributes.icon) && (
          <span className={`${attributes.icon[0]}`}></span>
        )}
        {attributes.title}
      </Link>
    );
  }

  if (typeLink === "_webLink") {
    return <a href={href} className="w-full flex items-center justify-between p-2">{attributes.title}</a>;
  }

  return (
    <>
      <button
        type="button"
        className={`cursor-pointer ${isOpen ? "open" : "close"} w-full flex items-center justify-between p-2 `}
        onClick={hdlOpen}
      >
        {attributes.title}
        {hasChild && isOpen && <span className="icon-gm-expand_less ml-2"></span>}
        {hasChild && !isOpen && <span className="icon-gm-expand_more ml-2"></span>}
      </button>
    </>
  );
}
export default MenuLink;
