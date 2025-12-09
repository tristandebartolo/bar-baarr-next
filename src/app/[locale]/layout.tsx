// Lib
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
// import type { Metadata } from "next";
// Auth
import { auth } from "@/auth/auth";
// Style
import "../globals.css";
// Actions
import { ccCookies } from "@/lib/action";
// Context
import { FrontContextProvider } from "@/context/FrontContext";
// Composents
import Navbar from "@/components/Navbar/Navbar";
import Header from "@/components/Header/Header";
import CookieSystem from "@/components/ui/CookieBanner/CookieSystem";
import { SessionUser } from "@/lib/types/typesUtils";

// Metadata
// export const metadata: Metadata = {
//   title: "Bonjour | Le journal du Bar.Bâ.a.r.r",
//   description: "Tout ce qu'un barbare se doit de connaitre.",
// };
// RootLayout
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const session = await auth() || undefined;
  const currentTheme = (await ccCookies("theme")) || "dark";
  const currentColor = (await ccCookies("color")) || "bleu";

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${currentTheme} ${currentColor} scroll-pt-23 scroll-smooth`}
    >
      <SessionProvider session={session}>
        <FrontContextProvider>
          <body
            className={`bg-gray-800 bg-white antialiased`}
            suppressHydrationWarning
          >
            <div className="h-screen w-screen flex-col">
              <Suspense fallback={"loading data"}>
                <Header />
              </Suspense>
              <Suspense fallback={"loading data"}>
                <Navbar sessionUser={session ? session  as SessionUser : session} />
              </Suspense>
              {children}
              <CookieSystem />
            </div>
          </body>
        </FrontContextProvider>
      </SessionProvider>
    </html>
  );
}
