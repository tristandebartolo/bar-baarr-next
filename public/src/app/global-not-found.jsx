"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = GlobalNotFound;
// Import global styles and fonts
require("./globals.css");
const link_1 = __importDefault(require("next/link"));
// Metas
exports.metadata = {
    title: "404 - Page introuvable",
    description: "La page que vous recherchez n'existe pas.",
};
// Composent
function GlobalNotFound() {
    return (<html lang="fr" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`antialiased`} suppressHydrationWarning>
        <div className="container mx-auto flex min-h-100 items-center justify-center text-center font-sans md:min-h-200 dark:text-cyan-50">
          <div>
            <h2 className="text-9xl font-bold tracking-widest">404</h2>
            <p>Oups, il n&apos;y a rien a voir ici</p>
            <link_1.default href="/">Retour a la page d&apos;accueil</link_1.default>
          </div>
        </div>
      </body>
    </html>);
}
