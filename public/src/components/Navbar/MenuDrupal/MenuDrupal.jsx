"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuDrupal = MenuDrupal;
// Params
// import { useParams } from "next/navigation";
const decoupled_menu_parser_1 = require("@drupal/decoupled-menu-parser");
// Lib
const MenuWrapper_1 = __importDefault(require("@/components/Navbar/MenuDrupal/MenuLinks/MenuWrapper"));
// Component
function MenuDrupal({ menu, display }) {
    // const params = useParams();
    // secondary | footer | social | 
    if (!menu.linkset) {
        return (<nav className="menu-block">
        <ul className="navbar menu-ulh dark:text-cyan-50"></ul>
      </nav>);
    }
    const menuDenormalize = (0, decoupled_menu_parser_1.denormalize)(menu);
    // const { item } = menu.linkset[0];
    // const { locale, alias = '' } = params;
    // const aliasPage = `/${locale}${alias}`;
    return (<MenuWrapper_1.default items={menuDenormalize} display={display}/>);
}
exports.default = MenuDrupal;
