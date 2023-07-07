import { Category } from "@/src/components/routables/Category";
import { Page } from "@/src/components/routables/Page";
import { Post } from "@/src/components/routables/Post";
import { notFound } from "next/navigation";

export const runtime = "edge";

// const routableComponentMap = {
// 	category: Category,
// 	page: Page,
// 	post: Post,
// };

const getRoute = async (props: RouteProps) => {
	const { params } = props;
	const route = params.route.join(":");

	const url = `${process.env.DIRECTUS_CACHE_URL}/list/test`;
	return url;
	// const res = await fetch(url);
	// return res.text();
};

type RouteProps = {
	params: {
		route: string[];
	};
	searchParams: URLSearchParams;
}

export default async function Route(props: RouteProps) {
	const data = await getRoute(props);

	// if (!data) {
	// 	return notFound();
	// }

	return (
		<>
			<pre>{JSON.stringify(data, null, 2)}</pre>
			<br/>
		</>
	);
}
