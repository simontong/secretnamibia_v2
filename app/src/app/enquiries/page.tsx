import { getRoutable } from "@/src/lib";
import { Metadata } from "next";

export const runtime = 'edge';

type Props = {
	params: { id: string }
	searchParams: { [key: string]: string | string[] | undefined }
}

export const generateMetadata = async (): Promise<Metadata> => {
	const data = await getRoutable("enquiries");

	return data.data?.[0]?.metadata;
};

export default async function Enquiries(props: Props) {
	const data = await getRoutable("enquiries");
	// const route = data.data?.at(-1)?.routable?.at(-1) || {};
	// const { item: id, collection } = route;
	//
	// // assert collection is empty (because we are using static)
	// if (id || collection) {
	// 	throw new Error("Route should not be associated with a collection because its static");
	// }

	return (
		<pre>
			enquiries page
			<br/>
			props: {JSON.stringify(props, null, 2)}
			<br/>
			{/*collection: {collection}*/}
			<br/>
			{/*route: {JSON.stringify(route, null, 2)}*/}
			<br/>
			{/*id: {id}*/}
			<br/>
			{JSON.stringify(data, null, 2)}
		</pre>
	);
}
