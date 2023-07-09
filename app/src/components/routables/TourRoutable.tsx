import { notFound } from "next/navigation";

export const TourRoutable = async (props: { routes: [] }) => {
	// @ts-ignore
	const category = props.routes.find(i => i.routable.find(ii => ii.collection === "categories"));
	// @ts-ignore
	const tour = props.routes.find(i => i.routable.find(ii => ii.collection === "tours"));

	if (!category || !tour) {
		return notFound();
	}

	return (
		<pre>
			{JSON.stringify(props, null, 2)}
			<br/>
			{JSON.stringify({ category, tour }, null, 2)}
		</pre>
	);
};
