// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Étend le type User intégré
   */
  interface User {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    roles?: string[] | null;
  }

  /**
   * Étend la session pour que session.user ait tes propriétés
   */
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
      firstName: string | null;
      lastName: string| null;
      roles: string[] | null;
    };
  }
}

declare module "next-auth/jwt" {
  /**
   * Étend le token JWT
   */
  interface JWT {
    firstName?: string | null;
    lastName?: string | null;
    roles?: string[] | null;
  }
}