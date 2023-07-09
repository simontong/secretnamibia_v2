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

export const getRoute = async (...slugs: string[]) => {
	const searchParams = new URLSearchParams;

	// must be home page
	if (slugs.length === 0) {
		searchParams.append("filter[slug][_empty]", "");
	} else {
		searchParams.append("filter[slug][_in]", slugs.join(","));
	}

	searchParams.append("fields[]", "*");
	searchParams.append("fields[]", "routable.*");

	// console.log(decodeURI(url.search));

	return request(`/items/routes?${searchParams}`);
};

export const getPost = async (id: string) => {
	const body = {
		variables: { id },
		query: `
			query getPost($id: String) {
				posts(filter: { id: { _eq: $id }}) {
					title
				}
			}
		`,
	};

	return request("/graphql", {
		method: "post",
		body: JSON.stringify(body),
	});
};

export const getPage = async (id: string) => {
	const body = {
		variables: { id },
		query: `
			query getPage($id: String) {
				pages(filter: { id: { _eq: $id }}) {
					title
				}
			}
		`,
	};

	return request("/graphql", {
		method: "post",
		body: JSON.stringify(body),
	});
};

export const getCategory = async (id: string) => {
	const body = {
		variables: { id },
		query: `
			query getCategory($id: String) {
				categories(filter: { id: { _eq: $id }}) {
					title
				}
			}
		`,
	};

	return request("/graphql", {
		method: "post",
		body: JSON.stringify(body),
	});
};

export const getTour = async (id: string) => {
	const body = {
		variables: { id },
		query: `
			query getTour($id: String) {
				tours(filter: { id: { _eq: $id }}) {
					title
          highlights
          included
          excluded

					category {
            id
						title
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
				home {
					featured_categories(filter: { home_id: { id: { _neq: null } } }) {
						home_id {
							id
						}
					}

					featured_tours(filter: { home_id: { id: { _neq: null } } }) {
						home_id {
							id
						}
					}

					featured_posts(filter: { home_id: { id: { _neq: null } } }) {
						home_id {
							id
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
