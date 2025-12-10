// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "@/auth/auth.config";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {

  const url = req.nextUrl.clone(); // clone pour pouvoir modifier
  const pathname = url.pathname;
    // 1. Redirection de la racine vide vers /fr
  if (pathname === "/" || pathname === "") {
    return NextResponse.redirect(new URL(`/fr`, req.url));
  }

  // 2. Extraction de la locale depuis l’URL (ex: /fr/journal/xxx → "fr"
  const locale = pathname.split("/")[1];

  // 3. Force la locale côté serveur Node.js
  process.env.LANG = locale;
  process.env.LC_ALL = locale;
  process.env.LANGUAGE = locale;

  // Option bonus : passe aussi la locale dans les headers (certaines libs l’utilisent)
  const response = NextResponse.next();
  response.headers.set("x-locale", locale);

  return response;
});

// Routes sur lesquelles le middleware s’applique
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - API routes
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap, robots.txt, images
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml)$).*)",
    // '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

// // middleware.ts
// import { NextRequest, NextResponse } from "next/server";
// import NextAuth from "next-auth";
// import { authConfig } from "@/auth/auth.config";

// const { auth } = NextAuth(authConfig);

// export default auth(async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // 1. Fix absolu du problème de port 3000 en production
//   // On force les headers que NextAuth utilise en interne
//   const requestHeaders = new Headers(req.headers);
//   const dev = process.env.NEXT_PUBLIC_DRUPAL_ENV !== "production";
//   const hostname = dev ? process.env.NEXT_PUBLIC_DRUPAL_HOSTNAME_LOCAL : process.env.NEXT_PUBLIC_DRUPAL_HOSTNAME_FRONT;
//   // Très important : on réécrit les headers pour que NextAuth comprenne qu’il est derrière un proxy
//   const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? hostname;
//   const proto = req.headers.get("x-forwarded-proto") ?? "https";

//   requestHeaders.set("x-forwarded-host", host!);
//   requestHeaders.set("x-forwarded-proto", proto);
//   requestHeaders.set("x-forwarded-port", proto === "https" ? "443" : "80");

//   // 2. Redirection racine → /fr
//   if (pathname === "/" || pathname === "") {
//     const url = req.nextUrl.clone();
//     url.pathname = "/fr";
//     return NextResponse.redirect(url);
//   }

//   // 3. Gestion locale (on garde ton code existant)
//   const locale = pathname.split("/")[1] || "fr";
//   process.env.LANG = locale;
//   process.env.LC_ALL = locale;
//   process.env.LANGUAGE = locale;

//   const response = NextResponse.next({
//     request: {
//       headers: requestHeaders,
//     },
//   });

//   response.headers.set("x-locale", locale);
//   return response;
// });

// // LE PLUS IMPORTANT : on applique le middleware sur TOUTES les routes y compris /api/auth
// export const config = {
//   matcher: [
//     /*
//      * On applique le middleware sur absolument tout,
//      * sauf les fichiers statiques (_next/static, images, etc.) exclus manuellement
//      */
//     "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml)$).*)",
//   ],
// };