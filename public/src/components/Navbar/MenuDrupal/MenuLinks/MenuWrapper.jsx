"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuWrapper = MenuWrapper;
// Composents
const MenuLinks_1 = __importDefault(require("@/components/Navbar/MenuDrupal/MenuLinks/MenuLinks"));
// Composent
function MenuWrapper({ items, display }) {
    var _a;
    const menuItem = Array.isArray(items) ? items[0] : items;
    const ulClass = display && ((_a = display[0]) === null || _a === void 0 ? void 0 : _a.ul) ? display[0].ul : "";
    return (<ul className={`navbar menu-ulh ${ulClass}`}>
      {menuItem &&
            menuItem.tree &&
            menuItem.tree.map((link, key) => (<MenuLinks_1.default key={key} menuLinkItem={link} layer={1} display={display}/>))}
    </ul>);
}
exports.default = MenuWrapper;
