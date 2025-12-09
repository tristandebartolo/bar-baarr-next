import { DefaultSession } from "next-auth";
// import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string | number | null;
      firstName?: string | null;
      lastName?: string | null;
      name: string | null;
    } & DefaultSession["user"];
  }
}
