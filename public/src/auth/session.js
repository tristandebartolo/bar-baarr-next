"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = encrypt;
exports.decrypt = decrypt;
require("server-only");
// import { DefaultSession, Session } from "next-auth";
const jose_1 = require("jose");
const secretKey = process.env.AUTH_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
async function encrypt(payload) {
    return new jose_1.SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey);
}
async function decrypt(session) {
    try {
        const { payload } = await (0, jose_1.jwtVerify)(session, encodedKey, {
            algorithms: ['HS256'],
        });
        return payload;
    }
    catch (error) {
        console.log('Failed to verify session', error);
    }
}
