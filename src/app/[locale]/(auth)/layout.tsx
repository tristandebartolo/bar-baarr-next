import type { Metadata } from "next";
// Provider
import SessionWrapper from "@/components/Auth/SessionProvider";
// Tools
import { ccCookies } from "@/lib/action";
// Components
import Navbar from "@/components/Navbar/Navbar";
// Styles
import "../../globals.css";
import Header from "@/components/Header/Header";
// Metas
export const metadata: Metadata = {
  title: "Hello World",
  description: "Welcome",
};
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const currentTheme = (await ccCookies("theme")) || "dark";
  const currentColor = (await ccCookies("color")) || "bleu";
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${currentTheme} ${currentColor} scroll-pt-23 scroll-smooth`}
    >
      <body
        className={`m-0 min-h-screen min-w-screen p-0 antialiased ${currentTheme}`}
        suppressHydrationWarning
      >
        <div className="h-screen w-screen flex-col">
          <SessionWrapper>
            <div className="h-screen w-screen flex-col">
              <Header />
              <Navbar sessionUser={undefined} />
              {children}
            </div>
          </SessionWrapper>
        </div>
      </body>
    </html>
  );
}
