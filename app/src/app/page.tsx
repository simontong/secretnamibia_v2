import { getHome } from "@/src/lib";
import { Metadata } from "next";

export const runtime = "edge";

type Props = {
	params: { id: string }
	searchParams: { [key: string]: string | string[] | undefined }
}

export const generateMetadata = async (): Promise<Metadata> => {
	const data = await getHome();

	return data?.data?.[0]?.metadata;
};

export default async function Home(props: Props) {
	const home = await getHome();

	return (
		<pre>
			home
			<br/>
			data: {JSON.stringify(home, null, 2)}
		</pre>
	);
}
