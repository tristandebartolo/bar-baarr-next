"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.signOut = exports.signIn = exports.handlers = void 0;
const session_1 = require("@/auth/session");
const next_auth_1 = __importDefault(require("next-auth"));
const credentials_1 = __importDefault(require("next-auth/providers/credentials"));
const auth_config_1 = require("@/auth/auth.config");
const helpers_1 = require("@/lib/helpers");
// import EmailProvider from "next-auth/providers/email";
const session = {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
};
_a = (0, next_auth_1.default)(() => ({
    ...auth_config_1.authConfig,
    providers: [
        (0, credentials_1.default)({
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
                const data = await fetch(`${helpers_1.apiLink}/user/login?_format=json`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name: credentials.username, pass: credentials.password })
                });
                const json = await data.json();
                if (data.ok && json.hasOwnProperty("current_user")) {
                    const hash = btoa(credentials.username + ":" + credentials.password);
                    const sd = {
                        hash: hash,
                        uid: json.current_user.uid,
                        csrf_token: json.csrf_token,
                        logout_token: json.logout_token
                    };
                    const expiresAt = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
                    const basicHash = await (0, session_1.encrypt)({ sd, expiresAt });
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
        }),
    ],
    session: session,
    callbacks: {
        async jwt({ token, user }) {
            if (!token.sub) {
                return token;
            }
            if (user) {
                token.id = user.id;
                token.name = user === null || user === void 0 ? void 0 : user.name;
            }
            return token;
        },
        async session({ session, token }) {
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
})), exports.handlers = _a.handlers, exports.signIn = _a.signIn, exports.signOut = _a.signOut, exports.auth = _a.auth;
