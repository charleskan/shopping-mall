/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: false,
	images: {
		domains: ['localhost', 'https://api.hibuysomemall.me', 'https://www.hibuysomemall.me','https://hibuysomemall.me'] 

	}
}

module.exports = nextConfig
