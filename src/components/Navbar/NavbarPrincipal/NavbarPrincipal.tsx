'use client'
// Lib
import Link from "next/link";
import { useParams } from 'next/navigation';
// Composent
function NavbarPrincipal() {

  const params = useParams()

  const classLink = `bg-one/10 hover:bg-one/20 hover:border-b-3 border-one h-13 flex items-center justify-center px-3 cursor-pointer text-sm transition-all`
  const classBtn = `bg-one/80 hover:bg-one hover:border-b-3 border-one h-13 flex items-center justify-center px-3 cursor-pointer transition-all`

  return (
    <nav className="menu-block">
      <ul className="flex dark:text-cyan-50 menu-ulh gap-[1px]">
        <li>
          <button type="button" className={classBtn}>
            <span className="icon-gm-menu"></span>
          </button>
        </li>
        <li>
          <button type="button" className={classBtn}>
            <span className="icon-gm-search"></span>
          </button>
        </li>
        <li>
          <Link href={`/${params.locale}`} className={classLink}>À la une</Link>
        </li>
        <li>
          <Link href={`/${params.locale}/rubriques`} className={classLink}>Rubriques</Link>
        </li>
        <li>
          <Link href={`/${params.locale}/club`} className={classLink}>Club</Link>
        </li>
      </ul>
    </nav>
  );
}
export default NavbarPrincipal;
