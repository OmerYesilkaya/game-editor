import { useQuery, UseQueryResult } from "react-query";
import { KEYS, URL } from "@app/constants";
import { QueryOptionTypes, GetPrefabResponse } from "@app/types";

async function getPrefabById(id: number): Promise<GetPrefabResponse> {
    return await fetch(URL.PREFABS + `/${id}`, {
        method: "GET",
    }).then((response) => {
        if (!response.ok) throw new Error("Error");
        return response.json();
    });
}

export default function useGetPrefabById({
    params,
    ...props
}: QueryOptionTypes<GetPrefabResponse, { id: number }>): UseQueryResult<GetPrefabResponse> {
    return useQuery([KEYS.PREFABS, params!.id], () => getPrefabById(params!.id), props) as UseQueryResult<GetPrefabResponse>;
}
