import { notFound } from "next/navigation";
import { getPost } from "@/src/lib";

// @ts-ignore
export const PostRoutable = async (props) => {
	// @ts-ignore
	const post = props.routes.find(i => i.routable.find(ii => ii.collection==="posts"));

	if (!post) {
		return notFound();
	}

	const routable = await getPost(post.routable[0].item);

	return (
		<pre>
			{JSON.stringify(props, null, 2)}
			<br/>
			{JSON.stringify(post, null, 2)}
			<br/>
			{JSON.stringify(routable, null, 2)}
		</pre>
	);
};
