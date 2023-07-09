import { notFound } from "next/navigation";

// @ts-ignore
export const PostRoutable = async (props) => {
	// @ts-ignore
	const post = props.routes.find(i => i.routable.find(ii => ii.collection === "posts"));

	if (!post) {
		return notFound();
	}

	return (
		<pre>
			{JSON.stringify(props, null, 2)}
			<br/>
			{JSON.stringify(post, null, 2)}
		</pre>
	);
};
