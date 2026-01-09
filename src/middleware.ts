// src/middleware.ts
//
// NOTE: Ce fichier reste en middleware.ts (et non proxy.ts) car NextAuth 5 beta
// n'a pas encore documenté la compatibilité avec proxy.ts de Next.js 15+.
// Migration prévue dès que NextAuth 5 stable sort avec documentation officielle.
// Voir: https://github.com/nextauthjs/next-auth/releases
// Voir: https://authjs.dev/getting-started/migrating-to-v5
//
import {NextRequest, NextResponse} from "next/server";
import NextAuth from "next-auth";
import {authConfig} from "@/auth/auth.config";

const {auth} = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {

	const {pathname} = req.nextUrl;
	const supportedLocales = ["fr", "en", "it"] as const;
	const defaultLocale = "fr";

	// 1. Early return pour TOUTES les routes internes de Next-Auth
	// Cela laisse Next-Auth les gérer nativement sans toucher au locale
	if (pathname.startsWith("/.well-known") || pathname.startsWith("/api/auth")) {
		return NextResponse.next();
	}

	const url = req.nextUrl.clone();

	// 1. Redirection racine → /fr
	if (pathname === "/" || pathname === "") {
		url.pathname = "/fr";
		return NextResponse.redirect(url);
	}

	const pathnameHasLocale = supportedLocales.some((loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`);

	// 2. Redirection racine → /fr + /alias
	if (! pathnameHasLocale) {
		url.pathname = "/fr" + pathname;
		return NextResponse.redirect(url);
	}

	// 3. Extraction sécurisée du locale avec liste blanche
	const segments = pathname.split("/").filter(Boolean);
	const potentialLocale = segments[0];

	const locale = potentialLocale !== undefined && supportedLocales.includes(potentialLocale as typeof supportedLocales[number]) ? potentialLocale : defaultLocale;

	// Set env vars
	process.env.LANG = locale;
	process.env.LC_ALL = locale;
	process.env.LANGUAGE = locale;

	// 4. Headers personnalisés
	const response = NextResponse.next();
	response.headers.set("x-locale", locale);

	response.headers.delete("x-powered-by");
	response.headers.delete("x-nextjs-cache");
	response.headers.delete("x-middleware-prefetch");

	return response;
});

export const config = {
	matcher: [
		// Exclut explicitement tout ce qui peut poser problème
		// Applique seulement aux pages réelles (pas assets, pas .well-known, pas api/auth)
		"/((?!_next/static|_next/image|api|_next|favicon.ico|sitemap.xml|robots.txt|manifest.json|.well-known|.*\\..*).*)",
	]
};
