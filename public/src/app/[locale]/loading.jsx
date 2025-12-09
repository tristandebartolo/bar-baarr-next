"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = loading;
const action_1 = require("@/lib/action");
// Component
async function loading() {
    const currentTheme = (await (0, action_1.ccCookies)("theme")) || "dark";
    const currentColor = (await (0, action_1.ccCookies)("color")) || "bleu";
    return (<div className={`${currentTheme} ${currentColor} scroll-pt-23 scroll-smooth`}>
      <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center dark:bg-background">
        <span className="border-t-one mb-44 block h-14 w-14 animate-spin rounded-full border-4 border-gray-300"></span>
      </div>
    </div>);
}
