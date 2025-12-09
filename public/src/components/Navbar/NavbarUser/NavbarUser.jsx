"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarUser = NavbarUser;
// React
const react_1 = require("react");
const react_2 = require("next-auth/react");
const navigation_1 = require("next/navigation");
// Lib
const link_1 = __importDefault(require("next/link"));
// Style
// import style from "./NavbarUser.module.css";
// Composent
function NavbarUser({ sessionUser }) {
    // const { data: session, status } = useSession();
    const params = (0, navigation_1.useParams)();
    const [user, setUser] = (0, react_1.useState)({
        name: sessionUser && (sessionUser === null || sessionUser === void 0 ? void 0 : sessionUser.user) ? sessionUser.user.name : "",
    });
    (0, react_1.useEffect)(() => {
        if (sessionUser && (sessionUser === null || sessionUser === void 0 ? void 0 : sessionUser.user)) {
            if (sessionUser.hasOwnProperty("user") &&
                sessionUser.user.hasOwnProperty("email")) {
                // console.log("session session", sessionUser, user);
                setUser({
                    name: sessionUser.user.name,
                });
            }
        }
    }, [sessionUser]);
    return (<nav className="menu-block">
      <ul className="navbar menu-ulh dark:text-cyan-50">
        {sessionUser && (<>
            <li>
              <link_1.default href={`/`}>
                <span className="cxdx cxdx-user"></span>

                {user && <div>{user.name}</div>}
              </link_1.default>
            </li>
            <li>
              <button onClick={() => (0, react_2.signOut)()} type="button">
                <span className="i-gntl--power_settings_new"></span>
                <span className="visually-hidden">Déconnexion</span>
              </button>
            </li>
          </>)}
        {!sessionUser && (<>
            <li>
              <link_1.default href={`/${params.locale}/club`}>
                <span className="i-gntl--person"></span>
                Se connecter
              </link_1.default>
            </li>
          </>)}
      </ul>
    </nav>);
}
exports.default = NavbarUser;
