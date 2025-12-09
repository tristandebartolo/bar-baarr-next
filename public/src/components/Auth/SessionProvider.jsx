"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("next-auth/react");
const SessionWrapper = ({ children }) => {
    return <react_1.SessionProvider>{children}</react_1.SessionProvider>;
};
exports.default = SessionWrapper;
