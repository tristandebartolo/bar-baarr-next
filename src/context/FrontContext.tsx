"use client";
// Import Lib
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

const dev = process.env.NEXT_PUBLIC_DRUPAL_ENV !== "production";
const hostname = dev ? 'http://' + process.env.NEXT_PUBLIC_DRUPAL_HOSTNAME_LOCAL : process.env.NEXT_PUBLIC_DRUPAL_HOSTNAME_FRONT;
const port = dev ? 3000 : 80;
// Connexion Websocket
// const socket: Socket = io("http://localhost:3000");
const socket: Socket = io(`${hostname}:${port}`);
// Type
type UserLoggedTypes = {
  user: Session["user"] | null;
  status: string | null;
};
// Type
type FrontContextTypes = {
  currentSocketRoom: Socket | null;
  userLogged?: UserLoggedTypes | null;
};
// Type
type PropsTypes = {
  children: ReactNode;
};

type PropsReasponseTypes = {
  status: string;
};
// Context
const FrontContext = createContext<FrontContextTypes>({
  currentSocketRoom: null,
  userLogged: null,
});
// Component
export function FrontContextProvider({ children }: PropsTypes) {
  // let raw = {};

  const { data: session, status } = useSession();
  const [currentSocketRoom, ] = useState<Socket | null>(
    socket,
  )

  useEffect(() => {

    const data = {
      roomId: "iuhg6rd-iyeaoz-8752jgk-lpozs53",
    };

    currentSocketRoom?.emit("player.game.join", data, (response: PropsReasponseTypes) => {
      console.log(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const extractText = (sckt: Socket) => {
  //   setCurrentSocketRoom(sckt)
  // };

  return (
    <FrontContext.Provider
      value={{
        currentSocketRoom,
        userLogged: {
          user: session?.user || null,
          status,
        }
      }}
    >
      {children}
    </FrontContext.Provider>
  )
}

export function useFrontContext() {
  return useContext(FrontContext);
}
