import { notFound } from "next/navigation";
import { getCategory, getTour } from "@/src/lib";
// @ts-ignore

export const TourRoutable = async (props: { routes: [] }) => {
	// @ts-ignore
	const category = props.routes.find(i => i.routable.find(ii => ii.collection==="categories"));
	// @ts-ignore
	const tour = props.routes.find(i => i.routable.find(ii => ii.collection==="tours"));

	if (!category || !tour) {
		return notFound();
	}

	// @ts-ignore
	const routable = await getTour(tour.routable[0].item);

	return (
		<pre>
			{JSON.stringify(props, null, 2)}
			<br/>
			{JSON.stringify({ category, tour }, null, 2)}
			<br/>
			{JSON.stringify(routable, null, 2)}
		</pre>
	);
};
