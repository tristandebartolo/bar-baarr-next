"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RootLayout;
// Lib
const react_1 = require("next-auth/react");
const react_2 = require("react");
// import type { Metadata } from "next";
// Auth
const auth_1 = require("@/auth/auth");
// Style
require("../../globals.css");
// Actions
const action_1 = require("@/lib/action");
// Context
const FrontContext_1 = require("@/context/FrontContext");
// Composents
const Navbar_1 = __importDefault(require("@/components/Navbar/Navbar"));
const Header_1 = __importDefault(require("@/components/Header/Header"));
const CookieSystem_1 = __importDefault(require("@/components/ui/CookieBanner/CookieSystem"));
// import CookiePreferencesLink from "@/components/ui/CookieBanner/CookiePreferencesLink";
// Metadata
// export const metadata: Metadata = {
//   title: "Bonjour | Le journal du Bar.Bâ.a.r.r",
//   description: "Tout ce qu'un barbare se doit de connaitre.",
// };
// RootLayout
async function RootLayout({ children, params, }) {
    const { locale } = await params;
    const session = await (0, auth_1.auth)() || undefined;
    const currentTheme = (await (0, action_1.ccCookies)("theme")) || "dark";
    const currentColor = (await (0, action_1.ccCookies)("color")) || "bleu";
    return (<html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth" className={`${currentTheme} ${currentColor} scroll-pt-23 scroll-smooth`}>
      <react_1.SessionProvider session={session}>
        <FrontContext_1.FrontContextProvider>
          <body className={`bg-gray-800 bg-white antialiased`} suppressHydrationWarning>
            <div className="h-screen w-screen flex-col">
              <react_2.Suspense fallback={"loading data"}>
                <Header_1.default />
              </react_2.Suspense>
              <react_2.Suspense fallback={"loading data"}>
                <Navbar_1.default sessionUser={session ? session : session}/>
              </react_2.Suspense>
              {children}
              <CookieSystem_1.default />
            </div>
          </body>
        </FrontContext_1.FrontContextProvider>
      </react_1.SessionProvider>
    </html>);
}
