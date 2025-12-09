"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
// Provider
const SessionProvider_1 = __importDefault(require("@/components/Auth/SessionProvider"));
// Tools
const action_1 = require("@/lib/action");
// Components
const Navbar_1 = __importDefault(require("@/components/Navbar/Navbar"));
// Styles
require("../../globals.css");
const Header_1 = __importDefault(require("@/components/Header/Header"));
// Metas
exports.metadata = {
    title: "Hello World",
    description: "Welcome",
};
async function RootLayout({ children, params, }) {
    const { locale } = await params;
    const currentTheme = (await (0, action_1.ccCookies)("theme")) || "dark";
    const currentColor = (await (0, action_1.ccCookies)("color")) || "bleu";
    return (<html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth" className={`${currentTheme} ${currentColor} scroll-pt-23 scroll-smooth`}>
      <body className={`m-0 min-h-screen min-w-screen p-0 antialiased ${currentTheme}`} suppressHydrationWarning>
        <div className="h-screen w-screen flex-col">
          <SessionProvider_1.default>
            <div className="h-screen w-screen flex-col">
              <Header_1.default />
              <Navbar_1.default sessionUser={undefined}/>
              {children}
            </div>
          </SessionProvider_1.default>
        </div>
      </body>
    </html>);
}
