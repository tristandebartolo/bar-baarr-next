"use strict";
// components/Navbar/NavbarClient.tsx
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NavbarClient;
const react_1 = require("react");
// Composants
const MenuDrupal_1 = __importDefault(require("@/components/Navbar/MenuDrupal/MenuDrupal"));
const NavbarUser_1 = __importDefault(require("@/components/Navbar/NavbarUser/NavbarUser"));
const NavbarLocal_1 = __importDefault(require("@/components/Navbar/NavbarLocal/NavbarLocal"));
// NavbarContent
const NavbarContent = ({ menuSecondary, menuDisplay, sessionUser, }) => (<div className="container mx-auto px-5 2xl:max-w-[--container]">
    <div className="flex h-16 items-center justify-between">
      <MenuDrupal_1.default menu={menuSecondary} display={menuDisplay}/>
      <div className="flex items-center gap-6">
        <NavbarUser_1.default sessionUser={sessionUser}/>
        <NavbarLocal_1.default />
      </div>
    </div>
  </div>);
// NavbarClient
function NavbarClient({ menuSecondary, menuDisplay, sessionUser, }) {
    const fixedNavbarRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const fixed = fixedNavbarRef.current;
        if (!fixed)
            return;
        let prevScroll = window.scrollY;
        const onScroll = () => {
            const current = window.scrollY;
            const triggerPoint = 180; // hauteur de ton header + navbar (ajuste si besoin)
            if (current > triggerPoint) {
                fixed.style.transform =
                    current < prevScroll ? "translateY(0)" : "translateY(-100%)";
            }
            else {
                fixed.style.transform = "translateY(-100%)";
            }
            prevScroll = current;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (<>
      {/* NAVBAR RELATIVE — prend sa place naturellement */}
      <div className="relative z-10 border-b border-gray-200/50 bg-white/90 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-950/90">
        <NavbarContent menuSecondary={menuSecondary} menuDisplay={menuDisplay} sessionUser={sessionUser}/>
      </div>

      {/* NAVBAR FIXED — apparaît seulement quand on scroll up après la relative */}
      <div ref={fixedNavbarRef} className="fixed inset-x-0 top-0 z-50 border-b border-gray-200/50 bg-white/90 shadow-lg backdrop-blur-lg dark:border-gray-800 dark:bg-gray-950/90" style={{
            transform: "translateY(-100%)",
            transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
        <NavbarContent menuSecondary={menuSecondary} menuDisplay={menuDisplay} sessionUser={sessionUser}/>
      </div>
    </>);
}
