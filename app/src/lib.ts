import { defaultsDeep } from "lodash";

if (!process.env.DIRECTUS_URL) {
	throw new Error("Missing DIRECTUS_URL");
}
if (!process.env.DIRECTUS_API_TOKEN) {
	throw new Error("Missing DIRECTUS_API_TOKEN");
}

const directusUrl = process.env.DIRECTUS_URL;
const token = process.env.DIRECTUS_API_TOKEN;

const request = (pathname: string, opts?: RequestInit) => {
	const url = new URL(pathname, directusUrl);
	console.log(url.href);

	return fetch(url, defaultsDeep(opts, {
		next: { revalidate: 0 },
		headers: {
			authorization: `Bearer ${token}`,
			"content-type": "application/json",
		},
	}))
		.then(res => res.json())
		.catch(err => err?.message);
};

export const getRoutable = async (...slugs: string[]) => {
	const body = {
		variables: { slugs },
		query: `
			query getRoutable($slugs: [String!]!) {
				routes(filter: { slug: { _in: $slugs } }) {
					browser_title
					meta_description
					structured_markup
					sitemap

					routable {
						collection
						item {
							... on categories {
								id
								title
							}

							... on posts {
								id
								title
							}

							... on pages {
								id
								title
							}

							... on tours {
								id
								title
								highlights
								included
								excluded

								category {
									id
									title
								}

								secondary_categories {
									categories_id {
										id
										title
									}
								}

								days(sort: ["sort"]) {
									sort
									title
									activities
									
									destination {
										title
									}
								}
							}
						}
					}
				}
			}		
		`,
	};

	return request("/graphql", {
		method: "post",
		body: JSON.stringify(body),
	});
};

export const getHome = async () => {
	const body = {
		query: `
			query {
				routes(filter: { slug: { _empty: true } }) {
					browser_title
					meta_description
					structured_markup
					sitemap

					routable {
						collection
						item {
							... on home {
								featured_categories {
									categories_id {
										id
										title
									}
								}

								featured_tours {
									tours_id {
										id
										title
									}
								}

								featured_posts {
									posts_id {
										id
										title
									}
								}
							}
						}
					}
				}
			}
		`,
	};

	return request("/graphql", {
		method: "post",
		body: JSON.stringify(body),
	});
};
