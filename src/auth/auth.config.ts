import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/club",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // console.log('isLoggedIn', isLoggedIn)
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        // console.log('isOnDashboard', isOnDashboard);
        return Response.redirect(new URL("/club", nextUrl));
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // return Response.redirect(new URL("/dashboard", nextUrl));
      }

      const isOnLoginPage = nextUrl.pathname.startsWith("/club");

      if (isOnLoginPage) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/", nextUrl));
        }
      }

      return true;
    }
  },
  providers: [],
} satisfies NextAuthConfig;
