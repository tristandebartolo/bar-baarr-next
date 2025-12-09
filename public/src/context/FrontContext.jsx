"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontContextProvider = FrontContextProvider;
exports.useFrontContext = useFrontContext;
// Import Lib
const react_1 = require("react");
const socket_io_client_1 = require("socket.io-client");
const react_2 = require("next-auth/react");
// Connexion Websocket
const socket = (0, socket_io_client_1.io)("http://localhost:3000");
// Context
const FrontContext = (0, react_1.createContext)({
    currentSocketRoom: null,
    userLogged: null,
});
// Component
function FrontContextProvider({ children }) {
    // let raw = {};
    const { data: session, status } = (0, react_2.useSession)();
    const [currentSocketRoom,] = (0, react_1.useState)(socket);
    (0, react_1.useEffect)(() => {
        const data = {
            roomId: "iuhg6rd-iyeaoz-8752jgk-lpozs53",
        };
        currentSocketRoom === null || currentSocketRoom === void 0 ? void 0 : currentSocketRoom.emit("player.game.join", data, (response) => {
            console.log(response);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // const extractText = (sckt: Socket) => {
    //   setCurrentSocketRoom(sckt)
    // };
    return (<FrontContext.Provider value={{
            currentSocketRoom,
            userLogged: {
                user: (session === null || session === void 0 ? void 0 : session.user) || null,
                status,
            }
        }}>
      {children}
    </FrontContext.Provider>);
}
function useFrontContext() {
    return (0, react_1.useContext)(FrontContext);
}
