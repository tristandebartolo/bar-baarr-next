import type {NextConfig} from "next";
import utwm from 'unplugin-tailwindcss-mangle/webpack';

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
	},
	webpack: (config, {isServer, dev}) => {
		if (isProd && !isServer && !dev) { // On crée une fonction qui accepte n’importe quelle option
			const addMangle = (options : Record < string, unknown >) => { // @ts-ignore – le plugin accepte ces options en runtime (doc officielle)
				config.plugins.push(utwm(options));
			};

			addMangle({
				classLength: 2,
				mapFile: './.tailwind-mangle-map.json',
				dynamic: true,
				// ignore: ['dark:', 'group-', 'peer-']
			});
		}
		return config;
	}
};

export default nextConfig;
