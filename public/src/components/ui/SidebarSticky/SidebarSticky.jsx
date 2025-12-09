"use strict";
// src/components/ui/SidebarSticky/SidebarSticky.tsx
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StickySidebar;
const react_1 = require("react");
const uikit_1 = __importDefault(require("uikit"));
function StickySidebar({ children, options, }) {
    (0, react_1.useEffect)(() => {
        const sticky = uikit_1.default.sticky("#js-sidebar", {
            offset: (options === null || options === void 0 ? void 0 : options.offset) || 90,
            media: (options === null || options === void 0 ? void 0 : options.media) || 960,
            end: options === null || options === void 0 ? void 0 : options.end,
        });
        return () => {
            var _a;
            (_a = sticky === null || sticky === void 0 ? void 0 : sticky.$destroy) === null || _a === void 0 ? void 0 : _a.call(sticky);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // ← on garde [] car les options ne changent jamais après le mount
    return (<div id="js-sidebar" className="uk-sticky">
      {children}
    </div>);
}
