// Actions
import { getMenu } from "@/lib/action";
// types
import { MenuLinksDisplayType } from "@/lib/types";
// Custom Componants
import MenuDrupal from "@/components/Navbar/MenuDrupal/MenuDrupal";
//Composant
async function FooterSite() {
  const menuFooter = await getMenu("top");

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

  return <MenuDrupal menu={menuFooter} display={menuDisplay} />;
}
export default FooterSite;
