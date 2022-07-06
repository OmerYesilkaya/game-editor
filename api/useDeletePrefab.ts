import { useMutation, useQueryClient } from "react-query";
import { KEYS, URL } from "@app/constants";

async function deletePrefab(data: { id: number }): Promise<{ Message: string }> {
    const INIT: RequestInit = {
        method: "DELETE",
    };

    return await fetch(`${URL.PREFABS}/${data.id}`, INIT).then((result) => result.json());
}

export default function useDeletePrefab() {
    const queryClient = useQueryClient();

    return useMutation<{ Message: string }, unknown, { id: number }, () => void>(KEYS.PREFABS, (data) => deletePrefab(data), {
        onSuccess: () => {
            queryClient.invalidateQueries([KEYS.PREFABS]);
        },
    });
}
