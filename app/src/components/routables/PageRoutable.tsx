import { notFound } from "next/navigation";

// @ts-ignore
export const PageRoutable = async (props) => {
	// @ts-ignore
	const page = props.routes.find(i => i.routable.find(ii => ii.collection==="pages"));

	if (!page) {
		return notFound();
	}

	return (
		<pre>
			{JSON.stringify(props, null, 2)}
			<br/>
			{JSON.stringify(page, null, 2)}
		</pre>
	);
};
