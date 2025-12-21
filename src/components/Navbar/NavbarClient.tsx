// components/Navbar/NavbarClient.tsx
"use client";
import { useEffect, useRef } from "react";
// Composants
import MenuDrupal from "@/components/Navbar/MenuDrupal/MenuDrupal";
import NavbarUser from "@/components/Navbar/NavbarUser/NavbarUser";
import NavbarLocal from "@/components/Navbar/NavbarLocal/NavbarLocal";
// Types
import { MenuLinksDisplayType, SessionUser } from "@/lib/types";
import { LinksetInterface } from "@drupal/linkset/dist/spec/linkset-json";
import Link from "next/link";
type MenuComposentProps = {
  menuSecondary: LinksetInterface;
  menuDisplay: MenuLinksDisplayType[];
  sessionUser?: SessionUser;
};
// NavbarContent
const NavbarContent = ({ menuSecondary, menuDisplay, sessionUser }: MenuComposentProps) => (
  <div className="container mx-auto px-5 2xl:max-w-[--container]">
    <div className="flex h-16 items-center justify-between">
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
    const fixed = fixedNavbarRef.current;
    if (!fixed) return;

    let prevScroll = window.scrollY;

    const onScroll = () => {
      const current = window.scrollY;
      const triggerPoint = 180; // hauteur de ton header + navbar (ajuste si besoin)

      if (current > triggerPoint) {
        fixed.style.transform = current < prevScroll ? "translateY(0)" : "translateY(-100%)";
      } else {
        fixed.style.transform = "translateY(-100%)";
      }

      prevScroll = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* NAVBAR RELATIVE — prend sa place naturellement */}
      <div className="relative z-10 border-b border-gray-200/50 bg-white/90 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-950/90">
        <NavbarContent menuSecondary={menuSecondary} menuDisplay={menuDisplay} sessionUser={sessionUser} />
        <ul>
          <li>
            <a href={`/fr#cookies-preferences`}>
              <span className="icon-gm-cookies text-xl"></span>
            </a>
          </li>
        </ul>
      </div>

      {/* NAVBAR FIXED — apparaît seulement quand on scroll up après la relative */}
      <div
        ref={fixedNavbarRef}
        className="fixed inset-x-0 top-0 z-50 border-b border-gray-200/50 bg-white/90 shadow-lg backdrop-blur-lg dark:border-gray-800 dark:bg-gray-950/90"
        style={{
          transform: "translateY(-100%)",
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <NavbarContent menuSecondary={menuSecondary} menuDisplay={menuDisplay} sessionUser={sessionUser} />
      </div>
    </>
  );
}
