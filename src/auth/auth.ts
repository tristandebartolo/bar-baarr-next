// Libs
import NextAuth from "next-auth";
// Auth
import {encrypt} from "@/auth/session";
import Credentials from "next-auth/providers/credentials";
import {authConfig} from "@/auth/auth.config";
// Helpers
import {apiLink} from "@/lib/helpers";
// Types
import {SdUserType, SessionType, CallbackSessionType} from "@/lib/types";
// SessionType Type
const session: SessionType = {
	strategy: "jwt",
	maxAge: 30 * 24 * 60 * 60, // 30 days
	updateAge: 24 * 60 * 60, // 24 hours
};
// Handlers
export const {handlers, signIn, signOut, auth} = NextAuth(() => ({
	useSecureCookies: true,
	secret: process.env.AUTH_SECRET,
	...authConfig,
	providers: [
		Credentials(
			{
				id: "credentials",
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

					const data = await fetch(`${apiLink}/user/login?_format=json_all`, {
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

						// Récupération du cookie de session
						const setCookieHeader = data.headers.get('set-cookie');
						let sessionCookie = '';
						if (setCookieHeader) {
							const cookies = setCookieHeader.split(',');
							const ssess = cookies.find(c => c.trim().startsWith('SSESS'));
							if (ssess) {
								// ex: SSESSxxx=abc123
								sessionCookie = ssess.split(';')[0].trim();
							}
						}

						const sd: SdUserType = {
							session_cookie: sessionCookie,
							csrf_token: json.csrf_token,
							logout_token: json.logout_token
						}

						const expiresAt = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
						const basicHash = await encrypt({sd, expiresAt});

						const user = {
							id: json.current_user.uid,
							email: basicHash,
							name: json.current_user.name,
							image: null,
							firstName: json?.forname,
							lastName: json?.name,
							roles: json?.roles
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
				token.firstName = user?.firstName ?? null;
				token.name = user?.name;
				token.lastName = user?.lastName;
				token.roles = user?.roles;
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
					id: token.id as string,
					image: '+++',
					firstName: token?.firstName || '',
					lastName: token?.lastName || '',
					roles: token?.roles || null
				};
				session.user = UserLoged;
			}
			return session;
		}
	}
}));
