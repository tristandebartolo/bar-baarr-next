"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuLinks = MenuLinks;
// Params
// import { useParams } from "next/navigation";
const react_1 = require("react");
// import { MenuElement } from "@drupal/decoupled-menu-parser/dist/core/menu-element";
// Composents
const MenuLink_1 = __importDefault(require("../MenuLink/MenuLink"));
// Composent
function MenuLinks({ menuLinkItem, layer, display }) {
    var _a, _b;
    // const params = useParams();
    const [openMenu, setOpenMenu] = (0, react_1.useState)(false);
    const { children, link } = menuLinkItem;
    const hdlOpen = () => {
        setOpenMenu(!openMenu);
    };
    const ulClass = display && ((_a = display[layer]) === null || _a === void 0 ? void 0 : _a.ul) ? display[layer].ul : 'flex flex-col';
    const liClass = display && ((_b = display[layer]) === null || _b === void 0 ? void 0 : _b.li) ? display[layer].li : '';
    const hasChild = children && children.length > 0 ? ' has-child' : '';
    const menuIsOpen = openMenu ? ' open' : ' close';
    return (<li className={`${hasChild}${menuIsOpen}${liClass}`}>
      <MenuLink_1.default linkItem={link} hasChild={children && children.length > 0} hdlOpen={hdlOpen} isOpen={openMenu}/>
      {children && children.length > 0 && openMenu && (<>
          <ul className={`layer-${layer} ${ulClass} ${layer === 1 ? 'absolute' : ''}`}>
            {children.map((lk, key) => (<MenuLinks key={key} menuLinkItem={lk} layer={layer + 1} display={display}/>))}
          </ul>
        </>)}
    </li>);
}
exports.default = MenuLinks;
