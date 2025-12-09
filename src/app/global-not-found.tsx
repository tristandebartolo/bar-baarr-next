// Import global styles and fonts
import "./globals.css";
import type { Metadata } from "next";
import Link from 'next/link'
// Metas
export const metadata: Metadata = {
  title: "404 - Page introuvable",
  description: "La page que vous recherchez n'existe pas.",
};
// Composent
export default function GlobalNotFound() {
  return (
    <html lang="fr" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`antialiased`} suppressHydrationWarning>
        <div className="container mx-auto flex min-h-100 items-center justify-center text-center font-sans md:min-h-200 dark:text-cyan-50">
          <div>
            <h2 className="text-9xl font-bold tracking-widest">404</h2>
            <p>Oups, il n&apos;y a rien a voir ici</p>
            <Link href="/">Retour a la page d&apos;accueil</Link>
          </div>
        </div>
      </body>
    </html>
  );
}
