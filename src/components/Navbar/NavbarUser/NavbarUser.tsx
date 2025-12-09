"use client";
// React
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useParams } from "next/navigation";
// Lib
import Link from "next/link";
// Types
import { SessionUser } from "@/lib/types/typesUtils";
// Style
// import style from "./NavbarUser.module.css";

// Composent
export function NavbarUser({ sessionUser }: { sessionUser?: SessionUser}) {
  // const { data: session, status } = useSession();
  const params = useParams();

  const [user, setUser] = useState({
    name: sessionUser && sessionUser?.user ? sessionUser.user.name : "",
  });

  useEffect(() => {
    if (sessionUser && sessionUser?.user) {
      if (
        sessionUser.hasOwnProperty("user") &&
        sessionUser.user.hasOwnProperty("email")
      ) {
        // console.log("session session", sessionUser, user);
        setUser({
          name: sessionUser.user.name,
        });
      }
    }

  }, [sessionUser]);

  return (
    <nav className="menu-block">
      <ul className="navbar menu-ulh dark:text-cyan-50">
        {sessionUser && (
          <>
            <li>
              <Link href={`/`}>
                <span className="cxdx cxdx-user"></span>

                {user && <div>{user.name}</div>}
              </Link>
            </li>
            <li>
              <button onClick={() => signOut({ redirectTo: "/fr" })} type="button">
                <span className="i-gntl--power_settings_new"></span>
                <span className="visually-hidden">Déconnexion</span>
              </button>
            </li>
          </>
        )}
        {!sessionUser && (
          <>
            <li>
              <Link href={`/${params.locale}/club`}>
                <span className="i-gntl--person"></span>
                Se connecter
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
export default NavbarUser;
