import {Session} from "next-auth";
import {JWT} from 'next-auth/jwt'

export type SdUserType = {
	hash?: string;
	uid?: string | number;
	csrf_token?: string;
	logout_token?: string;
};


export type CallbackSessionType = {
	session: Session;
	token: JWT;
}

export type SessionType = {
[key: string]: string | number;
};


export type UserLoginType = {
    username: string;
    password: string;
}

export type AuthActionState = string | undefined;

export type SessionUserInfo = {
  email: string;
  id?: string;
  image?: string;
  name?: string;
}

export type SessionUser = {
  expires: string;
  user?: SessionUserInfo;
}