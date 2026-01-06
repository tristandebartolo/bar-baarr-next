import type {NextConfig} from "next";

const isProd = process.env.NEXT_PUBLIC_DRUPAL_ENV === 'production';
// import ObfuscatorPlugin from 'webpack-obfuscator';
const nextConfig: NextConfig = {
	poweredByHeader: false,
	// distDir: isProd ? '.build' : '.next',
	// assetPrefix: isProd ? '/s' : undefined,
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
	},
	// webpack: (config, {isServer, dev}) => {
	// 	if (isProd && !isServer && !dev) {
	// 		config.plugins.push(new ObfuscatorPlugin({
	// 			compact: true,
	// 			controlFlowFlattening: false,
	// 			deadCodeInjection: false,
	// 			stringArray: true,
	// 			stringArrayEncoding: ['base64'],
	// 			stringArrayThreshold: 0.8,
	// 			rotateStringArray: true,
	// 			selfDefending: true,
	// 			// Ces deux lignes cachent vraiment "next/", "__NEXT_DATA__", "webpack", etc.
	// 			renameGlobals: true,
	// 			identifierNamesGenerator: 'mangled-shuffled'
	// 		}, []));
	// 	}
	// 	return config;
	// }
};

export default nextConfig;
