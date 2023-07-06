import { Category } from "@/src/components/routables/Category";
import { Page } from "@/src/components/routables/Page";
import { Post } from "@/src/components/routables/Post";
import { notFound } from "next/navigation";

type RouteProps = {
	params: {
		route: string[];
	};
	searchParams: URLSearchParams;
}

const routableComponentMap = {
	category: Category,
	page: Page,
	post: Post,
};

export default async function Route(props: RouteProps) {
	const { params } = props;
	const route = params.route.join("/");

	const ddd = {
		routable_type: "category",
	};
	const data = await new Promise(r => setTimeout(() => r(ddd), 800));

	const Component = routableComponentMap[data.routable_type];
	if (!Component) {
		return notFound();
	}

	// const res = await fetch("http://localhost:8055/get/route");
	// const data = await res.json();

	return (
		<>
			<pre>{JSON.stringify(data, null, 2)}</pre>
			<br/>
			<Component/>
		</>
	);
}
