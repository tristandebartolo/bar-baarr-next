"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const server_1 = require("next/server");
const next_auth_1 = __importDefault(require("next-auth"));
const auth_config_1 = require("@/auth/auth.config");
const { auth } = (0, next_auth_1.default)(auth_config_1.authConfig);
exports.default = auth(async function middleware(req) {
    const url = req.nextUrl.clone(); // clone pour pouvoir modifier
    const pathname = url.pathname;
    console.log('req', pathname);
    // 1. Redirection racine → /fr
    if (pathname === "/" || pathname === "") {
        url.pathname = "/fr";
        return server_1.NextResponse.redirect(url);
    }
    // 2. Extraction de la locale depuis l’URL (ex: /fr/journal/xxx → "fr"
    const locale = pathname.split("/")[1] || "fr";
    // 3. Force la locale côté serveur Node.js (C’EST ÇA QUI RÉSOUT LE BUG DE DATE)
    // → Intl.DateTimeFormat() utilisera maintenant la bonne langue
    process.env.LANG = locale;
    process.env.LC_ALL = locale;
    process.env.LANGUAGE = locale;
    // Option bonus : passe aussi la locale dans les headers (certaines libs l’utilisent)
    const response = server_1.NextResponse.next();
    response.headers.set("x-locale", locale);
    return response;
});
// Routes sur lesquelles le middleware s’applique
exports.config = {
    matcher: [
        /*
         * Match all request paths except:
         * - API routes
         * - _next/static (static files)
         * - _next/image (image optimization)
         * - favicon.ico, sitemap, robots.txt, images
         */
        "/((?!api|_next/static|_next/image|manifest.json|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
    ],
};
