import { KEYS, URL } from "@core/constants";
import { useMutation, UseMutationResult } from "react-query";
import { MutationOptionTypes } from "types/api";
import { PutPrefabRequest } from "types/prefab";

async function putPrefab(data: PutPrefabRequest): Promise<PutPrefabRequest> {
    const INIT: RequestInit = {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    };

    return await fetch(URL.PREFABS, INIT).then((result) => result.json());
}

export default function usePutPrefab(props?: MutationOptionTypes<PutPrefabRequest>): UseMutationResult<any, any, PutPrefabRequest> {
    return useMutation(KEYS.PREFABS, (data) => putPrefab(data), props);
}
