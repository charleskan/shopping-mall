/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: false,
	images: {
		domains: ['loaclhost','loremflickr.com'],

	}
}

module.exports = nextConfig
