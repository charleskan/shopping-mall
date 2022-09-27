/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: false,
	images: {
		domains: [
			'https://api.hibuysomemall.me/uploads',
			'https://www.hibuysomemall.me',
			'https://hibuysomemall.me/userUploadedFiles',
			'hibuysomemall.me/userUploadedFiles',
			'api.hibuysomemall.me/uploads',
			'https://hibuysomemall.me',
			'hibuysomemall.me',]
	},

}

module.exports = nextConfig
