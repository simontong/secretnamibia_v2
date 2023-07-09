import { serverRuntimeConfig } from "@/next.config";

const { workerDirectusCacheUrl, token } = serverRuntimeConfig || {};

export const getRoute = async (...slugs: string[]) => {
	const url = new URL(`${workerDirectusCacheUrl}/items/routes`);

	// must be home page
	if (slugs.length === 0) {
		url.searchParams.append("filter[slug][_empty]", "");
	} else {
		url.searchParams.append("filter[slug][_in]", slugs.join(","));
	}

	url.searchParams.append("fields[]", "*");
	url.searchParams.append("fields[]", "routable.*");

	// console.log(decodeURI(url.search));

	return fetch(url, {
		next: { revalidate: 0 },
		headers: {
			authorization: `Bearer ${token}`,
			"content-type": "application/json",
		},
	})
			.then(res => res.json())
			.catch(err => err?.message);
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

	// console.log(body)

	return fetch(`${workerDirectusCacheUrl}/graphql`, {
		next: { revalidate: 0 },
		method: "post",
		body: JSON.stringify(body),
		headers: {
			authorization: `Bearer ${token}`,
			"content-type": "application/json",
		},
	})
			.then(res => res.json())
			.catch(err => err?.message);
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

	// console.log(body)

	return fetch(`${workerDirectusCacheUrl}/graphql`, {
		next: { revalidate: 0 },
		method: "post",
		body: JSON.stringify(body),
		headers: {
			authorization: `Bearer ${token}`,
			"content-type": "application/json",
		},
	})
			.then(res => res.json())
			.catch(err => err?.message);
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

	// console.log(body)

	return fetch(`${workerDirectusCacheUrl}/graphql`, {
		next: { revalidate: 0 },
		method: "post",
		body: JSON.stringify(body),
		headers: {
			authorization: `Bearer ${token}`,
			"content-type": "application/json",
		},
	})
			.then(res => res.json())
			.catch(err => err?.message);
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

	// console.log(body)

	return fetch(`${workerDirectusCacheUrl}/graphql`, {
		next: { revalidate: 0 },
		method: "post",
		body: JSON.stringify(body),
		headers: {
			authorization: `Bearer ${token}`,
			"content-type": "application/json",
		},
	})
			.then(res => res.json())
			.catch(err => err?.message);
};

// export const getRoute = async (slug: string) => {
// 	const url = new URL(`${workerDirectusCacheUrl}/items/routes`);
// 	url.searchParams.set("filter[slug]", slug);
// 	url.searchParams.append("fields[]", "routables.*");
// 	url.searchParams.append("fields[]", "metadata");
//
// 	// console.log(url);
//
// 	return fetch(url, {
// 		next: { revalidate: 0 },
// 		headers: {
// 			authorization: `Bearer ${token}`,
// 			"content-type": "application/json",
// 		},
// 	})
// 		.then(res => res.json())
// 		.catch(err => err?.message);
// };

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

	// console.log(body)

	return fetch(`${workerDirectusCacheUrl}/graphql`, {
		next: { revalidate: 0 },
		method: "post",
		body: JSON.stringify(body),
		headers: {
			authorization: `Bearer ${token}`,
			"content-type": "application/json",
		},
	})
			.then(res => res.json())
			.catch(err => err?.message);
};
