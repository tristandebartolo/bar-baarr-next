import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/fr/club",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      const isOnDashboard = pathname?.startsWith("/fr/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL("/fr/club", nextUrl));
      }

      const isOnLoginPage = pathname?.startsWith("/fr/club");
      if (isLoggedIn && isOnLoginPage) {
        return Response.redirect(new URL("/fr", nextUrl));
      }

      return true;
    }
  },
  providers: [],
} satisfies NextAuthConfig;
