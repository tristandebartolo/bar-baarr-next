import type {NextConfig} from "next";

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
		globalNotFound: true
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
