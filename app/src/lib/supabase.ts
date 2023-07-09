// import { createClient } from "@supabase/supabase-js";
import { defaultsDeep } from "lodash";

if (!process.env.SUPABASE_URL) {
	throw new Error("Missing SUPABASE_URL");
}
if (!process.env.SUPABASE_ANON_KEY) {
	throw new Error("Missing SUPABASE_ANON_KEY");
}

// Create a single supabase client for interacting with your database
// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const request = async (pathname: string, customOpts?: RequestInit) => {
	const headers: Record<string, string> = {
		apiKey: process.env.SUPABASE_ANON_KEY!,
		"content-type": "application/json",
	};

	const url = new URL(pathname, process.env.SUPABASE_URL);
	const opts = defaultsDeep(customOpts, {
		next: { revalidate: 0 },
		headers,
	});

	console.log("%s\n%o", url.href, opts);

	return fetch(url, opts)
		.then(res => res.json())
		.catch(err => err?.message);
};

export const getRoutable = async (...slugs: string[]) => {
	const body = {
		variables: { slugs },
		query: `
			query getRoutable($slugs: [String!]!) {
				routesCollection(filter: { slug: { in: $slugs } }) {
					edges {
						node {
							id
							slug
							browser_title
						}
					}
				}
			} 
		`,
	};

	return request("/graphql/v1", {
		method: "post",
		body: JSON.stringify(body),
	});
};
