"use client";
// Params
// import { useParams } from "next/navigation";
import { denormalize } from "@drupal/decoupled-menu-parser";
// Lib
import MenuWrapper from "@/components/Navbar/MenuDrupal/MenuLinks/MenuWrapper";
import { LinksetInterface } from "@drupal/linkset/dist/spec/linkset-json";
import { MenuLinksDisplayType } from "@/lib/types";
// Type props
type MenuDrupalProps = {
  menu: LinksetInterface;
  display: MenuLinksDisplayType[];
};
// Component
export function MenuDrupal({ menu, display }: MenuDrupalProps) {
  // const params = useParams();

  // secondary | footer | social | 
  if (!menu.linkset) {
    return (
      <nav className="menu-block">
        <ul className="navbar menu-ulh dark:text-cyan-50"></ul>
      </nav>
    );
  }

  const menuDenormalize = denormalize(menu);

  // const { item } = menu.linkset[0];
  // const { locale, alias = '' } = params;
  // const aliasPage = `/${locale}${alias}`;

  return ( 
    <MenuWrapper items={menuDenormalize} display={display} />
  );
}
export default MenuDrupal;
