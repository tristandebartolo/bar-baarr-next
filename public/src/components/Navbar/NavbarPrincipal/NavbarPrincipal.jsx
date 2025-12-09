"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Lib
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
// Composent
function NavbarPrincipal() {
    const params = (0, navigation_1.useParams)();
    const classLink = `bg-one/10 hover:bg-one/20 hover:border-b-3 border-one h-13 flex items-center justify-center px-3 cursor-pointer text-sm transition-all`;
    const classBtn = `bg-one/10 hover:bg-one/20 hover:border-b-3 border-one h-13 flex items-center justify-center px-3 cursor-pointer transition-all`;
    return (<nav className="menu-block">
      <ul className="flex dark:text-cyan-50 menu-ulh gap-[1px]">
        <li>
          <button type="button" className={classBtn}>
            <span className="i-gntl--menu"></span>
          </button>
        </li>
        <li>
          <button type="button" className={classBtn}>
            <span className="i-gntl--search"></span>
          </button>
        </li>
        <li>
          <link_1.default href={`/${params.locale}`} className={classLink}>À la une</link_1.default>
        </li>
        <li>
          <link_1.default href={`/${params.locale}/rubriques`} className={classLink}>Rubriques</link_1.default>
        </li>
        <li>
          <link_1.default href={`/${params.locale}/club`} className={classLink}>Club</link_1.default>
        </li>
      </ul>
    </nav>);
}
exports.default = NavbarPrincipal;
