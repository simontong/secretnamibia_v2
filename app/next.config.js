/** @type {import("next").NextConfig} */
const nextConfig = {
	env: {
		DIRECTUS_CACHE_URL: process.env.DIRECTUS_CACHE_URL,
	},
};

module.exports = nextConfig;
