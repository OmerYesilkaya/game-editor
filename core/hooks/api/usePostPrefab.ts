import { URL } from "@core/constants";
import { useMutation, UseMutationResult } from "react-query";
import { MutationOptionTypes } from "types/api";
import { PostPrefabRequest } from "types/prefab";

async function postPrefab(data: PostPrefabRequest): Promise<PostPrefabRequest> {
	const INIT: RequestInit = {
		method: "POST",
		body: JSON.stringify(data),
	};

	return await fetch(URL.PREFABS, INIT).then((result) => result.json());
}

export default function usePostPrefab(props?: MutationOptionTypes<PostPrefabRequest>): UseMutationResult<any, any, PostPrefabRequest> {
	return useMutation("prefabs", (data) => postPrefab(data), props);
}
