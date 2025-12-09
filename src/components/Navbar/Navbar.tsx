// Actions
import { getMenu } from "@/lib/action";
// Components
import NavbarClient from "./NavbarClient";
// Types
import { MenuLinksDisplayType, SessionUser } from "@/lib/types";
// Composant
export default async function Navbar({ sessionUser }: { sessionUser?: SessionUser }) {
  // Chargement du menu secondaire (SSR)
  const menuSecondary = await getMenu("secondary");
  // Configuration d’affichage du menu
  const menuDisplay: MenuLinksDisplayType[] = [
    {
      ul: "flex gap-2 dark:text-cyan-50 w-max",
      li: "w-max relative",
    },
    {
      ul: "flex flex-col w-full",
      li: "w-max relative",
    },
  ];

  return (
    <>
      {/* Composant client qui gère le scroll up/down */}
      <NavbarClient
        menuSecondary={menuSecondary}
        menuDisplay={menuDisplay}
        sessionUser={sessionUser}
      />
    </>
  );
}