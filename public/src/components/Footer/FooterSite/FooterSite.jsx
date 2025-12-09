"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Actions
const action_1 = require("@/lib/action");
// Custom Componants
const MenuDrupal_1 = __importDefault(require("@/components/Navbar/MenuDrupal/MenuDrupal"));
//Composant
async function FooterSite() {
    const menuFooter = await (0, action_1.getMenu)("top");
    const menuDisplay = [
        {
            ul: "flex gap-2 dark:text-cyan-50 w-max",
            li: "w-max relative",
        },
        {
            ul: "flex flex-col w-full",
            li: "w-max relative",
        },
    ];
    return <MenuDrupal_1.default menu={menuFooter} display={menuDisplay}/>;
}
exports.default = FooterSite;
