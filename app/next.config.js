/** @type {import("next").NextConfig} */
const nextConfig = {
	serverRuntimeConfig: {
		workerDirectusCacheUrl: process.env.WORKER_DIRECTUS_CACHE_URL,
		token: "paa9sr3t4VmmowB6XS0W8tu4uxi6ydZI",
	},
};

module.exports = nextConfig;
