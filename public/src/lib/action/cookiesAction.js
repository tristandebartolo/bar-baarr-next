"use strict";
"use server";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCsrfTkn = getCsrfTkn;
exports.ccCookies = ccCookies;
// Lib
const react_1 = require("next-auth/react");
const headers_1 = require("next/headers");
/**
 * getCsrfTkn()
 * @returns
 */
async function getCsrfTkn() {
    const csrfToken = await (0, react_1.getCsrfToken)();
    return csrfToken;
}
/**
 * ccCookies()
 *
 * @param name
 * @param value
 * @param op
 * @returns
 */
async function ccCookies(name, value, op = "get") {
    var _a;
    const cookieStore = await (0, headers_1.cookies)();
    if (op === "set" && value) {
        cookieStore.set(name, value, { httpOnly: true, maxAge: 2592000 });
    }
    else {
        const cookieStore = await (0, headers_1.cookies)();
        return ((_a = cookieStore.get(name)) === null || _a === void 0 ? void 0 : _a.value) || null;
    }
}
