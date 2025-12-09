"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Lib
// import { useContext, useEffect, useState } from "react";
// import Link from "next/link";
const action_1 = require("@/lib/action");
// Custom Componants
const NavbarTheme_1 = __importDefault(require("@/components/Navbar/NavbarTheme/NavbarTheme"));
// Style
require("./Header.module.css");
// Composants
const MenuDrupal_1 = __importDefault(require("../Navbar/MenuDrupal/MenuDrupal"));
// Composant
async function Header() {
    const menuTop = await (0, action_1.getMenu)('top');
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
    return (<div className="pp-header">
      <div className="dark:text-cyan-50 container mx-auto 2xl:max-w-(--container)">
        <div className="h-30 flex justify-between items-end px-5">
          <NavbarTheme_1.default />
          <MenuDrupal_1.default menu={menuTop} display={menuDisplay}/>
        </div>
      </div>
    </div>);
}
exports.default = Header;
