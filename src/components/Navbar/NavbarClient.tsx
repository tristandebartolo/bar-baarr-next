// components/Navbar/NavbarClient.tsx
"use client";
import { useEffect, useRef } from "react";
import UIkit from "uikit";
// Composants
import MenuDrupal from "@/components/Navbar/MenuDrupal/MenuDrupal";
import NavbarUser from "@/components/Navbar/NavbarUser/NavbarUser";
import NavbarLocal from "@/components/Navbar/NavbarLocal/NavbarLocal";
// Types
import { MenuLinksDisplayType, SessionUser } from "@/lib/types";
import { LinksetInterface } from "@drupal/linkset/dist/spec/linkset-json";
import Link from "next/link";
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
  const fixedNavbarRef = useRef<HTMLDivElement>(null);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   const fixed = fixedNavbarRef.current;
  //   if (!fixed) return;

  //   let prevScroll = window.scrollY;

  //   const onScroll = () => {
  //     const current = window.scrollY;
  //     const triggerPoint = 180; // hauteur de ton header + navbar (ajuste si besoin)

  //     if (current > triggerPoint) {
  //       fixed.style.transform = current < prevScroll ? "translateY(0)" : "translateY(-100%)";
  //     } else {
  //       fixed.style.transform = "translateY(-100%)";
  //     }

  //     prevScroll = current;
  //   };

  //   window.addEventListener("scroll", onScroll, { passive: true });
  //   onScroll();
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);

  return (
    <>
      {/* NAVBAR RELATIVE — prend sa place naturellement border-gray-200/50 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-950/90 */}

      {/* <div className="hh-navbar inset-x-0 z-999 border-gray-200/50 bg-white dark:border-gray-800 dark:bg-stone-900">
        <div className="border-one/30 border-b-5">
          <NavbarContent menuSecondary={menuSecondary} menuDisplay={menuDisplay} sessionUser={sessionUser} />
        </div>
      </div> */}

      <Sticky offset={0} activeClass="shadow-xl bg-white/95 backdrop-blur" className="border-b border-gray-200">
        <div className="border-one/30 border-b-5">
          <NavbarContent menuSecondary={menuSecondary} menuDisplay={menuDisplay} sessionUser={sessionUser} />
        </div>
      </Sticky>

      {/* NAVBAR FIXED — apparaît seulement quand on scroll up après la relative */}
      {/* <div
        ref={fixedNavbarRef}
        className="fixed inset-x-0 top-0 z-50 border-b border-gray-200/50 bg-white/90 shadow-lg backdrop-blur-lg dark:border-gray-800 dark:bg-gray-950/90"
        style={{
          transform: "translateY(-100%)",
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <NavbarContent menuSecondary={menuSecondary} menuDisplay={menuDisplay} sessionUser={sessionUser} />
      </div> */}
    </>
  );
}
