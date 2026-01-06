// components/Navbar/NavbarClient.tsx
"use client";
import { useEffect } from "react";
import UIkit from "uikit";
// Composants
import MenuDrupal from "@/components/Navbar/MenuDrupal/MenuDrupal";
import NavbarUser from "@/components/Navbar/NavbarUser/NavbarUser";
import NavbarLocal from "@/components/Navbar/NavbarLocal/NavbarLocal";
// Types
import { MenuLinksDisplayType, SessionUser } from "@/lib/types";
import { LinksetInterface } from "@drupal/linkset/dist/spec/linkset-json";
// import Link from "next/link";
import Sticky from "../ui/Sticky/Sticky";
type MenuComposentProps = {
  menuSecondary: LinksetInterface;
  menuDisplay: MenuLinksDisplayType[];
  sessionUser?: SessionUser;
};
// NavbarContent
const NavbarContent = ({ menuSecondary, menuDisplay, sessionUser }: MenuComposentProps) => (
  <div className="container mx-auto flex px-5 font-sans 2xl:max-w-(--container)">
    <div className="flex h-16 w-full items-center justify-between">
      <MenuDrupal menu={menuSecondary} display={menuDisplay} />
      <div className="flex items-center gap-6">
        <NavbarUser sessionUser={sessionUser} />
        <NavbarLocal />
      </div>
    </div>
  </div>
);
// NavbarClient
export default function NavbarClient({ menuSecondary, menuDisplay, sessionUser }: MenuComposentProps) {

  useEffect(() => {
    const sticky = UIkit.sticky(`.hh-navbar`, {
      // offset: options?.offset || 90,
      // media: options?.media || 960,
      end: "!body",
      // overflowEnd: 90,
      // animation: "pp-flip",
      showOnUp: true,
      position: "top",
      clsActive: "pp-flip",
    });

    return () => {
      sticky?.$destroy?.();
    };
  }, []);

  return (
    <Sticky offset={0} activeClass="shadow-xl bg-white/95 backdrop-blur" className="border-b border-gray-200">
      <div className="border-one/30 border-b-5">
        <NavbarContent menuSecondary={menuSecondary} menuDisplay={menuDisplay} sessionUser={sessionUser} />
      </div>
    </Sticky>
  );
}
