export default function Home() {
	const bah = process.env.DIRECTUS_CACHE_URL;
	return (
		<div>{bah}</div>
	);
}
