/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: false,
	images: {
		domains: [
			'https://api.hibuysomemall.me']
	},
	// async rewrites() {
	// 	return [
	// 		{
	// 			source: '/api/:path*',
	// 			destination: 'https://api.hibuysomemall.me/:path*',
	// 		},
	// 	]
	// },
}

module.exports = nextConfig
