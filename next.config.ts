import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

export default nextConfig;
