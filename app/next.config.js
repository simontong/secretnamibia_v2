/** @type {import("next").NextConfig} */
const nextConfig = {
	env: {
		DIRECTUS_URL: process.env.DIRECTUS_URL,
		DIRECTUS_API_TOKEN: process.env.DIRECTUS_API_TOKEN,
	},
};

module.exports = nextConfig;
