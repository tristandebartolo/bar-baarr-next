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
import { ToastProvider } from "@/lib/helpers/toastContext";
import { notFound } from "next/navigation";
// Styles
import "../page.scss";
const supportedLocales = ['fr', 'en'];
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
  const { locale = "fr" } = await params;
  const session = (await auth()) || undefined;
  const currentTheme = (await ccCookies("theme")) || "dark";
  const currentColor = (await ccCookies("color")) || "bleu";

  // Validation stricte : si locale invalide → 404 (safe, pas de crash)
  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  // Maintenant safe de charger les traductions
  const translations = (await import(`@/translations/${locale}.json`)).default;
  console.log("messages", translations);

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
            className={`bg-white antialiased dark:bg-gray-800`}
            suppressHydrationWarning
          >
            <ToastProvider>
              <div className="m-h-screen w-screen flex-col">
                <Suspense fallback={"loading data"}>
                  <Header />
                </Suspense>
                <Suspense fallback={"loading data"}>
                  <Navbar
                    sessionUser={session ? (session as SessionUser) : session}
                  />
                </Suspense>
                {children}
                <CookieSystem />
              </div>
            </ToastProvider>
          </body>
        </FrontContextProvider>
      </SessionProvider>
    </html>
  );
}
