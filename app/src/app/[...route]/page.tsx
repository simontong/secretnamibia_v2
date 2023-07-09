import { Metadata } from "next";
import { getRoutable } from "@/src/lib/supabase";
import { get } from "lodash";
import { TourRoutable } from "@/src/components/routables/TourRoutable";
import { PostRoutable } from "@/src/components/routables/PostRoutable";
import { PageRoutable } from "@/src/components/routables/PageRoutable";
import { CategoryRoutable } from "@/src/components/routables/CategoryRoutable";

export const runtime = "edge";

type Props = {
	params: { id: string }
	searchParams: { [key: string]: string | string[] | undefined }
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
	const slugs = get(params, "route", []);
	const data = await getRoutable(...slugs);

	return data.data?.[0]?.metadata;
};

export default async function Route(props: Props) {
	const slugs = get(props.params, "route", []);
	const data = await getRoutable(...slugs);

	return (
		<pre>
			{JSON.stringify(
				{ slugs, data },
				null,
				2,
			)}
		</pre>
	);

	// const slugs = get(props.params, "route", []);
	// const data = await getRoutable(...slugs);
	// const route = data.data.routes?.at(-1)?.routable?.at(-1) || {};
	// const { collection } = route;
	//
	// let routable = null;
	// switch (collection) {
	// 	case "tours":
	// 		return <TourRoutable routes={data.data.routes}/>;
	//
	// 	case "posts":
	// 		return <PostRoutable routes={data.data.routes}/>;
	//
	// 	case "pages":
	// 		return <PageRoutable routes={data.data.routes}/>;
	//
	// 	case "categories":
	// 		return <CategoryRoutable routes={data.data.routes}/>;
	// }
	//
	// // let ddd = null;
	// // if (collection === 'pages') {
	// // 	ddd = await getPage(id)
	// // }
	//
	// // if (!data.data.length) {
	// // 	return notFound();
	// // }
	//
	// return (
	// 	<>
	// 		<pre>{JSON.stringify(data, null, 2)}</pre>
	// 		<br/>
	// 		<pre>{JSON.stringify(route, null, 2)}</pre>
	// 		<br/>
	// 		<pre>{JSON.stringify(routable, null, 2)}</pre>
	// 	</>
	// );
}
