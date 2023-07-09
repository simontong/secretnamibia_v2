import { serverRuntimeConfig } from "@/next.config";

const { workerDirectusCacheUrl, token } = serverRuntimeConfig || {};

export async function getDirectusClient() {
	// todo
}
