import { useQuery, UseQueryResult } from "react-query";
import { URL } from "@core/constants";
import { QueryOptionTypes } from "@app/types";

type ApiPrefab = { id: number; name: string };

async function getPrefabs(): Promise<ApiPrefab[]> {
	const INIT: RequestInit = {
		method: "GET",
	};

	return await fetch(URL.PREFABS, INIT).then((result) => result.json());
}

export default function useGetPrefabs(props?: QueryOptionTypes<ApiPrefab[]>): UseQueryResult<ApiPrefab[]> {
	return useQuery("useGetPrefabs", () => getPrefabs(), props);
}
