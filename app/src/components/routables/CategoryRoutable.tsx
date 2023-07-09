import { notFound } from "next/navigation";

// @ts-ignore
export const CategoryRoutable = async (props) => {
	// @ts-ignore
	const category = props.routes.find(i => i.routable.find(ii => ii.collection === "categories"));

	if (!category) {
		return notFound();
	}

	return (
		<pre>
			{JSON.stringify(props, null, 2)}
			<br/>
			{JSON.stringify(category, null, 2)}
		</pre>
	);
};
