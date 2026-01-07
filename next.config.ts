import type {NextConfig} from "next";

const isProd = process.env.NEXT_PUBLIC_DRUPAL_ENV === 'production';
const baseDomain = process.env.DRUPAL_BASE || 'http://';
const domain = process.env.DRUPAL_BASE_HOSTNAME || 'localhost';
// import ObfuscatorPlugin from 'webpack-obfuscator';
const nextConfig: NextConfig = {
	poweredByHeader: false,
	// distDir: isProd ? '.build' : '.next',
	// assetPrefix: isProd ? '/s' : undefined,
	generateBuildId: async () => {
		return 'build-' + Date.now().toString(36);
	},
	async rewrites() {
		return [
			{
				source: '/media/:path*',
				destination: `${baseDomain}${domain}/:path*`,
			},
		];
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
		globalNotFound: true
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: domain,
				port: "",
				pathname: "/sites/default/files/**"
			},
		],
		localPatterns: [
			{
				pathname: "/media/**"
			}
		]
	},
};

export default nextConfig;
