// Lib
// import { useContext, useEffect, useState } from "react";
// import Link from "next/link";
import { getMenu } from "@/lib/action";
// Custom Componants
import NavbarTheme from "@/components/Navbar/NavbarTheme/NavbarTheme";
// import Logo from "@/components/ui/Logo/Logo";
// Types
import { MenuLinksDisplayType } from "@/lib/types";
// Style
import "./Header.module.css";
// Composants
import MenuDrupal from "../Navbar/MenuDrupal/MenuDrupal";
// Composant
async function Header() {
  const menuTop = await getMenu('top');

  const menuDisplay: MenuLinksDisplayType[] = [
    {
      ul: "flex gap-2 dark:text-cyan-50 w-max",
      li: "w-max relative",
    },
    {
      ul: "flex flex-col w-full",
      li: "w-max relative",
    },
  ];

  return (
    <div className="pp-header">
      <div className="dark:text-cyan-50 container mx-auto 2xl:max-w-(--container)">
        <div className="h-30 flex justify-between items-end px-5">
          <NavbarTheme />
          <MenuDrupal menu={menuTop} display={menuDisplay}/>
        </div>
      </div>
    </div>
  );
}
export default Header;
