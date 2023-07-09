import { getHome, getRoute } from "@/src/lib";
import { Metadata } from "next";
import { get } from "lodash";

export const runtime = "edge";

type Props = {
	params: { id: string }
	searchParams: { [key: string]: string | string[] | undefined }
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
	const slugs = get(params, "route", []);
	const data = await getRoute(...slugs);

	return data?.data?.[0]?.metadata;
};

export default async function Enquiries(props: Props) {
	const data = await getRoute("");
	const route = data?.data?.at(-1)?.routable?.at(-1) || {};
	const { item: id, collection } = route;

	// assert collection is empty (because we are using static)
	if (id || collection) {
		throw new Error("Route should not be associated with a collection because its static");
	}

	const home = await getHome();

	return (
		<pre>
			home
			<br/>
			collection: {collection}
			<br/>
			id: {id}
			<br/>
			route: {JSON.stringify(route, null, 2)}
			<br/>
			data: {JSON.stringify(data, null, 2)}
			<br/>
			home: {JSON.stringify(home, null, 2)}
		</pre>
	);
}
