import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/fr/club",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // console.log('isLoggedIn', isLoggedIn)
      const isOnDashboard = nextUrl.pathname.startsWith("/fr/dashboard");

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        // console.log('isOnDashboard', isOnDashboard);
        return Response.redirect(new URL("/fr/club", nextUrl));
        // return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // return Response.redirect(new URL("/dashboard", nextUrl));
      }

      const isOnLoginPage = nextUrl.pathname.startsWith("/fr/club");

      if (isOnLoginPage) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/fr", nextUrl));
        }
      }

      return true;
    }
  },
  providers: [],
} satisfies NextAuthConfig;
