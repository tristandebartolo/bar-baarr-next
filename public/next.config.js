"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nextConfig = {
    experimental: {
        globalNotFound: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "yamn.baarr.fr",
                port: "",
                pathname: "/sites/default/files/**",
            },
        ],
    },
};
exports.default = nextConfig;
