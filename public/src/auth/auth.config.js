"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = void 0;
exports.authConfig = {
    pages: {
        signIn: "/club",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!(auth === null || auth === void 0 ? void 0 : auth.user);
            // console.log('isLoggedIn', isLoggedIn)
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
            if (isOnDashboard) {
                if (isLoggedIn)
                    return true;
                // console.log('isOnDashboard', isOnDashboard);
                return Response.redirect(new URL("/club", nextUrl));
                return false; // Redirect unauthenticated users to login page
            }
            else if (isLoggedIn) {
                // return Response.redirect(new URL("/dashboard", nextUrl));
            }
            const isOnLoginPage = nextUrl.pathname.startsWith("/club");
            if (isOnLoginPage) {
                if (isLoggedIn) {
                    return Response.redirect(new URL("/", nextUrl));
                }
            }
            return true;
        }
    },
    providers: [],
};
