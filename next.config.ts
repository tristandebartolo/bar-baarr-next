import type {NextConfig}
from "next";
import CssObfuscator from 'next-css-obfuscator';

const isProd = process.env.NEXT_PUBLIC_DRUPAL_ENV === 'production';
const nextConfig: NextConfig = {
	poweredByHeader: false,
	distDir: isProd ? '.build' : '.next',
	assetPrefix: isProd ? '/s' : undefined,
	generateBuildId: async () => {
		return 'build-' + Date.now().toString(36);
	},
	async headers() {
		return [{
				source: '/:path*',
				headers: [
					{
						key: 'X-Powered-By',
						value: ''
					}, {
						key: 'Server',
						value: 'nginx'
					}, {
						key: 'x-nextjs-cache',
						value: ''
					}, {
						key: 'x-middleware-prefetch',
						value: ''
					},
				]
			},];
	},
	output: "standalone",
	experimental: {
		globalNotFound: true,
		// Next.js 15.5+ accepte cette option en canary/stable fin 2025
		// @ts-ignore – l’option existe même si TS ne la connaît pas encore
		bundlePagesRouterDependencies: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "yamn.baarr.fr",
				port: "",
				pathname: "/sites/default/files/**"
			},
		]
	}
};

export default nextConfig;
