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
    // "/((?!api|_next/static|_next/image|manifest.json|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};