import { useQuery, UseQueryResult } from "react-query";
import { URL } from "@app/constants";
import { QueryOptionTypes, ApiModule } from "@app/types";

async function getModules(): Promise<ApiModule[]> {
	const INIT: RequestInit = {
		method: "GET",
	};

	return await fetch(URL.MODULES, INIT).then((result) => result.json());
}

export default function useGetModules(props?: QueryOptionTypes<ApiModule[]>): UseQueryResult<ApiModule[]> {
	return useQuery("useGetModules", () => getModules(), props);
}
