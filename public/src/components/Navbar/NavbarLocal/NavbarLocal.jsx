"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarLocal = NavbarLocal;
// Lib
const link_1 = __importDefault(require("next/link"));
// Component
function NavbarLocal() {
    return (<nav className="menu-block">
      <ul className="navbar dark:text-cyan-50 menu-ulh">
        <link_1.default href={`/fr`}>Fr</link_1.default>
        <link_1.default href={`/en`}>En</link_1.default>
      </ul>
    </nav>);
}
exports.default = NavbarLocal;
