"use client";
// Lib
import Link from "next/link";
// Component
export function NavbarLocal() {
  return (
    <nav className="menu-block">
      <ul className="navbar dark:text-cyan-50 menu-ulh">
        <Link href={`/fr`}>Fr</Link>
        <Link href={`/en`}>En</Link>
      </ul>
    </nav>
  );
}
export default NavbarLocal;
