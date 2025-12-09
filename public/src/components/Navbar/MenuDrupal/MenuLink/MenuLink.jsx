"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuLink = MenuLink;
// Params
// import { useParams } from "next/navigation";
// Lib
const link_1 = __importDefault(require("next/link"));
// import { useRef } from "react";
function MenuLink({ linkItem, hasChild, hdlOpen, isOpen, }) {
    const { attributes, href } = linkItem;
    const typeLink = attributes && attributes.next && Array.isArray(attributes.next)
        ? attributes === null || attributes === void 0 ? void 0 : attributes.next[0]
        : "_nextLink";
    if (typeLink === "_nextLink") {
        return (<link_1.default href={href} className="w-full flex items-center justify-between p-2">
        {(attributes === null || attributes === void 0 ? void 0 : attributes.icon) && Array.isArray(attributes.icon) && (<span className={`${attributes.icon[0]}`}></span>)}
        {attributes.title}
      </link_1.default>);
    }
    if (typeLink === "_webLink") {
        return <a href={href} className="w-full flex items-center justify-between p-2">{attributes.title}</a>;
    }
    return (<>
      <button type="button" className={`cursor-pointer ${isOpen ? "open" : "close"} w-full flex items-center justify-between p-2 `} onClick={hdlOpen}>
        {attributes.title}
        {hasChild && isOpen && <span className="i-gntl--expand_less ml-2"></span>}
        {hasChild && !isOpen && <span className="i-gntl--expand_more ml-2"></span>}
      </button>
    </>);
}
exports.default = MenuLink;
