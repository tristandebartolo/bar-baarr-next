import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/fr/club",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl, url } }) {
      
      console.log('currentHost', url)

      const isLoggedIn = !!auth?.user;
      let pathname = "/";

      try {
        // Cas normal : request.url est une URL valide
        pathname = new URL(url).pathname;
      } catch {
        // Cas Vercel preview pourri : request.url = "//xxxx.vercel.app:3000/fr/club"
        // ou nextUrl.pathname contient le double slash + port
        const raw = nextUrl.pathname || url || "";
        pathname = raw
          .replace(/^\/\/[^\/]+(:\d+)?/, "") // supprime //domaine:3000
          .split("?")[0]
          .split("#")[0] || "/";
      }


      const isOnDashboard = pathname.startsWith("/fr/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL("/fr/club", nextUrl));
      }

      const isOnLoginPage = pathname.startsWith("/fr/club");
      if (isLoggedIn && isOnLoginPage) {
        return Response.redirect(new URL("/fr", nextUrl));
      }

      return true;
    }
  },
  providers: [],
} satisfies NextAuthConfig;
