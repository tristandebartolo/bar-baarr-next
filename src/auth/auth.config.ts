import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/fr/club",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl, url } }) {
      
      console.log('currentHost', nextUrl)

      const isLoggedIn = !!auth?.user;
      // const nUrl = nextUrl.pathname || null;

      let pathname = "/";

      // const nUrl = "//next.trstn.fr:3000/fr/club";

      // nUrl.startsWith("/fr/dashboard");


      // const tst_pathname = nUrl
      //     .replace(/^\/\/[^\/]+(?::\d+)?/, "") // supprime //domaine:3000
      //     .split("?")[0]
      //     .split("#")[0] || "/";

      // console.log('new URL(url).pathname -------- ', tst_pathname)

      try {
        // Cas normal : request.url est une URL valide
        pathname = new URL(url).pathname;
        console.log('TRY', pathname)
      } catch {
        // Cas Vercel preview pourri : request.url = "//xxxx.vercel.app:3000/fr/club"
        // ou nextUrl.pathname contient le double slash + port
        const raw = nextUrl.pathname || url || "";
        pathname = raw
          .replace(/^\/\/[^\/]+(?::\d+)?/, "") // supprime //domaine:3000
          .split("?")[0]
          .split("#")[0] || "/";
        console.log('CATCH', pathname)
      }

      // console.log('currentHost pathname', pathname)
      // console.log('currentHost nextUrl.pathname', nextUrl.pathname)


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
