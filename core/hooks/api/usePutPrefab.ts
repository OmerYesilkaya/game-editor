import { URL } from "@core/constants";
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

    return await fetch(URL.PREFABS, INIT).then((result) => {
        console.log("result", result);
        return result.json();
    });
}

export default function usePutPrefab(props?: MutationOptionTypes<PutPrefabRequest>): UseMutationResult<any, any, PutPrefabRequest> {
    return useMutation("prefabs", (data) => putPrefab(data), props);
}
