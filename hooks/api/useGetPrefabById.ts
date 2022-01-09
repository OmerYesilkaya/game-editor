import { useQuery, UseQueryResult } from "react-query";
import { URL } from "@app/constants";
import { QueryOptionTypes, Prefab } from "@app/types";

async function getPrefabById(id?: number): Promise<Prefab> {
	return await fetch(URL.PREFABS + `/${id}`, {
		method: "GET",
	}).then((result) => result.json());
}

export default function useGetPrefabById({ params, ...props }: QueryOptionTypes<Prefab, { id: number }>): UseQueryResult<Prefab> {
	return useQuery(["useGetPrefabById", params?.id], () => getPrefabById(params?.id), props) as UseQueryResult<Prefab>;
}
