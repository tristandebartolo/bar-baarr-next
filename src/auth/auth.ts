import {encrypt} from "@/auth/session";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {authConfig} from "@/auth/auth.config";
import {apiLink} from "@/lib/helpers";
import { SdUserType, SessionType, CallbackSessionType } from "@/lib/types";
// import EmailProvider from "next-auth/providers/email";

const session: SessionType = {
	strategy: "jwt",
	maxAge: 30 * 24 * 60 * 60, // 30 days
	updateAge: 24 * 60 * 60, // 24 hours
};

export const {handlers, signIn, signOut, auth} = NextAuth(() => ({
	...authConfig,
	providers: [
		Credentials(
			{
				id: "credentialsLogin",
				credentials: {
					username: {
						label: "Nom utilisateur",
						type: "text",
						className: "lg-user-name"
					},
					password: {
						label: "Mot de passe",
						type: "password",
						className: "lg-user-pass"
					}
				},
				authorize: async (credentials) => {

					const data = await fetch(`${apiLink}/user/login?_format=json`, {
						method: "POST",
						credentials: "include",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(
							{name: credentials.username, pass: credentials.password}
						)
					});

					const json = await data.json();

					if (data.ok && json.hasOwnProperty("current_user")) {

						const hash = btoa(credentials.username + ":" + credentials.password);

						const sd : SdUserType = {
							hash: hash,
							uid: json.current_user.uid,
							csrf_token: json.csrf_token,
							logout_token: json.logout_token
						}

						const expiresAt = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
						const basicHash = await encrypt({sd, expiresAt});

						const user = {
							id: json.current_user.uid,
							email: basicHash,
							name: json.current_user.name,
							image: null
						};

						return user;
					}

					return null;
				}
			}
		),
	],
	session: session,
	callbacks: {
		async jwt(
			{token, user}
		) {

			if (!token.sub) {
				return token;
			}


			if (user) {
				token.id = user.id;
				token.name = user ?. name;
			}
			return token;
		},
		async session(
			{session, token} : CallbackSessionType
		) {
			if (token && token.name && token.email) {
				const UserLoged = {
					name: token.name,
					email: token.email,
					id: '',
					image: ''
				};
				session.user = UserLoged;
			}
			return session;
		}
	}


}));
