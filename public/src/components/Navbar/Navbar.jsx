"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Navbar;
// Actions
const action_1 = require("@/lib/action");
// Components
const NavbarClient_1 = __importDefault(require("./NavbarClient"));
// Composant
async function Navbar({ sessionUser }) {
    // Chargement du menu secondaire (SSR)
    const menuSecondary = await (0, action_1.getMenu)("secondary");
    // Configuration d’affichage du menu
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
    return (<>
      {/* Composant client qui gère le scroll up/down */}
      <NavbarClient_1.default menuSecondary={menuSecondary} menuDisplay={menuDisplay} sessionUser={sessionUser}/>
    </>);
}
