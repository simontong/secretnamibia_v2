import { notFound } from "next/navigation";
import { getCategory } from "@/src/lib";

// @ts-ignore
export const CategoryRoutable = async (props) => {
	// @ts-ignore
	const category = props.routes.find(i => i.routable.find(ii => ii.collection==="categories"));

	if (!category) {
		return notFound();
	}

	const routable = await getCategory(category.routable[0].item);

	return (
		<pre>
			{JSON.stringify(props, null, 2)}
			<br/>
			{JSON.stringify(category, null, 2)}
			<br/>
			{JSON.stringify(routable, null, 2)}
		</pre>
	);
};
