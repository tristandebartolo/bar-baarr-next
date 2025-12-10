// middleware.ts – version anti-mismatch Server Actions (local + prod)
import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "@/auth/auth.config";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Redirection racine → /fr (inchangée, safe)
  if (pathname === "/" || pathname === "") {
    const url = req.nextUrl.clone();
    url.pathname = "/fr";
    return NextResponse.redirect(url);
  }

  // 2. Locale (inchangée, safe)
  const locale = pathname.split("/")[1] && pathname.split("/")[1] !== "api" ? pathname.split("/")[1] : "fr";
  process.env.LANG = locale;
  process.env.LC_ALL = locale;
  process.env.LANGUAGE = locale;

  // 3. Headers SEULEMENT pour les routes NextAuth en prod (pas pour Server Actions)
  const response = NextResponse.next();
  response.headers.set("x-locale", locale);

  const isProd = process.env.NODE_ENV === "production";
  const isAuthRoute = pathname.startsWith("/api/auth");

  if (isProd && isAuthRoute) {
    // Force les headers UNIQUEMENT pour NextAuth en prod (évite le :3000)
    const publicHost = "next.trstn.fr"; // Ton domaine exact
    response.headers.set("x-forwarded-host", publicHost);
    response.headers.set("x-forwarded-proto", "https");
  }

  return response;
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml)$).*)",
  ],
};