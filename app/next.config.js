/** @type {import("next").NextConfig} */
const nextConfig = {
	env: {
		DIRECTUS_URL: process.env.DIRECTUS_URL,
		DIRECTUS_API_TOKEN: process.env.DIRECTUS_API_TOKEN,
		SUPABASE_URL: process.env.SUPABASE_URL,
		SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
	},
};

module.exports = nextConfig;
